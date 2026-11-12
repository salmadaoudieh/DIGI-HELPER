// Question generators. Each question carries its worked steps and the misconceptions
// that produce specific wrong answers — this is what powers Mistake Detective.
// Questions record { gen, params } so they can be rebuilt in any language later.
import { t, L } from './i18n.js';
import { BANKS, CONCEPT } from './data.js';

const ri = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
let uid = 0;
const nid = () => `q${Date.now().toString(36)}${(uid++).toString(36)}`;
export const m = (n) => (n < 0 ? `−${Math.abs(n)}` : `${n}`); // pretty minus
const paren = (n) => (n < 0 ? `(${m(n)})` : `${n}`);

function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a || 1; }
export function fracText(n, d) { const g = gcd(n, d); n /= g; d /= g; if (d < 0) { n = -n; d = -d; } return d === 1 ? m(n) : `${m(n)}/${d}`; }

// Parse "5", "-3", "−3", "2/5", "x = 4", "4.5", "٣" (Arabic-Indic digits)
export function parseNumeric(input) {
  if (input === null || input === undefined) return null;
  let s = String(input).trim().replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d))).replace(/٫/g, '.').replace(/,/g, '.')
    .replace(/[−–]/g, '-').replace(/\s+/g, '').replace(/^x=/i, '');
  if (!s) return null;
  const f = s.match(/^(-?\d+(?:\.\d+)?)\/(-?\d+(?:\.\d+)?)$/);
  if (f) { const d = Number(f[2]); return d === 0 ? null : Number(f[1]) / d; }
  if (/^-?\d+(\.\d+)?$/.test(s)) return Number(s);
  return null;
}

const close = (a, b) => a !== null && b !== null && Math.abs(a - b) < 1e-6;
const ids = ['a', 'b', 'c', 'd'];

