# Calculator Chat

A universal CLI tool that allows any AI agent to display numbers on the system calculator.

English | [中文](README_CN.md)

---

## What is Calculator Chat?

Calculator Chat is a universal CLI tool that allows any AI Agent to display numbers on the system calculator instead of traditional text responses.

This creates a unique and interesting AI interaction:

- User speaks to AI
- AI thinks of a response
- AI displays number code on calculator

```
User: /calc I like you
AI: (shows 520 on calculator)
```

---

## Quick Start

### Installation

```bash
npm install -g calculator-chat
```

Or install directly from GitHub:

```bash
npm install -g https://github.com/ShenyfZero9211/calculator-chat.git
```

### Usage

```bash
calc-chat "520"
```

This will display **520** on the calculator.

---

## Use Cases

### 1. Homophone Number Codes

| User Message | AI Response | Meaning |
|--------------|-------------|---------|
| I need your help | 995 | Save me |
| Wish you peace | 88 | Bye bye |
| So tired | 555 | Cry cry cry |
| Fortune comes | 888 | Rich rich rich |
| Miss you | 537 | I miss you |
| Marry me | 1314520 | I love you forever |

### 2. Number Interpretation

If user sends a number, AI should interpret its meaning:

| User Sends | AI Interprets | Response |
|------------|---------------|----------|
| 520 | I love you | 1314 (forever) |
| 1314 | Forever | 520 (I love you) |
| 666 | Awesome | 888 (congrats) |

### 3. Emotional Expression

| Scenario | Suggested Response |
|----------|-------------------|
| Express love | 520, 1314, 3344 |
| Say goodbye | 88, 007 |
| Need help | 995, 110 |
| Happy birthday | 218, 888 |

---

## How It Works

### Workflow

```
1. Check if calculator is running
       ↓
2. If not, start calculator
       ↓
3. Activate calculator window to foreground
       ↓
4. Send number keys
```

### Platform Support

| OS | Calculator | Implementation |
|----|------------|----------------|
| Windows | Calculator (Store app) | PowerShell + SendKeys |
| macOS | Calculator.app | AppleScript |
| Linux | gnome-calculator | xdotool |

---

## Integration with AI Agents

### Python Agent

```python
import subprocess

def send_to_calculator(number: str):
    subprocess.run(["calc-chat", number], check=True)

# Usage
send_to_calculator("520")
```

### Node.js Agent

```javascript
const { execSync } = require('child_process');

function sendToCalculator(number) {
    execSync(`calc-chat "${number}"`);
}

// Usage
sendToCalculator('520');
```

### Claude / OpenAI Agent

```bash
# In Tool/Function call
shell: calc-chat "520"
```

### Custom AI Platform

Any AI that can execute shell commands:

```bash
# Just run this command
calc-chat "520"
```

---

## Troubleshooting

### Windows

**Problem**: Numbers not displaying

**Solution**:
1. Ensure calculator is Windows Store version (CalculatorApp)
2. Run terminal as Administrator

**Problem**: Permission denied

```bash
# Run PowerShell as Administrator
powershell -Command "Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned"
```

### macOS

**Problem**: Need Accessibility permission

**Solution**:
1. Open System Settings → Privacy & Security → Accessibility
2. Add Terminal or allowed app

### Linux

**Problem**: xdotool not installed

```bash
# Ubuntu/Debian
sudo apt install xdotool

# Fedora
sudo dnf install xdotool

# Arch
sudo pacman -S xdotool
```

---

## Development

### Local Development

```bash
# Clone project
git clone https://github.com/ShenyfZero9211/calculator-chat.git
cd calculator-chat

# Install dependencies
npm install

# Test
npm test
# or
node src/index.js "520"
```

### Publish New Version

```bash
npm version patch
npm publish
```

---

## License

MIT License

---

## Contributing

Issues and Pull Requests are welcome!

---

## Related Projects

- [opencode](https://opencode.ai) - AI Programming Assistant
