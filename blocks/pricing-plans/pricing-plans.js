export default function decorate(block) {
  const list = block.querySelector('ul');
  if (!list) return;

  list.classList.add('pricing-plans-list');
  [...list.children].forEach((item) => {
    item.classList.add('pricing-plans-item');
    const firstStrong = item.querySelector(':scope strong');
    if (firstStrong && /popular|featured/i.test(firstStrong.textContent)) {
      item.classList.add('is-featured');
    }
  });
}
