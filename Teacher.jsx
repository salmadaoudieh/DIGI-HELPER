import { useMemo, useState } from 'react';
import { t, tp } from '../lib/i18n.js';
import { useStore } from '../lib/store.jsx';
import { CLASSES, classRoster, CONCEPT, statusOf, STATUS } from '../lib/data.js';
import { algebraMastery } from '../lib/engine.js';
import { SectionHead, Card, Stat, Bar, StatusPill, DemoTag, DemoNote, Tabs } from '../components/ui.jsx';
import { LineChart, BarChart, DoughnutChart } from '../components/Charts.jsx';

function useClass() {
  const [cls, setCls] = useState('10A');
  return [cls, setCls, CLASSES[cls]];
}
function ClassPicker({ value, onChange }) {
  return <Tabs label={t('Class')} value={value} onChange={onChange} tabs={Object.keys(CLASSES).map((k) => ({ id: k, label: t(CLASSES[k].name) }))} />;
}

function demoRow(students) {
  const d = students.demo; if (!d) return null;
  const now = algebraMastery(d); const before = d.journey[0]?.v ?? now;
  return { id: 'demo', name: t('Demo Student'), before, now, conf: Math.round(d.confidence.linear ?? 70), demo: true };
}

export function TeacherOverview() {
  const { state, nav } = useStore();
  const [cls, setCls, c] = useClass();
  const roster = useMemo(() => { const r = classRoster(cls); const dr = cls === '10A' ? demoRow(state.students) : null; return dr ? [dr, ...r] : r; }, [cls, state.students]);
  const avg = c.weekly[c.weekly.length - 1];
  const avgBefore = c.weekly[0];
  const sorted = [...c.topics].sort((a, b) => a.mastery - b.mastery);
  const attention = sorted.filter((tp0) => tp0.mastery < 60);
  const support = roster.filter((r) => r.now < 50).length;
  const dr = roster.find((r) => r.demo);

  return (
    <div className="grid gap-5">
      <SectionHead eyebrow={t('Teacher dashboard')} title={t('{name} · {subject}', { name: t(c.name), subject: t(c.subject) })} desc={t('A live picture of what the class knows, where it is improving and which topics need you next.')} right={<DemoTag />} />
      <ClassPicker value={cls} onChange={setCls} />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Stat label={t('Students')} value={c.students} />
        <Stat label={t('Average mastery')} value={`${avg}%`} sub={t('from {n}% eight weeks ago', { n: avgBefore })} />
        <Stat label={t('Improvement')} value={t('+{n} pts', { n: avg - avgBefore })} tone="var(--good)" sub={t('since first diagnostic')} />
        <Stat label={t('Need attention')} value={tp(attention.length, '{n} topic', '{n} topics')} tone={attention.length ? 'var(--bad)' : 'var(--good)'} sub={tp(support, '{n} student below 50%', '{n} students below 50%')} />
      </div>

      {dr && (
        <Card glow className="flex flex-wrap items-center gap-5 anim-pop">
          <div className="text-3xl" aria-hidden="true">🚀</div>
          <div className="flex-1 min-w-[220px]"><div className="eyebrow">{t('Student spotlight · Demo Student')}</div><div className="font-semibold mt-1">{t('Algebra mastery {before}% → {now}%', { before: dr.before, now: dr.now })} {dr.now > dr.before && <span className="text-good">{t('(+{n} pts)', { n: dr.now - dr.before })}</span>}</div><div className="text-sm text-muted">{dr.now > dr.before ? t('Negative-number errors resolved after a targeted path. Remaining focus: distributive property.') : t('Diagnosis: negative numbers in multi-step equations. Personalized path assigned.')}</div></div>
          <div className="w-40"><Bar value={dr.now} label={t('Demo Student mastery')} /></div>
        </Card>
      )}

      <div className="grid lg:grid-cols-[1fr_1fr] gap-5">
        <Card>
          <div className="flex items-center justify-between mb-4"><h2 className="font-bold">{t('Topic mastery')}</h2><span className="text-xs text-muted">{t('Lowest first')}</span></div>
          <ul className="grid gap-4">
            {sorted.map((tpc) => {
              const st = statusOf(tpc.mastery);
              return (
                <li key={tpc.id} className="grid gap-1.5">
                  <div className="flex items-center justify-between gap-2"><span className="font-semibold">{t(tpc.name)}</span><span className="flex items-center gap-2"><StatusPill value={tpc.mastery} /><span className="font-mono tnum w-10 text-end">{tpc.mastery}%</span></span></div>
                  <Bar value={tpc.mastery} label={t('{name} class mastery', { name: t(tpc.name) })} />
                  {st === 'attention' && <div className="text-xs" style={{ color: STATUS.attention.color }}>{t('⚠ Needs teacher attention · up {n} pts this month', { n: tpc.mastery - tpc.prev })}</div>}
                </li>
              );
            })}
          </ul>
        </Card>
        <Card>
          <h2 className="font-bold mb-3">{t('Class average over 8 weeks')}</h2>
          <LineChart labels={c.weekly.map((_, i) => t('Wk {n}', { n: i + 1 }))} series={[{ label: t('Average mastery'), data: c.weekly, color: 'cyan' }]} height={250} />
        </Card>
      </div>

      <div className="grid lg:grid-cols-[1.2fr_1fr] gap-5">
        <Card>
          <h2 className="font-bold mb-3">{t('Most common mistakes')}</h2>
          <div className="scroll-x"><table className="w-full text-sm min-w-[520px]">
            <thead><tr className="text-start text-xs text-muted uppercase tracking-wider"><th className="py-2 pe-3">{t('Misconception')}</th><th className="pe-3">{t('Topic')}</th><th className="pe-3">{t('Students')}</th><th>{t('Suggested fix')}</th></tr></thead>
            <tbody>{c.mistakes.map((mm) => <tr key={mm.label} className="border-t border-line"><td className="py-2.5 pe-3 font-semibold">{t(mm.label)}</td><td className="pe-3 text-muted">{t(mm.topic)}</td><td className="pe-3 font-mono">{mm.share}%</td><td className="text-cyan">{t(mm.fix)}</td></tr>)}</tbody>
          </table></div>
        </Card>
        <Card>
          <h2 className="font-bold mb-3">{t('Students')}</h2>
          <ul className="grid gap-1.5 max-h-[320px] overflow-y-auto pe-1">
            {[...roster].sort((a, b) => a.now - b.now).map((r) => (
              <li key={r.id} className="flex items-center gap-3 text-sm panel px-3 py-2" style={r.demo ? { borderColor: 'var(--violet)' } : undefined}>
                <span className="flex-1 truncate font-semibold">{r.name}{r.demo && <span className="pill pill-violet ms-2">{t('demo')}</span>}</span>
                <span className="font-mono text-xs text-muted tnum">{r.before}→</span><span className="font-mono tnum w-9 text-end">{r.now}%</span>
                <span className="w-14 text-end text-xs" style={{ color: r.now >= r.before ? 'var(--good)' : 'var(--bad)' }}>{r.now >= r.before ? '▲' : '▼'} {Math.abs(r.now - r.before)}</span>
                {r.now < 50 && <span className="pill pill-bad" title={t('May need additional support')}>{t('support')}</span>}
              </li>
            ))}
          </ul>
          <button className="btn btn-sm mt-3" onClick={() => nav('pulse')}>{t('Open Classroom Pulse →')}</button>
        </Card>
      </div>
      <DemoNote />
    </div>
  );
}

