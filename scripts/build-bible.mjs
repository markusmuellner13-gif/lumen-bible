// Builds the bundled Bible data for Lumen.
// German  = Allioli (Vulgate) : scripts/_src/allioli.tsv + data/_missing-de.json (1/2 Kings, Ezra, Romans, Hebrews)
// English = Douay-Rheims       : scripts/_src/dr.json
// Output  : data/de/<id>.json, data/en/<id>.json, data/manifest.json, data/verses.json
import { readFileSync, writeFileSync } from 'node:fs';

const here = (p) => new URL(p, import.meta.url);

// --- Canonical 73-book Catholic order (modern / Einheitsübersetzung naming) ---
// [id, testament, deName, deAbbr, enName, tsvKey(null=from _missing-de), drKey]
const BOOKS = [
  ['genesis','OT','Genesis','Gen','Genesis','Genesis','Genesis'],
  ['exodus','OT','Exodus','Ex','Exodus','Exodus','Exodus'],
  ['levitikus','OT','Levitikus','Lev','Leviticus','Levitikus','Leviticus'],
  ['numeri','OT','Numeri','Num','Numbers','Numer','Numbers'],
  ['deuteronomium','OT','Deuteronomium','Dtn','Deuteronomy','Deuteronomium','Deuteronomy'],
  ['josua','OT','Josua','Jos','Joshua','Josua','Josue'],
  ['richter','OT','Richter','Ri','Judges','Richter','Judges'],
  ['rut','OT','Rut','Rut','Ruth','Rut','Ruth'],
  ['1samuel','OT','1 Samuel','1 Sam','1 Samuel','1 Samuel','1 Kings'],
  ['2samuel','OT','2 Samuel','2 Sam','2 Samuel','2 Samuel','2 Kings'],
  ['1koenige','OT','1 Könige','1 Kön','1 Kings',null,'3 Kings'],
  ['2koenige','OT','2 Könige','2 Kön','2 Kings',null,'4 Kings'],
  ['1chronik','OT','1 Chronik','1 Chr','1 Chronicles','1 Chronik','1 Paralipomenon'],
  ['2chronik','OT','2 Chronik','2 Chr','2 Chronicles','2 Chronik','2 Paralipomenon'],
  ['esra','OT','Esra','Esra','Ezra',null,'1 Esdras'],
  ['nehemia','OT','Nehemia','Neh','Nehemiah','Nehemia','2 Esdras'],
  ['tobit','OT','Tobit','Tob','Tobit','Tobit','Tobias'],
  ['judit','OT','Judit','Jdt','Judith','Judit','Judith'],
  ['ester','OT','Ester','Est','Esther','Ester','Esther'],
  ['1makkabaeer','OT','1 Makkabäer','1 Makk','1 Maccabees','1 Makkabäer','1 Machabees'],
  ['2makkabaeer','OT','2 Makkabäer','2 Makk','2 Maccabees','2 Makkabäer','2 Machabees'],
  ['ijob','OT','Ijob','Ijob','Job','Ijob','Job'],
  ['psalmen','OT','Psalmen','Ps','Psalms','Psalmen','Psalms'],
  ['sprichwoerter','OT','Sprichwörter','Spr','Proverbs','Sprichwörter','Proverbs'],
  ['kohelet','OT','Kohelet','Koh','Ecclesiastes','Kohelet','Ecclesiastes'],
  ['hohelied','OT','Hoheslied','Hld','Song of Songs','Hohelied','Canticle of Canticles'],
  ['weisheit','OT','Weisheit','Weish','Wisdom','Weisheit','Wisdom'],
  ['sirach','OT','Jesus Sirach','Sir','Sirach','Sirach','Ecclesiasticus'],
  ['jesaja','OT','Jesaja','Jes','Isaiah','Jesaja','Isaias'],
  ['jeremia','OT','Jeremia','Jer','Jeremiah','Jeremia','Jeremias'],
  ['klagelieder','OT','Klagelieder','Klgl','Lamentations','Klagelieder','Lamentations'],
  ['baruch','OT','Baruch','Bar','Baruch','Baruch','Baruch'],
  ['ezechiel','OT','Ezechiel','Ez','Ezekiel','Ezechiel','Ezechiel'],
  ['daniel','OT','Daniel','Dan','Daniel','Daniel','Daniel'],
  ['hosea','OT','Hosea','Hos','Hosea','Hosea','Osee'],
  ['joel','OT','Joël','Joël','Joel','Joel','Joel'],
  ['amos','OT','Amos','Am','Amos','Amos','Amos'],
  ['obadja','OT','Obadja','Obd','Obadiah','Obadja','Abdias'],
  ['jona','OT','Jona','Jona','Jonah','Jona','Jonas'],
  ['micha','OT','Micha','Mi','Micah','Micha','Micheas'],
  ['nahum','OT','Nahum','Nah','Nahum','Nahum','Nahum'],
  ['habakuk','OT','Habakuk','Hab','Habakkuk','Habakuk','Habacuc'],
  ['zefanja','OT','Zefanja','Zef','Zephaniah','Zefanja','Sophonias'],
  ['haggai','OT','Haggai','Hag','Haggai','Haggai','Aggeus'],
  ['sacharja','OT','Sacharja','Sach','Zechariah','Sacharja','Zacharias'],
  ['maleachi','OT','Maleachi','Mal','Malachi','Maleachi','Malachias'],
  ['matthaeus','NT','Matthäus','Mt','Matthew','Matthäus','Matthew'],
  ['markus','NT','Markus','Mk','Mark','Markus','Mark'],
  ['lukas','NT','Lukas','Lk','Luke','Lukas','Luke'],
  ['johannes','NT','Johannes','Joh','John','Johannes','John'],
  ['apostelgeschichte','NT','Apostelgeschichte','Apg','Acts','Apostelgeschichte','Acts'],
  ['roemer','NT','Römer','Röm','Romans',null,'Romans'],
  ['1korinther','NT','1 Korinther','1 Kor','1 Corinthians','1 Korinther','1 Corinthians'],
  ['2korinther','NT','2 Korinther','2 Kor','2 Corinthians','2 Korinther','2 Corinthians'],
  ['galater','NT','Galater','Gal','Galatians','Galater','Galatians'],
  ['epheser','NT','Epheser','Eph','Ephesians','Epheser','Ephesians'],
  ['philipper','NT','Philipper','Phil','Philippians','Philliper','Philippians'],
  ['kolosser','NT','Kolosser','Kol','Colossians','Kolosser','Colossians'],
  ['1thessalonicher','NT','1 Thessalonicher','1 Thess','1 Thessalonians','1 Thessalonicher','1 Thessalonians'],
  ['2thessalonicher','NT','2 Thessalonicher','2 Thess','2 Thessalonians','2 Thessalonicher','2 Thessalonians'],
  ['1timotheus','NT','1 Timotheus','1 Tim','1 Timothy','1 Timotheus','1 Timothy'],
  ['2timotheus','NT','2 Timotheus','2 Tim','2 Timothy','2 Timotheus','2 Timothy'],
  ['titus','NT','Titus','Tit','Titus','Titus','Titus'],
  ['philemon','NT','Philemon','Phlm','Philemon','Philemon','Philemon'],
  ['hebraeer','NT','Hebräer','Hebr','Hebrews',null,'Hebrews'],
  ['jakobus','NT','Jakobus','Jak','James','Jakobus','James'],
  ['1petrus','NT','1 Petrus','1 Petr','1 Peter','1 Petrus','1 Peter'],
  ['2petrus','NT','2 Petrus','2 Petr','2 Peter','2 Petrus','2 Peter'],
  ['1johannes','NT','1 Johannes','1 Joh','1 John','1 Johannes','1 John'],
  ['2johannes','NT','2 Johannes','2 Joh','2 John','2 Johannes','2 John'],
  ['3johannes','NT','3 Johannes','3 Joh','3 John','3 Johannes','3 John'],
  ['judas','NT','Judas','Jud','Jude','Judas','Jude'],
  ['offenbarung','NT','Offenbarung','Offb','Revelation','Offenbarung','Apocalypse'],
];

