#!/usr/bin/env node

/**
 * Calculator Chat - 跨平台版本
 * 支持 Linux, Windows, macOS
 */

const { execSync, spawn } = require('child_process');

// 获取平台
function getPlatform() {
  const platform = process.platform;
  if (platform === 'win32') return 'windows';
  if (platform === 'darwin') return 'macos';
  return 'linux';
}

// 数字映射表
const NUMBER_PATTERNS = [
  { pattern: '一生一世', result: '1314' },
  { pattern: '生生世世', result: '3344' },
  { pattern: '生日快乐', result: '218' },
  { pattern: '长长久久', result: '3344' },
  { pattern: '我爱你', result: '520' },
  { pattern: '财源广进', result: '888' },
  { pattern: '恭喜发财', result: '888' },
  { pattern: '有钱', result: '888' },
  { pattern: '发财', result: '888' },
  { pattern: '恭喜', result: '888' },
  { pattern: '爱你', result: '520' },
  { pattern: '喜欢', result: '520' },
  { pattern: '亲亲', result: '777' },
  { pattern: '么么', result: '777' },
  { pattern: '想你', result: '777' },
  { pattern: '永恒', result: '1314' },
  { pattern: '永远', result: '1314' },
  { pattern: '顺利', result: '66' },
  { pattern: '成功', result: '66' },
  { pattern: '加油', result: '66' },
  { pattern: '救命', result: '995' },
  { pattern: '救我', result: '995' },
  { pattern: '帮我', result: '995' },
  { pattern: '好累', result: '555' },
  { pattern: '难过', result: '555' },
  { pattern: '伤心', result: '555' },
  { pattern: '哭', result: '555' },
  { pattern: '再见', result: '88' },
  { pattern: '拜拜', result: '88' },
  { pattern: '走了', result: '88' },
  { pattern: '谢谢', result: '88' },
  { pattern: '感谢', result: '88' },
  { pattern: '天气好', result: '88' },
  { pattern: '天气晴', result: '88' },
  { pattern: '520', result: '1314' },
  { pattern: '1314', result: '520' },
  { pattern: '666', result: '888' },
  { pattern: '厉害', result: '666' },
];

// 解析表达式
function parseExpression(message) {
  let expr = message.toLowerCase();
  let matchedResult = null;
  
  for (const { pattern, result } of NUMBER_PATTERNS) {
    if (expr.includes(pattern.toLowerCase())) {
      matchedResult = result;
      break;
    }
  }
  
  if (matchedResult) {
    if (expr.includes('+') || expr.includes('加')) return matchedResult + '+';
    if (expr.includes('-') || expr.includes('减')) return matchedResult + '-';
    if (expr.includes('*') || expr.includes('乘')) return matchedResult + '*';
    return matchedResult;
  }
  
  const numbers = message.match(/\d+/g);
  if (numbers && numbers.length > 0) {
    return numbers[0];
  }
  
  return '88';
}

// Linux: 使用 gnome-calculator (--equation 会直接显示数字)
function openLinuxCalculator(number) {
  try {
    execSync('pkill -f gnome-calculator', { stdio: 'ignore' });
  } catch (e) {}
  
  // 使用 --equation 直接在计算器上显示数字
  spawn('gnome-calculator', ['--equation', number], {
    detached: true,
    stdio: 'ignore'
  }).unref();
  
  return true;
}

// Windows: 使用 PowerShell 打开计算器并输入
function openWindowsCalculator(number) {
  try {
    // 先打开计算器并激活到前台，然后输入数字
    const ps = `Start-Process calc; Start-Sleep 1; Add-Type -AssemblyName System.Windows.Forms; [System.Windows.Forms.SendKeys]::SendWait('${number}'); [System.Windows.Forms.SendKeys]::SendWait('~')`;
    execSync(`powershell -Command "${ps}"`, {
      stdio: 'ignore',
      windowsHide: false
    });
    return true;
  } catch (e) {
    console.error('Windows error:', e.message);
    return false;
  }
}

// macOS: 使用 AppleScript 打开计算器并输入
function openMacOSCalculator(number) {
  try {
    // 激活计算器到前台，然后输入数字
    const script = `tell app "Calculator" to activate; delay 0.8; tell app "System Events" to keystroke "${number}"; keystroke return`;
    execSync(`osascript -e '${script}'`, { stdio: 'ignore' });
    return true;
  } catch (e) {
    console.error('macOS error:', e.message);
    return false;
  }
}

// 主函数
function main() {
  const message = process.argv.slice(2).join(' ') || '520';
  const platform = getPlatform();
  
  console.log(`💬 你说: "${message}"`);
  console.log(`🖥️ 平台: ${platform}`);
  
  const expr = parseExpression(message);
  console.log(`🔢 数字: ${expr}`);
  
  let success = false;
  
  if (platform === 'linux') {
    success = openLinuxCalculator(expr);
  } else if (platform === 'windows') {
    success = openWindowsCalculator(expr);
  } else if (platform === 'macos') {
    success = openMacOSCalculator(expr);
  }
  
  if (success) {
    console.log('✅ 完成！查看计算器！');
  } else {
    console.log('❌ 打开失败');
  }
}

main();
