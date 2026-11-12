import { useEffect, useMemo, useRef, useState } from 'react';
import { useStore } from '../lib/store.jsx';
import { t } from '../lib/i18n.js';

/** Drifting colour blobs behind every screen. */
export function Aurora() {
  return <div className="aurora" aria-hidden="true"><span className="b1" /><span className="b2" /><span className="b3" /><span className="b4" /></div>;
}

/** Global pointer effects: cursor spotlight on glass cards and 3D tilt on [data-tilt] elements. */
export function PointerEffects() {
  useEffect(() => {
    if (!window.matchMedia?.('(hover: hover)').matches) return undefined;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let tilted = null;
    const onMove = (e) => {
      const g = e.target.closest?.('.glass');
      if (g) { const r = g.getBoundingClientRect(); g.style.setProperty('--mx', `${e.clientX - r.left}px`); g.style.setProperty('--my', `${e.clientY - r.top}px`); }
      if (reduced) return;
      const el = e.target.closest?.('[data-tilt]');
      if (tilted && tilted !== el) { tilted.style.transform = ''; tilted = null; }
      if (el) {
        const r = el.getBoundingClientRect(); const px = (e.clientX - r.left) / r.width - 0.5; const py = (e.clientY - r.top) / r.height - 0.5;
        const k = Number(el.dataset.tilt) || 6;
        el.style.transform = `perspective(900px) rotateX(${(-py * k).toFixed(2)}deg) rotateY(${(px * k).toFixed(2)}deg) translateY(-3px)`;
        tilted = el;
      }
    };
    const onLeave = () => { if (tilted) { tilted.style.transform = ''; tilted = null; } };
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    return () => { window.removeEventListener('pointermove', onMove); document.removeEventListener('pointerleave', onLeave); };
  }, []);
  return null;
}

/** Animated number that counts up to its target. */
export function useCountUp(target, ms = 900) {
  const [v, setV] = useState(0);
  const from = useRef(0);
  useEffect(() => {
    if (target === null || target === undefined || Number.isNaN(target)) { setV(target); return undefined; }
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) { setV(target); return undefined; }
    const start = performance.now(); const a = from.current ?? 0; let id;
    const step = (now) => { const p = Math.min(1, (now - start) / ms); const e = 1 - Math.pow(1 - p, 3); setV(a + (target - a) * e); if (p < 1) id = requestAnimationFrame(step); else from.current = target; };
    id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, [target, ms]);
  return v;
}

export function CountUp({ value, suffix = '', decimals = 0 }) {
  const v = useCountUp(value);
  if (value === null || value === undefined) return <>—</>;
  return <>{Number(v).toFixed(decimals)}{suffix}</>;
}

export const PALETTES = [
  { id: 'ocean', name: 'Ocean', colors: ['#3d7bff', '#22d3ee', '#9b6bff'] },
  { id: 'aurora', name: 'Aurora', colors: ['#12c99b', '#a3e635', '#8b5cf6'] },
  { id: 'sunset', name: 'Sunset', colors: ['#ff6a3d', '#ffb21e', '#ff4f9a'] },
  { id: 'galaxy', name: 'Galaxy', colors: ['#b64dff', '#4dd6ff', '#ff5fb8'] },
];

