import { useState } from 'react';
import { useStore } from '../lib/store.jsx';
import { ZONES, CONCEPT, statusOf, STATUS, SUBJECT } from '../lib/data.js';
import { districtProgress, districtLocked, subjectMastery } from '../lib/engine.js';
import { t } from '../lib/i18n.js';
import { SectionHead, Card, Bar, StatusPill } from '../components/ui.jsx';
import { Skyline } from '../components/Visuals.jsx';

const ZONE_ART = {
  science: (c) => (<g>{[0, 1, 2].map((i) => <g key={i} transform={`translate(${60 + i * 170} 40)`}><path d="M30 0 h30 v40 l30 60 q5 14 -10 14 h-70 q-15 0 -10 -14 l30 -60 z" fill="var(--surface-2)" stroke={c} strokeOpacity=".7" /><path d="M8 95 q37 -16 74 0 l5 6 q2 12 -10 12 h-64 q-12 0 -10 -12z" fill={c} opacity={0.25 + i * 0.2} /></g>)}</g>),
  language: (c) => (<g>{Array.from({ length: 9 }, (_, i) => <rect key={i} x={40 + i * 58} y={30 + (i % 3) * 8} width={40} height={110 - (i % 3) * 8} rx="4" fill="var(--surface-2)" stroke={c} strokeOpacity=".6" />)}</g>),
  social: (c) => (<g><circle cx="300" cy="80" r="62" fill="var(--surface-2)" stroke={c} strokeOpacity=".7" /><path d="M250 60 q30 -20 50 0 t40 10 M245 95 q40 15 80 -5" stroke={c} strokeWidth="3" fill="none" opacity=".7" /></g>),
  tech: (c) => (<g>{Array.from({ length: 6 }, (_, i) => <g key={i}><rect x={50 + i * 85} y={50} width={50} height={50} rx="8" fill="var(--surface-2)" stroke={c} strokeOpacity=".7" />{i < 5 && <line x1={100 + i * 85} y1={75} x2={135 + i * 85} y2={75} stroke={c} strokeWidth="2" className="flow-dash" />}</g>)}</g>),
};

