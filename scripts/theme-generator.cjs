function generateThemeCSS(data) {
  const ds = data.designSystems[0].designSystem;
  const colors = ds.theme.namedColors || {};
  const spacing = ds.theme.spacing || {};
  
  let cssLines = ['@theme {'];
  
  // Add colors
  for (const [key, val] of Object.entries(colors)) {
    cssLines.push(`  --color-${key}: ${val};`);
  }
  
  // Add spacing
  for (const [key, val] of Object.entries(spacing)) {
    cssLines.push(`  --spacing-${key}: ${val};`);
  }
  
  cssLines.push('}');
  return cssLines.join('\n');
}

module.exports = { generateThemeCSS };
