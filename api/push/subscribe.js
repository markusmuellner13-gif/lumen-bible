// Store / update a Web Push subscription in Supabase (via secured RPC).
export const config = { maxDuration: 15 };

async function rpc(fn, args) {
  const base = process.env.SUPABASE_URL, key = process.env.SUPABASE_KEY;
  const r = await fetch(`${base}/rest/v1/rpc/${fn}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', apikey: key, authorization: 'Bearer ' + key },
    body: JSON.stringify(args),
  });
  if (!r.ok) throw new Error('supabase ' + r.status + ' ' + (await r.text()).slice(0, 200));
}

export default async function handler(req, res) {
  if (req.method !== 'POST') { res.status(405).json({ error: 'method' }); return; }
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) { res.status(503).json({ error: 'not_configured' }); return; }
  let body = req.body; if (typeof body === 'string') { try { body = JSON.parse(body); } catch { body = {}; } }
  const sub = body?.subscription;
  if (!sub?.endpoint || !sub?.keys?.p256dh || !sub?.keys?.auth) { res.status(400).json({ error: 'bad_subscription' }); return; }
  const windows = body?.windows && typeof body.windows === 'object' ? body.windows
    : { morning: true, midday: false, evening: true, night: false };
  try {
    await rpc('lumen_subscribe', {
      p_endpoint: sub.endpoint, p_p256dh: sub.keys.p256dh, p_auth: sub.keys.auth,
      p_tz: String(body?.tz || 'UTC').slice(0, 64), p_lang: body?.lang === 'en' ? 'en' : 'de',
      p_windows: windows, p_prayer: body?.prayer !== false,
    });
    res.status(200).json({ ok: true });
  } catch (e) { console.error('subscribe', String(e).slice(0, 300)); res.status(502).json({ error: 'store_failed' }); }
}
