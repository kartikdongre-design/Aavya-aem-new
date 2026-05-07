export default function decorate(block) {
  const list = block.querySelector('ul');
  if (!list) return;

  list.classList.add('services-grid-list');
  [...list.children].forEach((item) => {
    item.classList.add('services-grid-item');
    const link = item.querySelector('a[href]');
    if (link) link.classList.add('services-grid-link');
  });
}