// --- clean helpers ---
const cleanDe = (t) => t
  .replace(/[¹²³⁰-₟]/g, '') // superscript footnote markers
  .replace(/\[[^\]]*\]/g, '')                        // [cross refs]
  .replace(/\r/g, '')
  .replace(/\s+/g, ' ')
  .trim();
const cleanEn = (t) => t
  .replace(/\*/g, '')
  .replace(/\s+/g, ' ')
  .trim();

// --- parse Allioli TSV (German, 63 books) ---
const tsv = readFileSync(here('./_src/allioli.tsv'), 'utf8').split('\n');
const deByTsvKey = {}; // tsvKey -> {ch:{v:text}}
for (const line of tsv) {
  if (!line) continue;
  const f = line.split('\t');
  if (f.length !== 7) continue;            // 7 fields = a verse row (Latin+German); 8 = heading/footnote
  const [book, , , chap, verse, , german] = f;
  const txt = cleanDe(german);
  if (!txt) continue;
  (deByTsvKey[book] ||= {});
  (deByTsvKey[book][chap] ||= {});
  deByTsvKey[book][chap][verse] = txt;
}

// --- missing German books from vulgata.info ---
const missingDe = JSON.parse(readFileSync(here('../data/_missing-de.json'), 'utf8'));

// --- parse Douay-Rheims (English, 73 books) from isaacronan flat dataset ---
const drBooks = JSON.parse(readFileSync(here('./_src/dr_books.json'), 'utf8'));
const drVerses = JSON.parse(readFileSync(here('./_src/dr_verses.json'), 'utf8'));
const drNameToNum = {};
for (const b of drBooks) drNameToNum[b.shortname] = b.booknumber;
const dr = {}; // shortname -> { chapter: { verse: text } }
for (const b of drBooks) dr[b.shortname] = {};
const numToName = Object.fromEntries(drBooks.map((b) => [b.booknumber, b.shortname]));
for (const row of drVerses) {
  const name = numToName[row.booknumber];
  const ch = String(row.chapternumber);
  (dr[name][ch] ||= {});
  dr[name][ch][String(row.versenumber)] = row.text;
}

