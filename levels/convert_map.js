
// Call this function with >> node .\convert_map.js


const fs = require('fs');

const jsonFile = 'map.json';
const jsFile = 'map.js';

// Read map.json
const jsonContent = fs.readFileSync(jsonFile, 'utf8');

// Create the JS content
const jsContent = `const mapData = ${jsonContent};\n`;

// Write it to mapData.js
fs.writeFileSync(jsFile, jsContent);
console.log(`map.js updated from ${jsonFile}`);