export function ClassroomPulse() {
  const { state } = useStore();
  const [cls, setCls, c] = useClass();
  const p = c.pulse; const gap = p.confident - p.mastery;
  const roster = useMemo(() => { const r = classRoster(cls); const dr = cls === '10A' ? demoRow(state.students) : null; return dr ? [dr, ...r] : r; }, [cls, state.students]);
  const support = roster.filter((r) => r.now < 50 || r.conf - r.now >= 30).sort((a, b) => a.now - b.now).slice(0, 6);
  const hardest = [...c.topics].sort((a, b) => a.mastery - b.mastery)[0];

  return (
    <div className="grid gap-5">
      <SectionHead eyebrow={t('📊 Classroom Pulse')} title={t('What the class believes vs. what it knows')} desc={t('Aggregated and anonymous by default. Individual names appear only in the private support list, visible to you.')} right={<DemoTag />} />
      <ClassPicker value={cls} onChange={setCls} />
      <Card glow className="grid md:grid-cols-[1fr_auto_1fr_auto] gap-6 items-center">
        <div><div className="text-sm text-muted">{t('Latest check-in · {topic}', { topic: t(p.topic) })}</div><div className="font-display text-4xl sm:text-5xl font-semibold tnum mt-1" style={{ color: 'var(--violet)' }}>{p.confident}%</div><div className="font-semibold">{t('of students feel confident')}</div></div>
        <div className="font-display text-xl text-muted text-center">{t('but')}</div>
        <div><div className="text-sm text-muted">{tp(p.responses, '{n} response', '{n} responses')}</div><div className="font-display text-4xl sm:text-5xl font-semibold tnum mt-1" style={{ color: gap >= 15 ? 'var(--bad)' : 'var(--good)' }}>{p.mastery}%</div><div className="font-semibold">{t('demonstrated mastery')}</div></div>
        {gap >= 15 ? <div className="panel p-4 text-center" style={{ borderColor: 'var(--bad)' }}><div className="text-2xl" aria-hidden="true">⚠</div><div className="font-display font-semibold text-bad">{t('Confidence Gap Detected')}</div><div className="text-xs text-muted">{t('{n} point gap', { n: gap })}</div></div>
          : <div className="panel p-4 text-center"><div className="text-2xl" aria-hidden="true">✓</div><div className="font-display font-semibold text-good">{t('Well calibrated')}</div></div>}
      </Card>

      <div className="grid lg:grid-cols-2 gap-5">
        <Card><h2 className="font-bold mb-3">{t('Confidence vs mastery by topic')}</h2>
          <BarChart labels={c.topics.map((tpc) => t(tpc.name))} series={[{ label: t('Confidence'), data: c.topics.map((tpc) => tpc.confidence), color: 'violet' }, { label: t('Mastery'), data: c.topics.map((tpc) => tpc.mastery), color: 'cyan' }]} height={260} />
        </Card>
        <Card><h2 className="font-bold mb-3">{t('How confident did students feel? (anonymous)')}</h2>
          <BarChart y100={false} labels={[t('1 Not'), t('2 Slightly'), t('3 Neutral'), t('4 Confident'), t('5 Very')]} series={[{ label: t('Students'), data: p.dist }]} colors={['bad', 'warn', 'faint', 'cyan', 'accent']} height={260} />
        </Card>
      </div>
      <div className="grid md:grid-cols-3 gap-5">
        <Card><div className="eyebrow mb-1">{t('Most difficult concept')}</div><div className="font-display text-xl font-semibold">{t(hardest.name)}</div><div className="text-sm text-muted">{t('{n}% average mastery', { n: hardest.mastery })}</div><Bar value={hardest.mastery} className="mt-3" label={t('Hardest concept mastery')} /></Card>
        <Card><div className="eyebrow mb-1">{t('Common misconception')}</div><div className="font-semibold">{t(c.mistakes[0].label)}</div><div className="text-sm text-muted">{t('{n}% of students · try:', { n: c.mistakes[0].share })} <span className="text-cyan">{t(c.mistakes[0].fix)}</span></div></Card>
        <Card><div className="eyebrow mb-1">{t('Mistake mix')}</div><DoughnutChart labels={c.mistakes.map((m) => t(m.topic))} data={c.mistakes.map((m) => m.share)} colors={['bad', 'warn', 'violet', 'cyan']} height={170} /></Card>
      </div>
      <Card>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3"><h2 className="font-bold">{t('Students who may need additional support')}</h2><span className="pill pill-muted">{t('🔒 Private to you')}</span></div>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {support.map((r) => (
            <li key={r.id} className="panel p-3 text-sm grid gap-1">
              <div className="flex items-center justify-between"><span className="font-semibold">{r.name}</span><span className="font-mono">{r.now}%</span></div>
              <div className="text-xs text-muted">{r.conf - r.now >= 30 ? t('Confident ({conf}%) but mastery is lower — check for a hidden misconception.', { conf: r.conf }) : t('Below 50% mastery — consider a small-group session on {topic}.', { topic: t(hardest.name).toLowerCase() })}</div>
            </li>
          ))}
        </ul>
      </Card>
      <DemoNote />
    </div>
  );
}

