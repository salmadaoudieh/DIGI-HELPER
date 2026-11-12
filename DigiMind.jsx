import { useEffect, useState } from 'react';
import { t, dayLabel } from '../lib/i18n.js';
import { useStore } from '../lib/store.jsx';
import { CONCEPT, MODES, EDGES, STATUS, statusOf, SUBJECT, SUBJECT_LIST, conceptsOf } from '../lib/data.js';
import { recommendMode, confidenceGap, isUnlockedConcept } from '../lib/engine.js';
import DigiMindMap from '../components/DigiMindMap.jsx';
import { SectionHead, Card, StatusPill, Bar, Empty } from '../components/ui.jsx';
import { Sparkline } from '../components/Charts.jsx';

function Detail({ s, id, onClose }) {
  const { nav } = useStore();
  const c = CONCEPT[id]; const v = s.mastery[id];
  const attempts = (s.attempts[id] || []).slice(-8);
  const mistakes = Object.values(s.mistakes[id] || {}).sort((a, b) => b.count - a.count);
  const conf = s.confidence[id];
  const gap = confidenceGap(s, id);
  const hist = (s.history[id] || []).map((h) => h.v);
  const mode = recommendMode(s, id);
  const last = (s.history[id] || []).slice(-1)[0];
  const first = (s.history[id] || [])[0];
  const prereq = EDGES.filter(([, b]) => b === id).map(([a]) => CONCEPT[a]);
  const locked = !isUnlockedConcept(s, id);
  return (
    <Card className="grid gap-4 content-start anim-pop" aria-live="polite">
      <div className="flex items-start justify-between gap-3">
        <div><div className="eyebrow">{t('Concept')}</div><h2 className="font-display text-xl font-semibold">{c.name}</h2><p className="text-sm text-muted mt-1">{c.desc}</p></div>
        <button className="btn btn-ghost btn-sm" onClick={onClose} aria-label={t('Close details')}>✕</button>
      </div>
      <div className="flex items-center gap-3 flex-wrap"><StatusPill value={v} />{locked && <span className="pill pill-muted">{t('🔒 Locked area')}</span>}{gap !== null && gap >= 20 && <span className="pill pill-warn">{t('⚖ Confidence gap +{n}', { n: gap })}</span>}</div>

      {v === null || v === undefined ? <p className="text-sm text-muted">{t('Not assessed yet. The diagnostic or a practice session will fill this in.')}</p> : (
        <>
          <div className="grid grid-cols-2 gap-3">
            <div className="panel p-3"><div className="text-xs text-muted font-bold">{t('Mastery')}</div><div className="font-display text-2xl font-semibold tnum">{Math.round(v)}%</div><Bar value={v} className="mt-2" label={t('Mastery')} /></div>
            <div className="panel p-3"><div className="text-xs text-muted font-bold">{t('Confidence')}</div><div className="font-display text-2xl font-semibold tnum">{conf === undefined ? '—' : `${Math.round(conf)}%`}</div><Bar value={conf ?? 0} color="var(--violet)" className="mt-2" label={t('Confidence')} /></div>
          </div>
          <div>
            <div className="text-xs text-muted font-bold mb-1.5">{t('Recent performance')}</div>
            <div className="flex gap-1.5" aria-label={t('{ok} of {n} recent answers correct', { ok: attempts.filter((a) => a.ok).length, n: attempts.length })}>
              {attempts.length ? attempts.map((a, i) => <span key={i} className="w-7 h-7 grid place-items-center rounded-lg text-xs font-bold" style={{ background: `color-mix(in srgb, ${a.ok ? 'var(--good)' : 'var(--bad)'} 20%, transparent)`, color: a.ok ? 'var(--good)' : 'var(--bad)' }}>{a.ok ? '✓' : '✗'}</span>) : <span className="text-sm text-muted">{t('No attempts yet')}</span>}
            </div>
          </div>
          <div>
            <div className="text-xs text-muted font-bold mb-1.5">{t('Improvement over time')} {first && last && last.v !== first.v && <span className={last.v > first.v ? 'text-good' : 'text-bad'}>{t('({n} pts)', { n: `${last.v > first.v ? '+' : ''}${Math.round(last.v - first.v)}` })}</span>}</div>
            {hist.length > 1 ? <Sparkline data={hist} color={v >= 75 ? 'good' : v >= 50 ? 'warn' : 'bad'} height={56} /> : <p className="text-sm text-muted">{t('One data point so far.')}</p>}
          </div>
          <div>
            <div className="text-xs text-muted font-bold mb-1.5">{t('Common mistakes')}</div>
            {mistakes.length ? <ul className="grid gap-1.5">{mistakes.slice(0, 3).map((mm) => <li key={mm.label} className="flex justify-between text-sm panel px-3 py-2"><span>{t(mm.label)}</span><span className="font-mono text-muted">×{mm.count}</span></li>)}</ul> : <p className="text-sm text-muted">{t('No repeated mistakes found.')}</p>}
          </div>
          <div className="text-sm text-muted">{t('Last attempted:')} <span className="text-fg font-semibold">{last?.d ? dayLabel(last.d) : '—'}</span></div>
          {prereq.length > 0 && <div className="text-sm text-muted">{t('Builds on:')} {prereq.map((p) => <span key={p.id} className="text-fg font-semibold me-2">{p.short} <span className="font-mono text-xs">({s.mastery[p.id] === null ? '—' : Math.round(s.mastery[p.id])})</span></span>)}</div>}
        </>
      )}
      <div className="panel p-4 grid gap-2" style={{ borderColor: 'color-mix(in srgb, var(--cyan) 40%, transparent)' }}>
        <div className="eyebrow">{t('Recommended activity')}</div>
        <div className="font-semibold">{MODES[mode].icon} {t('{mode} mode · {concept}', { mode: MODES[mode].name, concept: c.short })}</div>
        <button className="btn btn-primary btn-sm justify-self-start" disabled={locked} onClick={() => nav('learn', { concept: id, mode })}>{locked ? t('Unlock it first') : t('Start activity →')}</button>
      </div>
    </Card>
  );
}

