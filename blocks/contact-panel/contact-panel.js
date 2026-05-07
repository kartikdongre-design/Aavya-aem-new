export default function decorate(block) {
  const row = block.querySelector(':scope > div');
  if (!row) return;
  row.classList.add('contact-panel-row');
  [...row.children].forEach((col) => col.classList.add('contact-panel-col'));
}
