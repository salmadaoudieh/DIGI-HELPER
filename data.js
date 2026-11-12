// Curriculum + demo data. Learner-facing text is trilingual ({ en, ar, fr }) or an English
// string translated with t(); getters make `concept.name` etc. follow the current language.
import { L, t, addStrings } from './i18n.js';
import science from './banks/science.js';
import language from './banks/language.js';
import social from './banks/social.js';
import tech from './banks/tech.js';

export const BANKS = { science, language, social, tech };

/** Replace plain fields with getters that resolve in the current language. */
function localize(o, fields) {
  for (const f of fields) {
    const raw = o[f];
    if (raw === undefined) continue;
    Object.defineProperty(o, f, { get: () => L(raw), enumerable: true, configurable: true });
  }
  return o;
}

// ---------------- Subjects ----------------
export const SUBJECT_LIST = [
  { id: 'math', icon: '🧮', hue: '#6366f1', name: { en: 'Math', ar: 'الرياضيات', fr: 'Maths' },
    layers: [{ en: 'Foundations', ar: 'الأساسيات', fr: 'Bases' }, { en: 'Core skills', ar: 'مهارات أساسية', fr: 'Compétences clés' }, { en: 'Multi-step', ar: 'متعدد الخطوات', fr: 'Plusieurs étapes' }, { en: 'Applications', ar: 'تطبيقات', fr: 'Applications' }, { en: 'Advanced', ar: 'متقدم', fr: 'Avancé' }],
    layerX: [110, 330, 545, 752, 925] },
  { id: 'science', icon: '🔬', hue: '#06b6d4', name: { en: 'Science', ar: 'العلوم', fr: 'Sciences' }, layers: science.layers, layerX: [140, 520, 900] },
  { id: 'language', icon: '📚', hue: '#a855f7', name: { en: 'Language', ar: 'اللغة الإنجليزية', fr: 'Anglais' }, layers: language.layers, layerX: [140, 520, 900] },
  { id: 'social', icon: '🌍', hue: '#22c55e', name: { en: 'Social Studies', ar: 'الدراسات الاجتماعية', fr: 'Histoire-Géo' }, layers: social.layers, layerX: [140, 520, 900] },
  { id: 'tech', icon: '💻', hue: '#f59e0b', name: { en: 'Technology', ar: 'التكنولوجيا', fr: 'Technologie' }, layers: tech.layers, layerX: [140, 520, 900] },
].map((s) => { const layers = s.layers; Object.defineProperty(s, 'layerNames', { get: () => layers.map((x) => L(x)) }); return localize(s, ['name']); });
export const SUBJECT = Object.fromEntries(SUBJECT_LIST.map((s) => [s.id, s]));

