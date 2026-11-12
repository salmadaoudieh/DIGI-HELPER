// Tiny i18n layer. English source strings are the keys; Arabic and French dictionaries
// live in src/i18n/*.js. Content authored in all three languages uses L({ en, ar, fr }).
import DICTS from '../i18n/index.js';

export const LANGS = [
  { id: 'en', name: 'English', native: 'English', dir: 'ltr', flag: 'EN' },
  { id: 'ar', name: 'Arabic', native: 'العربية', dir: 'rtl', flag: 'ع' },
  { id: 'fr', name: 'French', native: 'Français', dir: 'ltr', flag: 'FR' },
];

let current = 'en';
const missing = new Set();

export function setLang(l) { current = LANGS.some((x) => x.id === l) ? l : 'en'; }
export function getLang() { return current; }
export function isRTL() { return current === 'ar'; }

function fill(str, vars) {
  return vars ? str.replace(/\{(\w+)\}/g, (m, k) => (vars[k] !== undefined && vars[k] !== null ? String(vars[k]) : m)) : str;
}

/** Translate an English UI string. `vars` fill {placeholders}. */
export function t(s, vars) {
  if (current === 'en' || typeof s !== 'string') return fill(s, vars);
  // Arabic counts above 10 take the singular accusative ("15 سؤالًا"); dictionaries may give a "#11+" variant.
  const n = vars && typeof vars.n === 'number' ? vars.n : null;
  const variant = current === 'ar' && n !== null && n % 100 >= 11 ? DICTS.ar[`${s}#11+`] : undefined;
  const tr = variant ?? DICTS[current]?.[s];
  if (tr === undefined && typeof window !== 'undefined' && window.__DH_I18N_DEBUG) missing.add(s);
  const out = fill(tr ?? s, vars);
  // In Arabic text, reading flows right-to-left, so arrows point the other way.
  return current === 'ar' ? out.replace(/[→←]/g, (a) => (a === '→' ? '←' : '→')) : out;
}

/** Pick the current language from a trilingual object { en, ar, fr }; plain strings pass through t(). */
export function L(v, vars) {
  if (v === null || v === undefined) return '';
  if (typeof v === 'string') return t(v, vars);
  return fill(v[current] ?? v.en ?? '', vars);
}

/** Plural helper: tp(n, 'question', 'questions') — Arabic/French handled by dictionaries for each form. */
export function tp(n, one, many, vars = {}) { return t(n === 1 ? one : many, { n, ...vars }); }

/** Register extra translations at runtime (used by subject banks). */
export function addStrings(dict) { for (const l of Object.keys(dict)) DICTS[l] = Object.assign(DICTS[l] || {}, dict[l]); }

export function missingKeys() { return [...missing]; }
if (typeof window !== 'undefined') window.__dhMissing = missingKeys;

/** Format a date-ish label: keeps "Day 3" style labels translatable. */
export function dayLabel(d) {
  if (typeof d !== 'string') return d;
  const m = d.match(/^Day (\d+)$/);
  return m ? t('Day {n}', { n: m[1] }) : d;
}
