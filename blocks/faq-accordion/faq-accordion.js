function pairContent(container) {
  const children = [...container.children];
  const pairs = [];
  let currentQuestion = null;

  children.forEach((el) => {
    if (/^H[2-6]$/.test(el.tagName)) {
      if (currentQuestion) pairs.push(currentQuestion);
      currentQuestion = { title: el, body: [] };
    } else if (currentQuestion) {
      currentQuestion.body.push(el);
    }
  });
  if (currentQuestion) pairs.push(currentQuestion);
  return pairs;
}

export default function decorate(block) {
  const pairs = pairContent(block);
  if (!pairs.length) return;

  block.textContent = '';

  pairs.forEach((pair, idx) => {
    const details = document.createElement('details');
    details.className = 'faq-accordion-item';
    if (idx === 0) details.open = true;

    const summary = document.createElement('summary');
    summary.className = 'faq-accordion-summary';
    summary.textContent = pair.title.textContent;
    details.append(summary);

    const body = document.createElement('div');
    body.className = 'faq-accordion-body';
    pair.body.forEach((node) => body.append(node));
    details.append(body);
    block.append(details);
  });
}
