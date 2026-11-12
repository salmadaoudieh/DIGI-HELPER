import { useEffect, useMemo, useState } from 'react';
import { confetti } from '../lib/fx.js';
import { useStore } from '../lib/store.jsx';
import { CONCEPT, MODES, SUBJECT_LIST, conceptsOf, BANKS } from '../lib/data.js';
import { recommendMode, recordAttempt, weakest, isUnlockedConcept, logActivity } from '../lib/engine.js';
import { questionFor, checkAnswer, makeQuestion } from '../lib/questions.js';
import { t, L } from '../lib/i18n.js';
import { SectionHead, Card, Tabs, Bar, StatusPill, Confidence, QDisplay } from '../components/ui.jsx';
import { NumberLineLesson, NumberLineJump, BalanceGame, FractionBars, WorkedExample, Scale } from '../components/Visuals.jsx';
import MistakeDetective, { AnswerInput } from '../components/Detective.jsx';
import { TutorChat } from '../components/Tutor.jsx';
import { correctCheer, STREAK_CHEERS } from '../lib/encourage.js';

const isMath = (id) => CONCEPT[id]?.subject === 'math';

/** Visual mode for reasoning subjects: three illustrated key ideas plus a worked example. */
function KeyIdeas({ concept }) {
  const c = CONCEPT[concept];
  const [q, setQ] = useState(() => questionFor(concept, 1));
  const [open, setOpen] = useState(0);
  useEffect(() => { setQ(questionFor(concept, 1)); setOpen(0); }, [concept]);
  return (
    <div className="grid gap-6">
      <div className="grid md:grid-cols-3 gap-3">
        {(c.keyIdeas || []).map((k, i) => (
          <button key={i} onClick={() => setOpen(i)} data-tilt="8" aria-pressed={open === i}
            className="glass p-5 text-start grid gap-3 content-start overflow-hidden transition"
            style={{ background: `linear-gradient(160deg, color-mix(in srgb, ${c.hue} ${open === i ? 28 : 12}%, var(--surface)), var(--surface))`, ...(open === i ? { borderColor: c.hue } : {}) }}>
            <span className="hue-chip w-14 h-14 text-3xl" style={{ '--h': c.hue }} aria-hidden="true">{k.icon}</span>
            <span className="text-xs font-mono text-muted">{t('Key idea {n}', { n: i + 1 })}</span>
            <span className="font-semibold leading-snug">{L(k.text)}</span>
          </button>
        ))}
      </div>
      <div className="panel p-5 grid gap-3">
        <div className="eyebrow">{t('Worked example')}</div>
        <WorkedExample q={q} />
        <button className="btn btn-sm justify-self-start" onClick={() => setQ(questionFor(concept, 2))}>{t('New example')}</button>
      </div>
    </div>
  );
}

function VisualMode({ concept }) {
  const [q, setQ] = useState(() => questionFor(concept, 2));
  useEffect(() => setQ(questionFor(concept, 2)), [concept]);
  if (!isMath(concept)) return <KeyIdeas concept={concept} />;
  if (concept === 'neg' || concept === 'onestep') return <NumberLineLesson />;
  if (concept === 'frac') return <FractionBars d1={2} d2={3} />;
  return (
    <div className="grid lg:grid-cols-2 gap-6 items-center">
      <WorkedExample q={q} />
      <div className="grid gap-2">
        {['linear', 'distrib', 'onestep'].includes(concept) && <Scale left={q.display.split('=')[0].trim()} right={q.display.split('=')[1]?.trim() || ''} />}
        {concept === 'ineq' && <div className="panel p-4 text-sm"><div className="font-semibold mb-1">{t('Why the sign flips')}</div><div className="math font-mono">2 &gt; 1 → × (−1) → −2 &lt; −1</div><p className="text-muted mt-2">{t('Multiplying or dividing by a negative mirrors the number line, so the order reverses.')}</p></div>}
        <button className="btn btn-sm justify-self-start" onClick={() => setQ(questionFor(concept, 2))}>{t('New example')}</button>
      </div>
    </div>
  );
}

