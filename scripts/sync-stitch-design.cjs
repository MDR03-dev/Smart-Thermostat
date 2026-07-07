const fs = require('fs');
const path = require('path');
const { generateThemeCSS } = require('./theme-generator.cjs');

const jsonPath = path.join(__dirname, '../stitch-design.json');
const cssPath = path.join(__dirname, '../src/index.css');

if (!fs.existsSync(jsonPath)) {
  console.error(`Error: stitch-design.json not found at ${jsonPath}. Please run an export first.`);
  process.exit(1);
}

try {
  const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  const themeCSS = generateThemeCSS(jsonData);
  
  let cssContent = fs.readFileSync(cssPath, 'utf8');
  
  // Replace the @theme block
  const themeRegex = /@theme\s*\{[\s\S]*?\}/;
  if (themeRegex.test(cssContent)) {
    cssContent = cssContent.replace(themeRegex, themeCSS);
    fs.writeFileSync(cssPath, cssContent, 'utf8');
    console.log("Success: src/index.css theme updated!");
  } else {
    console.error("Error: Could not find @theme block in src/index.css");
    process.exit(1);
  }
} catch (err) {
  console.error("Error syncing design:", err.message);
  process.exit(1);
}
