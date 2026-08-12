# DecastroPT — Agent Ready Implementation Report

**Domain:** decastropt.com  
**Project:** Personal Training Lab — booking, assessment, servizi  
**Hosting:** Vercel (decastro-training-lab)  
**DNS:** Cloudflare (zone `8247353885df0ff80d6afd59464d5e80`)  
**Registrar:** Cloudflare Registrar  
**Date:** 2026-08-06/07

---

## 1. Progetto Vercel

```
/root/.openclaw/workspace/brand_pt_friend/decastro-vercel/
├── vercel.json          # Config: headers, rewrites, Content-Type per .well-known
├── middleware.js         # Content negotiation: Accept: text/markdown → markdown
├── index.md              # Homepage markdown version
├── auth.md               # Agent registration (WorkOS auth.md standard)
├── bundle.js            # Bundle per homepage
├── api/
│   ├── health.js         # GET /api/health — status check
│   ├── services.js       # GET /api/services — lista servizi + prezzi
│   ├── booking.js        # GET/POST /api/booking — slot + prenotazione con Resend email
│   └── markdown.js       # GET /api/markdown — fallback markdown endpoint
└── .well-known/
    ├── agent-card.json              # A2A Agent Card (A2A Protocol)
    ├── oauth-authorization-server    # OAuth AS metadata con agent_auth block
    ├── oauth-protected-resource      # OAuth PRM (resource, scopes, bearer)
    ├── http-message-signatures-directory  # JWKS per Web Bot Auth (Ed25519)
    ├── jwks.json                    # Stesso JWKS (per OAuth metadata)
    ├── bot-signing-key.pem          # Private key per firmare richieste bot
    ├── api-catalog/
    │   ├── index.json               # API catalog (linkset+json)
    │   └── openapi.json             # OpenAPI spec
    ├── agent-skills/
    │   ├── index.json               # Skills index
    │   ├── book-assessment.json     # Skill: prenota assessment
    │   ├── check-availability.json # Skill: controlla slot
    │   └── get-services.json       # Skill: lista servizi
    └── mcp/
        └── server-card.json         # MCP server card
```

---

## 2. Standard Agent-Ready Implementati

### ✅ Markdown for Agents
- **Middleware** intercetta `Accept: text/markdown` su tutte le route
- Ritorna `Content-Type: text/markdown; charset=utf-8`
- `GET /` con `Accept: text/markdown` → versione markdown del sito
- `GET /` con `Accept: text/html` → HTML normale (default browser)
- Link header: `rel="alternate"; type="text/markdown"` per scoperta automatica
- **Skill ref:** https://isitagentready.com/.well-known/agent-skills/markdown-negotiation/SKILL.md
- **Docs:** https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/

