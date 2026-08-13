// /api/assessment.js — Vercel serverless
// Receives form data, sends structured HTML email to trainer via Resend
const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
const FROM_EMAIL = 'Decastro PT <noreply@decastropt.com>';
const TRAINER_EMAIL = 'info@decastropt.com';
const CUSTOMER_FROM = 'Davide Decastro <noreply@decastropt.com>';

const BG = "#1a1a1a", TX = "#e8e8e8", DM = "#94A3B8", AC = "#F97316", SF = "#242424", BD = "rgba(255,255,255,0.12)";
const FH = "'Oswald','Arial Narrow',sans-serif";
const FB = "'Outfit','Century Gothic',sans-serif";
const FM = "'Space Mono','Courier New',monospace";

function label(t) { return `<p style="margin:0 0 8px;font-family:${FM};font-size:11px;text-transform:uppercase;letter-spacing:0.3em;color:${AC};">${t}</p>`; }
function heading(t) { return `<h2 style="margin:0 0 16px;font-family:${FH};font-size:28px;font-weight:700;text-transform:uppercase;letter-spacing:-0.025em;line-height:0.95;color:${TX};">${t}</h2>`; }
function ptext(t) { return `<p style="color:${DM};font-size:15px;line-height:1.625;font-weight:300;font-family:${FB};">${t}</p>`; }
function sep() { return `<p style="text-align:center;margin:24px 0;color:${AC};font-size:14px;">✦</p>`; }

function tbl(rows) {
  const b = rows.map(([l,v]) => `<tr><td style="padding:12px 16px;border:1px solid ${BD};background:${SF};color:${DM};font-size:12px;width:40%;font-family:${FB};text-transform:uppercase;letter-spacing:0.1em;">${l}</td><td style="padding:12px 16px;border:1px solid ${BD};background:${BG};color:${TX};font-size:14px;font-weight:500;font-family:${FB};">${v||'—'}</td></tr>`).join('');
  return `<table style="border-collapse:collapse;margin:20px 0;width:100%;">${b}</table>`;
}

function logo() {
  return `<div style="font-family:${FH};font-size:24px;font-weight:700;text-transform:uppercase;letter-spacing:-0.025em;color:${TX};">Decastro<span style="color:${AC};">.</span></div>`;
}

// Trainer email: full data
function trainerEmail(d) {
  const genderText = d.gender === 'M' ? 'Uomo' : d.gender === 'F' ? 'Donna' : d.gender;
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light dark"><meta name="supported-color-schemes" content="light dark">
<style>@media(prefers-color-scheme:dark){body{background:${BG}!important}}</style>
</head><body style="margin:0;padding:0;background:${BG};font-family:${FB};color:${TX};">
<div style="max-width:600px;margin:0 auto;background:${BG};">
<div style="background:${BG};padding:32px 40px 24px;border-bottom:1px solid ${BD};">${logo()}</div>
<div style="padding:32px 40px;">
${label('Nuova Richiesta')}
${heading('Scheda Tecnica')}
${ptext(`Nuovo questionario da <strong style="color:${AC};">${d.name}</strong>.`)}
${sep()}
${tbl([
  ['Nome', d.name],
  ['Email', d.email],
  ['Telefono', d.phone],
  ['Sesso', genderText],
  ['Età', d.age],
  ['Peso', d.weight ? d.weight + ' kg' : ''],
  ['Altezza', d.height ? d.height + ' cm' : ''],
  ['Obiettivo', d.goal],
  ['Livello', d.level],
  ['Frequenza', d.frequency],
  ['Dove', d.location],
  ['Sport pregressi', d.sports],
  ['Infortuni/limitazioni', d.injuries],
  ['Farmaci', d.medications],
  ['Sonno', d.sleep],
  ['Stress', d.stress],
  ['Note', d.notes]
])}
${sep()}
${ptext(`<strong style="color:${TX};">BMR stimato (Mifflin-St Jeor):</strong> ${calcBMR(d)} kcal<br><strong style="color:${TX};">BMI:</strong> ${calcBMI(d)}`)}
${ptext('Preparati per la call di consulenza.')}
</div>
<div style="background:${BG};padding:28px 40px;border-top:1px solid ${BD};">
<p style="margin:0 0 4px;font-family:${FH};font-size:14px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:${TX};">Davide Decastro</p>
<p style="margin:0 0 10px;color:${DM};font-size:13px;font-family:${FB};">Personal Trainer — Roma</p>
<p style="margin:0;color:#475569;font-size:11px;font-family:${FM};">© 2026 DECASTRO PT</p>
</div>
</div></body></html>`;
}

// Customer email: confirmation
function customerEmail(d) {
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light dark"><meta name="supported-color-schemes" content="light dark">
<style>@media(prefers-color-scheme:dark){body{background:${BG}!important}}</style>
</head><body style="margin:0;padding:0;background:${BG};font-family:${FB};color:${TX};">
<div style="max-width:600px;margin:0 auto;background:${BG};">
<div style="background:${BG};padding:32px 40px 24px;border-bottom:1px solid ${BD};">${logo()}</div>
<div style="padding:32px 40px;">
${label('Conferma')}
${heading('Richiesta Ricevuta')}
${ptext(`Ciao <strong style="color:${AC};">${d.name}</strong>,`)}
${ptext(`Ho ricevuto il tuo questionario. Ti contatterò entro <strong style="color:${TX};">24 ore</strong> per la consulenza gratuita di 30 minuti.`)}
${sep()}
${ptext(`Se non hai ancora prenotato una data, puoi farla qui:`)}
<a href="https://calendly.com/decastropt/30min" style="display:inline-block;background:${AC};color:#000;font-weight:600;font-size:14px;padding:16px 32px;text-decoration:none;margin:16px 0;font-family:${FH};text-transform:uppercase;letter-spacing:0.025em;border-radius:0;">Prenota la call</a>
${sep()}
${ptext(`A presto.<br>— Davide Decastro`)}
</div>
<div style="background:${BG};padding:28px 40px;border-top:1px solid ${BD};">
<p style="margin:0 0 4px;font-family:${FH};font-size:14px;font-weight:600;text-transform:uppercase;color:${TX};">Davide Decastro</p>
<p style="margin:0 0 10px;color:${DM};font-size:13px;font-family:${FB};">Personal Trainer — Roma</p>
<p style="margin:0;color:#475569;font-size:11px;font-family:${FM};">© 2026 DECASTRO PT</p>
</div>
</div></body></html>`;
}

