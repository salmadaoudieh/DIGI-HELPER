import { useEffect, useMemo, useRef, useState } from 'react';
import { confetti } from '../lib/fx.js';
import { useStore } from '../lib/store.jsx';
import { diagnosticSet, checkAnswer, hydrate, answerLabel, DIAGNOSTIC_SUBJECTS } from '../lib/questions.js';
import { diagnose, applyDiagnostic, demoStudent, algebraMastery, serializeResult, renderDiag, subjectMastery } from '../lib/engine.js';
import { CONCEPT, SUBJECT, conceptsOf } from '../lib/data.js';
import { t, getLang } from '../lib/i18n.js';
import { SectionHead, Card, Ring, Confidence, DemoTag, QDisplay } from '../components/ui.jsx';
import MistakeDetective, { AnswerInput } from '../components/Detective.jsx';
import { api } from '../lib/api.js';

const SUBJECT_CARD = {
  all: { icon: '🌈', hue: '#ec4899', name: () => t('All subjects'), sub: () => t('15 questions · every subject') },
};
const subjectName = (id) => (id === 'all' ? t('All subjects') : SUBJECT[id]?.name);

function scripted(kind) {
  return diagnosticSet('math').map((q) => {
    const a = q[kind] || q.demo; const r = checkAnswer(q, a.answer);
    return { q, ok: r.ok, value: r.value, raw: a.answer, mis: r.mis, generic: r.generic, conf: q.askConf ? a.conf : null, ms: 9000 + (q.difficulty * 4000) };
  });
}