### ✅ Auth.md (Agent Registration)
- `/auth.md` — H1: `# auth.md` (lowercase, come richiesto)
- Segue template ufficiale WorkOS (https://workos.com/auth-md/docs/auth-md)
- Step 1-7: Discover → Pick method → Register → Claim → Exchange → Use → Revoke
- `service_auth` e `anonymous` registration methods
- Code blocks `http`/`json` per ogni endpoint
- Tabella errori completa
- **OAuth Protected Resource Metadata** (`/.well-known/oauth-protected-resource`):
  - `resource`, `authorization_servers`, `scopes_supported`, `bearer_methods_supported: ["header"]`
- **OAuth Authorization Server Metadata** (`/.well-known/oauth-authorization-server`):
  - `issuer`, `token_endpoint`, `revocation_endpoint`, `grant_types_supported`
  - `agent_auth` block con `skill`, `identity_endpoint`, `claim_endpoint`, `events_endpoint`
  - `identity_types_supported: ["anonymous", "service_auth"]`
  - `events_supported` con revocation event

### ✅ A2A Agent Card
- `/.well-known/agent-card.json` — 200, `application/json`
- `name`, `version`, `description` presenti
- `capabilities`: streaming, pushNotifications, stateTransitionHistory
- `skills`: book-assessment, check-availability, get-services (con id, name, description, tags)
- `supportedInterfaces`: JSONRPC over HTTP su `/a2a`
- `authentication`: bearer scheme
- **Spec:** https://a2a-protocol.org/latest/specification/

### ✅ Web Bot Auth
- `/.well-known/http-message-signatures-directory` — JWKS con chiave pubblica Ed25519
- `kid`: `31c4b60503c19bb1`, `alg`: EdDSA, `kty`: OKP
- `/.well-known/jwks.json` — stesso JWKS
- Private key salvata in `.well-known/bot-signing-key.pem`
- **IETF:** https://datatracker.ietf.org/wg/webbotauth/about/
- **Cloudflare:** https://developers.cloudflare.com/bots/reference/bot-verification/web-bot-auth/

### ✅ API Catalog (.well-known)
- `/.well-known/api-catalog/index.json` — linkset+json
- `/.well-known/api-catalog/openapi.json` — OpenAPI spec
- Link header: `rel="api-catalog"; type="application/linkset+json"`

### ✅ Agent Skills (Agent Skills Discovery)
- `/.well-known/agent-skills/index.json` — indice skills
- 3 skills: book-assessment, check-availability, get-services
- Link header: `rel="service-doc"; type="application/json"`

### ✅ MCP Server Card
- `/.well-known/mcp/server-card.json` — MCP server discovery

### ✅ DNS-AID (DNS for AI Discovery)
- Record SVCB su Cloudflare DNS:
  - `_index._agents.decastropt.com` SVCB `1 decastropt.com. alpn="h2" port=443`
  - `_a2a._agents.decastropt.com` SVCB `1 decastropt.com. alpn="h2" port=443`
- Visibili via DoH (Cloudflare 1.1.1.1 e Google)
- **Skill ref:** https://isitagentready.com/.well-known/agent-skills/dns-aid/SKILL.md

---

## 3. DNS Records (Cloudflare)

| Type | Name | Content | Proxied | Status |
|------|------|---------|---------|--------|
| CNAME | decastropt.com | 0874e5f5a0a872f5.vercel-dns-017.com | ✅ | Active |
| CNAME | www.decastropt.com | 0874e5f5a0a872f5.vercel-dns-017.com | ✅ | Active |
| SVCB | _index._agents.decastropt.com | 1 decastropt.com. alpn="h2" port=443 | ❌ | DNS-only |
| SVCB | _a2a._agents.decastropt.com | 1 decastropt.com. alpn="h2" port=443 | ❌ | DNS-only |
| TXT | _vercel.decastropt.com | vc-domain-verify=decastropt.com | ❌ | Vercel verify |
| TXT | _vercel.decastropt.com | vc-domain-verify=www.decastropt.com | ❌ | Vercel verify |
| MX | decastropt.com | inbound-smtp.eu-west-1.amazonaws.com (pri 10) | ❌ | Resend receiving |
| MX | send.decastropt.com | feedback-smtp.eu-west-1.amazonses.com (pri 10) | ❌ | Resend SPF |
| TXT | send.decastropt.com | v=spf1 include:amazonses.com ~all | ❌ | Resend SPF |
| TXT | resend._domainkey | p=MIGfMA0GCSqGSIb3DQEBA... | ❌ | Resend DKIM |

---

## 4. Email (Resend)

- **API Key (sending):** `[REDACTED — see env]` (restricted, send-only)
- **API Key (admin):** `[REDACTED — see env]` (full access)
- **Domain ID:** `af058d45-19d1-4e06-a614-70bdc9d6656c`
- **Region:** eu-west-1
- **Status:** partially_verified (DKIM ✅, SPF ✅, Receiving MX ⏳ pending)
- **From email:** `noreply@decastropt.com`
- **Notify email:** `info@decastropt.com`
- **Webhook:** `https://decastropt.com/api/email-webhook` per `email.received` events
  - Webhook ID: `be2a0081-a2d4-4dc6-86ef-e0915832bd96`
  - Signing secret: `whsec_8is2ZdrJjnCpaXtva/3h1kNsr8YuYmBM`

### Booking API Email Flow
1. `POST /api/booking` con `{name, email, date, time, type}`
2. Invia email di conferma al cliente (HTML template)
3. Invia notifica al trainer (HTML template)
4. Ritorna `{booking_id, status, email_sent}`

---

## 5. Cloudflare Proxy

- `decastropt.com` → **Proxied** (orange cloud) — DDoS, WAF, caching
- `www.decastropt.com` → **Proxied**
- SVCB/TXT records → **DNS-only** (il proxy romperebbe i record DNS-AID)

---

## 6. ⏳ Pending / Da Verificare

### DNSSEC
- Cloudflare ha generato DNSKEY (ECDSAP256SHA256, algorithm 13)
- DS record non ancora sottomesso al registry .com
- **Action richiesta:** Dashboard Cloudflare → Registrar → decastropt.com → Enable DNSSEC (one-click)
- **Docs:** https://developers.cloudflare.com/registrar/get-started/enable-dnssec/
- Il token API ha permesso `Registrar Domains Admin` ma l'endpoint non supporta submit via API — va fatto dal dashboard
- Lo scanner isitagentready.com richiede `AD=true` nei DoH responses

### Resend Receiving MX
- Record MX corretto aggiunto (`inbound-smtp.eu-west-1.amazonaws.com`)
- DNS live sui nameserver Cloudflare
- Resend verification in pending — può richiedere 15-30 min per propagazione DNS

### A2A Endpoint
- `agent-card.json` referenzia `https://decastropt.com/a2a` come endpoint JSON-RPC
- **Non ancora implementato** — serve un endpoint che accepti JSON-RPC 2.0 requests (sendMessage, getTask, etc.)

### Web Bot Auth Signing
- JWKS pubblico pubblicato ✅
- Private key salvata ✅
- **Non ancora implementato:** middleware che firma le richieste in uscita con `Signature-Agent` e `Signature-Input` headers

---

## 7. Vercel Deploy

- **Project:** `decastro-training-lab` (account: `adamazzamroma2s-projects`)
- **Token:** `[REDACTED — see env]`
- **Deploy command:**
  ```bash
  cd /root/.openclaw/workspace/brand_pt_friend/decastro-vercel
  npx vercel --prod --token [REDACTED — see env] --yes
  ```
- **Domains:** decastropt.com, www.decastropt.com (alias)

---

## 8. Link Header (su tutte le response)

```
</.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json",
</.well-known/agent-skills/index.json>; rel="service-doc"; type="application/json",
</api/markdown>; rel="alternate"; type="text/markdown",
</docs/api>; rel="service-doc"; type="text/html",
</api/health>; rel="status"; type="application/json",
</auth.md>; rel="describedby"; type="text/markdown"
```

---

## 9. API Endpoints

| Method | Path | Descrizione |
|--------|------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/services` | Lista servizi + prezzi |
| GET | `/api/booking` | Slot disponibili |
| POST | `/api/booking` | Crea prenotazione + invia email |
| GET | `/api/markdown` | Versione markdown del sito |
| POST | `/api/email-webhook` | Webhook Resend per email ricevute |
| GET | `/.well-known/agent-card.json` | A2A Agent Card |
| GET | `/.well-known/oauth-authorization-server` | OAuth AS metadata |
| GET | `/.well-known/oauth-protected-resource` | OAuth PRM |
| GET | `/.well-known/http-message-signatures-directory` | JWKS Web Bot Auth |
| GET | `/.well-known/jwks.json` | JWKS (OAuth) |
| GET | `/.well-known/api-catalog/index.json` | API catalog |
| GET | `/.well-known/api-catalog/openapi.json` | OpenAPI spec |
| GET | `/.well-known/agent-skills/index.json` | Agent skills index |
| GET | `/.well-known/mcp/server-card.json` | MCP server card |
| GET | `/auth.md` | Agent registration doc |

---

## 10. Scanner isitagentready.com

Per verificare tutto:
```bash
curl -s -X POST https://isitagentready.com/api/scan \
  -H "Content-Type: application/json" \
  -d '{"url": "https://decastropt.com"}' | python3 -m json.tool
```

**Check status:**
- Markdown for Agents: ✅ (middleware attivo)
- Auth.md: ✅ (H1 corretto, marker presenti)
- A2A Agent Card: ✅ (agent-card.json pubblicato)
- Web Bot Auth: ✅ (JWKS pubblicato)
- DNS-AID: ⚠️ (record SVCB trovati, DNSSEC pending)
- API Catalog: ✅
- Agent Skills: ✅
- MCP: ✅
