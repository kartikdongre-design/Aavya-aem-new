import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

const svg = {
  logo: `<svg class="footer__logo-icon" width="48" height="48" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
    <path fill="currentColor" d="M8 8h14v14H8V8zm18 0h14v14H26V8zM8 26h14v14H8V26zm18 0h14v14H26V26z" opacity=".95"/>
    <path fill="currentColor" d="M22 22h4v4h-4v-4z" opacity=".6"/>
  </svg>`,
  mail: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="m22 6-10 7L2 6"/></svg>',
  phone: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
  pin: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  facebook: '<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>',
  x: '<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
  instagram: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
  linkedin: '<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>',
  youtube: '<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>',
};

function getFallbackFooterHtml() {
  const desc = 'Delivers manufacturing solutions for construction, including ceramics, sanitary ware, '
    + 'water heaters, red bricks, bathroom pods, and industrial minerals. Focuses on integrity, unity, '
    + 'and agility in operations and customer relations.';
  return [
    '<div class="footer__grid">',
    '<div class="footer__col footer__col--brand">',
    `<a class="footer__logo" href="/">${svg.logo}`,
    '<span class="footer__logo-text">',
    '<span class="footer__logo-en">Velvora</span>',
    '</span></a>',
    `<p class="footer__lead">${desc}</p>`,
    '<ul class="footer__social" aria-label="Social media">',
    `<li><a href="#" aria-label="Facebook">${svg.facebook}</a></li>`,
    `<li><a href="#" aria-label="X">${svg.x}</a></li>`,
    `<li><a href="#" aria-label="Instagram">${svg.instagram}</a></li>`,
    `<li><a href="#" aria-label="LinkedIn">${svg.linkedin}</a></li>`,
    `<li><a href="#" aria-label="YouTube">${svg.youtube}</a></li>`,
    '</ul></div>',
    '<div class="footer__col">',
    '<h3 class="footer__heading">Quick Links</h3>',
    '<ul class="footer__links">',
    '<li><a href="/">Home</a></li>',
    '<li><a href="#">About Us</a></li>',
    '<li><a href="#">Products</a></li>',
    '<li><a href="#">Sustainability</a></li>',
    '<li><a href="#">Investors</a></li>',
    '<li><a href="#">Career</a></li>',
    '</ul></div>',
    '<div class="footer__col">',
    '<h3 class="footer__heading">Others</h3>',
    '<ul class="footer__links">',
    '<li><a href="#">Product Catalog</a></li>',
    '<li><a href="#">Departments</a></li>',
    '<li><a href="#">Showrooms</a></li>',
    '<li><a href="#">Downloads Hub</a></li>',
    '</ul></div>',
    '<div class="footer__col">',
    '<h3 class="footer__heading">Contact Us</h3>',
    '<ul class="footer__contact">',
    `<li><span class="footer__contact-icon">${svg.mail}</span>`,
    '<a href="mailto:support@saudiceramics.com">support@gmail.com</a></li>',
    `<li><span class="footer__contact-icon">${svg.phone}</span>`,
    '<a href="tel:+966118298888">(+966) 11 829 8888</a></li>',
    `<li><span class="footer__contact-icon">${svg.pin}</span>`,
    '<span>Riyadh 11481, Kingdom of Saudi Arabia</span></li>',
    `<li><span class="footer__contact-icon">${svg.pin}</span>`,
    '<span>King Fahad Rd, Al Olaya, P.O. Box 3893</span></li>',
    '</ul></div>',
    '</div>',
    '<hr class="footer__rule" />',
    '<div class="footer__bottom">',
    '<p class="footer__copyright">© 2026 Saudi Ceramic. All Rights Reserved</p>',
    '<nav class="footer__legal" aria-label="Legal">',
    '<a href="#">Privacy Policy</a>',
    '<span class="footer__legal-sep" aria-hidden="true">|</span>',
    '<a href="#">Cookies</a>',
    '<span class="footer__legal-sep" aria-hidden="true">|</span>',
    '<a href="#">Sitemap</a>',
    '</nav></div>',
  ].join('');
}

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  let fragment = await loadFragment(footerPath);
  let usedFallback = false;
  if (!fragment) {
    const fallback = document.createElement('main');
    fallback.innerHTML = getFallbackFooterHtml();
    fragment = fallback;
    usedFallback = true;
  }

  block.textContent = '';
  if (usedFallback) {
    block.classList.add('footer--corporate');
  }

  const inner = document.createElement('div');
  inner.className = 'footer__inner';
  while (fragment.firstElementChild) {
    inner.append(fragment.firstElementChild);
  }
  block.append(inner);
}
