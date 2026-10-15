import sharp from 'sharp';
import fs from 'node:fs/promises';

await fs.mkdir('public/images/thumbnails', { recursive: true });
const screens = (await fs.readdir('public/images/screens')).filter(name => /-(desktop|overview)\.webp$/.test(name));
for (const name of screens) {
  await sharp(`public/images/screens/${name}`)
    .resize(240, 150, { fit: 'contain', background: '#0d1730' })
    .webp({ quality: 85 }).toFile(`public/images/thumbnails/${name}`);
}
await sharp('public/images/Projects/ecoroute-illustration.webp')
  .resize(240, 150, { fit: 'contain', background: '#0d1730' })
  .webp({ quality: 85 }).toFile('public/images/thumbnails/ecoroute-illustration.webp');
console.log('Prepared 13 project thumbnails.');
