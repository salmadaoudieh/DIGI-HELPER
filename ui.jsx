import { useEffect, useRef, useState } from 'react';
import { STATUS, statusOf } from '../lib/data.js';
import { useCountUp } from './Fx.jsx';
import { t } from '../lib/i18n.js';

export function Ring({ value, size = 120, stroke = 10, label, sub, color }) {
  const r = (size - stroke) / 2; const c = 2 * Math.PI * r;
  const v = value ?? 0;
  const [shown, setShown] = useState(0);
  useEffect(() => { const id = setTimeout(() => setShown(v), 60); return () => clearTimeout(id); }, [v]);
  const st = statusOf(value);
  const col = color || STATUS[st].color;
  const num = useCountUp(value === null || value === undefined ? null : v);
  const gid = `ring-${label || 'm'}-${size}`.replace(/\W/g, '');
  return (
    <div className="relative inline-grid place-items-center" style={{ width: size, height: size }} role="img" aria-label={value === null || value === undefined ? t('{label}: not assessed', { label: label || t('Mastery') }) : t('{label}: {n} percent', { label: label || t('Mastery'), n: Math.round(v) })}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--line)" strokeWidth={stroke} />
        <defs><linearGradient id={gid} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={col} /><stop offset="1" stopColor={color ? 'var(--pink)' : `color-mix(in srgb, ${col} 55%, var(--violet))`} /></linearGradient></defs>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={`url(#${gid})`} strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={c - (c * shown) / 100} style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(.2,.8,.2,1)', filter: `drop-shadow(0 0 6px ${col})` }} />
      </svg>
      <div className="absolute text-center leading-tight">
        <div className="font-display tnum font-semibold" style={{ fontSize: size * 0.22 }}>{value === null || value === undefined ? '—' : `${Math.round(num)}%`}</div>
        {sub && <div className="text-[0.68rem] text-muted mt-0.5">{sub}</div>}
      </div>
    </div>
  );
}

export function Bar({ value, color, label, className = '' }) {
  const [w, setW] = useState(0);
  useEffect(() => { const id = setTimeout(() => setW(value ?? 0), 60); return () => clearTimeout(id); }, [value]);
  const col = color || STATUS[statusOf(value)].color;
  return (
    <div className={`bar ${className}`} role="progressbar" aria-valuenow={Math.round(value ?? 0)} aria-valuemin={0} aria-valuemax={100} aria-label={label}>
      <span style={{ width: `${w}%`, background: `linear-gradient(90deg, color-mix(in srgb, ${col} 70%, transparent), ${col})` }} />
    </div>
  );
}

export function StatusPill({ value, status }) {
  const st = status || statusOf(value); const d = STATUS[st];
  return <span className={`pill ${d.cls}`}><span aria-hidden="true">{d.icon}</span>{d.label}</span>;
}

export function Card({ children, className = '', as: As = 'section', glow, ...rest }) {
  return <As className={`glass p-5 ${glow ? 'glow-edge' : ''} ${className}`} {...rest}>{children}</As>;
}

export function SectionHead({ eyebrow, title, desc, right }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3 mb-5">
      <div className="min-w-0">
        {eyebrow && <div className="eyebrow mb-1.5">{eyebrow}</div>}
        <h1 className="font-display text-2xl sm:text-3xl font-semibold">{title}</h1>
        {desc && <p className="text-muted mt-1.5 max-w-2xl">{desc}</p>}
      </div>
      {right}
    </div>
  );
}

export function DemoTag({ className = '' }) {
  return <span className={`pill pill-violet ${className}`} title={t('Demo data — simulated to illustrate how Digi Helper works. Not results from a real study.')}>{t('Demo data')}</span>;
}

export function DemoNote({ className = '' }) {
  return <p className={`text-xs text-faint ${className}`}>ⓘ {t('Demo data — simulated to illustrate how Digi Helper works. Not results from a real study.')}</p>;
}

export function Empty({ icon = '✦', title, children, action }) {
  return (
    <div className="panel p-8 text-center grid place-items-center gap-3">
      <div className="text-4xl" aria-hidden="true">{icon}</div>
      <h3 className="font-display text-lg font-semibold">{title}</h3>
      {children && <p className="text-muted max-w-md">{children}</p>}
      {action}
    </div>
  );
}

export function Modal({ open, onClose, title, children, wide }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose?.(); };
    window.addEventListener('keydown', onKey);
    setTimeout(() => ref.current?.querySelector('button, [href], input, textarea, select')?.focus(), 30);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[70] grid place-items-center p-4" role="dialog" aria-modal="true" aria-label={title}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div ref={ref} className={`glass relative w-full ${wide ? 'max-w-3xl' : 'max-w-lg'} max-h-[88vh] overflow-y-auto p-6 anim-pop`} style={{ background: 'var(--surface-solid)' }}>
        {title && <h2 className="font-display text-xl font-semibold mb-3 pe-8">{title}</h2>}
        <button className="btn btn-ghost btn-sm absolute right-3 rtl:right-auto rtl:left-3 top-3" onClick={onClose} aria-label={t('Close')}>✕</button>
        {children}
      </div>
    </div>
  );
}

