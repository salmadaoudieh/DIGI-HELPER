import { useStore } from '../lib/store.jsx';
import { dayLabel, t } from '../lib/i18n.js';
import { renderDiag } from '../lib/engine.js';
import { buildPath } from '../lib/engine.js';
import { MODES } from '../lib/data.js';
import { SectionHead, Card, Empty, Bar, StatusPill } from '../components/ui.jsx';

export default function PathPage() {
  const { student: s, nav } = useStore();
  const path = buildPath(s);
  const d = s.diagnoses[0];
  return (
    <div className="grid gap-5">
      <SectionHead eyebrow={t('Adapt')} title={t('Your personalized learning path')} desc={t('Built from your diagnosis: foundations first, then the skills that depend on them. Each step uses the learning mode that best fits the kind of mistake you made.')} />
      {d && (
        <Card glow className="grid sm:grid-cols-[auto_1fr] gap-4 items-start">
          <div className="text-3xl" aria-hidden="true">🩺</div>
          <div><div className="eyebrow mb-1">{t('Based on your diagnosis · {at}', { at: dayLabel(d.at) })}</div><p className="text-[1.05rem]">“{renderDiag(d).text}”</p></div>
        </Card>
      )}
      {!path.length ? (
        <Empty icon="🧭" title={d ? t('No weak spots right now') : t('Take the diagnostic first')} action={<button className="btn btn-primary" onClick={() => nav(d ? 'world' : 'diagnostic')}>{d ? t('Explore DigiWorld') : t('Start diagnostic')}</button>}>{d ? t('Everything unlocked is at 75% or above.') : t('Your path is generated from your answers.')}</Empty>
      ) : (
        <ol className="relative grid gap-4 ps-8 sm:ps-12">
          <span className="absolute left-3 rtl:left-auto rtl:right-3 sm:left-5 rtl:sm:left-auto rtl:sm:right-5 top-2 bottom-2 w-0.5" style={{ background: 'linear-gradient(var(--cyan), var(--violet), transparent)' }} aria-hidden="true" />
          {path.map((p, i) => (
            <li key={p.concept.id} className="relative anim-up" style={{ animationDelay: `${i * 80}ms` }}>
              <span className="absolute -left-8 rtl:left-auto rtl:-right-8 sm:-left-12 rtl:sm:left-auto rtl:sm:-right-12 top-5 w-6 h-6 sm:w-8 sm:h-8 rounded-full grid place-items-center text-xs font-mono font-bold"
                style={{ background: i === 0 ? 'var(--cyan)' : 'var(--surface-solid)', color: i === 0 ? '#001018' : 'var(--fg)', border: '2px solid var(--cyan)', boxShadow: i === 0 ? '0 0 16px var(--cyan)' : undefined }}>{i + 1}</span>
              <div className="glass p-5 grid md:grid-cols-[1fr_auto] gap-4 items-center" style={i === 0 ? { borderColor: 'var(--cyan)' } : undefined}>
                <div className="min-w-0 grid gap-2">
                  <div className="flex flex-wrap items-center gap-2">{i === 0 && <span className="pill pill-info">{t('Start here')}</span>}<h2 className="font-display text-lg font-semibold">{p.concept.name}</h2><StatusPill value={p.mastery} /></div>
                  <p className="text-sm text-muted">{p.reason}{p.blockers.length > 0 && p.mistake ? ` · ${t('builds on {list}', { list: p.blockers.join(t(', ')) })}` : ''}</p>
                  <div className="flex items-center gap-3 max-w-sm"><Bar value={p.mastery} className="flex-1" label={t('{name} mastery', { name: p.concept.name })} /><span className="font-mono text-sm tnum">{p.mastery}% → 75%</span></div>
                </div>
                <div className="flex md:flex-col gap-2 md:items-end">
                  <span className="text-sm"><span aria-hidden="true">{MODES[p.mode].icon}</span> {t('Recommended:')} <strong>{MODES[p.mode].name}</strong></span>
                  <button className={`btn ${i === 0 ? 'btn-primary' : ''}`} onClick={() => nav('learn', { concept: p.concept.id, mode: p.mode })}>{t('Start →')}</button>
                </div>
              </div>
            </li>
          ))}
          <li className="relative">
            <span className="absolute -left-8 rtl:left-auto rtl:-right-8 sm:-left-12 rtl:sm:left-auto rtl:sm:-right-12 top-3 w-6 h-6 sm:w-8 sm:h-8 rounded-full grid place-items-center" style={{ border: '2px dashed var(--violet)' }} aria-hidden="true">✓</span>
            <div className="panel p-4 flex flex-wrap items-center justify-between gap-3"><div><div className="font-semibold">{t('Reassessment')}</div><div className="text-sm text-muted">{t('Measure the change once the path is done.')}</div></div><button className="btn btn-sm" onClick={() => nav('diagnostic', { reassess: true })}>{t('Take reassessment')}</button></div>
          </li>
        </ol>
      )}
    </div>
  );
}
