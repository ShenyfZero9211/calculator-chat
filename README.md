# Calculator Chat

A universal CLI tool that allows any AI agent to display numbers on the system calculator.

## For AI Agents

### Installation

```bash
npm install -g calculator-chat
# or
npm install -g https://github.com/ShenyfZero9211/calculator-chat.git
```

### Usage

```bash
calc-chat "<number>"
```

Examples:
```bash
calc-chat "520"      # Display 520
calc-chat "888"      # Display 888 (wealth)
calc-chat "1314"     # Display 1314 (forever)
```

### How It Works

1. **Check if calculator is running** - If not, start it
2. **Activate calculator to foreground** - Bring to front
3. **Type the number** - Send keystrokes to calculator

### Platform Support

| Platform | Calculator | Method |
|----------|------------|--------|
| Windows | Calculator (Store app) | PowerShell |
| macOS | Calculator.app | AppleScript |
| Linux | gnome-calculator | xdotool |

## Integration

Any AI agent that can execute shell commands can use this:

```python
# For Python-based agents
import subprocess
subprocess.run(["calc-chat", "520"])

# For Node.js agents
const { execSync } = require('child_process');
execSync('calc-chat "520"');

# For other agents
# Just call: calc-chat "520"
```

## AI Response Examples

When user sends a message, AI decides what number to display:

| User Message | AI Response | Reason |
|--------------|-------------|--------|
| 我需要你的帮助 | 995 | 救救我 (help me) |
| 祝你平安 | 88 | 拜拜 (goodbye) |
| 520 | 1314 | I love you → Forever |