// ---------------- Concepts ----------------
const MATH = [
  { id: 'order', hue: '#38bdf8', x: 110, y: 140, layer: 0,
    name: { en: 'Order of Operations', ar: 'ترتيب العمليات', fr: 'Priorités opératoires' }, short: { en: 'Order of Ops', ar: 'ترتيب العمليات', fr: 'Priorités' },
    desc: { en: 'Which operation to do first: brackets, powers, × and ÷, then + and −.', ar: 'أيّ عملية نبدأ بها: الأقواس، ثم القوى، ثم × و ÷، ثم + و −.', fr: 'Quelle opération faire d’abord : parenthèses, puissances, × et ÷, puis + et −.' } },
  { id: 'neg', hue: '#f43f5e', x: 110, y: 330, layer: 0,
    name: { en: 'Negative Numbers', ar: 'الأعداد السالبة', fr: 'Nombres négatifs' }, short: { en: 'Negatives', ar: 'السالبة', fr: 'Négatifs' },
    desc: { en: 'Adding, subtracting, multiplying and dividing numbers below zero.', ar: 'جمع وطرح وضرب وقسمة الأعداد الأصغر من الصفر.', fr: 'Additionner, soustraire, multiplier et diviser des nombres sous zéro.' } },
  { id: 'frac', hue: '#f59e0b', x: 110, y: 510, layer: 0,
    name: { en: 'Fractions', ar: 'الكسور', fr: 'Fractions' }, short: { en: 'Fractions', ar: 'الكسور', fr: 'Fractions' },
    desc: { en: 'Equivalent fractions, common denominators and fraction arithmetic.', ar: 'الكسور المتكافئة والمقامات المشتركة والعمليات على الكسور.', fr: 'Fractions égales, dénominateurs communs et calculs sur les fractions.' } },
  { id: 'vars', hue: '#22c55e', x: 330, y: 160, layer: 1,
    name: { en: 'Variables & Expressions', ar: 'المتغيرات والمقادير', fr: 'Variables et expressions' }, short: { en: 'Expressions', ar: 'المقادير', fr: 'Expressions' },
    desc: { en: 'Using letters for unknown numbers and evaluating expressions.', ar: 'استخدام الرموز للأعداد المجهولة وإيجاد قيمة المقادير.', fr: 'Utiliser des lettres pour des nombres inconnus et calculer des expressions.' } },
  { id: 'onestep', hue: '#14b8a6', x: 330, y: 380, layer: 1,
    name: { en: 'One-Step Equations', ar: 'معادلات الخطوة الواحدة', fr: 'Équations à une étape' }, short: { en: 'One-Step Eq.', ar: 'خطوة واحدة', fr: 'Une étape' },
    desc: { en: 'Undoing a single operation to find x.', ar: 'عكس عملية واحدة لإيجاد قيمة x.', fr: 'Annuler une seule opération pour trouver x.' } },
  { id: 'linear', hue: '#6366f1', x: 545, y: 330, layer: 2,
    name: { en: 'Linear Equations', ar: 'المعادلات الخطية', fr: 'Équations linéaires' }, short: { en: 'Linear Eq.', ar: 'معادلات خطية', fr: 'Éq. linéaires' },
    desc: { en: 'Multi-step equations like 3x + 5 = 20, including negatives.', ar: 'معادلات متعددة الخطوات مثل 3x + 5 = 20، بما فيها الأعداد السالبة.', fr: 'Équations à plusieurs étapes comme 3x + 5 = 20, avec des négatifs.' } },
  { id: 'distrib', hue: '#a855f7', x: 745, y: 150, layer: 3,
    name: { en: 'Distributive Property', ar: 'خاصية التوزيع', fr: 'Distributivité' }, short: { en: 'Distributive', ar: 'التوزيع', fr: 'Distributivité' },
    desc: { en: 'Multiplying a number across brackets: a(b + c) = ab + ac.', ar: 'ضرب عدد في ما داخل القوسين: a(b + c) = ab + ac.', fr: 'Multiplier un nombre par une parenthèse : a(b + c) = ab + ac.' } },
  { id: 'ineq', hue: '#ec4899', x: 760, y: 330, layer: 3,
    name: { en: 'Inequalities', ar: 'المتباينات', fr: 'Inéquations' }, short: { en: 'Inequalities', ar: 'المتباينات', fr: 'Inéquations' },
    desc: { en: 'Solving with <, >, ≤, ≥ — and flipping the sign when dividing by a negative.', ar: 'الحل مع <، >، ≤، ≥ — وعكس الإشارة عند القسمة على عدد سالب.', fr: 'Résoudre avec <, >, ≤, ≥ — et inverser le signe en divisant par un négatif.' } },
  { id: 'graph', hue: '#06b6d4', x: 745, y: 510, layer: 3,
    name: { en: 'Graphing Lines', ar: 'تمثيل المستقيمات', fr: 'Représenter des droites' }, short: { en: 'Graphing', ar: 'التمثيل البياني', fr: 'Graphiques' },
    desc: { en: 'Slope, intercepts and drawing y = mx + c.', ar: 'الميل والمقطع ورسم y = mx + c.', fr: 'Pente, ordonnée à l’origine et tracé de y = mx + c.' } },
  { id: 'functions', hue: '#eab308', x: 925, y: 330, layer: 4,
    name: { en: 'Functions', ar: 'الاقترانات', fr: 'Fonctions' }, short: { en: 'Functions', ar: 'الاقترانات', fr: 'Fonctions' },
    desc: { en: 'Inputs, outputs and function notation f(x).', ar: 'المدخلات والمخرجات ورمز الاقتران f(x).', fr: 'Entrées, sorties et notation f(x).' } },
].map((c) => ({ ...c, subject: 'math' }));

const BANK_CONCEPTS = Object.values(BANKS).flatMap((b) => b.concepts.map((c) => ({ ...c, subject: b.subject })));

