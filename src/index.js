#!/usr/bin/env node

const os = require('os');
const path = require('path');
const { execSync } = require('child_process');
const mapping = require('../mapping.json');

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
  let sum = 0;
  for (let i = 0; i < text.length; i++) {
    sum += text.charCodeAt(i);
  }
  return sum.toString();
}

async function run(message) {
  const platform = getPlatform();
  const numberCode = textToNumber(message);
  
  const platformModule = require(`./platform/${platform}.js`);
  await platformModule.launchCalculator();
  await platformModule.typeNumber(numberCode);
}

const message = process.argv.slice(2).join(' ');
if (message) {
  run(message).catch(console.error);
} else {
  console.log('Usage: calc-chat <message>');
}
