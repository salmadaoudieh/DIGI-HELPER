// The learning model: mastery updates, diagnosis, learning paths, confidence gaps,
// achievements and DigiWorld unlocks. Pure functions over a student record.
import {
  CONCEPTS, CONCEPT, EDGES, ALGEBRA_GROUP, statusOf, ZONES, ALL_DISTRICTS, PRESET_BEFORE, PRESET_AFTER,
  PRESET_CONFIDENCE, PRESET_CONFIDENCE_AFTER, DEMO_MISTAKES, DEMO_JOURNEY, BANKS, SUBJECT, MODES, conceptsOf,
} from './data.js';
import { t } from './i18n.js';

// ---------- language-neutral messages ----------
// Stored text is { key, vars } (English template + variables) so it can be shown in any language later.
const msg = (key, vars) => ({ key, vars });
/** Join a list in the current language: "a, b and c". */
export function joinList(arr) {
  if (!arr.length) return '';
  if (arr.length === 1) return arr[0];
  return t('{list} and {last}', { list: arr.slice(0, -1).join(t(', ')), last: arr[arr.length - 1] });
}
function resolveVar(v) {
  if (v === null || v === undefined) return v;
  if (Array.isArray(v)) return joinList(v.map(resolveVar));
  if (typeof v === 'object') {
    if (v.key) return render(v);
    if (v.concept) return CONCEPT[v.concept]?.name ?? v.concept;
    if (v.conceptShort) return CONCEPT[v.conceptShort]?.short ?? v.conceptShort;
    if (v.label) return t(v.label);
    if (v.subject) return SUBJECT[v.subject]?.name ?? v.subject;
    if (v.district) return ALL_DISTRICTS.find((d) => d.id === v.district)?.name ?? v.district;
    if (v.zone) return ZONES.find((z) => z.id === v.zone)?.name ?? v.zone;
    if (v.mode) return MODES[v.mode]?.name ?? v.mode;
  }
  return v;
}
/** Render a stored { key, vars } (or a legacy plain string) in the current language. */
export function render(m) {
  if (!m) return '';
  if (typeof m === 'string') return t(m);
  const vars = {}; for (const [k, v] of Object.entries(m.vars || {})) vars[k] = resolveVar(v);
  return t(m.key, vars);
}
export function activityText(a) { return a.key ? render(a) : t(a.text); }
export function renderDiag(d) {
  if (!d) return null;
  if (typeof d.headline === 'string') return { headline: t(d.headline), text: t(d.text), extra: (d.extra || []).map((x) => t(x)) };
  return { headline: render(d.h), text: render(d.x), extra: (d.extra || []).map(render) };
}
export function subjectMastery(s, subject) {
  const vals = conceptsOf(subject).map((c) => s.mastery[c.id]).filter((v) => v !== null && v !== undefined);
  return vals.length ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length) : null;
}

export const todayKey = () => new Date().toISOString().slice(0, 10);
const clamp = (v, a = 0, b = 100) => Math.max(a, Math.min(b, v));
const round = (v) => Math.round(v);

export function blankStudent(profile) {
  const nulls = Object.fromEntries(CONCEPTS.map((c) => [c.id, null]));
  return {
    profile, mastery: { ...nulls }, baseline: { ...nulls }, confidence: {}, history: {}, attempts: {}, mistakes: {},
    xp: 0, streakDays: [], achievements: {}, activity: [], diagnoses: [], challenges: [], unlocked: [],
    journey: [], counters: { fixedRepeats: 0, calibrated: 0, scans: 0 }, lastMistakes: [], seenUnlocks: [], diagSubjects: [],
  };
}

export function demoProfile() {
  return { name: 'Demo Student', grade: 'Grade 10', subjects: ['Math', 'Science'], preference: 'visual', avatar: '🚀', className: '10A' };
}

