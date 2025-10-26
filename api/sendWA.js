export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { to, message } = req.body;
    if (!to || !message) {
      return res.status(400).json({ error: 'Missing "to" or "message"' });
    }

    const API_URL = `https://api.ultramsg.com/instance147110/messages/chat`;
    const TOKEN = `wua31zhq6nph3x2j`;

    const sendRes = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        token: TOKEN,
        to,
        body: message
      })
    });

    const data = await sendRes.json();
    res.status(200).json({ success: true, ultramsg: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
}
