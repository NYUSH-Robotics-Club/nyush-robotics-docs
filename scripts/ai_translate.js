const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const OpenAI = require('openai');
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

async function translateText(text, fromLang, toLang, context = '') {
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
5. ${context}`
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
  
  // Read source
  const sourceContent = fs.readFileSync(filePath, 'utf8');
  const { data: frontmatter, content } = matter(sourceContent);

  // Skip if "draft: true"
  if (frontmatter.draft) {
    console.log(`Skipping draft: ${filePath}`);
    return;
  }

  // Skip if source file itself was AI generated (to prevent feedback loops, optional but safer)
  // But we want to allow human editing of AI generated files to trigger back-translation?
  // Let's assume if it's committed by a human (implied by this script running on push), we translate it.
  
  // Translate Frontmatter
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

  // Translate Content
  const translatedContent = await translateText(content, fromLang, toLang, 'Translate the markdown body.');

  // Reconstruct file
  const newFileContent = matter.stringify(translatedContent, newFrontmatter);

  // Ensure directory exists
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });

  // Write file
  fs.writeFileSync(targetPath, newFileContent);
  console.log(`Generated: ${targetPath}`);
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