/** Preset states for the competition demo story. */
export function demoStudent(stage = 'before') {
  const s = blankStudent(demoProfile());
  if (stage === 'fresh') return s;
  const days = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'];
  s.baseline = { ...PRESET_BEFORE };
  if (stage === 'before') {
    s.mastery = { ...PRESET_BEFORE };
    s.confidence = { ...PRESET_CONFIDENCE };
    CONCEPTS.forEach((c) => { s.history[c.id] = [{ d: 'Day 1', v: PRESET_BEFORE[c.id] }]; });
    s.journey = [DEMO_JOURNEY[0]];
    s.xp = 140; s.streakDays = ['Day 1'];
    s.achievements = { 'first-discovery': 'Day 1' };
    s.activity = [{ t: 'Day 1', ...msg('Completed the Algebra diagnostic ({score}/{total})', { score: 4, total: 10 }), kind: 'diagnostic' }];
    s.unlocked = openDistricts(s.mastery);
    s.seenUnlocks = [...s.unlocked];
  } else {
    s.mastery = { ...PRESET_AFTER };
    s.confidence = { ...PRESET_CONFIDENCE_AFTER };
    CONCEPTS.forEach((c) => {
      const a = PRESET_BEFORE[c.id]; const b = PRESET_AFTER[c.id];
      s.history[c.id] = days.map((d, i) => ({ d, v: round(a + (b - a) * easing(i / 6)) }));
    });
    s.journey = [...DEMO_JOURNEY];
    s.xp = 1460; s.streakDays = [...days];
    s.achievements = { 'first-discovery': 'Day 1', challenger: 'Day 5', breakthrough: 'Day 6', consistency: 'Day 7', 'mistake-master': 'Day 6', unlocker: 'Day 7', 'self-aware': 'Day 4' };
    s.counters = { fixedRepeats: 11, calibrated: 7, scans: 1 };
    s.challenges = [{ date: 'Day 5', score: 4, total: 5, acc: 80, xp: 90 }];
    s.activity = [
      { t: 'Day 7', ...msg('Reassessment: {score}/{total} — Algebra mastery {v}%', { score: 9, total: 10, v: 81 }), kind: 'diagnostic' },
      { t: 'Day 7', ...msg('Unlocked {district} in {zone}', { district: { district: 'graph-heights' }, zone: { zone: 'math' } }), kind: 'unlock' },
      { t: 'Day 6', ...msg('Adaptive practice: {concept} ({n} questions)', { concept: { concept: 'neg' }, n: 12 }), kind: 'practice' },
      { t: 'Day 5', ...msg('Daily Digi Challenge: {score}/{total} in 60 seconds', { score: 4, total: 5 }), kind: 'challenge' },
      { t: 'Day 4', ...msg('Balance game: {concept}', { concept: { concept: 'linear' } }), kind: 'interactive' },
      { t: 'Day 3', ...msg('Visual lesson: number line for negatives'), kind: 'visual' },
      { t: 'Day 1', ...msg('Completed the Algebra diagnostic ({score}/{total})', { score: 4, total: 10 }), kind: 'diagnostic' },
    ];
    s.unlocked = openDistricts(s.mastery);
    s.seenUnlocks = s.unlocked.filter((id) => id !== 'graph-heights');
    s.diagSubjects = ['math'];
  }
  // Recent attempts + common mistakes give the DigiMind panels real content
  s.mistakes = JSON.parse(JSON.stringify(DEMO_MISTAKES));
  for (const b of Object.values(BANKS)) {
    const low = b.concepts.slice().sort((x, y) => (PRESET_BEFORE[x.id] ?? 50) - (PRESET_BEFORE[y.id] ?? 50))[0];
    const mm = b.questions.find((q) => q.concept === low.id && q.misconceptions?.length)?.misconceptions[0];
    if (mm) s.mistakes[low.id] = { [mm.id]: { label: mm.label.en, count: stage === 'after' ? 1 : 2 } };
  }
  if (stage === 'before') s.diagSubjects = ['math'];
  CONCEPTS.forEach((c) => {
    const p = (stage === 'after' ? PRESET_AFTER : PRESET_BEFORE)[c.id] / 100;
    s.attempts[c.id] = Array.from({ length: 6 }, (_, i) => ({ ok: (i * 37 + c.id.length * 13) % 100 < p * 100, t: i }));
  });
  s.diagnoses = [diagnosisForDemo(stage)];
  return s;
}

function easing(t) { return 1 - Math.pow(1 - t, 1.6); }

