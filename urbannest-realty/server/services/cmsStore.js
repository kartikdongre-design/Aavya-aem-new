import { readJsonFile, writeJsonFile } from './jsonStore.js';

export async function readCmsContent() {
  const data = await readJsonFile('cms-content.json');
  return data || {};
}

export async function writeCmsContent(content) {
  await writeJsonFile('cms-content.json', content);
}
