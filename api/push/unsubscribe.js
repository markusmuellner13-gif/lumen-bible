// Remove a Web Push subscription.
export const config = { maxDuration: 15 };

export default async function handler(req, res) {
  if (req.method !== 'POST') { res.status(405).json({ error: 'method' }); return; }
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) { res.status(503).json({ error: 'not_configured' }); return; }
  let body = req.body; if (typeof body === 'string') { try { body = JSON.parse(body); } catch { body = {}; } }
  if (!body?.endpoint) { res.status(400).json({ error: 'bad_request' }); return; }
  try {
    const base = process.env.SUPABASE_URL, key = process.env.SUPABASE_KEY;
    const r = await fetch(`${base}/rest/v1/rpc/lumen_unsubscribe`, {
      method: 'POST', headers: { 'content-type': 'application/json', apikey: key, authorization: 'Bearer ' + key },
      body: JSON.stringify({ p_endpoint: body.endpoint }),
    });
    if (!r.ok) throw new Error('supabase ' + r.status);
    res.status(200).json({ ok: true });
  } catch (e) { console.error('unsubscribe', String(e).slice(0, 200)); res.status(502).json({ error: 'failed' }); }
}
