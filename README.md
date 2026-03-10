# Calculator Chat 🧮

[![English](https://img.shields.io/badge/lang-English-blue.svg)](README.md)
[![中文](https://img.shields.io/badge/lang-中文-red.svg)](README_CN.md)

An OpenClaw skill that responds with numbers on the system calculator. When users express emotions or use specific phrases, the AI translates them into numbers and displays them on the calculator.

## Features

- 💬 **Natural Language Understanding** - Understands phrases like "I love you", "goodbye", "congratulations" etc.
- 🧮 **System Calculator Integration** - Opens the system calculator and displays the translated number
- 🌐 **Multi-language Support** - Works with Chinese homophones and common expressions
- ⚡ **Easy to Use** - Simply say `/calc-chat 我爱你` or use the CLI

## What is OpenClaw?

OpenClaw is an AI assistant framework that runs locally. Skills extend its capabilities. This skill allows OpenClaw to respond using numbers on the system calculator instead of text messages.

## Quick Start

### Install

```bash
# Via npm
npm install -g calculator-chat

# Or clone from GitHub
git clone https://github.com/ShenyfZero9211/calculator-chat.git
cd calculator-chat
npm install
```

### Use

```bash
# Command line
calc-chat "我爱你"
calc-chat "恭喜发财"
calc-chat "520+888"

# In OpenClaw
/calc-chat 我爱你
/calc-chat 再见
```

## Translation Examples

| You Say | Calculator Shows | Meaning |
|---------|-----------------|---------|
| 我爱你 / I love you | 520 | I love you |
| 一生一世 / Forever | 1314 | Forever |
| 再见 / Goodbye | 88 | Bye bye |
| 好累 / Tired | 555 | Crying |
| 恭喜发财 / Congratulations | 888 | Wealth wealth wealth |
| 666 / Awesome | 666 | Awesome |
| 帮我 / Help me | 995 | Save me |
| 生日 / Birthday | 218 | Love you |
| 想你 / Miss you | 777 | Kiss kiss kiss |
| 顺利 / Smooth | 66 | Smooth顺利 |
| 天气好 / Nice weather | 88 | Good! |
| 谢谢 / Thanks | 88 | You're welcome |

## How It Works

1. **Parse Input** - Analyzes the user's message and finds matching patterns
2. **Translate** - Converts the message to the corresponding number code
3. **Open Calculator** - Launches the system calculator (gnome-calculator on Linux)
4. **Display** - Shows the number on the calculator

### Supported Platforms

- **Linux** (Ubuntu/GNOME) - gnome-calculator
- **macOS** - Calculator.app (coming soon)
- **Windows** - Calculator (coming soon)

## Requirements

- Node.js 14+
- Python 3
- gnome-calculator (Linux)

## OpenClaw Integration

This is an OpenClaw skill. To use with OpenClaw:

1. Place this skill in your OpenClaw skills directory
2. OpenClaw will automatically detect it
3. Use `/calc-chat <message>` to trigger

## License

MIT

## Author

ShenyfZero9211
