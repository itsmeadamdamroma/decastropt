// Append legal links to the site footer on the main SPA
(function(){
  function addLegalLinks(){
    var footer = document.querySelector('footer, [data-testid="site-footer"]');
    if (!footer) return;
    if (footer.querySelector('.dc-legal-links')) return;
    var div = document.createElement('div');
    div.className = 'dc-legal-links';
    div.style.cssText = 'margin-top:16px;display:flex;gap:16px;flex-wrap:wrap;justify-content:center;';
    div.innerHTML = '<a href="/privacy.html" style="color:#475569;font-family:\'Space Mono\',monospace;font-size:11px;text-transform:uppercase;letter-spacing:0.05em;text-decoration:none;transition:color .2s">Privacy Policy</a><a href="/termini.html" style="color:#475569;font-family:\'Space Mono\',monospace;font-size:11px;text-transform:uppercase;letter-spacing:0.05em;text-decoration:none;transition:color .2s">Terms of Service</a>';
    footer.appendChild(div);
  }
  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', addLegalLinks);
  } else {
    addLegalLinks();
  }
  setTimeout(addLegalLinks, 1000);
  setTimeout(addLegalLinks, 3000);
}());