export const CONCEPTS = [...MATH, ...BANK_CONCEPTS].map((c) => localize(c, ['name', 'short', 'desc']));
export const CONCEPT = Object.fromEntries(CONCEPTS.map((c) => [c.id, c]));
export const conceptsOf = (subject) => CONCEPTS.filter((c) => c.subject === subject);

export const EDGES = [
  ['order', 'vars'], ['vars', 'onestep'], ['neg', 'onestep'], ['neg', 'linear'], ['onestep', 'linear'],
  ['frac', 'linear'], ['linear', 'distrib'], ['linear', 'ineq'], ['linear', 'graph'], ['graph', 'functions'], ['distrib', 'functions'],
  ...Object.values(BANKS).flatMap((b) => b.edges),
];

// Concepts that make up the headline "Algebra mastery" figure
export const ALGEBRA_GROUP = ['neg', 'frac', 'vars', 'onestep', 'linear', 'distrib', 'ineq'];

// Misconception labels from the banks become translatable keys (stored in English, shown translated).
export const BANK_STRINGS = { ar: {}, fr: {} };
for (const b of Object.values(BANKS)) for (const q of b.questions) for (const mm of q.misconceptions || []) {
  BANK_STRINGS.ar[mm.label.en] = mm.label.ar; BANK_STRINGS.fr[mm.label.en] = mm.label.fr;
}
addStrings(BANK_STRINGS);

export const STATUS = {
  mastered: localize({ label: 'Mastered', icon: '✓', cls: 'pill-good', color: 'var(--good)' }, ['label']),
  developing: localize({ label: 'Developing', icon: '◐', cls: 'pill-warn', color: 'var(--warn)' }, ['label']),
  attention: localize({ label: 'Needs attention', icon: '!', cls: 'pill-bad', color: 'var(--bad)' }, ['label']),
  new: localize({ label: 'Not assessed', icon: '○', cls: 'pill-muted', color: 'var(--faint)' }, ['label']),
};

export function statusOf(v) {
  if (v === null || v === undefined) return 'new';
  if (v >= 75) return 'mastered';
  if (v >= 50) return 'developing';
  return 'attention';
}

export const MODES = {
  visual: localize({ id: 'visual', icon: '👀', name: 'Visual', desc: 'Animations, diagrams and visual explanations.' }, ['name', 'desc']),
  interactive: localize({ id: 'interactive', icon: '🎮', name: 'Interactive', desc: 'Mini-games and simulations.' }, ['name', 'desc']),
  practice: localize({ id: 'practice', icon: '🧩', name: 'Practice', desc: 'Adaptive questions that adjust to you.' }, ['name', 'desc']),
  explain: localize({ id: 'explain', icon: '🗣️', name: 'Explain', desc: 'A conversation with Digi Helper.' }, ['name', 'desc']),
};

