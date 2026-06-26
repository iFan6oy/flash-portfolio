// One-off: rasterize the branded OG card (og-source.svg) to a static public/og.png.
// Uses sharp (already present via Astro). Re-run after editing og-source.svg:
//   node gen-og.mjs
import sharp from 'sharp';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const dir = fileURLToPath(new URL('.', import.meta.url));
const svg = readFileSync(dir + 'og-source.svg');

await sharp(svg, { density: 160 }) // supersample for crisp text, then fit to 1200x630
  .resize(1200, 630)
  .png()
  .toFile(dir + 'public/og.png');

console.log('og.png written to', dir + 'public/og.png');