function diagnosisForDemo(stage) {
  if (stage === 'after') {
    return {
      at: 'Day 7', score: 9, total: 10, subject: 'math',
      h: msg('Negative numbers are no longer holding you back.'),
      x: msg('You now handle negatives inside multi-step equations and inequalities. The remaining gap is the distributive property: you still multiply only the first term inside brackets.'),
      extra: [], strengths: ['neg', 'linear', 'onestep'], focus: ['distrib'],
      patterns: [{ label: 'Only multiplied the first term', count: 1 }], overconfident: 0,
    };
  }
  return {
    at: 'Day 1', score: 4, total: 10, subject: 'math',
    h: msg('Your algebra foundation is strong, but negatives are getting in the way.'),
    x: msg('Your algebra foundation is strong, but you are having difficulty when negative numbers are introduced into multi-step equations.'),
    extra: [msg('You felt confident on {n} questions you missed — a sign those topics feel familiar but need review.', { n: 5 })],
    strengths: ['order', 'frac', 'vars', 'onestep'], focus: ['neg', 'linear', 'ineq', 'distrib'],
    patterns: [{ label: 'Negative-number errors', count: 4 }, { label: 'Dividing by the wrong number', count: 1 }, { label: 'Only multiplied the first term', count: 1 }],
    overconfident: 5,
  };
}

/** Districts whose unlock rule is met for a given mastery map. */
function openDistricts(mastery) {
  return ALL_DISTRICTS.filter((d) => !d.unlock || (mastery[d.unlock.concept] ?? 0) >= d.unlock.min).map((d) => d.id);
}

// ---------- derived values ----------
export function algebraMastery(s) {
  const vals = ALGEBRA_GROUP.map((id) => s.mastery[id]).filter((v) => v !== null && v !== undefined);
  if (!vals.length) return null;
  return round(vals.reduce((a, b) => a + b, 0) / vals.length);
}
export function overallMastery(s) {
  const vals = CONCEPTS.map((c) => s.mastery[c.id]).filter((v) => v !== null && v !== undefined);
  return vals.length ? round(vals.reduce((a, b) => a + b, 0) / vals.length) : null;
}
export function weakest(s, n = 1) {
  const list = CONCEPTS.filter((c) => s.mastery[c.id] !== null && s.mastery[c.id] !== undefined)
    .filter((c) => isUnlockedConcept(s, c.id))
    .sort((a, b) => s.mastery[a.id] - s.mastery[b.id]);
  return n === 1 ? list[0] || null : list.slice(0, n);
}
export function isUnlockedConcept(s, id) {
  for (const z of ALL_DISTRICTS) {
    if (z.concepts.includes(id) && z.unlock) return (s.mastery[z.unlock.concept] ?? 0) >= z.unlock.min || s.unlocked.includes(z.id);
  }
  return true;
}
export function confidenceGap(s, id) {
  const c = s.confidence[id]; const mm = s.mastery[id];
  if (c === undefined || c === null || mm === null || mm === undefined) return null;
  return round(c - mm);
}
export function biggestGap(s) {
  let best = null;
  CONCEPTS.forEach((c) => { const g = confidenceGap(s, c.id); if (g !== null && g >= 20 && (!best || g > best.gap)) best = { concept: c, gap: g, conf: round(s.confidence[c.id]), mastery: round(s.mastery[c.id]) }; });
  return best;
}
export function level(xp) { return { level: Math.floor(xp / 500) + 1, into: xp % 500, need: 500 }; }

export function streakCount(s) {
  if (!s.streakDays.length) return 0;
  if (s.streakDays[0].startsWith('Day')) return s.streakDays.length;
  const set = new Set(s.streakDays); let n = 0; const d = new Date();
  if (!set.has(todayKey())) d.setDate(d.getDate() - 1);
  while (set.has(d.toISOString().slice(0, 10))) { n++; d.setDate(d.getDate() - 1); }
  return n;
}

// ---------- mutations (operate on a cloned student) ----------
function stamp(s) {
  const demoLike = s.streakDays[0]?.startsWith('Day');
  return demoLike ? s.streakDays[s.streakDays.length - 1] : todayKey();
}
function markActive(s) {
  if (s.streakDays[0]?.startsWith('Day')) return;
  const k = todayKey(); if (!s.streakDays.includes(k)) s.streakDays.push(k);
}
/** Log an activity. `key` is an English template; `vars` may hold {concept:id}, {mode:id}, … references. */
export function logActivity(s, key, kind, vars) {
  s.activity.unshift({ t: stamp(s), key, vars, kind });
  s.activity = s.activity.slice(0, 40);
  markActive(s);
}
function pushHistory(s, id) {
  const d = stamp(s); const arr = (s.history[id] ||= []); const v = round(s.mastery[id]);
  if (arr.length && arr[arr.length - 1].d === d) arr[arr.length - 1].v = v; else arr.push({ d, v });
  if (arr.length > 30) arr.shift();
}