// ---------------- DigiWorld: every district is backed by real concepts ----------------
const Z = (o) => localize(o, ['name', 'blurb']);
const D = (o) => { localize(o, ['name']); if (o.unlock) localize(o.unlock, ['text']); return o; };
export const ZONES = [
  Z({ id: 'math', subject: 'math', icon: '🧮', hue: '#6366f1',
    name: { en: 'Math City', ar: 'مدينة الرياضيات', fr: 'Cité des Maths' },
    blurb: { en: 'A skyline that lights up as your algebra grows.', ar: 'أفق مدينة يضيء كلما نمت مهاراتك في الجبر.', fr: 'Une ville qui s’illumine à mesure que ton algèbre progresse.' },
    districts: [
      D({ id: 'number-plaza', name: { en: 'Number Plaza', ar: 'ساحة الأعداد', fr: 'Place des Nombres' }, concepts: ['order', 'neg', 'frac'] }),
      D({ id: 'expression-park', name: { en: 'Expression Park', ar: 'حديقة المقادير', fr: 'Parc des Expressions' }, concepts: ['vars', 'distrib'] }),
      D({ id: 'equation-avenue', name: { en: 'Equation Avenue', ar: 'شارع المعادلات', fr: 'Avenue des Équations' }, concepts: ['onestep', 'linear'] }),
      D({ id: 'inequality-bridge', name: { en: 'Inequality Bridge', ar: 'جسر المتباينات', fr: 'Pont des Inéquations' }, concepts: ['ineq'] }),
      D({ id: 'graph-heights', name: { en: 'Graph Heights', ar: 'مرتفعات الرسوم', fr: 'Hauteurs des Graphiques' }, concepts: ['graph'], unlock: { concept: 'linear', min: 75, text: { en: 'Master Linear Equations to unlock.', ar: 'أتقن المعادلات الخطية لفتحها.', fr: 'Maîtrise les équations linéaires pour débloquer.' } } }),
      D({ id: 'functions-tower', name: { en: 'Functions Tower', ar: 'برج الاقترانات', fr: 'Tour des Fonctions' }, concepts: ['functions'], unlock: { concept: 'graph', min: 75, text: { en: 'Master Graphing Lines to unlock.', ar: 'أتقن تمثيل المستقيمات لفتحه.', fr: 'Maîtrise les droites pour débloquer.' } } }),
    ] }),
  Z({ id: 'science', subject: 'science', icon: '🔬', hue: '#06b6d4',
    name: { en: 'Science Lab', ar: 'مختبر العلوم', fr: 'Labo des Sciences' },
    blurb: { en: 'Experiments, forces and the particle bench.', ar: 'تجارب وقوى وطاولة الجسيمات.', fr: 'Expériences, forces et paillasse des particules.' },
    districts: [
      D({ id: 'physics-basics', name: { en: 'Physics Basics', ar: 'أساسيات الفيزياء', fr: 'Bases de physique' }, concepts: ['measure', 'forces'] }),
      D({ id: 'chem-bench', name: { en: 'Chemistry Bench', ar: 'طاولة الكيمياء', fr: 'Paillasse de chimie' }, concepts: ['matter'] }),
      D({ id: 'life-lab', name: { en: 'Life Lab', ar: 'مختبر الحياة', fr: 'Labo du vivant' }, concepts: ['cells'] }),
      D({ id: 'advanced-physics', name: { en: 'Advanced Physics Lab', ar: 'مختبر الفيزياء المتقدم', fr: 'Labo de physique avancée' }, concepts: ['energy'], unlock: { concept: 'forces', min: 75, text: { en: 'Master Physics Basics to unlock.', ar: 'أتقن أساسيات الفيزياء لفتحه.', fr: 'Maîtrise les bases de physique pour débloquer.' } } }),
    ] }),
  Z({ id: 'language', subject: 'language', icon: '📚', hue: '#a855f7',
    name: { en: 'Language Library', ar: 'مكتبة اللغة', fr: 'Bibliothèque des Langues' },
    blurb: { en: 'Reading rooms for grammar, vocabulary and writing.', ar: 'قاعات للقواعد والمفردات والكتابة.', fr: 'Des salles pour la grammaire, le vocabulaire et l’écriture.' },
    districts: [
      D({ id: 'grammar-hall', name: { en: 'Grammar Hall', ar: 'قاعة القواعد', fr: 'Salle de grammaire' }, concepts: ['tenses', 'agree'] }),
      D({ id: 'reading-room', name: { en: 'Reading Room', ar: 'غرفة القراءة', fr: 'Salle de lecture' }, concepts: ['vocab', 'reading'] }),
      D({ id: 'writers-loft', name: { en: "Writer's Loft", ar: 'ركن الكاتب', fr: 'Atelier d’écriture' }, concepts: ['punct'], unlock: { concept: 'agree', min: 75, text: { en: 'Master Subject–Verb Agreement to unlock.', ar: 'أتقن توافق الفاعل والفعل لفتحه.', fr: 'Maîtrise l’accord sujet-verbe pour débloquer.' } } }),
    ] }),
  Z({ id: 'social', subject: 'social', icon: '🌍', hue: '#22c55e',
    name: { en: 'Social Studies World', ar: 'عالم الدراسات الاجتماعية', fr: 'Monde de l’Histoire-Géo' },
    blurb: { en: 'Maps, timelines and civic life.', ar: 'خرائط وخطوط زمنية وحياة مدنية.', fr: 'Cartes, frises chronologiques et vie civique.' },
    districts: [
      D({ id: 'map-room', name: { en: 'Map Room', ar: 'غرفة الخرائط', fr: 'Salle des cartes' }, concepts: ['maps', 'climate'] }),
      D({ id: 'timeline-trail', name: { en: 'Timeline Trail', ar: 'درب التاريخ', fr: 'Sentier du temps' }, concepts: ['timeline'] }),
      D({ id: 'civic-square', name: { en: 'Civic Square', ar: 'الساحة المدنية', fr: 'Place civique' }, concepts: ['civics'] }),
      D({ id: 'market-street', name: { en: 'Market Street', ar: 'شارع السوق', fr: 'Rue du marché' }, concepts: ['econ'], unlock: { concept: 'civics', min: 75, text: { en: 'Master Government & Citizenship to unlock.', ar: 'أتقن الحكومة والمواطنة لفتحه.', fr: 'Maîtrise l’éducation civique pour débloquer.' } } }),
    ] }),
  Z({ id: 'tech', subject: 'tech', icon: '💻', hue: '#f59e0b',
    name: { en: 'Technology Hub', ar: 'مركز التكنولوجيا', fr: 'Pôle Technologie' },
    blurb: { en: 'Logic gates, algorithms and code.', ar: 'بوابات منطقية وخوارزميات وبرمجة.', fr: 'Portes logiques, algorithmes et code.' },
    districts: [
      D({ id: 'logic-lab', name: { en: 'Logic Lab', ar: 'مختبر المنطق', fr: 'Labo logique' }, concepts: ['binary', 'logic'] }),
      D({ id: 'data-center', name: { en: 'Data Center', ar: 'مركز البيانات', fr: 'Centre de données' }, concepts: ['datau'] }),
      D({ id: 'cyber-shield', name: { en: 'Cyber Shield', ar: 'الدرع السيبراني', fr: 'Bouclier cyber' }, concepts: ['safety'] }),
      D({ id: 'code-garage', name: { en: 'Code Garage', ar: 'ورشة البرمجة', fr: 'Garage du code' }, concepts: ['algo'], unlock: { concept: 'logic', min: 75, text: { en: 'Master Logic Gates to unlock.', ar: 'أتقن البوابات المنطقية لفتحها.', fr: 'Maîtrise les portes logiques pour débloquer.' } } }),
    ] }),
];
export const ALL_DISTRICTS = ZONES.flatMap((z) => z.districts.map((d) => Object.assign(d, { zone: z.id })));

