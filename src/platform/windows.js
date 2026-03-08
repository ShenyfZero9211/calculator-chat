const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const getBaseDir = () => {
  if (require.main && require.main.filename) {
    return path.dirname(require.main.filename);
  }
  return process.cwd();
};

async function launchCalculator() {
}

async function typeNumber(number) {
  if (number === undefined || number === null || number === '') {
    throw new Error('Number parameter is required');
  }

  const baseDir = getBaseDir();
  const scriptPath = path.join(baseDir, 'temp_calc.ps1');
  const psScript = `
param($Num)

# Check if Calculator is running
$calc = Get-Process -Name "CalculatorApp" -ErrorAction SilentlyContinue

if (-not $calc) {
    # Calculator not running, start it
    Start-Process calc.exe
    Start-Sleep -Seconds 3
}

# Now find and activate Calculator window
Add-Type -AssemblyName System.Windows.Forms
Add-Type @"
using System;
using System.Runtime.InteropServices;
public class Win32 {
    [DllImport("user32.dll")]
    public static extern IntPtr FindWindow(string lpClassName, string lpWindowName);
    [DllImport("user32.dll")]
    public static extern bool SetForegroundWindow(IntPtr hWnd);
    [DllImport("user32.dll")]
    public static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);
}
"@

# Find calculator window
$hwnd = [Win32]::FindWindow("ApplicationFrameWindow", "Calculator")
if ($hwnd -eq [IntPtr]::Zero) {
    $hwnd = [Win32]::FindWindow("CalcFrame", "Calculator")
}
if ($hwnd -eq [IntPtr]::Zero) {
    $hwnd = [Win32]::FindWindow($null, "Calculator")
}

if ($hwnd -ne [IntPtr]::Zero) {
    # Ensure window is visible and activated
    [Win32]::ShowWindow($hwnd, 1) | Out-Null  # SW_SHOW = 1
    Start-Sleep -Milliseconds 100
    [Win32]::SetForegroundWindow($hwnd) | Out-Null
    Start-Sleep -Milliseconds 200
    
    # Clear and type directly
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
  }
  
  if (fs.existsSync(scriptPath)) {
    fs.unlinkSync(scriptPath);
  }
}

module.exports = { launchCalculator, typeNumber };
