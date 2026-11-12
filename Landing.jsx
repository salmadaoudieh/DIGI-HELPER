import { useEffect, useState } from 'react';
import { useStore } from '../lib/store.jsx';
import { Logo, Controls } from '../components/Shell.jsx';
import DigiMindMap from '../components/DigiMindMap.jsx';
import { PRESET_BEFORE, PRESET_AFTER, DEMO_NOTE, ZONES } from '../lib/data.js';
import { LineChart } from '../components/Charts.jsx';
import { Constellation } from '../components/Fx.jsx';
import { t, getLang } from '../lib/i18n.js';

// Built at render time so the labels follow the current language.
const CYCLE_LEN = 6;
const cycle = () => [t('Detect'), t('Understand'), t('Adapt'), t('Teach'), t('Challenge'), t('Measure')];
const steps = () => [
  { title: t('Take a diagnostic'), d: t('Ten quick questions, with a confidence rating before the important ones.') },
  { title: t('Discover your learning gaps'), d: t('DigiMind maps every concept and traces mistakes back to their root.') },
  { title: t('Get a personalized learning path'), d: t('Foundations first, each step in the learning mode that suits the mistake.') },
  { title: t('Practice interactively'), d: t('Balance games, number-line jumps, adaptive practice and a tutor that teaches.') },
  { title: t('Measure your improvement'), d: t('Before → after mastery, confidence calibration and a journey you can see.') },
];
const why = () => [
  { hue: '#3b82f6', icon: '🧭', title: t('Personalized learning'), d: t('Every student gets a different path, built from their own answers.') },
  { hue: '#a855f7', icon: '🔎', title: t('AI-powered mistake analysis'), d: t('Mistake Detective explains which step went wrong and why.') },
  { hue: '#06b6d4', icon: '🌐', title: t('Interactive learning worlds'), d: t('DigiWorld zones light up and unlock as skills grow.') },
  { hue: '#ec4899', icon: '🧠', title: t('Student progress intelligence'), d: t('Mastery, confidence, timing and patterns — not just a score.') },
  { hue: '#f59e0b', icon: '🏫', title: t('Teacher analytics'), d: t('Classroom Pulse shows what the class believes vs. what it knows.') },
  { hue: '#22c55e', icon: '📈', title: t('Measurable improvement'), d: t('Reassessment shows the change, concept by concept.') },
];
const features = () => [
  [t('DigiWorld'), t('Subjects as explorable zones that unlock with mastery.')],
  [t('DigiMind'), t('A living map of what you know and what is connected.')],
  [t('Mistake Detective'), t('Turns “wrong” into “here is the exact step”.')],
  [t('DigiScan'), t('Photo of handwritten work → the step that needs attention.')],
  [t('Classroom Pulse'), t('Confidence vs. mastery for the whole class.')],
  [t('Confidence vs Knowledge'), t('Catches the gap between feeling sure and being right.')],
  [t('Before → After Journey'), t('The improvement, plotted day by day.')],
];