export default function DigiMind() {
  const { student: s, params, nav } = useStore();
  const initial = params.subject || (params.focus && CONCEPT[params.focus]?.subject) || 'math';
  const [subject, setSubject] = useState(initial);
  const [sel, setSel] = useState(params.focus || null);
  useEffect(() => { if (params.focus) { setSel(params.focus); setSubject(CONCEPT[params.focus]?.subject || 'math'); } }, [params.focus]);
  const list = conceptsOf(subject);
  const counts = { mastered: 0, developing: 0, attention: 0, new: 0 };
  list.forEach((c) => { counts[statusOf(s.mastery[c.id])]++; });
  const locked = list.filter((c) => !isUnlockedConcept(s, c.id)).map((c) => c.id);
  const empty = list.every((c) => s.mastery[c.id] === null || s.mastery[c.id] === undefined);
  const weakHere = list.filter((c) => s.mastery[c.id] !== null && s.mastery[c.id] !== undefined && isUnlockedConcept(s, c.id)).sort((a, b) => s.mastery[a.id] - s.mastery[b.id])[0];
  const focus = params.focus && CONCEPT[params.focus]?.subject === subject ? params.focus : (weakHere && statusOf(s.mastery[weakHere.id]) === 'attention' ? weakHere.id : null);
  const sj = SUBJECT[subject];

  return (
    <div className="grid gap-5">
      <SectionHead eyebrow="DigiMind" title={t('Your knowledge map')} desc={t('Every concept is a node. Lines show which skills build on which. Red flowing lines mark where a weak foundation is holding other skills back.')} />
      <div className="flex flex-wrap gap-2" role="tablist" aria-label={t('Subjects')}>
        {SUBJECT_LIST.map((x) => {
          const on = x.id === subject;
          return (
            <button key={x.id} role="tab" aria-selected={on} onClick={() => { setSubject(x.id); setSel(null); }} className="chip"
              style={on ? { borderColor: x.hue, background: `color-mix(in srgb, ${x.hue} 24%, transparent)`, color: 'var(--fg)' } : undefined}>
              <span aria-hidden="true">{x.icon}</span>{x.name}
            </button>
          );
        })}
      </div>
      {empty ? <Empty icon={sj.icon} title={t('This map is waiting')} action={<button className="btn btn-primary" onClick={() => nav('diagnostic', { subject })}>{t('Take the {subject} diagnostic', { subject: sj.name })}</button>}>{t('The diagnostic places every concept on the map.')}</Empty> : (
        <>
          <div className="flex flex-wrap gap-2" aria-label={t('Legend')}>
            {['mastered', 'developing', 'attention', 'new'].map((k) => <span key={k} className={`pill ${STATUS[k].cls}`}><span aria-hidden="true">{STATUS[k].icon}</span>{STATUS[k].label} · {counts[k]}</span>)}
          </div>
          {focus && (
            <div className="glass p-4 flex flex-wrap items-center gap-3 anim-pop" style={{ borderColor: 'color-mix(in srgb, var(--bad) 45%, transparent)' }}>
              <span className="text-2xl" aria-hidden="true">📍</span>
              <div className="flex-1 min-w-[200px]"><div className="font-semibold">{t('DigiMind detected a weak root concept: {name}', { name: CONCEPT[focus].name })}</div><div className="text-sm text-muted">{t('{n} other skills depend on it, so fixing it lifts them too.', { n: EDGES.filter(([a]) => a === focus).length })}</div></div>
              <button className="btn btn-sm" onClick={() => setSel(focus)}>{t('Inspect')}</button>
            </div>
          )}
          <div className={`grid gap-5 ${sel ? 'xl:grid-cols-[1fr_380px]' : ''}`}>
            <Card className="p-3 sm:p-5">
              <div className="scroll-x"><div className="min-w-[720px]"><DigiMindMap subject={subject} mastery={s.mastery} selected={sel} focus={focus} onSelect={setSel} lockedIds={locked} interactive /></div></div>
              <p className="text-xs text-muted mt-2">{t('Hover a concept to light up its learning chain · drag to move, +/− to zoom · select a node (or Tab + Enter) for details.')}</p>
            </Card>
            {sel && <Detail s={s} id={sel} onClose={() => setSel(null)} />}
          </div>
        </>
      )}
    </div>
  );
}
