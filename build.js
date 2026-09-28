const fs = require('fs');
const JavaScriptObfuscator = require('javascript-obfuscator');

console.log('Reading game.dev.js...');
const source = fs.readFileSync('game.dev.js', 'utf8');
console.log('Source size:', source.length, 'bytes');

console.log('Obfuscating code (làm rối mã nguồn)...');
const startTime = Date.now();

const obfuscationResult = JavaScriptObfuscator.obfuscate(source, {
  compact: true,
  identifierNamesGenerator: 'hexadecimal',
  renameGlobals: false,
  selfDefending: false,
  stringArray: true,
  stringArrayEncoding: ['base64'],
  stringArrayThreshold: 0.75,
  stringArrayRotate: true,
  stringArrayShuffle: true,
  transformObjectKeys: true,
  unicodeEscapeSequence: false
});

const obfuscatedCode = obfuscationResult.getObfuscatedCode();
const duration = ((Date.now() - startTime) / 1000).toFixed(2);
console.log(`Obfuscation finished in ${duration}s!`);
console.log('Obfuscated size:', obfuscatedCode.length, 'bytes');

fs.writeFileSync('game.js', obfuscatedCode);
console.log('Updated game.js with obfuscated code.');

// Bump version in sw.js to ensure clients reload
let sw = fs.readFileSync('sw.js', 'utf8');
const verMatch = sw.match(/const VERSION\s*=\s*'([^']+)'/);
if (verMatch) {
  const oldVer = verMatch[1];
  const newVer = 'trasua-' + Date.now();
  sw = sw.replace(oldVer, newVer);
  fs.writeFileSync('sw.js', sw);
  console.log(`Updated sw.js version from ${oldVer} to ${newVer}`);
}
