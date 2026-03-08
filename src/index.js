#!/usr/bin/env node

const os = require('os');
const path = require('path');
const { execSync } = require('child_process');
let mapping = {};
try {
  mapping = require('../mapping.json');
} catch (err) {
  console.error('Warning: Could not load mapping.json, using empty mapping');
}

function getPlatform() {
  const platform = os.platform();
  if (platform === 'win32') return 'windows';
  if (platform === 'darwin') return 'macos';
  return 'linux';
}

function textToNumber(text) {
  const lower = text.toLowerCase();
  if (mapping[lower] || mapping[text]) {
    return mapping[lower] || mapping[text];
  }
  // Unicode sum fallback
  let sum = 0;
  for (let i = 0; i < text.length; i++) {
    sum += text.charCodeAt(i);
  }
  return sum.toString();
}

async function run(message) {
  const platform = getPlatform();
  const numberCode = textToNumber(message);
  
  let platformModule;
  try {
    platformModule = require(`./platform/${platform}.js`);
  } catch (err) {
    console.error(`Error: Could not load platform module for ${platform}:`, err.message);
    return;
  }
  
  try {
    await platformModule.launchCalculator();
    await platformModule.typeNumber(numberCode);
  } catch (err) {
    console.error('Error running calculator:', err.message);
  }
}

const message = process.argv.slice(2).join(' ');
if (!message || !message.trim()) {
  console.log('Usage: calc-chat <message>');
} else {
  run(message).catch(console.error);
}