/** Record one answered question. Returns xp gained. */
export function recordAttempt(s, skill, { ok, conf, mis, difficulty = 2, wasRetry = false }) {
  const prev = s.mastery[skill];
  let mm = prev === null || prev === undefined ? 40 : prev;
  const dFactor = 0.8 + difficulty * 0.15;
  mm = ok ? mm + (100 - mm) * 0.1 * dFactor : mm - mm * 0.07;
  s.mastery[skill] = clamp(round(mm * 10) / 10);
  if (s.baseline[skill] === null || s.baseline[skill] === undefined) s.baseline[skill] = prev ?? s.mastery[skill];
  (s.attempts[skill] ||= []).push({ ok, conf: conf ?? null, t: Date.now() });
  if (s.attempts[skill].length > 20) s.attempts[skill].shift();
  if (conf) {
    const pct = ((conf - 1) / 4) * 100;
    const cur = s.confidence[skill];
    s.confidence[skill] = cur === undefined ? pct : cur * 0.7 + pct * 0.3;
    const calibrated = (ok && conf >= 4) || (!ok && conf <= 2);
    if (calibrated) s.counters.calibrated++;
  }
  if (!ok && mis) {
    const bucket = (s.mistakes[skill] ||= {});
    const e = (bucket[mis.id] ||= { label: mis.label, count: 0 });
    e.count++;
  }
  if (ok && wasRetry) s.counters.fixedRepeats++;
  pushHistory(s, skill);
  const xp = ok ? 10 + difficulty * 5 : 3; // effort still earns a little
  s.xp += xp;
  markActive(s);
  return xp;
}

// ---------- diagnosis ----------
/**
 * results: [{ q, ok, value, mis, conf, ms }]
 * Produces a learning diagnosis that goes beyond the score.
 */
export function diagnose(results, subject = 'math') {
  const total = results.length; const score = results.filter((r) => r.ok).length;
  const byConcept = {}; const bySubject = {};
  results.forEach((r) => {
    const b = (byConcept[r.q.skill] ||= { ok: 0, n: 0 }); b.n++; if (r.ok) b.ok++;
    const sj = CONCEPT[r.q.skill]?.subject || 'math'; const bs = (bySubject[sj] ||= { ok: 0, n: 0 }); bs.n++; if (r.ok) bs.ok++;
  });
  const strengths = Object.entries(byConcept).filter(([, b]) => b.ok === b.n).map(([id]) => id);
  const focus = Object.entries(byConcept).filter(([, b]) => b.ok < b.n).map(([id]) => id);
  const wrong = results.filter((r) => !r.ok);
  const tagCount = {}; const patternCount = {};
  wrong.forEach((r) => {
    const mis = r.mis || r.generic; if (!mis) return;
    (mis.tags || []).forEach((tg) => { tagCount[tg] = (tagCount[tg] || 0) + 1; });
    patternCount[mis.label] = (patternCount[mis.label] || 0) + 1;
  });
  const overconfident = wrong.filter((r) => r.conf >= 4).length;
  const times = results.map((r) => r.ms).filter(Boolean).sort((a, b) => a - b);
  const median = times[Math.floor(times.length / 2)] || 0;
  const slow = [...new Set(results.filter((r) => median && r.ms > median * 1.8).map((r) => r.q.skill))];
  const hardMissed = wrong.filter((r) => r.q.difficulty >= 3).length;

  const strong = strengths.length
    ? msg('Your foundation in {list} is strong', { list: strengths.slice(0, 3).map((id) => ({ concept: id })) })
    : msg('You have started building your foundation');
  let h; let x;
  const negHeavy = (tagCount.negatives || 0) >= 2;
  const multi = (tagCount.multistep || 0) >= 1;
  const subjects = Object.keys(bySubject);
  if (score === total) { h = msg('Every concept checked out.'); x = msg('You answered every question correctly. Time to stretch into harder material.'); }
  else if (subjects.length > 1) {
    const ranked = subjects.map((sj) => ({ sj, p: bySubject[sj].ok / bySubject[sj].n })).sort((a, b) => b.p - a.p);
    h = msg('Your strongest subject is {best}; {weak} needs the most attention.', { best: { subject: ranked[0].sj }, weak: { subject: ranked[ranked.length - 1].sj } });
    x = msg('{strong}. Focus next on {focus}.', { strong, focus: focus.slice(0, 3).map((id) => ({ concept: id })) });
  } else if (negHeavy) {
    h = msg('Negative numbers are the common thread in your mistakes.');
    x = multi ? msg('{strong}, but you are having difficulty when negative numbers are introduced into multi-step equations.', { strong })
      : msg('{strong}, but you are having difficulty when negative numbers are introduced.', { strong });
  } else if (tagCount.division >= 2) {
    h = msg('The final division step is where answers slip.');
    x = msg('{strong}, but the last step — dividing by the number attached to x — is causing errors.', { strong });
  } else {
    const top = Object.entries(patternCount).sort((a, b) => b[1] - a[1])[0];
    h = top ? msg('One pattern stands out: {pattern}.', { pattern: { label: top[0] } }) : msg('A few concepts need another look.');
    x = focus.length ? msg('{strong}. Focus next on {focus}.', { strong, focus: focus.slice(0, 4).map((id) => ({ concept: id })) }) : msg('{strong}.', { strong });
  }
  const extra = [];
  if (overconfident) extra.push(overconfident === 1 ? msg('You felt confident on 1 question you missed — a sign that topic feels familiar but needs review.') : msg('You felt confident on {n} questions you missed — a sign those topics feel familiar but need review.', { n: overconfident }));
  if (hardMissed) extra.push(msg('{n} of your mistakes were on harder, multi-step questions.', { n: hardMissed }));
  if (slow.length) extra.push(msg('You spent the longest on {list}.', { list: slow.map((id) => ({ conceptShort: id })) }));

  return {
    at: todayKey(), score, total, subject, h, x, extra, strengths, focus,
    bySubject,
    patterns: Object.entries(patternCount).map(([label, count]) => ({ label, count })).sort((a, b) => b.count - a.count),
    overconfident,
  };
}

