import { useEffect, useMemo, useState } from 'react';
import { t } from '../lib/i18n.js';
import { QDisplay } from './ui.jsx';
import { confetti } from '../lib/fx.js';
import { m } from '../lib/questions.js';

const rnd = (a, b) => a + Math.floor(Math.random() * (b - a + 1));

// ---------------- Number line (visual mode for negatives) ----------------
export function NumberLine({ start = -3, delta = 5, label }) {
  const min = -12; const max = 12; const W = 760; const pad = 30;
  const xOf = (v) => pad + ((v - min) / (max - min)) * (W - pad * 2);
  const end = start + delta;
  const [tick, setTick] = useState(0);
  useEffect(() => { setTick(0); const id = setTimeout(() => setTick(1), 300); return () => clearTimeout(id); }, [start, delta]);
  const pos = tick ? end : start;
  const hops = Math.abs(delta); const dir = Math.sign(delta);
  return (
    <div className="scroll-x">
      <svg viewBox={`0 0 ${W} 150`} className="w-full min-w-[560px]" role="img" aria-label={label || t('Number line from {start} moving {delta} to {end}', { start, delta, end })}>
        <line x1={pad} x2={W - pad} y1={100} y2={100} stroke="var(--line-strong)" strokeWidth="2" />
        {Array.from({ length: max - min + 1 }, (_, i) => min + i).map((v) => (
          <g key={v}>
            <line x1={xOf(v)} x2={xOf(v)} y1={v === 0 ? 88 : 94} y2={v === 0 ? 112 : 106} stroke={v === 0 ? 'var(--fg)' : 'var(--line-strong)'} strokeWidth={v === 0 ? 2.5 : 1.5} />
            <text x={xOf(v)} y={130} textAnchor="middle" fontSize="12" fontFamily="var(--f-mono)" fill={v < 0 ? 'var(--bad)' : v > 0 ? 'var(--cyan)' : 'var(--fg)'}>{m(v)}</text>
          </g>
        ))}
        {tick > 0 && Array.from({ length: hops }, (_, i) => {
          const a = start + dir * i; const b = a + dir; const x1 = xOf(a); const x2 = xOf(b);
          return <path key={i} d={`M ${x1} 92 Q ${(x1 + x2) / 2} 50 ${x2} 92`} fill="none" stroke="var(--violet)" strokeWidth="2.5" strokeLinecap="round"
            style={{ strokeDasharray: 80, strokeDashoffset: 80, animation: `dash-in .35s ${i * 0.18}s forwards` }} />;
        })}
        <circle cx={xOf(start)} cy={100} r={7} fill="var(--faint)" />
        <circle cx={xOf(pos)} cy={100} r={10} fill="var(--accent)" stroke="var(--fg)" strokeWidth="2" style={{ transition: `cx ${0.18 * hops + 0.2}s cubic-bezier(.4,0,.2,1)` }} />
        <text x={xOf(start)} y={30} textAnchor="middle" fontSize="13" fill="var(--muted)" fontWeight="700">{t('start {n}', { n: m(start) })}</text>
        {tick > 0 && <text x={xOf(end)} y={30} textAnchor="middle" fontSize="14" fill="var(--fg)" fontWeight="800" style={{ animation: `fade-up .4s ${0.18 * hops}s both` }}>{t('land {n}', { n: m(end) })}</text>}
      </svg>
      <style>{'@keyframes dash-in { to { stroke-dashoffset: 0 } }'}</style>
    </div>
  );
}