// ---------- math generators ----------
const G = {
  twoStep({ a = ri(2, 6), x = ri(2, 9), b = ri(1, 9) } = {}) {
    const c = a * x + b;
    return {
      params: { a, x, b }, skill: 'linear', difficulty: 2,
      prompt: t('Solve for x:'), display: `${a}x + ${b} = ${c}`, answer: x,
      steps: [
        { text: t('Subtract {b} from both sides', { b }), expr: `${a}x = ${c - b}` },
        { text: t('Divide both sides by {a}', { a }), expr: `x = ${x}` },
      ],
      hint: t("What is being done to x? It's multiplied by {a}, then {b} is added. Undo them in reverse order.", { a, b }),
      misconceptions: [
        { value: (c - b) / b, id: 'divide-wrong', label: 'Dividing by the wrong number', tags: ['division'],
          found: t('You correctly subtracted {b}, but the final division step was incorrect.', { b }),
          why: t('After {a}x = {r}, x is being multiplied by {a}. To undo that, divide by {a} — the number stuck to x — not by {b}.', { a, b, r: c - b }) },
        { value: (c + b) / a, id: 'inverse-sign', label: 'Added instead of subtracted', tags: ['inverse'],
          found: t('You added {b} to {c}, but to undo “+ {b}” you need to subtract it.', { b, c }),
          why: t('Every operation has an opposite. The opposite of adding {b} is subtracting {b} from both sides.', { b }) },
        { value: c - b, id: 'forgot-divide', label: 'Stopped before dividing', tags: ['division'],
          found: t("You got {a}x = {r} — that's right — but then stopped. That's the value of {a}x, not x.", { a, r: c - b }),
          why: t('{a}x means {a} × x. One more step: divide by {a}.', { a }) },
        { value: c / a - b, id: 'order', label: 'Undid operations in the wrong order', tags: ['order'],
          found: t("You divided {c} by {a} first, but the + {b} wasn't divided, so the balance broke.", { a, b, c }),
          why: t('Undo the last thing done to x first. Here {b} was added last, so subtract it first.', { b }) },
        { value: (c - b) * a, id: 'multiply-instead', label: 'Multiplied instead of divided', tags: ['division'],
          found: t('You multiplied by {a}, but x is already multiplied by {a}. You need the opposite.', { a }),
          why: t('To undo “× {a}”, divide by {a}.', { a }) },
      ],
    };
  },
  negEquation({ a = ri(2, 5), x = pick([-6, -5, -4, -3, -2, -1, 2, 3]), b = ri(2, 9) } = {}) {
    const r = a * x - b;
    return {
      params: { a, x, b }, skill: 'linear', difficulty: 3,
      prompt: t('Solve for x:'), display: `${a}x − ${b} = ${m(r)}`, answer: x,
      steps: [
        { text: t('Add {b} to both sides (undo “− {b}”)', { b }), expr: `${a}x = ${m(r)} + ${b} = ${m(r + b)}` },
        { text: t('Divide both sides by {a}', { a }), expr: `x = ${m(x)}` },
      ],
      hint: t('To undo “− {b}”, do the opposite: add {b} to both sides. Watch the sign of {r}.', { b, r: m(r) }),
      misconceptions: [
        { value: (r - b) / a, id: 'neg-move', label: 'Moving a negative term', tags: ['negatives', 'multistep'],
          found: t('You subtracted {b} again. To undo “− {b}”, you add {b} to both sides.', { b }),
          why: t('{r} + {b} = {s}. Think of a number line: start at {r} and move {b} steps right.', { r: m(r), b, s: m(r + b) }) },
        { value: -x, id: 'sign-flip', label: 'Answer sign flipped', tags: ['negatives', 'multistep'],
          found: t('Your steps were close, but the sign of your answer flipped.'),
          why: t('{s} ÷ {a} keeps the sign of {s}. A negative divided by a positive stays negative.', { s: m(r + b), a }) },
        { value: (Math.abs(r) + b) / a, id: 'dropped-negative', label: 'Dropped a negative sign', tags: ['negatives', 'multistep'],
          found: t('It looks like the minus sign on {r} went missing.', { r: m(r) }),
          why: t('{r} is below zero. Keep the sign attached to the number all the way through.', { r: m(r) }) },
      ],
    };
  },
  integerOps({ kind = pick(['subneg', 'mulneg', 'addneg']), a = ri(2, 9), b = ri(2, 9) } = {}) {
    const params = { kind, a, b };
    if (kind === 'subneg') {
      return {
        params, skill: 'neg', difficulty: 2, prompt: t('Calculate:'), display: `${m(-a)} − (${m(-b)})`, answer: -a + b,
        steps: [{ text: t('Subtracting a negative is the same as adding'), expr: `${m(-a)} + ${b}` }, { text: t('Move right on the number line'), expr: `= ${m(-a + b)}` }],
        hint: t('Two minus signs side by side become a plus: − (−b) = + b.'),
        misconceptions: [
          { value: -a - b, id: 'double-neg', label: 'Subtracting a negative', tags: ['negatives'],
            found: t('You treated “− ({nb})” as “− {b}”. Subtracting a negative actually adds.', { nb: m(-b), b }),
            why: t('Taking away a debt of {b} leaves you {b} better off. So {na} − ({nb}) = {na} + {b}.', { b, na: m(-a), nb: m(-b) }) },
          { value: a - b, id: 'sign-flip', label: 'Answer sign flipped', tags: ['negatives'], found: t('The size is right but the sign is flipped.'), why: t('Start at {na} on the number line and move {b} to the right.', { na: m(-a), b }) },
        ],
      };
    }
    if (kind === 'mulneg') {
      return {
        params, skill: 'neg', difficulty: 2, prompt: t('Calculate:'), display: `(${m(-a)}) × (${m(-b)})`, answer: a * b,
        steps: [{ text: t('Multiply the sizes'), expr: `${a} × ${b} = ${a * b}` }, { text: t('Negative × negative = positive'), expr: `= ${a * b}` }],
        hint: t('Same signs give a positive result; different signs give a negative.'),
        misconceptions: [
          { value: -a * b, id: 'neg-times-neg', label: 'Negative × negative', tags: ['negatives'],
            found: t('You multiplied correctly, but two negatives multiply to a positive.'),
            why: t('Multiplying by −1 flips direction on the number line. Flip twice and you face forward again.') },
        ],
      };
    }
    return {
      params, skill: 'neg', difficulty: 1, prompt: t('Calculate:'), display: `${m(-a)} + ${b}`, answer: -a + b,
      steps: [{ text: t('Start at {na} and move {b} right', { na: m(-a), b }), expr: `= ${m(-a + b)}` }],
      hint: t('Picture a number line. Adding means moving right.'),
      misconceptions: [
        { value: -(a + b), id: 'add-sizes', label: 'Added the sizes, kept the minus', tags: ['negatives'], found: t('You added {a} and {b} and kept the minus sign.', { a, b }), why: t('Adding {b} moves you right, towards zero, from {na}.', { b, na: m(-a) }) },
        { value: a - b, id: 'sign-flip', label: 'Answer sign flipped', tags: ['negatives'], found: t('The size is right but the sign is flipped.'), why: t('From {na}, moving {b} right lands on {r}.', { na: m(-a), b, r: m(-a + b) }) },
      ],
    };
  },
  fractions({ n1 = 1, d1 = pick([2, 3, 4]), n2 = 1, d2 = pick([3, 5, 6]) } = {}) {
    if (d1 === d2) d2 = d1 + 1;
    const num = n1 * d2 + n2 * d1; const den = d1 * d2;
    return {
      params: { n1, d1, n2, d2 }, skill: 'frac', difficulty: 2, prompt: t('Add (give a fraction like 5/6):'), display: `${n1}/${d1} + ${n2}/${d2}`, answer: num / den, answerText: fracText(num, den),
      steps: [{ text: t('Use a common denominator of {den}', { den }), expr: `${n1 * d2}/${den} + ${n2 * d1}/${den}` }, { text: t('Add the numerators'), expr: `= ${fracText(num, den)}` }],
      hint: t('You can only add fractions when the pieces are the same size.'),
      misconceptions: [
        { value: (n1 + n2) / (d1 + d2), id: 'add-denominators', label: 'Added the denominators', tags: ['fractions'],
          found: t('You added the tops and the bottoms: {f}.', { f: `${n1 + n2}/${d1 + d2}` }),
          why: t('Denominators tell you the size of each piece. Different sizes cannot be added directly, so first cut both into pieces of size 1/{den}.', { den }) },
      ],
    };
  },
  distributive({ a = ri(2, 5), x = ri(1, 7), b = ri(1, 6) } = {}) {
    const c = a * (x + b);
    return {
      params: { a, x, b }, skill: 'distrib', difficulty: 3, prompt: t('Solve for x:'), display: `${a}(x + ${b}) = ${c}`, answer: x,
      steps: [{ text: t('Multiply {a} by both terms', { a }), expr: `${a}x + ${a * b} = ${c}` }, { text: t('Subtract {k}', { k: a * b }), expr: `${a}x = ${c - a * b}` }, { text: t('Divide by {a}', { a }), expr: `x = ${x}` }],
      hint: t('{a}(x + {b}) means {a} lots of x AND {a} lots of {b}.', { a, b }),
      misconceptions: [
        { value: (c - b) / a, id: 'partial-distribute', label: 'Only multiplied the first term', tags: ['distribution', 'multistep'],
          found: t('You multiplied {a} by x but not by {b}.', { a, b }),
          why: t('The {a} multiplies everything inside the brackets: {a}·x + {a}·{b} = {a}x + {k}.', { a, b, k: a * b }) },
      ],
    };
  },
  orderOps({ a = ri(2, 9), b = ri(2, 6), c = ri(2, 6) } = {}) {
    return {
      params: { a, b, c }, skill: 'order', difficulty: 1, prompt: t('Calculate:'), display: `${a} + ${b} × ${c}`, answer: a + b * c,
      steps: [{ text: t('Multiply first'), expr: `${b} × ${c} = ${b * c}` }, { text: t('Then add'), expr: `${a} + ${b * c} = ${a + b * c}` }],
      hint: t('Multiplication comes before addition.'),
      misconceptions: [{ value: (a + b) * c, id: 'left-to-right', label: 'Worked left to right', tags: ['order'], found: t('You added first, then multiplied.'), why: t('× and ÷ are done before + and −, even when they come later in the line.') }],
    };
  },
  evaluate({ a = ri(2, 6), x = ri(2, 6), b = ri(1, 9) } = {}) {
    return {
      params: { a, x, b }, skill: 'vars', difficulty: 1, prompt: t('If x = {x}, find the value of:', { x }), display: `${a}x − ${b}`, answer: a * x - b,
      steps: [{ text: t('Replace x with {x}', { x }), expr: `${a} × ${x} − ${b}` }, { text: t('Multiply, then subtract'), expr: `= ${a * x - b}` }],
      hint: t('{a}x means {a} × x.', { a }),
      misconceptions: [{ value: a + x - b, id: 'add-coef', label: 'Added the coefficient', tags: ['variables'], found: t('You added {a} and {x}, but {a}x means {a} × {x}.', { a, x }), why: t('A number written right next to a letter means multiply.') }],
    };
  },
  oneStep({ x = pick([-7, -5, -2, 3, 5, 8]), b = ri(2, 9) } = {}) {
    const r = x - b;
    return {
      params: { x, b }, skill: 'onestep', difficulty: 1, prompt: t('Solve for x:'), display: `x − ${b} = ${m(r)}`, answer: x,
      steps: [{ text: t('Add {b} to both sides', { b }), expr: `x = ${m(r)} + ${b} = ${m(x)}` }],
      hint: t('Undo “− {b}” by adding {b}.', { b }),
      misconceptions: [{ value: r - b, id: 'neg-move', label: 'Moving a negative term', tags: ['negatives'], found: t('You subtracted {b} again instead of adding it.', { b }), why: t('The opposite of subtracting {b} is adding {b}.', { b }) }],
    };
  },
  inequality({ a = ri(2, 4), k = pick([-4, -3, -2, 2, 3]), b = ri(1, 8), order = [0, 1, 2, 3].sort(() => Math.random() - 0.5) } = {}) {
    // −a·x + b > c  →  x < k
    const c = -a * k + b;
    const texts = [`x > ${m(k)}`, `x < ${m(k)}`, `x < ${m(-k)}`, `x > ${m(-k)}`]; // [wrong, right, …]
    const options = order.map((ti, i) => ({ id: ids[i], text: texts[ti] }));
    const idOf = (ti) => options.find((o) => o.text === texts[ti]).id;
    return {
      params: { a, k, b, order }, skill: 'ineq', difficulty: 3, type: 'mc', prompt: t('Solve the inequality:'), display: `−${a}x + ${b} > ${m(c)}`,
      options, answer: idOf(1), answerText: texts[1],
      steps: [{ text: t('Subtract {b}', { b }), expr: `−${a}x > ${m(c - b)}` }, { text: t('Divide by −{a} and flip the sign', { a }), expr: texts[1] }],
      hint: t('What happens to an inequality when you divide both sides by a negative number?'),
      misconceptions: [
        { value: idOf(0), id: 'flip-sign', label: 'Forgot to flip the inequality', tags: ['negatives', 'multistep'], found: t('Your arithmetic was right, but dividing by a negative flips the inequality sign.'), why: t('2 > 1, but −2 < −1. Multiplying or dividing by a negative reverses the order.') },
        { value: idOf(3), id: 'flip-sign', label: 'Forgot to flip the inequality', tags: ['negatives', 'multistep'], found: t('Two things went wrong: the sign of the number and the direction.'), why: t('Divide by −{a} carefully, and flip > to <.', { a }) },
      ],
    };
  },
  slope({ x1 = ri(-3, 2), y1 = ri(-3, 3), dx = pick([1, 2, 3]), mm = pick([-3, -2, 2, 3]) } = {}) {
    const x2 = x1 + dx; const y2 = y1 + mm * dx;
    return {
      params: { x1, y1, dx, mm }, skill: 'graph', difficulty: 2, prompt: t('Find the slope of the line through:'), display: `(${x1}, ${y1}) & (${x2}, ${y2})`, answer: mm,
      steps: [{ text: t('Slope = rise ÷ run'), expr: `(${y2} − ${paren(y1)}) ÷ (${x2} − ${paren(x1)})` }, { text: t('Simplify'), expr: `= ${mm * dx} ÷ ${dx} = ${m(mm)}` }],
      hint: t('Rise over run: change in y divided by change in x.'),
      misconceptions: [{ value: 1 / mm, id: 'inverted-slope', label: 'Run over rise', tags: ['graphing'], found: t('You divided change in x by change in y.'), why: t('Slope is how much y rises for each step in x: Δy ÷ Δx.') }],
    };
  },
  func({ a = ri(2, 5), b = ri(1, 9), x = pick([-3, -2, -1]) } = {}) {
    return {
      params: { a, b, x }, skill: 'functions', difficulty: 2, prompt: t('If f(x) = {f}, find:', { f: `${a}x + ${b}` }), display: `f(${m(x)})`, answer: a * x + b,
      steps: [{ text: t('Replace x with {x}', { x: m(x) }), expr: `${a} × (${m(x)}) + ${b}` }, { text: t('Multiply, then add'), expr: `${m(a * x)} + ${b} = ${m(a * x + b)}` }],
      hint: t('f(−2) means: put −2 wherever you see x.'),
      misconceptions: [{ value: -a * x + b, id: 'sign-flip', label: 'Answer sign flipped', tags: ['negatives'], found: t('The negative input lost its sign: {a} × ({x}) is {r}.', { a, x: m(x), r: m(a * x) }), why: t('Positive × negative = negative.') }],
    };
  },
};