export default function Landing() {
  const { nav, state, enterDemoStudent } = useStore();
  const [stage, setStage] = useState(0);
  const [cyc, setCyc] = useState(0);
  useEffect(() => { const tm = setInterval(() => setStage((s) => (s + 1) % 2), 3200); const c = setInterval(() => setCyc((s) => (s + 1) % CYCLE_LEN), 1400); return () => { clearInterval(tm); clearInterval(c); }; }, []);
  const heroMastery = stage === 0 ? PRESET_BEFORE : PRESET_AFTER;
  const signedIn = state.session;
  const CYCLE = cycle(); const STEPS = steps(); const WHY = why(); const FEATURES = features();

  return (
    <div className="min-h-screen overflow-hidden">
      <header className="gutter py-4 max-w-[1240px] mx-auto flex items-center gap-4">
        <Logo />
        <nav className="hidden md:flex gap-1 ms-6 text-sm" aria-label={t('Landing')}>
          <button className="btn btn-ghost btn-sm" onClick={() => document.getElementById('how')?.scrollIntoView({ behavior: 'smooth' })}>{t('How it works')}</button>
          <button className="btn btn-ghost btn-sm" onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}>{t('Features')}</button>
          <button className="btn btn-ghost btn-sm" onClick={() => nav('demo')}>{t('Competition demo')}</button>
        </nav>
        <div className="ms-auto flex items-center gap-2">
          <Controls compact />
          <button className="btn btn-sm hidden sm:inline-flex" onClick={() => (signedIn ? nav(signedIn.role === 'teacher' ? 'teacher' : 'dashboard') : nav('login'))}>{signedIn ? t('Open app') : t('Sign in')}</button>
        </div>
      </header>

      {/* HERO */}
      <section className="relative">
      <Constellation />
      <div className="relative gutter max-w-[1240px] mx-auto pt-8 pb-16 grid lg:grid-cols-[1.05fr_1fr] gap-10 items-center">
        <div className="anim-up">
          <div className="inline-flex items-center gap-2 panel px-3 py-1.5 text-xs font-semibold mb-6">
            <span className="w-2 h-2 rounded-full bg-cyan" style={{ boxShadow: '0 0 10px var(--cyan)' }} />
            <span className="font-mono tracking-wider text-muted">{CYCLE.map((c, i) => <span key={i} className={i === cyc ? 'text-fg' : ''}>{c}{i < CYCLE.length - 1 ? ' → ' : ''}</span>)}</span>
          </div>
          <h1 className="font-display font-semibold leading-[1.02] text-[2.6rem] sm:text-6xl">{t('Digi Helper')}</h1>
          <p className="font-display text-2xl sm:text-3xl font-medium mt-3 rainbow-text">{t('Learn smarter. Discover your potential.')}</p>
          <p className="text-muted text-lg mt-5 max-w-xl">{t('An intelligent learning environment that understands how you learn, detects where you struggle, and creates a personalized path to help you improve.')}</p>
          <div className="flex flex-wrap gap-3 mt-8">
            <button className="btn btn-primary btn-lg" onClick={() => nav('login')}>{t('Start Learning →')}</button>
            <button className="btn btn-lg" onClick={() => document.getElementById('how')?.scrollIntoView({ behavior: 'smooth' })}>{t('Explore Digi Helper')}</button>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2 mt-6 text-sm">
            <button className="text-cyan font-semibold hover:underline" onClick={() => nav('demo')}>{t('▶ Run the competition demo')}</button>
            <button className="text-muted font-semibold hover:text-fg" onClick={enterDemoStudent}>{t('Try as Demo Student')}</button>
          </div>
        </div>

        <div className="relative">
          <div className="glass glow-edge p-4 sm:p-5 anim-float" data-tilt="5">
            <div className="flex items-center justify-between mb-2">
              <div><div className="eyebrow">{t('DigiMind · live map')}</div><div className="font-semibold">{stage === 0 ? t('Day 1 — gaps detected') : t('Day 7 — after a personalized path')}</div></div>
              <span className={`pill ${stage === 0 ? 'pill-bad' : 'pill-good'}`}>{t('Algebra {pct}', { pct: stage === 0 ? '38%' : '81%' })}</span>
            </div>
            <DigiMindMap mastery={heroMastery} mini focus={stage === 0 ? 'neg' : null} />
          </div>
          <div className="hidden sm:grid absolute -bottom-10 -left-6 rtl:left-auto rtl:-right-6 glass p-3 grid-cols-5 gap-2 w-[340px]" aria-label={t('DigiWorld zones')}>
            {ZONES.map((z, i) => (
              <div key={z.id} className="grid place-items-center gap-1 text-center">
                <div className="w-12 h-12 rounded-2xl grid place-items-center text-2xl" style={{ background: `color-mix(in srgb, ${z.hue} 18%, transparent)`, border: `1px solid color-mix(in srgb, ${z.hue} 40%, transparent)`, animation: `float 5s ${i * 0.4}s ease-in-out infinite` }} aria-hidden="true">{z.icon}</div>
                <div className="text-[0.62rem] leading-tight text-muted font-semibold">{getLang() === 'en' ? z.name.split(' ')[0] : z.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      </section>

      {/* HOW */}
      <section id="how" className="gutter max-w-[1240px] mx-auto py-16">
        <div className="eyebrow mb-2">{t('How it works')}</div>
        <h2 className="font-display text-3xl sm:text-4xl font-semibold max-w-2xl">{t('From one diagnostic to measurable improvement')}</h2>
        <ol className="grid md:grid-cols-5 gap-3 mt-10">
          {STEPS.map((s, i) => (
            <li key={i} className="glass p-5 relative hue-card overflow-visible" style={{ '--h': ['#3b82f6', '#a855f7', '#ec4899', '#f59e0b', '#22c55e'][i] }} data-tilt="8">
              <div className="hue-chip w-10 h-10 font-display font-semibold mb-3" style={{ '--h': ['#3b82f6', '#a855f7', '#ec4899', '#f59e0b', '#22c55e'][i] }}>{i + 1}</div>
              <h3 className="font-display font-semibold text-lg leading-snug">{s.title}</h3>
              <p className="text-muted text-sm mt-2">{s.d}</p>
              {i < STEPS.length - 1 && <span className="hidden md:block absolute -right-3 rtl:right-auto rtl:-left-3 top-1/2 -translate-y-1/2 z-10 text-cyan dir-arrow" aria-hidden="true">→</span>}
            </li>
          ))}
        </ol>
      </section>

      {/* BEFORE → AFTER */}
      <section className="gutter max-w-[1240px] mx-auto py-16 grid lg:grid-cols-2 gap-8 items-center">
        <div>
          <div className="eyebrow mb-2">{t('The transformation')}</div>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold">{t('Same student. Seven days. A different story.')}</h2>
          <p className="text-muted mt-4 max-w-lg">{t('The diagnostic found the root problem: negative numbers inside multi-step equations. A targeted path fixed the foundation first, then rebuilt the skills that depend on it.')}</p>
          <div className="grid grid-cols-2 gap-3 mt-8 max-w-md">
            <div className="glass p-5"><div className="text-xs text-muted font-bold uppercase tracking-wider">{t('Before')}</div><div className="font-display text-4xl font-semibold text-bad tnum mt-1">38%</div><div className="text-sm text-muted">{t('Algebra mastery · Day {n}', { n: 1 })}</div></div>
            <div className="glass glow-edge p-5"><div className="text-xs text-muted font-bold uppercase tracking-wider">{t('After')}</div><div className="font-display text-4xl font-semibold text-good tnum mt-1">81%</div><div className="text-sm text-muted">{t('Algebra mastery · Day {n}', { n: 7 })}</div></div>
          </div>
          <p className="text-xs text-faint mt-4">ⓘ {t(DEMO_NOTE)}</p>
        </div>
        <div className="glass p-5">
          <LineChart labels={[1, 2, 3, 4, 5, 6, 7].map((n) => t('Day {n}', { n }))} series={[{ label: t('Algebra mastery'), data: [38, 44, 53, 61, 68, 75, 81], color: 'cyan' }]} height={280} />
        </div>
      </section>

      {/* WHY */}
      <section className="gutter max-w-[1240px] mx-auto py-16">
        <div className="eyebrow mb-2">{t('Why Digi Helper?')}</div>
        <h2 className="font-display text-3xl sm:text-4xl font-semibold max-w-3xl">{t("It doesn't just say right or wrong. It understands why.")}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-10">
          {WHY.map((w) => (
            <div key={w.icon} className="glass p-5 flex gap-4 hue-card overflow-hidden" style={{ '--h': w.hue }} data-tilt="7">
              <div className="hue-chip w-12 h-12 text-2xl" style={{ '--h': w.hue }} aria-hidden="true">{w.icon}</div>
              <div><h3 className="font-bold">{w.title}</h3><p className="text-muted text-sm mt-1">{w.d}</p></div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="gutter max-w-[1240px] mx-auto py-16">
        <div className="glass p-6 sm:p-10 grid lg:grid-cols-[0.9fr_1.1fr] gap-8">
          <div>
            <div className="eyebrow mb-2">{t('Signature features')}</div>
            <h2 className="font-display text-3xl font-semibold">{t('Seven ideas, one learning loop')}</h2>
            <p className="text-muted mt-3">{t('Each feature feeds the same student model, so a mistake on Monday changes what you see on Tuesday.')}</p>
            <div className="flex flex-wrap gap-3 mt-6"><button className="btn btn-primary" onClick={() => nav('demo')}>{t('Watch the 10-step demo')}</button><button className="btn" onClick={() => nav('login')}>{t('Create an account')}</button></div>
          </div>
          <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-4">
            {FEATURES.map(([name, d], i) => <li key={i} className="border-s-[3px] ps-4" style={{ borderColor: ['#3b82f6', '#a855f7', '#ec4899', '#06b6d4', '#f59e0b', '#22c55e', '#f43f5e'][i] }}><div className="font-display font-semibold">{name}</div><div className="text-sm text-muted">{d}</div></li>)}
          </ul>
        </div>
      </section>

      <footer className="gutter max-w-[1240px] mx-auto py-10 border-t border-line text-sm text-muted flex flex-wrap gap-4 justify-between">
        <Logo size={26} />
        <p className="max-w-xl">{t('Digi Helper is a student innovation project. Demo figures are simulated and labelled as such; the platform has not been scientifically validated.')}</p>
      </footer>
    </div>
  );
}
