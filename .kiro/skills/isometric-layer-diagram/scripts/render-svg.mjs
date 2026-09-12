#!/usr/bin/env node
// Rasterise an SVG so the figure can actually be looked at before it ships.
// Usage: node render-svg.mjs <input.svg> <output.png> [width=1400]
//
// One-off setup, from the workspace root (leaves package.json untouched):
//   npm install --no-save @resvg/resvg-js
//
// Render at 2x the SVG's nominal width: small type that survives 2x survives
// the blog's ~700px display width. resvg is deliberately stricter than a
// browser about CSS, which makes it a useful canary for unsupported syntax
// such as the `font:` shorthand.

import { readFileSync, writeFileSync } from 'node:fs';

const [src, dst, width = '1400'] = process.argv.slice(2);

if (!src || !dst) {
  console.error('usage: node render-svg.mjs <input.svg> <output.png> [width]');
  process.exit(2);
}

let Resvg;
try {
  ({ Resvg } = await import('@resvg/resvg-js'));
} catch {
  console.error('@resvg/resvg-js is not installed.');
  console.error('Run from the workspace root: npm install --no-save @resvg/resvg-js');
  process.exit(1);
}

const resvg = new Resvg(readFileSync(src, 'utf8'), {
  fitTo: { mode: 'width', value: Number(width) },
  font: { loadSystemFonts: true },
});

writeFileSync(dst, resvg.render().asPng());
console.log(`rendered ${src} -> ${dst} @ ${width}px`);