/** Apply diagnostic results to the student model. */
export function applyDiagnostic(s, results, diag, { reassess = false } = {}) {
  const byConcept = {};
  results.forEach((r) => { const b = (byConcept[r.q.skill] ||= { ok: 0, n: 0, conf: [] }); b.n++; if (r.ok) b.ok++; if (r.conf) b.conf.push(r.conf); });
  Object.entries(byConcept).forEach(([id, b]) => {
    const measured = 25 + (b.ok / b.n) * 60;
    const prev = s.mastery[id];
    const fresh = prev === null || prev === undefined;
    s.mastery[id] = round(fresh ? measured : reassess ? prev * 0.5 + measured * 0.5 : prev * 0.4 + measured * 0.6);
    if (s.baseline[id] === null || s.baseline[id] === undefined) s.baseline[id] = s.mastery[id];
    if (b.conf.length) s.confidence[id] = (b.conf.reduce((a, c) => a + c, 0) / b.conf.length - 1) / 4 * 100;
    pushHistory(s, id);
  });
  results.filter((r) => !r.ok).forEach((r) => {
    const mis = r.mis || r.generic; if (!mis) return;
    const bucket = (s.mistakes[r.q.skill] ||= {}); const e = (bucket[mis.id] ||= { label: mis.label, count: 0 }); e.count++;
  });
  s.diagnoses.unshift(diag);
  s.lastMistakes = results.filter((r) => !r.ok).map(serializeResult);
  s.xp += 50 + diag.score * 10;
  const subjectsHit = [...new Set(results.map((r) => CONCEPT[r.q.skill]?.subject).filter(Boolean))];
  s.diagSubjects = [...new Set([...(s.diagSubjects || []), ...subjectsHit])];
  const alg = algebraMastery(s);
  if (subjectsHit.includes('math')) s.journey.push({ day: stamp(s), v: alg, event: reassess ? 'Reassessment' : 'Diagnostic test' });
  logActivity(s, reassess ? 'Reassessment ({subject}): {score}/{total}' : 'Diagnostic ({subject}): {score}/{total}', 'diagnostic',
    { subject: diag.subject === 'all' ? { key: 'All subjects' } : { subject: diag.subject }, score: diag.score, total: diag.total });
}

export function serializeResult(r) {
  // Only what is needed to rebuild the question in any language later
  return { q: { id: r.q.id, gen: r.q.gen, params: r.q.params, skill: r.q.skill, difficulty: r.q.difficulty }, raw: r.raw, conf: r.conf, ms: r.ms, ok: r.ok };
}