const A = (o) => localize(o, ['name', 'desc']);
export const ACHIEVEMENTS = [
  A({ id: 'first-discovery', icon: '🧭', xp: 100, name: { en: 'First Discovery', ar: 'الاكتشاف الأول', fr: 'Première découverte' }, desc: { en: 'Complete your first diagnostic.', ar: 'أكمل أول اختبار تشخيصي.', fr: 'Termine ton premier diagnostic.' } }),
  A({ id: 'mistake-master', icon: '🔎', xp: 250, name: { en: 'Mistake Master', ar: 'سيّد الأخطاء', fr: 'Maître des erreurs' }, desc: { en: 'Correct 10 previously repeated mistakes.', ar: 'صحّح 10 أخطاء تكررت سابقًا.', fr: 'Corrige 10 erreurs déjà répétées.' } }),
  A({ id: 'consistency', icon: '📅', xp: 200, name: { en: 'Consistency', ar: 'المثابرة', fr: 'Régularité' }, desc: { en: 'Complete learning activities for 7 days.', ar: 'أنجز أنشطة تعلّم لمدة 7 أيام.', fr: 'Fais des activités 7 jours de suite.' } }),
  A({ id: 'breakthrough', icon: '🚀', xp: 300, name: { en: 'Breakthrough', ar: 'إنجاز كبير', fr: 'Grande percée' }, desc: { en: 'Improve a skill by 20 percentage points.', ar: 'حسّن مهارة بمقدار 20 نقطة مئوية.', fr: 'Améliore une compétence de 20 points.' } }),
  A({ id: 'challenger', icon: '⚡', xp: 80, name: { en: 'Challenger', ar: 'المتحدّي', fr: 'Challenger' }, desc: { en: 'Finish your first Daily Digi Challenge.', ar: 'أنهِ أول تحدٍّ يومي.', fr: 'Termine ton premier défi du jour.' } }),
  A({ id: 'scanner', icon: '📸', xp: 60, name: { en: 'Scanner', ar: 'الماسح', fr: 'Scanneur' }, desc: { en: 'Check handwritten work with DigiScan.', ar: 'افحص عملًا مكتوبًا بخط اليد باستخدام DigiScan.', fr: 'Vérifie un travail manuscrit avec DigiScan.' } }),
  A({ id: 'self-aware', icon: '🎯', xp: 120, name: { en: 'Self-Aware', ar: 'واعٍ بذاته', fr: 'Lucide' }, desc: { en: 'Make 5 confidence ratings that match your result.', ar: 'قدّر ثقتك 5 مرات بما يطابق نتيجتك.', fr: 'Fais 5 estimations de confiance justes.' } }),
  A({ id: 'unlocker', icon: '🔓', xp: 150, name: { en: 'Unlocker', ar: 'فاتح الأبواب', fr: 'Explorateur' }, desc: { en: 'Unlock a new DigiWorld area.', ar: 'افتح منطقة جديدة في DigiWorld.', fr: 'Débloque une nouvelle zone de DigiWorld.' } }),
  A({ id: 'all-rounder', icon: '🌈', xp: 200, name: { en: 'All-Rounder', ar: 'متعدد المواهب', fr: 'Touche-à-tout' }, desc: { en: 'Take a diagnostic in every subject.', ar: 'قدّم اختبارًا تشخيصيًا في كل مادة.', fr: 'Fais un diagnostic dans chaque matière.' } }),
];

