import { useEffect, useRef, useState } from 'react';
import { useStore } from '../lib/store.jsx';
import { askTutor } from '../lib/tutor.js';
import { recordAttempt } from '../lib/engine.js';
import { clean } from '../lib/api.js';
import { CONCEPT } from '../lib/data.js';
import { t } from '../lib/i18n.js';

export function openTutor(message) { window.dispatchEvent(new CustomEvent('dh:tutor', { detail: { message } })); }

function Bubble({ m }) {
  const mine = m.role === 'user';
  return (
    <div className={`flex ${mine ? 'justify-end' : 'justify-start'} gap-2`}>
      {!mine && <div className="w-7 h-7 shrink-0 rounded-lg grid place-items-center text-xs font-bold" style={{ background: 'linear-gradient(135deg,var(--accent),var(--violet))', color: '#fff' }} aria-hidden="true">DH</div>}
      <div className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm whitespace-pre-wrap leading-relaxed ${mine ? 'rounded-ee-md' : 'rounded-es-md panel'}`}
        style={mine ? { background: 'linear-gradient(135deg, var(--accent), color-mix(in srgb, var(--accent) 60%, var(--violet)))', color: 'var(--accent-fg)' } : undefined}>
        {m.content}
        {m.source === 'ai' && <div className="text-[0.65rem] text-faint mt-1">{t('AI tutor')}</div>}
      </div>
    </div>
  );
}

export function TutorChat({ concept, question, height = 420, autoFocus, listen }) {
  const { student, updateStudent, state } = useStore();
  const first = student?.profile?.name?.split(' ')[0];
  const intro = concept
    ? t('Let\'s talk about {name}. Ask me anything — "explain it", "give me a hint", or "practice".', { name: CONCEPT[concept]?.name })
    : first
      ? t("Hi {name}! I'm Digi Helper. I'll help you understand, not just give you answers. Try pasting an equation like 3x + 5 = 20.", { name: first })
      : t("Hi! I'm Digi Helper. I'll help you understand, not just give you answers. Try pasting an equation like 3x + 5 = 20.");
  const [msgs, setMsgs] = useState([{ role: 'assistant', content: intro }]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [memory, setMemory] = useState({});
  const listRef = useRef(null); const inputRef = useRef(null);

  useEffect(() => { listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' }); }, [msgs, busy]);
  useEffect(() => { if (autoFocus) inputRef.current?.focus(); }, [autoFocus]);
  useEffect(() => {
    if (!listen) return undefined;
    const onOpen = (e) => { if (e.detail?.message) send(e.detail.message); };
    window.addEventListener('dh:tutor-send', onOpen);
    return () => window.removeEventListener('dh:tutor-send', onOpen);
  });

  async function send(text) {
    const msg = clean(text, 1000); if (!msg || busy) return;
    const history = msgs.filter((m) => m.role !== 'system');
    setMsgs((m) => [...m, { role: 'user', content: msg }]); setInput(''); setBusy(true);
    try {
      const res = await askTutor({ message: msg, history, student, memory, context: { concept, question }, token: state.session?.token });
      setMemory(res.memory || {});
      if (res.record && student) updateStudent((s) => { recordAttempt(s, res.record.skill, { ok: res.record.ok, mis: res.record.mis, difficulty: 2 }); });
      setMsgs((m) => [...m, { role: 'assistant', content: res.reply, source: res.source }]);
    } catch {
      setMsgs((m) => [...m, { role: 'assistant', content: t('I could not answer that just now. Try again in a moment.') }]);
    } finally { setBusy(false); }
  }

  const chips = question ? [t('Give me a hint'), t('Why is my answer wrong?'), t('Explain it visually')] : [t('Explain negative numbers'), t('Practice'), t('Why was I wrong?'), t('Give me a hint')];
  return (
    <div className="flex flex-col min-h-0" style={{ height }}>
      <div ref={listRef} className="flex-1 overflow-y-auto grid content-start gap-3 p-1 pe-2" aria-live="polite">
        {msgs.map((m, i) => <Bubble key={i} m={m} />)}
        {busy && <div className="panel w-16 px-3 py-2 typing text-lg leading-none" aria-label={t('Digi Helper is typing')}><span>•</span><span>•</span><span>•</span></div>}
      </div>
      <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-2">{chips.map((c) => <button key={c} className="chip shrink-0" onClick={() => send(c)}>{c}</button>)}</div>
      <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); send(input); }}>
        <label htmlFor={`tutor-input-${concept || 'main'}`} className="sr-only">{t('Message Digi Helper')}</label>
        <input id={`tutor-input-${concept || 'main'}`} ref={inputRef} className="input" placeholder={t('Ask, paste an equation, or answer…')} value={input} onChange={(e) => setInput(e.target.value)} maxLength={1000} autoComplete="off" />
        <button className="btn btn-primary" disabled={busy || !input.trim()} aria-label={t('Send')}><span className="inline-block rtl:-scale-x-100" aria-hidden="true">➤</span></button>
      </form>
    </div>
  );
}

export default function Tutor() {
  const [open, setOpen] = useState(false);
  const { srv } = useStore();
  useEffect(() => {
    const onOpen = (e) => { setOpen(true); if (e.detail?.message) setTimeout(() => window.dispatchEvent(new CustomEvent('dh:tutor-send', { detail: e.detail })), 120); };
    window.addEventListener('dh:tutor', onOpen);
    return () => window.removeEventListener('dh:tutor', onOpen);
  }, []);
  return (
    <>
      {open && (
        <div className="fixed z-[75] glass glow-edge flex flex-col p-4 anim-pop"
          style={{ right: 'max(16px, env(safe-area-inset-right, 0px))', bottom: 'calc(84px + env(safe-area-inset-bottom, 0px))', width: 'min(400px, calc(100vw - 32px))', background: 'var(--surface-solid)' }}
          role="dialog" aria-label={t('Digi Helper assistant')}>
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="font-display font-semibold">Digi Helper</div>
              <div className="text-xs text-muted">{srv.ai ? t('AI tutor · uses your learning data') : t('Built-in tutor · uses your learning data')}</div>
            </div>
            <button className="btn btn-ghost btn-sm" onClick={() => setOpen(false)} aria-label={t('Close assistant')}>✕</button>
          </div>
          <TutorChat height={'min(440px, 60vh)'} autoFocus listen />
        </div>
      )}
      <button onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-label={open ? t('Close Digi Helper') : t('Ask Digi Helper')}
        className="fixed z-[76] btn btn-primary rounded-full px-5 py-3.5 shadow-2xl"
        style={{ right: 'max(16px, env(safe-area-inset-right, 0px))', bottom: 'calc(16px + env(safe-area-inset-bottom, 0px))' }}>
        <span aria-hidden="true">✦</span> {open ? t('Close') : t('Ask Digi Helper')}
      </button>
    </>
  );
}
