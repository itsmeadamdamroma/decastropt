// Edge function: returns markdown version of the page when Accept: text/markdown
export default function handler(req, res) {
  const accept = req.headers['accept'] || '';
  
  if (accept.includes('text/markdown')) {
    // Return markdown version
    res.setHeader('Content-Type', 'text/markdown');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.status(200).send(`# Decastro PT — Training Lab

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
`);
  } else {
    // Redirect to HTML version for browsers
    res.redirect(302, '/');
  }
}
