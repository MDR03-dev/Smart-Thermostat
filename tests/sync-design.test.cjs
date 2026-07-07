const assert = require('assert');
const fs = require('fs');
const path = require('path');

// Test input
const sampleInput = {
  designSystems: [{
    designSystem: {
      theme: {
        namedColors: {
          background: '#f7fafc',
          primary: '#031635'
        },
        spacing: {
          base: '8px'
        }
      }
    }
  }]
};

// We will test the generator function
const { generateThemeCSS } = require('../scripts/theme-generator.cjs');

try {
  const cssResult = generateThemeCSS(sampleInput);
  assert.ok(cssResult.includes('--color-background: #f7fafc;'));
  assert.ok(cssResult.includes('--color-primary: #031635;'));
  assert.ok(cssResult.includes('--spacing-base: 8px;'));
  console.log("PASS: parser test");
} catch (err) {
  console.error("FAIL:", err.message);
  process.exit(1);
}
