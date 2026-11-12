// Digi Coach: encouragement grounded in the student's real progress.
// Praise effort and strategy, never "being smart"; frame mistakes as part of learning.
import { CONCEPTS } from './data.js';
import { streakCount, algebraMastery } from './engine.js';
import { t, tp } from './i18n.js';

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Built at call time so the current language is used.
export const mistakeCheers = () => [
  t('Every mistake you look at closely is a step forward. That’s how brains grow.'),
  t('Getting it wrong first means you’re working at the edge of what you know. That’s the best place to learn.'),
  t('Mistakes aren’t failures — they’re clues. And you’re about to solve this one.'),
  t('Even great mathematicians get this wrong at first. What matters is what you do next.'),
  t('You tried, and now we know exactly what to fix. That’s real progress.'),
];

export const correctCheers = () => [
  t('Your practice is paying off.'), t('That’s the method working — nice.'), t('Steady and correct. Keep that rhythm.'),
  t('You used the right strategy.'), t('Look at you go!'),
];

// Getters so STREAK_CHEERS[n] is translated whenever it is read.
export const STREAK_CHEERS = {
  get 3() { return t('3 in a row! Your focus is really showing.'); },
  get 5() { return t('5 in a row — this skill is clicking for you.'); },
  get 8() { return t('8 in a row! You’re making this look easy.'); },
};

export function mistakeCheer() { return pick(mistakeCheers()); }
export function correctCheer() { return pick(correctCheers()); }

/** Real "wins" from the student's data, most meaningful first. */
export function wins(s) {
  const out = [];
  const gains = CONCEPTS.map((c) => ({ c, g: Math.round((s.mastery[c.id] ?? 0) - (s.baseline[c.id] ?? s.mastery[c.id] ?? 0)) }))
    .filter((x) => x.g >= 3).sort((a, b) => b.g - a.g);
  gains.slice(0, 2).forEach((x) => out.push({ icon: '📈', text: tp(x.g, '{name} is up {n} point since you started.', '{name} is up {n} points since you started.', { name: x.c.name }) }));
  if (s.counters?.fixedRepeats) out.push({ icon: '🔎', text: tp(s.counters.fixedRepeats, 'You turned {n} mistake into a correct answer.', 'You turned {n} mistakes into correct answers.') });
  const st = streakCount(s); if (st >= 2) out.push({ icon: '🔥', text: t('{n} days of learning in a row.', { n: st }) });
  const mastered = CONCEPTS.filter((c) => (s.mastery[c.id] ?? 0) >= 75);
  if (mastered.length === 1) out.push({ icon: '✅', text: t('You\'ve mastered 1 concept: {a}.', { a: mastered[0].short }) });
  else if (mastered.length === 2) out.push({ icon: '✅', text: t('You\'ve mastered 2 concepts: {a} and {b}.', { a: mastered[0].short, b: mastered[1].short }) });
  else if (mastered.length) out.push({ icon: '✅', text: t('You\'ve mastered {n} concepts.', { n: mastered.length }) });
  const answered = Object.values(s.attempts || {}).flat().filter((a) => a.t > 1e12).length;
  if (answered >= 5) out.push({ icon: '💪', text: t('{n} questions answered — that effort adds up.', { n: answered }) });
  if (s.diagnoses?.length && !out.length) out.push({ icon: '🧭', text: t('You took the first step: your diagnostic is done.') });
  return out;
}

/** The coach's message for today. */
export function coachMessage(s) {
  const name = s.profile.name.split(' ')[0];
  const alg = algebraMastery(s);
  const first = s.journey?.[0]?.v;
  const w = wins(s);
  if (alg === null) return { headline: t('Every expert started as a beginner, {name}.', { name }), body: t('Your first diagnostic isn’t a test you pass or fail — it just shows us where to start. Take it at your own pace.'), wins: w };
  if (first !== undefined && alg - first >= 20) return { headline: t('{name}, look how far you\'ve come!', { name }), body: t('You started at {first}% and you\'re at {now}% now. That didn\'t happen by luck — it came from every practice question and every mistake you fixed.', { first, now: alg }), wins: w };
  if (first !== undefined && alg > first) return { headline: t('You\'re growing, {name}.', { name }), body: t('Algebra went from {first}% to {now}%. Small steps every day turn into big results.', { first, now: alg }), wins: w };
  const weakNegatives = (s.mastery.neg ?? 100) < 50;
  return {
    headline: pick([t('You\'ve got this, {name}.', { name }), t('Today is a great day to grow, {name}.', { name }), t('One step at a time, {name}.', { name })]),
    body: weakNegatives
      ? t('Negative numbers trip up almost everyone at first. Now we know exactly what to work on — and that’s the hardest part done.')
      : t('Knowing where you struggle is a superpower. Your path is built around it, so every minute you spend counts.'),
    wins: w,
  };
}