const manifest = { version: 1, builtAt: new Date().toISOString(), books: [] };
let totalDe = 0, totalEn = 0;
const lookupDe = {}, lookupEn = {}; // id -> chapters obj (for curated verse resolution)

BOOKS.forEach((b, i) => {
  const [id, testament, deName, deAbbr, enName, tsvKey, drKey] = b;

  // German chapters
  let deCh;
  if (tsvKey === null) {
    deCh = missingDe[id];
    if (!deCh) throw new Error('missing DE data for ' + id);
  } else {
    deCh = deByTsvKey[tsvKey];
    if (!deCh) throw new Error('no TSV data for ' + tsvKey + ' (' + id + ')');
  }
  // English chapters
  const drRaw = dr[drKey];
  if (!drRaw) throw new Error('no DR data for ' + drKey + ' (' + id + ')');
  const enCh = {};
  for (const c of Object.keys(drRaw)) {
    enCh[c] = {};
    for (const v of Object.keys(drRaw[c])) enCh[c][v] = cleanEn(drRaw[c][v]);
  }

  const deChapters = Math.max(...Object.keys(deCh).map(Number));
  const enChapters = Math.max(...Object.keys(enCh).map(Number));
  const countVerses = (o) => Object.values(o).reduce((s, ch) => s + Object.keys(ch).length, 0);
  totalDe += countVerses(deCh);
  totalEn += countVerses(enCh);
  lookupDe[id] = deCh; lookupEn[id] = enCh;

  writeFileSync(here(`../data/de/${id}.json`), JSON.stringify({ id, lang: 'de', name: deName, abbr: deAbbr, chapters: deCh }));
  writeFileSync(here(`../data/en/${id}.json`), JSON.stringify({ id, lang: 'en', name: enName, abbr: deAbbr, chapters: enCh }));

  manifest.books.push({
    id, order: i + 1, testament,
    de: { name: deName, abbr: deAbbr, chapters: deChapters },
    en: { name: enName, abbr: deAbbr, chapters: enChapters },
  });
});