export function NumberLineLesson() {
  const cases = [
    { a: -3, op: '+', b: 5, note: t('Adding a positive moves right.') },
    { a: 2, op: '−', b: 6, note: t('Subtracting a positive moves left, past zero into negatives.') },
    { a: -7, op: '− (−', b: 3, note: t('Subtracting a negative flips the direction: you move right. −7 − (−3) = −7 + 3.') },
    { a: -2, op: '+ (−', b: 4, note: t('Adding a negative moves left, just like subtracting.') },
  ];
  const [i, setI] = useState(0);
  const c = cases[i];
  const delta = c.op === '+' ? c.b : c.op === '−' ? -c.b : c.op === '− (−' ? c.b : -c.b;
  const expr = c.op.includes('(') ? `${m(c.a)} ${c.op}${c.b})` : `${m(c.a)} ${c.op} ${c.b}`;
  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap gap-2">{cases.map((x, k) => <button key={k} className={`chip ${i === k ? 'on' : ''}`} onClick={() => setI(k)}>{t('Example {n}', { n: k + 1 })}</button>)}</div>
      <div className="panel p-4">
        <div className="font-display text-2xl font-semibold tnum mb-1" dir="ltr">{expr} = <span className="text-cyan">{m(c.a + delta)}</span></div>
        <p className="text-muted">{c.note}</p>
        <NumberLine start={c.a} delta={delta} />
      </div>
      <p className="text-sm text-muted">{t('Rule of thumb:')} <strong className="text-fg">{t('Two minus signs side by side make a plus.')}</strong> {t('On the number line that means turning around.')}</p>
    </div>
  );
}

// ---------------- Number Line Jump (interactive game for negatives) ----------------
function jumpRound() {
  const kind = rnd(0, 2); const a = rnd(-8, 6); const b = rnd(2, 7);
  if (kind === 0) return { text: `${m(a)} − (${m(-b)})`, answer: a + b, tip: t('Subtracting a negative = moving right.') };
  if (kind === 1) return { text: `${m(a)} + (${m(-b)})`, answer: a - b, tip: t('Adding a negative = moving left.') };
  return { text: `${m(a)} − ${b}`, answer: a - b, tip: t('Subtracting moves left.') };
}
export function NumberLineJump({ onResult, rounds = 5 }) {
  const [round, setRound] = useState(() => jumpRound());
  const [n, setN] = useState(1); const [score, setScore] = useState(0);
  const [pick, setPick] = useState(null); const [done, setDone] = useState(false);
  const min = -15; const max = 15;
  function choose(v) {
    if (pick !== null) return;
    setPick(v); const ok = v === round.answer; if (ok) { setScore((s) => s + 1); confetti({ count: 35, power: 0.6 }); }
    onResult?.(ok);
    setTimeout(() => { if (n >= rounds) setDone(true); else { setN((k) => k + 1); setRound(jumpRound()); setPick(null); } }, 1300);
  }
  if (done) return (
    <div className="panel p-6 text-center grid gap-3 place-items-center">
      <div className="text-5xl" aria-hidden="true">{score >= rounds - 1 ? '🏆' : '💪'}</div>
      <div className="font-display text-xl font-semibold">{t('{score}/{rounds} landings', { score, rounds })}</div>
      <p className="text-muted">{score >= rounds - 1 ? t('Your number sense for negatives is getting sharp.') : t('Every jump you study makes the next one easier.')}</p>
      <button className="btn btn-primary" onClick={() => { setN(1); setScore(0); setPick(null); setDone(false); setRound(jumpRound()); }}>{t('Play again')}</button>
    </div>
  );
  return (
    <div className="grid gap-3">
      <div className="flex items-center justify-between"><span className="pill pill-info">{t('Round {n}/{rounds}', { n, rounds })}</span><span className="font-mono text-sm text-muted">{t('Score {n}', { n: score })}</span></div>
      <div className="text-center"><div className="text-muted text-sm">{t('Where do you land?')}</div><div className="font-display text-3xl font-semibold tnum" dir="ltr">{round.text}</div></div>
      <div className="scroll-x pb-2">
        <div className="flex gap-1 min-w-[640px] justify-between" dir="ltr" role="group" aria-label={t('Pick a landing spot')}>
          {Array.from({ length: max - min + 1 }, (_, i) => min + i).map((v) => {
            const isAns = pick !== null && v === round.answer; const isWrong = pick === v && v !== round.answer;
            return (
              <button key={v} onClick={() => choose(v)} aria-label={t('Land on {n}', { n: v })}
                className={`flex-1 grid place-items-center rounded-lg py-2 text-xs font-mono font-semibold border transition ${isWrong ? 'anim-shake' : ''}`}
                style={{ borderColor: isAns ? 'var(--good)' : isWrong ? 'var(--bad)' : 'var(--line)', background: isAns ? 'color-mix(in srgb, var(--good) 22%, transparent)' : isWrong ? 'color-mix(in srgb, var(--bad) 22%, transparent)' : v === 0 ? 'var(--surface-2)' : 'transparent', color: v < 0 ? 'var(--bad)' : v > 0 ? 'var(--cyan)' : 'var(--fg)' }}>
                {m(v)}
              </button>
            );
          })}
        </div>
      </div>
      <div className="min-h-6 text-center text-sm" aria-live="polite">{pick !== null && (pick === round.answer ? <span className="text-good font-bold">{t('✓ Perfect landing!')}</span> : <span className="text-bad font-bold">{t('✗ It lands on {n}. {tip}', { n: m(round.answer), tip: round.tip })}</span>)}</div>
    </div>
  );
}

