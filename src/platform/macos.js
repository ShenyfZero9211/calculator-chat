const { execSync } = require('child_process');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function launchCalculator() {
  try {
    execSync('open -a Calculator', { stdio: 'ignore' });
    await sleep(500);
  } catch (error) {
    console.error('Failed to launch Calculator:', error.message);
    throw error;
  }
}

async function typeNumber(number) {
  if (!number) {
    throw new Error('Number parameter is required');
  }
  
  const chars = number.split('').join(' ');
  const script = `
    tell application "Calculator"
      activate
    end tell
    delay 0.3
    tell application "System Events"
      keystroke "${chars}"
    end tell
  `;
  
  try {
    execSync(`osascript -e '${script}'`, { stdio: ['ignore', 'ignore', 'pipe'] });
  } catch (error) {
    console.error('Failed to type to Calculator:', error.message);
    throw error;
  }
}

module.exports = { launchCalculator, typeNumber };
