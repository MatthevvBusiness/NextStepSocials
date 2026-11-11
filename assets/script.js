// Next Step Socials — shared navigation, footer, and local contact-form behavior.
const BUSINESS_EMAIL = "hello@nextstepsocials.com"; // Replace with an email address you control before publishing.

const navItems = [
  ["Home", "index.html"], ["Services", "services.html"], ["Pricing", "pricing.html"],
  ["Portfolio", "portfolio.html"], ["About", "about.html"], ["Contact", "contact.html"]
];
const currentPage = location.pathname.split("/").pop() || "index.html";
const header = document.getElementById("site-header");
if (header) {
  header.innerHTML = `
    <div class="topbar"><div class="container topbar-inner"><span>Helping your business take the next step.</span><span>WEBSITES · SOCIAL MEDIA · DIGITAL SUPPORT</span></div></div>
    <header class="site-header"><div class="container nav-wrap">
      <a class="brand" href="index.html" aria-label="Next Step Socials home"><img class="brand-logo" src="assets/logo-option-2.svg" alt="Next Step Socials"></a>
      <button class="menu-toggle" aria-label="Open navigation" aria-expanded="false"><span></span><span></span><span></span></button>
      <nav class="main-nav" aria-label="Main navigation">${navItems.map(([label,href]) => `<a href="${href}" ${currentPage===href?'aria-current="page"':''}>${label}</a>`).join("")}</nav>
      <a class="nav-cta" href="contact.html">Let's talk <span>→</span></a>
    </div></header>`;
  const toggle = header.querySelector(".menu-toggle");
  const nav = header.querySelector(".main-nav");
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") !== "true";
    toggle.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("is-open", open);
  });
}
const footer = document.getElementById("site-footer");
if (footer) footer.innerHTML = `
  <footer class="site-footer"><div class="container">
    <div class="footer-main"><div class="footer-brand"><a class="brand brand-light" href="index.html"><img class="brand-logo" src="assets/logo-option-2.svg" alt="Next Step Socials"></a><p>Your business. Our digital expertise.</p></div>
    <div class="footer-links"><b>EXPLORE</b><a href="services.html">Services</a><a href="pricing.html">Pricing</a><a href="portfolio.html">Portfolio</a><a href="about.html">About us</a></div>
    <div class="footer-links"><b>GET STARTED</b><a href="contact.html">Contact</a><a href="contact.html">Request a consultation</a><span>Serving small businesses<br>in towns and cities.</span></div></div>
    <div class="footer-bottom"><span>© <span id="year"></span> Next Step Socials. All rights reserved.</span><span>Helping Your Business Take the Next Step.</span></div>
  </div></footer>`;
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

const params = new URLSearchParams(location.search);
const packageSelect = document.getElementById("package-select");
if (packageSelect && params.has("package")) {
  const wanted = params.get("package");
  const option = [...packageSelect.options].find(o => o.text.toLowerCase().startsWith(wanted.toLowerCase()));
  if (option) packageSelect.value = option.value;
}
const form = document.getElementById("contact-form");
if (form) form.addEventListener("submit", event => {
  event.preventDefault();
  const data = new FormData(form);
  const subject = encodeURIComponent(`Website inquiry from ${data.get("name")} — Next Step Socials`);
  const body = encodeURIComponent(
`Name: ${data.get("name")}
Business: ${data.get("business") || "Not provided"}
Email: ${data.get("email")}
Phone: ${data.get("phone") || "Not provided"}
Package: ${data.get("package") || "Not sure yet"}

What they'd like help with:
${data.get("message")}`
  );
  const status = document.getElementById("form-status");
  if (BUSINESS_EMAIL === "hello@nextstepsocials.com") {
    status.textContent = "Preview mode: replace hello@nextstepsocials.com in assets/script.js with your real business email before using this form.";
  } else {
    status.textContent = "Your email app should open with your inquiry ready to send. Nothing is sent automatically.";
    location.href = `mailto:${BUSINESS_EMAIL}?subject=${subject}&body=${body}`;
  }
});

// Animate content into view once as visitors scroll; works on every page.
(() => {
  if (!('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Skip the opening hero so the first screen appears immediately.
  const sections = [...document.querySelectorAll('main section:not(.hero)')];
  const revealTargets = [];
  const itemSelector = [
    '.service-card', '.pricing-card', '.price-card', '.plan-card',
    '.portfolio-card', '.project-card', '.work-card',
    '.process-grid > *', '.steps-grid > *', '.feature-card',
    '.faq-item', '.testimonial-card', '.benefit-card'
  ].join(', ');

  sections.forEach((section, sectionIndex) => {
    const items = [...section.querySelectorAll(itemSelector)];
    const heading = section.querySelector('.section-heading');
    if (heading) revealTargets.push([heading, 'up', 0]);
    if (items.length) {
      items.forEach((item, index) => {
        revealTargets.push([item, 'pop', Math.min(index % 4, 3) * 110]);
      });
    }
    // For text-led sections, reveal the main columns from opposing sides.
    const layout = section.querySelector('.intro-grid, .split-cta, .final-cta-inner, .about-grid, .contact-grid, .services-grid');
    if (layout && !items.length) {
      [...layout.children].forEach((item, index) => {
        revealTargets.push([item, index % 2 ? 'right' : 'left', index * 90]);
      });
    } else if (!items.length && !heading) {
      const content = section.querySelector('.container');
      if (content) revealTargets.push([content, 'up', 0]);
    }
  });

  // Other content layouts on pages that don't use the standard section classes.
  document.querySelectorAll('main .pricing-grid > *, main .portfolio-grid > *, main .service-grid > *').forEach((item, i) => {
    if (!revealTargets.some(([node]) => node === item))
      revealTargets.push([item, 'pop', (i % 3) * 110]);
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -35px 0px' });

  // Mark initially visible content before enabling hidden states (no flash).
  revealTargets.forEach(([element, direction, delay]) => {
    element.classList.add('scroll-reveal');
    element.dataset.reveal = direction;
    element.style.setProperty('--reveal-delay', `${delay}ms`);
    if (element.getBoundingClientRect().top < window.innerHeight * .88) {
      element.classList.add('is-visible');
    } else {
      observer.observe(element);
    }
  });
  document.documentElement.classList.add('js-reveal-ready');
})();
