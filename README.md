# ✝ Lumen — Catholic Bible & Prayer

> *Das Licht des Wortes · The Light of the Word*

**Lumen** brings the Word of God to more people: the **complete Roman Catholic Bible** (all 73 books) in **German and English**, as an installable Progressive Web App (PWA) that works offline, gives you a daily devotion (*Andacht*), keeps you going with a streak, sends fitting Scripture verses & prayer reminders **even when the app is closed**, holds traditional Catholic prayers, and offers a gentle **AI spiritual companion**.

## ✨ Features

- **Complete Catholic Bible, two languages** — full 73-book canon incl. the deuterocanonical books.
  - 🇩🇪 German: **Allioli** (Vulgate translation, public domain)
  - 🇬🇧 English: **Douay-Rheims** (public domain)
  - One-tap **language toggle** everywhere.
- **Daily Andacht (devotion)** — each day: a Scripture verse, a short reflection, and a fitting prayer (30-day rotation, bilingual).
- **Streak system** — a flame counter that grows each day you pray the devotion, to keep you motivated.
- **A verse for this moment** — the home screen shows a verse fitting the **time of day**.
- **Closed-app notifications** — true Web Push delivers a time-fitting verse / prayer reminder even when the app is fully closed, in the windows you choose (morning/midday/evening/night).
- **Spiritual Companion (AI)** — share what is on your heart; receive a compassionate word, a fitting Bible verse, a prayer, and Catholic encouragement.
- **Prayers** — Our Father, Hail Mary, Glory Be, Morning/Evening, Act of Contrition, Come Holy Spirit, Guardian Angel, St. Michael — bilingual.
- **Fully responsive** — phone (bottom tab bar), laptop & desktop (side navigation), fluid type — fits any screen.
- **Catholic-fitting design** — glowing-cross icon, stained-glass & light-ray backgrounds, light/dawn & dark/night themes, adjustable Scripture size, reverent loading screen.

## 🔑 Activating the AI Companion (free)

The Companion is provider-agnostic. The **free** option is **Google Gemini**:

1. Get a free key (no credit card) at <https://aistudio.google.com/apikey>.
2. In Vercel → project **lumen-bible** → **Settings → Environment Variables**, add
   `GEMINI_API_KEY = ...` (Production).
3. Redeploy or push — the Companion activates automatically.

Alternatively set `ANTHROPIC_API_KEY` to use Claude. Until a key is set, the rest of the app works fully and the Companion shows a friendly "not configured yet" message.

Optional overrides: `LUMEN_GEMINI_MODEL` (default `gemini-2.5-flash`), `LUMEN_CLAUDE_MODEL`.

## 🔔 How closed-app notifications work

1. The browser subscribes to **Web Push** (VAPID) and stores the subscription via `/api/push/subscribe`.
2. Subscriptions live in an isolated, namespaced table in a Supabase project (`lumen_push_subscriptions`).
3. A **Supabase `pg_cron` job runs hourly** and calls `/api/push/run` (secured by `PUSH_SECRET`).
4. The sender computes each subscriber's **local time** and sends at most one notification per time-window per day, with a time-fitting verse (the morning one is the daily *Andacht*).

> iPhone/iPad: Web Push requires the PWA to be **added to the Home Screen** (iOS 16.4+). On Android/desktop Chrome it also works installed or in the browser, with background sync as an extra fallback.

### Server env vars (already configured in Vercel)
`SUPABASE_URL`, `SUPABASE_KEY`, `PUSH_SECRET`, `VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY`, `VAPID_SUBJECT`, `PUBLIC_BASE_URL`, and (for AI) `GEMINI_API_KEY`.

## 🚀 Deployment

Zero-build static site + serverless functions on **Vercel**. Every push to `main` **auto-deploys**.

## 🛠 Development

```bash
npm install            # web-push (push sender) + sharp (icons)
npx vercel dev         # run locally with the API functions
npm run build:bible    # rebuild Bible JSON from sources
npm run build:devotions# rebuild the daily devotions
npm run build:icons    # regenerate icons
```

## 📜 Text sources & licensing

- **Allioli Bible** (German, Vulgate) — public domain; the 5 books absent from the base source were supplemented from [vulgata.info](https://www.vulgata.info) (same Allioli text).
- **Douay-Rheims Bible** (English) — public domain.

Both are Vulgate-based, so chapter/verse numbering (incl. the Psalms) aligns across languages.

## 🙏 Purpose

*"Thy word is a lamp to my feet, and a light to my paths." (Ps 118:105)*

May Lumen help bring the Word of God to more hearts.
