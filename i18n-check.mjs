// Usage: node scripts/i18n-check.mjs <fragment.js | all> <file1> [file2 ...]
// Lists every t('…') / t("…") / tp(…) key used in the files that has no Arabic or French entry.
// With "all", checks against every fragment merged in src/i18n/index.js (plus bank labels).
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const [frag, ...files] = process.argv.slice(2);
if (!frag || !files.length) { console.error('usage: node scripts/i18n-check.mjs <fragment.js|all> <files...>'); process.exit(2); }

let dict;
if (frag === 'all') dict = (await import(pathToFileURL(resolve('src/i18n/index.js')).href)).default;
else dict = (await import(pathToFileURL(resolve(frag)).href)).default;

const re = /\bt\(\s*(['"])((?:\\.|(?!\1).)*)\1/g;
const reTp = /\btp\(\s*[^,]+,\s*(['"])((?:\\.|(?!\1).)*)\1\s*,\s*(['"])((?:\\.|(?!\3).)*)\3/g;
const unescape = (s, q) => s.replace(new RegExp(`\\\\${q}`, 'g'), q).replace(/\\\\/g, '\\').replace(/\\n/g, '\n');
let missing = 0; const seen = new Set();
for (const f of files) {
  const src = readFileSync(f, 'utf8');
  const keys = [];
  for (const m of src.matchAll(re)) keys.push(unescape(m[2], m[1]));
  for (const m of src.matchAll(reTp)) { keys.push(unescape(m[2], m[1])); keys.push(unescape(m[4], m[3])); }
  for (const k of keys) {
    if (seen.has(k)) continue; seen.add(k);
    const noAr = dict.ar?.[k] === undefined; const noFr = dict.fr?.[k] === undefined;
    if (noAr || noFr) { missing++; console.log(`${f}: missing ${noAr ? 'ar ' : ''}${noFr ? 'fr ' : ''}→ ${JSON.stringify(k)}`); }
  }
  // placeholder sanity
  for (const k of keys) for (const l of ['ar', 'fr']) {
    const v = dict[l]?.[k]; if (v === undefined) continue;
    const want = [...k.matchAll(/\{(\w+)\}/g)].map((x) => x[1]).sort().join(',');
    const got = [...String(v).matchAll(/\{(\w+)\}/g)].map((x) => x[1]).sort().join(',');
    if (want !== got) { missing++; console.log(`${f}: placeholder mismatch [${l}] ${JSON.stringify(k)} → ${JSON.stringify(v)}`); }
  }
}
console.log(missing ? `\n${missing} problem(s), ${seen.size} keys checked` : `OK — ${seen.size} keys, all translated`);
process.exit(missing ? 1 : 0);
