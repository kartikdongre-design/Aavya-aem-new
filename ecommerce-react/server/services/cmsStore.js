import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CMS_FILE = path.resolve(__dirname, '../../data/cms-content.json');

const DEFAULT_CONTENT = {
  homepage: {
    heroTitle: 'Shop Premium Everyday Essentials',
    heroSubtitle: 'Curated products, premium feel, and fast delivery.',
    bannerImage: '',
    featureCards: [],
  },
};

/**
 * @returns {Promise<Record<string, unknown>>}
 */
export async function readCmsContent() {
  try {
    const raw = await fs.readFile(CMS_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : DEFAULT_CONTENT;
  } catch (err) {
    if (err && typeof err === 'object' && 'code' in err && err.code === 'ENOENT') {
      return DEFAULT_CONTENT;
    }
    throw err;
  }
}

/**
 * @param {Record<string, unknown>} content
 */
export async function writeCmsContent(content) {
  await fs.mkdir(path.dirname(CMS_FILE), { recursive: true });
  await fs.writeFile(CMS_FILE, `${JSON.stringify(content, null, 2)}\n`, 'utf8');
}