// ---------------- Balance scale ----------------
function termText(a, b) {
  const parts = [];
  if (a) parts.push(a === 1 ? 'x' : a === -1 ? '−x' : `${m(a)}x`);
  if (b) parts.push(parts.length ? (b < 0 ? `− ${Math.abs(b)}` : `+ ${b}`) : m(b));
  return parts.join(' ') || '0';
}
export function Scale({ left, right, tilt = 0 }) {
  return (
    <svg viewBox="0 0 520 230" className="w-full max-w-[520px] mx-auto" role="img" aria-label={tilt ? t('Balance: {left} on the left, {right} on the right, unbalanced', { left, right }) : t('Balance: {left} on the left, {right} on the right, balanced', { left, right })}>
      <polygon points="245,215 275,215 262,120 258,120" fill="var(--line-strong)" />
      <rect x="200" y="212" width="120" height="10" rx="5" fill="var(--line-strong)" />
      <g style={{ transform: `rotate(${tilt}deg)`, transformOrigin: '260px 118px', transition: 'transform .6s cubic-bezier(.3,1.4,.5,1)' }}>
        <rect x="60" y="114" width="400" height="8" rx="4" fill="var(--accent)" />
        <circle cx="260" cy="118" r="9" fill="var(--cyan)" />
        <line x1="100" y1="122" x2="80" y2="170" stroke="var(--muted)" strokeWidth="1.5" /><line x1="100" y1="122" x2="120" y2="170" stroke="var(--muted)" strokeWidth="1.5" />
        <line x1="420" y1="122" x2="400" y2="170" stroke="var(--muted)" strokeWidth="1.5" /><line x1="420" y1="122" x2="440" y2="170" stroke="var(--muted)" strokeWidth="1.5" />
        <rect x="20" y="168" width="160" height="40" rx="12" fill="var(--surface-2)" stroke="var(--line-strong)" />
        <rect x="340" y="168" width="160" height="40" rx="12" fill="var(--surface-2)" stroke="var(--line-strong)" />
        <text x="100" y="195" textAnchor="middle" fontFamily="var(--f-display)" fontSize="18" fontWeight="600" fill="var(--fg)">{left}</text>
        <text x="420" y="195" textAnchor="middle" fontFamily="var(--f-display)" fontSize="18" fontWeight="600" fill="var(--fg)">{right}</text>
      </g>
      <text x="260" y="40" textAnchor="middle" fontSize="13" fontWeight="700" fill={tilt ? 'var(--bad)' : 'var(--good)'}>{tilt ? t('⚠ Unbalanced') : t('✓ Balanced')}</text>
    </svg>
  );
}

