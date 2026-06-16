# ✝ Lumen — Catholic Bible & Prayer

> *Das Licht des Wortes · The Light of the Word*

**Lumen** brings the Word of God to more people: the **complete Roman Catholic Bible** (all 73 books) in **German and English**, as an installable Progressive Web App (PWA) that works offline, sends you a fitting Scripture verse for the time of day, holds the treasury of traditional Catholic prayers, and offers a gentle **AI spiritual companion** that responds only with Scripture, prayer, and the Catholic faith.

## ✨ Features

- **Complete Catholic Bible, two languages** — full 73-book canon including the deuterocanonical books.
  - 🇩🇪 German: **Allioli** (Vulgate translation, ecclesiastically approved, public domain)
  - 🇬🇧 English: **Douay-Rheims** (the classic Catholic English Bible, public domain)
  - One-tap **language toggle** anywhere in the app.
- **A verse for this moment** — the home screen shows a Scripture verse chosen to fit the **time of day** (morning, midday, evening, night).
- **Daily verse notifications** — opt-in notifications deliver a time-fitting verse; you choose which windows of the day.
- **Spiritual Companion (AI)** — share what is on your heart and receive a compassionate word, a fitting Bible verse, a prayer for your need, and Catholic encouragement.
- **Prayers** — the Our Father, Hail Mary, Glory Be, Morning & Evening prayers, Act of Contrition, Come Holy Spirit, St. Michael, and more — in both languages.
- **Real PWA** — installable to the home screen, fully offline, with a reverent loading screen and a glowing-cross icon.
- **Light & dark ("dawn / night") themes**, adjustable Scripture text size.

## 🔑 Configuring the AI Companion

The Companion uses the **Anthropic Claude** API through a serverless function (`/api/chat`). To activate it:

1. Get an API key from <https://console.anthropic.com>.
2. In your Vercel project: **Settings → Environment Variables**, add
   `ANTHROPIC_API_KEY = sk-ant-...` (Production, Preview, Development).
3. Redeploy (or just push) — the Companion activates automatically.

Until a key is set, the whole app works perfectly; the Companion simply shows a friendly "not configured yet" message.

Optional: set `LUMEN_MODEL` to override the model (default `claude-haiku-4-5`).

## 🚀 Deployment

This repo is a zero-build static site plus one serverless function, deployed on **Vercel**. Every push to `main` **auto-deploys** (Vercel's GitHub integration).

## 🛠 Development

```bash
npm install            # only needed for icon generation (sharp)
npx vercel dev         # run locally with the API function
# or serve statically (Companion disabled):
npx serve .
```

### Regenerating the Bible data

The bundled Bible JSON lives in `data/`. To rebuild it:

```bash
npm run fetch:missing  # fetch the 5 books missing from the Allioli TSV (1/2 Kings, Ezra, Romans, Hebrews)
npm run build:bible    # assemble data/de, data/en, manifest.json, verses.json
npm run build:icons    # regenerate PNG icons from the SVGs
```

(The large raw sources go in `scripts/_src/` and are git-ignored.)

## 📜 Text sources & licensing

- **Allioli Bible** (German, Vulgate) — public domain. Missing books supplemented from [vulgata.info](https://www.vulgata.info), same Allioli text.
- **Douay-Rheims Bible** (English) — public domain.

Both are Vulgate-based, so chapter/verse numbering (including the Psalms) aligns between the two languages.

## 🙏 Purpose

*"Thy word is a lamp to my feet, and a light to my paths." (Ps 118:105)*

May Lumen help bring the Word of God to more hearts.
