---
name: calculator-chat
description: Use when user sends /calc <message> command to communicate via system calculator with AI-inferred number responses
---

# Calculator Chat Skill

## Overview

This skill allows AI to respond to users by typing numbers/symbols into the system calculator instead of text. **The AI decides what number to output based on understanding the user's message.**

## Trigger

When user sends a message starting with `/calc `:
```
/calc 我需要你的帮助
/calc 祝你平安
/calc 520
```

## AI Response Logic

The AI should **think and infer** the appropriate number response:

### 1. Chinese Homophones (谐音)
| Message | Response | Reason |
|---------|----------|--------|
| 我需要你的帮助 | 995 | 救救我 |
| 祝你平安 | 88 | 拜拜 |
| 好累啊 | 555 | 呜呜呜 |
| 气球 | 88 | 發發 |
| 财源广进 | 888 | 發發發 |
| 祝你顺利 | 66 | 顺顺 |
| 想你想你想你 | 777 | 亲亲亲 |

### 2. Number Understanding
If user sends a number, interpret its meaning:
- 520 → "我爱你" → respond with 1314 (一生一世)
- 1314 → "一生一世" → respond with 520 (我爱你)
- 666 → "666" (厉害) → respond with 888

### 3. Context-Based Responses
- User expresses love → 520, 1314, 3344 (生生世世)
- User says goodbye → 88, 007 (OK)
- User needs help → 995, 110
- User says happy birthday → 218, 888

### 4. Fallback
If no clear inference, use Unicode sum.

## Response Flow

1. Extract message after `/calc ` prefix
2. AI analyzes message and infers appropriate number/code
3. Launch system calculator (platform-specific)
4. Type the number code into calculator

## Platform Commands

| Platform | Launch | Type Keys |
|----------|--------|-----------|
| Windows | `start calc.exe` | PowerShell SendKeys |
| macOS | `open -a Calculator` | AppleScript keystroke |
| Linux | `gnome-calculator &` | xdotool |

## Usage

```bash
calc-chat "<number>"
```

Example: `calc-chat "520"`