function balanceRound(level) {
  const a = rnd(2, 5); const x = level > 1 ? [-4, -3, -2, 2, 3, 4][rnd(0, 5)] : rnd(1, 6);
  const b = level > 0 ? -rnd(2, 8) : rnd(2, 8);
  return { a, b, c: a * x + b, x };
}

export function BalanceGame({ onResult }) {
  const [level, setLevel] = useState(0);
  const [eq, setEq] = useState(() => balanceRound(0));
  const [st, setSt] = useState(() => ({ a: eq.a, b: eq.b, c: eq.c }));
  const [tilt, setTilt] = useState(0); const [msg, setMsg] = useState(() => t('Get x alone on one side. Whatever you do to one side, do to the other.'));
  const [moves, setMoves] = useState(0); const [won, setWon] = useState(false); const [wins, setWins] = useState(0);
  useEffect(() => { setSt({ a: eq.a, b: eq.b, c: eq.c }); setWon(false); setMoves(0); setTilt(0); setMsg(t('Get x alone on one side. Whatever you do to one side, do to the other.')); }, [eq]);

  const options = useMemo(() => {
    const o = [];
    if (st.b !== 0) {
      const k = Math.abs(st.b);
      o.push({ id: 'undo', label: st.b > 0 ? t('Subtract {k} from both sides', { k }) : t('Add {k} to both sides', { k }), apply: (s) => ({ ...s, b: 0, c: s.c - s.b }) });
      o.push({ id: 'wrongdir', label: st.b > 0 ? t('Add {k} to both sides', { k }) : t('Subtract {k} from both sides', { k }), apply: (s) => ({ ...s, b: s.b * 2, c: s.c + s.b }), note: t('Still balanced, but now the number next to x got bigger, not zero. To cancel {sign} {k}, do the opposite.', { sign: st.b > 0 ? '+' : '−', k }) });
      o.push({ id: 'oneside', label: st.b > 0 ? t('Subtract {k} from the left side only', { k }) : t('Add {k} to the left side only', { k }), unbalance: true });
    }
    if (st.a !== 1) {
      o.push({ id: 'divide', label: t('Divide both sides by {a}', { a: st.a }), apply: (s) => ({ a: 1, b: s.b / s.a, c: s.c / s.a }), early: st.b !== 0 });
      o.push({ id: 'mult', label: t('Multiply both sides by {a}', { a: st.a }), apply: (s) => ({ a: s.a * s.a, b: s.b * s.a, c: s.c * s.a }), note: t('Balanced, but x now has {n} in front of it. Multiplying makes it worse — divide instead.', { n: st.a * st.a }) });
    }
    return o.sort((p, q) => p.label.localeCompare(q.label));
  }, [st]);

  function act(o) {
    if (won) return;
    setMoves((k) => k + 1);
    if (o.unbalance) {
      setTilt(st.b > 0 ? -9 : 9);
      setMsg(t('The scale tipped! Changing only one side breaks the equation. Both sides must get the same change.'));
      onResult?.(false);
      setTimeout(() => setTilt(0), 1400);
      return;
    }
    const next = o.apply(st); setSt(next);
    if (o.note) { setMsg(o.note); onResult?.(false); return; }
    if (o.early) setMsg(t('That works, but now there are fractions to deal with. Undoing + and − first is usually cleaner.'));
    else setMsg(t('Nice move. The scale stays balanced.'));
    if (next.a === 1 && Math.abs(next.b) < 1e-9) {
      setWon(true); setWins((w) => w + 1); onResult?.(true); confetti({ count: 80 });
      const xv = m(Math.round(next.c * 100) / 100);
      setMsg(moves + 1 <= 2 ? t('🎉 x = {x}. Solved in the fewest moves!', { x: xv }) : t('🎉 x = {x}. Solved — can you do the next one in two moves?', { x: xv }));
    }
  }
  const fmtN = (v) => m(Math.round(v * 100) / 100);
  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex gap-2">{[t('Positives'), t('Negatives'), t('Negative answers')].map((l, i) => <button key={i} className={`chip ${level === i ? 'on' : ''}`} onClick={() => { setLevel(i); setEq(balanceRound(i)); }}>{l}</button>)}</div>
        <span className="font-mono text-sm text-muted">{t('Solved {wins} · Moves {moves}', { wins, moves })}</span>
      </div>
      <div className="text-center font-display text-2xl font-semibold tnum" dir="ltr">{termText(st.a, st.b)} = {fmtN(st.c)}</div>
      <Scale left={termText(st.a, st.b === 0 ? 0 : Math.round(st.b * 100) / 100)} right={fmtN(st.c)} tilt={tilt} />
      <p className="text-center min-h-12 text-sm" aria-live="polite" style={{ color: tilt ? 'var(--bad)' : 'var(--muted)' }}>{msg}</p>
      {!won ? (
        <div className="grid sm:grid-cols-2 gap-2">{options.map((o) => <button key={o.id} className="btn justify-start text-start whitespace-normal" onClick={() => act(o)}>{o.label}</button>)}</div>
      ) : (
        <div className="flex justify-center gap-2"><button className="btn btn-primary" onClick={() => setEq(balanceRound(Math.min(2, level + (wins % 2 ? 1 : 0))))}>{t('Next equation →')}</button></div>
      )}
    </div>
  );
}

