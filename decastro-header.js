// Header unificato Decastro PT — replica del componente SPA (site-nav).
// Injection: qualsiasi pagina include questo script e ottiene header+drawer identici alla home.
// ponytail: script unico invece di header duplicato in 13 file HTML.
(function () {
  var LANG = document.documentElement.lang === 'en' ? 'en' : 'it';
  var T = {
    it: { metodo: 'Metodo', servizi: 'Servizi', storie: 'Storie', blog: 'Blog', risorse: 'Risorse', chisono: 'Chi sono', faq: 'FAQ', cta: 'Richiedi scheda' },
    en: { metodo: 'Method', servizi: 'Services', storie: 'Stories', blog: 'Blog', risorse: 'Resources', chisono: 'About', faq: 'FAQ', cta: 'Get your plan' }
  }[LANG];

  var placeholder = document.querySelector('[data-decastro-header]');
  var old = document.querySelector('header.hd-bar, header.site-header');
  var mount = placeholder || old;
  if (!mount) return;

  // link identici alla nav SPA: le ancore puntano alla home
  var links = [
    ['/#metodo', T.metodo],
    ['/servizi.html', T.servizi],
    ['/#storie', T.storie],
    ['/blog/', T.blog],
    ['/risorse/', T.risorse],
    ['/chi-sono.html', T.chisono],
    ['/#faq', T.faq]
  ];

  var here = location.pathname;
  var navHTML = links.map(function (l) {
    var active = (l[0] === here) ? ' class="active"' : '';
    return '<a href="' + l[0] + '"' + active + '>' + l[1] + '</a>';
  }).join('');

  var el = document.createElement('header');
  el.className = 'site-header';
  el.id = 'siteHeader';
  el.setAttribute('data-testid', 'site-nav');
  el.innerHTML =
    '<div class="nav-container">' +
      '<a href="/" class="nav-brand">Decastro<span>.</span></a>' +
      '<nav class="nav-desktop-links">' + navHTML + '</nav>' +
      '<div class="nav-actions">' +
        '<a href="/assessment.html" class="nav-cta-btn">' + T.cta + '</a>' +
        '<button class="nav-burger-btn" id="burgerBtn" aria-label="Menu" aria-expanded="false">' +
          '<svg class="icon-menu" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="18" y2="18"/></svg>' +
          '<svg class="icon-close" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>' +
        '</button>' +
      '</div>' +
    '</div>' +
    '<nav class="nav-mobile-drawer" id="mobileDrawer" aria-hidden="true">' +
      navHTML +
      '<a href="/assessment.html" class="drawer-cta">' + T.cta + '</a>' +
    '</nav>';

  mount.parentNode.insertBefore(el, mount.nextSibling);
  mount.remove();

  // scrolled + burger
  function toggleScroll() { el.classList.toggle('scrolled', window.scrollY > 40); }
  window.addEventListener('scroll', toggleScroll, { passive: true });
  toggleScroll();

  var burger = el.querySelector('#burgerBtn');
  var drawer = el.querySelector('#mobileDrawer');
  burger.addEventListener('click', function () {
    var open = drawer.classList.toggle('is-open');
    burger.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    drawer.setAttribute('aria-hidden', open ? 'false' : 'true');
  });
  drawer.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      drawer.classList.remove('is-open');
      burger.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
      drawer.setAttribute('aria-hidden', 'true');
    });
  });
})();
