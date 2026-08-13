const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
const FROM_EMAIL = 'Decastro PT <noreply@decastropt.com>';
const NOTIFY_EMAIL = 'info@decastropt.com';
const SITE_URL = 'https://decastropt.com';
const IG = 'https://instagram.com/decastro_pt_lab';

// Gmail mobile dark mode = FULL COLOR INVERT. Use off-black/off-white to prevent inversion.
const BG = "#1a1a1a", TX = "#e8e8e8", DM = "#94A3B8", AC = "#F97316", SF = "#242424", BD = "rgba(255,255,255,0.12)";
const FH = "'Oswald','Arial Narrow','Helvetica Neue','Impact',sans-serif";
const FB = "'Outfit','Century Gothic','Futura','Trebuchet MS','system-ui',sans-serif";
const FM = "'Space Mono','Courier New','monospace',monospace";

const STYLE_BLOCK = `<style>
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Outfit:wght@300;400;500;600&family=Space+Mono:wght@400;700&display=swap');
@media (prefers-color-scheme: dark) { body, .wrap { background:#1a1a1a !important; } }
@media (prefers-color-scheme: light) { body, .wrap { background:#1a1a1a !important; } }
</style>`;

const logo = `<div style="font-family:${FH};font-size:24px;font-weight:700;text-transform:uppercase;letter-spacing:-0.025em;color:${TX};">Decastro<span style="color:${AC};">.</span></div>`;
const hdr = `<div style="background:${BG};padding:32px 40px 24px;border-bottom:1px solid ${BD};">${logo}</div>`;

const ftr = `<div style="background:${BG};padding:28px 40px;border-top:1px solid ${BD};"><p style="margin:0 0 4px;font-family:${FH};font-size:14px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:${TX};">Davide Decastro</p><p style="margin:0 0 10px;color:${DM};font-size:13px;font-family:${FB};">Personal Trainer — Roma</p><p style="margin:0 0 10px;font-size:13px;font-family:${FB};"><a href="${SITE_URL}" style="color:${AC};text-decoration:none;">${SITE_URL}</a> <span style="color:${AC};margin:0 8px;">✦</span> <a href="${IG}" style="color:${AC};text-decoration:none;">@decastro_pt_lab</a></p><p style="margin:0;color:#475569;font-size:11px;font-family:${FM};letter-spacing:0.05em;">© 2026 DECASTRO PT</p></div>`;

