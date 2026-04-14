/**
 * "Let The Numbers Speak" — intro + metrics with optional icons.
 * Authoring: first row, two columns — left: h2 + subtitle; right: one cell per stat
 * (each stat: optional picture/icon, strong value, label text).
 * @param {Element} block The block element
 */
export default function decorate(block) {
  const row = block.querySelector(':scope > div');
  if (!row || row.children.length < 2) return;

  const [intro, metrics] = row.children;
  intro.classList.add('stats-highlight__intro');

  const metricsWrap = metrics;
  metricsWrap.classList.add('stats-highlight__metrics');

  [...metricsWrap.children].forEach((item) => {
    item.classList.add('stats-highlight__metric');
    const ps = [...item.querySelectorAll(':scope > p')];
    if (ps.length >= 2) {
      const wrap = document.createElement('div');
      wrap.className = 'stats-highlight-metric-stack';
      item.insertBefore(wrap, ps[0]);
      wrap.append(ps[0], ps[1]);
    }
  });

  [...metricsWrap.querySelectorAll('.stats-highlight__metric')].forEach((m, i) => {
    if (!m.querySelector('picture, img, svg')) {
      m.classList.add(i === 0 ? 'stats-highlight__metric--factory' : 'stats-highlight__metric--cube');
    }
  });
}
