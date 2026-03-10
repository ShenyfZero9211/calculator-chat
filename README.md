---
name: calculator-chat
description: "用系统计算器数字回应用户。当用户发送 /calc-chat 或表达情感时，在系统计算器上显示对应数字（如 520=我爱你，88=再见）。支持中文谐音翻译、天气、感谢等多种场景。"
metadata:
  {
    "openclaw": {
      "emoji": "🧮",
      "requires": {
        "bins": ["node", "python3", "gnome-calculator"]
      }
    }
  }
---

# Calculator Chat 🧮

让 AI 用计算器数字来回应你！

## 简介

当用户说"我爱你"、"再见"、"恭喜发财"等话时，自动在系统计算器上显示对应的数字。

- 💬 自然语言理解
- 🧮 调用系统计算器
- ✨ 支持中文谐音翻译

## 触发方式

### 方式一：命令触发
```
/calc-chat 我爱你
/calc-chat 再见
/calc-chat 恭喜发财
```

### 方式二：自动触发
当用户表达情感时自动理解并响应。

## 翻译规则

| 你说 | 计算器显示 | 含义 |
|-----|-----------|------|
| 我爱你 / 爱你 / 喜欢 | 520 | 我爱你 |
| 一生一世 / 永恒 | 1314 | 一生一世 |
| 再见 / 拜拜 / 走了 | 88 | 再见 |
| 好累 / 哭 / 难过 | 555 | 呜呜呜 |
| 恭喜 / 发财 / 有钱 | 888 | 發發發 |
| 666 / 厉害 / 牛 | 666 | 厉害 |
| 帮我 / 救命 | 995 | 救救我 |
| 生日 / 生日快乐 | 218 | 愛吧 |
| 想你 / 么么 / 亲亲 | 777 | 亲亲亲 |
| 顺利 / 成功 / 加油 | 66 | 顺顺 |
| 天气好 / 天气晴 | 88 | 好天气 |
| 谢谢 / 感谢 | 88 | 不客气 |

## 数字解读

| 你说 | 解读 | 回应 |
|-----|------|------|
| 520 | 我爱你 | 1314 |
| 1314 | 一生一世 | 520 |
| 666 | 厉害 | 888 |

## 安装

```bash
# 本地安装
npm install -g calculator-chat

# 或从 GitHub 安装
npm install -g https://github.com/ShenyfZero9211/calculator-chat.git
```

## 使用

```bash
# 基本用法
calc-chat "我爱你"
calc-chat "恭喜发财"
calc-chat "520+888"

# OpenClaw 中使用
/calc-chat 我爱你
```

## 技术实现

- **自动检测桌面环境** (Wayland/X11)
- **gnome-calculator** 打开系统计算器
- **Python + GTK** 调用系统计算器 API
- 支持 Linux (Ubuntu/GNOME)

## 依赖

- Node.js
- Python 3
- gnome-calculator (系统计算器)

## License

MIT
