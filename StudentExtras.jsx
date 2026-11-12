import { useState } from 'react';
import { t, tp, dayLabel } from '../lib/i18n.js';
import { useStore } from '../lib/store.jsx';
import { CONCEPTS, ACHIEVEMENTS, AVATARS, GRADES, SUBJECTS, MODES, ALL_DISTRICTS } from '../lib/data.js';
import { level, streakCount, confidenceGap } from '../lib/engine.js';
import { clean } from '../lib/api.js';
import { PALETTES } from '../components/Fx.jsx';
import { SectionHead, Card, Empty, Stat, DemoNote } from '../components/ui.jsx';
import { LineChart, BarChart, DoughnutChart, RadarChart } from '../components/Charts.jsx';

const KIND_NAMES = {
  diagnostic: () => t('Diagnostics'), practice: () => t('Practice'), challenge: () => t('Challenges'), visual: () => t('Visual lessons'),
  interactive: () => t('Interactive games'), scan: () => t('DigiScan checks'), unlock: () => t('Unlocks'), explain: () => t('Explanations'),
};
const kindName = (k) => (KIND_NAMES[k] ? KIND_NAMES[k]() : t(k[0].toUpperCase() + k.slice(1)));

export function Analytics() {
  const { student: s, nav, state } = useStore();
  const assessed = CONCEPTS.filter((c) => s.mastery[c.id] !== null && s.mastery[c.id] !== undefined);
  if (!assessed.length) return <div className="grid gap-5"><SectionHead eyebrow={t('Analytics')} title={t('Your learning analytics')} /><Empty icon="📊" title={t('No data yet')} action={<button className="btn btn-primary" onClick={() => nav('diagnostic')}>{t('Take the diagnostic')}</button>}>{t('Charts fill in as you learn.')}</Empty></div>;
  const attempts = Object.values(s.attempts).flat();
  const acc = attempts.length ? Math.round((attempts.filter((a) => a.ok).length / attempts.length) * 100) : null;
  const mistakes = Object.values(s.mistakes).flatMap((b) => Object.values(b)).reduce((acc2, m) => { acc2[m.label] = (acc2[m.label] || 0) + m.count; return acc2; }, {});
  const topMist = Object.entries(mistakes).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const confC = assessed.filter((c) => s.confidence[c.id] !== undefined);
  const gains = assessed.map((c) => ({ c, g: Math.round((s.mastery[c.id] ?? 0) - (s.baseline[c.id] ?? s.mastery[c.id])) }));
  const avgGain = gains.length ? Math.round(gains.reduce((a, x) => a + x.g, 0) / gains.length) : 0;
  const kinds = s.activity.reduce((a, x) => { a[x.kind] = (a[x.kind] || 0) + 1; return a; }, {});
  const longest = Object.values(s.history).reduce((a, h) => (h.length > a.length ? h : a), []);
  const isDemo = state.session?.id === 'demo';

  return (
    <div className="grid gap-5">
      <SectionHead eyebrow={t('Analytics')} title={t('Your learning analytics')} desc={t('Mastery, accuracy, confidence and the mistakes that matter — only compared with your own past self.')} />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Stat label={t('Accuracy')} value={acc === null ? '—' : `${acc}%`} sub={tp(attempts.length, '{n} answer', '{n} answers')} />
        <Stat label={t('Improvement rate')} value={t('{n} pts', { n: `${avgGain >= 0 ? '+' : ''}${avgGain}` })} sub={t('avg per concept since baseline')} tone={avgGain >= 0 ? 'var(--good)' : 'var(--bad)'} />
        <Stat label={t('Activities')} value={s.activity.length} sub={t('completed')} />
        <Stat label={t('Streak')} value={tp(streakCount(s), '{n} day', '{n} days')} />
      </div>
      <div className="grid lg:grid-cols-2 gap-5">
        <Card><h2 className="font-bold mb-3">{t('Mastery over time')}</h2>
          <LineChart labels={longest.map((h) => dayLabel(h.d))} series={CONCEPTS.filter((c) => ['neg', 'linear', 'distrib', 'ineq'].includes(c.id) && s.history[c.id]?.length).map((c, i) => ({ label: c.short, data: longest.map((h) => s.history[c.id].find((x) => x.d === h.d)?.v ?? null), color: ['bad', 'cyan', 'violet', 'warn'][i], fill: false }))} height={260} legend />
        </Card>
        <Card><h2 className="font-bold mb-3">{t('Topic performance')}</h2>
          <BarChart horizontal labels={assessed.map((c) => c.short)} series={[{ label: t('Mastery'), data: assessed.map((c) => Math.round(s.mastery[c.id])) }]} colors={assessed.map((c) => (s.mastery[c.id] >= 75 ? 'good' : s.mastery[c.id] >= 50 ? 'warn' : 'bad'))} height={300} />
        </Card>
        <Card><h2 className="font-bold mb-1">{t('Confidence vs performance')}</h2><p className="text-xs text-muted mb-3">{t('Where the purple reaches past the blue, you feel surer than your results show.')}</p>
          {confC.length ? <RadarChart labels={confC.map((c) => c.short)} series={[{ label: t('Confidence'), data: confC.map((c) => Math.round(s.confidence[c.id])), color: 'violet' }, { label: t('Mastery'), data: confC.map((c) => Math.round(s.mastery[c.id])), color: 'cyan' }]} height={300} /> : <p className="text-sm text-muted">{t('Rate your confidence in the diagnostic or practice to see this.')}</p>}
          {confC.filter((c) => confidenceGap(s, c.id) >= 20).length > 0 && <p className="text-sm mt-2"><strong className="text-warn">{t('Confidence gaps:')}</strong> {confC.filter((c) => confidenceGap(s, c.id) >= 20).map((c) => c.short).join(', ')}</p>}
        </Card>
        <Card><h2 className="font-bold mb-3">{t('Common mistakes')}</h2>
          {topMist.length ? <DoughnutChart labels={topMist.map((x) => t(x[0]))} data={topMist.map((x) => x[1])} colors={['bad', 'warn', 'violet', 'cyan', 'accent']} height={280} /> : <p className="text-sm text-muted">{t('No mistakes recorded yet.')}</p>}
        </Card>
        <Card className="lg:col-span-2"><h2 className="font-bold mb-3">{t('Completed activities')}</h2>
          <BarChart y100={false} labels={Object.keys(kinds).map((k) => kindName(k))} series={[{ label: t('Activities'), data: Object.values(kinds), color: 'accent' }]} height={200} />
        </Card>
      </div>
      {isDemo && <DemoNote />}
    </div>
  );
}

