const { execSync } = require('child_process');

const LAUNCH_DELAY_MS = 1000;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function launchCalculator() {
  execSync('gnome-calculator &', { stdio: 'ignore' });
  await sleep(LAUNCH_DELAY_MS);
}

async function typeNumber(number) {
  if (!number) {
    throw new Error('Number parameter is required');
  }
  
  try {
    const windowId = execSync('xdotool search --name Calculator | head -1', { encoding: 'utf8' }).trim();
    if (windowId) {
      const keys = number.split('').join(' ');
      execSync(`xdotool windowactivate ${windowId} key ${keys}`, { stdio: 'ignore' });
    } else {
      console.error('Calculator window not found');
    }
  } catch (error) {
    console.error('Failed to type to calculator:', error.message);
    throw error;
  }
}

module.exports = { launchCalculator, typeNumber };