export const AVATARS = ['🦊', '🐼', '🦉', '🐙', '🚀', '🪐', '🤖', '🐳', '🦄', '🌵', '⚡', '🎧'];
export const GRADES = ['Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'];
export const SUBJECTS = ['Math', 'Science', 'Language', 'Social Studies', 'Technology'];

// ---------- Demo student presets ----------
const bankDemo = (k) => Object.assign({}, ...Object.values(BANKS).map((b) => b.demo?.[k] || {}));
export const PRESET_BEFORE = { order: 58, neg: 24, frac: 45, vars: 55, onestep: 52, linear: 31, distrib: 28, ineq: 30, graph: 20, functions: 15, ...bankDemo('before') };
export const PRESET_AFTER = { order: 86, neg: 84, frac: 75, vars: 86, onestep: 90, linear: 84, distrib: 76, ineq: 72, graph: 64, functions: 58, ...bankDemo('after') };
export const PRESET_CONFIDENCE = { order: 72, neg: 80, frac: 55, vars: 66, onestep: 70, linear: 88, distrib: 60, ineq: 74, graph: 40, functions: 35, ...bankDemo('confidence') };
export const PRESET_CONFIDENCE_AFTER = { order: 84, neg: 82, frac: 70, vars: 82, onestep: 88, linear: 86, distrib: 72, ineq: 70, graph: 55, functions: 48,
  ...Object.fromEntries(Object.entries(bankDemo('after')).map(([k, v]) => [k, Math.min(95, v + 4)])) };

// Mistake labels are English keys, translated when shown.
export const DEMO_MISTAKES = {
  neg: { 'double-neg': { label: 'Subtracting a negative', count: 4 }, 'neg-times-neg': { label: 'Negative × negative', count: 3 }, 'sign-flip': { label: 'Answer sign flipped', count: 2 } },
  linear: { 'neg-move': { label: 'Moving a negative term', count: 3 }, 'divide-wrong': { label: 'Dividing by the wrong number', count: 2 } },
  distrib: { 'partial-distribute': { label: 'Only multiplied the first term', count: 3 } },
  ineq: { 'flip-sign': { label: 'Forgot to flip the inequality', count: 2 } },
  frac: { 'add-denominators': { label: 'Added the denominators', count: 2 } },
  onestep: { 'neg-move': { label: 'Moving a negative term', count: 1 } },
};

// Seven-day learning journey for the demo student (Algebra composite, labelled as demo data)
export const DEMO_JOURNEY = [
  { day: 'Day 1', v: 38, event: 'Diagnostic test' },
  { day: 'Day 2', v: 44, event: 'Mistake Detective + DigiMind' },
  { day: 'Day 3', v: 53, event: 'Visual lesson: number line' },
  { day: 'Day 4', v: 61, event: 'Balance game + practice' },
  { day: 'Day 5', v: 68, event: 'Daily Digi Challenge' },
  { day: 'Day 6', v: 75, event: 'Adaptive practice' },
  { day: 'Day 7', v: 81, event: 'Reassessment' },
];

