export default function decorate(block) {
  const list = block.querySelector('ul');
  if (!list) return;

  list.classList.add('portfolio-gallery-list');
  [...list.children].forEach((item) => {
    item.classList.add('portfolio-gallery-item');
    const link = item.querySelector(':scope > a[href]');
    if (link) link.classList.add('portfolio-gallery-card');
  });
}
