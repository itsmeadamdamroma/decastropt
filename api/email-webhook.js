export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  
  if (req.method === 'POST') {
    const event = req.body || {};
    
    if (event.type === 'email.received') {
      // Log received email
      console.log('Email received:', JSON.stringify(event));
      // TODO: Process incoming email
      res.status(200).json({ received: true });
    } else {
      res.status(200).json({});
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
