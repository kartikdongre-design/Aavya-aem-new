export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];
  if (rows.length < 2) return;

  const viewport = document.createElement('div');
  viewport.className = 'testimonials-slider-viewport';
  const track = document.createElement('div');
  track.className = 'testimonials-slider-track';
  viewport.append(track);

  rows.forEach((row) => {
    const slide = document.createElement('article');
    slide.className = 'testimonials-slider-slide';
    slide.append(...row.children);
    track.append(slide);
    row.remove();
  });

  const controls = document.createElement('div');
  controls.className = 'testimonials-slider-controls';
  const prev = document.createElement('button');
  prev.className = 'testimonials-slider-btn';
  prev.type = 'button';
  prev.setAttribute('aria-label', 'Previous testimonial');
  prev.textContent = 'Prev';
  const next = document.createElement('button');
  next.className = 'testimonials-slider-btn';
  next.type = 'button';
  next.setAttribute('aria-label', 'Next testimonial');
  next.textContent = 'Next';
  controls.append(prev, next);

  block.append(viewport, controls);

  let index = 0;
  const slides = [...track.children];

  const render = () => {
    track.style.transform = `translateX(-${index * 100}%)`;
  };

  prev.addEventListener('click', () => {
    index = (index - 1 + slides.length) % slides.length;
    render();
  });

  next.addEventListener('click', () => {
    index = (index + 1) % slides.length;
    render();
  });

  render();
}
