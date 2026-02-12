const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const OpenAI = require('openai');
const crypto = require('crypto');
require('dotenv').config();

// Configuration
const OPENAI_API_KEY = process.env.LLM_API_KEY;
const OPENAI_BASE_URL = process.env.LLM_BASE_URL || 'https://dashscope.aliyuncs.com/compatible-mode/v1';
const OPENAI_MODEL = process.env.LLM_MODEL || 'qwen-max';

if (!OPENAI_API_KEY) {
  console.error('Error: LLM_API_KEY environment variable is required.');
  process.exit(1);
}

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  baseURL: OPENAI_BASE_URL,
});

/**
 * Parses markdown content into blocks separated by H2 or H3 headers.
 * Returns an array of block objects.
 */
function parseMarkdownBlocks(content) {
  const lines = content.split('\n');
  const blocks = [];
  let currentBlock = { header: '__preamble__', lines: [] };
  let inCodeBlock = false;

  for (const line of lines) {
    // Check code block
    if (line.trim().startsWith('```')) {
      inCodeBlock = !inCodeBlock;
    }

    // Check header (only if not in code block and level 2 or 3)
    // You can adjust the regex to include H1 if needed, but H1 is usually managed via frontmatter/top-level.
    // Let's include H1-H6 for completeness, but typically we care about H2/H3 for sectioning.
    const headerMatch = line.match(/^(#{1,6})\s+(.*)/);
    
    // We split on H2 and H3 mainly, as H1 is title. H4+ might be too granular?
    // User requested "H2/H3".
    const isTargetHeader = headerMatch && (headerMatch[1].length === 2 || headerMatch[1].length === 3);

    if (!inCodeBlock && isTargetHeader) {
      // Save previous block if it has content
      if (currentBlock.lines.length > 0) {
        blocks.push({
          header: currentBlock.header,
          content: currentBlock.lines.join('\n')
        });
      }
      // Start new block
      // Keying by full header text is simple but fragile if duplicates exist.
      // We will handle duplicates during processing.
      currentBlock = {
        header: headerMatch[0].trim(), // Store the full header line (e.g. "## Introduction")
        lines: [line] // Include the header line in the block content? 
                      // Yes, it's part of the translation unit usually, but typically we want to translate header separate from body?
                      // If we include it, the LLM translates it. This is good.
      };
    } else {
      currentBlock.lines.push(line);
    }
  }
  // Push last block
  if (currentBlock.lines.length > 0) {
    blocks.push({
      header: currentBlock.header,
      content: currentBlock.lines.join('\n')
    });
  }
  return blocks;
}

function calculateHash(content) {
  return crypto.createHash('md5').update(content.trim()).digest('hex');
}

async function translateText(text, fromLang, toLang, context = '') {
  // Short circuit empty text
  if (!text || text.trim().length === 0) return text;

  const fromName = fromLang === 'zh' ? 'Chinese' : 'English';
  const toName = toLang === 'zh' ? 'Chinese' : 'English';

  try {
    const completion = await openai.chat.completions.create({
      model: OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content: `You are a professional technical translator for a Robotics Club. 
Translate the following Markdown content from ${fromName} to ${toName}.
Rules:
1. Preserve all Markdown formatting strictly (headers, lists, bold/italic, links, images).
2. Do NOT translate code blocks, inline code, or URLs.
3. Maintain a professional, technical tone.
4. If the text is already in ${toName}, output it as is.
5. For internal links like \`[Label](/zh/path)\`, convert them to \`[Label](/en/path)\` (or vice versa).
6. ${context}`
        },
        {
          role: "user",
          content: text
        }
      ],
      temperature: 0.1,
    });
    return completion.choices[0].message.content.trim();
  } catch (error) {
    console.error('Translation error:', error);
    throw error;
  }
}

