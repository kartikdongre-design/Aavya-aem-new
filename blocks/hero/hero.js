/**
 * Corporate landing hero: full-bleed image, overlay, CTA pill, carousel dots.
 * Authoring: put text (h1, p…) before the <picture> in the inner cell so `wrapTextNodes`
 * in aem.js does not wrap picture + copy inside one <p> (invalid markup → ghost duplicates).
 * @param {Element} block The block element
 */
export default function decorate(block) {
  const inner = block.querySelector(':scope > div > div');
  if (!inner) return;

  const picture = inner.querySelector('picture');
  const h1 = inner.querySelector('h1');
  if (!picture || !h1) return;

  document.body.classList.add('has-corp-hero');

  block.classList.add('hero--corporate');

  const overlay = document.createElement('div');
  overlay.className = 'hero__overlay';
  overlay.setAttribute('aria-hidden', 'true');

  const contentInner = document.createElement('div');
  contentInner.className = 'hero__content-inner';

  const moveNodes = [...inner.children].filter((node) => node !== picture);
  moveNodes.forEach((node) => contentInner.append(node));

  /* Link may not have .button until decorateButtons runs; it also overwrites className later */
  const cta = contentInner.querySelector('p.button-wrapper a');
  if (cta) {
    const wrap = cta.closest('p.button-wrapper');
    if (wrap) wrap.classList.add('hero__cta-wrap');
    if (!cta.querySelector('.hero__cta-arrow')) {
      const arrow = document.createElement('span');
      arrow.className = 'hero__cta-arrow';
      arrow.setAttribute('aria-hidden', 'true');
      arrow.textContent = '→';
      cta.append(arrow);
    }
  }

  const content = document.createElement('div');
  content.className = 'hero__content';
  content.append(contentInner);

  const carousel = document.createElement('div');
  carousel.className = 'hero__carousel';
  carousel.setAttribute('role', 'tablist');
  carousel.setAttribute('aria-label', 'Featured slides');

  const dotCount = Number.parseInt(block.dataset.slideCount || '4', 10);
  const totalDots = Number.isNaN(dotCount) || dotCount < 1 ? 4 : dotCount;

  for (let i = 0; i < totalDots; i += 1) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'hero__carousel-dot';
    btn.setAttribute('aria-label', `Slide ${i + 1}`);
    btn.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
    if (i === 0) btn.classList.add('is-active');
    carousel.append(btn);
  }

  carousel.addEventListener('click', (e) => {
    const btn = e.target.closest('.hero__carousel-dot');
    if (!btn) return;
    carousel.querySelectorAll('.hero__carousel-dot').forEach((dot) => {
      const on = dot === btn;
      dot.classList.toggle('is-active', on);
      dot.setAttribute('aria-selected', on ? 'true' : 'false');
    });
  });

  inner.textContent = '';
  inner.append(picture, overlay, content, carousel);
}
