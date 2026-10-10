import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const base = new URL('../src/assets/essays/jev-moderation/', import.meta.url);
const source = fileURLToPath(new URL('jev-moderation-hero.png', base));
for (const width of [390, 780, 1200, 1536]) {
  const filename = `jev-moderation-hero${width === 1536 ? '' : `-${width}`}.webp`;
  const output = fileURLToPath(new URL(filename, base));
  const result = await sharp(source)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 85 })
    .toFile(output);
  console.log(
    `${filename}: ${result.width} × ${result.height}, ${result.size} bytes`,
  );
}
