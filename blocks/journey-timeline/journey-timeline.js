/**
 * "Our Journey Through The Years" — interactive horizontal timeline.
 * Authoring: row 1 = [ h2 + intro | empty cell ];
 * row 2 = one cell with <ul><li> per era: year tag, h3, p(s), picture.
 * @param {Element} block The block element
 */
export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];
  if (rows.length < 2) return;

  const headerRow = rows[0];
  const listRow = rows[1];
  const introCol = headerRow.children[0];
  const ul = listRow.querySelector(':scope ul');

  if (!introCol || !ul) return;

  const items = [...ul.querySelectorAll(':scope > li')];
  if (items.length === 0) return;

  const slides = items.map((li) => {
    const yearEl = li.querySelector('.journey-timeline__year-tag')
      || li.querySelector(':scope > p:first-of-type');
    const year = yearEl ? yearEl.textContent.trim() : '';
    const h3 = li.querySelector('h3');
    const title = h3 ? h3.textContent.trim() : '';
    const pics = li.querySelector('picture');
    const bodyPs = [...li.querySelectorAll('p')]
      .filter((p) => !p.classList.contains('journey-timeline__year-tag'))
      .map((p) => p.cloneNode(true));
    return {
      year, title, bodyPs, picture: pics ? pics.cloneNode(true) : null,
    };
  });

  const configuredYear = (block.dataset.defaultYear || '').trim();
  let active = 0;
  if (configuredYear) {
    const configuredIndex = slides.findIndex((s) => s.year.includes(configuredYear));
    if (configuredIndex >= 0) active = configuredIndex;
  }

  const shell = document.createElement('div');
  shell.className = 'journey-timeline__shell';

  const header = document.createElement('div');
  header.className = 'journey-timeline__header';

  const introWrap = document.createElement('div');
  introWrap.className = 'journey-timeline__intro-wrap';
  introWrap.append(...introCol.childNodes);

  const controls = document.createElement('div');
  controls.className = 'journey-timeline__controls';
  const prevBtn = document.createElement('button');
  prevBtn.type = 'button';
  prevBtn.className = 'journey-timeline__btn journey-timeline__btn--prev';
  prevBtn.setAttribute('aria-label', 'Previous era');
  prevBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M15 18l-6-6 6-6"/></svg>';
  const nextBtn = document.createElement('button');
  nextBtn.type = 'button';
  nextBtn.className = 'journey-timeline__btn journey-timeline__btn--next';
  nextBtn.setAttribute('aria-label', 'Next era');
  nextBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M9 18l6-6-6-6"/></svg>';
  controls.append(prevBtn, nextBtn);
  header.append(introWrap, controls);

  const railWrap = document.createElement('div');
  railWrap.className = 'journey-timeline__rail-wrap';
  const rail = document.createElement('div');
  rail.className = 'journey-timeline__rail';
  rail.setAttribute('role', 'tablist');
  rail.setAttribute('aria-label', 'Timeline by era');

  const yearButtons = slides.map((s, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'journey-timeline__year';
    b.setAttribute('role', 'tab');
    b.setAttribute('aria-selected', i === active ? 'true' : 'false');
    b.setAttribute('id', `journey-tab-${i}`);
    b.setAttribute('aria-controls', 'journey-panel');
    b.dataset.index = String(i);
    b.textContent = s.year;
    return b;
  });
  yearButtons.forEach((b) => rail.append(b));

  const ruler = document.createElement('div');
  ruler.className = 'journey-timeline__ruler';
  ruler.setAttribute('aria-hidden', 'true');

  const railLine = document.createElement('div');
  railLine.className = 'journey-timeline__rail-line';
  railLine.setAttribute('aria-hidden', 'true');

  railWrap.append(rail, ruler, railLine);

  const detail = document.createElement('div');
  detail.className = 'journey-timeline__detail';
  detail.id = 'journey-panel';
  detail.setAttribute('role', 'tabpanel');
  detail.setAttribute('aria-labelledby', `journey-tab-${active}`);
  detail.setAttribute('aria-live', 'polite');

  const detailBody = document.createElement('div');
  detailBody.className = 'journey-timeline__detail-body';
  detail.append(detailBody);
  detail.style.setProperty('--journey-cols', String(slides.length));

  shell.append(header, railWrap, detail);

  block.textContent = '';
  block.append(shell);

  function setSlide(i) {
    const idx = ((i % slides.length) + slides.length) % slides.length;
    active = idx;
    const slide = slides[idx];

    yearButtons.forEach((btn, j) => {
      const on = j === idx;
      btn.classList.toggle('is-active', on);
      btn.setAttribute('aria-selected', on ? 'true' : 'false');
    });

    detail.setAttribute('aria-labelledby', `journey-tab-${idx}`);
    detail.style.setProperty('--journey-active', String(idx));

    detailBody.textContent = '';
    if (slide.title) {
      const ht = document.createElement('h3');
      ht.className = 'journey-timeline__slide-title';
      ht.textContent = slide.title;
      detailBody.append(ht);
    }
    slide.bodyPs.forEach((p) => {
      detailBody.append(p.cloneNode(true));
    });
    if (slide.picture) {
      detailBody.append(slide.picture.cloneNode(true));
    }
  }

  yearButtons.forEach((btn) => {
    btn.addEventListener('click', () => setSlide(Number(btn.dataset.index)));
  });

  prevBtn.addEventListener('click', () => setSlide(active - 1));
  nextBtn.addEventListener('click', () => setSlide(active + 1));

  shell.tabIndex = 0;
  shell.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setSlide(active - 1);
    }
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      setSlide(active + 1);
    }
  });

  setSlide(active);
}
