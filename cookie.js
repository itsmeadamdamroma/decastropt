// cookie.js — GDPR cookie banner with GA4 Consent Mode V2
(function(){
  if (localStorage.getItem('cookieConsent')) return;
  var bar = document.createElement('div');
  bar.id = 'cookie-bar';
  bar.style.cssText = 'position:fixed;bottom:0;left:0;right:0;z-index:9999;background:#0F172A;color:#F8FAFC;padding:12px 16px;display:flex;gap:12px;align-items:center;justify-content:center;flex-wrap:wrap;font-family:Outfit,sans-serif;font-size:14px;border-top:1px solid rgba(249,115,22,0.2)';
  bar.innerHTML = '<span>Usiamo cookie per analytics. <a href="/privacy.html" style="color:#F97316;text-decoration:underline">Info</a></span><button id="cookie-accept" style="background:#F97316;color:#fff;border:none;padding:6px 16px;border-radius:6px;cursor:pointer;font-family:Oswald,sans-serif;text-transform:uppercase;font-size:12px">OK</button><button id="cookie-deny" style="background:transparent;color:#94A3B8;border:1px solid #334155;padding:6px 16px;border-radius:6px;cursor:pointer;font-size:12px">Rifiuta</button>';
  document.body.appendChild(bar);
  function close(){ bar.remove(); }
  document.getElementById('cookie-accept').onclick = function(){
    localStorage.setItem('cookieConsent','accepted');
    if (window.gtag) {
      gtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted'
      });
    }
    close();
  };
  document.getElementById('cookie-deny').onclick = function(){
    localStorage.setItem('cookieConsent','denied');
    if (window.gtag) {
      gtag('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied'
      });
    }
    close();
  };
})();