async function processFile(filePath) {
  console.log(`Processing: ${filePath}`);
  
  let fromLang, toLang, sourceDir, targetDir;

  if (filePath.startsWith('docs/zh/')) {
    fromLang = 'zh';
    toLang = 'en';
    sourceDir = 'docs/zh';
    targetDir = 'docs/en';
  } else if (filePath.startsWith('docs/en/')) {
    fromLang = 'en';
    toLang = 'zh';
    sourceDir = 'docs/en';
    targetDir = 'docs/zh';
  } else {
    console.log(`Skipping file outside docs/zh or docs/en: ${filePath}`);
    return;
  }

  // Calculate paths
  const relativePath = path.relative(sourceDir, filePath);
  const targetPath = path.join(targetDir, relativePath);
  const metaPath = targetPath + '.meta.json';
  
  // Read source
  const sourceContent = fs.readFileSync(filePath, 'utf8');
  const { data: frontmatter, content } = matter(sourceContent);

  // Skip if "draft: true"
  if (frontmatter.draft) {
    console.log(`Skipping draft: ${filePath}`);
    return;
  }

  // Read existing meta if available
  let metaData = {};
  if (fs.existsSync(metaPath)) {
    try {
      metaData = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
    } catch (e) {
      console.warn(`Failed to parse existing meta file: ${metaPath}`);
    }
  }

  // Parse source blocks
  const sourceBlocks = parseMarkdownBlocks(content);
  const newMetaBlocks = {};
  const translatedBlocks = [];

  // Helper to get unique key for blocks (handle duplicate headers)
  const headerCounts = {};
  function getBlockKey(header) {
    const count = (headerCounts[header] || 0) + 1;
    headerCounts[header] = count;
    return `${header}::${count}`;
  }

  console.log(`Found ${sourceBlocks.length} blocks in source.`);

  for (const block of sourceBlocks) {
    const blockKey = getBlockKey(block.header);
    const currentHash = calculateHash(block.content);
    
    let translatedContent = '';
    
    // Check if block exists in meta and hash matches
    if (metaData[blockKey] && metaData[blockKey].sourceHash === currentHash && metaData[blockKey].targetContent) {
      // Reuse existing content
      // console.log(`Skipping translation for unchanged block: ${block.header}`);
      translatedContent = metaData[blockKey].targetContent;
    } else {
      // Translate
      console.log(`Translating block: ${block.header.substring(0, 30)}...`);
      translatedContent = await translateText(block.content, fromLang, toLang, 
        block.header === '__preamble__' ? 'This is the preamble before headers.' : 'This is a section with a header.');
    }

    // Update meta
    newMetaBlocks[blockKey] = {
      sourceHash: currentHash,
      targetContent: translatedContent
    };
    
    translatedBlocks.push(translatedContent);
  }

  // Translate Frontmatter (Always check/update lightly, or we could hash it too? simpler to just re-translate for now as it's small)
  const newFrontmatter = { ...frontmatter };
  newFrontmatter.lang = toLang;
  
  if (newFrontmatter.title) {
    newFrontmatter.title = await translateText(newFrontmatter.title, fromLang, toLang, 'Translate the title.');
  }
  if (newFrontmatter.description) {
    newFrontmatter.description = await translateText(newFrontmatter.description, fromLang, toLang, 'Translate the description.');
  }
  
  // Add AI metadata
  newFrontmatter.ai = {
    ...newFrontmatter.ai,
    translated_by: OPENAI_MODEL,
    translated_at: new Date().toISOString(),
    source_commit: process.env.GITHUB_SHA || 'local'
  };

  // Reconstruct file
  const fullTranslatedContent = translatedBlocks.join('\n');
  const newFileContent = matter.stringify(fullTranslatedContent, newFrontmatter);

  // Ensure directory exists
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });

  // Write file
  fs.writeFileSync(targetPath, newFileContent);
  
  // Write Sidecar Meta
  fs.writeFileSync(metaPath, JSON.stringify(newMetaBlocks, null, 2));
  
  console.log(`Generated: ${targetPath}`);
  console.log(`Updated Meta: ${metaPath}`);
}

async function main() {
  const args = process.argv.slice(2);
  const files = args.length > 0 ? args : [];

  if (files.length === 0) {
    console.log('No files provided to translate.');
    return;
  }

  for (const file of files) {
    // Only process .md files
    if (file.endsWith('.md')) {
      await processFile(file);
    }
  }
}

main();
