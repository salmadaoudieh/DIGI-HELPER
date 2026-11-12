import { useStore } from '../lib/store.jsx';
import { dayLabel, t, tp } from '../lib/i18n.js';
import { activityText } from '../lib/engine.js';
import { algebraMastery, weakest, streakCount, biggestGap, buildPath, level, todayKey } from '../lib/engine.js';
import { ACHIEVEMENTS, CONCEPT, MODES } from '../lib/data.js';
import { Ring, Card, Empty, Bar, StatusPill, DemoTag } from '../components/ui.jsx';
import { Sparkline } from '../components/Charts.jsx';
import { coachMessage } from '../lib/encourage.js';
import { useState } from 'react';
import { confetti } from '../lib/fx.js';

const MOODS = [
  { id: 'stuck', emoji: '😵‍💫', label: 'Stuck', hue: '#f43f5e', say: 'Feeling stuck is the moment right before something clicks. Let’s look at it a new way — with pictures.', action: 'Try a visual lesson', go: (w) => ['learn', { concept: w, mode: 'visual' }] },
  { id: 'tired', emoji: '😴', label: 'Tired', hue: '#a855f7', say: 'Low energy is fine. Five easy minutes still counts — small steps keep your streak alive.', action: 'Do 3 easy questions', go: (w) => ['learn', { concept: w, mode: 'practice' }] },
  { id: 'okay', emoji: '🙂', label: 'Okay', hue: '#06b6d4', say: 'A steady day is a great day to learn. Your path is ready when you are.', action: 'Continue my path', go: () => ['path', {}] },
  { id: 'good', emoji: '😄', label: 'Good', hue: '#22c55e', say: 'Love that energy! Use it on the skill with the most room to grow.', action: 'Practice my weakest skill', go: (w) => ['learn', { concept: w, mode: 'interactive' }] },
  { id: 'fired', emoji: '🔥', label: 'Fired up', hue: '#f59e0b', say: 'You’re on fire — let’s put it to the test against the clock!', action: 'Take the Daily Challenge', go: () => ['challenge', {}] },
];

