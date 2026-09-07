// Riquadro nutrizione (Marta Frattali Clementi) iniettato sotto la sezione servizi della SPA.
// Zero modifiche al bundle React: attende il nodo #servizi nel DOM e inserisce il blocco dopo.
// ponytail: observer one-shot, se la SPA cambia id non si vede nulla (fallback sicuro).
(function () {
  function build() {
    var anchor = document.getElementById('servizi');
    if (!anchor) return false;
    if (document.getElementById('nutrizione-home-card')) return true;

    var wrap = document.createElement('section');
    wrap.id = 'nutrizione-home-card';
    wrap.setAttribute('data-testid', 'nutrizione-home-card');
    wrap.style.cssText = 'position:relative;z-index:2;max-width:1200px;margin:0 auto 96px;padding:0 20px;';

    wrap.innerHTML = [
      '<div style="display:flex;flex-direction:column;gap:28px;padding:36px 28px;background:linear-gradient(135deg,rgba(255,215,0,0.10),rgba(255,215,0,0.02));border:1px solid rgba(255,215,0,0.35);border-radius:0">',
      '  <div style="display:flex;align-items:center;gap:10px">',
      '    <span style="font-size:20px" aria-hidden="true">🥗</span>',
      '    <span style="font-family:var(--font-mono);font-size:11px;text-transform:uppercase;letter-spacing:0.28em;color:var(--accent,#FFD700)">Nutrizione</span>',
      '  </div>',
      '  <div>',
      '    <h3 style="font-family:var(--font-head);font-size:clamp(22px,4vw,30px);text-transform:uppercase;letter-spacing:0.02em;margin:0 0 12px;color:var(--text,#fff)">Dott.ssa Marta Frattali Clementi</h3>',
      '    <p style="font-size:15px;line-height:1.65;color:var(--text-muted,#94A3B8);max-width:640px;margin:0 0 8px">Biologa Nutrizionista (Albo Lazio e Abruzzo AA_101801). In collaborazione con Decastro PT: la nutrizione che lavora insieme alla tua scheda di allenamento.</p>',
      '    <p style="font-size:13px;color:var(--text-muted,#94A3B8);margin:0">Percorsi nutrizionali · Nutrizione sportiva · Recupero · Composizione corporea</p>',
      '  </div>',
      '  <div style="display:flex;gap:14px;flex-wrap:wrap">',
      '    <a href="/nutrizione.html" style="display:inline-block;padding:13px 26px;background:var(--accent,#FFD700);color:#000;font-weight:700;font-size:14px;text-transform:uppercase;letter-spacing:0.06em;text-decoration:none">Scopri il percorso nutrizionale</a>',
      '    <a href="https://www.instagram.com/magianelpiatto/" target="_blank" rel="noopener" style="display:inline-block;padding:13px 26px;border:1px solid rgba(255,215,0,0.45);color:var(--accent,#FFD700);font-weight:600;font-size:14px;text-decoration:none">Instagram @magianelpiatto</a>',
      '  </div>',
      '</div>'
    ].join('');

    anchor.parentNode.insertBefore(wrap, anchor.nextSibling);
    return true;
  }

  if (build()) return;
  var mo = new MutationObserver(function () { if (build()) mo.disconnect(); });
  mo.observe(document.body, { childList: true, subtree: true });
  // rete di sicurezza: mai oltre 15s
  setTimeout(function () { mo.disconnect(); }, 15000);
})();
