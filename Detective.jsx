import { useMemo, useState } from 'react';
import { t } from '../lib/i18n.js';
import { useStore } from '../lib/store.jsx';
import { makeQuestion, checkAnswer, hydrate } from '../lib/questions.js';
import { CONCEPT } from '../lib/data.js';
import { SectionHead, Card } from '../components/ui.jsx';
import MistakeDetective from '../components/Detective.jsx';

export default function DetectivePage() {
  const { student: s, nav } = useStore();
  const sample = useMemo(() => { const q = makeQuestion('twoStep', { a: 3, x: 5, b: 5 }); const r = checkAnswer(q, '3'); return { q, raw: '3', mis: r.mis, generic: r.generic, sample: true }; }, []);
  const list = useMemo(() => (s.lastMistakes?.length ? s.lastMistakes.map(hydrate) : [sample]), [s.lastMistakes, sample]);
  const start = Math.max(0, list.findIndex((r) => r.q.gen === 'twoStep'));
  const [idx, setIdx] = useState(start);
  const cur = list[Math.min(idx, list.length - 1)];
  const counts = Object.entries(s.mistakes || {}).flatMap(([cid, b]) => Object.values(b).map((v) => ({ ...v, concept: CONCEPT[cid]?.short }))).sort((a, b) => b.count - a.count).slice(0, 5);

  return (
    <div className="grid gap-5">
      <SectionHead eyebrow={t('🔎 Mistake Detective')} title={t('Every mistake has a reason')} desc={t('Instead of “wrong answer”, Mistake Detective works out the likely misconception, explains why, lets you fix it step by step, and gives you a similar question to prove it.')} />
      <div className="grid xl:grid-cols-[1fr_320px] gap-5">
        <div className="grid gap-3 content-start">
          {list.length > 1 && (
            <div className="flex flex-wrap gap-2" role="tablist" aria-label={t('Recent mistakes')}>
              {list.map((r, i) => <button key={i} role="tab" aria-selected={i === idx} className={`chip ${i === idx ? 'on' : ''}`} onClick={() => setIdx(i)}><span className={r.q.textual ? 'truncate max-w-[220px]' : 'math font-mono'}>{r.q.textual ? r.q.display.split('\n')[0] : r.q.display}</span></button>)}
            </div>
          )}
          {cur.sample && <p className="text-sm text-muted">{t('Sample case — your own mistakes from the diagnostic and practice will appear here.')}</p>}
          <MistakeDetective key={`${idx}-${cur.q.display}`} q={cur.q} raw={cur.raw ?? cur.value} result={cur} />
        </div>
        <Card className="grid gap-3 content-start">
          <h2 className="font-bold">{t('Your repeated patterns')}</h2>
          {counts.length ? <ul className="grid gap-2">{counts.map((c) => <li key={c.label + c.concept} className="panel px-3 py-2.5 flex items-center justify-between gap-2 text-sm"><span><span className="font-semibold">{t(c.label)}</span><span className="block text-xs text-muted">{c.concept}</span></span><span className="font-mono">×{c.count}</span></li>)}</ul> : <p className="text-sm text-muted">{t('No patterns yet.')}</p>}
          <p className="text-xs text-muted">{t('Fix a repeated pattern 10 times to earn the {badge} badge. Progress: {n}/10.', { badge: t('Mistake Master'), n: s.counters?.fixedRepeats || 0 })}</p>
          <button className="btn btn-sm justify-self-start" onClick={() => nav('learn', { mode: 'practice' })}>{t('Practice more →')}</button>
        </Card>
      </div>
    </div>
  );
}
