// Digi Helper tutor. Uses the server's AI model when available; otherwise a built-in
// Socratic tutor that teaches step by step instead of handing out answers.
// The offline tutor understands English, Arabic and French requests and replies in the current language.
import { api, server } from './api.js';
import { parseEquation, solveForm, fmt } from '../../../shared/linear.js';
import { CONCEPT, CONCEPTS } from './data.js';
import { weakest, confidenceGap } from './engine.js';
import { questionFor, checkAnswer } from './questions.js';
import { t, L, getLang } from './i18n.js';

// ---------------- Text normalisation (Arabic letters/digits, quotes, the Arabic variable س) ----------------
const AR_DIGITS = /[٠-٩۰-۹]/g;
/** Arabic letter folding only (safe to apply to regex sources). */
function normAr(s) {
  return String(s)
    .replace(/[ً-ٰٟـ]/g, '') // tashkeel + tatweel
    .replace(/[أإآٱ]/g, 'ا').replace(/ى/g, 'ي').replace(/ة/g, 'ه');
}
/** Western digits and x for the Arabic school variable س (keeps letter case). */
function mathText(s) {
  return String(s || '')
    .replace(AR_DIGITS, (d) => String(d.charCodeAt(0) & 0xF))
    .replace(/٫/g, '.')
    .replace(/(^|[^؀-ۿ])س(?=$|[^؀-ۿ])/g, '$1x');
}
/** Full normalisation used for intent detection. */
function normalize(s) {
  return normAr(mathText(s).toLowerCase()).replace(/[’‘`]/g, "'").replace(/؟/g, '?').replace(/،/g, ',');
}

// ---------------- Intent keyword lists (English / Arabic / French regex sources) ----------------
// Arabic entries may be written naturally (أ, ة, ى …); they are folded with normAr before compiling.
const ANSWER_REQUEST_WORDS = {
  en: ['(just )?(tell|give) me (the )?answer', "what('?s| is) the answer", 'what is x', 'answer please'],
  ar: ['(أعطني|أعطيني|اعطني|عطيني) (فقط )?(ال)?(جواب|إجابة|حل)', '(قل|قول) لي (ال)?(جواب|إجابة|حل)', 'قلي (ال)?(جواب|إجابة|حل)',
    'ما (هو |هي )?(ال)?(جواب|إجابة)', 'شو (ال)?(جواب|حل)', 'بدي (ال)?(جواب|حل)', 'ما قيمة x', 'كم (قيمة )?x', 'x (تساوي|يساوي) كم'],
  fr: ['(donne|dis)[- ]moi (juste |simplement )?(la )?(r[ée]ponse|solution)', "c'est quoi la r[ée]ponse", 'quelle est la r[ée]ponse',
    '(combien|que) vaut x', "x (est [ée]gal|vaut) (à|a) combien", 'la r[ée]ponse (stp|svp|s.il te pla[iî]t)'],
};
const SHOW_STEPS_WORDS = {
  en: ['show (me )?(the )?steps', 'step by step'],
  ar: ['(اعرض|أرني|ارني|وريني|فرجيني|أظهر|اظهر|بيّن) (لي )?(ال)?خطوات', 'الخطوات', 'خطوة بخطوة'],
  fr: ['(montre|affiche|donne)[- ]moi les [ée]tapes', '(montre|affiche) les [ée]tapes', 'les [ée]tapes', '[ée]tape par [ée]tape'],
};
const WHY_WRONG_WORDS = {
  en: ['why', 'wrong', 'mistake'],
  ar: ['لماذا', 'ليش', 'ليه', 'لم كان', 'خطأ', 'أخطأت', 'غلط', 'غلطت'],
  fr: ['pourquoi', 'faux', 'fausse', 'erreur', 'tromp', 'mauvaise r[ée]ponse'],
};
const PRACTICE_WORDS = {
  en: ['practi[cs]e', 'quiz', 'question', 'test me', 'another'],
  ar: ['تمرين', 'تمارين', 'تدرب', 'تدريب', 'سؤال', 'أسئلة', 'اختبرني', 'اختبار', 'واحد آخر', 'واحدة أخرى', 'كمان واحد', 'كمان سؤال'],
  fr: ['exercice', 'entra[iî]ne[- ]moi', "m'entra[iî]ner", "s'entra[iî]ner", 'entra[iî]nement', 'question', 'interroge[- ]moi', 'teste[- ]moi', 'quiz', 'une autre', 'un autre', 'encore une'],
};
const HINT_WORDS = {
  en: ['hint', 'stuck', 'help me'],
  ar: ['تلميح', 'مساعدة', 'ساعدني', 'علقت', 'عالق', 'مش عارف', 'لا أعرف', 'ما بعرف'],
  fr: ['indice', 'aide', 'bloqu[ée]', 'coinc[ée]', 'je sais pas', 'je ne sais pas'],
};
const EXPLAIN_WORDS = {
  en: ['explain', 'what is', 'how do', 'understand'],
  ar: ['اشرح', 'شرح', 'وضح', 'وضّح', 'ما هو', 'ما هي', 'ما معنى', 'شو يعني', 'كيف', 'أفهم', 'فهمني'],
  fr: ['expli', "c'est quoi", "qu'est[- ]ce", 'comment', 'comprend'],
};
const RESOURCE_WORDS = {
  en: ['resource', 'video', 'where can i', 'learn more'],
  ar: ['مصادر', 'مصدر', 'مراجع', 'فيديو', 'أين أجد', 'وين بلاقي', 'أتعلم أكثر', 'المزيد'],
  fr: ['ressource', 'vid[ée]o', 'o[uù] (est-ce que )?(je )?peux', 'en savoir plus', 'apprendre plus', 'aller plus loin'],
};
const THANKS_WORDS = {
  en: ['thank', '\\bthx\\b'],
  ar: ['شكرا', 'شكراً', 'مشكور', 'يعطيك العافية', 'تسلم'],
  fr: ['merci'],
};
const GREETING_WORDS = {
  en: ['\\b(hi|hello|hey)\\b'],
  ar: ['مرحبا', 'مرحباً', 'أهلا', 'أهلاً', 'السلام عليكم', 'صباح الخير', 'مساء الخير', 'هاي'],
  fr: ['bonjour', 'salut', 'coucou', 'bonsoir'],
};
/** "Undo the + / −" moves while solving an equation. */
const ADD_SUBTRACT_WORDS = {
  en: ['subtract', 'minus', 'take away', 'add', 'plus'],
  ar: ['اطرح', 'أطرح', 'نطرح', 'طرح', 'ناقص', 'اجمع', 'نجمع', 'جمع', 'أضف', 'نضيف', 'زائد'],
  fr: ['soustra', 'retir', 'enl[eè]v', 'moins', 'ajout', 'additionn', 'plus'],
};
/** "Undo the × / ÷" moves while solving an equation. */
const MULTIPLY_DIVIDE_WORDS = {
  en: ['divid', 'multipl', 'split'],
  ar: ['اقسم', 'نقسم', 'قسمة', 'قسم', 'اضرب', 'نضرب', 'ضرب'],
  fr: ['divis', 'multipli', 'partag'],
};

const compile = (w) => new RegExp([...w.en, ...w.ar.map(normAr), ...w.fr].join('|'));
const RX = {
  answer: compile(ANSWER_REQUEST_WORDS),
  steps: compile(SHOW_STEPS_WORDS),
  why: compile(WHY_WRONG_WORDS),
  practice: compile(PRACTICE_WORDS),
  hint: compile(HINT_WORDS),
  explain: compile(EXPLAIN_WORDS),
  resources: compile(RESOURCE_WORDS),
  thanks: compile(THANKS_WORDS),
  greeting: compile(GREETING_WORDS),
  addSub: compile(ADD_SUBTRACT_WORDS),
  mulDiv: compile(MULTIPLY_DIVIDE_WORDS),
};

// ---------------- Math explanations (English keys, translated at use time) ----------------
const EXPLAIN = {
  neg: {
    keys: ['negative', 'minus', 'below zero', 'integer', 'سالب', 'الأعداد السالبة', 'تحت الصفر', 'الأعداد الصحيحة', 'négatif', 'négative', 'relatif', 'relatifs', 'sous zéro', 'nombres entiers'],
    basic: () => t('Think of a number line. Positive numbers are to the right of zero, negatives to the left. Adding moves you right; subtracting moves you left.'),
    visual: () => t('Picture a thermometer at −3°. If it warms by 5°, you climb 5 marks to +2°. If it cools by 5°, you drop to −8°. And "subtracting a negative" is like removing a cold front: the temperature goes up.'),
    check: () => t('Quick check: what is −2 − (−6)?'),
  },
  linear: {
    keys: ['equation', 'solve', 'linear', 'isolate', 'معادلة', 'معادلات', 'خطية', 'حل', 'équation', 'résoudre', 'linéaire', 'isoler'],
    basic: () => t('An equation is a balance. Whatever you do to one side, you do to the other. To find x, undo what was done to it in reverse order.'),
    visual: () => t('Imagine a scale with 3 boxes (3x) and 5 marbles on the left, 20 marbles on the right. Take 5 marbles off both sides: 3 boxes balance 15 marbles. Split into 3 equal groups: each box holds 5.'),
    check: () => t('Try this: in 4x + 2 = 18, which operation would you undo first?'),
  },
  frac: {
    keys: ['fraction', 'denominator', 'numerator', 'كسر', 'كسور', 'مقام', 'بسط', 'dénominateur', 'numérateur'],
    basic: () => t('The denominator says what size the pieces are. You can only add pieces of the same size, so find a common denominator first.'),
    visual: () => t('A half of a pizza plus a third of a pizza: cut the whole pizza into 6 slices. A half is 3 slices, a third is 2 slices, so together you have 5/6.'),
    check: () => t('What is 1/4 + 1/2?'),
  },
  distrib: {
    keys: ['distribut', 'bracket', 'parenthes', 'expand', 'توزيع', 'أقواس', 'قوس', 'قوسين', 'فك الأقواس', 'parenthèse', 'développ'],
    basic: () => t('a(b + c) means a lots of b plus a lots of c. The number outside multiplies every term inside.'),
    visual: () => t('Draw a rectangle 3 wide and (x + 2) long. Split it into a 3-by-x piece and a 3-by-2 piece: the area is 3x + 6.'),
    check: () => t('Expand 4(x − 3).'),
  },
  ineq: {
    keys: ['inequalit', 'greater than', 'less than', 'متباين', 'أكبر من', 'أصغر من', 'inéquation', 'inégalité', 'plus grand que', 'plus petit que', 'supérieur à', 'inférieur à'],
    basic: () => t('Inequalities work like equations, with one twist: when you multiply or divide both sides by a negative, flip the sign.'),
    visual: () => t('2 is bigger than 1. Multiply both by −1: −2 is now smaller than −1. The order flips, so the sign must flip too.'),
    check: () => t('Solve −3x > 9.'),
  },
  order: {
    keys: ['order of operation', 'bodmas', 'pemdas', 'bidmas', 'ترتيب العمليات', 'أولويات العمليات', 'أولوية العمليات', 'priorité', 'ordre des opérations'],
    basic: () => t('Brackets first, then powers, then × and ÷ (left to right), then + and − (left to right).'),
    visual: () => t('In 4 + 3 × 2, think of 3 × 2 as a package that gets wrapped first. Then 4 + 6 = 10.'),
    check: () => t('What is 10 − 2 × 3?'),
  },
  vars: {
    keys: ['variable', 'expression', 'substitu', 'متغير', 'مقدار', 'مقادير', 'تعويض', 'عوض', 'remplacer'],
    basic: () => t('A variable is a placeholder for a number. To evaluate an expression, replace the letter with its value and calculate.'),
    visual: () => t('Think of x as a box. If the box holds 4, then 3x − 2 means three boxes (12) minus 2 = 10.'),
    check: () => t('If y = 5, what is 2y + 1?'),
  },
  graph: {
    keys: ['slope', 'gradient', 'graph', 'line', 'ميل', 'تمثيل بياني', 'رسم بياني', 'التمثيل البياني', 'مستقيم', 'pente', 'droite', 'coefficient directeur'],
    basic: () => t('Slope tells you how steep a line is: rise ÷ run, the change in y for each step in x.'),
    visual: () => t('Walk along the line. For every 1 step right, count how many steps you climb. That number is the slope.'),
    check: () => t('What is the slope through (0, 1) and (2, 7)?'),
  },
  functions: {
    keys: ['function', 'f(x)', 'اقتران', 'دالة', 'دوال', 'fonction'],
    basic: () => t('A function is a machine: you put in an input, it follows a rule, and gives one output. f(3) means "the output when the input is 3".'),
    visual: () => t('Picture a juice machine with the rule "double it and add 1". Put in 3, out comes 7.'),
    check: () => t('If f(x) = 2x − 1, what is f(4)?'),
  },
  onestep: {
    keys: ['one step', 'one-step', 'خطوة واحدة', 'une étape', 'une seule étape'],
    basic: () => t('Undo the single operation on x: subtract to undo adding, add to undo subtracting, divide to undo multiplying.'),
    visual: () => t('x − 4 = 6 is a box with 4 taken out leaving 6. Put the 4 back: the box holds 10.'),
    check: () => t('Solve x + 7 = 3.'),
  },
};

/** Explanation texts for any concept, in the current language: math from EXPLAIN, other subjects from their bank data. */
function explainOf(id) {
  const e = EXPLAIN[id];
  if (e) return { basic: e.basic(), visual: e.visual(), check: e.check() };
  const x = CONCEPT[id]?.explain;
  return x ? { basic: L(x.basic), visual: L(x.visual), check: L(x.check) } : null;
}

const isLetter = (ch) => !!ch && /\p{L}/u.test(ch);
const AR_WORD_PREFIX = /(^|[^\p{L}])(و|ف|ب|ل|ك)?(ال|لل)?$/u;
/** Keyword match that respects word starts (Arabic prefixes و/ب/ال… allowed); short keys must be whole words. */
function hasKey(msg, key) {
  const k = normalize(key).trim(); if (!k) return false;
  for (let i = msg.indexOf(k); i !== -1; i = msg.indexOf(k, i + 1)) {
    const before = msg.slice(0, i);
    const startOk = !isLetter(before.slice(-1)) || (/[؀-ۿ]/.test(k[0]) && AR_WORD_PREFIX.test(before));
    const endOk = k.length > 3 || !isLetter(msg[i + k.length]);
    if (startOk && endOk) return true;
  }
  return false;
}

function findConcept(msg) {
  for (const [id, e] of Object.entries(EXPLAIN)) if (e.keys.some((k) => hasKey(msg, k))) return id;
  for (const c of CONCEPTS) {
    const keys = [...(c.keys || []), c.name, c.short];
    if (keys.some((k) => typeof k === 'string' && hasKey(msg, k))) return c.id;
  }
  return null;
}

function extractEquation(text) {
  const m = text.match(/[-−0-9x(][0-9x+\-−*/×÷(). ]*=[ 0-9x+\-−*/×÷().]+/i);
  if (!m) return null;
  const eqText = m[0].trim().replace(/[.\s]+$/, '');
  const f = parseEquation(eqText);
  if (!f || !f.hasX) return null;
  return { text: eqText, form: f, sol: solveForm(f) };
}

const optionText = (o) => (o && typeof o === 'object' ? `${o.id}) ${o.text}` : String(o));

/**
 * Offline Socratic tutor. `memory` carries multi-turn state (current equation, pending practice question).
 */
export function offlineTutor(message, student, memory = {}, context = {}) {
  const msg = normalize(message);
  const raw = mathText(message).trim();
  const mem = { ...memory };
  const weak = student ? weakest(student) : null;
  const pref = student?.profile?.preference;
  const wantsAnswer = RX.answer.test(msg);

  // 1. Pending practice question → check it
  if (mem.practice) {
    const q0 = mem.practice;
    const isOption = q0.type !== 'mc' || (q0.options || []).some((o) => (o?.id ?? o) === raw.toLowerCase());
    const r = isOption ? checkAnswer(q0, q0.type === 'mc' ? raw.toLowerCase() : raw) : { invalid: true };
    if (!r.invalid) {
      const q = mem.practice; mem.practice = null;
      if (r.ok) {
        return {
          reply: `${t('✅ Correct — {q} gives {a}.', { q: q.display, a: q.answerText || fmt(q.answer) })} ${q.steps.map((s) => s.text).join(t(', then '))}. ${t('Want another one?')}`,
          memory: mem, record: { skill: q.skill, ok: true },
        };
      }
      const mis = r.mis || r.generic;
      return {
        reply: `${t("🔎 Not quite — and that's okay, this is how learning works.")} ${mis?.found || ''} ${mis?.why || ''}\n\n${t('Hint: {hint}', { hint: q.hint })}\n${t('Try {q} again, or say "show steps".', { q: q.display })}`,
        memory: { ...mem, practice: q, lastPractice: q }, record: { skill: q.skill, ok: false, mis },
      };
    }
  }
  if (RX.steps.test(msg) && (mem.practice || mem.lastPractice)) {
    const q = mem.practice || mem.lastPractice; mem.practice = null;
    return { reply: `${t("Here's the path for {q}:", { q: q.display })}\n${q.steps.map((s, i) => `${i + 1}. ${s.text}${s.expr ? ` → ${s.expr}` : ''}`).join('\n')}\n\n${t('Now try a similar one? Say "practice".')}`, memory: mem };
  }

  // 2. Guided equation solving
  const isAnswer = /^\s*(x\s*=\s*)?[-−]?\d+(\.\d+)?(\/\d+)?\s*$/.test(msg);
  const eq = isAnswer ? null : extractEquation(msg); // "x = 5" is an answer, not a new equation
  if (eq && eq.sol.kind === 'one') {
    mem.eq = { ...eq, stage: 0, asks: 0 };
    return { reply: `${t("Let's solve {eq} together — I'll guide, you decide.", { eq: eq.text })}\n\n${t('First question: what is being done to x on its side? Which operation should we undo first?')}`, memory: mem };
  }
  if (mem.eq) {
    const e = mem.eq;
    if (wantsAnswer) {
      e.asks++;
      if (e.asks < 2) return { reply: t('I could just tell you, but you will remember it better if we do it together. One step at a time: what number is added to or subtracted from the x term? Undo that first.'), memory: mem };
      mem.eq = null;
      return { reply: t('Okay — here\'s the full reasoning so you can follow it: get the x terms on one side, undo addition/subtraction, then divide by the number attached to x. For {eq} that gives x = {x}. Try a similar one next time without peeking. Say "practice" when you\'re ready.', { eq: e.text, x: fmt(e.sol.x) }), memory: mem };
    }
    const num = isAnswer ? parseFloat(msg.replace(/[−]/g, '-').replace(/^\s*x\s*=\s*/, '')) : NaN;
    if (RX.addSub.test(msg)) { e.stage = 1; return { reply: t('Good thinking — undo the addition or subtraction first, on both sides. What does the equation look like after that? Then tell me the next move.'), memory: mem }; }
    if (RX.mulDiv.test(msg)) {
      const ready = e.stage >= 1; e.stage = ready ? 2 : e.stage;
      return { reply: ready ? t('Right — now divide both sides by the number attached to x. What do you get for x?') : t('Dividing is the last step. Before that, deal with the number added or subtracted. What is it?'), memory: mem };
    }
    if (!Number.isNaN(num) && Math.abs(num - e.sol.x) < 1e-6) { mem.eq = null; return { reply: t('🎉 Yes! x = {x}. Check it: put {x} back into {eq} — do both sides match?', { x: fmt(e.sol.x), eq: e.text }), memory: mem, record: { skill: 'linear', ok: true } }; }
    if (!Number.isNaN(num)) return { reply: t("Hmm, {n} doesn't balance it. Substitute it back into {eq} and see which side is bigger. Which step might have slipped?", { n: fmt(num), eq: e.text }), memory: mem };
  }

  // 3. Explain my mistake
  if (RX.why.test(msg) && student?.lastMistakes?.length) {
    const r = student.lastMistakes[0]; const mis = r.mis || r.generic;
    const topic = (CONCEPT[r.q.skill]?.short || '').toLowerCase();
    return { reply: `${t('On {q}, you answered {a}.', { q: r.q.display, a: r.raw ?? r.value })} ${mis?.found || ''}\n\n${t('Why: {why}', { why: mis?.why || '' })}\n\n${t('Want to try a similar question? Say "practice {topic}".', { topic })}`, memory: mem };
  }

  // 4. Practice request
  if (RX.practice.test(msg)) {
    const id = findConcept(msg) || context.concept || weak?.id || 'linear';
    const q = questionFor(id, 2);
    mem.practice = q;
    const lead = weak && id === weak.id ? `${t('This targets your weakest skill right now, {name}.', { name: weak.name })} ` : '';
    const opts = q.type === 'mc' ? `\n${t('Options: {list}', { list: (q.options || []).map(optionText).join(' · ') })}` : '';
    return { reply: `${lead}${q.prompt} ${q.display}${opts}\n\n${t('Type your answer. Stuck? Say "hint".')}`, memory: mem };
  }

  // 5. Hint
  if (RX.hint.test(msg)) {
    if (mem.practice) return { reply: t('Hint: {hint}', { hint: mem.practice.hint }), memory: mem };
    if (context.question) return { reply: t('Hint: {hint}', { hint: context.question.hint }), memory: mem };
    if (weak) {
      const ex = explainOf(weak.id);
      return { reply: `${t("Here's a starting point for {name}:", { name: weak.name })} ${ex?.basic || weak.desc} ${ex?.check || ''}`.trim(), memory: mem };
    }
  }

  // 6. Explain a concept, adapted to this student
  const cid = findConcept(msg) || (RX.explain.test(msg) ? context.concept : null);
  const ex = cid ? explainOf(cid) : null;
  if (ex) {
    const struggled = student && (student.mastery[cid] ?? 100) < 50;
    const gap = student ? confidenceGap(student, cid) : null;
    let intro = '';
    if (struggled) intro = `${t("You have found {name} tricky before, so let's approach it visually this time.", { name: CONCEPT[cid].name.toLowerCase() })}\n\n`;
    else if (gap !== null && gap >= 20) intro = `${t('You feel confident here, but your answers suggest one more look will help.')}\n\n`;
    const body = struggled || pref === 'visual' ? ex.visual : ex.basic;
    return { reply: `${intro}${body}\n\n${ex.check}`, memory: mem };
  }

  if (RX.resources.test(msg)) {
    return { reply: t("Good resources inside Digi Helper:\n• Learn → {topic} in Visual mode for diagrams and animations\n• The balance game in Interactive mode for equations\n• Today's Digi Challenge for quick practice\nOutside the app, ask your teacher for worked examples on this topic.", { topic: weak ? weak.name : t('your weakest skill') }), memory: mem };
  }
  if (RX.thanks.test(msg)) return { reply: t("You're welcome! Every mistake you look at closely makes the next question easier."), memory: mem };
  if (RX.greeting.test(msg)) {
    const first = student?.profile?.name?.split(' ')[0];
    const hi = first ? t("Hi {name}! I'm Digi Helper. I help you understand, not just get answers.", { name: first }) : t("Hi! I'm Digi Helper. I help you understand, not just get answers.");
    const grow = weak ? ` ${t('Right now {skill} is the skill with the most room to grow.', { skill: weak.name })}` : '';
    return { reply: `${hi}${grow} ${t('Ask me to explain a topic, give a hint, or say "practice".')}`, memory: mem };
  }

  return {
    reply: t("I'm here to help you understand, not just give answers. You can:\n• Paste an equation, like 2x − 6 = −10, and we'll solve it together\n• Ask me to explain a topic (\"explain negative numbers\")\n• Say \"practice\" for a question on your weakest skill\n• Ask \"why was I wrong?\" about your last mistake"),
    memory: mem,
  };
}

export function studentSummary(student) {
  if (!student) return null;
  const weak = weakest(student, 3) || [];
  return {
    name: student.profile.name.split(' ')[0], grade: student.profile.grade, preference: student.profile.preference,
    weakest: weak.map((c) => ({ concept: c.name, mastery: Math.round(student.mastery[c.id]) })),
    recentMistakes: (student.lastMistakes || []).slice(0, 3).map((r) => ({ question: r.q.display, answer: String(r.raw ?? r.value), pattern: (r.mis || r.generic)?.label })),
  };
}

/** Ask the tutor: AI server first, offline tutor as a fallback. */
export async function askTutor({ message, history, student, memory, context, token }) {
  if (server.ai) {
    try {
      const res = await api('/tutor', {
        method: 'POST', token, timeout: 40000,
        body: { lang: getLang(), messages: history.slice(-10).concat({ role: 'user', content: message }).map((m) => ({ role: m.role, content: m.content.slice(0, 2000) })), student: studentSummary(student), context: { concept: context?.concept ? CONCEPT[context.concept]?.name : null, question: context?.question?.display || null } },
      });
      return { reply: res.reply, memory, source: 'ai' };
    } catch { /* fall back */ }
  }
  await new Promise((r) => setTimeout(r, 450 + Math.random() * 400));
  return { ...offlineTutor(message, student, memory, context), source: 'offline' };
}