export function Achievements() {
  const { student: s } = useStore();
  const lv = level(s.xp);
  const progress = {
    'first-discovery': [s.diagnoses.length ? 1 : 0, 1], 'mistake-master': [Math.min(10, s.counters.fixedRepeats || 0), 10], consistency: [Math.min(7, streakCount(s)), 7],
    breakthrough: [Math.max(0, Math.min(20, Math.max(0, ...CONCEPTS.map((c) => (s.mastery[c.id] ?? 0) - (s.baseline[c.id] ?? s.mastery[c.id] ?? 0))))), 20], challenger: [Math.min(1, s.challenges.length), 1],
    scanner: [Math.min(1, s.counters.scans || 0), 1], 'self-aware': [Math.min(5, s.counters.calibrated || 0), 5], unlocker: [s.unlocked.some((u) => ALL_DISTRICTS.find((d) => d.id === u)?.unlock) ? 1 : 0, 1],
    'all-rounder': [['math', 'science', 'language', 'social', 'tech'].filter((sj) => (s.diagSubjects || []).includes(sj)).length, 5],
  };
  return (
    <div className="grid gap-5">
      <SectionHead eyebrow={t('Progress')} title={t('Achievements & skill levels')} desc={t('Rewards for personal progress only. There are no leaderboards — the only person you compete with is your past self.')} />
      <Card glow className="grid sm:grid-cols-[auto_1fr] gap-6 items-center">
        <div className="w-28 h-28 rounded-3xl grid place-items-center relative" style={{ background: 'linear-gradient(135deg, var(--accent), var(--violet))' }}>
          <div className="text-center text-white"><div className="text-xs font-bold uppercase tracking-wider opacity-80">{t('Level')}</div><div className="font-display text-4xl font-semibold">{lv.level}</div></div>
        </div>
        <div className="grid gap-2">
          <div className="font-display text-2xl font-semibold tnum">{t('{n} XP', { n: s.xp })}</div>
          <div className="bar" style={{ height: 10 }}><span style={{ width: `${(lv.into / lv.need) * 100}%`, background: 'linear-gradient(90deg,var(--cyan),var(--violet))' }} /></div>
          <div className="text-sm text-muted">{t('{xp} XP to level {n}. XP comes from learning: correct answers, fixing mistakes, finishing challenges.', { xp: lv.need - lv.into, n: lv.level + 1 })}</div>
        </div>
      </Card>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {ACHIEVEMENTS.map((a) => {
          const got = s.achievements[a.id]; const [p, tot] = progress[a.id] || [0, 1];
          return (
            <div key={a.id} data-tilt="12" className={`glass p-5 grid gap-2 content-start overflow-hidden ${got ? 'glow-edge' : ''}`} style={{ ...(got ? { background: `linear-gradient(160deg, color-mix(in srgb, ${['#3b82f6', '#a855f7', '#f59e0b', '#ec4899', '#22c55e', '#06b6d4', '#f43f5e', '#eab308'][ACHIEVEMENTS.indexOf(a)]} 22%, var(--surface)), var(--surface))` } : { opacity: 0.85 }) }}>
              <div className={`text-4xl ${got ? 'anim-float' : ''}`} style={got ? undefined : { filter: 'grayscale(1)', opacity: 0.5 }} aria-hidden="true">{a.icon}</div>
              <div className="font-display font-semibold">{a.name}</div>
              <div className="text-sm text-muted">{a.desc}</div>
              {got ? <span className="pill pill-good justify-self-start">{t('✓ Earned · {date}', { date: dayLabel(got) })}</span> : <><div className="bar"><span style={{ width: `${(p / tot) * 100}%`, background: 'var(--cyan)' }} /></div><span className="text-xs text-muted font-mono">{Math.round(p)}/{tot} · {t('+{n} XP', { n: a.xp })}</span></>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function Profile() {
  const { student: s, updateProfile, resetStudent, state, toast, setPref } = useStore();
  const [f, setF] = useState(s.profile);
  const [confirm, setConfirm] = useState(false);
  const isDemo = state.session?.id === 'demo';
  return (
    <div className="grid gap-5 max-w-3xl">
      <SectionHead eyebrow={t('Profile')} title={t('Profile & settings')} desc={t('Digi Helper stores only what it needs to personalize learning: a name, grade, subjects, how you like to learn and your progress.')} />
      <Card className="grid gap-4">
        <div><label className="label" htmlFor="p-name">{t('Name')}</label><input id="p-name" className="input" value={f.name} maxLength={40} onChange={(e) => setF({ ...f, name: e.target.value })} disabled={isDemo} /></div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div><label className="label" htmlFor="p-grade">{t('Grade')}</label><select id="p-grade" className="input" value={f.grade} onChange={(e) => setF({ ...f, grade: e.target.value })}>{GRADES.map((g) => <option key={g} value={g}>{t(g)}</option>)}</select></div>
          <div><span className="label">{t('Avatar')}</span><div className="flex flex-wrap gap-1.5">{AVATARS.map((a) => <button key={a} type="button" aria-pressed={f.avatar === a} aria-label={t('Avatar {emoji}', { emoji: a })} onClick={() => setF({ ...f, avatar: a })} className={`w-9 h-9 rounded-lg panel ${f.avatar === a ? 'ring-2 ring-[var(--accent)]' : ''}`}>{a}</button>)}</div></div>
        </div>
        <div><span className="label">{t('Subjects')}</span><div className="flex flex-wrap gap-2">{SUBJECTS.map((x) => <button key={x} className="chip" aria-pressed={f.subjects?.includes(x)} onClick={() => setF({ ...f, subjects: f.subjects?.includes(x) ? f.subjects.filter((y) => y !== x) : [...(f.subjects || []), x] })}>{t(x)}</button>)}</div></div>
        <div><span className="label">{t('Learning preference')}</span><div className="flex flex-wrap gap-2">{Object.values(MODES).map((mo) => <button key={mo.id} className="chip" aria-pressed={f.preference === mo.id} onClick={() => setF({ ...f, preference: mo.id })}>{mo.icon} {mo.name}</button>)}</div></div>
        <button className="btn btn-primary justify-self-start" onClick={() => { updateProfile({ ...f, name: clean(f.name, 40) || s.profile.name }); toast(t('Profile saved'), 'good'); }}>{t('Save profile')}</button>
      </Card>
      <Card className="grid gap-3">
        <h2 className="font-bold">{t('Look & accessibility')}</h2>
        <div className="flex flex-wrap items-center gap-3"><span className="text-sm">{t('Colours')}</span>{PALETTES.map((p) => <button key={p.id} className="chip" aria-pressed={(state.palette || 'ocean') === p.id} onClick={() => setPref('palette', p.id)}><span className="flex -space-x-1" aria-hidden="true">{p.colors.map((c) => <span key={c} className="w-3 h-3 rounded-full" style={{ background: c }} />)}</span>{t(p.name)}</button>)}</div>
        <div className="flex flex-wrap items-center gap-3"><span className="text-sm">{t('Text size')}</span>{[0.9, 1, 1.15, 1.3].map((v) => <button key={v} className="chip" aria-pressed={state.textScale === v} onClick={() => setPref('textScale', v)}>{Math.round(v * 100)}%</button>)}</div>
        <div className="flex flex-wrap items-center gap-3"><span className="text-sm">{t('Theme')}</span>{['system', 'dark', 'light'].map((v) => <button key={v} className="chip" aria-pressed={state.theme === v} onClick={() => setPref('theme', v)}>{v === 'system' ? t('Match device') : v === 'dark' ? t('Dark') : t('Light')}</button>)}</div>
        <p className="text-xs text-muted">{t('Status is always shown with an icon and a word, never by color alone. All controls work with the keyboard.')}</p>
      </Card>
      <Card className="grid gap-3">
        <h2 className="font-bold">{t('Your data')}</h2>
        <p className="text-sm text-muted">{state.session?.token ? t('Progress is saved to your Digi Helper account. No email, birthday, location or phone number is collected.') : t('Progress is saved in this browser. No email, birthday, location or phone number is collected.')}</p>
        {!confirm ? <button className="btn justify-self-start" onClick={() => setConfirm(true)}>{t('Reset my progress')}</button> : (
          <div className="panel p-3 flex flex-wrap items-center gap-3" role="alert"><span className="text-sm">{t('This clears mastery, history and achievements. Continue?')}</span><button className="btn btn-sm" style={{ borderColor: 'var(--bad)', color: 'var(--bad)' }} onClick={() => { resetStudent(); setConfirm(false); toast(t('Progress reset')); }}>{t('Yes, reset')}</button><button className="btn btn-ghost btn-sm" onClick={() => setConfirm(false)}>{t('Cancel')}</button></div>
        )}
      </Card>
    </div>
  );
}
