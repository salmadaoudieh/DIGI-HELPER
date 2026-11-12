import { useEffect, useRef, useState } from 'react';
import { confetti, celebrate } from '../lib/fx.js';
import { useStore } from '../lib/store.jsx';
import { weakest, recordAttempt, logActivity, todayKey } from '../lib/engine.js';
import { questionFor, checkAnswer } from '../lib/questions.js';
import { CONCEPT } from '../lib/data.js';
import { SectionHead, Card, Ring, Empty, Stat } from '../components/ui.jsx';
import { AnswerInput } from '../components/Detective.jsx';
import { t, tp } from '../lib/i18n.js';

const DURATION = 60; const TARGET = 3;

export default function Challenge() {
  const { student: s, updateStudent, nav, state } = useStore();
  const w = weakest(s);
  const skill = w?.id === 'linear' ? 'neg' : (w?.id || 'neg');
  const [phase, setPhase] = useState('ready');
  const [left, setLeft] = useState(DURATION);
  const [q, setQ] = useState(() => questionFor(skill, 1));
  const [val, setVal] = useState(''); const [flash, setFlash] = useState(null);
  const [log, setLog] = useState([]);
  const [summary, setSummary] = useState(null);
  const before = useRef(null);
  const logRef = useRef([]);
  const isDemo = state.session?.id === 'demo';
  const doneToday = s.challenges.some((c) => c.date === todayKey());

  useEffect(() => {
    if (phase !== 'run') return undefined;
    if (left <= 0) { end(); return undefined; }
    const timer = setTimeout(() => setLeft((l) => l - 1), 1000);
    return () => clearTimeout(timer);
  }, [phase, left]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!w) return <div className="grid gap-5"><SectionHead eyebrow={t('⚡ Daily Digi Challenge')} title={t('Today\'s Digi Challenge')} /><Empty icon="⚡" title={t('Your first challenge unlocks after the diagnostic')} action={<button className="btn btn-primary" onClick={() => nav('diagnostic')}>{t('Take the diagnostic')}</button>}>{t('Challenges are always built from your real weak spots.')}</Empty></div>;

  function start() { before.current = s.mastery[skill]; setLog([]); logRef.current = []; setLeft(DURATION); setQ(questionFor(skill, 1)); setVal(''); setPhase('run'); }
  function submit() {
    const r = checkAnswer(q, val); if (r.invalid) return;
    const entry = { ok: r.ok, q: q.display, a: val };
    logRef.current = [...logRef.current, entry]; setLog(logRef.current); setFlash(r.ok ? 'ok' : 'no');
    updateStudent((st) => recordAttempt(st, q.skill, { ok: r.ok, mis: r.mis || r.generic, difficulty: 2 }));
    setTimeout(() => setFlash(null), 400);
    setQ(questionFor(skill, 1)); setVal('');
  }
  function end() {
    setPhase('done');
    const l = logRef.current;
    const correct = l.filter((x) => x.ok).length; const acc = l.length ? Math.round((correct / l.length) * 100) : 0;
    const prev = s.challenges[0];
    const xp = (correct >= TARGET ? 60 : 20) + correct * 10;
    updateStudent((st) => {
      const repeat = st.challenges.some((c) => c.date === todayKey());
      st.challenges.unshift({ date: isDemo ? 'Day 5' : todayKey(), score: correct, total: l.length, acc, xp: repeat ? 0 : xp, skill });
      if (!repeat) st.xp += xp;
      logActivity(st, 'Daily Digi Challenge: {score}/{total} in 60 seconds', 'challenge', { score: correct, total: l.length });
    });
    setSummary({ correct, total: l.length, acc, xp: doneToday ? 0 : xp, prevAcc: prev?.acc ?? null });
    if (correct >= TARGET) celebrate(); else if (correct) confetti({ count: 50 });
  }

  const after = s.mastery[skill];
  return (
    <div className="grid gap-5 max-w-3xl">
      <SectionHead eyebrow={t('⚡ Daily Digi Challenge')} title={t('Today\'s Digi Challenge')} desc={t('Built from your weakest skill: {name}. Learning first, speed second.', { name: CONCEPT[skill].name })} />
      {phase === 'ready' && (
        <Card glow className="grid gap-4">
          <div className="font-display text-2xl font-semibold">{t('Complete {n} {skill} problems in {sec} seconds.', { n: TARGET, skill: CONCEPT[skill].short.toLowerCase(), sec: DURATION })}</div>
          <p className="text-muted">{t('Answer as many as you can. Accuracy counts more than speed — wrong answers are logged for Mistake Detective, not punished.')}</p>
          <div className="flex flex-wrap gap-2"><button className="btn btn-primary btn-lg" onClick={start}>{t('Start ⚡')}</button>{doneToday && <span className="pill pill-good self-center">{t('Completed today · replay for practice')}</span>}</div>
        </Card>
      )}
      {phase === 'run' && (
        <Card glow className="grid gap-5">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16" aria-label={tp(left, '{n} second left', '{n} seconds left')}>
              <svg viewBox="0 0 64 64" className="-rotate-90 w-16 h-16"><circle cx="32" cy="32" r="28" fill="none" stroke="var(--line)" strokeWidth="6" /><circle cx="32" cy="32" r="28" fill="none" stroke={left <= 10 ? 'var(--bad)' : 'var(--warn)'} strokeWidth="6" strokeDasharray={176} strokeDashoffset={176 - (176 * left) / DURATION} style={{ transition: 'stroke-dashoffset 1s linear' }} /></svg>
              <span className="absolute inset-0 grid place-items-center font-mono font-bold tnum">{left}</span>
            </div>
            <div className="flex gap-1.5">{log.map((x, i) => <span key={i} className="w-3 h-3 rounded-full" style={{ background: x.ok ? 'var(--good)' : 'var(--bad)' }} />)}</div>
            <div className="ms-auto font-mono text-sm">{t('{n}/{target} target', { n: log.filter((x) => x.ok).length, target: TARGET })}</div>
          </div>
          <div className={flash === 'no' ? 'anim-shake' : ''}><div className="text-muted">{q.prompt}</div><div className="font-display text-4xl font-semibold tnum" style={{ color: flash === 'ok' ? 'var(--good)' : undefined, transition: 'color .2s' }}>{q.display}</div></div>
          <AnswerInput q={q} value={val} onChange={setVal} onSubmit={submit} id="challenge-answer" />
          <div className="flex gap-2"><button className="btn btn-primary" onClick={submit} disabled={!val}>{t('Submit')}</button><button className="btn btn-ghost" onClick={end}>{t('Finish early')}</button></div>
        </Card>
      )}
      {phase === 'done' && summary && (
        <Card glow className="grid gap-5 anim-pop">
          <div className="flex flex-wrap items-center gap-5">
            <Ring value={summary.acc} size={120} sub={t('accuracy')} />
            <div><div className="font-display text-2xl font-semibold">{summary.correct >= TARGET ? t('Challenge complete! ⚡') : t('Good effort — keep going.')}</div><p className="text-muted">{summary.correct >= TARGET ? t('You beat the target of {target}.', { target: TARGET }) : t('You got {n} of the {target} — and every attempt trained your brain. Tomorrow\'s challenge will feel easier.', { n: summary.correct, target: TARGET })}</p></div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Stat label={t('Score')} value={`${summary.correct}/${summary.total}`} />
            <Stat label={t('Accuracy')} value={`${summary.acc}%`} />
            <Stat label={t('Improvement')} value={summary.prevAcc === null ? t('First run') : t('{d} pts', { d: `${summary.acc - summary.prevAcc >= 0 ? '+' : ''}${summary.acc - summary.prevAcc}` })} tone={summary.prevAcc !== null && summary.acc < summary.prevAcc ? 'var(--bad)' : 'var(--good)'} />
            <Stat label={t('XP')} value={`+${summary.xp}`} sub={summary.xp === 0 ? t('Already earned today') : undefined} />
          </div>
          <div className="panel p-4 flex flex-wrap items-center gap-3"><span className="font-semibold">{t('Updated mastery · {name}', { name: CONCEPT[skill].name })}</span><span className="font-mono tnum ms-auto">{Math.round(before.current ?? 0)}% → <strong>{Math.round(after ?? 0)}%</strong></span></div>
          <div className="flex flex-wrap gap-2"><button className="btn btn-primary" onClick={() => nav('learn', { concept: skill })}>{t('Keep learning')}</button><button className="btn" onClick={() => setPhase('ready')}>{t('Play again')}</button></div>
        </Card>
      )}
    </div>
  );
}
