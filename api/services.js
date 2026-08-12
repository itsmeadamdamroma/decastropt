export default function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json([
    { name: 'Assessment Personalizzato', description: 'BMI, BFR, BMR, TDEE, analisi posturale, test mobilità', duration: '60 min', price: 50, currency: 'EUR' },
    { name: 'Scheda Tecnica Personalizzata', description: 'Protocollo di allenamento personalizzato in PDF', duration: '90 min', price: 80, currency: 'EUR' },
    { name: 'Follow-up Mensile', description: 'Monitoraggio progressi e aggiustamento scheda', duration: '30 min', price: 30, currency: 'EUR' },
    { name: 'Consulenza Nutrizionale', description: 'Piano alimentare personalizzato', duration: '45 min', price: 40, currency: 'EUR' }
  ]);
}