// ---------- subject banks ----------
function bankQuestion(subject, idx) {
  const bq = BANKS[subject].questions[idx];
  const mc = bq.type === 'mc';
  const options = mc ? bq.options.map((o) => ({ id: o.id, text: L(o.text) })) : undefined;
  return {
    params: { subject, idx }, skill: bq.concept, difficulty: bq.difficulty, type: mc ? 'mc' : 'numeric', textual: true,
    prompt: L(bq.prompt), display: L(bq.display), options, answer: bq.answer,
    answerText: mc ? options.find((o) => o.id === bq.answer)?.text : String(bq.answer),
    hint: L(bq.hint), steps: (bq.steps || []).map((s) => ({ text: L(s.text), expr: '' })),
    misconceptions: (bq.misconceptions || []).map((mm) => ({ value: mm.value, id: mm.id, label: mm.label.en, found: L(mm.found), why: L(mm.why), tags: mm.tags || [] })),
  };
}
const BANK_INDEX = {}; // concept -> [{ subject, idx, difficulty }]
for (const [subject, b] of Object.entries(BANKS)) b.questions.forEach((q, idx) => { (BANK_INDEX[q.concept] ||= []).push({ subject, idx, difficulty: q.difficulty }); });

export const GENERATORS_BY_SKILL = {
  order: ['orderOps'], neg: ['integerOps'], frac: ['fractions'], vars: ['evaluate'], onestep: ['oneStep'],
  linear: ['twoStep', 'negEquation'], distrib: ['distributive'], ineq: ['inequality'], graph: ['slope'], functions: ['func'],
};

