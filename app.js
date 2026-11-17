/* ===== Lumen — app logic ===== */
(() => {
  'use strict';

  // ---------- i18n ----------
  const I18N = {
    de: {
      'nav.today': 'Heute', 'nav.bible': 'Bibel', 'nav.companion': 'Begleiter', 'nav.prayers': 'Gebete', 'nav.settings': 'Mehr',
      'greet.morning': 'Guten Morgen', 'greet.midday': 'Gesegneten Tag', 'greet.evening': 'Guten Abend', 'greet.night': 'Gute Nacht',
      'greet.sub.morning': 'Beginne den Tag im Licht des Wortes.',
      'greet.sub.midday': 'Ein Augenblick der Stille mitten im Tag.',
      'greet.sub.evening': 'Komm zur Ruhe und danke für diesen Tag.',
      'greet.sub.night': 'Lege den Tag in Gottes Hände.',
      'verse.kicker': 'Vers für diesen Augenblick', 'verse.another': 'Neuer Vers', 'verse.read': 'Im Kontext lesen', 'verse.share': 'Teilen',
      'quick.continue': 'Weiterlesen', 'quick.continue.sub': 'Dort fortfahren, wo du warst',
      'quick.bible': 'Die Bibel', 'quick.bible.sub': '73 Bücher · DE & EN',
      'quick.companion': 'Begleiter fragen', 'quick.companion.sub': 'Verse & Gebete für dein Anliegen',
      'quick.prayer': 'Gebet beten', 'quick.prayer.sub': 'Tägliche katholische Gebete',
      'bible.search': 'Buch suchen …', 'bible.ot': 'Altes Testament', 'bible.nt': 'Neues Testament', 'bible.chapters': 'Kapitel',
      'reader.prev': 'Zurück', 'reader.next': 'Weiter', 'reader.chapter': 'Kapitel',
      'sheet.ask': 'Begleiter zu diesem Vers fragen', 'sheet.share': 'Vers teilen', 'sheet.copy': 'Kopieren', 'sheet.close': 'Schließen',
      'comp.title': 'Geistlicher Begleiter', 'comp.intro': 'Ich bin dein katholischer Begleiter. Teile mir dein Anliegen mit — ich antworte mit dem Wort Gottes, einem passenden Gebet und im Geist des katholischen Glaubens.',
      'comp.disc': 'Kein Ersatz für Beichte, Seelsorge oder ärztliche Hilfe.',
      'comp.placeholder': 'Schreibe dein Anliegen …',
      'chip.anxious': 'Ich bin unruhig', 'chip.grateful': 'Ich bin dankbar', 'chip.pray': 'Bete mit mir', 'chip.hope': 'Ein Vers über Hoffnung', 'chip.forgive': 'Über Vergebung',
      'comp.error': 'Verzeih, ich konnte gerade nicht antworten. Bitte versuche es noch einmal.',
      'comp.nokey': 'Der Begleiter ist noch nicht eingerichtet. Ein API-Schlüssel muss in Vercel hinterlegt werden (ANTHROPIC_API_KEY).',
      'prayers.title': 'Gebete', 'prayers.sub': 'Schätze des katholischen Glaubens',
      'set.title': 'Einstellungen', 'set.language': 'Sprache', 'set.lang.sub': 'Sprache der Bibel und App',
      'set.theme': 'Erscheinungsbild', 'set.theme.light': 'Hell', 'set.theme.dark': 'Dunkel', 'set.theme.auto': 'Auto',
      'set.textsize': 'Textgröße', 'set.notif': 'Tägliche Verse', 'set.notif.sub': 'Benachrichtigungen mit einem passenden Vers',
      'set.notif.windows': 'Wann möchtest du erinnert werden?', 'set.notif.test': 'Beispiel jetzt senden',
      'set.install': 'Zum Startbildschirm hinzufügen', 'set.install.sub': 'Lumen wie eine echte App nutzen',
      'set.about': 'Über Lumen',
      'tw.morning': 'Morgen', 'tw.midday': 'Mittag', 'tw.evening': 'Abend', 'tw.night': 'Nacht',
      'toast.copied': 'In die Zwischenablage kopiert', 'toast.notifon': 'Tägliche Verse aktiviert', 'toast.notifblocked': 'Benachrichtigungen sind blockiert. Bitte in den Browsereinstellungen erlauben.', 'toast.sent': 'Beispiel gesendet',
      'install.text': 'Füge Lumen zu deinem Startbildschirm hinzu, um es offline und wie eine App zu nutzen.', 'install.btn': 'Hinzufügen',
      'about.body': 'Lumen bringt das Wort Gottes zu mehr Menschen — die vollständige katholische Bibel (73 Bücher) auf Deutsch und Englisch, mit tageszeit-passenden Versen, traditionellen Gebeten und einem geistlichen Begleiter.\n\nDeutsch: Allioli-Bibel (Vulgata-Übersetzung, gemeinfrei).\nEnglisch: Douay-Rheims (gemeinfrei).\n\nMögen diese Worte dein Herz erleuchten.',
    },
    en: {
      'nav.today': 'Today', 'nav.bible': 'Bible', 'nav.companion': 'Companion', 'nav.prayers': 'Prayers', 'nav.settings': 'More',
      'greet.morning': 'Good morning', 'greet.midday': 'A blessed day', 'greet.evening': 'Good evening', 'greet.night': 'Good night',
      'greet.sub.morning': 'Begin the day in the light of the Word.',
      'greet.sub.midday': 'A moment of stillness in the midst of the day.',
      'greet.sub.evening': 'Come to rest and give thanks for this day.',
      'greet.sub.night': 'Place this day into God’s hands.',
      'verse.kicker': 'A verse for this moment', 'verse.another': 'Another verse', 'verse.read': 'Read in context', 'verse.share': 'Share',
      'quick.continue': 'Continue reading', 'quick.continue.sub': 'Pick up where you left off',
      'quick.bible': 'The Bible', 'quick.bible.sub': '73 books · EN & DE',
      'quick.companion': 'Ask the Companion', 'quick.companion.sub': 'Verses & prayers for your need',
      'quick.prayer': 'Pray', 'quick.prayer.sub': 'Daily Catholic prayers',
      'bible.search': 'Search a book …', 'bible.ot': 'Old Testament', 'bible.nt': 'New Testament', 'bible.chapters': 'Chapters',
      'reader.prev': 'Previous', 'reader.next': 'Next', 'reader.chapter': 'Chapter',
      'sheet.ask': 'Ask the Companion about this verse', 'sheet.share': 'Share verse', 'sheet.copy': 'Copy', 'sheet.close': 'Close',
      'comp.title': 'Spiritual Companion', 'comp.intro': 'I am your Catholic companion. Share what is on your heart — I will answer with the Word of God, a fitting prayer, and in the spirit of the Catholic faith.',
      'comp.disc': 'Not a substitute for confession, pastoral care, or medical help.',
      'comp.placeholder': 'Write what is on your heart …',
      'chip.anxious': 'I feel anxious', 'chip.grateful': 'I am grateful', 'chip.pray': 'Pray with me', 'chip.hope': 'A verse on hope', 'chip.forgive': 'About forgiveness',
      'comp.error': 'Forgive me, I could not respond just now. Please try again.',
      'comp.nokey': 'The Companion is not configured yet. An API key must be set in Vercel (ANTHROPIC_API_KEY).',
      'prayers.title': 'Prayers', 'prayers.sub': 'Treasures of the Catholic faith',
      'set.title': 'Settings', 'set.language': 'Language', 'set.lang.sub': 'Language of the Bible and app',
      'set.theme': 'Appearance', 'set.theme.light': 'Light', 'set.theme.dark': 'Dark', 'set.theme.auto': 'Auto',
      'set.textsize': 'Text size', 'set.notif': 'Daily verses', 'set.notif.sub': 'Notifications with a fitting verse',
      'set.notif.windows': 'When would you like to be reminded?', 'set.notif.test': 'Send a sample now',
      'set.install': 'Add to home screen', 'set.install.sub': 'Use Lumen like a real app',
      'set.about': 'About Lumen',
      'tw.morning': 'Morning', 'tw.midday': 'Midday', 'tw.evening': 'Evening', 'tw.night': 'Night',
      'toast.copied': 'Copied to clipboard', 'toast.notifon': 'Daily verses enabled', 'toast.notifblocked': 'Notifications are blocked. Please allow them in your browser settings.', 'toast.sent': 'Sample sent',
      'install.text': 'Add Lumen to your home screen to use it offline and like an app.', 'install.btn': 'Add',
      'about.body': 'Lumen brings the Word of God to more people — the complete Catholic Bible (73 books) in English and German, with verses fitting to the time of day, traditional prayers, and a spiritual companion.\n\nGerman: Allioli Bible (Vulgate translation, public domain).\nEnglish: Douay-Rheims (public domain).\n\nMay these words bring light to your heart.',
    },
  };

  Object.assign(I18N.de, {
    'streak.title': 'Andachts-Serie', 'streak.days': 'Tage in Folge', 'streak.day': 'Tag in Folge',
    'streak.none': 'Beginne heute deine Andachts-Serie', 'streak.best': 'Bestleistung',
    'devotion.badge': 'Andacht des Tages', 'devotion.open': 'Andacht öffnen', 'devotion.scripture': 'Schriftwort',
    'devotion.reflection': 'Betrachtung', 'devotion.prayer': 'Gebet', 'devotion.done': 'Amen — Andacht halten',
    'devotion.donetoday': 'Heutige Andacht erfüllt 🕊', 'devotion.amen': 'Amen',
    'notif.push.title': 'Tägliche Verse & Gebets-Erinnerung',
    'notif.push.sub': 'Auch wenn die App geschlossen ist — ein passender Vers zur Tageszeit.',
    'toast.devotiondone': 'Andacht erfüllt — Gott segne dich 🕊', 'toast.notifoff': 'Benachrichtigungen deaktiviert',
  });
  Object.assign(I18N.en, {
    'streak.title': 'Devotion streak', 'streak.days': 'days in a row', 'streak.day': 'day in a row',
    'streak.none': 'Begin your devotion streak today', 'streak.best': 'Best',
    'devotion.badge': 'Today’s Devotion', 'devotion.open': 'Open devotion', 'devotion.scripture': 'Scripture',
    'devotion.reflection': 'Reflection', 'devotion.prayer': 'Prayer', 'devotion.done': 'Amen — pray the devotion',
    'devotion.donetoday': 'Today’s devotion complete 🕊', 'devotion.amen': 'Amen',
    'notif.push.title': 'Daily verses & prayer reminders',
    'notif.push.sub': 'Even when the app is closed — a fitting verse for the time of day.',
    'toast.devotiondone': 'Devotion complete — God bless you 🕊', 'toast.notifoff': 'Notifications disabled',
  });

  Object.assign(I18N.de, {
    'prayers.daily': 'Tägliche Gebete', 'prayers.meal': 'Tischgebete',
    'rosary.title': 'Rosenkranz', 'rosary.card.title': 'Den Rosenkranz beten',
    'rosary.card.sub': 'Großer oder kleiner Rosenkranz · mit Zähler bei jedem Ave Maria', 'rosary.card.cta': 'Öffnen',
    'rosary.intro': 'Betrachte mit Maria das Leben Jesu. Wähle die Geheimnisse und ob du den ganzen Rosenkranz oder ein einzelnes Gesätz beten möchtest — die App führt dich Perle für Perle.',
    'rosary.mysteries': 'Geheimnisse', 'rosary.today': 'heute',
    'rosary.big': 'Großer Rosenkranz', 'rosary.big.sub': 'Alle fünf Gesätze mit Glaubensbekenntnis und Salve Regina · ca. 20 Min.',
    'rosary.small': 'Kleiner Rosenkranz', 'rosary.small.sub': 'Ein Gesätz · ca. 5 Min. — tippe auf ein Geheimnis, um zu beginnen.',
    'rosary.start': 'Beginnen', 'rosary.resume': 'Fortsetzen', 'rosary.resume.title': 'Angefangener Rosenkranz',
    'rosary.decade': 'Gesätz', 'rosary.of': 'von', 'rosary.opening': 'Eröffnung', 'rosary.closing': 'Abschluss',
    'rosary.next': 'Weiter', 'rosary.prev': 'Zurück', 'rosary.amen': 'Amen',
    'rosary.done.title': 'Rosenkranz gebetet', 'rosary.done.text': 'Danke, dass du dir Zeit für das Gebet genommen hast.\nMaria, Königin des heiligen Rosenkranzes, bitte für uns.',
    'rosary.finish': 'Fertig', 'rosary.again': 'Noch einmal',
  });
  Object.assign(I18N.en, {
    'prayers.daily': 'Daily prayers', 'prayers.meal': 'Grace before meals',
    'rosary.title': 'Holy Rosary', 'rosary.card.title': 'Pray the Rosary',
    'rosary.card.sub': 'Full rosary or a single decade · with a counter on every Hail Mary', 'rosary.card.cta': 'Open',
    'rosary.intro': 'Contemplate the life of Jesus with Mary. Choose the mysteries and whether to pray the full rosary or a single decade — the app guides you bead by bead.',
    'rosary.mysteries': 'Mysteries', 'rosary.today': 'today',
    'rosary.big': 'Full Rosary', 'rosary.big.sub': 'All five decades with the Creed and Hail Holy Queen · approx. 20 min',
    'rosary.small': 'Single Decade', 'rosary.small.sub': 'One decade · approx. 5 min — tap a mystery to begin.',
    'rosary.start': 'Begin', 'rosary.resume': 'Continue', 'rosary.resume.title': 'Rosary in progress',
    'rosary.decade': 'Decade', 'rosary.of': 'of', 'rosary.opening': 'Opening', 'rosary.closing': 'Closing',
    'rosary.next': 'Next', 'rosary.prev': 'Back', 'rosary.amen': 'Amen',
    'rosary.done.title': 'Rosary complete', 'rosary.done.text': 'Thank you for taking time to pray.\nQueen of the Most Holy Rosary, pray for us.',
    'rosary.finish': 'Done', 'rosary.again': 'Pray again',
  });

  // ---------- State ----------
  const store = {
    get lang() { return localStorage.getItem('lumen.lang') || ((navigator.language || 'de').startsWith('en') ? 'en' : 'de'); },
    set lang(v) { localStorage.setItem('lumen.lang', v); },
    get theme() { return localStorage.getItem('lumen.theme') || 'auto'; },
    set theme(v) { localStorage.setItem('lumen.theme', v); },
    get textSize() { return localStorage.getItem('lumen.textSize') || 'm'; },
    set textSize(v) { localStorage.setItem('lumen.textSize', v); },
    get last() { try { return JSON.parse(localStorage.getItem('lumen.last')); } catch { return null; } },
    set last(v) { localStorage.setItem('lumen.last', JSON.stringify(v)); },
    get notif() { try { return JSON.parse(localStorage.getItem('lumen.notif')) || defaultNotif(); } catch { return defaultNotif(); } },
    set notif(v) { localStorage.setItem('lumen.notif', JSON.stringify(v)); pushConfigToSW(); },
  };
  function defaultNotif() { return { enabled: false, windows: { morning: true, midday: false, evening: true, night: false } }; }

  let LANG = ['de', 'en'].includes(localStorage.getItem('lumen.lang')) ? localStorage.getItem('lumen.lang') : ((navigator.language || 'de').startsWith('en') ? 'en' : 'de');
  const t = (k) => (I18N[LANG][k] ?? I18N.de[k] ?? k);

  // ---------- Data ----------
  let MANIFEST = null, VERSES = null;
  const bookCache = {};
  async function getManifest() { return MANIFEST || (MANIFEST = await (await fetch('/data/manifest.json')).json()); }
  async function getVerses() { return VERSES || (VERSES = (await (await fetch('/data/verses.json')).json()).verses); }
  async function getBook(id, lang) {
    const key = lang + '/' + id;
    if (bookCache[key]) return bookCache[key];
    const data = await (await fetch(`/data/${lang}/${id}.json`)).json();
    bookCache[key] = data; return data;
  }
  let DEVOTIONS = null;
  async function getDevotions() { return DEVOTIONS || (DEVOTIONS = (await (await fetch('/data/devotions.json')).json()).devotions); }
  function dayOfYear(d = new Date()) { return Math.floor((d - new Date(d.getFullYear(), 0, 0)) / 86400000); }
  async function todaysDevotion() { const l = await getDevotions(); return l[dayOfYear() % l.length]; }

  // ---------- Streak ----------
  const pad2 = (n) => String(n).padStart(2, '0');
  function localDateStr(d = new Date()) { return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate()); }
  function getStreak() { try { return JSON.parse(localStorage.getItem('lumen.streak')) || { count: 0, longest: 0, last: null }; } catch { return { count: 0, longest: 0, last: null }; } }
  function isDoneToday() { return getStreak().last === localDateStr(); }
  function markDevotionDone() {
    const s = getStreak(); const today = localDateStr();
    if (s.last === today) return s;
    const y = new Date(); y.setDate(y.getDate() - 1);
    s.count = (s.last === localDateStr(y)) ? (s.count || 0) + 1 : 1;
    s.longest = Math.max(s.longest || 0, s.count); s.last = today;
    localStorage.setItem('lumen.streak', JSON.stringify(s)); return s;
  }

  // ---------- Time helpers ----------
  function timeBucket(d = new Date()) {
    const h = d.getHours();
    if (h >= 5 && h < 11) return 'morning';
    if (h >= 11 && h < 17) return 'midday';
    if (h >= 17 && h < 22) return 'evening';
    return 'night';
  }
  async function pickVerse(bucket = timeBucket(), avoidKey = null) {
    const all = await getVerses();
    let pool = all.filter((v) => v.time === bucket);
    pool = pool.concat(all.filter((v) => v.time === 'any'));
    if (!pool.length) pool = all;
    if (avoidKey && pool.length > 1) pool = pool.filter((v) => verseKey(v) !== avoidKey);
    return pool[Math.floor(Math.random() * pool.length)];
  }
  const verseKey = (v) => `${v.book}.${v.c}.${v.v}`;

  // ---------- DOM helpers ----------
  const $ = (s, r = document) => r.querySelector(s);
  const view = $('#view');
  const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  function toast(msg) {
    const el = document.createElement('div'); el.className = 'toast'; el.textContent = msg; document.body.appendChild(el);
    setTimeout(() => el.remove(), 2600);
  }
  function applyI18nStatic() {
    document.querySelectorAll('[data-i18n]').forEach((el) => { el.textContent = t(el.dataset.i18n); });
    document.documentElement.lang = LANG;
    document.documentElement.dataset.lang = LANG;
  }

  // ---------- Router ----------
  let current = { name: 'home' };
  function setActiveTab(name) {
    document.querySelectorAll('.tab').forEach((b) => b.classList.toggle('active', b.dataset.nav === name));
  }
  function navigate(name, params = {}) {
    current = { name, params };
    const tabMap = { chapters: 'bible', reader: 'bible', verse: 'bible', devotion: 'home', prayer: 'prayers', rosary: 'prayers', rosaryPray: 'prayers' };
    setActiveTab(tabMap[name] || name);
    view.scrollTop = 0; window.scrollTo(0, 0);
    const fn = VIEWS[name] || VIEWS.home;
    view.classList.remove('view-enter'); void view.offsetWidth; view.classList.add('view-enter');
    fn(params);
  }

  // ---------- Views ----------
  const VIEWS = {};

  VIEWS.home = async () => {
    const b = timeBucket();
    const d = await todaysDevotion();
    const s = getStreak();
    const done = isDoneToday();
    const streakLabel = s.count > 0 ? `🔥 ${s.count} ${s.count === 1 ? t('streak.day') : t('streak.days')}` : t('streak.none');
    view.innerHTML = `
      <div class="greeting">${t('greet.' + b)}</div>
      <div class="greeting-sub">${t('greet.sub.' + b)}</div>
      <button class="streak-chip ${s.count > 0 ? 'on' : ''}" data-act="devotion">${streakLabel}</button>
      <button class="card dev-card ${done ? 'done' : ''}" data-act="devotion">
        <div class="dev-card-inner">
          <div class="kicker">${t('devotion.badge')}${done ? ' · 🕊' : ''}</div>
          <div class="dev-card-title">${esc(d.title[LANG])}</div>
          <div class="dev-card-ref">${esc(d.ref[LANG])}</div>
          <span class="dev-card-cta">${done ? t('devotion.donetoday') : t('devotion.open')} ›</span>
        </div>
      </button>
      <div id="verseHero"></div>
      <div class="section-title">${LANG === 'de' ? 'Schnellzugriff' : 'Quick access'}</div>
      <div class="quick-grid">
        <button class="quick" data-act="continue"><span class="q-ico">📖</span><span class="q-title">${t('quick.continue')}</span><span class="q-sub">${t('quick.continue.sub')}</span></button>
        <button class="quick" data-act="bible"><span class="q-ico">✦</span><span class="q-title">${t('quick.bible')}</span><span class="q-sub">${t('quick.bible.sub')}</span></button>
        <button class="quick" data-act="companion"><span class="q-ico">✝</span><span class="q-title">${t('quick.companion')}</span><span class="q-sub">${t('quick.companion.sub')}</span></button>
        <button class="quick" data-act="prayers"><span class="q-ico">🕯</span><span class="q-title">${t('quick.prayer')}</span><span class="q-sub">${t('quick.prayer.sub')}</span></button>
      </div>
      <div id="installSlot"></div>`;
    renderVerseHero(await pickVerse(b));
    $('#verseHero').addEventListener('click', onVerseHeroClick);
    view.querySelectorAll('[data-act="devotion"]').forEach((el) => el.addEventListener('click', () => navigate('devotion')));
    view.querySelectorAll('.quick').forEach((q) => q.addEventListener('click', () => {
      const a = q.dataset.act;
      if (a === 'continue') { const l = store.last; if (l) navigate('reader', l); else navigate('bible'); }
      else navigate(a === 'bible' ? 'bible' : a);
    }));
    maybeRenderInstall($('#installSlot'));
  };

  VIEWS.devotion = async () => {
    const d = await todaysDevotion();
    const done = isDoneToday();
    const s = getStreak();
    view.innerHTML = `
      <div class="crumbs"><button data-nav="home">${t('nav.today')}</button> › <span>${t('devotion.badge')}</span></div>
      <div class="card dev-hero verse-hero">
        <div class="kicker">${t('devotion.badge')}</div>
        <h2 class="dev-title">${esc(d.title[LANG])}</h2>
        <div class="verse-text" style="font-size:1.2rem">“${esc(d.text[LANG])}”</div>
        <div class="verse-ref">${esc(d.ref[LANG])}</div>
        <div class="verse-actions"><button class="btn btn-ghost" id="devRead">${t('verse.read')}</button></div>
      </div>
      <div class="section-title">${t('devotion.reflection')}</div>
      <div class="card dev-block"><div class="prayer-text">${esc(d.reflection[LANG])}</div></div>
      <div class="section-title">${t('devotion.prayer')}</div>
      <div class="card dev-block prayer-bg"><div class="prayer-text">${esc(d.prayer[LANG])}</div></div>
      <button class="btn ${done ? 'btn-soft' : 'btn-primary'} btn-block" id="devDone" ${done ? 'disabled' : ''} style="margin-top:20px">${done ? '🕊 ' + t('devotion.donetoday') : t('devotion.done')}</button>
      <div class="center muted" style="margin-top:14px">🔥 ${s.count} ${s.count === 1 ? t('streak.day') : t('streak.days')}${s.longest > s.count ? ` · ${t('streak.best')}: ${s.longest}` : ''}</div>`;
    $('.crumbs [data-nav="home"]').addEventListener('click', () => navigate('home'));
    $('#devRead').addEventListener('click', () => navigate('reader', { id: d.book, ch: d.c, scrollVerse: d.v }));
    if (!done) $('#devDone').addEventListener('click', () => { markDevotionDone(); toast(t('toast.devotiondone')); navigate('devotion'); });
  };

  let heroVerse = null;
  function renderVerseHero(v) {
    heroVerse = v;
    $('#verseHero').innerHTML = `
      <div class="card verse-hero">
        <div class="kicker">${t('verse.kicker')}</div>
        <div class="verse-text">“${esc(v.text[LANG])}”</div>
        <div class="verse-ref">${esc(v.ref[LANG])}</div>
        <div class="verse-actions">
          <button class="btn btn-primary" data-act="read">${t('verse.read')}</button>
          <button class="btn btn-ghost" data-act="another">↻ ${t('verse.another')}</button>
          <button class="btn btn-ghost" data-act="share">${t('verse.share')}</button>
        </div>
      </div>`;
  }
  async function onVerseHeroClick(e) {
    const act = e.target.closest('[data-act]')?.dataset.act; if (!act) return;
    if (act === 'another') renderVerseHero(await pickVerse(timeBucket(), verseKey(heroVerse)));
    else if (act === 'read') navigate('reader', { id: heroVerse.book, ch: heroVerse.c, scrollVerse: heroVerse.v });
    else if (act === 'share') shareVerse(heroVerse.text[LANG], heroVerse.ref[LANG]);
  }

  VIEWS.bible = async () => {
    const m = await getManifest();
    view.innerHTML = `
      <input class="search" id="bookSearch" placeholder="${t('bible.search')}" autocomplete="off" />
      <div id="bookListWrap"></div>`;
    const render = (q = '') => {
      const ql = q.trim().toLowerCase();
      const match = (bk) => !ql || bk[LANG].name.toLowerCase().includes(ql) || bk.de.name.toLowerCase().includes(ql) || bk.en.name.toLowerCase().includes(ql);
      const ot = m.books.filter((b) => b.testament === 'OT' && match(b));
      const nt = m.books.filter((b) => b.testament === 'NT' && match(b));
      const grp = (title, list) => list.length ? `<div class="section-title">${title}</div><div class="book-list">${list.map(bookRow).join('')}</div>` : '';
      $('#bookListWrap').innerHTML = grp(t('bible.ot'), ot) + grp(t('bible.nt'), nt);
      $('#bookListWrap').querySelectorAll('.book-row').forEach((r) => r.addEventListener('click', () => navigate('chapters', { id: r.dataset.id })));
    };
    const bookRow = (b) => `<button class="book-row" data-id="${b.id}"><span class="b-name">${esc(b[LANG].name)}</span><span class="b-chaps">${b[LANG].chapters} ${LANG === 'de' ? 'Kap.' : 'ch.'}</span></button>`;
    render();
    $('#bookSearch').addEventListener('input', (e) => render(e.target.value));
  };

  VIEWS.chapters = async ({ id }) => {
    const m = await getManifest();
    const b = m.books.find((x) => x.id === id);
    const n = b[LANG].chapters;
    view.innerHTML = `
      <div class="crumbs"><button data-nav="bible">${t('nav.bible')}</button> › <span>${esc(b[LANG].name)}</span></div>
      <div class="reader-title">${esc(b[LANG].name)}</div>
      <div class="muted" style="margin-top:4px">${n} ${t('bible.chapters')}</div>
      <div class="chap-grid">${Array.from({ length: n }, (_, i) => `<button class="chap-cell" data-ch="${i + 1}">${i + 1}</button>`).join('')}</div>`;
    $('.crumbs [data-nav]').addEventListener('click', () => navigate('bible'));
    view.querySelectorAll('.chap-cell').forEach((c) => c.addEventListener('click', () => navigate('reader', { id, ch: +c.dataset.ch })));
  };

  VIEWS.reader = async ({ id, ch = 1, scrollVerse = null }) => {
    const m = await getManifest();
    const b = m.books.find((x) => x.id === id);
    const data = await getBook(id, LANG);
    const maxCh = b[LANG].chapters;
    ch = Math.min(Math.max(1, ch), maxCh);
    store.last = { id, ch };
    const verses = data.chapters[ch] || {};
    const vnums = Object.keys(verses).map(Number).sort((a, c) => a - c);
    view.innerHTML = `
      <div class="crumbs"><button data-nav="bible">${t('nav.bible')}</button> › <button data-nav="chapters">${esc(b[LANG].name)}</button> › <span>${t('reader.chapter')} ${ch}</span></div>
      <div class="reader-head"><div class="reader-title">${esc(b[LANG].name)} ${ch}</div></div>
      <div class="reader-body" id="readerBody">${vnums.map((n) => `<span class="v" data-v="${n}"><span class="vn">${n}</span>${esc(verses[n])} </span>`).join('')}</div>
      <div class="reader-nav">
        <button class="btn btn-soft" id="prevCh" ${ch <= 1 ? 'disabled style="opacity:.4"' : ''}>‹ ${t('reader.prev')}</button>
        <button class="btn btn-soft" id="nextCh" ${ch >= maxCh ? 'disabled style="opacity:.4"' : ''}>${t('reader.next')} ›</button>
      </div>`;
    $('.crumbs [data-nav="bible"]').addEventListener('click', () => navigate('bible'));
    $('.crumbs [data-nav="chapters"]').addEventListener('click', () => navigate('chapters', { id }));
    if (ch > 1) $('#prevCh').addEventListener('click', () => navigate('reader', { id, ch: ch - 1 }));
    if (ch < maxCh) $('#nextCh').addEventListener('click', () => navigate('reader', { id, ch: ch + 1 }));
    view.querySelectorAll('.v').forEach((sp) => sp.addEventListener('click', () => navigate('verse', { id, ch, v: +sp.dataset.v })));
    if (scrollVerse) {
      const el = view.querySelector(`.v[data-v="${scrollVerse}"]`);
      if (el) { el.classList.add('selected'); setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'center' }), 120); }
    }
  };

  VIEWS.verse = async ({ id, ch, v }) => {
    const m = await getManifest();
    let cur = { id, ch: +ch, v: +v };
    let lastKey = `${cur.id}.${cur.ch}.${cur.v}`;

    async function render(animate) {
      const b = m.books.find((x) => x.id === cur.id);
      const data = await getBook(cur.id, LANG);
      const text = (data.chapters[cur.ch] || {})[cur.v] || '';
      const ref = LANG === 'de' ? `${b.de.name} ${cur.ch},${cur.v}` : `${b.en.name} ${cur.ch}:${cur.v}`;
      view.innerHTML = `
        <div class="crumbs"><button data-nav="bible">${t('nav.bible')}</button> › <button data-nav="reader">${esc(b[LANG].name)} ${cur.ch}</button> › <span>${esc(LANG === 'de' ? 'V. ' + cur.v : 'v. ' + cur.v)}</span></div>
        <div class="card verse-hero verse-page${animate ? ' swap' : ''}">
          <div class="kicker">${t('devotion.scripture')}</div>
          <div class="verse-text">“${esc(text)}”</div>
          <div class="verse-ref">${esc(ref)}</div>
          <div class="verse-actions">
            <button class="btn btn-primary" data-a="read">${t('verse.read')}</button>
            <button class="btn btn-ghost" data-a="another">↻ ${t('verse.another')}</button>
            <button class="btn btn-ghost" data-a="ask">✝ ${t('sheet.ask')}</button>
            <button class="btn btn-ghost" data-a="share">↗ ${t('sheet.share')}</button>
            <button class="btn btn-ghost" data-a="copy">⧉ ${t('sheet.copy')}</button>
          </div>
        </div>`;
      $('.crumbs [data-nav="bible"]').addEventListener('click', () => navigate('bible'));
      $('.crumbs [data-nav="reader"]').addEventListener('click', () => navigate('reader', { id: cur.id, ch: cur.ch, scrollVerse: cur.v }));
      view.querySelector('[data-a="read"]').addEventListener('click', () => navigate('reader', { id: cur.id, ch: cur.ch, scrollVerse: cur.v }));
      view.querySelector('[data-a="another"]').addEventListener('click', onAnother);
      view.querySelector('[data-a="copy"]').addEventListener('click', () => { navigator.clipboard?.writeText(`“${text}” — ${ref}`); toast(t('toast.copied')); });
      view.querySelector('[data-a="share"]').addEventListener('click', () => shareVerse(text, ref));
      view.querySelector('[data-a="ask"]').addEventListener('click', () => navigate('companion', { seed: (LANG === 'de' ? 'Hilf mir, diesen Vers zu verstehen: ' : 'Help me understand this verse: ') + `“${text}” (${ref})` }));
    }

    async function onAnother() {
      const nv = await pickVerse(timeBucket(), lastKey);
      cur = { id: nv.book, ch: nv.c, v: nv.v };
      lastKey = verseKey(nv);
      render(true);
    }

    render(false);
  };

  function shareVerse(text, ref) {
    const payload = `“${text}” — ${ref}\n\nLumen — ${LANG === 'de' ? 'Katholische Bibel' : 'Catholic Bible'}`;
    if (navigator.share) navigator.share({ text: payload }).catch(() => {});
    else { navigator.clipboard?.writeText(payload); toast(t('toast.copied')); }
  }

  // ---------- Companion (AI) ----------
  let chatHistory = []; // {role, content}
  VIEWS.companion = ({ seed } = {}) => {
    view.innerHTML = `
      <div class="chat-wrap">
        <div class="chat-scroll" id="chatScroll"></div>
        <div class="chat-input">
          <textarea id="chatBox" rows="1" placeholder="${t('comp.placeholder')}"></textarea>
          <button class="send-btn" id="sendBtn" aria-label="Send">➤</button>
        </div>
      </div>`;
    const scroll = $('#chatScroll');
    if (!chatHistory.length) {
      scroll.innerHTML = `<div class="chat-intro">
        <div class="ci-cross">✝</div>
        <div class="reader-title" style="margin:6px 0">${t('comp.title')}</div>
        <p>${t('comp.intro')}</p>
        <div class="chips">
          ${['anxious', 'grateful', 'pray', 'hope', 'forgive'].map((c) => `<button class="chip" data-chip="${t('chip.' + c)}">${t('chip.' + c)}</button>`).join('')}
        </div>
        <p class="muted" style="font-size:.78rem;margin-top:18px">${t('comp.disc')}</p>
      </div>`;
      scroll.querySelectorAll('.chip').forEach((c) => c.addEventListener('click', () => sendMessage(c.dataset.chip)));
    } else { chatHistory.forEach((m) => appendMsg(m.role === 'user' ? 'user' : 'bot', m.content)); }
    const box = $('#chatBox');
    box.addEventListener('input', () => { box.style.height = 'auto'; box.style.height = Math.min(box.scrollHeight, 120) + 'px'; });
    box.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(box.value); } });
    $('#sendBtn').addEventListener('click', () => sendMessage(box.value));
    if (seed) { box.value = seed; box.dispatchEvent(new Event('input')); box.focus(); }
  };

  function formatBot(text) {
    return esc(text)
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/(^|\n)\s*[*•]\s+/g, '$1• ')
      .replace(/\n/g, '<br>');
  }
  function appendMsg(kind, text) {
    const scroll = $('#chatScroll'); if (!scroll) return null;
    const intro = scroll.querySelector('.chat-intro'); if (intro) intro.remove();
    const el = document.createElement('div'); el.className = 'msg ' + kind;
    if (kind === 'bot') el.innerHTML = formatBot(text); else el.textContent = text;
    scroll.appendChild(el); scroll.scrollTop = scroll.scrollHeight; return el;
  }

  async function sendMessage(text) {
    text = (text || '').trim(); if (!text) return;
    const box = $('#chatBox'); if (box) { box.value = ''; box.style.height = 'auto'; }
    appendMsg('user', text);
    chatHistory.push({ role: 'user', content: text });
    const typing = appendMsg('bot', ''); if (typing) typing.innerHTML = `<span class="typing"><span></span><span></span><span></span></span>`;
    try {
      const res = await fetch('/api/chat', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lang: LANG, messages: chatHistory.slice(-12) }),
      });
      if (res.status === 503) { typing.textContent = t('comp.nokey'); chatHistory.pop(); return; }
      if (!res.ok) throw new Error('http ' + res.status);
      const data = await res.json();
      const reply = data.reply || t('comp.error');
      typing.innerHTML = formatBot(reply);
      chatHistory.push({ role: 'assistant', content: reply });
    } catch (err) {
      typing.textContent = t('comp.error'); chatHistory.pop();
    }
  }

  // ---------- Prayers ----------
  const PRAYERS = [
    { id: 'cross', de: ['Kreuzzeichen', 'Im Namen des Vaters und des Sohnes und des Heiligen Geistes. Amen.'], en: ['Sign of the Cross', 'In the name of the Father, and of the Son, and of the Holy Spirit. Amen.'] },
    { id: 'our-father', de: ['Vaterunser', 'Vater unser im Himmel, geheiligt werde dein Name.\nDein Reich komme. Dein Wille geschehe, wie im Himmel so auf Erden.\nUnser tägliches Brot gib uns heute.\nUnd vergib uns unsere Schuld, wie auch wir vergeben unsern Schuldigern.\nUnd führe uns nicht in Versuchung, sondern erlöse uns von dem Bösen. Amen.'], en: ['Our Father', 'Our Father, who art in heaven, hallowed be thy name;\nthy kingdom come, thy will be done, on earth as it is in heaven.\nGive us this day our daily bread,\nand forgive us our trespasses, as we forgive those who trespass against us;\nand lead us not into temptation, but deliver us from evil. Amen.'] },
    { id: 'hail-mary', de: ['Gegrüßet seist du, Maria', 'Gegrüßet seist du, Maria, voll der Gnade, der Herr ist mit dir.\nDu bist gebenedeit unter den Frauen, und gebenedeit ist die Frucht deines Leibes, Jesus.\nHeilige Maria, Mutter Gottes, bitte für uns Sünder, jetzt und in der Stunde unseres Todes. Amen.'], en: ['Hail Mary', 'Hail Mary, full of grace, the Lord is with thee;\nblessed art thou amongst women, and blessed is the fruit of thy womb, Jesus.\nHoly Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.'] },
    { id: 'glory-be', de: ['Ehre sei dem Vater', 'Ehre sei dem Vater und dem Sohn und dem Heiligen Geist,\nwie im Anfang, so auch jetzt und alle Zeit und in Ewigkeit. Amen.'], en: ['Glory Be', 'Glory be to the Father, and to the Son, and to the Holy Spirit,\nas it was in the beginning, is now, and ever shall be, world without end. Amen.'] },
    { id: 'morning', de: ['Morgengebet', 'Mein Gott, ich schenke dir diesen Tag.\nIch danke dir für die Ruhe der Nacht und das Licht des Morgens.\nNimm mein Beten, Arbeiten und Mühen, meine Freuden und Leiden dieses Tages an.\nLass alles zu deiner Ehre und zum Heil der Menschen geschehen. Amen.'], en: ['Morning Offering', 'O my God, I offer you this day.\nI thank you for the rest of the night and the light of morning.\nReceive my prayers, work and toil, my joys and sufferings of this day.\nMay all be for your glory and the good of souls. Amen.'] },
    { id: 'contrition', de: ['Reuegebet', 'Mein Gott, aus ganzem Herzen bereue ich alle meine Sünden,\nnicht nur wegen der Strafe, sondern weil ich dich, das höchste Gut, beleidigt habe.\nIch will mich bessern und nicht mehr sündigen. Barmherziger Gott, vergib mir. Amen.'], en: ['Act of Contrition', 'O my God, I am heartily sorry for having offended you,\nand I detest all my sins, because I dread the loss of heaven and the pains of hell,\nbut most of all because they offend you, my God, who are all good and deserving of all my love.\nI firmly resolve, with the help of your grace, to sin no more. Amen.'] },
    { id: 'holy-spirit', de: ['Komm, Heiliger Geist', 'Komm, Heiliger Geist, erfülle die Herzen deiner Gläubigen\nund entzünde in ihnen das Feuer deiner Liebe.\nSende aus deinen Geist, und alles wird neu geschaffen,\nund du wirst das Angesicht der Erde erneuern. Amen.'], en: ['Come, Holy Spirit', 'Come, Holy Spirit, fill the hearts of your faithful\nand kindle in them the fire of your love.\nSend forth your Spirit and they shall be created,\nand you shall renew the face of the earth. Amen.'] },
    { id: 'guardian-angel', de: ['Schutzengelgebet', 'Heiliger Schutzengel mein, lass mich dir empfohlen sein;\nin allen Nöten steh mir bei und halte mich von Sünden frei.\nBei Tag und Nacht, wo immer ich bin, weise mich auf das Gute hin. Amen.'], en: ['Guardian Angel', 'Angel of God, my guardian dear, to whom God’s love commits me here,\never this day be at my side, to light and guard, to rule and guide. Amen.'] },
    { id: 'evening', de: ['Abendgebet', 'Herr, bevor der Tag zu Ende geht, danke ich dir für alles Gute.\nVergib mir, wo ich gefehlt habe, und nimm meine Schuld von mir.\nBehüte mich und alle, die ich liebe, in dieser Nacht.\nIn deinen Händen lege ich mich nieder. Amen.'], en: ['Evening Prayer', 'Lord, before the day comes to its end, I thank you for all that was good.\nForgive me where I have failed, and take my sin from me.\nWatch over me and all whom I love this night.\nInto your hands I lay myself down. Amen.'] },
    { id: 'michael', de: ['Gebet zum hl. Erzengel Michael', 'Heiliger Erzengel Michael, verteidige uns im Kampfe;\ngegen die Bosheit und die Nachstellungen des Teufels sei unser Schutz.\nGott gebiete ihm, so bitten wir flehentlich;\ndu aber, Fürst der himmlischen Heerscharen, stoße den Satan in die Hölle. Amen.'], en: ['Prayer to St. Michael', 'St. Michael the Archangel, defend us in battle.\nBe our protection against the wickedness and snares of the devil.\nMay God rebuke him, we humbly pray;\nand do thou, O Prince of the heavenly host, cast into hell Satan and all evil spirits. Amen.'] },
    // ---- Grace before meals ----
    { id: 'meal-bless', group: 'meal', de: ['Segne, Herr, uns und diese Gaben', 'Segne, Herr, uns und diese Gaben,\ndie wir von deiner Güte nun empfangen,\ndurch Christus, unseren Herrn. Amen.'], en: ['Bless Us, O Lord', 'Bless us, O Lord, and these thy gifts,\nwhich we are about to receive from thy bounty,\nthrough Christ our Lord. Amen.'] },
    { id: 'meal-guest', group: 'meal', de: ['Komm, Herr Jesus, sei unser Gast', 'Komm, Herr Jesus, sei du unser Gast\nund segne, was du uns bescheret hast. Amen.'], en: ['Come, Lord Jesus, Be Our Guest', 'Come, Lord Jesus, be our guest,\nand let these gifts to us be blessed. Amen.'] },
    { id: 'meal-psalm', group: 'meal', de: ['Aller Augen warten auf dich', 'Aller Augen warten auf dich, o Herr,\nund du gibst ihnen ihre Speise zur rechten Zeit.\nDu öffnest deine Hand\nund erfüllst alles, was lebt, mit Segen. Amen.'], en: ['The Eyes of All Look to You', 'The eyes of all look to you, O Lord,\nand you give them their food in due season.\nYou open your hand\nand fill every living thing with blessing. Amen.'] },
    { id: 'meal-father', group: 'meal', de: ['Segne, Vater, diese Speise', 'Segne, Vater, diese Speise,\nuns zur Kraft und dir zum Preise. Amen.'], en: ['Bless, O Father, This Our Food', 'Bless, O Father, this our food,\nto give us strength and you the praise. Amen.'] },
  ];

  VIEWS.prayers = () => {
    const item = (p) => `<button class="prayer-item" data-id="${p.id}"><span class="pi-name">${esc(p[LANG][0])}</span><span class="pi-go">›</span></button>`;
    const daily = PRAYERS.filter((p) => !p.group);
    const meal = PRAYERS.filter((p) => p.group === 'meal');
    view.innerHTML = `
      <div class="greeting">${t('prayers.title')}</div>
      <div class="greeting-sub">${t('prayers.sub')}</div>
      <button class="card dev-card ros-card" data-act="rosary">
        <div class="dev-card-inner">
          <div class="kicker">📿 ${t('rosary.title')}</div>
          <div class="dev-card-title">${t('rosary.card.title')}</div>
          <div class="dev-card-ref">${t('rosary.card.sub')}</div>
          <span class="dev-card-cta">${t('rosary.card.cta')} ›</span>
        </div>
      </button>
      <div class="section-title">${t('prayers.daily')}</div>
      <div class="prayer-list">${daily.map(item).join('')}</div>
      <div class="section-title">🍞 ${t('prayers.meal')}</div>
      <div class="prayer-list">${meal.map(item).join('')}</div>`;
    view.querySelector('[data-act="rosary"]').addEventListener('click', () => navigate('rosary'));
    view.querySelectorAll('.prayer-item').forEach((it) => it.addEventListener('click', () => navigate('prayer', { id: it.dataset.id })));
  };
  VIEWS.prayer = ({ id }) => {
    const p = PRAYERS.find((x) => x.id === id);
    view.innerHTML = `
      <div class="crumbs"><button data-nav="prayers">${t('prayers.title')}</button> › <span>${esc(p[LANG][0])}</span></div>
      <div class="card prayer-bg prayer-page">
        <div class="kicker">${t('devotion.prayer')}</div>
        <h2 class="dev-title">${esc(p[LANG][0])}</h2>
        <div class="prayer-text">${esc(p[LANG][1])}</div>
        <div class="verse-actions">
          <button class="btn btn-soft" data-a="share">↗ ${t('sheet.share')}</button>
          <button class="btn btn-soft" data-a="copy">⧉ ${t('sheet.copy')}</button>
        </div>
      </div>`;
    $('.crumbs [data-nav="prayers"]').addEventListener('click', () => navigate('prayers'));
    view.querySelector('[data-a="copy"]').addEventListener('click', () => { navigator.clipboard?.writeText(p[LANG][0] + '\n\n' + p[LANG][1]); toast(t('toast.copied')); });
    view.querySelector('[data-a="share"]').addEventListener('click', () => shareVerse(p[LANG][1], p[LANG][0]));
  };

  // ---------- Rosary ----------
  // Mysteries: `de`/`en` = short title; `ins` = German clause inserted after "Jesus" in each Ave Maria.
  const ROSARY_SETS = {
    joyful: { de: ['Freudenreich', 'Freudenreiche Geheimnisse'], en: ['Joyful', 'Joyful Mysteries'], m: [
      { de: 'Verkündigung', en: 'The Annunciation', ins: 'den du, o Jungfrau, vom Heiligen Geist empfangen hast' },
      { de: 'Heimsuchung', en: 'The Visitation', ins: 'den du, o Jungfrau, zu Elisabet getragen hast' },
      { de: 'Geburt Jesu', en: 'The Nativity', ins: 'den du, o Jungfrau, in Betlehem geboren hast' },
      { de: 'Darstellung im Tempel', en: 'The Presentation in the Temple', ins: 'den du, o Jungfrau, im Tempel aufgeopfert hast' },
      { de: 'Wiederfinden im Tempel', en: 'The Finding in the Temple', ins: 'den du, o Jungfrau, im Tempel wiedergefunden hast' },
    ] },
    luminous: { de: ['Lichtreich', 'Lichtreiche Geheimnisse'], en: ['Luminous', 'Luminous Mysteries'], m: [
      { de: 'Taufe im Jordan', en: 'The Baptism in the Jordan', ins: 'der von Johannes getauft worden ist' },
      { de: 'Hochzeit zu Kana', en: 'The Wedding at Cana', ins: 'der sich bei der Hochzeit in Kana offenbart hat' },
      { de: 'Verkündigung des Reiches Gottes', en: 'The Proclamation of the Kingdom', ins: 'der uns das Reich Gottes verkündet hat' },
      { de: 'Verklärung', en: 'The Transfiguration', ins: 'der auf dem Berg verklärt worden ist' },
      { de: 'Einsetzung der Eucharistie', en: 'The Institution of the Eucharist', ins: 'der uns die Eucharistie geschenkt hat' },
    ] },
    sorrowful: { de: ['Schmerzhaft', 'Schmerzhafte Geheimnisse'], en: ['Sorrowful', 'Sorrowful Mysteries'], m: [
      { de: 'Todesangst am Ölberg', en: 'The Agony in the Garden', ins: 'der für uns Blut geschwitzt hat' },
      { de: 'Geißelung', en: 'The Scourging at the Pillar', ins: 'der für uns gegeißelt worden ist' },
      { de: 'Dornenkrönung', en: 'The Crowning with Thorns', ins: 'der für uns mit Dornen gekrönt worden ist' },
      { de: 'Kreuztragung', en: 'The Carrying of the Cross', ins: 'der für uns das schwere Kreuz getragen hat' },
      { de: 'Kreuzigung', en: 'The Crucifixion', ins: 'der für uns gekreuzigt worden ist' },
    ] },
    glorious: { de: ['Glorreich', 'Glorreiche Geheimnisse'], en: ['Glorious', 'Glorious Mysteries'], m: [
      { de: 'Auferstehung', en: 'The Resurrection', ins: 'der von den Toten auferstanden ist' },
      { de: 'Himmelfahrt', en: 'The Ascension', ins: 'der in den Himmel aufgefahren ist' },
      { de: 'Sendung des Heiligen Geistes', en: 'The Descent of the Holy Spirit', ins: 'der uns den Heiligen Geist gesandt hat' },
      { de: 'Aufnahme Mariens in den Himmel', en: 'The Assumption of Mary', ins: 'der dich, o Jungfrau, in den Himmel aufgenommen hat' },
      { de: 'Krönung Mariens', en: 'The Coronation of Mary', ins: 'der dich, o Jungfrau, im Himmel gekrönt hat' },
    ] },
  };
  const ROSARY_ORDER = ['joyful', 'luminous', 'sorrowful', 'glorious'];
  const ROSARY_BY_DAY = ['glorious', 'joyful', 'sorrowful', 'glorious', 'luminous', 'sorrowful', 'joyful']; // Sun … Sat
  const ROSARY_TEXT = {
    creed: {
      de: ['Apostolisches Glaubensbekenntnis', 'Ich glaube an Gott, den Vater, den Allmächtigen,\nden Schöpfer des Himmels und der Erde,\nund an Jesus Christus, seinen eingeborenen Sohn, unsern Herrn,\nempfangen durch den Heiligen Geist, geboren von der Jungfrau Maria,\ngelitten unter Pontius Pilatus, gekreuzigt, gestorben und begraben,\nhinabgestiegen in das Reich des Todes,\nam dritten Tage auferstanden von den Toten,\naufgefahren in den Himmel;\ner sitzt zur Rechten Gottes, des allmächtigen Vaters;\nvon dort wird er kommen, zu richten die Lebenden und die Toten.\nIch glaube an den Heiligen Geist,\ndie heilige katholische Kirche, Gemeinschaft der Heiligen,\nVergebung der Sünden, Auferstehung der Toten\nund das ewige Leben. Amen.'],
      en: ['Apostles’ Creed', 'I believe in God, the Father almighty,\nCreator of heaven and earth,\nand in Jesus Christ, his only Son, our Lord,\nwho was conceived by the Holy Spirit, born of the Virgin Mary,\nsuffered under Pontius Pilate, was crucified, died and was buried;\nhe descended into hell;\non the third day he rose again from the dead;\nhe ascended into heaven,\nand is seated at the right hand of God the Father almighty;\nfrom there he will come to judge the living and the dead.\nI believe in the Holy Spirit,\nthe holy catholic Church, the communion of saints,\nthe forgiveness of sins, the resurrection of the body,\nand life everlasting. Amen.'],
    },
    fatima: {
      de: ['O mein Jesus (Fatima-Gebet)', 'O mein Jesus, verzeih uns unsere Sünden,\nbewahre uns vor dem Feuer der Hölle,\nführe alle Seelen in den Himmel,\nbesonders jene, die deiner Barmherzigkeit am meisten bedürfen.'],
      en: ['O My Jesus (Fatima Prayer)', 'O my Jesus, forgive us our sins,\nsave us from the fires of hell;\nlead all souls to heaven,\nespecially those in most need of thy mercy.'],
    },
    salve: {
      de: ['Salve Regina', 'Sei gegrüßt, o Königin, Mutter der Barmherzigkeit,\nunser Leben, unsre Wonne und unsre Hoffnung, sei gegrüßt!\nZu dir rufen wir verbannte Kinder Evas;\nzu dir seufzen wir trauernd und weinend in diesem Tal der Tränen.\nWohlan denn, unsre Fürsprecherin, wende deine barmherzigen Augen uns zu\nund nach diesem Elend zeige uns Jesus, die gebenedeite Frucht deines Leibes.\nO gütige, o milde, o süße Jungfrau Maria.\n\nBitte für uns, heilige Gottesmutter,\nauf dass wir würdig werden der Verheißungen Christi. Amen.'],
      en: ['Hail, Holy Queen', 'Hail, holy Queen, Mother of mercy,\nour life, our sweetness and our hope.\nTo thee do we cry, poor banished children of Eve;\nto thee do we send up our sighs, mourning and weeping in this valley of tears.\nTurn then, most gracious advocate, thine eyes of mercy toward us,\nand after this our exile show unto us the blessed fruit of thy womb, Jesus.\nO clement, O loving, O sweet Virgin Mary.\n\nPray for us, O holy Mother of God,\nthat we may be made worthy of the promises of Christ. Amen.'],
    },
    aveDe: ['Gegrüßet seist du, Maria, voll der Gnade, der Herr ist mit dir.\nDu bist gebenedeit unter den Frauen, und gebenedeit ist die Frucht deines Leibes, Jesus', '.\nHeilige Maria, Mutter Gottes, bitte für uns Sünder, jetzt und in der Stunde unseres Todes. Amen.'],
    introDe: ['der in uns den Glauben vermehre', 'der in uns die Hoffnung stärke', 'der in uns die Liebe entzünde'],
    introLabel: { de: ['Bitte um Glauben', 'Bitte um Hoffnung', 'Bitte um Liebe'], en: ['For an increase of faith', 'For an increase of hope', 'For an increase of charity'] },
  };
  const ROSARY_BASE = { cross: 'cross', 'our-father': 'our-father', 'hail-mary': 'hail-mary', glory: 'glory-be' };

  // Builds the ordered list of beads/prayers. sec: 'open' | 'close' | decade index (0–4).
  function rosarySteps(kind, m) {
    const s = [];
    const push = (type, sec, extra = {}) => s.push({ type, sec, ...extra });
    const decade = (d, mys) => {
      push('our-father', d, { mys });
      for (let i = 1; i <= 10; i++) push('hail-mary', d, { mys, n: i, of: 10 });
      push('glory', d, { mys });
      push('fatima', d, { mys });
    };
    if (kind === 'big') {
      push('cross', 'open'); push('creed', 'open'); push('our-father', 'open');
      for (let i = 1; i <= 3; i++) push('hail-mary', 'open', { intro: i - 1, n: i, of: 3 });
      push('glory', 'open');
      for (let d = 0; d < 5; d++) decade(d, d);
      push('salve', 'close'); push('cross', 'close');
    } else {
      push('cross', 'open');
      decade(0, m);
      push('cross', 'close');
    }
    return s;
  }
  function validRosary(r) {
    if (!r || (r.kind !== 'big' && r.kind !== 'small') || !ROSARY_ORDER.includes(r.set)) return false;
    if (!Number.isInteger(r.m) || r.m < 0 || r.m > 4 || !Number.isInteger(r.step)) return false;
    return r.step >= 0 && r.step < rosarySteps(r.kind, r.m).length;
  }
  function loadRosary() { try { const r = JSON.parse(localStorage.getItem('lumen.rosary')); return validRosary(r) ? r : null; } catch { return null; } }
  function saveRosary(r) { try { localStorage.setItem('lumen.rosary', JSON.stringify(r)); } catch {} }
  function clearRosary() { try { localStorage.removeItem('lumen.rosary'); } catch {} }

  function rosaryKicker(st, kind, set) {
    if (st.sec === 'open') return t('rosary.opening');
    if (st.sec === 'close') return t('rosary.closing');
    const name = ROSARY_SETS[set][LANG][1];
    return kind === 'big' ? `${t('rosary.decade')} ${st.sec + 1} ${t('rosary.of')} 5 · ${name}` : `${t('rosary.decade')} · ${name}`;
  }
  function rosaryStepTitle(st) {
    const base = ROSARY_BASE[st.type];
    return base ? PRAYERS.find((p) => p.id === base)[LANG][0] : ROSARY_TEXT[st.type][LANG][0];
  }
  function rosaryStepHTML(st, set) {
    if (st.type === 'hail-mary' && LANG === 'de') {
      const ins = st.intro != null ? ROSARY_TEXT.introDe[st.intro] : (st.mys != null ? ROSARY_SETS[set].m[st.mys].ins : null);
      return esc(ROSARY_TEXT.aveDe[0]) + (ins ? `, <span class="ros-ins">${esc(ins)}</span>` : '') + esc(ROSARY_TEXT.aveDe[1]);
    }
    const base = ROSARY_BASE[st.type];
    return esc(base ? PRAYERS.find((p) => p.id === base)[LANG][1] : ROSARY_TEXT[st.type][LANG][1]);
  }
  function rosaryPosition(r) {
    const st = rosarySteps(r.kind, r.m)[r.step];
    let pos = rosaryKicker(st, r.kind, r.set);
    if (st.type === 'hail-mary') pos += ` · ${LANG === 'de' ? 'Ave' : 'Hail Mary'} ${st.n}/${st.of}`;
    else pos += ` · ${rosaryStepTitle(st)}`;
    return pos;
  }

  VIEWS.rosary = ({ set } = {}) => {
    const today = ROSARY_BY_DAY[new Date().getDay()];
    const sel = ROSARY_ORDER.includes(set) ? set : today;
    current.params = { set: sel };
    const S = ROSARY_SETS[sel];
    const saved = loadRosary();
    view.innerHTML = `
      <div class="crumbs"><button data-nav="prayers">${t('prayers.title')}</button> › <span>${t('rosary.title')}</span></div>
      <div class="card dev-hero verse-hero ros-hero">
        <div class="kicker">📿 ${t('rosary.title')}</div>
        <h2 class="dev-title">${t('rosary.card.title')}</h2>
        <div class="ros-hero-text">${t('rosary.intro')}</div>
      </div>
      ${saved ? `<button class="card ros-resume" data-act="resume">
        <span class="ros-resume-info">
          <span class="ros-resume-kicker">${t('rosary.resume.title')}</span>
          <span class="ros-opt-title">${saved.kind === 'big' ? t('rosary.big') : t('rosary.small')} · ${esc(ROSARY_SETS[saved.set][LANG][0])}</span>
          <span class="ros-opt-sub">${esc(rosaryPosition(saved))}</span>
        </span>
        <span class="btn btn-primary">${t('rosary.resume')} ›</span>
      </button>` : ''}
      <div class="section-title">${t('rosary.mysteries')}</div>
      <div class="ros-sets" role="tablist">${ROSARY_ORDER.map((k) => `<button class="ros-set ${k === sel ? 'on' : ''}" data-set="${k}" role="tab" aria-selected="${k === sel}">${esc(ROSARY_SETS[k][LANG][0])}${k === today ? `<span class="ros-today">${t('rosary.today')}</span>` : ''}</button>`).join('')}</div>
      <div class="card prayer-bg ros-option">
        <div class="ros-opt-title">${t('rosary.big')}</div>
        <div class="ros-opt-sub">${t('rosary.big.sub')}</div>
        <button class="btn btn-primary btn-block" data-act="big" style="margin-top:16px">📿 ${t('rosary.start')} · ${esc(S[LANG][1])}</button>
      </div>
      <div class="card ros-option">
        <div class="ros-opt-title">${t('rosary.small')}</div>
        <div class="ros-opt-sub">${t('rosary.small.sub')}</div>
        <div class="prayer-list ros-myst-list">${S.m.map((mm, i) => `<button class="prayer-item" data-m="${i}"><span class="ros-num">${i + 1}</span><span class="ros-myst-name"><span class="pi-name">${esc(mm[LANG])}</span>${LANG === 'de' ? `<span class="ros-myst-ins">Jesus, ${esc(mm.ins)}</span>` : ''}</span><span class="pi-go">›</span></button>`).join('')}</div>
      </div>`;
    $('.crumbs [data-nav="prayers"]').addEventListener('click', () => navigate('prayers'));
    view.querySelector('[data-act="resume"]')?.addEventListener('click', () => navigate('rosaryPray', saved));
    view.querySelectorAll('.ros-set').forEach((b) => b.addEventListener('click', () => VIEWS.rosary({ set: b.dataset.set })));
    view.querySelector('[data-act="big"]').addEventListener('click', () => navigate('rosaryPray', { kind: 'big', set: sel, m: 0, step: 0 }));
    view.querySelectorAll('.ros-myst-list .prayer-item').forEach((b) => b.addEventListener('click', () => navigate('rosaryPray', { kind: 'small', set: sel, m: +b.dataset.m, step: 0 })));
  };

  let rosaryKeyNav = null; // arrow-key handler while praying
  VIEWS.rosaryPray = ({ kind, set, m = 0, step = 0, done = false } = {}) => {
    rosaryKeyNav = null;
    m = Number.isInteger(+m) ? +m : 0;
    if (!validRosary({ kind, set, m, step: 0 })) { navigate('rosary'); return; }
    const steps = rosarySteps(kind, m);
    const kindLabel = kind === 'big' ? t('rosary.big') : t('rosary.small');
    const crumbs = `<div class="crumbs"><button data-nav="prayers">${t('prayers.title')}</button> › <button data-nav="rosary">${t('rosary.title')}</button> › <span>${kindLabel}</span></div>`;
    const bindCrumbs = () => {
      $('.crumbs [data-nav="prayers"]').addEventListener('click', () => navigate('prayers'));
      $('.crumbs [data-nav="rosary"]').addEventListener('click', () => navigate('rosary', { set }));
    };

    if (done) {
      view.innerHTML = `${crumbs}
        <div class="card prayer-bg prayer-page ros-done">
          <div class="ros-done-ico">🕊</div>
          <div class="kicker">📿 ${t('rosary.title')} · ${esc(ROSARY_SETS[set][LANG][1])}</div>
          <h2 class="dev-title">${t('rosary.done.title')}</h2>
          <div class="prayer-text">${esc(t('rosary.done.text'))}</div>
          <div class="verse-actions">
            <button class="btn btn-primary" data-a="finish">${t('rosary.finish')}</button>
            <button class="btn btn-soft" data-a="again">↻ ${t('rosary.again')}</button>
          </div>
        </div>`;
      bindCrumbs();
      view.querySelector('[data-a="finish"]').addEventListener('click', () => navigate('prayers'));
      view.querySelector('[data-a="again"]').addEventListener('click', () => navigate('rosaryPray', { kind, set, m, step: 0 }));
      return;
    }

    let i = Math.min(Math.max(0, Number.isInteger(+step) ? +step : 0), steps.length - 1);
    view.innerHTML = `${crumbs}
      <div class="card prayer-bg prayer-page ros-pray" id="rosCard" aria-live="polite"></div>
      <div class="reader-nav ros-nav">
        <button class="btn btn-soft" id="rosPrev">‹ ${t('rosary.prev')}</button>
        <button class="btn btn-primary" id="rosNext"></button>
      </div>`;
    bindCrumbs();
    const card = $('#rosCard'), prev = $('#rosPrev'), next = $('#rosNext');

    function paint() {
      const st = steps[i];
      const mys = st.mys != null ? ROSARY_SETS[set].m[st.mys] : null;
      const line = mys ? mys[LANG] : (st.intro != null ? ROSARY_TEXT.introLabel[LANG][st.intro] : '');
      const pct = (((i + 1) / steps.length) * 100).toFixed(1);
      card.innerHTML = `
        <div class="ros-progress" aria-hidden="true"><span style="width:${pct}%"></span></div>
        ${st.n ? `<div class="ros-count" aria-label="${st.n} ${t('rosary.of')} ${st.of}"><b>${st.n}</b><small>/${st.of}</small></div>` : ''}
        <div class="ros-step">
          <div class="kicker">${esc(rosaryKicker(st, kind, set))}</div>
          ${line ? `<div class="ros-mys">✦ ${esc(line)}</div>` : ''}
          ${st.n ? `<div class="ros-beads" aria-hidden="true">${Array.from({ length: st.of }, (_, k) => `<span class="ros-bead${k < st.n - 1 ? ' done' : k === st.n - 1 ? ' cur' : ''}"></span>`).join('')}</div>` : ''}
          <h2 class="dev-title">${esc(rosaryStepTitle(st))}</h2>
          <div class="prayer-text">${rosaryStepHTML(st, set)}</div>
        </div>`;
      prev.disabled = i === 0;
      next.textContent = i === steps.length - 1 ? `${t('rosary.amen')} ✓` : `${t('rosary.next')} ›`;
      current.params = { kind, set, m, step: i };
      saveRosary({ kind, set, m, step: i });
    }
    function go(d) {
      if (d > 0 && i === steps.length - 1) { clearRosary(); navigate('rosaryPray', { kind, set, m, done: true }); return; }
      const ni = i + d;
      if (ni < 0 || ni >= steps.length) return;
      i = ni; paint();
      if (card.getBoundingClientRect().top < 0) window.scrollTo(0, 0);
    }

    prev.addEventListener('click', () => go(-1));
    next.addEventListener('click', () => go(1));
    // tap the card to advance (like moving to the next bead); swipe left/right on touch screens
    let tx = null, ty = null, swiped = false;
    card.addEventListener('touchstart', (e) => { tx = e.touches[0].clientX; ty = e.touches[0].clientY; swiped = false; }, { passive: true });
    card.addEventListener('touchend', (e) => {
      if (tx == null) return;
      const dx = e.changedTouches[0].clientX - tx, dy = e.changedTouches[0].clientY - ty; tx = null;
      if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) { swiped = true; go(dx < 0 ? 1 : -1); }
    });
    card.addEventListener('click', () => { if (swiped) { swiped = false; return; } if (!window.getSelection()?.toString()) go(1); });
    rosaryKeyNav = go;
    paint();
  };
  document.addEventListener('keydown', (e) => {
    if (current.name !== 'rosaryPray' || !rosaryKeyNav || e.target.closest?.('input, textarea')) return;
    if (e.key === 'ArrowRight') { e.preventDefault(); rosaryKeyNav(1); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); rosaryKeyNav(-1); }
  });

  // ---------- Settings ----------
  VIEWS.settings = () => {
    const n = store.notif;
    view.innerHTML = `
      <div class="greeting">${t('set.title')}</div>
      <div class="section-title">${t('set.language')}</div>
      <div class="card set-group"><div class="set-row"><div><div class="s-label">${t('set.language')}</div><div class="s-sub">${t('set.lang.sub')}</div></div>
        <div class="seg" id="segLang"><button data-v="de" class="${LANG === 'de' ? 'on' : ''}">Deutsch</button><button data-v="en" class="${LANG === 'en' ? 'on' : ''}">English</button></div></div></div>
      <div class="section-title">${t('set.theme')}</div>
      <div class="card set-group"><div class="set-row"><div class="s-label">${t('set.theme')}</div>
        <div class="seg" id="segTheme"><button data-v="light" class="${store.theme === 'light' ? 'on' : ''}">${t('set.theme.light')}</button><button data-v="dark" class="${store.theme === 'dark' ? 'on' : ''}">${t('set.theme.dark')}</button><button data-v="auto" class="${store.theme === 'auto' ? 'on' : ''}">${t('set.theme.auto')}</button></div></div>
        <div class="set-row"><div class="s-label">${t('set.textsize')}</div>
        <div class="seg" id="segSize"><button data-v="s" class="${store.textSize === 's' ? 'on' : ''}">A</button><button data-v="m" class="${store.textSize === 'm' ? 'on' : ''}" style="font-size:1rem">A</button><button data-v="l" class="${store.textSize === 'l' ? 'on' : ''}" style="font-size:1.2rem">A</button></div></div></div>
      <div class="section-title">${t('set.notif')}</div>
      <div class="card set-group">
        <div class="set-row"><div><div class="s-label">${t('set.notif')}</div><div class="s-sub">${t('notif.push.sub')}</div></div>
          <div class="switch ${n.enabled ? 'on' : ''}" id="notifSwitch" role="switch" aria-checked="${n.enabled}"></div></div>
        <div id="notifDetail" style="${n.enabled ? '' : 'display:none'}">
          <div class="s-sub" style="margin-top:6px">${t('set.notif.windows')}</div>
          <div class="notif-times" id="notifTimes">
            ${['morning', 'midday', 'evening', 'night'].map((w) => `<button class="nt ${n.windows[w] ? 'on' : ''}" data-w="${w}">${t('tw.' + w)}</button>`).join('')}
          </div>
          <button class="btn btn-soft btn-block" id="notifTest" style="margin-top:14px">${t('set.notif.test')}</button>
        </div>
      </div>
      <div id="installSlot2"></div>
      <div class="section-title">${t('set.about')}</div>
      <div class="card"><div class="prayer-text" style="font-size:.92rem">${esc(t('about.body')).replace(/\n/g, '<br>')}</div>
        <div class="credits" style="margin-top:14px">Lumen · v1.0<br>Allioli (DE) · Douay-Rheims (EN) — public domain.</div></div>`;

    $('#segLang').addEventListener('click', (e) => { const v = e.target.dataset.v; if (v) setLang(v); });
    $('#segTheme').addEventListener('click', (e) => { const v = e.target.dataset.v; if (v) { store.theme = v; applyTheme(); navigate('settings'); } });
    $('#segSize').addEventListener('click', (e) => { const v = e.target.dataset.v; if (v) { store.textSize = v; applyTextSize(); navigate('settings'); } });
    $('#notifSwitch').addEventListener('click', toggleNotif);
    view.querySelectorAll('#notifTimes .nt').forEach((b) => b.addEventListener('click', () => {
      const n2 = store.notif; n2.windows[b.dataset.w] = !n2.windows[b.dataset.w]; store.notif = n2; b.classList.toggle('on');
      if (n2.enabled) subscribePush(); // update windows on the server
    }));
    $('#notifTest')?.addEventListener('click', sendTestNotification);
    maybeRenderInstall($('#installSlot2'));
  };

  function setLang(v) {
    if (v === LANG) return;
    LANG = v; store.lang = v; applyI18nStatic();
    // re-render current view
    navigate(current.name, current.params);
  }
  function applyTheme() {
    const tm = store.theme;
    const dark = tm === 'dark' || (tm === 'auto' && matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    document.querySelector('meta[name=theme-color]').content = dark ? '#15111f' : '#fbf7ef';
  }
  function applyTextSize() {
    const map = { s: '1.04rem', m: '1.18rem', l: '1.38rem' };
    document.documentElement.style.setProperty('--reader-size', map[store.textSize] || map.m);
  }

  // ---------- Notifications ----------
  async function toggleNotif() {
    const n = store.notif;
    if (!n.enabled) {
      if (!('Notification' in window)) { toast(t('toast.notifblocked')); return; }
      let perm = Notification.permission;
      if (perm === 'default') perm = await Notification.requestPermission();
      if (perm !== 'granted') { toast(t('toast.notifblocked')); return; }
      n.enabled = true; store.notif = n;
      await subscribePush();          // true background push (works when app is closed)
      await registerPeriodicSync();   // Chromium fallback
      toast(t('toast.notifon'));
    } else {
      n.enabled = false; store.notif = n;
      await unsubscribePush();
      toast(t('toast.notifoff'));
    }
    navigate('settings');
  }
  function urlB64ToUint8Array(base64) {
    const pad = '='.repeat((4 - (base64.length % 4)) % 4);
    const b = (base64 + pad).replace(/-/g, '+').replace(/_/g, '/');
    const raw = atob(b); return Uint8Array.from([...raw].map((c) => c.charCodeAt(0)));
  }
  async function subscribePush() {
    try {
      if (!('serviceWorker' in navigator) || !('PushManager' in window)) return false;
      const reg = await navigator.serviceWorker.ready;
      let sub = await reg.pushManager.getSubscription();
      if (!sub) {
        const { key } = await (await fetch('/api/push/public-key')).json();
        if (!key) return false; // push backend not configured yet
        sub = await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: urlB64ToUint8Array(key) });
      }
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
      await fetch('/api/push/subscribe', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subscription: sub.toJSON(), tz, lang: LANG, windows: store.notif.windows, prayer: true }),
      });
      return true;
    } catch (e) { return false; }
  }
  async function unsubscribePush() {
    try {
      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.getSubscription();
      if (sub) {
        await fetch('/api/push/unsubscribe', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ endpoint: sub.endpoint }) }).catch(() => {});
        await sub.unsubscribe().catch(() => {});
      }
    } catch {}
  }
  async function registerPeriodicSync() {
    try {
      const reg = await navigator.serviceWorker.ready;
      if ('periodicSync' in reg) {
        const status = await navigator.permissions.query({ name: 'periodic-background-sync' }).catch(() => ({ state: 'granted' }));
        if (status.state === 'granted') await reg.periodicSync.register('lumen-verse', { minInterval: 3 * 60 * 60 * 1000 });
      }
    } catch {}
  }
  async function sendTestNotification() {
    if (Notification.permission !== 'granted') { const p = await Notification.requestPermission(); if (p !== 'granted') { toast(t('toast.notifblocked')); return; } }
    const v = await pickVerse(timeBucket());
    const reg = await navigator.serviceWorker.ready;
    reg.showNotification('Lumen', {
      body: `“${v.text[LANG]}”\n— ${v.ref[LANG]}`,
      icon: '/icons/icon-192.png', badge: '/icons/badge.png', tag: 'lumen-verse',
      data: { book: v.book, ch: v.c, v: v.v },
    });
    toast(t('toast.sent'));
  }
  async function pushConfigToSW() {
    try {
      const cfg = { notif: JSON.parse(localStorage.getItem('lumen.notif') || 'null'), lang: localStorage.getItem('lumen.lang') || LANG };
      const cache = await caches.open('lumen-config');
      await cache.put('/__config', new Response(JSON.stringify(cfg), { headers: { 'Content-Type': 'application/json' } }));
    } catch {}
  }

  // ---------- Install (PWA) ----------
  let deferredPrompt = null;
  window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); deferredPrompt = e; });
  function maybeRenderInstall(slot) {
    if (!slot || !deferredPrompt) return;
    slot.innerHTML = `<div class="install-banner"><span style="font-size:1.4rem">✦</span><span class="ib-text">${t('install.text')}</span><button class="btn btn-primary" id="installBtn">${t('install.btn')}</button></div>`;
    $('#installBtn').addEventListener('click', async () => { deferredPrompt.prompt(); await deferredPrompt.userChoice; deferredPrompt = null; slot.innerHTML = ''; });
  }

  // ---------- Boot ----------
  function bindShell() {
    document.querySelectorAll('.tab, .topbar-brand').forEach((b) => b.addEventListener('click', () => navigate(b.dataset.nav)));
    $('#langToggle').addEventListener('click', () => setLang(LANG === 'de' ? 'en' : 'de'));
    matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => { if (store.theme === 'auto') applyTheme(); });
    // service worker messages → navigate to verse
    navigator.serviceWorker?.addEventListener('message', (e) => {
      if (e.data?.type === 'open-verse') navigate('reader', { id: e.data.book, ch: e.data.ch, scrollVerse: e.data.v });
    });
  }

  async function boot() {
    applyTheme(); applyTextSize(); applyI18nStatic(); bindShell();
    await Promise.all([getManifest(), getVerses()]);
    // after an automatic update-reload, come back to the same screen (e.g. mid-rosary)
    let restore = null;
    try { restore = JSON.parse(sessionStorage.getItem('lumen.restore')); sessionStorage.removeItem('lumen.restore'); } catch {}
    if (restore && Object.prototype.hasOwnProperty.call(VIEWS, restore.name) && restore.name !== 'companion') navigate(restore.name, restore.params || {});
    else navigate('home');
    // reveal app, hide splash
    $('#app').hidden = false;
    setTimeout(() => { $('#splash').classList.add('hide'); }, 350);
    // SW
    if ('serviceWorker' in navigator) {
      // when a new version of the app is deployed, switch to it right away
      const hadController = !!navigator.serviceWorker.controller;
      let reloading = false;
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (!hadController || reloading || chatHistory.length) return; // never interrupt a Companion conversation
        reloading = true;
        try { sessionStorage.setItem('lumen.restore', JSON.stringify(current)); } catch {}
        location.reload();
      });
      try {
        const reg = await navigator.serviceWorker.register('/sw.js', { updateViaCache: 'none' });
        pushConfigToSW();
        // home-screen apps are often resumed instead of relaunched — check for updates whenever the app comes back
        document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') reg.update().catch(() => {}); });
      } catch {}
    }
    // handle launch from notification (?verse=book.ch.v)
    const params = new URLSearchParams(location.search);
    const vp = params.get('verse');
    const np = params.get('nav');
    if (vp) { const [id, ch, v] = vp.split('.'); navigate('reader', { id, ch: +ch, scrollVerse: +v }); history.replaceState(null, '', '/'); }
    else if (np && ['home', 'bible', 'companion', 'prayers', 'settings', 'devotion'].includes(np)) { navigate(np); history.replaceState(null, '', '/'); }
  }

  document.addEventListener('DOMContentLoaded', boot);
})();
