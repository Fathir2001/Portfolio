import sharp from 'sharp';
import fs from 'node:fs/promises';

// Existing captures only. No remote requests or fabricated project imagery.
const liveProjects = ['chem-is-try', 'pink-cosmetics', 'hireme', 'nandos', 'mi-creations', 'i-touch', 'zyndigo', 'think-different'];
await fs.mkdir('public/images/screens', { recursive: true });
for (const id of liveProjects) {
  for (const kind of ['desktop', 'mobile']) {
    await sharp(`artifacts/captures/${id}-${kind}.png`)
      .webp({ lossless: true })
      .toFile(`public/images/screens/${id}-${kind}.webp`);
  }
}
for (const [id, source] of [
  ['trektempo', 'TravelApp.png'], ['rf-stores', 'RF Stores.jpg'],
  ['busify', 'Busify.png'], ['foodie-fix', 'Restaurent.png'],
]) {
  await sharp(`public/images/${source}`).resize({ width: 1920, withoutEnlargement: true })
    .webp({ quality: 95 }).toFile(`public/images/screens/${id}-overview.webp`);
}
console.log('Prepared existing project captures and optimized academic overview images.');