/** Interactive mode for reasoning subjects: a quick-fire quest with a timer and combo points. */
function QuickQuest({ concept, onResult }) {
  const subject = CONCEPT[concept].subject;
  const rounds = useMemo(() => {
    const b = BANKS[subject];
    const own = b.questions.map((q, idx) => ({ q, idx })).filter((x) => x.q.concept === concept);
    const other = b.questions.map((q, idx) => ({ q, idx })).filter((x) => x.q.concept !== concept).sort(() => Math.random() - 0.5).slice(0, 2);
    return [...own.sort(() => Math.random() - 0.5), ...other].map((x) => makeQuestion('bank', { subject, idx: x.idx }));
  }, [concept, subject]);
  const [i, setI] = useState(0); const [val, setVal] = useState(''); const [pts, setPts] = useState(0); const [combo, setCombo] = useState(0);
  const [res, setRes] = useState(null); const [left, setLeft] = useState(20); const [done, setDone] = useState(false);
  const q = rounds[i];
  useEffect(() => {
    if (done || res) return undefined;
    if (left <= 0) { setRes({ ok: false, timeout: true }); setCombo(0); onResult?.(false); return undefined; }
    const id = setTimeout(() => setLeft((l) => l - 1), 1000); return () => clearTimeout(id);
  }, [left, res, done]); // eslint-disable-line react-hooks/exhaustive-deps
  function submit(v = val) {
    if (res || !v) return;
    const r = checkAnswer(q, v); if (r.invalid) return;
    setRes(r); onResult?.(r.ok);
    if (r.ok) { const c = combo + 1; setCombo(c); setPts((p) => p + 100 + left * 5 + (c - 1) * 50); confetti({ count: 30 + c * 15, power: 0.6 }); } else setCombo(0);
  }
  function next() { if (i + 1 >= rounds.length) { setDone(true); if (pts > 0) confetti({ count: 120 }); return; } setI(i + 1); setVal(''); setRes(null); setLeft(20); }
  if (done) return (
    <div className="panel p-6 text-center grid gap-3 place-items-center anim-pop">
      <div className="text-5xl" aria-hidden="true">🏆</div>
      <div className="font-display text-2xl font-semibold rainbow-text">{t('{n} points', { n: pts })}</div>
      <p className="text-muted">{t('Quest complete! Every round trained your brain.')}</p>
      <button className="btn btn-primary" onClick={() => { setI(0); setVal(''); setRes(null); setLeft(20); setPts(0); setCombo(0); setDone(false); }}>{t('Play again')}</button>
    </div>
  );
  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <span className="pill pill-info">{t('Round {n}/{total}', { n: i + 1, total: rounds.length })}</span>
        <span className="font-display font-semibold tnum">{t('{n} points', { n: pts })}</span>
        {combo >= 2 && <span className="pill pill-good anim-pop">🔥 {t('Combo ×{n}', { n: combo })}</span>}
        <div className="flex-1 min-w-[120px] bar" aria-label={t('{n} seconds left', { n: left })}><span style={{ width: `${(left / 20) * 100}%`, background: left <= 5 ? 'var(--bad)' : 'linear-gradient(90deg,var(--good),var(--cyan))', transition: 'width 1s linear' }} /></div>
      </div>
      <div><div className="text-muted text-sm">{q.prompt}</div><QDisplay q={q} size="md" /></div>
      <AnswerInput q={q} value={val} onChange={(v) => { setVal(v); if (q.type === 'mc') submit(v); }} onSubmit={() => submit()} disabled={!!res} id={`quest-${q.id}`} />
      {q.type !== 'mc' && !res && <button className="btn btn-primary justify-self-start" onClick={() => submit()} disabled={!val}>{t('Check')}</button>}
      <div aria-live="polite">
        {res?.ok && <p className="text-good font-semibold anim-pop">✓ {correctCheer()}</p>}
        {res && !res.ok && <p className="text-bad text-sm anim-pop">{res.timeout ? t("Time's up — here's the idea:") : `🔎 ${(res.mis || res.generic)?.found || ''}`} <span className="text-muted">{(res.mis || res.generic)?.why || q.hint}</span></p>}
      </div>
      {res && <button className="btn btn-primary justify-self-start" onClick={next}>{i + 1 >= rounds.length ? t('See my score') : t('Next round')} <span className="dir-arrow">→</span></button>}
    </div>
  );
}

function InteractiveMode({ concept, onResult }) {
  if (!isMath(concept)) return <QuickQuest concept={concept} onResult={onResult} />;
  if (concept === 'neg') return <NumberLineJump onResult={onResult} />;
  if (concept === 'frac') return <FractionBars d1={3} d2={4} interactive onResult={onResult} />;
  return <BalanceGame onResult={onResult} />;
}

