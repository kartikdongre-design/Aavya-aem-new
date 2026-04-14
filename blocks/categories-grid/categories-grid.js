/**
 * Product categories masonry-style grid with intro + CTA row.
 * Authoring: row 1 = [ h2 + intro | CTA link ]; row 2 = one cell with <ul><li> per card.
 * Each <li>: <a href> with <picture>, <h3>, and .categories-grid__card-cta for the catalog link.
 * @param {Element} block The block element
 */
const DOWNLOAD_ICON = '<svg class="categories-grid__dl-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" d="M12 3v12m0 0 4-4m-4 4-4-4M4 21h16"/></svg>';

export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];
  if (rows.length < 2) return;

  const introRow = rows[0];
  const listRow = rows[1];
  const introCol = introRow.children[0];
  const actionsCol = introRow.children[1];
  const ul = listRow.querySelector(':scope ul');

  if (!introCol || !ul) return;

  introCol.classList.add('categories-grid__intro');
  if (actionsCol) actionsCol.classList.add('categories-grid__actions');

  ul.classList.add('categories-grid__list');

  const sizeClasses = [
    'categories-grid__item--short',
    'categories-grid__item--tall',
    'categories-grid__item--medium',
    'categories-grid__item--compact',
    'categories-grid__item--short',
    'categories-grid__item--tall',
  ];

  [...ul.children].forEach((li, i) => {
    const sizeClass = sizeClasses[i];
    if (sizeClass) li.classList.add('categories-grid__item', sizeClass);

    const link = li.querySelector(':scope > a[href]');
    if (!link) return;
    link.classList.add('categories-grid__card');

    const cta = li.querySelector('.categories-grid__card-cta');
    if (cta && !cta.querySelector('svg')) {
      cta.insertAdjacentHTML('afterbegin', DOWNLOAD_ICON);
    }
  });
}