// ---------------- Fraction bars ----------------
export function FractionBars({ d1 = 2, d2 = 3, interactive = false, onResult }) {
  const lcm = (a, b) => { let x = a; while (x % b) x += a; return x; };
  const L = lcm(d1, d2);
  const [den, setDen] = useState(interactive ? null : L);
  const options = [d1 + d2, L, d1 * d2 === L ? L * 2 : d1 * d2, Math.max(d1, d2)].filter((v, i, a) => a.indexOf(v) === i).sort((a, b) => a - b);
  const works = den && den % d1 === 0 && den % d2 === 0;
  const bar = (num, d, color, split) => (
    <div className="flex h-11 rounded-xl overflow-hidden border border-line2" aria-hidden="true">
      {Array.from({ length: split || d }, (_, i) => {
        const filled = i < (split ? (num * split) / d : num);
        return <div key={i} className="flex-1 border-e border-line last:border-e-0 transition-all duration-700" style={{ background: filled ? color : 'transparent' }} />;
      })}
    </div>
  );
  return (
    <div className="grid gap-3">
      <div className="font-display text-2xl font-semibold tnum" dir="ltr">1/{d1} + 1/{d2} = {works ? <span className="text-cyan">{(L / d1 + L / d2) * (den / L)}/{den}</span> : '?'}</div>
      <div className="grid gap-2">
        <div className="text-sm text-muted">1/{d1}{works ? ` = ${den / d1}/${den}` : ''}</div>{bar(1, d1, 'var(--accent)', works ? den : null)}
        <div className="text-sm text-muted">1/{d2}{works ? ` = ${den / d2}/${den}` : ''}</div>{bar(1, d2, 'var(--violet)', works ? den : null)}
      </div>
      {interactive && (
        <div>
          <div className="font-semibold mb-2">{t('Cut both bars into equal pieces. How many pieces?')}</div>
          <div className="flex flex-wrap gap-2">{options.map((o) => <button key={o} className={`chip ${den === o ? 'on' : ''}`} onClick={() => { setDen(o); const ok = o % d1 === 0 && o % d2 === 0; onResult?.(ok); }}>{t('{n} pieces', { n: o })}</button>)}</div>
          {den && !works && <p className="text-bad text-sm mt-2">{t("{den} pieces don't line up with both bars. You need a number both {d1} and {d2} divide into.", { den, d1, d2 })}</p>}
          {works && <p className="text-good text-sm mt-2">{t('✓ Both fractions now use {den}ths — same-size pieces can be added.', { den })}</p>}
        </div>
      )}
      {!interactive && <p className="text-sm text-muted">{t('Adding tops and bottoms (1+1)/({d1}+{d2}) = 2/{s} would mix different-sized pieces. Common pieces first, then count.', { d1, d2, s: d1 + d2 })}</p>}
    </div>
  );
}

