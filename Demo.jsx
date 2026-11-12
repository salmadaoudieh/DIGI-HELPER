import { useStore, DEMO_STEPS } from '../lib/store.jsx';
import { Logo, Controls } from '../components/Shell.jsx';
import { DEMO_NOTE } from '../lib/data.js';
import { t } from '../lib/i18n.js';

// Built at render time so the text follows the current language. `id` stays English (it matches DEMO_STEPS phases).
const phases = () => [
  { id: 'Problem', color: 'var(--bad)', text: t('A student gets 4/10. A score alone says nothing about why.') },
  { id: 'Detection', color: 'var(--warn)', text: t('Mistake Detective and DigiMind find the root cause: negatives.') },
  { id: 'Intervention', color: 'var(--cyan)', text: t('A personalized path, interactive practice and a targeted challenge.') },
  { id: 'Improvement', color: 'var(--good)', text: t('Reassessment shows 38% → 81%, and the teacher sees it.') },
];

export default function Demo() {
  const { demoGo, nav } = useStore();
  const PHASES = phases();
  return (
    <div className="app-bg min-h-screen">
      <header className="gutter py-4 max-w-[1100px] mx-auto flex items-center"><button onClick={() => nav('home')} aria-label={t('Digi Helper home')}><Logo /></button><div className="ms-auto"><Controls compact /></div></header>
      <main id="main" className="gutter max-w-[1100px] mx-auto py-8 grid gap-8">
        <div className="grid gap-3 max-w-3xl">
          <span className="pill pill-violet justify-self-start">{t('Competition Demo Mode')}</span>
          <h1 className="font-display text-3xl sm:text-5xl font-semibold leading-tight">{t('One student. Ten steps.')} <span className="gradient-text">{t('The whole idea in four minutes.')}</span></h1>
          <p className="text-muted text-lg">{t('Follow Demo Student from a disappointing diagnostic to measurable improvement. A bar at the top of the screen guides each step, with a one-line script for the presenter.')}</p>
          <div className="flex flex-wrap gap-3 mt-2"><button className="btn btn-primary btn-lg" onClick={() => demoGo(0)}>{t('▶ Start the demo')}</button><button className="btn btn-lg" onClick={() => nav('home')}>{t('Back to home')}</button></div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {PHASES.map((p, i) => (
            <div key={p.id} className="glass p-5 grid gap-2 content-start" style={{ borderTop: `3px solid ${p.color}` }}>
              <div className="font-mono text-xs text-muted">{t('{n} of {total}', { n: i + 1, total: 4 })}</div>
              <div className="font-display text-xl font-semibold" style={{ color: p.color }}>{t(p.id)}</div>
              <p className="text-sm text-muted">{p.text}</p>
            </div>
          ))}
        </div>
        <ol className="grid md:grid-cols-2 gap-2">
          {DEMO_STEPS.map((s, i) => (
            <li key={i}>
              <button onClick={() => demoGo(i)} className="w-full glass p-4 flex items-start gap-4 text-start hover:-translate-y-0.5 transition">
                <span className="font-display text-lg font-semibold text-cyan tnum w-7">{i + 1}</span>
                <span className="min-w-0"><span className="font-semibold block">{t(s.title)} <span className="text-xs text-muted font-mono">· {t(s.phase)}</span></span><span className="text-sm text-muted">{t(s.say)}</span></span>
              </button>
            </li>
          ))}
        </ol>
        <p className="text-xs text-faint">ⓘ {t(DEMO_NOTE)}</p>
      </main>
    </div>
  );
}
