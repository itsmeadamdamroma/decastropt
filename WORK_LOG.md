# DecastroPT — Work Log

## Overview
All work on decastropt.com (Personal Trainer Roma — Davide Decastro PT).

## Session 1 — Aug 7, 01:00 (blog expansion + creation)
- Expanded 3 existing blog posts from ~300 to 955-989 words each
- Added BreadcrumbList JSON-LD schema to each (Home → Blog → Article)
- Files: personal-trainer-roma-come-scegliere.html, scheda-tecnica-personalizzata-cosa-aspettarsi.html, allenamento-a-casa-vs-palestra.html

## Session 2 — Aug 7, 01:01 (7 new blog posts)
- Created 7 NEW static HTML blog posts, each 800+ words in Italian
- All with proper Article + BreadcrumbList JSON-LD schema
- Files: personal-trainer-roma-prezzi-2026.html, assessment-corporeo-roma-bmi-bfr-bmr.html, personal-trainer-online-vs-presenza.html, programmazione-allenamento-principianti.html, allenamento-post-infortunio-roma.html, personal-trainer-donna-roma.html, nutrizione-sportiva-calcolo-macronutrienti.html

## Session 3 — Aug 7, 08:42 (internal cross-linking)
- Added 2-3 internal cross-links to each of 10 blog posts + servizi.html + chi-sono.html
- Read all 12 files, found natural anchor text, wrapped in a href tags
- No new paragraphs, no structure changes — just inline links

## Session 4 — Aug 7, 13:43 (email template vs website CSS audit)
- Analyzed email templates from API functions (email.js, booking.js, assessment.js, services.js)
- Compared against live site HTML and bundle.js CSS
- Found visual discrepancies between email styling and website design
- CSS variables: --bg #060606, --text #F8FAFC, --accent #F97316, --text-dim #94A3B8

## Session 5 — Aug 7, 22:09 (i18n blog translations)
- Added blog article translations to i18n.js dictionary (38KB)
- Extracted text nodes from all 10 blog posts
- Deduplicated and filtered against existing 284 dict keys
- Made all 10 blog posts bilingual IT/EN via DOM-based text swap

## Session 6 — Aug 11, 19:26 (blog expansion to 2000+ words)
- Expanded 10 blog posts from ~1200 to 2500-2800 words each
- Added substantive Italian content: case studies, data, FAQ sections
- Kept existing HTML structure, appended before closing </article>
- Files expanded in /root/decastropt/blog/ (NOT the original workspace dir)

## Session 7 — Aug 12, 02:00 (restore + backup)
- CashClaw deployed from /root/decastropt/ which was missing api/, middleware.js, .well-known/, real bundle.js (4.7MB), real i18n.js (38KB), and agent-ready vercel.json
- Restored all missing files from /root/.openclaw/workspace/brand_pt_friend/decastro-vercel/
- Sanitized API keys (Resend, Vercel tokens) for GitHub push protection
- Created GitHub backup at github.com/itsmeadamdamroma/decastropt

## Architecture
- Static HTML site, no build step
- API serverless functions: health.js, services.js, booking.js, assessment.js, email.js, email-webhook.js, markdown.js
- middleware.js: i18n routing
- .well-known/: agent-card.json, jwks.json, bot-signing-key.pem, oauth-*, mcp/server-card.json, agent-skills/, api-catalog/
- vercel.json: CORS, content-type headers, rewrites, agent-ready Link headers
- i18n.js: 380+ entries, DOM-based IT/EN bilingual
- bundle.js: 4.7MB React SPA compiled
- Email via Resend (noreply@decastropt.com)
- SEO: JSON-LD (Article + BreadcrumbList + FAQ), sitemap.xml, robots.txt, IndexNow
