---
name: calculator-chat
description: Use when user sends /calc <message> command to communicate via system calculator
---

# Calculator Chat Skill

## Overview

This skill allows AI to respond to users by typing numbers/symbols into the system calculator instead of text.

## Trigger

When user sends a message starting with `/calc `:
```
/calc 我很喜欢你
/calc I love you
```

## Response Flow

1. Extract message after `/calc ` prefix
2. Look up text-to-number mapping in mapping.json
3. If no mapping found, calculate Unicode sum
4. Launch system calculator (platform-specific)
5. Type the number code into calculator

## Text-to-Number Mappings

| Message | Code |
|---------|------|
| 我很喜欢你 | 520 |
| I love you | 143 |
| 想你 | 537 |
| 嫁给我 | 1314520 |

## Platform Commands

| Platform | Launch | Type Keys |
|----------|--------|-----------|
| Windows | `start calc.exe` | PowerShell PostMessage |
| macOS | `open -a Calculator` | AppleScript keystroke |
| Linux | `gnome-calculator &` | xdotool |

## Usage in opencode

```bash
# Install skill
npm install -g .

# Run
calc-chat "我很喜欢你"
```

## Fallback Behavior

If no predefined mapping exists:
- Calculate sum of all character Unicode codes
- Example: "Hi" → 72 + 105 = "177"
