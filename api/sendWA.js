export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { to, message } = req.body;
    if (!to || !message) {
      return res.status(400).json({ success: false, message: 'Missing parameters' });
    }

    // === UltraMsg Config ===
    const INSTANCE = 'instance147110';
    const TOKEN = 'wua31zhq6nph3x2j';
    const url = `https://api.ultramsg.com/${INSTANCE}/messages/chat`;

    const payload = { to, body: message };
    const result = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await result.json();
    return res.status(200).json({ success: true, data });

  } catch (error) {
    console.error('Error sending WA:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
}
