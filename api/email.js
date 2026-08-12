const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
const FROM_EMAIL = 'Decastro PT <noreply@decastropt.com>';
const NOTIFY_EMAIL = 'spidyroma@gmail.com';
const TRAINER_NAME = 'Davide Decastro';
const SITE_URL = 'https://decastropt.com';
const IG = 'https://instagram.com/decastro_pt_lab';

// Gmail mobile dark mode = FULL COLOR INVERT (no @media support).
// Fix: use off-black/off-white that Gmail's inverter ignores.
// #1a1a1a → stays dark, #e8e8e8 → stays light. #F97316 → vivid, not inverted.
const BG = "#1a1a1a", TX = "#e8e8e8", DM = "#94A3B8", AC = "#F97316", SF = "#242424", BD = "rgba(255,255,255,0.12)";
const FH = "'Oswald','Arial Narrow','Helvetica Neue','Impact',sans-serif";
const FB = "'Outfit','Century Gothic','Futura','Trebuchet MS','system-ui',sans-serif";
const FM = "'Space Mono','Courier New','monospace',monospace";

const STYLE_BLOCK = `<style>
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Outfit:wght@300;400;500;600&family=Space+Mono:wght@400;700&display=swap');
@media (prefers-color-scheme: dark) { body, .wrap { background:#1a1a1a !important; } }
@media (prefers-color-scheme: light) { body, .wrap { background:#1a1a1a !important; } }
</style>`;

// Logo: text "Decastro" + "." accent — NO image, NO svg
function logo() {
  return `<div style="font-family:${FH};font-size:24px;font-weight:700;text-transform:uppercase;letter-spacing:-0.025em;color:${TX};">Decastro<span style="color:${AC};">.</span></div>`;
}

function label(text) {
  return `<p style="margin:0 0 8px;font-family:${FM};font-size:11px;text-transform:uppercase;letter-spacing:0.3em;color:${AC};">${text}</p>`;
}
function heading(text) {
  return `<h2 style="margin:0 0 16px;font-family:${FH};font-size:28px;font-weight:700;text-transform:uppercase;letter-spacing:-0.025em;line-height:0.95;color:${TX};">${text}</h2>`;
}
function ptext(text) {
  return `<p style="color:${DM};font-size:15px;line-height:1.625;font-weight:300;font-family:${FB};">${text}</p>`;
}
function sep() {
  return `<p style="text-align:center;margin:24px 0;color:${AC};font-size:14px;">✦</p>`;
}
function tbl(rows) {
  const b = rows.map(([l,v]) => `<tr><td style="padding:12px 16px;border:1px solid ${BD};background:${SF};color:${DM};font-size:12px;width:40%;font-family:${FB};text-transform:uppercase;letter-spacing:0.1em;">${l}</td><td style="padding:12px 16px;border:1px solid ${BD};background:${BG};color:${TX};font-size:14px;font-weight:500;font-family:${FB};">${v}</td></tr>`).join('');
  return `<table style="border-collapse:collapse;margin:20px 0;width:100%;">${b}</table>`;
}
// Bulletproof button: works in Gmail, Outlook (VML), Apple Mail
function btn(href, text) {
  return `<a href="${href}" style="display:inline-block;background:${AC};color:#000000;font-weight:600;font-size:14px;padding:16px 32px;text-decoration:none;margin:16px 0;font-family:${FH};text-transform:uppercase;letter-spacing:0.025em;border-radius:0;">${text}</a>`;
}
function step(num, title, text) {
  return `<div style="position:relative;padding:24px 0;border-top:1px solid ${BD};">
    <span style="position:absolute;top:16px;right:0;font-family:${FH};font-size:48px;font-weight:700;color:${SF};line-height:1;">${num}</span>
    <h3 style="margin:0 0 8px;padding-right:48px;font-family:${FH};font-size:18px;font-weight:600;text-transform:uppercase;letter-spacing:-0.025em;color:${TX};">${title}</h3>
    <p style="margin:0;padding-right:48px;color:${DM};font-size:14px;line-height:1.6;font-family:${FB};">${text}</p>
  </div>`;
}

// Header: text logo (no pixelated image)
const hdr = `<div style="background:${BG};padding:32px 40px 24px;border-bottom:1px solid ${BD};">${logo()}</div>`;