// ---------- Teacher demo data (English keys, translated when shown) ----------
export const CLASSES = {
  '10A': {
    name: 'Class 10A', students: 28, subject: 'Mathematics',
    topics: [
      { id: 'algebra', name: 'Algebra', mastery: 87, confidence: 84, prev: 79 },
      { id: 'geometry', name: 'Geometry', mastery: 72, confidence: 76, prev: 68 },
      { id: 'functions', name: 'Functions', mastery: 54, confidence: 69, prev: 47 },
      { id: 'negatives', name: 'Negative Numbers', mastery: 41, confidence: 78, prev: 33 },
    ],
    weekly: [52, 55, 57, 61, 63, 66, 69, 72],
    pulse: { topic: 'Linear equations with negatives', confident: 78, mastery: 46, responses: 27, dist: [1, 2, 3, 9, 12] },
    mistakes: [
      { label: 'Subtracting a negative (−7 − (−3))', topic: 'Negative Numbers', share: 61, fix: '5-minute number-line warm-up' },
      { label: 'Keeping the sign when moving a term across =', topic: 'Linear Equations', share: 44, fix: 'Balance-scale demonstration' },
      { label: 'Forgetting to flip < when dividing by a negative', topic: 'Inequalities', share: 38, fix: 'Test-a-value check routine' },
      { label: 'Multiplying only the first term in a(b + c)', topic: 'Distributive Property', share: 29, fix: 'Area-model visual' },
    ],
  },
  '10B': {
    name: 'Class 10B', students: 26, subject: 'Mathematics',
    topics: [
      { id: 'algebra', name: 'Algebra', mastery: 74, confidence: 70, prev: 70 },
      { id: 'geometry', name: 'Geometry', mastery: 81, confidence: 77, prev: 75 },
      { id: 'functions', name: 'Functions', mastery: 63, confidence: 58, prev: 55 },
      { id: 'negatives', name: 'Negative Numbers', mastery: 58, confidence: 71, prev: 50 },
    ],
    weekly: [58, 59, 62, 62, 65, 67, 68, 70],
    pulse: { topic: 'Functions notation', confident: 58, mastery: 63, responses: 24, dist: [2, 5, 7, 7, 3] },
    mistakes: [
      { label: 'Reading f(3) as f × 3', topic: 'Functions', share: 41, fix: 'Input–output machine activity' },
      { label: 'Subtracting a negative', topic: 'Negative Numbers', share: 35, fix: 'Number-line warm-up' },
    ],
  },
  '9C': {
    name: 'Class 9C', students: 30, subject: 'Mathematics',
    topics: [
      { id: 'algebra', name: 'Algebra', mastery: 61, confidence: 66, prev: 52 },
      { id: 'geometry', name: 'Geometry', mastery: 69, confidence: 64, prev: 66 },
      { id: 'functions', name: 'Functions', mastery: 38, confidence: 49, prev: 31 },
      { id: 'negatives', name: 'Negative Numbers', mastery: 55, confidence: 73, prev: 44 },
    ],
    weekly: [44, 47, 49, 51, 52, 55, 58, 60],
    pulse: { topic: 'Two-step equations', confident: 73, mastery: 52, responses: 29, dist: [2, 3, 6, 10, 8] },
    mistakes: [
      { label: 'Dividing before subtracting', topic: 'Linear Equations', share: 47, fix: 'Undo in reverse order routine' },
      { label: 'Adding denominators', topic: 'Fractions', share: 40, fix: 'Fraction bars visual' },
    ],
  },
};

const FIRST = ['Lina', 'Omar', 'Sara', 'Yousef', 'Maya', 'Adam', 'Noor', 'Karim', 'Hana', 'Zaid', 'Rania', 'Ali', 'Dana', 'Sami', 'Leen', 'Faris', 'Jana', 'Tariq', 'Mira', 'Basel', 'Tala', 'Hadi', 'Yara', 'Ziad', 'Reem', 'Nadim', 'Salma'];
export function classRoster(classId) {
  let seed = classId.charCodeAt(0) * 31 + classId.charCodeAt(1);
  const rnd = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
  const n = CLASSES[classId].students - 1;
  return FIRST.slice(0, n).map((name, i) => {
    const before = Math.round(30 + rnd() * 55);
    const gain = Math.round(rnd() * 22 - 3);
    const conf = Math.min(98, Math.max(20, before + Math.round(rnd() * 40 - 10)));
    return { id: `${classId}-${i}`, name: `${name} ${String.fromCharCode(65 + Math.floor(rnd() * 26))}.`, before, now: Math.min(98, before + gain), conf };
  });
}

export const DEMO_NOTE = 'Demo data — simulated to illustrate how Digi Helper works. Not results from a real study.';
export const demoNote = () => t(DEMO_NOTE);