function MoodCheck({ weakId }) {
  const { state, setPref, nav } = useStore();
  const today = new Date().toISOString().slice(0, 10);
  const saved = state.mood?.date === today ? MOODS.find((m) => m.id === state.mood.id) : null;
  const [pick, setPick] = useState(saved);
  const choose = (m, e) => { setPick(m); setPref('mood', { date: today, id: m.id }); if (m.id === 'good' || m.id === 'fired') confetti({ el: e.currentTarget, count: 40, power: 0.7 }); };
  return (
    <section className="glass p-5 grid gap-3" aria-label={t('How are you feeling?')}>
      <div className="flex flex-wrap items-center justify-between gap-2"><h2 className="font-bold">{t('How are you feeling about learning today?')}</h2>{pick && <button className="btn btn-ghost btn-sm" onClick={() => setPick(null)}>{t('Change')}</button>}</div>
      {!pick ? (
        <div className="grid grid-cols-5 gap-2" role="radiogroup" aria-label={t('Mood')}>
          {MOODS.map((m) => (
            <button key={m.id} role="radio" aria-checked="false" onClick={(e) => choose(m, e)} data-tilt="10"
              className="panel py-3 grid place-items-center gap-1 transition hover:scale-[1.04]" style={{ '--h': m.hue, borderColor: `color-mix(in srgb, ${m.hue} 35%, transparent)`, background: `linear-gradient(160deg, color-mix(in srgb, ${m.hue} 16%, transparent), transparent)` }}>
              <span className="text-2xl sm:text-3xl" aria-hidden="true">{m.emoji}</span><span className="text-[0.7rem] sm:text-xs font-bold">{t(m.label)}</span>
            </button>
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap items-center gap-4 anim-pop">
          <span className="hue-chip w-14 h-14 text-3xl" style={{ '--h': pick.hue }} aria-hidden="true">{pick.emoji}</span>
          <p className="flex-1 min-w-[200px]">{t(pick.say)}</p>
          <button className="btn btn-primary" onClick={() => nav(...pick.go(weakId || 'linear'))}>{t(pick.action)} <span className="dir-arrow">→</span></button>
        </div>
      )}
    </section>
  );
}

function greeting() { const h = new Date().getHours(); return h < 5 ? t('Up late') : h < 12 ? t('Good morning') : h < 18 ? t('Good afternoon') : t('Good evening'); }

export default function StudentDashboard() {
  const { student: s, nav, state } = useStore();
  const name = s.profile.name.split(' ')[0];
  const alg = algebraMastery(s);
  const weak = weakest(s);
  const gap = biggestGap(s);
  const path = buildPath(s);
  const lv = level(s.xp);
  const streak = streakCount(s);
  const isDemo = state.session?.id === 'demo';
  const latestAch = Object.entries(s.achievements).sort((a, b) => String(b[1]).localeCompare(String(a[1])))[0];
  const ach = latestAch && ACHIEVEMENTS.find((a) => a.id === latestAch[0]);
  const doneToday = s.challenges.some((c) => c.date === todayKey() || (isDemo && c.date.startsWith('Day')));
  const hist = (s.journey.length ? s.journey.map((j) => j.v) : []).filter((v) => v !== null);
  const fresh = alg === null;
  const coach = coachMessage(s);

  return (
    <div className="grid gap-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="eyebrow mb-1">{t('{grade} · Level {n}', { grade: t(s.profile.grade), n: lv.level })}</div>
          <h1 className="font-display text-2xl sm:text-3xl font-semibold">{t('{greeting}, {name}.', { greeting: greeting(), name: '\u0000' }).split('\u0000').map((part, i, arr) => <span key={i}>{part}{i < arr.length - 1 && <span className="rainbow-text">{name}</span>}</span>)} <span className="block sm:inline text-[0.8em] sm:text-[1em]">{t('Welcome back — ready to level up your learning?')}</span></h1>
        </div>
        {isDemo && <DemoTag />}
      </div>

      <section className="glass relative overflow-hidden p-5 sm:p-6 grid md:grid-cols-[auto_1fr] gap-5 items-start" aria-label={t('Digi Coach')} style={{ background: 'linear-gradient(120deg, color-mix(in srgb, var(--good) 14%, var(--surface)), var(--surface) 55%, color-mix(in srgb, var(--violet) 12%, var(--surface)))' }}>
        <div className="w-14 h-14 rounded-2xl grid place-items-center text-3xl anim-float" style={{ background: 'color-mix(in srgb, var(--good) 18%, transparent)', border: '1px solid color-mix(in srgb, var(--good) 40%, transparent)' }} aria-hidden="true">🌱</div>
        <div className="grid gap-2">
          <div className="eyebrow" style={{ color: 'var(--good)' }}>{t('Digi Coach')}</div>
          <h2 className="font-display text-xl font-semibold">{coach.headline}</h2>
          <p className="text-muted max-w-2xl">{coach.body}</p>
          {coach.wins.length > 0 && (
            <ul className="flex flex-wrap gap-2 mt-1" aria-label={t('Your wins')}>
              {coach.wins.slice(0, 4).map((w) => <li key={w.text} className="panel px-3 py-1.5 text-sm"><span aria-hidden="true">{w.icon}</span> {w.text}</li>)}
            </ul>
          )}
        </div>
      </section>

      <MoodCheck weakId={weak?.id} />

      {fresh ? (
        <Card glow className="grid md:grid-cols-[1fr_auto] gap-6 items-center">
          <div>
            <div className="eyebrow mb-2">{t('Step 1 · Detect')}</div>
            <h2 className="font-display text-xl font-semibold">{t('Take your first diagnostic')}</h2>
            <p className="text-muted mt-2 max-w-xl">{t('Ten questions, about 8 minutes. Digi Helper will map what you know, find the root of any mistakes, and build your personal path.')}</p>
            <button className="btn btn-primary mt-4" onClick={() => nav('diagnostic')}>{t('Start the diagnostic →')}</button>
          </div>
          <div className="text-6xl anim-float" aria-hidden="true">🧭</div>
        </Card>
      ) : null}

      <div className="grid lg:grid-cols-[1.3fr_1fr] gap-5">
        {/* Enter DigiWorld */}
        <button onClick={() => nav('world')} data-tilt="4" className="glass glow-edge relative overflow-hidden text-start p-6 sm:p-8 min-h-[230px] group" aria-label={t('Enter DigiWorld')} style={{ background: 'linear-gradient(135deg, color-mix(in srgb, var(--p1) 22%, var(--surface)), color-mix(in srgb, var(--p3) 18%, var(--surface)) 60%, color-mix(in srgb, var(--p4) 16%, var(--surface)))' }}>
          <div className="absolute inset-0 grid-bg opacity-70" aria-hidden="true" />
          <div className="absolute -right-10 rtl:right-auto rtl:-left-10 -bottom-16 w-72 h-72 rounded-full blur-3xl opacity-50 group-hover:opacity-80 transition" style={{ background: 'radial-gradient(circle, var(--violet), transparent 70%)' }} aria-hidden="true" />
          <div className="absolute right-6 rtl:right-auto rtl:left-6 top-6 flex gap-2 text-3xl" aria-hidden="true">{['🧮', '🔬', '📚', '🌍', '💻'].map((e, i) => <span key={e} style={{ animation: `float 5s ${i * 0.5}s ease-in-out infinite` }}>{e}</span>)}</div>
          <div className="relative mt-16">
            <div className="eyebrow">{t('Your learning universe')}</div>
            <div className="font-display text-3xl sm:text-4xl font-semibold mt-1">{t('Enter DigiWorld')}</div>
            <p className="text-muted mt-2 max-w-md">{tp(s.unlocked.length, 'Five subject zones. {n} Math City district open. Lights come on as you master skills.', 'Five subject zones. {n} Math City districts open. Lights come on as you master skills.')}</p>
            <span className="btn btn-primary mt-4 pointer-events-none">{t('Enter →')}</span>
          </div>
        </button>

        {/* Mastery */}
        <Card className="grid gap-4">
          <div className="flex items-center justify-between"><h2 className="font-bold">{t('Current mastery')}</h2>{alg !== null && <StatusPill value={alg} />}</div>
          <div className="flex items-center gap-5">
            <Ring value={alg} size={128} sub={t('Algebra')} />
            <div className="flex-1 min-w-0 grid gap-2">
              {hist.length > 1 ? <><div className="text-xs text-muted">{t('Progress over time')}</div><Sparkline data={hist} color="cyan" /></> : <p className="text-sm text-muted">{t('Your progress chart starts after the diagnostic.')}</p>}
              <button className="btn btn-sm" onClick={() => nav('mind')}>{t('Open DigiMind →')}</button>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
        <Card className="grid gap-3 content-start hue-card overflow-hidden" style={{ '--h': '#f59e0b' }} data-tilt="5">
          <div className="eyebrow">{t('⚡ Today\'s Digi Challenge')}</div>
          <div className="font-semibold">{weak ? t('3 {skill} problems in 60 seconds', { skill: CONCEPT[weak.id].short.toLowerCase() }) : t('Unlocks after your diagnostic')}</div>
          <p className="text-sm text-muted">{weak ? t('Built from your weakest skill: {name}.', { name: weak.name }) : t('Your challenge is always built from your real weak spots.')}</p>
          <button className="btn btn-primary btn-sm justify-self-start" disabled={!weak} onClick={() => nav('challenge')}>{doneToday ? t('Done today ✓ — replay') : t('Start challenge')}</button>
        </Card>
        <Card className="grid gap-3 content-start hue-card overflow-hidden" style={{ '--h': '#f97316' }} data-tilt="5">
          <div className="eyebrow">{t('🔥 Learning streak')}</div>
          <div className="font-display text-3xl font-semibold tnum">{tp(streak, '{n} day', '{n} days')}</div>
          <div className="flex gap-1.5" aria-label={t('{n} of 7 days this week', { n: streak })}>{Array.from({ length: 7 }, (_, i) => <span key={i} className="h-2 flex-1 rounded-full" style={{ background: i < streak ? 'var(--warn)' : 'var(--line-strong)' }} />)}</div>
          <p className="text-xs text-muted">{t('Seven days in a row earns “Consistency”.')}</p>
        </Card>
        <Card className="grid gap-3 content-start hue-card overflow-hidden" style={{ '--h': '#f43f5e' }} data-tilt="5">
          <div className="eyebrow">{t('🎯 Weakest skill')}</div>
          {weak ? <>
            <div className="font-semibold">{weak.name}</div>
            <Bar value={s.mastery[weak.id]} label={t('{name} mastery', { name: weak.name })} />
            <div className="flex items-center justify-between"><span className="font-mono text-sm tnum">{Math.round(s.mastery[weak.id])}%</span><button className="btn btn-sm" onClick={() => nav('learn', { concept: weak.id })}>{t('Practice')}</button></div>
          </> : <p className="text-sm text-muted">{t('Not enough data yet.')}</p>}
        </Card>
        <Card className="grid gap-3 content-start hue-card overflow-hidden" style={{ '--h': 'var(--p3)' }} data-tilt="5">
          <div className="eyebrow">{t('🏅 Latest achievement')}</div>
          {ach ? <><div className="flex items-center gap-3"><span className="text-3xl" aria-hidden="true">{ach.icon}</span><div><div className="font-semibold">{ach.name}</div><div className="text-xs text-muted">{ach.desc}</div></div></div><button className="btn btn-sm justify-self-start" onClick={() => nav('achievements')}>{t('All achievements')}</button></> : <p className="text-sm text-muted">{t('Finish the diagnostic to earn “First Discovery”.')}</p>}
        </Card>
      </div>

      {gap && (
        <Card className="flex flex-wrap items-center gap-5" style={{ borderColor: 'color-mix(in srgb, var(--warn) 45%, transparent)' }}>
          <div className="text-3xl" aria-hidden="true">⚖️</div>
          <div className="flex-1 min-w-[220px]">
            <div className="eyebrow" style={{ color: 'var(--warn)' }}>{t('Learning Confidence Gap · {name}', { name: gap.concept.name })}</div>
            <p className="mt-1">{t('You feel confident with this topic, but your answers suggest you may need another review.')}</p>
          </div>
          <div className="flex gap-6 font-mono tnum"><div><div className="text-xs text-muted">{t('Confidence')}</div><div className="text-2xl font-semibold">{gap.conf}%</div></div><div><div className="text-xs text-muted">{t('Actual mastery')}</div><div className="text-2xl font-semibold text-bad">{gap.mastery}%</div></div></div>
          <button className="btn btn-sm" onClick={() => nav('learn', { concept: gap.concept.id })}>{t('Review now')}</button>
        </Card>
      )}

      <div className="grid lg:grid-cols-[1.2fr_1fr] gap-5">
        <Card>
          <div className="flex items-center justify-between mb-3"><h2 className="font-bold">{t('Recommended next')}</h2><button className="btn btn-ghost btn-sm" onClick={() => nav('path')}>{t('Full path →')}</button></div>
          {path.length ? (
            <ol className="grid gap-2">
              {path.slice(0, 3).map((p, i) => (
                <li key={p.concept.id}>
                  <button onClick={() => nav('learn', { concept: p.concept.id, mode: p.mode })} className="w-full panel p-3 flex items-center gap-3 text-start hover:border-[var(--accent)] transition">
                    <span className="font-mono text-xs pill pill-info">{i + 1}</span>
                    <div className="flex-1 min-w-0"><div className="font-semibold">{p.concept.name}</div><div className="text-xs text-muted truncate">{p.reason}</div></div>
                    <span className="text-xs text-muted hidden sm:block">{MODES[p.mode].icon} {MODES[p.mode].name}</span>
                    <span className="font-mono text-sm tnum">{p.mastery}%</span>
                  </button>
                </li>
              ))}
            </ol>
          ) : <Empty icon="✨" title={fresh ? t('Your path appears after the diagnostic') : t('Everything is mastered')}>{fresh ? t('One diagnostic is enough to build it.') : t('Explore DigiWorld to find new areas.')}</Empty>}
        </Card>
        <Card>
          <h2 className="font-bold mb-3">{t('Recent activity')}</h2>
          {s.activity.length ? (
            <ul className="grid gap-2.5">
              {s.activity.slice(0, 6).map((a, i) => (
                <li key={i} className="flex gap-3 text-sm"><span className="font-mono text-xs text-faint w-20 shrink-0 pt-0.5">{a.t.startsWith('Day') ? dayLabel(a.t) : a.t.slice(5)}</span><span>{activityText(a)}</span></li>
              ))}
            </ul>
          ) : <p className="text-sm text-muted">{t('Nothing yet — your first activity will show up here.')}</p>}
        </Card>
      </div>
    </div>
  );
}