export function Tabs({ tabs, value, onChange, label }) {
  return (
    <div role="tablist" aria-label={label} className="flex flex-wrap gap-2">
      {tabs.map((tab) => (
        <button key={tab.id} role="tab" aria-selected={value === tab.id} className={`chip ${value === tab.id ? 'on' : ''}`} onClick={() => onChange(tab.id)}>
          {tab.icon && <span aria-hidden="true">{tab.icon}</span>}{tab.label}{tab.badge && <span className="pill pill-info ms-1">{tab.badge}</span>}
        </button>
      ))}
    </div>
  );
}

function Animated({ value }) {
  const m = typeof value === 'string' ? value.match(/^([+-]?)(\d+(?:\.\d+)?)(.*)$/) : typeof value === 'number' ? [null, '', String(value), ''] : null;
  const n = useCountUp(m ? Number(m[2]) : null);
  if (!m) return <>{value}</>;
  return <>{m[1]}{Math.round(n)}{m[3]}</>;
}

export function Stat({ label, value, sub, tone, icon, hue }) {
  const h = hue || tone || 'var(--accent)';
  return (
    <div className="panel p-4 min-w-0 relative overflow-hidden hue-card" style={{ '--h': h }} data-tilt="5">
      <div className="flex items-center gap-2">
        {icon && <span className="hue-chip w-7 h-7 text-sm" style={{ '--h': h }} aria-hidden="true">{icon}</span>}
        <div className="text-xs font-semibold text-muted uppercase tracking-wider">{label}</div>
      </div>
      <div className="font-display tnum text-2xl font-semibold mt-1" style={tone ? { color: tone } : undefined}><Animated value={value} /></div>
      {sub && <div className="text-xs text-muted mt-1">{sub}</div>}
    </div>
  );
}

export function Loading({ text }) {
  return (
    <div className="grid gap-3" aria-live="polite" aria-busy="true">
      <div className="skeleton h-5 w-1/3" /><div className="skeleton h-24" /><div className="text-sm text-muted">{text ?? t('Loading…')}</div>
    </div>
  );
}

export function Confidence({ value, onChange, compact }) {
  const labels = [t('Not confident'), t('Slightly confident'), t('Neutral'), t('Confident'), t('Very confident')];
  return (
    <fieldset>
      <legend className="font-semibold mb-2">{t('How confident are you?')}</legend>
      <div className={`grid ${compact ? 'grid-cols-5' : 'grid-cols-5'} gap-2`}>
        {labels.map((l, i) => (
          <button type="button" key={i} onClick={() => onChange(i + 1)} aria-pressed={value === i + 1}
            className={`panel px-1 py-2.5 text-center transition hover:border-[var(--accent)] ${value === i + 1 ? 'ring-2 ring-[var(--accent)]' : ''}`}>
            <div className="font-display tnum text-lg font-semibold">{i + 1}</div>
            <div className="text-[0.68rem] leading-tight text-muted hidden sm:block">{l}</div>
          </button>
        ))}
      </div>
      <div className="flex justify-between text-[0.7rem] text-faint mt-1 sm:hidden"><span>{t('Not confident')}</span><span>{t('Very confident')}</span></div>
    </fieldset>
  );
}

export function Glyph({ children, color = 'var(--accent)', size = 44 }) {
  return (
    <div className="grid place-items-center rounded-2xl shrink-0 text-xl" aria-hidden="true"
      style={{ width: size, height: size, background: `color-mix(in srgb, ${color} 16%, transparent)`, border: `1px solid color-mix(in srgb, ${color} 35%, transparent)`, color }}>
      {children}
    </div>
  );
}

/** Shows a question's main text: big LTR maths for equations, readable text for passages and code. */
export function QDisplay({ q, size = 'lg' }) {
  const code = q.textual && /\n/.test(q.display) && /[=:(){}<>]|for |if |print|repeat|while/i.test(q.display);
  if (q.textual) {
    return code
      ? <pre className="math panel p-3 font-mono text-sm sm:text-base whitespace-pre-wrap overflow-x-auto text-start">{q.display}</pre>
      : <div className={`${size === 'lg' ? 'text-lg sm:text-xl' : 'text-base'} font-semibold whitespace-pre-line leading-relaxed`}>{q.display}</div>;
  }
  return <div className={`math font-display font-semibold tnum ${size === 'lg' ? 'text-3xl sm:text-4xl' : 'text-2xl'}`}>{q.display}</div>;
}
