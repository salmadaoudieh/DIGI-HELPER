import { useRef, useState } from 'react';
import { useStore } from '../lib/store.jsx';
import { analyzeSteps, fmt } from '../../../shared/linear.js';
import { questionFor, checkAnswer } from '../lib/questions.js';
import { logActivity } from '../lib/engine.js';
import { api } from '../lib/api.js';
import { SectionHead, Card, Tabs, Loading } from '../components/ui.jsx';
import { AnswerInput } from '../components/Detective.jsx';
import { t } from '../lib/i18n.js';

const SAMPLE = ['4x − 6 = 2x + 8', '4x − 2x − 6 = 8', '2x + 6 = 8', '2x = 2', 'x = 1'];
const CONCEPT_ID = { 'Negative Numbers': 'neg', 'Linear Equations': 'linear', 'Like Terms': 'linear' };
const MAX_BYTES = 5 * 1024 * 1024;

async function sniff(file) {
  const b = new Uint8Array(await file.slice(0, 12).arrayBuffer());
  const png = b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47;
  const jpg = b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff;
  const webp = b[0] === 0x52 && b[1] === 0x49 && b[2] === 0x46 && b[3] === 0x46 && b[8] === 0x57 && b[9] === 0x45;
  return png || jpg || webp;
}

function Worksheet({ lines, errorIndex }) {
  return (
    <svg viewBox={`0 0 420 ${70 + lines.length * 52}`} className="w-full h-auto rounded-xl" role="img" aria-label={t('Handwritten worksheet: {lines}', { lines: lines.join('; ') })} style={{ background: '#fbf8ef' }}>
      {Array.from({ length: lines.length + 2 }, (_, i) => <line key={i} x1="0" x2="420" y1={50 + i * 52} y2={50 + i * 52} stroke="#c9d7ee" strokeWidth="1" />)}
      <line x1="44" x2="44" y1="0" y2="1000" stroke="#f2a3a3" strokeWidth="1.5" />
      <text x="56" y="32" fontFamily="var(--f-hand)" fontSize="20" fill="#5a6378">{t('Solve: {eq}', { eq: '4x − 6 = 2x + 8' })}</text>
      {lines.map((l, i) => (
        <g key={i}>
          {i === errorIndex && <rect x="50" y={58 + i * 52} width="300" height="40" rx="8" fill="rgba(251,113,133,.18)" stroke="#e11d48" strokeWidth="2" strokeDasharray="5 4" />}
          <text x="22" y={86 + i * 52} fontFamily="var(--f-mono)" fontSize="12" fill="#8a93a8">{i + 1}</text>
          <text x="62" y={88 + i * 52} fontFamily="var(--f-hand)" fontSize="30" fill="#1d2a66" transform={`rotate(${(i % 2 ? -0.6 : 0.5)} 62 ${88 + i * 52})`}>{l}</text>
          {i === errorIndex && <text x="360" y={88 + i * 52} fontSize="22">⚠️</text>}
        </g>
      ))}
    </svg>
  );
}

function Practice({ concept }) {
  const [q, setQ] = useState(() => questionFor(concept === 'neg' ? 'linear' : concept, 3));
  const [v, setV] = useState(''); const [r, setR] = useState(null);
  return (
    <div className="panel p-4 grid gap-3">
      <div className="eyebrow">{t('Similar practice question')}</div>
      <div><span className="text-muted text-sm">{q.prompt}</span> <span className="font-display text-xl font-semibold tnum">{q.display}</span></div>
      <AnswerInput q={q} value={v} onChange={setV} onSubmit={() => setR(checkAnswer(q, v))} id="scan-practice" />
      <div className="flex gap-2"><button className="btn btn-primary btn-sm" onClick={() => setR(checkAnswer(q, v))} disabled={!v}>{t('Check')}</button><button className="btn btn-sm" onClick={() => { setQ(questionFor('linear', 3)); setV(''); setR(null); }}>{t('Another')}</button></div>
      <div aria-live="polite">{r && (r.ok ? <p className="text-good font-semibold">{t('✓ Correct — this time the signs stayed right.')}</p> : r.invalid ? <p className="text-warn text-sm">{t('Type a number.')}</p> : <p className="text-bad text-sm">{(r.mis || r.generic)?.found} {q.hint}</p>)}</div>
    </div>
  );
}

