const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

async function launchCalculator() {
}

async function typeNumber(number) {
  if (number === undefined || number === null || number === '') {
    throw new Error('Number parameter is required');
  }

  const scriptPath = path.join(__dirname, '..', '..', 'temp_calc.ps1');
  const psScript = `
param($Num)

Start-Process calc.exe
Start-Sleep -Seconds 3

Add-Type -AssemblyName System.Windows.Forms
Add-Type @"
using System;
using System.Runtime.InteropServices;
public class Win32 {
    [DllImport("user32.dll")]
    public static extern IntPtr FindWindow(string lpClassName, string lpWindowName);
    [DllImport("user32.dll")]
    public static extern bool SetForegroundWindow(IntPtr hWnd);
}
"@

$hwnd = [Win32]::FindWindow("ApplicationFrameWindow", "Calculator")
if ($hwnd -eq [IntPtr]::Zero) {
    $hwnd = [Win32]::FindWindow("CalcFrame", "Calculator")
}
if ($hwnd -eq [IntPtr]::Zero) {
    $hwnd = [Win32]::FindWindow($null, "Calculator")
}

if ($hwnd -ne [IntPtr]::Zero) {
    [Win32]::SetForegroundWindow($hwnd) | Out-Null
    Start-Sleep -Milliseconds 300
    [System.Windows.Forms.SendKeys]::SendWait("{ESC}")
    Start-Sleep -Milliseconds 100
    [System.Windows.Forms.SendKeys]::SendWait($Num)
} else {
    Write-Host "Calculator not found"
}
`;

  fs.writeFileSync(scriptPath, psScript, 'utf8');
  
  try {
    execSync(`powershell -ExecutionPolicy Bypass -File "${scriptPath}" -Num "${number}"`, { 
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe']
    });
  } catch (error) {
    throw error;
  } finally {
    if (fs.existsSync(scriptPath)) {
      fs.unlinkSync(scriptPath);
    }
  }
}

module.exports = { launchCalculator, typeNumber };
