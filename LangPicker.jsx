import { useEffect, useRef, useState } from 'react';
import { useStore } from '../lib/store.jsx';
import { LANGS, t } from '../lib/i18n.js';

/** Language switcher: English · العربية · Français. Switching flips the layout for Arabic. */
export default function LangPicker({ compact }) {
  const { state, setPref } = useStore();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const cur = LANGS.find((l) => l.id === state.lang) || LANGS[0];
  useEffect(() => {
    if (!open) return undefined;
    const close = (e) => { if (!ref.current?.contains(e.target)) setOpen(false); };
    const esc = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('pointerdown', close); document.addEventListener('keydown', esc);
    return () => { document.removeEventListener('pointerdown', close); document.removeEventListener('keydown', esc); };
  }, [open]);
  return (
    <div className="relative" ref={ref}>
      <button className="btn btn-sm" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-haspopup="true" aria-label={`${t('Language')}: ${cur.native}`}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z" /></svg>
        <span className="font-bold">{compact ? cur.flag : cur.native}</span>
      </button>
      {open && (
        <div className="absolute right-0 rtl:right-auto rtl:left-0 mt-2 z-50 glass p-2 w-48 anim-pop" style={{ background: 'var(--surface-solid)' }} role="menu" aria-label={t('Language')}>
          {LANGS.map((l) => (
            <button key={l.id} role="menuitemradio" aria-checked={cur.id === l.id} lang={l.id} dir={l.dir}
              onClick={() => { setPref('lang', l.id); setOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold transition hover:bg-surface2 ${cur.id === l.id ? 'bg-surface2' : ''}`}>
              <span className="hue-chip w-8 h-8 text-xs font-bold" style={{ '--h': ['#3b82f6', '#22c55e', '#ec4899'][LANGS.indexOf(l)] }} aria-hidden="true">{l.flag}</span>
              <span className="flex-1 text-start">{l.native}</span>
              {cur.id === l.id && <span className="text-cyan" aria-hidden="true">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