export function makeQuestion(gen, params) {
  const q = gen === 'bank' ? bankQuestion(params.subject, params.idx) : G[gen](params);
  return { id: nid(), gen, type: 'numeric', ...q };
}

export function questionFor(skill, difficulty = 2) {
  if (BANK_INDEX[skill]) {
    const list = BANK_INDEX[skill];
    const near = list.filter((x) => Math.abs(x.difficulty - difficulty) <= 1);
    const p = pick(near.length ? near : list);
    return makeQuestion('bank', { subject: p.subject, idx: p.idx });
  }
  const gens = GENERATORS_BY_SKILL[skill] || ['twoStep'];
  let gen = pick(gens);
  if (skill === 'linear') gen = difficulty >= 3 ? 'negEquation' : difficulty <= 1 ? 'twoStep' : pick(gens);
  return makeQuestion(gen);
}

export function similarQuestion(q) {
  if (q.gen === 'bank') {
    const others = (BANK_INDEX[q.skill] || []).filter((x) => x.idx !== q.params.idx || x.subject !== q.params.subject);
    const p = pick(others.length ? others : BANK_INDEX[q.skill]);
    return makeQuestion('bank', { subject: p.subject, idx: p.idx });
  }
  let next = makeQuestion(q.gen);
  for (let i = 0; i < 5 && next.display === q.display; i++) next = makeQuestion(q.gen);
  return next;
}

