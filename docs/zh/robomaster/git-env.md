# Git 与开发环境

## Git Tutorial (English)

### 1. Install Git on macOS

```bash
brew install git
git --version
```

Alternative:

```bash
xcode-select --install
git --version
```

### 2. Install Git on Windows

Installer: [git-scm.com/download/win](https://git-scm.com/download/win)

Or via winget:

```powershell
winget install --id Git.Git -e --source winget
git --version
```

### 3. First-time configuration

```bash
git config --global user.name "Your Name"
git config --global user.email "you@nyu.edu"
git config --global init.defaultBranch main
git config --global pull.rebase false
```

### 4. Daily workflow

```bash
git checkout main
git pull origin main
git checkout -b feature/your-topic
git add .
git commit -m "feat: add docs"
git push -u origin feature/your-topic
```

## VSCode + AI 最小配置

推荐工具：

- VSCode
- ARM GNU Toolchain
- `openocd`
- `dfu-util`
- `make`

推荐扩展：

- `C/C++`
- `Cortex-Debug`
- `Makefile Tools`

最小工作区配置：

```json
{
  "files.eol": "\n",
  "editor.formatOnSave": true,
  "C_Cpp.default.configurationProvider": "ms-vscode.makefile-tools",
  "makefile.configureOnOpen": false
}
```

实践建议：

- AI 用于解释、审查、列验证步骤
- 关键控制参数必须人工复核
- 任何生成代码都要在本地可复现验证