// ---------------- Worked example that plays step by step ----------------
export function WorkedExample({ q }) {
  const [shown, setShown] = useState(0);
  useEffect(() => { setShown(0); }, [q.display]);
  useEffect(() => {
    if (shown >= q.steps.length) return undefined;
    const id = setTimeout(() => setShown((x) => x + 1), 1300);
    return () => clearTimeout(id);
  }, [shown, q]);
  return (
    <div className="grid gap-3">
      <div className="text-muted text-sm">{q.prompt}</div>
      <QDisplay q={q} size="md" />
      {q.textual && q.type === 'mc' && <ul className="grid sm:grid-cols-2 gap-1.5 text-sm">{q.options.map((o) => <li key={o.id} className="panel px-3 py-1.5" style={o.id === q.answer && shown >= q.steps.length ? { borderColor: 'var(--good)', color: 'var(--good)' } : undefined}><span className="font-mono uppercase me-2">{o.id}</span>{o.text}</li>)}</ul>}
      <ol className="grid gap-2">
        {q.steps.map((s, i) => (
          <li key={i} className="panel p-3 flex items-start gap-3 transition-all duration-500" style={{ opacity: i < shown ? 1 : 0.25, transform: i < shown ? 'none' : 'translateY(6px)' }}>
            <span className="font-mono text-xs pill pill-info mt-0.5">{i + 1}</span>
            <div><div className={s.expr ? 'text-sm text-muted' : ''}>{s.text}</div>{s.expr && <div className="math font-mono font-semibold tnum">{s.expr}</div>}</div>
          </li>
        ))}
      </ol>
      <div className="flex gap-2"><button className="btn btn-sm" onClick={() => setShown(0)}>↺ {t('Replay')}</button><button className="btn btn-sm" onClick={() => setShown(q.steps.length)}>{t('Show all')}</button></div>
    </div>
  );
}

// ---------------- Math City skyline: windows light up with mastery ----------------
export function Skyline({ buildings, height = 150 }) {
  const W = 600; const bw = W / buildings.length;
  return (
    <svg viewBox={`0 0 ${W} ${height}`} className="w-full h-auto" role="img" aria-label={t('Math City skyline. Lit windows show mastery.')}>
      {buildings.map((b, i) => {
        const h = 60 + ((i * 37) % 5) * 16 + (b.tall ? 30 : 0); const x = i * bw + 6; const w = bw - 12; const y = height - h;
        const cols = 3; const rows = Math.floor((h - 20) / 16); const total = cols * rows; const lit = b.locked ? 0 : Math.round(((b.value ?? 0) / 100) * total);
        return (
          <g key={b.id}>
            <rect x={x} y={y} width={w} height={h} rx="5" fill="var(--surface-2)" stroke={b.locked ? 'var(--line)' : b.color} strokeOpacity={b.locked ? 1 : 0.6} />
            {Array.from({ length: total }, (_, k) => {
              const r = Math.floor(k / cols); const c = k % cols; const idx = (rows - 1 - r) * cols + c;
              const on = idx < lit;
              return <rect key={k} x={x + 8 + c * ((w - 16) / cols)} y={y + 12 + r * 16} width={(w - 16) / cols - 5} height={9} rx="2"
                fill={on ? b.color : 'var(--line)'} opacity={on ? 0.95 : 0.6} style={{ transition: `fill .5s ${k * 0.015}s` }} />;
            })}
            {b.locked && <text x={x + w / 2} y={y + h / 2} textAnchor="middle" fontSize="18">🔒</text>}
          </g>
        );
      })}
    </svg>
  );
}