/** Rebuild a stored question in the current language. */
export function rebuild(q) {
  if (!q?.gen || !q.params) return q;
  try { return { ...makeQuestion(q.gen, q.params), id: q.id }; } catch { return q; }
}

/** Rebuild a stored result ({ q:{gen,params}, raw, conf, ms }) and re-check it in the current language. */
export function hydrate(r) {
  const q = rebuild(r.q);
  if (!q?.misconceptions) return { ...r, q };
  const res = checkAnswer(q, r.raw);
  return { ...r, q, ok: res.ok, value: res.value, mis: res.mis, generic: res.generic };
}

/** The text a student's raw answer stands for (option text for multiple choice). */
export function answerLabel(q, raw) {
  if (q?.type === 'mc') return q.options?.find((o) => o.id === raw)?.text ?? String(raw ?? '');
  return String(raw ?? '');
}
export function correctLabel(q) {
  if (q.type === 'mc') return q.options.find((o) => o.id === q.answer)?.text ?? q.answerText;
  return q.answerText || (typeof q.answer === 'number' ? m(q.answer) : String(q.answer));
}

/** Check an answer and, if wrong, find the misconception behind it. */
export function checkAnswer(q, raw) {
  if (q.type === 'mc') {
    const ok = raw === q.answer;
    const mis = ok ? null : q.misconceptions.find((mm) => mm.value === raw) || null;
    return { ok, value: raw, mis, generic: ok || mis ? null : genericFinding(q, null) };
  }
  const value = parseNumeric(raw);
  if (value === null) return { ok: false, invalid: true, value: null };
  const ok = close(value, q.answer);
  if (ok) return { ok, value };
  const mis = q.misconceptions.find((mm) => typeof mm.value === 'number' && close(mm.value, value) && !close(mm.value, q.answer)) || null;
  return { ok, value, mis, generic: mis ? null : genericFinding(q, value) };
}