function PracticeMode({ concept }) {
  const { student: s, updateStudent, toast } = useStore();
  const [cheer, setCheer] = useState('');
  const [diff, setDiff] = useState(2);
  const [q, setQ] = useState(() => questionFor(concept, 2));
  const [n, setN] = useState(0); const [streak, setStreak] = useState(0);
  const [val, setVal] = useState(''); const [conf, setConf] = useState(null); const [res, setRes] = useState(null); const [warn, setWarn] = useState('');
  const askConf = n % 3 === 0;
  useEffect(() => { setQ(questionFor(concept, 2)); setRes(null); setVal(''); setN(0); setConf(null); }, [concept]);

  function submit() {
    const r = checkAnswer(q, val); if (r.invalid) { setWarn(t('Type a number (or a fraction like 3/4).')); return; }
    setWarn(''); setRes(r);
    updateStudent((st) => recordAttempt(st, q.skill, { ok: r.ok, conf: askConf ? conf : null, mis: r.mis || r.generic, difficulty: q.difficulty }));
    const nextStreak = r.ok ? streak + 1 : 0;
    setStreak(nextStreak); setCheer(correctCheer());
    if (r.ok) confetti({ count: nextStreak >= 3 ? 120 : 55, power: 0.8 });
    if (STREAK_CHEERS[nextStreak]) toast(`🔥 ${STREAK_CHEERS[nextStreak]}`, 'good');
    if (r.ok && streak + 1 >= 2) setDiff((d) => Math.min(4, d + 1));
    if (!r.ok) setDiff((d) => Math.max(1, d - 1));
  }
  function next() {
    let nq = questionFor(concept, diff);
    for (let k = 0; k < 4 && nq.display === q.display; k++) nq = questionFor(concept, diff);
    setQ(nq); setVal(''); setRes(null); setConf(null); setN((k) => k + 1);
  }
  const mastery = s.mastery[concept];

  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <span className="pill pill-info">{t('Adaptive · level {n}', { n: diff })}</span><span className="text-muted">{t('Question {n}', { n: n + 1 })}</span>
        {streak >= 2 && <span className="pill pill-good">🔥 {t('{n} in a row — getting harder', { n: streak })}</span>}
        <span className="ms-auto font-mono text-muted">{t('Mastery')} {mastery === null || mastery === undefined ? '—' : `${Math.round(mastery)}%`}</span>
      </div>
      <div className="grid gap-1"><div className="text-muted">{q.prompt}</div><QDisplay q={q} size="md" /></div>
      {askConf && conf === null && !res ? <Confidence value={conf} onChange={setConf} /> : (
        <>
          <AnswerInput q={q} value={val} onChange={setVal} onSubmit={() => !res && submit()} disabled={!!res} id={`prac-${q.id}`} />
          {warn && <p className="text-warn text-sm" role="alert">{warn}</p>}
          <div className="flex flex-wrap gap-2">
            {!res && <><button className="btn btn-primary" onClick={submit} disabled={!val}>{t('Check')}</button><details className="panel px-3 py-2 text-sm"><summary className="cursor-pointer font-semibold">{t('Hint')}</summary><p className="mt-1 text-muted">{q.hint}</p></details></>}
            {res && <button className="btn btn-primary" onClick={next}>{t('Next question')} <span className="dir-arrow">→</span></button>}
          </div>
        </>
      )}
      <div aria-live="polite">
        {res?.ok && <div className="panel p-4 anim-pop" style={{ borderColor: 'var(--good)' }}><strong className="text-good">✓ {t('Correct!')} {cheer}</strong> <span className="text-muted">{q.steps.map((st) => st.expr || st.text).join('  →  ')}</span>{askConf && conf && conf <= 2 && <p className="text-sm mt-1">{t('You were unsure, but you got it. Trust your method a little more.')}</p>}</div>}
        {res && !res.ok && <MistakeDetective q={q} raw={val} result={res} compact />}
      </div>
    </div>
  );
}

