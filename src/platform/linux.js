const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);
const LAUNCH_DELAY_MS = 1000;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function isCommandAvailable(command) {
  try {
    await execAsync(`which ${command}`);
    return true;
  } catch {
    return false;
  }
}

async function launchCalculator() {
  try {
    await execAsync('gnome-calculator &', { stdio: 'ignore' });
    await sleep(LAUNCH_DELAY_MS);
  } catch (error) {
    console.error('Failed to launch calculator:', error.message);
    throw error;
  }
}

async function typeNumber(number) {
  if (!number) {
    throw new Error('Number parameter is required');
  }

  if (!(await isCommandAvailable('xdotool'))) {
    throw new Error('xdotool is not installed');
  }

  try {
    const { stdout: windowId } = await execAsync('xdotool search --name Calculator | head -1');
    const trimmedId = windowId.trim();
    if (trimmedId) {
      const keys = number.split('').join(' ');
      await execAsync(`xdotool windowactivate ${trimmedId} key ${keys}`, { stdio: 'ignore' });
    } else {
      console.error('Calculator window not found');
    }
  } catch (error) {
    console.error('Failed to type to calculator:', error.message);
    throw error;
  }
}

module.exports = { launchCalculator, typeNumber };