function genericFinding(q, v) {
  if (v !== null && typeof q.answer === 'number' && q.answer !== 0 && close(v, -q.answer)) return { id: 'sign-flip', label: 'Answer sign flipped', tags: ['negatives'], found: t('You found the right size, but the sign is flipped.'), why: t('Re-check each step where a negative number appears.') };
  if (v !== null && typeof q.answer === 'number' && Math.abs(v - q.answer) <= 2 && Number.isInteger(v)) return { id: 'slip', label: 'Arithmetic slip', tags: ['arithmetic'], found: t('Very close — your answer is off by {n}.', { n: Math.abs(v - q.answer) }), why: t('The method looks right. Redo the arithmetic in each step slowly.') };
  if (q.textual) return { id: 'concept-gap', label: 'Idea needs another look', tags: ['concept'], found: t('This answer points to a gap in the idea behind {c}.', { c: CONCEPT[q.skill]?.name || '' }), why: t("Let's walk through the reasoning step by step and see where the path splits.") };
  return { id: 'unclear', label: 'Method needs a check', tags: ['method'], found: t('Mistake Detective could not match this to a known pattern.'), why: t("Let's walk through the steps together and see where the path splits.") };
}

// ---------- Diagnostics ----------
export const DIAGNOSTIC_SUBJECTS = ['math', 'science', 'language', 'social', 'tech', 'all'];

