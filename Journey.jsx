import { useStore } from '../lib/store.jsx';
import { dayLabel, t } from '../lib/i18n.js';
import { CONCEPTS, ALGEBRA_GROUP } from '../lib/data.js';
import { algebraMastery } from '../lib/engine.js';
import { SectionHead, Card, Empty, DemoNote, DemoTag } from '../components/ui.jsx';
import { LineChart, BarChart } from '../components/Charts.jsx';

const FLOW = ['Personalized diagnosis', 'Targeted activities', 'Practice', 'Reassessment'];

export default function Journey() {
  const { student: s, nav, state } = useStore();
  const isDemo = state.session?.id === 'demo';
  const j = s.journey.filter((x) => x.v !== null && x.v !== undefined);
  if (!j.length) return (
    <div className="grid gap-5"><SectionHead eyebrow={t('Measure')} title={t('Before → After Learning Journey')} />
      <Empty icon="📈" title={t('Your journey starts with a diagnostic')} action={<button className="btn btn-primary" onClick={() => nav('diagnostic')}>{t('Take the diagnostic')}</button>}>{t('After that, every practice session and reassessment adds a point to this chart.')}</Empty></div>
  );
  const first = j[0]; const last = j[j.length - 1];
  const cur = algebraMastery(s) ?? last.v;
  const end = j.length > 1 ? last.v : cur;
  const gain = end - first.v;
  const group = CONCEPTS.filter((c) => ALGEBRA_GROUP.includes(c.id) || c.id === 'order');

  return (
    <div className="grid gap-5">
      <SectionHead eyebrow={t('Measure')} title={t('Before → After Learning Journey')} desc={t('The measurable impact of a personalized path: where you started, what changed, and how much.')} right={isDemo ? <DemoTag /> : null} />

      <div className="grid lg:grid-cols-[320px_1fr] gap-5">
        <Card className="grid gap-0 content-start">
          <div className="panel p-4 text-center"><div className="font-mono text-xs text-muted">{dayLabel(first.day)}</div><div className="text-sm font-semibold mt-1">{t('Algebra Mastery')}</div><div className="font-display text-4xl font-semibold text-bad tnum">{first.v}%</div></div>
          {FLOW.map((f, i) => (
            <div key={f} className="grid place-items-center">
              <div className="w-0.5 h-5" style={{ background: 'var(--line-strong)' }} aria-hidden="true" />
              <div className="text-xs text-muted" aria-hidden="true">↓</div>
              <div className="panel px-4 py-2 text-sm font-semibold anim-up" style={{ animationDelay: `${i * 120}ms` }}>{t(f)}</div>
            </div>
          ))}
          <div className="grid place-items-center"><div className="w-0.5 h-5" style={{ background: 'var(--line-strong)' }} /><div className="text-xs text-muted" aria-hidden="true">↓</div></div>
          <div className="panel p-4 text-center glow-edge"><div className="font-mono text-xs text-muted">{j.length > 1 ? dayLabel(last.day) : t('Today')}</div><div className="text-sm font-semibold mt-1">{t('Algebra Mastery')}</div><div className="font-display text-4xl font-semibold text-good tnum">{end}%</div></div>
        </Card>

        <div className="grid gap-5">
          <div className="grid grid-cols-3 gap-3">
            <div className="glass p-4"><div className="text-xs text-muted font-bold uppercase tracking-wider">{t('Before')}</div><div className="font-display text-3xl font-semibold tnum">{first.v}%</div></div>
            <div className="glass p-4"><div className="text-xs text-muted font-bold uppercase tracking-wider">{t('After')}</div><div className="font-display text-3xl font-semibold tnum">{end}%</div></div>
            <div className="glass p-4"><div className="text-xs text-muted font-bold uppercase tracking-wider">{t('Change')}</div><div className="font-display text-3xl font-semibold tnum" style={{ color: gain >= 0 ? 'var(--good)' : 'var(--bad)' }}>{t('{d} pts', { d: `${gain >= 0 ? '+' : ''}${gain}` })}</div></div>
          </div>
          <Card>
            <h2 className="font-bold mb-3">{t('Algebra mastery, day by day')}</h2>
            <LineChart labels={j.map((x) => dayLabel(x.day))} series={[{ label: t('Algebra mastery'), data: j.map((x) => x.v), color: 'cyan' }]} height={260} />
            {j.some((x) => x.event) && <ol className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-xs text-muted">{j.map((x) => <li key={x.day}><span className="font-mono text-fg">{dayLabel(x.day)}</span> {t(x.event)}</li>)}</ol>}
          </Card>
        </div>
      </div>

      <Card>
        <h2 className="font-bold mb-3">{t('Concept by concept')}</h2>
        <BarChart labels={group.map((c) => c.short)} series={[{ label: t('Before'), data: group.map((c) => s.baseline[c.id] ?? 0), color: 'violet' }, { label: t('Now'), data: group.map((c) => Math.round(s.mastery[c.id] ?? 0)), color: 'cyan' }]} height={280} />
      </Card>
      {isDemo && <DemoNote />}
    </div>
  );
}
