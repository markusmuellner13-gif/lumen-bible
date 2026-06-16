// Sends time-fitting verse / prayer-reminder push notifications.
// Triggered hourly by GitHub Actions (cron). Protected by the x-push-secret header.
// Sends at most one notification per time-window per local day, per subscription.
import webpush from 'web-push';

export const config = { maxDuration: 60 };

const BASE = process.env.PUBLIC_BASE_URL || 'https://lumen-bible.vercel.app';

async function rpc(fn, args) {
  const base = process.env.SUPABASE_URL, key = process.env.SUPABASE_KEY;
  const r = await fetch(`${base}/rest/v1/rpc/${fn}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', apikey: key, authorization: 'Bearer ' + key },
    body: JSON.stringify(args),
  });
  if (!r.ok) throw new Error('supabase ' + fn + ' ' + r.status + ' ' + (await r.text()).slice(0, 200));
  const txt = await r.text();
  return txt ? JSON.parse(txt) : null;
}

function bucketFor(hour) {
  if (hour >= 5 && hour < 11) return 'morning';
  if (hour >= 11 && hour < 17) return 'midday';
  if (hour >= 17 && hour < 22) return 'evening';
  return 'night';
}
function localParts(tz) {
  try {
    const f = new Intl.DateTimeFormat('en-CA', { timeZone: tz, hour12: false, hour: '2-digit', year: 'numeric', month: '2-digit', day: '2-digit' });
    const p = Object.fromEntries(f.formatToParts(new Date()).map((x) => [x.type, x.value]));
    return { hour: parseInt(p.hour, 10) % 24, date: `${p.year}-${p.month}-${p.day}` };
  } catch { const d = new Date(); return { hour: d.getUTCHours(), date: d.toISOString().slice(0, 10) }; }
}

export default async function handler(req, res) {
  const secret = process.env.PUSH_SECRET;
  const given = req.headers['x-push-secret'] || (typeof req.query?.secret === 'string' ? req.query.secret : '');
  if (!secret || given !== secret) { res.status(401).json({ error: 'unauthorized' }); return; }
  if (!process.env.SUPABASE_URL || !process.env.VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) {
    res.status(503).json({ error: 'not_configured' }); return;
  }

  webpush.setVapidDetails(process.env.VAPID_SUBJECT || 'mailto:lumen@example.com', process.env.VAPID_PUBLIC_KEY, process.env.VAPID_PRIVATE_KEY);

  let verses;
  try { verses = (await (await fetch(`${BASE}/data/verses.json`)).json()).verses; }
  catch (e) { res.status(502).json({ error: 'verses_unavailable' }); return; }

  const pickVerse = (bucket, lang) => {
    let pool = verses.filter((v) => v.time === bucket).concat(verses.filter((v) => v.time === 'any'));
    if (!pool.length) pool = verses;
    const v = pool[Math.floor(Math.random() * pool.length)];
    return v;
  };

  let subs;
  try { subs = await rpc('lumen_all_subscriptions', { p_secret: secret }); }
  catch (e) { console.error(String(e).slice(0, 300)); res.status(502).json({ error: 'subs_failed' }); return; }

  let sent = 0, removed = 0, skipped = 0;
  for (const s of subs || []) {
    const { hour, date } = localParts(s.tz);
    const bucket = bucketFor(hour);
    const windows = s.windows || {};
    if (!windows[bucket]) { skipped++; continue; }
    const key = `${date}|${bucket}`;
    if (s.last_bucket === key) { skipped++; continue; }

    const v = pickVerse(bucket, s.lang);
    const morningTag = bucket === 'morning'
      ? (s.lang === 'de' ? '🕊 Andacht des Tages\n' : '🕊 Today’s devotion\n') : '';
    const payload = JSON.stringify({
      title: 'Lumen',
      body: `${morningTag}„${v.text[s.lang]}“\n— ${v.ref[s.lang]}`,
      url: `/?verse=${v.book}.${v.c}.${v.v}`,
    });
    try {
      await webpush.sendNotification({ endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } }, payload);
      await rpc('lumen_mark_sent', { p_secret: secret, p_endpoint: s.endpoint, p_bucket: key });
      sent++;
    } catch (err) {
      if (err.statusCode === 404 || err.statusCode === 410) {
        try { await rpc('lumen_delete_sub', { p_secret: secret, p_endpoint: s.endpoint }); removed++; } catch {}
      } else { console.error('push send', err.statusCode, String(err).slice(0, 160)); }
    }
  }
  res.status(200).json({ checked: (subs || []).length, sent, removed, skipped });
}
