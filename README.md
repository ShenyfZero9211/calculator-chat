# Calculator Chat

让 AI 通过系统计算器显示数字来与用户交流的通用工具。

[English](README.md) | [中文](README_CN.md)

---

## 什么是 Calculator Chat？

Calculator Chat 是一个通用的 CLI 工具，允许任何 AI Agent 在系统计算器上显示数字，而不是传统的文字回复。

这创造了一种独特有趣的 AI 交互方式：

- 用户对 AI 说话
- AI 思考回应内容
- AI 在计算器上显示数字代码

```
用户: /calc 我喜欢你
AI: (在计算器上显示 520)
```

---

## 快速开始

### 安装

```bash
npm install -g calculator-chat
```

或直接安装 GitHub 版本：

```bash
npm install -g https://github.com/ShenyfZero9211/calculator-chat.git
```

### 使用

```bash
calc-chat "520"
```

这会在计算器上显示 **520**。

---

## 使用场景

### 1. 谐音数字代码

| 用户消息 | AI 回复 | 含义 |
|---------|--------|------|
| 我需要你的帮助 | 995 | 救救我 |
| 祝你平安 | 88 | 拜拜 |
| 好累啊 | 555 | 呜呜呜 |
| 财源广进 | 888 | 发发发 |
| 想你 | 537 | 我想你 |
| 嫁给我 | 1314520 | 一生一世我爱你 |

### 2. 数字解读

如果用户发送数字，AI 应该解读其含义：

| 用户发送 | AI 解读 | 回应 |
|---------|--------|------|
| 520 | 我爱你 | 1314 (一生一世) |
| 1314 | 一生一世 | 520 (我爱你) |
| 666 | 很厉害 | 888 (祝贺) |

### 3. 情感表达

| 场景 | 建议回复 |
|------|---------|
| 表达爱意 | 520, 1314, 3344 |
| 说再见 | 88, 007 |
| 需要帮助 | 995, 110 |
| 生日快乐 | 218, 888 |

---

## 技术原理

### 工作流程

```
1. 检查计算器是否运行
       ↓
2. 如果没有，启动计算器
       ↓
3. 激活计算器窗口到前台
       ↓
4. 发送数字按键
```

### 平台支持

| 操作系统 | 计算器 | 实现方式 |
|---------|--------|---------|
| Windows | Calculator (应用商店版) | PowerShell + SendKeys |
| macOS | Calculator.app | AppleScript |
| Linux | gnome-calculator | xdotool |

---

## 与 AI Agent 集成

### Python Agent

```python
import subprocess

def send_to_calculator(number: str):
    subprocess.run(["calc-chat", number], check=True)

# 使用
send_to_calculator("520")
```

### Node.js Agent

```javascript
const { execSync } = require('child_process');

function sendToCalculator(number) {
    execSync(`calc-chat "${number}"`);
}

// 使用
sendToCalculator('520');
```

### Claude / OpenAI Agent

```bash
# 在 Tool/Function 中调用
shell: calc-chat "520"
```

### 自定义 AI 平台

任何能执行 shell 命令的 AI 都可以使用：

```bash
# 只需要执行这个命令
calc-chat "520"
```

---

## 故障排除

### Windows

**问题**: 数字没有显示

**解决方案**:
1. 确保计算器是 Windows Store 版本（CalculatorApp）
2. 以管理员权限运行终端

**问题**: 权限被拒绝

```bash
# 以管理员身份打开 PowerShell
powershell -Command "Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned"
```

### macOS

**问题**: 需要辅助功能权限

**解决方案**:
1. 打开系统设置 → 隐私与安全性 → 辅助功能
2. 添加 Terminal 或允许的应用程序

### Linux

**问题**: xdotool 未安装

```bash
# Ubuntu/Debian
sudo apt install xdotool

# Fedora
sudo dnf install xdotool

# Arch
sudo pacman -S xdotool
```

---

## 开发

### 本地开发

```bash
# 克隆项目
git clone https://github.com/ShenyfZero9211/calculator-chat.git
cd calculator-chat

# 安装依赖
npm install

# 测试
npm test
# 或
node src/index.js "520"
```

### 发布新版本

```bash
npm version patch
npm publish
```

---

## 许可证

MIT License

---

## 贡献

欢迎提交 Issue 和 Pull Request！

---

## 相关项目

- [opencode](https://opencode.ai) - AI 编程助手