export default function DigiScan() {
  const { srv, state, updateStudent } = useStore();
  const [tab, setTab] = useState('sample');
  const [text, setText] = useState(SAMPLE.join('\n'));
  const [file, setFile] = useState(null); const [preview, setPreview] = useState(null);
  const [busy, setBusy] = useState(false); const [err, setErr] = useState('');
  const [result, setResult] = useState(null);
  const inputRef = useRef(null);

  function done(res, source) {
    setResult({ ...res, source });
    updateStudent((st) => { st.counters.scans = (st.counters.scans || 0) + 1; logActivity(st, res.errorIndex >= 0 ? 'DigiScan checked {n} steps — step {k} flagged' : 'DigiScan checked {n} steps', 'scan', { n: res.steps.length, k: res.errorIndex + 1 }); });
  }

  async function onFile(f) {
    setErr(''); setResult(null);
    if (!f) return;
    if (!['image/png', 'image/jpeg', 'image/webp'].includes(f.type)) { setErr(t('Use a PNG, JPG or WEBP photo.')); return; }
    if (f.size > MAX_BYTES) { setErr(t('That photo is larger than 5 MB. Try a smaller or cropped photo.')); return; }
    if (!(await sniff(f))) { setErr(t('This file does not look like a real image. Try taking the photo again.')); return; }
    setFile(f); setPreview(URL.createObjectURL(f));
  }

  async function scanPhoto() {
    if (!file) return;
    setBusy(true); setErr('');
    try {
      const form = new FormData(); form.append('image', file);
      const res = await api('/scan', { method: 'POST', form, token: state.session?.token, timeout: 60000 });
      if (!res.steps?.length) throw new Error(t('No equations could be read from this photo. Try a clearer, closer photo.'));
      setText(res.steps.join('\n'));
      done({ ...analyzeSteps(res.steps, t), aiNote: res.note }, 'photo');
    } catch (e) { setErr(e.message); } finally { setBusy(false); }
  }

  function analyzeText() {
    const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);
    if (!lines.length) { setErr(t('Write at least one equation per line.')); return; }
    setErr(''); setBusy(true);
    setTimeout(() => { done(analyzeSteps(lines, t), tab); setBusy(false); }, 700);
  }

  const f = result?.finding;
  const conceptId = f?.concept ? CONCEPT_ID[f.concept] || 'linear' : 'linear';

  return (
    <div className="grid gap-5">
      <SectionHead eyebrow="📸 DigiScan" title={t('Check your handwritten work')} desc={t('Upload a photo of an equation you solved by hand. DigiScan reads each line, checks that every step keeps the equation balanced, and points to the step that needs attention.')} />
      <div className="panel p-3 text-sm flex gap-2" role="note" style={{ borderColor: 'color-mix(in srgb, var(--warn) 45%, transparent)' }}>
        <span aria-hidden="true">⚠️</span><span><strong>{t('AI analysis can make mistakes.')}</strong> {t('Reading handwriting is hard. Always verify important work with your teacher.')}</span>
      </div>
      <Tabs label={t('Input method')} value={tab} onChange={(id) => { setTab(id); setResult(null); setErr(''); if (id === 'sample') setText(SAMPLE.join('\n')); if (id === 'type') setText(''); }}
        tabs={[{ id: 'sample', label: t('Sample worksheet'), icon: '📝' }, { id: 'photo', label: t('Upload a photo'), icon: '📸' }, { id: 'type', label: t('Type your steps'), icon: '⌨️' }]} />

      <div className="grid lg:grid-cols-2 gap-5 items-start">
        <Card className="grid gap-4">
          {tab === 'sample' && (<><Worksheet lines={SAMPLE} errorIndex={result ? result.errorIndex : -1} /><button className="btn btn-primary" onClick={analyzeText} disabled={busy}>{busy ? t('Scanning…') : t('🔍 Scan this worksheet')}</button></>)}
          {tab === 'photo' && (
            <>
              <div className="panel border-dashed p-6 grid place-items-center gap-3 text-center cursor-pointer" style={{ borderStyle: 'dashed' }}
                onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); onFile(e.dataTransfer.files?.[0]); }} onClick={() => inputRef.current?.click()}
                role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click(); }} aria-label={t('Choose a photo of your work')}>
                {preview ? <img src={preview} alt={t('Your uploaded worksheet')} className="max-h-72 rounded-lg" /> : <><div className="text-4xl" aria-hidden="true">📷</div><div className="font-semibold">{t('Drop a photo here or choose one')}</div><div className="text-xs text-muted">{t('PNG, JPG or WEBP · up to 5 MB · one equation per line works best')}</div></>}
                <input ref={inputRef} id="scan-file" type="file" accept="image/png,image/jpeg,image/webp" className="sr-only" onChange={(e) => onFile(e.target.files?.[0])} />
              </div>
              {srv.vision ? (
                <button className="btn btn-primary" onClick={scanPhoto} disabled={!file || busy}>{busy ? t('Reading your handwriting…') : t('🔍 Scan photo')}</button>
              ) : (
                <div className="text-sm text-muted grid gap-2">
                  <p>{t('Photo reading needs the Digi Helper server with an AI key. You can still check this work: copy each line from your photo below and DigiScan will find the error.')}</p>
                  <label className="label" htmlFor="scan-transcribe">{t('Your steps (one per line)')}</label>
                  <textarea id="scan-transcribe" className="input font-mono" rows={5} value={text} onChange={(e) => setText(e.target.value.slice(0, 600))} placeholder={'3x − 6 = 12\n3x = 18\nx = 6'} />
                  <button className="btn btn-primary" onClick={analyzeText} disabled={busy || !text.trim()}>{busy ? t('Checking…') : t('Check these steps')}</button>
                </div>
              )}
            </>
          )}
          {tab === 'type' && (
            <>
              <label className="label" htmlFor="scan-text">{t('Write each step of your solution on its own line')}</label>
              <textarea id="scan-text" className="input font-mono" rows={7} value={text} onChange={(e) => setText(e.target.value.slice(0, 600))} placeholder={'5x + 3 = 2x − 9\n3x + 3 = −9\n3x = −6\nx = −2'} />
              <button className="btn btn-primary" onClick={analyzeText} disabled={busy || !text.trim()}>{busy ? t('Checking…') : t('🔍 Check my steps')}</button>
            </>
          )}
          {err && <p role="alert" className="text-bad text-sm">{err}</p>}
        </Card>

        <div className="grid gap-4">
          {busy && <Card><Loading text={t('Checking that every step keeps the equation balanced…')} /></Card>}
          {!busy && !result && <Card className="text-muted text-sm">{t('Results appear here: each step, the one that needs attention, what kind of mistake it was, and a practice question.')}</Card>}
          {!busy && result && (
            <Card glow className="grid gap-4 anim-pop">
              <div className="flex items-start gap-3">
                <div className="text-3xl" aria-hidden="true">{f.type === 'correct' ? '✅' : '📍'}</div>
                <div><div className="eyebrow">{f.type === 'correct' ? t('All steps balanced') : t('DigiScan result')}</div><h2 className="font-display text-xl font-semibold">{f.title}</h2><p className="mt-1 text-[1.05rem]">“{f.detail}”</p></div>
              </div>
              <ol className="grid gap-1.5">
                {result.steps.map((st, i) => {
                  const bad = i === result.errorIndex; const after = result.errorIndex >= 0 && i > result.errorIndex;
                  return (
                    <li key={i} className="panel px-3 py-2 flex items-center gap-3 text-sm" style={bad ? { borderColor: 'var(--bad)', background: 'color-mix(in srgb, var(--bad) 10%, transparent)' } : undefined}>
                      <span className="font-mono text-xs text-muted w-12">{t('Step {n}', { n: i + 1 })}</span>
                      <span className="font-mono flex-1">{st.line}</span>
                      <span className="text-xs">{!st.parsed ? <span className="text-warn">{t('unreadable')}</span> : bad ? <span className="text-bad font-bold">{t('needs attention')}</span> : after ? <span className="text-muted">{t('follows error')}</span> : <span className="text-good">{t('✓ balanced')}</span>}</span>
                    </li>
                  );
                })}
              </ol>
              {f.type !== 'correct' && (
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  <div className="panel p-3"><div className="text-xs text-muted font-bold">{t('Type of mistake')}</div><div className="font-semibold capitalize">{f.type === 'sign' ? t('Sign error') : f.type === 'balance' ? t('Balancing error') : f.type === 'lost-x' ? t('Combining like terms') : t('Arithmetic slip')}</div></div>
                  <div className="panel p-3"><div className="text-xs text-muted font-bold">{t('Concept to review')}</div><div className="font-semibold">{f.conceptLabel || f.concept}</div></div>
                </div>
              )}
              {f.why && <p className="text-sm"><strong>{t('Why:')}</strong> {f.why}</p>}
              {result.correctAnswer !== null && f.type !== 'correct' && <p className="text-sm text-muted">{t('Correct solution:')} <span className="font-mono text-fg">x = {fmt(result.correctAnswer)}</span>{result.studentAnswer !== null && <> · {t('your final line gives')} <span className="font-mono text-bad">x = {fmt(result.studentAnswer)}</span></>}</p>}
              {result.aiNote && <p className="text-xs text-muted">{t('Reader note: {note}', { note: result.aiNote })}</p>}
              {f.type !== 'correct' && <Practice concept={conceptId} />}
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