const TYPES = ['Lesson', 'Questions', 'Challenge', 'Activity', 'Diagnostic test'];
const DIFFS = ['Easy', 'Medium', 'Hard', 'Advanced'];

export function LessonCreator() {
  const { state, addAssignment, removeAssignment, toast } = useStore();
  const blankQ = () => ({ prompt: '', answer: '', wrong: '', why: '' });
  const [f, setF] = useState({ type: 'Challenge', title: '', subject: 'Math', concept: 'neg', difficulty: 'Medium', classes: ['10A'], due: '', notes: '', questions: [blankQ()] });
  const [err, setErr] = useState('');
  const set = (k, v) => setF((x) => ({ ...x, [k]: v }));
  const setQ = (i, k, v) => setF((x) => ({ ...x, questions: x.questions.map((q, j) => (j === i ? { ...q, [k]: v } : q)) }));

  function save(e) {
    e.preventDefault();
    const title = f.title.trim().slice(0, 80);
    if (title.length < 3) { setErr(t('Give it a title of at least 3 characters.')); return; }
    if (!f.classes.length) { setErr(t('Assign it to at least one class.')); return; }
    const qs = f.questions.filter((q) => q.prompt.trim());
    if (f.type !== 'Lesson' && !qs.length) { setErr(t('Add at least one question.')); return; }
    if (qs.some((q) => !q.answer.trim())) { setErr(t('Every question needs a correct answer.')); return; }
    setErr('');
    addAssignment({ ...f, title, questions: qs.length, items: qs.map((q) => ({ prompt: q.prompt.slice(0, 200), answer: q.answer.slice(0, 40), wrong: q.wrong.slice(0, 40), why: q.why.slice(0, 240) })), createdBy: state.session?.name || 'Teacher' });
    toast(t('“{title}” assigned to {classes}', { title, classes: f.classes.map((k) => t(CLASSES[k].name)).join(', ') }), 'good');
    setF((x) => ({ ...x, title: '', notes: '', questions: [blankQ()] }));
  }

  return (
    <div className="grid gap-5">
      <SectionHead eyebrow={t('Teacher tools')} title={t('Lesson Creator')} desc={t('Create lessons, questions, challenges, activities or diagnostic tests and assign them to classes. Add a common wrong answer to teach Mistake Detective what to look for.')} />
      <div className="grid xl:grid-cols-[1.3fr_1fr] gap-5 items-start">
        <form onSubmit={save} className="glass p-6 grid gap-5" noValidate>
          <div><span className="label">{t('Type')}</span><div className="flex flex-wrap gap-2">{TYPES.map((ty) => <button type="button" key={ty} className="chip" aria-pressed={f.type === ty} onClick={() => set('type', ty)}>{t(ty)}</button>)}</div></div>
          <div><label className="label" htmlFor="lc-title">{t('Title')}</label><input id="lc-title" className="input" value={f.title} maxLength={80} onChange={(e) => set('title', e.target.value)} placeholder={t('e.g. Negatives in two-step equations')} /></div>
          <div className="grid sm:grid-cols-3 gap-4">
            <div><label className="label" htmlFor="lc-subject">{t('Subject')}</label><select id="lc-subject" className="input" value={f.subject} onChange={(e) => set('subject', e.target.value)}>{['Math', 'Science', 'Language', 'Social Studies', 'Technology'].map((x) => <option key={x} value={x}>{t(x)}</option>)}</select></div>
            <div><label className="label" htmlFor="lc-concept">{t('Concept')}</label><select id="lc-concept" className="input" value={f.concept} onChange={(e) => set('concept', e.target.value)} disabled={f.subject !== 'Math'}>{Object.values(CONCEPT).map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}</select></div>
            <div><label className="label" htmlFor="lc-due">{t('Due date (optional)')}</label><input id="lc-due" type="date" className="input" value={f.due} onChange={(e) => set('due', e.target.value)} /></div>
          </div>
          <div><span className="label">{t('Difficulty')}</span><div className="grid grid-cols-4 gap-2">{DIFFS.map((d, i) => <button type="button" key={d} aria-pressed={f.difficulty === d} onClick={() => set('difficulty', d)} className={`panel py-2 text-sm font-semibold ${f.difficulty === d ? 'ring-2 ring-[var(--accent)]' : ''}`}><span className="block text-xs text-muted">{'●'.repeat(i + 1)}{'○'.repeat(3 - i)}</span>{t(d)}</button>)}</div></div>
          <div><span className="label">{t('Assign to classes')}</span><div className="flex flex-wrap gap-2">{Object.keys(CLASSES).map((k) => <button type="button" key={k} className="chip" aria-pressed={f.classes.includes(k)} onClick={() => set('classes', f.classes.includes(k) ? f.classes.filter((x) => x !== k) : [...f.classes, k])}>{t(CLASSES[k].name)}</button>)}</div></div>
          {f.type === 'Lesson' && <div><label className="label" htmlFor="lc-notes">{t('Lesson notes')}</label><textarea id="lc-notes" className="input" rows={4} maxLength={2000} value={f.notes} onChange={(e) => set('notes', e.target.value)} placeholder={t('Key idea, worked example, and a check-for-understanding question.')} /></div>}
          <div className="grid gap-3">
            <div className="flex items-center justify-between"><span className="label mb-0">{t('Questions')}</span><button type="button" className="btn btn-sm" onClick={() => setF((x) => ({ ...x, questions: [...x.questions, blankQ()].slice(0, 20) }))}>{t('+ Add question')}</button></div>
            {f.questions.map((q, i) => (
              <fieldset key={i} className="panel p-4 grid gap-3">
                <legend className="sr-only">{t('Question {n}', { n: i + 1 })}</legend>
                <div className="flex items-center justify-between"><span className="font-mono text-xs text-muted">{t('Q{n}', { n: i + 1 })}</span>{f.questions.length > 1 && <button type="button" className="btn btn-ghost btn-sm" onClick={() => setF((x) => ({ ...x, questions: x.questions.filter((_, j) => j !== i) }))} aria-label={t('Remove question {n}', { n: i + 1 })}>{t('Remove')}</button>}</div>
                <div><label className="label" htmlFor={`lc-q${i}`}>{t('Question')}</label><input id={`lc-q${i}`} className="input font-mono" maxLength={200} value={q.prompt} onChange={(e) => setQ(i, 'prompt', e.target.value)} placeholder={t('Solve: {eq}', { eq: '3x − 4 = −13' })} /></div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div><label className="label" htmlFor={`lc-a${i}`}>{t('Correct answer')}</label><input id={`lc-a${i}`} className="input font-mono" maxLength={40} value={q.answer} onChange={(e) => setQ(i, 'answer', e.target.value)} placeholder="-3" /></div>
                  <div><label className="label" htmlFor={`lc-w${i}`}>{t('Common wrong answer (optional)')}</label><input id={`lc-w${i}`} className="input font-mono" maxLength={40} value={q.wrong} onChange={(e) => setQ(i, 'wrong', e.target.value)} placeholder="-5.67" /></div>
                </div>
                {q.wrong && <div><label className="label" htmlFor={`lc-y${i}`}>{t('Why students give that answer')}</label><input id={`lc-y${i}`} className="input" maxLength={240} value={q.why} onChange={(e) => setQ(i, 'why', e.target.value)} placeholder={t('They subtract 4 instead of adding it.')} /></div>}
              </fieldset>
            ))}
          </div>
          {err && <p role="alert" className="text-bad text-sm">{err}</p>}
          <button className="btn btn-primary btn-lg justify-self-start">{t('Create & assign')}</button>
        </form>
        <Card className="grid gap-3 content-start">
          <h2 className="font-bold">{t('Assigned')}</h2>
          {state.assignments.length ? state.assignments.map((a) => (
            <div key={a.id} className="panel p-3 grid gap-1">
              <div className="flex items-start justify-between gap-2"><div className="font-semibold">{a.title}</div><button className="btn btn-ghost btn-sm" onClick={() => removeAssignment(a.id)} aria-label={t('Remove {title}', { title: a.title })}>✕</button></div>
              <div className="flex flex-wrap gap-1.5 text-xs"><span className="pill pill-info">{t(a.type)}</span><span className="pill pill-muted">{t(a.difficulty)}</span>{a.classes.map((k) => <span key={k} className="pill pill-violet">{k}</span>)}{a.demo && <span className="pill pill-muted">{t('example')}</span>}</div>
              <div className="text-xs text-muted">{t(a.subject)}{a.subject === 'Math' && CONCEPT[a.concept] ? ` · ${CONCEPT[a.concept].name}` : ''} · {tp(a.questions, '{n} question', '{n} questions')}{a.due ? ` · ${t('due {date}', { date: a.due })}` : ''}</div>
            </div>
          )) : <p className="text-sm text-muted">{t('Nothing assigned yet.')}</p>}
        </Card>
      </div>
    </div>
  );
}