export function PalettePicker({ compact }) {
  const { state, setPref } = useStore();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const cur = PALETTES.find((p) => p.id === (state.palette || 'ocean'));
  useEffect(() => {
    if (!open) return undefined;
    const close = (e) => { if (!ref.current?.contains(e.target)) setOpen(false); };
    const esc = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('pointerdown', close); document.addEventListener('keydown', esc);
    return () => { document.removeEventListener('pointerdown', close); document.removeEventListener('keydown', esc); };
  }, [open]);
  return (
    <div className="relative" ref={ref}>
      <button className="btn btn-sm" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-haspopup="true" aria-label={t('Colour palette: {name}', { name: t(cur.name) })}>
        <span className="flex -space-x-1.5" aria-hidden="true">{cur.colors.map((c) => <span key={c} className="w-3.5 h-3.5 rounded-full border border-[var(--surface-solid)]" style={{ background: c }} />)}</span>
        {!compact && t(cur.name)}
      </button>
      {open && (
        <div className="absolute right-0 rtl:right-auto rtl:left-0 mt-2 z-50 glass p-2 w-52 anim-pop" style={{ background: 'var(--surface-solid)' }} role="menu" aria-label={t('Colour palettes')}>
          {PALETTES.map((p) => (
            <button key={p.id} role="menuitemradio" aria-checked={cur.id === p.id} onClick={() => { setPref('palette', p.id); setOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold transition hover:bg-surface2 ${cur.id === p.id ? 'bg-surface2' : ''}`}>
              <span className="flex -space-x-1.5" aria-hidden="true">{p.colors.map((c) => <span key={c} className="swatch" style={{ background: c }} />)}</span>
              {t(p.name)}{cur.id === p.id && <span className="ms-auto text-cyan" aria-hidden="true">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/** Ctrl/⌘ + K command palette: jump anywhere, run quick actions. */
export function CommandPalette({ items }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [i, setI] = useState(0);
  const inputRef = useRef(null);
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setOpen((o) => !o); }
      if (e.key === 'Escape') setOpen(false);
    };
    const onOpen = () => setOpen(true);
    window.addEventListener('keydown', onKey); window.addEventListener('dh:palette', onOpen);
    return () => { window.removeEventListener('keydown', onKey); window.removeEventListener('dh:palette', onOpen); };
  }, []);
  useEffect(() => { if (open) { setQ(''); setI(0); setTimeout(() => inputRef.current?.focus(), 20); } }, [open]);
  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return items;
    return items.map((it) => {
      const hay = `${it.label} ${t(it.label)} ${it.group} ${t(it.group)} ${it.keywords || ''}`.toLowerCase();
      let score = hay.includes(needle) ? 2 : 0;
      if (!score) { let k = 0; for (const ch of hay) if (ch === needle[k]) k++; score = k === needle.length ? 1 : 0; }
      return { it, score };
    }).filter((x) => x.score).sort((a, b) => b.score - a.score).filter((x, _, arr) => x.score === arr[0].score).map((x) => x.it);
  }, [q, items]);
  if (!open) return null;
  const run = (it) => { setOpen(false); setTimeout(() => it.run(), 10); };
  const groups = [...new Set(list.map((x) => x.group))];
  let idx = -1;
  return (
    <div className="fixed inset-0 z-[85] grid items-start justify-items-center p-4 pt-[12vh]" role="dialog" aria-modal="true" aria-label={t('Command palette')}>
      <div className="absolute inset-0 bg-black/55 backdrop-blur-sm" onClick={() => setOpen(false)} />
      <div className="glass glow-edge relative w-full max-w-xl overflow-hidden anim-pop" style={{ background: 'var(--surface-solid)' }}>
        <div className="flex items-center gap-3 px-4 border-b border-line">
          <span className="text-muted" aria-hidden="true">⌕</span>
          <label htmlFor="cmd-input" className="sr-only">{t('Search pages and actions')}</label>
          <input id="cmd-input" ref={inputRef} value={q} onChange={(e) => { setQ(e.target.value); setI(0); }} autoComplete="off"
            onKeyDown={(e) => { if (e.key === 'ArrowDown') { e.preventDefault(); setI((x) => Math.min(list.length - 1, x + 1)); } if (e.key === 'ArrowUp') { e.preventDefault(); setI((x) => Math.max(0, x - 1)); } if (e.key === 'Enter' && list[i]) run(list[i]); }}
            className="flex-1 bg-transparent py-4 outline-none text-base" placeholder={t('Search pages, topics, actions…')} aria-controls="cmd-list" aria-activedescendant={list[i] ? `cmd-${i}` : undefined} />
          <span className="kbd">Esc</span>
        </div>
        <div id="cmd-list" role="listbox" className="max-h-[52vh] overflow-y-auto p-2">
          {!list.length && <p className="p-4 text-sm text-muted">{t('No matches. Try “challenge”, “negatives” or “dark”.')}</p>}
          {groups.map((g) => (
            <div key={g}>
              <div className="eyebrow px-3 pt-2 pb-1">{t(g)}</div>
              {list.filter((x) => x.group === g).map((it) => {
                idx++; const me = idx;
                return (
                  <button key={it.label} id={`cmd-${me}`} role="option" aria-selected={me === i} onMouseEnter={() => setI(me)} onClick={() => run(it)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-start text-sm font-semibold transition"
                    style={me === i ? { background: 'linear-gradient(90deg, color-mix(in srgb, var(--accent) 22%, transparent), transparent)' } : undefined}>
                    <span className="hue-chip w-8 h-8 text-base" style={{ '--h': it.hue || 'var(--accent)' }} aria-hidden="true">{it.icon}</span>
                    <span className="flex-1">{t(it.label)}{it.hint && <span className="block text-xs text-muted font-normal">{t(it.hint)}</span>}</span>
                    {me === i && <span className="kbd">↵</span>}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
        <div className="px-4 py-2 border-t border-line text-xs text-muted flex gap-3"><span><span className="kbd">↑</span> <span className="kbd">↓</span> {t('move')}</span><span><span className="kbd">↵</span> {t('open')}</span><span className="ms-auto"><span className="kbd">Ctrl</span> <span className="kbd">K</span> {t('anytime')}</span></div>
      </div>
    </div>
  );
}

/** Interactive constellation for the landing hero: dots connect and gather around the cursor. */
export function Constellation() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return undefined;
    const ctx = c.getContext('2d'); const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0; let h = 0; let pts = []; let id = 0; const mouse = { x: -999, y: -999 };
    const cols = () => { const cs = getComputedStyle(document.documentElement); return ['--p1', '--p2', '--p3', '--p4'].map((v) => cs.getPropertyValue(v).trim()); };
    let colors = cols();
    const resize = () => {
      const d = window.devicePixelRatio || 1; const r = c.getBoundingClientRect(); w = r.width; h = r.height;
      c.width = w * d; c.height = h * d; ctx.setTransform(d, 0, 0, d, 0, 0);
      const n = Math.round(Math.min(90, (w * h) / 11000));
      pts = Array.from({ length: n }, (_, i) => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35, r: 1.2 + Math.random() * 2.2, c: i % 4 }));
    };
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        if (!reduced) { p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > w) p.vx *= -1; if (p.y < 0 || p.y > h) p.vy *= -1; }
        const dx = mouse.x - p.x; const dy = mouse.y - p.y; const dm = Math.hypot(dx, dy);
        if (dm < 160 && !reduced) { p.x += dx * 0.006; p.y += dy * 0.006; }
      }
      for (let a = 0; a < pts.length; a++) {
        for (let b = a + 1; b < pts.length; b++) {
          const d = Math.hypot(pts[a].x - pts[b].x, pts[a].y - pts[b].y);
          if (d < 110) { ctx.strokeStyle = colors[pts[a].c]; ctx.globalAlpha = (1 - d / 110) * 0.35; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(pts[a].x, pts[a].y); ctx.lineTo(pts[b].x, pts[b].y); ctx.stroke(); }
        }
      }
      for (const p of pts) {
        const near = Math.hypot(mouse.x - p.x, mouse.y - p.y) < 160;
        ctx.globalAlpha = near ? 1 : 0.7; ctx.fillStyle = colors[p.c]; ctx.beginPath(); ctx.arc(p.x, p.y, near ? p.r * 1.8 : p.r, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1;
      if (!reduced) id = requestAnimationFrame(draw);
    };
    const onMove = (e) => { const r = c.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; if (reduced) draw(); };
    const onLeave = () => { mouse.x = -999; mouse.y = -999; };
    const mo = new MutationObserver(() => { colors = cols(); });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-palette', 'data-theme'] });
    resize(); draw();
    window.addEventListener('resize', resize); window.addEventListener('pointermove', onMove, { passive: true }); c.parentElement?.addEventListener('pointerleave', onLeave);
    return () => { cancelAnimationFrame(id); mo.disconnect(); window.removeEventListener('resize', resize); window.removeEventListener('pointermove', onMove); };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true" />;
}
