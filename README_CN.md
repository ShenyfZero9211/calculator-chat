# 计算器聊天 Calculator Chat 🧮

一个 OpenClaw 技能，当用户表达情感或说特定的话时，AI 会将内容翻译成数字并在系统计算器上显示。

## 功能特点

- 💬 **自然语言理解** - 理解"我爱你"、"再见"、"恭喜发财"等表达
- 🧮 **系统计算器集成** - 打开系统计算器并显示翻译后的数字
- 🌐 **多语言支持** - 支持中文谐音和常见表达
- ⚡ **简单易用** - 只需说 `/calc-chat 我爱你` 或使用命令行

## 什么是 OpenClaw？

OpenClaw 是一个本地运行的 AI 助手框架。技能(Skills)用于扩展它的能力。这个技能允许 OpenClaw 用系统计算器上的数字来回应用户，而不是发送文字消息。

## 快速开始

### 安装

```bash
# 通过 npm 安装
npm install -g calculator-chat

# 或从 GitHub 克隆
git clone https://github.com/ShenyfZero9211/calculator-chat.git
cd calculator-chat
npm install
```

### 使用

```bash
# 命令行
calc-chat "我爱你"
calc-chat "恭喜发财"
calc-chat "520+888"

# 在 OpenClaw 中
/calc-chat 我爱你
/calc-chat 再见
```

## 翻译示例

| 你说 | 计算器显示 | 含义 |
|-----|-----------|------|
| 我爱你 / I love you | 520 | 我爱你 |
| 一生一世 / Forever | 1314 | 一生一世 |
| 再见 / Goodbye | 88 | 再见 |
| 好累 / Tired | 555 | 呜呜哭 |
| 恭喜发财 / Congratulations | 888 | 发发发 |
| 666 / Awesome | 666 | 厉害 |
| 帮我 / Help me | 995 | 救救我 |
| 生日 / Birthday | 218 | 爱吧 |
| 想你 / Miss you | 777 | 亲亲亲 |
| 顺利 / Smooth | 66 | 顺顺 |
| 天气好 / Nice weather | 88 | 好！ |
| 谢谢 / Thanks | 88 | 不客气 |

## 工作原理

1. **解析输入** - 分析用户消息，匹配对应模式
2. **翻译转换** - 将消息转换为对应的数字代码
3. **打开计算器** - 启动系统计算器（Linux 上为 gnome-calculator）
4. **显示结果** - 在计算器上显示数字

### 支持的平台

- **Linux** (Ubuntu/GNOME) - gnome-calculator
- **macOS** - Calculator.app（即将支持）
- **Windows** - 计算器（即将支持）

## 依赖要求

- Node.js 14+
- Python 3
- gnome-calculator（Linux）

## OpenClaw 集成

这是一个 OpenClaw 技能。在 OpenClaw 中使用：

1. 将此技能放入 OpenClaw 的 skills 目录
2. OpenClaw 会自动检测到它
3. 使用 `/calc-chat <消息>` 来触发

## 许可证

MIT

## 作者

ShenyfZero9211
