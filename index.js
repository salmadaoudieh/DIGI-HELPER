// Merges every dictionary fragment. Each fragment exports { ar: {english: arabic}, fr: {english: french} }.
// Later fragments win on duplicate keys; core.js goes last so shared terms stay consistent.
import publicStrings from './public.js';
import student from './student.js';
import shell from './shell.js';
import teacher from './teacher.js';
import learning from './learning.js';
import pluralAr from './plural-ar.js';
import core from './core.js';

const FRAGMENTS = [publicStrings, student, shell, teacher, learning, pluralAr, core];

const DICTS = { ar: {}, fr: {} };
for (const f of FRAGMENTS) {
  for (const lang of Object.keys(DICTS)) Object.assign(DICTS[lang], f?.[lang] || {});
}
export default DICTS;