writeFileSync(here('../data/manifest.json'), JSON.stringify(manifest, null, 0));

// --- Curated, time-fitting bilingual verses (resolved from bundled text) ---
// time: morning | midday | evening | night | any ; theme used by AI/notification variety
const CURATED = [
  ['psalmen','62','2','morning','trust'],       // Vulgate Ps 62 = morning psalm
  ['klagelieder','3','22','morning','mercy'],
  ['klagelieder','3','23','morning','mercy'],
  ['psalmen','5','4','morning','prayer'],
  ['psalmen','89','14','morning','joy'],
  ['markus','1','35','morning','prayer'],
  ['psalmen','29','6','morning','hope'],
  ['jesaja','40','31','morning','strength'],
  ['klagelieder','3','25','morning','hope'],
  ['matthaeus','6','33','midday','trust'],
  ['matthaeus','11','28','midday','rest'],
  ['philipper','4','13','midday','strength'],
  ['josua','1','9','midday','courage'],
  ['sprichwoerter','3','5','midday','trust'],
  ['jesaja','41','10','midday','courage'],
  ['psalmen','45','2','midday','refuge'],
  ['2korinther','12','9','midday','grace'],
  ['psalmen','22','1','evening','peace'],     // Vulgate Ps 22 = The Lord is my shepherd
  ['psalmen','22','2','evening','peace'],
  ['johannes','14','27','evening','peace'],
  ['matthaeus','11','29','evening','rest'],
  ['philipper','4','6','evening','peace'],
  ['philipper','4','7','evening','peace'],
  ['1petrus','5','7','evening','trust'],
  ['psalmen','4','9','night','rest'],          // In peace I will sleep
  ['psalmen','3','6','night','rest'],
  ['psalmen','120','4','night','protection'],  // Vulgate Ps 120 = He that keepeth Israel
  ['matthaeus','6','34','night','trust'],
  ['psalmen','90','5','night','protection'],
  ['johannes','3','16','any','love'],
  ['1korinther','13','4','any','love'],
  ['1korinther','13','13','any','love'],
  ['johannes','8','12','any','light'],
  ['psalmen','26','1','any','light'],          // Vulgate Ps 26 = The Lord is my light
  ['roemer','8','28','any','hope'],
  ['roemer','8','38','any','hope'],
  ['hebraeer','11','1','any','faith'],
  ['matthaeus','5','3','any','blessing'],
  ['matthaeus','5','4','any','comfort'],
  ['johannes','15','5','any','abiding'],
  ['psalmen','18','2','any','wonder'],         // The heavens show forth the glory of God
];

const verses = [];
for (const [book, c, v, time, theme] of CURATED) {
  const de = lookupDe[book]?.[c]?.[v];
  const en = lookupEn[book]?.[c]?.[v];
  if (!de || !en) { console.warn('!! curated verse missing text:', book, c, v, '(de:', !!de, 'en:', !!en, ')'); continue; }
  const meta = manifest.books.find((x) => x.id === book);
  verses.push({
    book, c: +c, v: +v, time, theme,
    ref: { de: `${meta.de.name} ${c},${v}`, en: `${meta.en.name} ${c}:${v}` },
    text: { de, en },
  });
}
writeFileSync(here('../data/verses.json'), JSON.stringify({ version: 1, verses }, null, 0));

console.log(`Books: ${manifest.books.length}`);
console.log(`German verses: ${totalDe}`);
console.log(`English verses: ${totalEn}`);
console.log(`Curated time-fitting verses: ${verses.length}/${CURATED.length}`);