// ---------- learning path ----------
const PREREQS = EDGES.reduce((acc, [a, b]) => { (acc[b] ||= []).push(a); return acc; }, {});
export function buildPath(s) {
  const weak = CONCEPTS.filter((c) => s.mastery[c.id] !== null && s.mastery[c.id] !== undefined && s.mastery[c.id] < 75 && isUnlockedConcept(s, c.id));
  // order: foundations first (topological by layer), then lowest mastery
  const urgent = (c) => (s.mastery[c.id] < 50 ? 0 : 1);
  weak.sort((a, b) => urgent(a) - urgent(b) || a.layer - b.layer || s.mastery[a.id] - s.mastery[b.id]);
  return weak.slice(0, 5).map((c, i) => {
    const mistakes = Object.values(s.mistakes[c.id] || {}).sort((a, b) => b.count - a.count);
    const mode = recommendMode(s, c.id);
    const blockers = (PREREQS[c.id] || []).filter((p) => (s.mastery[p] ?? 100) < 50).map((p) => CONCEPT[p].name);
    return {
      concept: c, mastery: round(s.mastery[c.id]), mode, mistake: mistakes[0]?.label || null, blockers,
      reason: mistakes[0] ? t('Fix “{label}” (seen {n}×)', { label: t(mistakes[0].label), n: mistakes[0].count }) : blockers.length ? t('Builds on {list}', { list: joinList(blockers) }) : t('Strengthen this skill'),
      index: i,
    };
  });
}

/** Recommend a learning mode from the mistakes a student makes and their stated preference. */
export function recommendMode(s, id) {
  const mistakes = Object.keys(s.mistakes[id] || {});
  const attempts = s.attempts[id] || [];
  const recentFails = attempts.slice(-4).filter((a) => !a.ok).length;
  if (mistakes.some((k) => ['double-neg', 'neg-times-neg', 'sign-flip', 'add-denominators', 'partial-distribute'].includes(k))) return 'visual';
  if (mistakes.some((k) => ['neg-move', 'divide-wrong', 'order', 'inverse-sign', 'flip-sign'].includes(k))) return 'interactive';
  if (recentFails >= 3) return 'explain';
  return s.profile.preference || 'practice';
}

// ---------- achievements & unlocks ----------
export function evaluateAchievements(s) {
  const earned = [];
  const give = (id) => { if (!s.achievements[id]) { s.achievements[id] = stamp(s); earned.push(id); } };
  if (s.diagnoses.length) give('first-discovery');
  if (s.counters.fixedRepeats >= 10) give('mistake-master');
  if (streakCount(s) >= 7) give('consistency');
  if (CONCEPTS.some((c) => s.baseline[c.id] !== null && s.baseline[c.id] !== undefined && s.mastery[c.id] - s.baseline[c.id] >= 20)) give('breakthrough');
  if (s.challenges.length) give('challenger');
  if (s.counters.scans) give('scanner');
  if (s.counters.calibrated >= 5) give('self-aware');
  if (s.unlocked.some((u) => ALL_DISTRICTS.find((d) => d.id === u)?.unlock)) give('unlocker');
  if (['math', 'science', 'language', 'social', 'tech'].every((sj) => (s.diagSubjects || []).includes(sj))) give('all-rounder');
  return earned;
}

export function evaluateUnlocks(s) {
  const fresh = [];
  ALL_DISTRICTS.forEach((d) => {
    const open = !d.unlock || (s.mastery[d.unlock.concept] ?? 0) >= d.unlock.min;
    if (open && !s.unlocked.includes(d.id)) {
      s.unlocked.push(d.id);
      if (d.unlock) { fresh.push(d); logActivity(s, 'Unlocked {district} in {zone}', 'unlock', { district: { district: d.id }, zone: { zone: d.zone } }); }
    }
  });
  return fresh;
}

export function districtProgress(s, d) {
  if (d.concepts) {
    const vals = d.concepts.map((id) => s.mastery[id]).filter((v) => v !== null && v !== undefined);
    return vals.length ? round(vals.reduce((a, b) => a + b, 0) / vals.length) : null;
  }
  return d.value;
}

export function districtLocked(s, d) {
  if (d.locked) return true;
  if (!d.unlock) return false;
  return !s.unlocked.includes(d.id) && (s.mastery[d.unlock.concept] ?? 0) < d.unlock.min;
}

export { statusOf };