function Results({ results, diag, reassess, onRestart }) {
  const { nav, srv, state, student } = useStore();
  const [open, setOpen] = useState(() => results.findIndex((r) => !r.ok));
  const [ai, setAi] = useState(null);
  const score = results.filter((r) => r.ok).length;
  const confWrong = results.filter((r) => !r.ok && r.conf >= 4).length;
  const confRated = results.filter((r) => r.conf);
  const avgConf = confRated.length ? Math.round((confRated.reduce((a, r) => a + (r.conf - 1) / 4, 0) / confRated.length) * 100) : null;
  const accRated = confRated.length ? Math.round((confRated.filter((r) => r.ok).length / confRated.length) * 100) : null;
  const view = renderDiag(diag);
  const bySubject = diag.bySubject && Object.keys(diag.bySubject).length > 1 ? diag.bySubject : null;

  useEffect(() => {
    if (!srv.ai) return;
    setAi({ loading: true });
    api('/diagnose', { method: 'POST', token: state.session?.token, body: { diagnosis: { headline: view.headline, text: view.text, patterns: diag.patterns, strengths: (diag.strengths || []).map((id) => CONCEPT[id]?.name || id) }, preference: student?.profile?.preference, lang: getLang() } })
      .then((r) => setAi({ text: r.recommendation })).catch(() => setAi(null));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="grid gap-5">
      <div className="grid lg:grid-cols-[auto_1fr] gap-5">
        <Card className="grid place-items-center gap-2 text-center px-8">
          <Ring value={(score / results.length) * 100} size={140} sub={t('{score} of {total}', { score, total: results.length })} label={t('Score')} />
          <div className="text-sm text-muted">{t('Score is only the start.')}</div>
        </Card>
        <Card glow className="grid gap-3">
          <div className="eyebrow">{reassess ? t('Reassessment diagnosis') : t('Learning Diagnosis')}{diag.subject ? ` · ${subjectName(diag.subject)}` : ''}</div>
          <h2 className="font-display text-xl sm:text-2xl font-semibold">{view.headline}</h2>
          <p className="text-[1.05rem]">“{view.text}”</p>
          {view.extra?.length > 0 && <ul className="grid gap-1 text-sm text-muted">{view.extra.map((e) => <li key={e}>• {e}</li>)}</ul>}
          {ai?.loading && <div className="skeleton h-12" aria-label={t('Loading AI recommendation')} />}
          {ai?.text && <div className="panel p-3 text-sm"><div className="eyebrow mb-1">✦ {t('AI recommendation')}</div>{ai.text}</div>}
          <div className="flex flex-wrap gap-2 mt-1">
            <button className="btn btn-primary" onClick={() => nav('path')}>{t('Get my personalized path')} <span className="dir-arrow">→</span></button>
            <button className="btn" onClick={() => nav('mind', { focus: diag.focus?.[0], subject: CONCEPT[diag.focus?.[0]]?.subject })}>{t('See it on DigiMind')}</button>
            {!reassess && <button className="btn btn-ghost" onClick={onRestart}>{t('Retake')}</button>}
          </div>
        </Card>
      </div>

      {bySubject && (
        <Card>
          <h3 className="font-bold mb-3">{t('Results by subject')}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {Object.entries(bySubject).map(([sj, b]) => {
              const pct = Math.round((b.ok / b.n) * 100);
              return (
                <div key={sj} className="panel p-3 grid gap-2 hue-card overflow-hidden" style={{ '--h': SUBJECT[sj].hue }}>
                  <div className="flex items-center gap-2"><span className="hue-chip w-8 h-8" style={{ '--h': SUBJECT[sj].hue }} aria-hidden="true">{SUBJECT[sj].icon}</span><span className="font-semibold text-sm">{SUBJECT[sj].name}</span></div>
                  <div className="font-display text-2xl font-semibold tnum">{pct}%</div>
                  <div className="text-xs text-muted">{t('{score} of {total}', { score: b.ok, total: b.n })}</div>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      <div className="grid lg:grid-cols-[1fr_340px] gap-5">
        <Card>
          <h3 className="font-bold mb-3">{t('Question by question')}</h3>
          <div className="scroll-x">
            <table className="w-full text-sm min-w-[560px]">
              <thead><tr className="text-start text-xs text-muted uppercase tracking-wider"><th className="py-2 pe-2 text-start">#</th><th className="pe-2 text-start">{t('Concept')}</th><th className="pe-2 text-start">{t('Question')}</th><th className="pe-2 text-start">{t('Your answer')}</th><th className="pe-2 text-start">{t('Confidence')}</th><th className="text-start">{t('Pattern')}</th></tr></thead>
              <tbody>
                {results.map((r, i) => (
                  <tr key={i} className="border-t border-line align-top">
                    <td className="py-2.5 pe-2 font-mono">{i + 1}</td>
                    <td className="pe-2"><span className="inline-flex items-center gap-1.5"><span className="w-2 h-2 rounded-full shrink-0" style={{ background: CONCEPT[r.q.skill]?.hue }} aria-hidden="true" />{CONCEPT[r.q.skill]?.short}</span></td>
                    <td className={`pe-2 max-w-[240px] ${r.q.textual ? 'line-clamp-2' : 'math font-mono'}`}>{r.q.textual ? r.q.display.split('\n')[0] : r.q.display}</td>
                    <td className="pe-2 font-semibold max-w-[160px]" style={{ color: r.ok ? 'var(--good)' : 'var(--bad)' }}>{r.ok ? '✓' : '✗'} {answerLabel(r.q, r.raw)}</td>
                    <td className="pe-2 font-mono">{r.conf ? `${r.conf}/5` : '—'}</td>
                    <td>{r.ok ? <span className="text-muted">—</span> : <button className="text-start underline decoration-dotted text-cyan" onClick={() => setOpen(i)}>{t((r.mis || r.generic)?.label)}</button>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
        <Card className="grid gap-3 content-start">
          <h3 className="font-bold">{t('Confidence vs Knowledge')}</h3>
          {avgConf !== null ? <>
            <div className="grid grid-cols-2 gap-3 tnum">
              <div className="panel p-3"><div className="text-xs text-muted font-bold">{t('Confidence')}</div><div className="font-mono text-2xl font-semibold">{avgConf}%</div></div>
              <div className="panel p-3"><div className="text-xs text-muted font-bold">{t('Accuracy')}</div><div className="font-mono text-2xl font-semibold" style={{ color: accRated < avgConf - 15 ? 'var(--bad)' : 'var(--good)' }}>{accRated}%</div></div>
            </div>
            {accRated < avgConf - 15
              ? <p className="text-sm"><strong className="text-warn">{t('Learning Confidence Gap.')}</strong> {confWrong === 1 ? t('You felt confident on 1 question you missed. That topic feels familiar but needs another review.') : t('You felt confident on {n} questions you missed. Those topics feel familiar but need another review.', { n: confWrong })}</p>
              : <p className="text-sm text-muted">{t("Your confidence matches your results well — that's a real learning skill.")}</p>}
          </> : <p className="text-sm text-muted">{t('No confidence ratings this time.')}</p>}
        </Card>
      </div>

      {open >= 0 && !results[open]?.ok && (
        <div className="grid gap-3">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label={t('Incorrect answers')}>
            {results.map((r, i) => !r.ok && <button key={i} role="tab" aria-selected={open === i} className={`chip ${open === i ? 'on' : ''}`} onClick={() => setOpen(i)}>{t('Q{n}', { n: i + 1 })} · {CONCEPT[r.q.skill]?.short}</button>)}
          </div>
          <MistakeDetective key={open} q={results[open].q} raw={results[open].raw} result={results[open]} />
        </div>
      )}
    </div>
  );
}

function SubjectPicker({ value, onChange, student }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3" role="radiogroup" aria-label={t('Choose a subject')}>
      {DIAGNOSTIC_SUBJECTS.map((id) => {
        const meta = id === 'all' ? SUBJECT_CARD.all : SUBJECT[id];
        const name = id === 'all' ? SUBJECT_CARD.all.name() : meta.name;
        const sub = id === 'all' ? SUBJECT_CARD.all.sub() : t('{n} concepts · 10 questions', { n: conceptsOf(id).length });
        const mastery = id === 'all' ? null : subjectMastery(student, id);
        const on = value === id;
        return (
          <button key={id} role="radio" aria-checked={on} onClick={() => onChange(id)} data-tilt="8"
            className="glass p-4 text-start grid gap-2 relative overflow-hidden transition"
            style={{ background: `linear-gradient(160deg, color-mix(in srgb, ${meta.hue} ${on ? 32 : 12}%, var(--surface)), var(--surface))`, ...(on ? { borderColor: meta.hue, boxShadow: `0 0 0 1px ${meta.hue}, 0 16px 34px -16px ${meta.hue}` } : {}) }}>
            <div className="flex items-center justify-between gap-2">
              <span className="hue-chip w-11 h-11 text-2xl" style={{ '--h': meta.hue }} aria-hidden="true">{meta.icon}</span>
              {on && <span className="pill pill-good">✓</span>}
            </div>
            <div className="font-display font-semibold">{name}</div>
            <div className="text-xs text-muted">{sub}</div>
            {mastery !== null && <div className="text-xs"><span className="text-muted">{t('Current mastery')}:</span> <span className="font-mono font-semibold">{mastery}%</span></div>}
          </button>
        );
      })}
    </div>
  );
}

export default function Diagnostic() {
  const { student: s, updateStudent, params, state, nav } = useStore();
  const isDemo = state.session?.id === 'demo';
  const reassess = !!params.reassess;
  const [subject, setSubject] = useState(params.subject || (isDemo ? 'math' : s.diagnoses[0]?.subject || 'math'));
  const qs = useMemo(() => diagnosticSet(subject, { reassess }), [subject, params.demoStep, params.reassess, state.lang]); // eslint-disable-line react-hooks/exhaustive-deps
  const [phase, setPhase] = useState('intro');
  const [i, setI] = useState(0);
  const [val, setVal] = useState(''); const [conf, setConf] = useState(null);
  const [results, setResults] = useState([]);
  const [diag, setDiag] = useState(null);
  const [warn, setWarn] = useState('');
  const t0 = useRef(Date.now());
  const auto = useRef(false);
  const canAutoplay = isDemo && subject === 'math';

  const showStored = () => {
    const stored = s.lastResults?.length ? s.lastResults.map(hydrate) : scripted('demo');
    setResults(stored); setDiag(s.diagnoses[0] || diagnose(stored, 'math')); setPhase('results');
  };
  // demo step 2 or revisiting: show stored results
  useEffect(() => {
    if (params.view === 'results') showStored();
    else { setPhase('intro'); setI(0); setResults([]); setVal(''); setConf(null); }
  }, [params.view, params.demoStep, params.reassess]); // eslint-disable-line react-hooks/exhaustive-deps
  // Rebuild results in the new language when the language changes
  useEffect(() => { if (phase === 'results' && results.length) setResults((rs) => rs.map((r) => hydrate({ ...r, q: { ...r.q } }))); }, [state.lang]); // eslint-disable-line react-hooks/exhaustive-deps

  const q = qs[i];
  const needConf = q?.askConf && conf === null;
  useEffect(() => { t0.current = Date.now(); }, [i, needConf]);

  function submit(answer = val, c = conf) {
    if (!answer) { setWarn(t('Enter an answer first — a guess is fine.')); return; }
    const r = checkAnswer(q, answer);
    if (r.invalid) { setWarn(q.skill === 'frac' ? t('Type a fraction like 3/4 or a number.') : t('Type a number, like 7 or −3.')); return; }
    setWarn('');
    const res = { q, ok: r.ok, value: r.value, raw: answer, mis: r.mis, generic: r.generic, conf: q.askConf ? c : null, ms: Date.now() - t0.current };
    const all = [...results, res]; setResults(all);
    if (i + 1 < qs.length) { setI(i + 1); setVal(''); setConf(null); }
    else finish(all);
  }

  function finish(all) {
    const d = diagnose(all, subject);
    setDiag(d);
    const ser = all.map(serializeResult);
    updateStudent((st) => {
      if (isDemo && subject === 'math') {
        const preset = demoStudent(reassess ? 'after' : 'before');
        if (!reassess) preset.diagnoses = [{ ...d, at: 'Day 1' }];
        Object.keys(preset).forEach((k) => { st[k] = preset[k]; });
      } else applyDiagnostic(st, all, d, { reassess });
      st.lastResults = ser;
      st.lastMistakes = ser.filter((x) => !x.ok);
    });
    setPhase('results'); auto.current = false;
    setTimeout(() => confetti({ count: 100 }), 300);
  }

  // Demo Student autoplay (math story)
  function answerAsDemo() {
    const a = q[reassess ? 'reassess' : 'demo']; if (!a) return;
    if (q.askConf && conf === null) setConf(a.conf);
    setVal(a.answer);
    setTimeout(() => submit(a.answer, q.askConf ? a.conf : null), 550);
  }
  useEffect(() => { if (auto.current && phase === 'run') { const id = setTimeout(answerAsDemo, 650); return () => clearTimeout(id); } return undefined; }, [i, phase]); // eslint-disable-line react-hooks/exhaustive-deps

  if (phase === 'results' && diag) return (
    <div className="grid gap-5">
      <SectionHead eyebrow={reassess ? t('Reassessment') : t('AI Learning Diagnosis')} title={reassess ? t('How much has changed?') : t('Your diagnostic results')} right={isDemo ? <DemoTag /> : null}
        desc={reassess && (diag.subject || 'math') === 'math' ? t('Algebra mastery now: {v}%.', { v: algebraMastery(s) ?? '—' }) : t('Digi Helper analysed which concepts you missed, the patterns in your answers, question difficulty, time and confidence.')} />
      <Results results={results} diag={diag} reassess={reassess} onRestart={() => { setPhase('intro'); setI(0); setResults([]); }} />
    </div>
  );

  if (phase === 'intro') {
    const nConf = qs.filter((x) => x.askConf).length;
    const nConcepts = new Set(qs.map((x) => x.skill)).size;
    const title = subject === 'math' ? (reassess ? t('Algebra reassessment') : t('Algebra diagnostic')) : reassess ? t('{subject} reassessment', { subject: subjectName(subject) }) : t('{subject} diagnostic', { subject: subjectName(subject) });
    return (
      <div className="grid gap-5 max-w-4xl">
        <SectionHead eyebrow={reassess ? t('Reassessment') : t('Diagnostic')} title={title}
          desc={t('{n} questions across {c} concepts. Before some questions we ask how confident you are — be honest, it helps us find blind spots.', { n: qs.length, c: nConcepts })} right={isDemo ? <DemoTag /> : null} />
        <div className="grid gap-2">
          <h2 className="font-bold">{t('Which subject do you want to check?')}</h2>
          <SubjectPicker value={subject} onChange={setSubject} student={s} />
        </div>
        <Card glow className="grid gap-4">
          <ul className="grid sm:grid-cols-3 gap-3 text-sm">
            <li className="panel p-3"><div className="font-bold">⏱ {t('About {m} minutes', { m: Math.round(qs.length * 0.8) })}</div><div className="text-muted">{t('Take your time — speed is noted, not punished.')}</div></li>
            <li className="panel p-3"><div className="font-bold">🎯 {t('Confidence check')}</div><div className="text-muted">{t('Rate 1–5 before {n} of the questions.', { n: nConf })}</div></li>
            <li className="panel p-3"><div className="font-bold">🔎 {t('No “wrong” stamps')}</div><div className="text-muted">{t('Mistakes become explanations afterwards.')}</div></li>
          </ul>
          <div className="flex flex-wrap gap-2">
            <button className="btn btn-primary btn-lg" onClick={() => { setPhase('run'); setI(0); setResults([]); }}>{t('Begin')} <span className="dir-arrow">→</span></button>
            {canAutoplay && <button className="btn btn-lg" onClick={() => { auto.current = true; setPhase('run'); setI(0); setResults([]); }}>▶ {t('Auto-play Demo Student')}</button>}
          </div>
        </Card>
        {!isDemo && s.diagnoses.length > 0 && <button className="btn btn-ghost justify-self-start" onClick={() => { if (s.lastResults?.length) showStored(); }}>{t('View last results')}</button>}
        {!isDemo && s.diagnoses.length > 0 && !reassess && <button className="btn justify-self-start" onClick={() => nav('diagnostic', { reassess: true, subject })}>{t('Take a reassessment instead')}</button>}
      </div>
    );
  }

  const diffName = ['', t('Easy'), t('Medium'), t('Hard'), t('Advanced')][q.difficulty];
  return (
    <div className="grid gap-5 max-w-3xl">
      <div className="flex items-center gap-3">
        <span className="font-mono text-sm text-muted">{t('Question {n} / {total}', { n: i + 1, total: qs.length })}</span>
        <div className="bar flex-1"><span style={{ width: `${(i / qs.length) * 100}%`, background: 'linear-gradient(90deg,var(--accent),var(--cyan),var(--pink))' }} /></div>
      </div>
      <Card glow className="grid gap-5" key={i}>
        <div className="flex flex-wrap gap-2">
          <span className="pill" style={{ color: SUBJECT[CONCEPT[q.skill].subject].hue, borderColor: 'currentColor' }}>{SUBJECT[CONCEPT[q.skill].subject].icon} {SUBJECT[CONCEPT[q.skill].subject].name}</span>
          <span className="pill pill-info">{CONCEPT[q.skill].name}</span><span className="pill pill-muted">{diffName}</span>
        </div>
        <div className="anim-up grid gap-1"><div className="text-muted">{q.prompt}</div><QDisplay q={q} /></div>
        {needConf ? (
          <Confidence value={conf} onChange={setConf} />
        ) : (
          <div className="grid gap-3 anim-up">
            {q.askConf && <div className="text-xs text-muted">{t('Confidence')}: <strong className="text-fg">{conf}/5</strong> <button className="underline" onClick={() => setConf(null)}>{t('change')}</button></div>}
            <AnswerInput q={q} value={val} onChange={setVal} onSubmit={() => submit()} id={`diag-${i}`} />
            {warn && <p className="text-warn text-sm" role="alert">{warn}</p>}
            <div className="flex flex-wrap gap-2">
              <button className="btn btn-primary" onClick={() => submit()}>{i + 1 === qs.length ? t('Finish & analyse') : <>{t('Next')} <span className="dir-arrow">→</span></>}</button>
            </div>
          </div>
        )}
        {canAutoplay && <button className="btn btn-sm justify-self-start" style={{ borderColor: 'var(--violet)' }} onClick={answerAsDemo}>▶ {t('Answer as Demo Student')}</button>}
      </Card>
      {q.type !== 'mc' && <p className="text-xs text-faint">{t('Tip: negative numbers can be typed with a normal minus, e.g. -4.')} {q.skill === 'frac' ? t('Fractions like 5/6 are fine.') : ''}</p>}
    </div>
  );
}
