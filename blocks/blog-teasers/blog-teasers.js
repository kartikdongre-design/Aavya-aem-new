export default function decorate(block) {
  const list = block.querySelector('ul');
  if (!list) return;
  list.classList.add('blog-teasers-list');
  [...list.children].forEach((item) => {
    item.classList.add('blog-teasers-item');
  });
}
