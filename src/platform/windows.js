const { execSync } = require('child_process');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function launchCalculator() {
  try {
    execSync('start calc.exe', { shell: 'cmd.exe' });
    await sleep(1000);
  } catch (error) {
    console.error('Failed to launch calculator:', error.message);
    throw error;
  }
}

async function typeNumber(number) {
  if (number === undefined || number === null || number === '') {
    throw new Error('Number parameter is required');
  }

  const maxRetries = 3;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const psScript = `
Add-Type @"
using System;
using System.Runtime.InteropServices;
public class Win32 {
    [DllImport("user32.dll")]
    public static extern IntPtr FindWindow(string lpClassName, string lpWindowName);
    [DllImport("user32.dll")]
    public static extern IntPtr FindWindowEx(IntPtr hwndParent, IntPtr hwndChildAfter, string lpszClass, string lpszWindow);
    [DllImport("user32.dll")]
    public static extern int PostMessage(IntPtr hWnd, int Msg, int wParam, int lParam);
}
"@
$calc = Start-Process calc.exe -PassThru
Start-Sleep -Milliseconds 500
$hwnd = $calc.MainWindowHandle
if ($hwnd -eq [IntPtr]::Zero) {
    Start-Sleep -Milliseconds 1000
    $hwnd = $calc.MainWindowHandle
}
if ($hwnd -eq [IntPtr]::Zero) {
    Start-Sleep -Milliseconds 1000
    $hwnd = $calc.MainWindowHandle
}
$chars = $args[0].ToCharArray()
foreach ($c in $chars) {
    # WM_KEYDOWN = 0x0100
    [Win32]::PostMessage($hwnd, 0x0100, [int][char]$c, 0) | Out-Null
    Start-Sleep -Milliseconds 50
}
`;
      const escapedNumber = number.toString().replace(/"/g, '\\"');
      execSync(`powershell -Command "${psScript}" -ArgumentList "${escapedNumber}"`, { 
        stdio: ['ignore', 'ignore', 'pipe']
      });
      break;
    } catch (error) {
      if (attempt === maxRetries - 1) {
        console.error('Failed to type number:', error.message);
        throw error;
      }
      await sleep(500);
    }
  }
}

module.exports = { launchCalculator, typeNumber };
