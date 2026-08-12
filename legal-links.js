// legal-links.js — inject footer legal links if missing
(function(){
  var footer = document.querySelector('.footer');
  if (!footer) return;
  var hasPrivacy = footer.querySelector('a[href*="privacy"]');
  var hasTerms = footer.querySelector('a[href*="terms"]');
  if (hasPrivacy && hasTerms) return;
  var p = document.createElement('p');
  p.style.cssText = 'margin-top:8px;font-size:13px;color:#64748B';
  var links = [];
  if (!hasPrivacy) links.push('<a href="/privacy.html" style="color:#64748B;text-decoration:none">Privacy</a>');
  if (!hasTerms) links.push('<a href="/terms.html" style="color:#64748B;text-decoration:none">Termini</a>');
  p.innerHTML = links.join(' <span style="color:#334155">·</span> ');
  footer.appendChild(p);
})();
