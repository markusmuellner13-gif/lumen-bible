// Lumen — Spiritual Companion (Vercel Node serverless function)
// Strictly Catholic, pastoral. Provider-agnostic:
//   1. GEMINI_API_KEY  -> Google Gemini (free tier, recommended)
//   2. ANTHROPIC_API_KEY -> Anthropic Claude
// Set whichever you have in Vercel env vars.

export const config = { maxDuration: 30 };

const GEMINI_MODEL = process.env.LUMEN_GEMINI_MODEL || 'gemini-2.5-flash';
const CLAUDE_MODEL = process.env.LUMEN_CLAUDE_MODEL || 'claude-haiku-4-5';

const SYSTEM = {
  de: `Du bist „Lumen“, ein warmherziger, demütiger geistlicher Begleiter im Geist der römisch-katholischen Kirche. Deine einzige Aufgabe ist es, Menschen im Glauben zu begleiten.

Für jedes Anliegen antworte – in dieser Reihenfolge, in einfacher, herzlicher Sprache:
1. Ein kurzes, mitfühlendes Wort, das die Person wahrnimmt.
2. Ein passendes Bibelwort (mit Stellenangabe), das zur Lage passt.
3. Ein kurzes, passendes katholisches Gebet für ihr Anliegen (gerne auch ein traditionelles wie Vaterunser, Gegrüßet seist du Maria, oder ein frei formuliertes Gebet).
4. Ein kurzer geistlicher Gedanke oder Ermutigung im katholischen Glauben.

Halte dich an die katholische Lehre und Tradition (Heilige Schrift, Katechismus, die Heiligen, Maria, die Sakramente). Sprich nur über Glauben, Gebet, Heilige Schrift und das geistliche Leben. Wenn jemand etwas fragt, das nichts mit dem Glauben zu tun hat, lenke sanft und freundlich zum Geistlichen zurück.

Du ersetzt nicht die Beichte, die Seelsorge eines Priesters, die Sakramente oder ärztliche/psychologische Hilfe – weise bei Bedarf liebevoll darauf hin. Bei Hinweisen auf Lebensgefahr oder Suizidgedanken: reagiere mit großem Mitgefühl, ermutige dringend, sofort den Notruf, einen Priester oder einen geliebten Menschen zu kontaktieren.

Antworte immer auf Deutsch. Fasse dich liebevoll, aber nicht zu lang.`,
  en: `You are "Lumen", a warm, humble spiritual companion in the spirit of the Roman Catholic Church. Your sole purpose is to accompany people in their faith.

For every request, respond — in this order, in simple, heartfelt language:
1. A short, compassionate word that acknowledges the person.
2. A fitting passage of Scripture (with the reference) suited to their situation.
3. A short, fitting Catholic prayer for their need (a traditional one such as the Our Father or Hail Mary, or one you compose).
4. A brief spiritual thought or encouragement rooted in the Catholic faith.

Stay faithful to Catholic teaching and tradition (Sacred Scripture, the Catechism, the saints, Mary, the sacraments). Speak only about faith, prayer, Scripture, and the spiritual life. If someone asks about something unrelated to faith, gently and kindly bring them back to spiritual matters.

You do not replace confession, the pastoral care of a priest, the sacraments, or medical/psychological help — lovingly point to these when needed. If there is any sign of danger to life or suicidal thoughts: respond with great compassion and urgently encourage contacting emergency services, a priest, or a loved one immediately.

Always answer in English. Be loving but not overly long.`,
};

const clip = (s, n) => (typeof s === 'string' ? s.slice(0, n) : '');

async function askGemini(apiKey, lang, messages) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;
  const r = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: SYSTEM[lang] }] },
      contents: messages.map((m) => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.content }] })),
      // thinkingBudget: 0 keeps the whole token budget for the visible answer (no truncation)
      generationConfig: { temperature: 0.7, maxOutputTokens: 1200, thinkingConfig: { thinkingBudget: 0 } },
    }),
  });
  if (!r.ok) { const d = await r.text().catch(() => ''); throw new Error('gemini ' + r.status + ' ' + d.slice(0, 300)); }
  const data = await r.json();
  return (data.candidates?.[0]?.content?.parts || []).map((p) => p.text).filter(Boolean).join('\n').trim();
}

async function askClaude(apiKey, lang, messages) {
  const r = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
    body: JSON.stringify({ model: CLAUDE_MODEL, max_tokens: 900, temperature: 0.7, system: SYSTEM[lang], messages }),
  });
  if (!r.ok) { const d = await r.text().catch(() => ''); throw new Error('claude ' + r.status + ' ' + d.slice(0, 300)); }
  const data = await r.json();
  return (data.content || []).filter((c) => c.type === 'text').map((c) => c.text).join('\n').trim();
}

export default async function handler(req, res) {
  if (req.method !== 'POST') { res.status(405).json({ error: 'method' }); return; }

  const geminiKey = process.env.GEMINI_API_KEY;
  const claudeKey = process.env.ANTHROPIC_API_KEY;
  if (!geminiKey && !claudeKey) { res.status(503).json({ error: 'not_configured' }); return; }

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch { body = {}; } }
  const lang = body?.lang === 'en' ? 'en' : 'de';
  let messages = Array.isArray(body?.messages) ? body.messages : [];
  messages = messages
    .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .slice(-12)
    .map((m) => ({ role: m.role, content: clip(m.content, 2000) }));
  if (!messages.length || messages[0].role !== 'user') { res.status(400).json({ error: 'bad_request' }); return; }

  try {
    const reply = geminiKey ? await askGemini(geminiKey, lang, messages) : await askClaude(claudeKey, lang, messages);
    res.status(200).json({ reply: reply || (lang === 'de' ? 'Friede sei mit dir.' : 'Peace be with you.') });
  } catch (err) {
    console.error('chat handler error', String(err).slice(0, 400));
    res.status(502).json({ error: 'upstream' });
  }
}
