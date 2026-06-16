// Rasterize the SVG icons into the PNG sizes the PWA needs.
import sharp from 'sharp';
import { readFileSync } from 'node:fs';
const here = (p) => new URL(p, import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');

const icon = readFileSync(here('../icons/icon.svg'));
const maskable = readFileSync(here('../icons/maskable.svg'));
const badge = readFileSync(here('../icons/badge.svg'));

const jobs = [
  [icon, 192, '../icons/icon-192.png'],
  [icon, 512, '../icons/icon-512.png'],
  [icon, 180, '../icons/apple-touch-icon.png'],
  [maskable, 192, '../icons/maskable-192.png'],
  [maskable, 512, '../icons/maskable-512.png'],
  [badge, 96, '../icons/badge.png'],
  [icon, 32, '../icons/favicon-32.png'],
];

for (const [buf, size, out] of jobs) {
  await sharp(buf, { density: 384 }).resize(size, size).png().toFile(here(out));
  console.log('wrote', out, size + 'px');
}
console.log('icons done');
