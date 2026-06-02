import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const publicData = path.join(root, 'public', 'data');

fs.mkdirSync(publicData, { recursive: true });

for (const file of ['properties.json', 'cms-content.json']) {
  fs.copyFileSync(path.join(root, 'data', file), path.join(publicData, file));
}

console.log('[urbannest] Copied data/*.json to public/data/ for AEM static fallback');
