/* ===== Lumen service worker ===== */
const VERSION = 'lumen-v1';
const SHELL = 'lumen-shell-' + VERSION;
const RUNTIME = 'lumen-runtime-' + VERSION;

const SHELL_ASSETS = [
  '/', '/index.html', '/app.css', '/app.js', '/manifest.webmanifest',
  '/data/manifest.json', '/data/verses.json',
  '/icons/icon.svg', '/icons/icon-192.png', '/icons/icon-512.png', '/icons/badge.png',
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(SHELL).then((c) => c.addAll(SHELL_ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((k) => k !== SHELL && k !== RUNTIME && k !== 'lumen-config').map((k) => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const { request } = e;
  const url = new URL(request.url);
  if (request.method !== 'GET') return;
  if (url.origin !== location.origin) return;

  // never cache the AI API
  if (url.pathname.startsWith('/api/')) return;

  // app-shell navigation
  if (request.mode === 'navigate') {
    e.respondWith(fetch(request).catch(() => caches.match('/index.html')));
    return;
  }

  // Bible data + static assets: cache-first, revalidate in background
  e.respondWith(
    caches.match(request).then((cached) => {
      const network = fetch(request).then((res) => {
        if (res && res.status === 200) {
          const copy = res.clone();
          caches.open(RUNTIME).then((c) => c.put(request, copy));
        }
        return res;
      }).catch(() => cached);
      return cached || network;
    })
  );
});

// ---- Time-fitting verse notifications ----
function timeBucket(d = new Date()) {
  const h = d.getHours();
  if (h >= 5 && h < 11) return 'morning';
  if (h >= 11 && h < 17) return 'midday';
  if (h >= 17 && h < 22) return 'evening';
  return 'night';
}

async function readConfig() {
  try {
    const c = await caches.open('lumen-config');
    const res = await c.match('/__config');
    return res ? await res.json() : null;
  } catch { return null; }
}
async function readLastShown() {
  try { const c = await caches.open('lumen-config'); const r = await c.match('/__lastshown'); return r ? +(await r.text()) : 0; } catch { return 0; }
}
async function writeLastShown(ts) {
  try { const c = await caches.open('lumen-config'); await c.put('/__lastshown', new Response(String(ts))); } catch {}
}

async function showFittingVerse() {
  const cfg = await readConfig();
  if (!cfg || !cfg.notif || !cfg.notif.enabled) return;
  const bucket = timeBucket();
  if (!cfg.notif.windows || !cfg.notif.windows[bucket]) return;
  // rate limit: at most one notification per ~3.5h
  const last = await readLastShown();
  if (Date.now() - last < 3.5 * 60 * 60 * 1000) return;

  const vres = await caches.match('/data/verses.json') || await fetch('/data/verses.json');
  const verses = (await vres.json()).verses;
  const lang = cfg.lang || 'de';
  let pool = verses.filter((v) => v.time === bucket).concat(verses.filter((v) => v.time === 'any'));
  if (!pool.length) pool = verses;
  const v = pool[Math.floor(Math.random() * pool.length)];

  await writeLastShown(Date.now());
  await self.registration.showNotification('Lumen', {
    body: `“${v.text[lang]}”\n— ${v.ref[lang]}`,
    icon: '/icons/icon-192.png',
    badge: '/icons/badge.png',
    tag: 'lumen-verse',
    data: { url: `/?verse=${v.book}.${v.c}.${v.v}` },
  });
}

self.addEventListener('periodicsync', (e) => {
  if (e.tag === 'lumen-verse') e.waitUntil(showFittingVerse());
});
self.addEventListener('sync', (e) => {
  if (e.tag === 'lumen-verse') e.waitUntil(showFittingVerse());
});

self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  const target = e.notification.data?.url || '/';
  e.waitUntil((async () => {
    const all = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    for (const client of all) {
      if ('focus' in client) {
        await client.focus();
        const u = new URL(target, location.origin);
        const vp = u.searchParams.get('verse');
        if (vp) { const [book, ch, v] = vp.split('.'); client.postMessage({ type: 'open-verse', book, ch: +ch, v: +v }); }
        return;
      }
    }
    await self.clients.openWindow(target);
  })());
});