// BMR (Mifflin-St Jeor)
function calcBMR(d) {
  const w = parseFloat(d.weight), h = parseFloat(d.height), a = parseFloat(d.age);
  if (!w || !h || !a) return '—';
  const base = 10 * w + 6.25 * h - 5 * a;
  return Math.round(d.gender === 'F' ? base - 161 : base + 5);
}

// BMI
function calcBMI(d) {
  const w = parseFloat(d.weight), h = parseFloat(d.height);
  if (!w || !h) return '—';
  const bmi = w / Math.pow(h/100, 2);
  let cat = 'Normale';
  if (bmi < 18.5) cat = 'Sottopeso'; else if (bmi >= 25) cat = 'Sovrappeso'; else if (bmi >= 30) cat = 'Obesità';
  return `${bmi.toFixed(1)} (${cat})`;
}

async function sendEmail(to, subject, html) {
  const body = { from: FROM_EMAIL, to: Array.isArray(to) ? to : [to], subject, html, text: html.replace(/<[^>]*>/g,'') };
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  const d = await r.json();
  return { success: r.ok, id: d?.id };
}

export default async function handler(req, res) {
  res.setHeader('Content-Type','application/json');
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Headers','Content-Type');
  res.setHeader('Access-Control-Allow-Methods','GET,POST,OPTIONS');
  if (req.method === 'OPTIONS') { res.status(204).end(); return; }
  if (req.method !== 'POST') { res.status(405).json({error:'Method not allowed'}); return; }

  const d = req.body || {};
  if (!d.name || !d.email) { res.status(400).json({error:'name and email required'}); return; }

  // Persist: Vercel function logs are searchable in dashboard
  console.log('ASSESSMENT_LEAD', JSON.stringify(d));

  // Send to trainer
  const trainerRes = await sendEmail(TRAINER_EMAIL, `Nuova richiesta scheda — ${d.name} (${d.goal||'?'})`, trainerEmail(d));
  // Send confirmation to customer
  const customerRes = await sendEmail(d.email, 'Richiesta ricevuta — Decastro PT', customerEmail(d));

  res.status(200).json({
    sent: trainerRes.success && customerRes.success,
    trainer_email: trainerRes.success,
    customer_email: customerRes.success,
    bmr: calcBMR(d),
    bmi: calcBMI(d)
  });
}