export default function DigiWorld() {
  const { student: s, nav, state, params } = useStore();
  const [zoneId, setZoneId] = useState(params.zone || 'math');
  const zone = ZONES.find((z) => z.id === zoneId);
  const zm = subjectMastery(s, zone.subject);
  const isDemo = state.session?.id === 'demo';

  const buildings = zone.districts.flatMap((d) => d.concepts.map((cid, k) => ({ id: cid, value: s.mastery[cid], locked: districtLocked(s, d), color: statusOf(s.mastery[cid]) === 'new' ? CONCEPT[cid].hue : STATUS[statusOf(s.mastery[cid])].color, tall: !!d.unlock || k === 1 })));

  return (
    <div className="grid gap-5">
      <SectionHead eyebrow="DigiWorld" title={t('Your learning universe')} desc={t('Each subject is a zone. Districts light up as you master skills and new ones unlock when you are ready.')} />

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3" role="tablist" aria-label={t('Zones')}>
        {ZONES.map((z) => {
          const vals = z.districts.map((d) => districtProgress(s, d)).filter((v) => v !== null && v !== undefined);
          const avg = vals.length ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length) : null;
          const active = z.id === zoneId;
          return (
            <button key={z.id} role="tab" aria-selected={active} onClick={() => setZoneId(z.id)}
              data-tilt="10" className="glass p-4 text-start relative overflow-hidden"
              style={{ background: `linear-gradient(160deg, color-mix(in srgb, ${z.hue} ${active ? 30 : 14}%, var(--surface)), var(--surface))`, ...(active ? { borderColor: z.hue, boxShadow: `0 0 0 1px ${z.hue}, 0 18px 40px -14px ${z.hue}` } : {}) }}>
              <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full blur-2xl opacity-40" style={{ background: z.hue }} aria-hidden="true" />
              <div className="hue-chip w-12 h-12 text-3xl relative transition-transform" style={{ '--h': z.hue, transform: active ? 'scale(1.1) rotate(-6deg)' : undefined }} aria-hidden="true">{z.icon}</div>
              <div className="font-bold mt-2 relative">{z.name}</div>
              <div className="text-xs text-muted relative">{avg === null ? t('Not explored yet') : t('{n}% lit', { n: avg })}</div>
            </button>
          );
        })}
      </div>

      <Card className="relative overflow-hidden p-0">
        <div className="absolute inset-0 grid-bg" aria-hidden="true" />
        <div className="relative p-5 sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="eyebrow" style={{ color: zone.hue }}>{zone.icon} {zone.name}</div>
              <h2 className="font-display text-2xl font-semibold mt-1">{zone.blurb}</h2>
            </div>
            {zm !== null && <span className="pill pill-info">{t('{subject} mastery {n}%', { subject: SUBJECT[zone.subject].name, n: zm })}</span>}
          </div>
          <div className="mt-6 rounded-2xl overflow-hidden border border-line" style={{ background: `linear-gradient(180deg, transparent, color-mix(in srgb, ${zone.hue} 10%, transparent))` }}>
            {zone.id !== 'math' && <svg viewBox="0 0 600 150" className="w-full h-auto -mb-10 opacity-60" aria-hidden="true">{ZONE_ART[zone.id](zone.hue)}</svg>}
            <Skyline buildings={buildings} height={170} />
          </div>
          {zm === null && <button className="btn btn-primary btn-sm mt-3" onClick={() => nav('diagnostic', { subject: zone.subject })}>{t('Take the {subject} diagnostic', { subject: SUBJECT[zone.subject].name })} <span className="dir-arrow">→</span></button>}
          <p className="text-xs text-muted mt-2">{t('Every building is a concept. Lit windows show how much of it you have mastered.')}</p>
        </div>
      </Card>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {zone.districts.map((d) => {
          const locked = districtLocked(s, d);
          const v = districtProgress(s, d);
          const freshUnlock = !locked && d.unlock;
          return (
            <div key={d.id} data-tilt="5" className={`glass p-5 grid gap-3 content-start relative overflow-hidden hue-card ${locked ? 'opacity-80' : ''}`} style={{ '--h': locked ? 'var(--faint)' : zone.hue, ...(freshUnlock ? { borderColor: 'var(--good)' } : {}) }}>
              {locked && <div className="absolute inset-0 pointer-events-none" style={{ background: 'repeating-linear-gradient(135deg, transparent 0 14px, var(--grid) 14px 15px)' }} aria-hidden="true" />}
              <div className="flex items-start justify-between gap-2">
                <div><div className="font-display font-semibold">{d.name}</div>
                  {d.concepts && <div className="text-xs text-muted mt-0.5">{d.concepts.map((c) => CONCEPT[c].name).join(' · ')}</div>}</div>
                {locked ? <span className="pill pill-muted">🔒 {t('Locked')}</span> : freshUnlock ? <span className="pill pill-good">🔓 {t('Unlocked')}</span> : v !== null && v !== undefined && <StatusPill value={v} />}
              </div>
              {locked ? (
                <p className="text-sm">{d.unlock?.text}{d.unlock && <span className="block text-xs text-muted mt-1">{CONCEPT[d.unlock.concept].name}: {Math.round(s.mastery[d.unlock.concept] ?? 0)}% / {d.unlock.min}%</span>}</p>
              ) : (
                <>
                  <Bar value={v ?? 0} label={t('{name} progress', { name: d.name })} />
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm tnum">{v === null || v === undefined ? t('Not started') : `${v}%`}</span>
                    <button className="btn btn-sm" onClick={() => nav('learn', { concept: d.concepts.slice().sort((a, b) => (s.mastery[a] ?? 0) - (s.mastery[b] ?? 0))[0] })}>{t('Explore')} <span className="dir-arrow">→</span></button>
                  </div>
                </>
              )}
              {locked && d.unlock && <button className="btn btn-sm justify-self-start" onClick={() => nav('learn', { concept: d.unlock.concept })}>{t('Work towards it')}</button>}
            </div>
          );
        })}
      </div>
      {isDemo && <p className="text-xs text-faint">ⓘ {t('Demo Student progress is simulated.')}</p>}
    </div>
  );
}