export default function Learn() {
  const { student: s, params, updateStudent } = useStore();
  const w = weakest(s);
  const [concept, setConcept] = useState(params.concept || w?.id || 'linear');
  const [subject, setSubject] = useState(CONCEPT[params.concept || w?.id || 'linear']?.subject || 'math');
  const rec = recommendMode(s, concept);
  const [mode, setMode] = useState(params.mode || rec);
  const [log, setLog] = useState({ ok: 0, n: 0 });
  useEffect(() => {
    if (params.concept) { setConcept(params.concept); setSubject(CONCEPT[params.concept]?.subject || 'math'); }
    if (params.mode) setMode(params.mode);
  }, [params.concept, params.mode, params.demoStep]);

  function onResult(ok) {
    setLog((l) => ({ ok: l.ok + (ok ? 1 : 0), n: l.n + 1 }));
    const skill = mode === 'interactive' && isMath(concept) && !['neg', 'frac', 'onestep', 'linear'].includes(concept) ? 'linear' : concept;
    updateStudent((st) => { recordAttempt(st, skill, { ok, difficulty: 2 }); if (ok && Math.random() < 0.3) logActivity(st, '{mode} activity: {concept}', mode, { mode: { mode }, concept: { concept } }); });
  }
  const c = CONCEPT[concept]; const v = s.mastery[concept];
  const available = conceptsOf(subject).filter((x) => isUnlockedConcept(s, x.id));
  const pickSubject = (id) => {
    setSubject(id);
    const list = conceptsOf(id).filter((x) => isUnlockedConcept(s, x.id));
    const weakIn = list.filter((x) => s.mastery[x.id] !== null && s.mastery[x.id] !== undefined).sort((a, b) => s.mastery[a.id] - s.mastery[b.id])[0] || list[0];
    setConcept(weakIn.id); setMode(recommendMode(s, weakIn.id));
  };

  return (
    <div className="grid gap-5">
      <SectionHead eyebrow={t('Teach')} title={t('Learn your way')} desc={t('Pick a subject, a concept and a learning mode. Digi Helper recommends a mode based on the kind of mistakes you make.')} />
      <div className="flex flex-wrap gap-2" role="tablist" aria-label={t('Subjects')}>
        {SUBJECT_LIST.map((x) => (
          <button key={x.id} role="tab" aria-selected={subject === x.id} className="chip" onClick={() => pickSubject(x.id)}
            style={subject === x.id ? { borderColor: x.hue, background: `color-mix(in srgb, ${x.hue} 26%, transparent)`, color: 'var(--fg)' } : undefined}>
            <span aria-hidden="true">{x.icon}</span>{x.name}
          </button>
        ))}
      </div>
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1" role="tablist" aria-label={t('Concepts')}>
        {available.map((x) => <button key={x.id} role="tab" aria-selected={concept === x.id} className={`chip shrink-0 ${concept === x.id ? 'on' : ''}`} style={concept === x.id ? { borderColor: x.hue, background: `color-mix(in srgb, ${x.hue} 24%, transparent)` } : undefined} onClick={() => { setConcept(x.id); setMode(recommendMode(s, x.id)); }}><span className="w-2 h-2 rounded-full" style={{ background: x.hue }} aria-hidden="true" />{x.short}{s.mastery[x.id] !== null && s.mastery[x.id] !== undefined && <span className="font-mono text-xs opacity-70">{Math.round(s.mastery[x.id])}</span>}</button>)}
      </div>
      <Card className="grid md:grid-cols-[1fr_auto] gap-4 items-center hue-card overflow-hidden" style={{ '--h': c.hue }}>
        <div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><h2 className="font-display text-xl font-semibold">{c.name}</h2><StatusPill value={v} /></div><p className="text-sm text-muted mt-1">{c.desc}</p></div>
        <div className="w-full md:w-56"><Bar value={v ?? 0} label={t('{name} mastery', { name: c.name })} /><div className="text-xs text-muted mt-1 font-mono">{v === null || v === undefined ? t('Not assessed') : t('{n}% mastery', { n: Math.round(v) })}{log.n > 0 && ` · ${t('session {ok}/{n}', { ok: log.ok, n: log.n })}`}</div></div>
      </Card>
      <Tabs label={t('Learning modes')} value={mode} onChange={setMode} tabs={Object.values(MODES).map((mo) => ({ id: mo.id, label: mo.name, icon: mo.icon, badge: mo.id === rec ? t('Recommended') : null }))} />
      <Card glow key={`${concept}-${mode}`} className="anim-up">
        <p className="text-sm text-muted mb-4">{MODES[mode].desc}{mode === rec && ` ${t('Recommended because of the mistakes you have made on this topic.')}`}</p>
        {mode === 'visual' && <VisualMode concept={concept} />}
        {mode === 'interactive' && <InteractiveMode concept={concept} onResult={onResult} />}
        {mode === 'practice' && <PracticeMode concept={concept} />}
        {mode === 'explain' && <TutorChat concept={concept} height={460} />}
      </Card>
    </div>
  );
}