// Footer
const ftr = `<div style="background:${BG};padding:28px 40px;border-top:1px solid ${BD};">
  <p style="margin:0 0 4px;font-family:${FH};font-size:14px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:${TX};">${TRAINER_NAME}</p>
  <p style="margin:0 0 10px;color:${DM};font-size:13px;line-height:1.6;font-family:${FB};">Personal Trainer — Roma</p>
  <p style="margin:0 0 10px;font-size:13px;font-family:${FB};">
    <a href="${SITE_URL}" style="color:${AC};text-decoration:none;">${SITE_URL}</a>
    <span style="color:${AC};margin:0 8px;">✦</span>
    <a href="${IG}" style="color:${AC};text-decoration:none;">@decastro_pt_lab</a>
  </p>
  <p style="margin:0;color:#475569;font-size:11px;font-family:${FM};letter-spacing:0.05em;">© 2026 DECASTRO PT</p>
</div>`;

function wrap(content) {
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light dark">
<meta name="supported-color-schemes" content="light dark">
${STYLE_BLOCK}
</head>
<body style="margin:0;padding:0;background:${BG};font-family:${FB};color:${TX};-webkit-font-smoothing:antialiased;">
<div class="wrap" style="max-width:600px;margin:0 auto;background:${BG};">${hdr}<div style="padding:32px 40px;">${content}</div>${ftr}</div>
</body></html>`;
}

// ===== T1: BOOKING CONFIRMATION =====
function bookingConfirmationCustomer(d) {
  return wrap(`
    ${label('Prenotazione')}
    ${heading('Confermata')}
    ${ptext(`Ciao <strong style="color:${AC};">${d.name}</strong>,`)}
    ${ptext('La tua prenotazione è stata confermata. Ti aspettiamo.')}
    ${tbl([['ID',d.bookingId],['Servizio',d.serviceType],['Data',d.date],['Orario',d.time],['Luogo',d.location||'Da concordare']])}
    ${sep()}
    <p style="color:${DM};font-size:14px;line-height:1.7;font-family:${FB};font-weight:300;">
      <strong style="color:${TX};">Cosa portare:</strong> abbigliamento sportivo, asciugamano, bottiglietta d'acqua.<br>
      <strong style="color:${TX};">Cancellazione:</strong> almeno 24h prima.
    </p>
    ${btn(SITE_URL+'/servizi.html','Vedi tutti i servizi')}
    <p style="color:#475569;font-size:12px;margin-top:24px;font-family:${FB};">Hai domande? Rispondi a questa email.</p>
  `);
}

// ===== T2: BOOKING NOTIFICATION (trainer) =====
function bookingNotificationTrainer(d) {
  return wrap(`
    ${label('Nuova Prenotazione')}
    ${heading('Dal Sito')}
    ${ptext('Hai ricevuto una nuova prenotazione.')}
    ${tbl([['Cliente',d.name],['Email',d.email],['Servizio',d.serviceType],['Data',d.date],['Orario',d.time],['ID',d.bookingId]])}
    ${btn('mailto:'+d.email,'Contatta il cliente')}
  `);
}

// ===== T3: WELCOME =====
function welcomeEmail(d) {
  return wrap(`
    ${label('Benvenuto')}
    ${heading('Consulenza Gratuita')}
    ${ptext(`Ciao <strong style="color:${AC};">${d.name}</strong>,`)}
    ${ptext(`Sono <strong style="color:${TX};">${TRAINER_NAME}</strong>, personal trainer a Roma. Ti contatterò entro <strong style="color:${TX};">24 ore</strong> per fissare la tua consulenza gratuita di 30 minuti.`)}
    ${sep()}
    ${step('01','Valutazione','I tuoi obiettivi: dimagrimento, massa, forza, riabilitazione.')}
    ${step('02','Esperienza','Il tuo livello attuale e storico di allenamento.')}
    ${step('03','Piano','Assessment corporeo e piano d\'azione personalizzato.')}
    ${sep()}
    ${tbl([['Email',d.email],['Obiettivo',d.goal||'Da definire']])}
    ${btn(SITE_URL+'/chi-sono.html','Scopri di più')}
    <p style="color:#475569;font-size:12px;margin-top:24px;font-family:${FB};">A presto.<br>— ${TRAINER_NAME}</p>
  `);
}

// ===== T4: FOLLOW-UP =====
function followUpEmail(d) {
  return wrap(`
    ${label('Follow-up')}
    ${heading('Come è andata?')}
    ${ptext(`Ciao <strong style="color:${AC};">${d.name}</strong>,`)}
    ${ptext('Spero che la sessione ti sia piaciuta. Tre domande rapide:')}
    ${sep()}
    ${step('01','Chiarezza','Hai sentito gli esercizi chiari e fattibili?')}
    ${step('02','Fastidio','Ci sono movimenti che ti causano disagio?')}
    ${step('03','Domande','Hai dubbi sulla scheda o sulla tecnica?')}
    ${sep()}
    ${ptext(`La <strong style="color:${TX};">costanza</strong> è la chiave. 3 sessioni/settimana per 8 settimane e vedrai risultati misurabili.`)}
    ${tbl([['Prossima sessione',d.nextDate||'Da prenotare'],['Programma',d.programType||'Scheda personalizzata']])}
    ${btn(SITE_URL+'/api/booking','Prenota prossima sessione')}
    <p style="color:#475569;font-size:12px;margin-top:24px;font-family:${FB};">Rispondi a questa email per qualsiasi domanda.<br>— ${TRAINER_NAME}</p>
  `);
}

// ===== T5: ASSESSMENT RESULTS =====
function assessmentResultsEmail(d) {
  const bmi = d.bmi||'—', bfr = d.bfr||'—', bmr = d.bmr||'—';
  let cat = 'Normale';
  const n = parseFloat(bmi);
  if (!isNaN(n)) { if (n<18.5) cat='Sottopeso'; else if (n>=30) cat='Obesità'; else if (n>=25) cat='Sovrappeso'; }
  return wrap(`
    ${label('Assessment')}
    ${heading('I tuoi risultati')}
    ${ptext(`Ciao <strong style="color:${AC};">${d.name}</strong>,`)}
    ${ptext('Ecco i risultati del tuo assessment corporeo. Conserva questa email.')}
    ${sep()}
    <table style="width:100%;border-collapse:collapse;margin:16px 0;"><tr>
      <td style="width:33%;padding:16px;border:1px solid ${BD};background:${SF};text-align:center;">
        <p style="margin:0 0 4px;font-family:${FM};font-size:10px;text-transform:uppercase;letter-spacing:0.1em;color:${DM};">BMI</p>
        <p style="margin:0;font-family:${FH};font-size:28px;font-weight:700;color:${TX};">${bmi}</p>
        <p style="margin:4px 0 0;font-size:11px;color:${AC};font-family:${FB};">${cat}</p>
      </td>
      <td style="width:33%;padding:16px;border:1px solid ${BD};background:${SF};border-left:none;text-align:center;">
        <p style="margin:0 0 4px;font-family:${FM};font-size:10px;text-transform:uppercase;letter-spacing:0.1em;color:${DM};">Fat %</p>
        <p style="margin:0;font-family:${FH};font-size:28px;font-weight:700;color:${TX};">${bfr}%</p>
        <p style="margin:4px 0 0;font-size:11px;color:${DM};font-family:${FB};">Body Fat</p>
      </td>
      <td style="width:33%;padding:16px;border:1px solid ${BD};background:${SF};border-left:none;text-align:center;">
        <p style="margin:0 0 4px;font-family:${FM};font-size:10px;text-transform:uppercase;letter-spacing:0.1em;color:${DM};">BMR</p>
        <p style="margin:0;font-family:${FH};font-size:28px;font-weight:700;color:${TX};">${bmr}</p>
        <p style="margin:4px 0 0;font-size:11px;color:${DM};font-family:${FB};">kcal/giorno</p>
      </td>
    </tr></table>
    <div style="background:${SF};border-left:4px solid ${AC};padding:20px;margin:24px 0;">
      <p style="margin:0 0 8px;font-family:${FH};font-size:14px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:${TX};">Piano d'azione</p>
      <p style="margin:0;color:${DM};font-size:14px;line-height:1.7;font-family:${FB};font-weight:300;">${d.plan||'Scheda personalizzata con 3 sessioni/settimana. Focus su forza + cardio. Rivalutazione tra 4 settimane.'}</p>
    </div>
    ${btn(SITE_URL+'/servizi.html','Vedi i servizi')}
    <p style="color:#475569;font-size:12px;margin-top:24px;font-family:${FB};">Per domande: info@decastropt.com<br>— ${TRAINER_NAME}</p>
  `);
}

// ===== SEND =====
async function sendEmail(to, subject, html) {
  const body = { from:FROM_EMAIL, to:Array.isArray(to)?to:[to], subject, html, text:html.replace(/<[^>]*>/g,'') };
  const r = await fetch('https://api.resend.com/emails', { method:'POST', headers:{'Authorization':`Bearer ${RESEND_API_KEY}`,'Content-Type':'application/json'}, body:JSON.stringify(body) });
  const d = await r.json();
  return { success:r.ok, data:d, id:d?.id };
}

// ===== HANDLER =====
export default async function handler(req, res) {
  res.setHeader('Content-Type','application/json');
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods','GET, POST, OPTIONS');
  if (req.method === 'OPTIONS') { res.status(204).end(); return; }
  if (req.method === 'GET') {
    res.status(200).json({
      templates: [
        { id:'booking-confirmation', name:'Conferma prenotazione (cliente)' },
        { id:'booking-notification', name:'Notifica prenotazione (trainer)' },
        { id:'welcome', name:'Benvenuto / consulenza gratuita' },
        { id:'follow-up', name:'Follow-up post-sessione' },
        { id:'assessment-results', name:'Risultati assessment corporeo' }
      ],
      from: FROM_EMAIL, notify: NOTIFY_EMAIL
    });
    return;
  }
  if (req.method !== 'POST') { res.status(405).json({error:'Method not allowed'}); return; }

  const { template, to, data, notify_trainer } = req.body || {};
  if (!template) { res.status(400).json({error:'Missing "template"'}); return; }
  const d = data || {};
  let html, subject, recipient;

  switch (template) {
    case 'booking-confirmation':
      if (!d.name || !d.date) { res.status(400).json({error:'Missing: name, date'}); return; }
      d.bookingId = d.bookingId || 'bk_'+Date.now();
      d.serviceType = d.serviceType || d.type || 'assessment';
      recipient = to || d.email;
      html = bookingConfirmationCustomer(d);
      subject = `Prenotazione confermata — ${d.date} ${d.time||''} | Decastro PT`;
      break;
    case 'booking-notification':
      if (!d.name || !d.email) { res.status(400).json({error:'Missing: name, email'}); return; }
      d.bookingId = d.bookingId || 'bk_'+Date.now();
      d.serviceType = d.serviceType || d.type || 'assessment';
      recipient = NOTIFY_EMAIL;
      html = bookingNotificationTrainer(d);
      subject = `Nuova prenotazione — ${d.name} (${d.date||''})`;
      break;
    case 'welcome':
      if (!d.name || !d.email) { res.status(400).json({error:'Missing: name, email'}); return; }
      recipient = to || d.email;
      html = welcomeEmail(d);
      subject = 'Benvenuto! Consulenza gratuita Decastro PT';
      break;
    case 'follow-up':
      if (!d.name || !d.email) { res.status(400).json({error:'Missing: name, email'}); return; }
      recipient = to || d.email;
      html = followUpEmail(d);
      subject = 'Come è andata la sessione? — Decastro PT';
      break;
    case 'assessment-results':
      if (!d.name || !d.email) { res.status(400).json({error:'Missing: name, email'}); return; }
      recipient = to || d.email;
      html = assessmentResultsEmail(d);
      subject = 'I tuoi risultati assessment — Decastro PT';
      break;
    default:
      res.status(400).json({error:`Unknown: ${template}`});
      return;
  }

  const result = await sendEmail(recipient, subject, html);
  let trainerResult = null;
  if (notify_trainer && template === 'booking-confirmation' && d.email) {
    trainerResult = await sendEmail(NOTIFY_EMAIL, `Nuova prenotazione — ${d.name} (${d.date})`, bookingNotificationTrainer(d));
  }
  res.status(result.success ? 200 : 500).json({
    template, sent: result.success, message_id: result.id, recipient, subject,
    ...(trainerResult ? { trainer_notified: trainerResult.success } : {}),
    ...(!result.success ? { error: result.data } : {})
  });
}
