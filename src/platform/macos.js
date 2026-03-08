const { execSync } = require('child_process');

const LAUNCH_DELAY_MS = 500;
const TYPING_DELAY_SEC = 0.3;

function escapeAppleScript(str) {
  return str.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function launchCalculator() {
  try {
    execSync('open -a Calculator', { stdio: 'ignore' });
    await sleep(LAUNCH_DELAY_MS);
  } catch (error) {
    throw error;
  }
}

async function typeNumber(number) {
  if (!number) {
    throw new Error('Number parameter is required');
  }
  
  const escapedNumber = escapeAppleScript(number);
  const chars = escapedNumber.split('').join(' ');
  const script = `
    tell application "Calculator"
      activate
    end tell
    delay ${TYPING_DELAY_SEC}
    tell application "System Events"
      keystroke "${chars}"
    end tell
  `;
  
  try {
    execSync(`osascript -e '${script}'`, { stdio: ['ignore', 'ignore', 'pipe'] });
  } catch (error) {
    throw error;
  }
}

module.exports = { launchCalculator, typeNumber };
