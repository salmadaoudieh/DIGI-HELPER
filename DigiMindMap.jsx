import { useMemo, useRef, useState } from 'react';
import { CONCEPTS, CONCEPT, EDGES, STATUS, statusOf, SUBJECT } from '../lib/data.js';
import { t } from '../lib/i18n.js';

const R = 36;
const VB = { x: 0, y: 0, w: 1040, h: 640 };

function edgePath(a, b) {
  const dx = b.x - a.x;
  return `M ${a.x + R * 0.9} ${a.y} C ${a.x + dx * 0.5} ${a.y}, ${b.x - dx * 0.5} ${b.y}, ${b.x - R * 0.9} ${b.y}`;
}

/** Every concept this one builds on (ancestors) and that builds on it (descendants). */
function related(id) {
  const set = new Set([id]);
  const walk = (cur, dir) => EDGES.forEach(([a, b]) => {
    const [from, to] = dir === 'up' ? [b, a] : [a, b];
    if (from === cur && !set.has(to)) { set.add(to); walk(to, dir); }
  });
  walk(id, 'up'); walk(id, 'down');
  return set;
}

/**
 * The DigiMind knowledge map. Hover a concept to light up its learning chain;
 * in interactive mode the map can be zoomed and dragged.
 */
export default function DigiMindMap({ mastery, selected, focus, onSelect, mini = false, lockedIds = [], interactive = false, subject = 'math' }) {
  const nodes = CONCEPTS.filter((c) => c.subject === subject);
  const ids = new Set(nodes.map((c) => c.id));
  const edges = EDGES.filter(([a, b]) => ids.has(a) && ids.has(b));
  const sj = SUBJECT[subject];
  const [hover, setHover] = useState(null);
  const [view, setView] = useState(VB);
  const drag = useRef(null);
  const chain = useMemo(() => (hover ? related(hover) : null), [hover]);

  const zoom = (k) => setView((v) => {
    const w = Math.min(VB.w * 1.2, Math.max(VB.w / 2.6, v.w * k)); const h = (w / VB.w) * VB.h;
    return { x: v.x + (v.w - w) / 2, y: v.y + (v.h - h) / 2, w, h };
  });
  const onDown = (e) => { if (!interactive || e.target.closest('.dm-node')) return; drag.current = { x: e.clientX, y: e.clientY, v: view }; e.currentTarget.setPointerCapture?.(e.pointerId); };
  const onMove = (e) => {
    if (!drag.current) return;
    const svg = e.currentTarget.getBoundingClientRect(); const k = view.w / svg.width;
    setView({ ...drag.current.v, x: drag.current.v.x - (e.clientX - drag.current.x) * k, y: drag.current.v.y - (e.clientY - drag.current.y) * k });
  };
  const onUp = () => { drag.current = null; };
  const tip = hover && !mini ? CONCEPT[hover] : null;

  return (
    <div className="relative">
      <svg viewBox={`${view.x} ${view.y} ${view.w} ${view.h}`} className={`w-full h-auto select-none ${interactive ? 'cursor-grab active:cursor-grabbing' : ''}`} role="group" aria-label={t('DigiMind knowledge map')}
        onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerLeave={() => { onUp(); setHover(null); }} style={{ touchAction: interactive ? 'pan-y' : 'auto' }}>
        <defs>
          <filter id="soft-glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
          {nodes.map((c) => (
            <radialGradient key={c.id} id={`core-${c.id}`} cx="35%" cy="30%" r="80%"><stop offset="0" stopColor={c.hue} stopOpacity=".45" /><stop offset="1" stopColor="var(--surface-solid)" /></radialGradient>
          ))}
          {edges.map(([f, to]) => (
            <linearGradient key={`${f}-${to}`} id={`eg-${f}-${to}`} gradientUnits="userSpaceOnUse" x1={CONCEPT[f].x} y1={CONCEPT[f].y} x2={CONCEPT[to].x} y2={CONCEPT[to].y}><stop offset="0" stopColor={CONCEPT[f].hue} /><stop offset="1" stopColor={CONCEPT[to].hue} /></linearGradient>
          ))}
        </defs>

        {!mini && sj.layerNames.map((name, i) => (
          <text key={i} x={sj.layerX[i]} y={40} textAnchor="middle" fill="var(--faint)" fontSize="13" fontFamily="var(--f-body)" fontWeight="700" letterSpacing="2">{name.toUpperCase()}</text>
        ))}

        {edges.map(([from, to]) => {
          const a = CONCEPT[from]; const b = CONCEPT[to];
          const sa = statusOf(mastery[from]); const sb = statusOf(mastery[to]);
          const weakLink = sa === 'attention' || sb === 'attention';
          const inChain = chain ? chain.has(from) && chain.has(to) : false;
          const lit = inChain || (selected && (selected === from || selected === to));
          const dim = chain && !inChain;
          return (
            <g key={`${from}-${to}`} style={{ opacity: dim ? 0.15 : 1, transition: 'opacity .25s' }}>
              <path d={edgePath(a, b)} fill="none" stroke={lit ? `url(#eg-${from}-${to})` : 'var(--line-strong)'} strokeWidth={lit ? 4 : 2} />
              {(lit || (!chain && weakLink)) && <path d={edgePath(a, b)} fill="none" stroke={lit ? '#fff' : 'var(--bad)'} strokeWidth="2" className="flow-dash" opacity={lit ? 0.55 : 0.75} />}
              {!chain && !weakLink && sa === 'mastered' && <path d={edgePath(a, b)} fill="none" stroke="var(--good)" strokeWidth="2" className="flow-dash" opacity=".45" />}
            </g>
          );
        })}

        {nodes.map((c) => {
          const v = mastery[c.id]; const st = statusOf(v); const col = STATUS[st].color;
          const locked = lockedIds.includes(c.id);
          const circ = 2 * Math.PI * (R + 7);
          const isSel = selected === c.id; const isFocus = focus === c.id; const isHover = hover === c.id;
          const dim = chain && !chain.has(c.id);
          return (
            <g key={c.id} transform={`translate(${c.x} ${c.y})`} role="button" tabIndex={mini ? -1 : 0}
              aria-label={`${c.name}: ${STATUS[st].label}${v !== null && v !== undefined ? ` · ${Math.round(v)}%` : ''}${locked ? ` · ${t('Locked')}` : ''}`}
              aria-pressed={isSel} style={{ cursor: mini ? 'default' : 'pointer', outline: 'none', opacity: dim ? 0.3 : 1, transition: 'opacity .25s' }}
              onClick={() => !mini && onSelect?.(c.id)} onKeyDown={(e) => { if (!mini && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); onSelect?.(c.id); } }}
              onPointerEnter={() => !mini && setHover(c.id)} onPointerLeave={() => !mini && setHover(null)} onFocus={() => !mini && setHover(c.id)} onBlur={() => setHover(null)}
              className="dm-node">
              <g style={{ transform: `scale(${isHover || isSel ? 1.12 : 1})`, transition: 'transform .25s cubic-bezier(.3,1.5,.5,1)' }}>
                {(isFocus || (st === 'attention' && !mini)) && <circle r={R + 10} fill="none" stroke={col} strokeWidth="2" className="pulse-ring" />}
                {isSel && <circle r={R + 16} fill="none" stroke={c.hue} strokeWidth="2" strokeDasharray="4 6" className="flow-dash" />}
                <circle r={R + 7} fill="none" stroke="var(--line)" strokeWidth="5" />
                <circle r={R + 7} fill="none" stroke={col} strokeWidth="5" strokeLinecap="round" transform="rotate(-90)"
                  strokeDasharray={circ} strokeDashoffset={circ - (circ * (v ?? 0)) / 100} style={{ transition: 'stroke-dashoffset 1.2s ease' }} filter={st === 'mastered' || isHover ? 'url(#soft-glow)' : undefined} />
                <circle r={R} fill={`url(#core-${c.id})`} stroke={c.hue} strokeOpacity={isHover ? 1 : 0.6} strokeWidth={isHover ? 2.5 : 1.5} />
                <text y={-2} textAnchor="middle" fontFamily="var(--f-display)" fontWeight="600" fontSize="17" fill="var(--fg)">{locked ? '🔒' : v === null || v === undefined ? '—' : `${Math.round(v)}`}</text>
                <text y={15} textAnchor="middle" fontSize="12" fontWeight="700" fill={col}>{STATUS[st].icon} {st === 'attention' ? t('focus') : st === 'new' ? t('new') : st === 'mastered' ? t('mastered') : t('growing')}</text>
              </g>
              <text y={R + 30} textAnchor="middle" fontSize="15" fontWeight="700" fill={isHover ? c.hue : 'var(--fg)'} style={{ transition: 'fill .2s' }}>{c.short}</text>
            </g>
          );
        })}
      </svg>

      {tip && (
        <div className="absolute pointer-events-none glass px-3 py-2 text-sm anim-pop max-w-[240px]" style={{ left: `${Math.min(80, Math.max(2, ((tip.x - view.x) / view.w) * 100 - 6))}%`, top: `${Math.max(0, ((tip.y - view.y) / view.h) * 100 + 12)}%`, background: 'var(--surface-solid)', borderColor: tip.hue }}>
          <div className="font-bold" style={{ color: tip.hue }}>{tip.name}</div>
          <div className="text-xs text-muted">{tip.desc}</div>
          <div className="text-xs mt-1">{t('Lit path: what it builds on and what it unlocks.')}</div>
        </div>
      )}

      {interactive && (
        <div className="absolute right-2 top-2 flex flex-col gap-1.5" role="group" aria-label={t('Map zoom')}>
          <button className="btn btn-sm w-9 h-9 p-0" onClick={() => zoom(0.8)} aria-label={t('Zoom in')}>+</button>
          <button className="btn btn-sm w-9 h-9 p-0" onClick={() => zoom(1.25)} aria-label={t('Zoom out')}>−</button>
          <button className="btn btn-sm w-9 h-9 p-0" onClick={() => setView(VB)} aria-label={t('Reset view')}>⟲</button>
        </div>
      )}
    </div>
  );
}
