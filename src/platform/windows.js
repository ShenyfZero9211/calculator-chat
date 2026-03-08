const { execSync } = require('child_process');

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
    $chars = '${number}'.ToCharArray()
    foreach ($c in $chars) {
        [Win32]::PostMessage($hwnd, 0x0100, [int][char]$c, 0) | Out-Null
        Start-Sleep -Milliseconds 50
    }
  `;
    execSync(`powershell -Command "${psScript.replace(/"/g, '\\"')}"`, { stdio: 'ignore' });
  } catch (error) {
    console.error('Failed to type number:', error.message);
    throw error;
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = { launchCalculator, typeNumber };
