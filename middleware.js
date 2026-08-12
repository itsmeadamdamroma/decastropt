// middleware.js — Vercel Edge Middleware for Markdown for Agents
// When Accept: text/markdown is sent, return markdown version of the page
export default function middleware(req) {
  const accept = req.headers.get('accept') || '';
  const url = new URL(req.url);

  // Only intercept GET requests to / with Accept: text/markdown
  if (req.method === 'GET' && accept.includes('text/markdown') && url.pathname === '/') {
    const markdown = `# Decastro PT — Training Lab

Il tuo personal trainer a Roma. Schede personalizzate, metodo scientifico, risultati misurabili.

## Servizi

- **Assessment personalizzato** — BMI, BFR, BMR, TDEE, analisi posturale
- **Scheda tecnica personalizzata** — PDF con protocollo di allenamento
- **Follow-up** — Monitoraggio progressi e aggiustamenti
- **Consulenza nutrizionale** — Piano alimentare opzionale

## Metodo (3 Step)

1. **Assessment** — Valutazione corporea completa (BMI, BFR, BMR, TDEE)
2. **Custom Plan** — Scheda tecnica personalizzata in PDF
3. **PDF Delivery** — Consegna digitale immediata

## Contatti

- Sito: [decastropt.com](https://decastropt.com)
- Instagram: [@decastro_pt_lab](https://www.instagram.com/decastro_pt_lab)
- Email: info@decastropt.com

## API

- API Catalog: \`/.well-known/api-catalog\`
- OpenAPI Spec: \`/.well-known/api-catalog/openapi.json\`
- OAuth Metadata: \`/.well-known/oauth-authorization-server\`
- Agent Skills: \`/.well-known/agent-skills/index.json\`
- MCP Server Card: \`/.well-known/mcp/server-card.json\`
- Health: \`/api/health\`
`;

    return new Response(markdown, {
      status: 200,
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Accept, Content-Type, Authorization',
        'Link': '</.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json", </.well-known/agent-skills/index.json>; rel="service-doc"; type="application/json", </auth.md>; rel="describedby"; type="text/markdown", </api/health>; rel="status"; type="application/json"'
      }
    });
  }

  // For all other requests, continue normally
  return undefined;
}

export const config = {
  matcher: ['/']
};
