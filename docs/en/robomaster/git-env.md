# Git and Development Environment

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

### 3. First-Time Configuration

```bash
git config --global user.name "Your Name"
git config --global user.email "you@nyu.edu"
git config --global init.defaultBranch main
git config --global pull.rebase false
```

### 4. Daily Workflow

```bash
git checkout main
git pull origin main
git checkout -b feature/your-topic
git add .
git commit -m "feat: add docs"
git push -u origin feature/your-topic
```

## VSCode + AI Minimum Setup

Recommended tools:

- VSCode
- ARM GNU Toolchain
- `openocd`
- `dfu-util`
- `make`

Recommended extensions:

- `C/C++`
- `Cortex-Debug`
- `Makefile Tools`

Minimum workspace settings:

```json
{
  "files.eol": "\n",
  "editor.formatOnSave": true,
  "C_Cpp.default.configurationProvider": "ms-vscode.makefile-tools",
  "makefile.configureOnOpen": false
}
```

Practical guidance:

- use AI for explanation and review
- manually verify critical control parameters
- require local reproducible validation for generated code