function mathSet() {
  return [
    { ...makeQuestion('orderOps', { a: 4, b: 3, c: 2 }), askConf: false, demo: { answer: '10', conf: 4 }, reassess: { answer: '10', conf: 5 } },
    { ...makeQuestion('integerOps', { kind: 'subneg', a: 7, b: 3 }), askConf: true, demo: { answer: '-10', conf: 4 }, reassess: { answer: '-4', conf: 4 } },
    { ...makeQuestion('fractions', { n1: 1, d1: 2, n2: 1, d2: 3 }), askConf: false, demo: { answer: '5/6', conf: 3 }, reassess: { answer: '5/6', conf: 4 } },
    { ...makeQuestion('evaluate', { a: 3, x: 4, b: 2 }), askConf: false, demo: { answer: '10', conf: 4 }, reassess: { answer: '10', conf: 5 } },
    { ...makeQuestion('oneStep', { x: 5, b: 8 }), askConf: true, demo: { answer: '5', conf: 3 }, reassess: { answer: '5', conf: 5 } },
    { ...makeQuestion('twoStep', { a: 3, x: 5, b: 5 }), askConf: true, demo: { answer: '3', conf: 5 }, reassess: { answer: '5', conf: 5 } },
    { ...makeQuestion('negEquation', { a: 2, x: -2, b: 6 }), askConf: true, demo: { answer: '-8', conf: 4 }, reassess: { answer: '-2', conf: 4 } },
    { ...makeQuestion('distributive', { a: 2, x: 4, b: 3 }), askConf: true, demo: { answer: '5.5', conf: 4 }, reassess: { answer: '5.5', conf: 3 } },
    { ...makeQuestion('inequality', { a: 2, k: -3, b: 4, order: [0, 1, 2, 3] }), askConf: true, demo: { answer: 'a', conf: 4 }, reassess: { answer: 'b', conf: 4 } },
    { ...makeQuestion('integerOps', { kind: 'mulneg', a: 4, b: 5 }), askConf: true, demo: { answer: '-20', conf: 5 }, reassess: { answer: '20', conf: 5 } },
  ];
}

/** Pick `per` questions for each concept of a bank subject, easiest first. */
function bankSet(subject, per = 2, offset = 0) {
  const b = BANKS[subject]; const out = [];
  for (const c of b.concepts) {
    const list = b.questions.map((q, idx) => ({ q, idx })).filter((x) => x.q.concept === c.id).sort((x, y) => x.q.difficulty - y.q.difficulty);
    for (let k = 0; k < Math.min(per, list.length); k++) {
      const { q, idx } = list[(k + offset) % list.length];
      out.push({ ...makeQuestion('bank', { subject, idx }), askConf: q.difficulty >= 2 });
    }
  }
  return out;
}

/**
 * subject: 'math' | 'science' | 'language' | 'social' | 'tech' | 'all'
 * 'all' mixes every subject (15 questions, 3 per subject).
 */
export function diagnosticSet(subject = 'math', { reassess = false } = {}) {
  if (subject === 'math') return mathSet();
  if (subject === 'all') {
    const m3 = [mathSet()[1], mathSet()[2], mathSet()[5]];
    const per = Object.keys(BANKS).flatMap((s) => {
      const b = BANKS[s];
      return b.concepts.slice(0, 3).map((c, i) => {
        const list = b.questions.map((q, idx) => ({ q, idx })).filter((x) => x.q.concept === c.id);
        const { q, idx } = list[(i + (reassess ? 1 : 0)) % list.length];
        return { ...makeQuestion('bank', { subject: s, idx }), askConf: q.difficulty >= 2 };
      });
    });
    return [...m3, ...per];
  }
  return bankSet(subject, 2, reassess ? 1 : 0);
}