function label(t) { return `<p style="margin:0 0 8px;font-family:${FM};font-size:11px;text-transform:uppercase;letter-spacing:0.3em;color:${AC};">${t}</p>`; }
function heading(t) { return `<h2 style="margin:0 0 16px;font-family:${FH};font-size:28px;font-weight:700;text-transform:uppercase;letter-spacing:-0.025em;line-height:0.95;color:${TX};">${t}</h2>`; }
function sep() { return `<p style="text-align:center;margin:24px 0;color:${AC};font-size:14px;">✦</p>`; }
function tbl(rows) { const b = rows.map(([l,v]) => `<tr><td style="padding:12px 16px;border:1px solid ${BD};background:${SF};color:${DM};font-size:12px;width:40%;font-family:${FB};text-transform:uppercase;letter-spacing:0.1em;">${l}</td><td style="padding:12px 16px;border:1px solid ${BD};background:${BG};color:${TX};font-size:14px;font-weight:500;font-family:${FB};">${v}</td></tr>`).join(''); return `<table style="border-collapse:collapse;margin:20px 0;width:100%;">${b}</table>`; }
function btn(href,t) { return `<a href="${href}" style="display:inline-block;background:${AC};color:#000000;font-weight:600;font-size:14px;padding:16px 32px;border-radius:0;text-decoration:none;margin:16px 0;font-family:${FH};text-transform:uppercase;letter-spacing:0.025em;">${t}</a>`; }
function wrap(c) { return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light dark"><meta name="supported-color-schemes" content="light dark">${STYLE_BLOCK}</head><body style="margin:0;padding:0;background:${BG};font-family:${FB};color:${TX};"><div class="wrap" style="max-width:600px;margin:0 auto;background:${BG};">${hdr}<div style="padding:32px 40px;">${c}</div>${ftr}</div></body></html>`; }

async function sendEmail(to, subject, html) {
  const r = await fetch('https://api.resend.com/emails', { method:'POST', headers:{'Authorization':`Bearer ${RESEND_API_KEY}`,'Content-Type':'application/json'}, body:JSON.stringify({ from:FROM_EMAIL, to:Array.isArray(to)?to:[to], subject, html, text:html.replace(/<[^>]*>/g,'') }) });
  const d = await r.json();
  return { success:r.ok, data:d, id:d?.id };
}

export default async function handler(req, res) {
  res.setHeader('Content-Type','application/json');
  res.setHeader('Access-Control-Allow-Origin','*');
  if (req.method === 'GET') {
    res.status(200).json([
      { date:'2026-08-14', time:'09:00', type:'assessment' },
      { date:'2026-08-14', time:'11:00', type:'follow-up' },
      { date:'2026-08-15', time:'10:00', type:'assessment' },
      { date:'2026-08-16', time:'16:00', type:'consultation' },
      { date:'2026-08-17', time:'09:00', type:'assessment' }
    ]);
    return;
  }
  if (req.method !== 'POST') { res.status(405).json({error:'Method not allowed'}); return; }
  const { name, email, date, time, type } = req.body || {};
  if (!name || !email || !date) { res.status(400).json({error:'Missing: name, email, date'}); return; }
  const bid = 'bk_'+Date.now(), bt = type||'assessment', tm = time||'Da concordare';

  const cust = wrap(`${label('Prenotazione')}${heading('Confermata')}<p style="color:${DM};font-size:15px;line-height:1.7;font-family:${FB};font-weight:300;">Ciao <strong style="color:${AC};">${name}</strong>,</p><p style="color:${DM};font-size:15px;line-height:1.7;font-family:${FB};font-weight:300;">La tua prenotazione è stata confermata. Ti aspettiamo.</p>${tbl([['ID',bid],['Servizio',bt],['Data',date],['Orario',tm],['Luogo','Da concordare']])}${sep()}<p style="color:${DM};font-size:14px;line-height:1.7;font-family:${FB};font-weight:300;"><strong style="color:${TX};">Cosa portare:</strong> abbigliamento sportivo, asciugamano, bottiglietta d'acqua.<br><strong style="color:${TX};">Cancellazione:</strong> almeno 24h prima.</p>${btn(SITE_URL+'/servizi.html','Vedi tutti i servizi')}<p style="color:#475569;font-size:12px;margin-top:24px;font-family:${FB};">Hai domande? Rispondi a questa email.</p>`);
  const tr = wrap(`${label('Nuova Prenotazione')}${heading('Dal Sito')}<p style="color:${DM};font-size:15px;line-height:1.7;font-family:${FB};font-weight:300;">Hai ricevuto una nuova prenotazione.</p>${tbl([['Cliente',name],['Email',email],['Servizio',bt],['Data',date],['Orario',tm],['ID',bid]])}${btn('mailto:'+email,'Contatta il cliente')}`);

  const [cr, tr2] = await Promise.all([
    sendEmail(email, `Prenotazione confermata — ${date} ${tm} | Decastro PT`, cust),
    sendEmail(NOTIFY_EMAIL, `Nuova prenotazione — ${name} (${date})`, tr)
  ]);
  const ok = cr.success && tr2.success;
  res.status(201).json({
    booking_id:bid, status:'confirmed', name, email, date, time:tm, type:bt,
    email_sent:ok, customer_email_id:cr.id, trainer_email_id:tr2.id,
    ...(!ok ? {email_error:{customer:cr.data, trainer:tr2.data}} : {}),
    message: ok ? 'Booking confirmed. Emails sent.' : 'Booking confirmed, email failed.'
  });
}
