// Fetches the 5 books missing from the Allioli TSV (1/2 Kings, Ezra, Romans, Hebrews)
// from vulgata.info (same Allioli text), parses the German column, writes data/_missing-de.json
import { writeFileSync } from 'node:fs';

const API = 'https://www.vulgata.info/api.php';

const BOOKS = [
  { id: '1koenige', ns: 'AT', prefix: '1Koe', chapters: 22 },
  { id: '2koenige', ns: 'AT', prefix: '2Koe', chapters: 25 },
  { id: 'esra',     ns: 'AT', prefix: 'Esr',  chapters: 10 },
  { id: 'roemer',   ns: 'NT', prefix: 'Roem', chapters: 16 },
  { id: 'hebraeer', ns: 'NT', prefix: 'Hebr', chapters: 13 },
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchWikitext(page) {
  const url = `${API}?action=parse&page=${encodeURIComponent(page)}&prop=wikitext&format=json`;
  for (let attempt = 0; attempt < 4; attempt++) {
    try {
      const res = await fetch(url, { headers: { 'User-Agent': 'LumenBibleApp/1.0 (build script)' } });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const j = await res.json();
      const w = j?.parse?.wikitext?.['*'];
      if (!w) throw new Error('no wikitext');
      return w;
    } catch (e) {
      if (attempt === 3) throw e;
      await sleep(1500 * (attempt + 1));
    }
  }
}

function clean(t) {
  return t
    .replace(/<sup>[\s\S]*?<\/sup>/g, '')   // footnote markers
    .replace(/\[\[[^\]]*\]\]/g, '')          // wiki links / cross refs
    .replace(/'{2,}/g, '')                    // italic/bold markup
    .replace(/<[^>]+>/g, '')                  // any remaining html
    .replace(/\[[^\]]*\]/g, '')               // leftover [ ... ]
    .replace(/ /g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function parseGermanVerses(wikitext) {
  // Page = Latin column then German column, each beginning with a "1. " verse.
  const starts = [...wikitext.matchAll(/\n1\.\s/g)].map((m) => m.index);
  if (starts.length < 2) throw new Error('could not locate German column');
  const gStart = starts[1];
  let region = wikitext.slice(gStart);
  const cut = region.search(/Weitere Kapitel|\[\[Kategorie:Vulgata\]\]/);
  if (cut > 0) region = region.slice(0, cut);

  const verses = {};
  let expected = 1;
  const re = /(\d+)\.\s+([\s\S]*?)<br\s*\/?>/g;
  let m;
  while ((m = re.exec(region)) !== null) {
    const n = parseInt(m[1], 10);
    if (n !== expected) {
      // tolerate a single gap (rare), but stop if we've clearly left the verse block
      if (n < expected || n > expected + 1) break;
      expected = n;
    }
    const text = clean(m[2]);
    if (text) verses[n] = text;
    expected = n + 1;
  }
  return verses;
}

const out = {};
let totalVerses = 0;
for (const book of BOOKS) {
  out[book.id] = {};
  for (let c = 1; c <= book.chapters; c++) {
    const page = `Kategorie:BIBLIA SACRA:${book.ns}:${book.prefix}${String(c).padStart(2, '0')}`;
    const wt = await fetchWikitext(page);
    const verses = parseGermanVerses(wt);
    const count = Object.keys(verses).length;
    if (count === 0) throw new Error(`EMPTY chapter ${book.id} ${c} (${page})`);
    out[book.id][c] = verses;
    totalVerses += count;
    process.stdout.write(`${book.id} ${c}:${count}  `);
    await sleep(400);
  }
  console.log(`\n== ${book.id}: ${book.chapters} chapters done ==`);
}

writeFileSync(new URL('../data/_missing-de.json', import.meta.url), JSON.stringify(out));
console.log(`\nWROTE data/_missing-de.json  total verses: ${totalVerses}`);
