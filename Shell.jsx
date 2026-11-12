import { useEffect, useState } from 'react';
import { useStore, DEMO_STEPS } from '../lib/store.jsx';
import { level, streakCount } from '../lib/engine.js';
import Tutor, { openTutor } from './Tutor.jsx';
import LangPicker from './LangPicker.jsx';
import { Aurora, PointerEffects, PalettePicker, CommandPalette, PALETTES } from './Fx.jsx';
import { CONCEPTS } from '../lib/data.js';
import { t } from '../lib/i18n.js';

export function Logo({ size = 34, withText = true }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
        <defs>
          <linearGradient id="dhg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="var(--accent)" /><stop offset=".55" stopColor="var(--cyan)" /><stop offset="1" stopColor="var(--violet)" /></linearGradient>
        </defs>
        <rect x="1.5" y="1.5" width="37" height="37" rx="11" fill="url(#dhg)" opacity=".18" stroke="url(#dhg)" strokeWidth="1.5" />
        <path d="M11 28 L17 13 L28 20 L20 29 Z" fill="none" stroke="url(#dhg)" strokeWidth="2" strokeLinejoin="round" />
        <circle cx="11" cy="28" r="3.2" fill="var(--accent)" /><circle cx="17" cy="13" r="3.2" fill="var(--cyan)" />
        <circle cx="28" cy="20" r="3.6" fill="var(--violet)" /><circle cx="20" cy="29" r="2.6" fill="var(--fg)" />
      </svg>
      {withText && <span className="font-display font-semibold text-[1.05rem] tracking-tight">Digi<span className="text-cyan">Helper</span></span>}
    </span>
  );
}

const STUDENT_NAV = [
  { id: 'dashboard', label: 'Dashboard', icon: '🏠', hue: 'var(--p1)' },
  { id: 'world', label: 'DigiWorld', icon: '🌐', hue: 'var(--p2)' },
  { id: 'mind', label: 'DigiMind', icon: '🧠', hue: 'var(--p3)' },
  { id: 'path', label: 'My Path', icon: '🧭', hue: 'var(--p4)' },
  { id: 'learn', label: 'Learn', icon: '📖', hue: '#22c55e' },
  { id: 'diagnostic', label: 'Diagnostic', icon: '🩺', hue: '#06b6d4' },
  { id: 'detective', label: 'Mistake Detective', icon: '🔎', hue: '#a855f7' },
  { id: 'challenge', label: 'Daily Challenge', icon: '⚡', hue: '#f59e0b' },
  { id: 'scan', label: 'DigiScan', icon: '📸', hue: '#ec4899' },
  { id: 'journey', label: 'Journey', icon: '📈', hue: '#10b981' },
  { id: 'analytics', label: 'Analytics', icon: '📊', hue: '#3b82f6' },
  { id: 'achievements', label: 'Achievements', icon: '🏅', hue: '#eab308' },
];
const TEACHER_NAV = [
  { id: 'teacher', label: 'Class Overview', icon: '🏫', hue: 'var(--p1)' },
  { id: 'pulse', label: 'Classroom Pulse', icon: '📊', hue: 'var(--p3)' },
  { id: 'creator', label: 'Lesson Creator', icon: '✍️', hue: 'var(--p4)' },
];
export const NAV_HUE = Object.fromEntries([...STUDENT_NAV, ...TEACHER_NAV].map((n) => [n.id, n.hue]));

export function Controls({ compact }) {
  const { state, setPref } = useStore();
  const nextTheme = { system: 'dark', dark: 'light', light: 'system' }[state.theme];
  const themeNames = { system: t('Auto'), dark: t('Dark'), light: t('Light') };
  const themeLabel = themeNames[state.theme];
  return (
    <div className="flex items-center gap-1.5">
      <LangPicker compact />
      <div className="hidden sm:block"><PalettePicker compact /></div>
      <div className="hidden sm:flex items-center panel p-0.5" role="group" aria-label={t('Text size')}>
        <button className="btn btn-ghost btn-sm px-2" onClick={() => setPref('textScale', Math.max(0.9, +(state.textScale - 0.1).toFixed(1)))} aria-label={t('Smaller text')}>A−</button>
        <button className="btn btn-ghost btn-sm px-2" onClick={() => setPref('textScale', Math.min(1.3, +(state.textScale + 0.1).toFixed(1)))} aria-label={t('Larger text')}>A+</button>
      </div>
      <button className="btn btn-sm" onClick={() => setPref('theme', nextTheme)} aria-label={t('Theme: {current}. Switch to {next}', { current: themeLabel, next: themeNames[nextTheme] })}>
        <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.5" />{state.theme === 'dark' && <path d="M8 1.5a6.5 6.5 0 0 0 0 13z" fill="currentColor" transform="rotate(180 8 8)" />}{state.theme === 'light' && <circle cx="8" cy="8" r="3" fill="currentColor" />}{state.theme === 'system' && <path d="M8 1.5a6.5 6.5 0 0 0 0 13z" fill="currentColor" />}</svg>{!compact && themeLabel}
      </button>
    </div>
  );
}

function DemoBar() {
  const { state, demoGo, exitDemo, nav } = useStore();
  if (!state.demo.active) return null;
  const step = state.demo.step; const d = DEMO_STEPS[step];
  return (
    <div className="sticky z-40 border-b border-line" style={{ top: 'env(safe-area-inset-top, 0px)', background: 'color-mix(in srgb, var(--violet) 18%, var(--bg))' }}>
      <div className="gutter py-2.5 flex flex-wrap items-center gap-3">
        <span className="pill pill-violet">{t('Competition Demo')}</span>
        <div className="flex items-center gap-1" aria-hidden="true">
          {DEMO_STEPS.map((s, i) => <button key={i} onClick={() => demoGo(i)} tabIndex={-1} className="h-1.5 rounded-full transition-all" style={{ width: i === step ? 22 : 10, background: i <= step ? 'var(--violet)' : 'var(--line-strong)' }} title={t(s.title)} />)}
        </div>
        <div className="min-w-0 flex-1 basis-[200px] text-sm"><span className="font-mono text-xs text-muted me-2">{step + 1}/10 · {t(d.phase)}</span><strong>{t(d.title)}</strong><span className="text-muted hidden lg:inline"> — {t(d.say)}</span></div>
        <div className="flex gap-2 ms-auto">
          <button className="btn btn-sm" disabled={step === 0} onClick={() => demoGo(step - 1)}>{t('← Back')}</button>
          {step < DEMO_STEPS.length - 1
            ? <button className="btn btn-primary btn-sm" onClick={() => demoGo(step + 1)}>{t('Next')}<span className="hidden sm:inline -ms-2">: {t(DEMO_STEPS[step + 1].title)}</span> <span className="dir-arrow">→</span></button>
            : <button className="btn btn-primary btn-sm" onClick={() => { exitDemo(); nav('demo'); }}>{t('Finish demo ✓')}</button>}
          <button className="btn btn-ghost btn-sm" onClick={() => { exitDemo(); nav('demo'); }} aria-label={t('Exit demo')}>✕</button>
        </div>
      </div>
    </div>
  );
}

function Toasts() {
  const { toasts } = useStore();
  return (
    <div className="fixed z-[80] grid gap-2" style={{ right: 'max(16px, env(safe-area-inset-right, 0px))', bottom: 'calc(88px + env(safe-area-inset-bottom, 0px))', maxWidth: 'min(380px, calc(100vw - 32px))' }} aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className="glass px-4 py-3 text-sm font-semibold anim-pop" style={{ background: 'var(--surface-solid)', borderColor: toast.kind === 'good' ? 'var(--good)' : toast.kind === 'bad' ? 'var(--bad)' : 'var(--line-strong)' }}>{toast.text}</div>
      ))}
    </div>
  );
}

function Celebration() {
  const { celebrations, setCelebrations, nav } = useStore();
  const c = celebrations[0];
  if (!c) return null;
  const close = () => setCelebrations((x) => x.slice(1));
  return (
    <div className="fixed inset-0 z-[90] grid place-items-center p-4" role="dialog" aria-modal="true" aria-label={t('{name} unlocked', { name: c.name })}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur" onClick={close} />
      <div className="glass glow-edge relative text-center p-8 max-w-sm w-full anim-pop overflow-hidden" style={{ background: 'var(--surface-solid)' }}>
        <div className="relative mx-auto mb-4 grid place-items-center" style={{ width: 120, height: 120 }}>
          {['var(--cyan)', 'var(--pink)', 'var(--violet)'].map((c, i) => <span key={i} className="absolute inset-0 rounded-full border-2" style={{ borderColor: c, animation: `burst 1.6s ${i * 0.35}s ease-out infinite` }} />)}
          <div className="text-6xl anim-float" aria-hidden="true">🔓</div>
        </div>
        <div className="eyebrow">{t('New area unlocked')}</div>
        <h2 className="font-display text-2xl font-semibold mt-1 rainbow-text">{c.name}</h2>
        <p className="text-muted mt-2">{t('You mastered the skill that opens this part of Math City.')}</p>
        <div className="flex gap-2 justify-center mt-5">
          <button className="btn btn-primary" onClick={() => { close(); nav('world'); }}>{t('See it in DigiWorld')}</button>
          <button className="btn" onClick={close}>{t('Later')}</button>
        </div>
      </div>
    </div>
  );
}

export default function Shell({ children }) {
  const { state, route, nav, student, signOut, srv } = useStore();
  const [open, setOpen] = useState(false);
  const role = state.session?.role;
  const showTeacher = role === 'teacher' || (state.demo.active && ['teacher', 'pulse', 'creator'].includes(route));
  const items = showTeacher ? TEACHER_NAV : STUDENT_NAV;
  useEffect(() => setOpen(false), [route]);
  const lv = student ? level(student.xp) : null;
  const { setPref } = useStore();
  // Labels and groups stay English (CommandPalette translates them at display); the translated label is
  // added to keywords so searching in Arabic or French works too.
  const cmds = [
    ...items.map((it) => ({ group: 'Go to', label: it.label, icon: it.icon, hue: it.hue, keywords: t(it.label), run: () => nav(it.id) })),
    ...(!showTeacher && student ? [
      { group: 'Do', label: 'Start today’s Digi Challenge', icon: '⚡', hue: '#f59e0b', keywords: `${'quiz timer'} ${t('Start today’s Digi Challenge')} ${t('quiz')}`, run: () => nav('challenge') },
      { group: 'Do', label: 'Ask Digi Helper', icon: '✦', hue: 'var(--p3)', keywords: `${'tutor ai help chat'} ${t('Ask Digi Helper')} ${t('tutor')}`, run: () => openTutor() },
      { group: 'Do', label: 'Take a reassessment', icon: '🩺', hue: '#06b6d4', keywords: `${'test diagnostic'} ${t('Take a reassessment')} ${t('Diagnostic')}`, run: () => nav('diagnostic', { reassess: true }) },
      ...CONCEPTS.map((c) => ({ group: 'Practice a topic', label: c.name, icon: '🧩', hue: c.hue, keywords: c.short, run: () => nav('learn', { concept: c.id, mode: 'practice' }) })),
    ] : []),
    ...PALETTES.map((p) => ({ group: 'Look & feel', label: t('{name} colours', { name: t(p.name) }), icon: '🎨', hue: p.colors[0], keywords: `${'palette theme color colour'} ${p.name} ${t('Colour palettes')}`, run: () => setPref('palette', p.id) })),
    { group: 'Look & feel', label: 'Dark mode', icon: '🌙', hue: 'var(--p3)', keywords: `${'theme night'} ${t('Dark mode')}`, run: () => setPref('theme', 'dark') },
    { group: 'Look & feel', label: 'Light mode', icon: '☀️', hue: '#f59e0b', keywords: `${'theme day'} ${t('Light mode')}`, run: () => setPref('theme', 'light') },
    { group: 'Look & feel', label: 'Larger text', icon: '🔠', hue: 'var(--p2)', keywords: `${'accessibility font size'} ${t('Larger text')}`, run: () => setPref('textScale', Math.min(1.3, +(state.textScale + 0.1).toFixed(1))) },
    { group: 'Account', label: 'Sign out', icon: '⎋', hue: 'var(--faint)', keywords: t('Sign out'), run: signOut },
  ];

  const navList = (
    <nav aria-label={t('Main')} className="grid gap-0.5">
      {items.map((it) => {
        const active = route === it.id;
        return (
          <button key={it.id} onClick={() => nav(it.id)} aria-current={active ? 'page' : undefined}
            className={`group flex items-center gap-3 rounded-xl px-2 py-1.5 text-sm font-semibold text-start transition ${active ? 'text-fg' : 'text-muted hover:text-fg hover:bg-surface2'}`}
            style={active ? { background: `linear-gradient(90deg, color-mix(in srgb, ${it.hue} 28%, transparent), transparent)`, boxShadow: `inset 3px 0 0 ${it.hue}` } : undefined}>
            <span className="hue-chip w-8 h-8 text-[0.95rem] transition-transform group-hover:scale-110 group-hover:-rotate-6" style={{ '--h': it.hue }} aria-hidden="true">{it.icon}</span>{t(it.label)}
          </button>
        );
      })}
      {state.demo.active && (
        <div className="mt-3 pt-3 border-t border-line grid gap-0.5">
          <div className="eyebrow px-3 mb-1">{t('Switch view')}</div>
          <button className="text-start rounded-xl px-3 py-2 text-sm font-semibold text-muted hover:text-fg" onClick={() => nav(showTeacher ? 'dashboard' : 'teacher')}>{showTeacher ? t('← Student view') : t('Teacher view →')}</button>
        </div>
      )}
    </nav>
  );

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <Aurora />
      <PointerEffects />
      <CommandPalette items={cmds} />
      <a href="#main" className="skip-link btn btn-primary">{t('Skip to content')}</a>
      <div className="stack"><DemoBar /></div>
      <div className="flex stack">
        <aside className="hidden lg:flex flex-col w-64 shrink-0 sticky self-start h-screen border-e border-line p-4 gap-4 overflow-y-auto" style={{ top: 0, background: 'color-mix(in srgb, var(--bg) 55%, transparent)', backdropFilter: 'blur(18px)' }}>
          <button onClick={() => nav(role === 'teacher' ? 'teacher' : 'dashboard')} className="text-start px-2 pt-1"><Logo /></button>
          {student && !showTeacher && (
            <div className="panel p-3 flex items-center gap-3">
              <div className="relative w-12 h-12 shrink-0" aria-hidden="true">
                <svg viewBox="0 0 48 48" className="absolute inset-0 -rotate-90"><circle cx="24" cy="24" r="21" fill="none" stroke="var(--line)" strokeWidth="3" /><circle cx="24" cy="24" r="21" fill="none" stroke="url(#lvg)" strokeWidth="3" strokeLinecap="round" strokeDasharray={132} strokeDashoffset={132 - (132 * lv.into) / lv.need} /><defs><linearGradient id="lvg"><stop offset="0" stopColor="var(--cyan)" /><stop offset="1" stopColor="var(--pink)" /></linearGradient></defs></svg>
                <div className="absolute inset-[5px] grid place-items-center rounded-full bg-surface2 text-xl">{student.profile.avatar || '🙂'}</div>
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-bold truncate">{student.profile.name}</div>
                <div className="text-xs text-muted tnum">{t('Level {level} · {xp} XP · 🔥 {streak}', { level: lv.level, xp: student.xp, streak: streakCount(student) })}</div>
                <div className="text-[0.68rem] text-faint mt-0.5">{t('{n} XP to level {next}', { n: lv.need - lv.into, next: lv.level + 1 })}</div>
              </div>
            </div>
          )}
          <button onClick={() => window.dispatchEvent(new Event('dh:palette'))} className="panel flex items-center gap-2 px-3 py-2 text-sm text-muted hover:text-fg transition whitespace-nowrap">
            <span aria-hidden="true">⌕</span><span className="truncate">{t('Search or jump to…')}</span><span className="ms-auto kbd whitespace-nowrap">Ctrl K</span>
          </button>
          {navList}
          <div className="mt-auto grid gap-2">
            <div className="text-xs text-faint px-2" title={t('Server status')}>
              <span className="inline-block w-2 h-2 rounded-full me-1.5" style={{ background: srv.ai ? 'var(--good)' : srv.online ? 'var(--warn)' : 'var(--faint)' }} />
              {srv.ai ? t('AI connected') : srv.online ? t('Server online · offline tutor') : t('Offline mode · built-in tutor')}
            </div>
            {student && !showTeacher && <button className="btn btn-ghost btn-sm justify-start" onClick={() => nav('me')}>⚙ {t('Profile & settings')}</button>}
            <button className="btn btn-ghost btn-sm justify-start" onClick={signOut}>⎋ {t('Sign out')}</button>
          </div>
        </aside>

        <div className="flex-1 min-w-0">
          <header className="sticky z-30 border-b border-line backdrop-blur-xl" style={{ top: state.demo.active ? 'auto' : 'env(safe-area-inset-top, 0px)', background: 'color-mix(in srgb, var(--bg) 72%, transparent)' }}>
            <div className="gutter py-2.5 flex items-center gap-3">
              <button className="btn btn-sm lg:hidden" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="mobile-nav" aria-label={t('Menu')}>☰</button>
              <div className="lg:hidden"><Logo size={28} /></div>
              <div className="hidden lg:block text-sm text-muted">{showTeacher ? t('Teacher workspace') : student ? t('{grade} · {subjects}', { grade: t(student.profile.grade), subjects: (student.profile.subjects || []).map((x) => t(x)).join(t(', ')) }) : ''}</div>
              <button className="btn btn-ghost btn-sm ms-auto lg:hidden" onClick={() => window.dispatchEvent(new Event('dh:palette'))} aria-label={t('Search')}>⌕</button>
              <div className="lg:ms-auto"><Controls compact /></div>
            </div>
            {open && <div id="mobile-nav" className="lg:hidden gutter pb-4 max-h-[75vh] overflow-y-auto">{navList}<div className="flex gap-2 mt-3">{student && !showTeacher && <button className="btn btn-sm" onClick={() => nav('me')}>⚙ {t('Profile')}</button>}<button className="btn btn-sm" onClick={signOut}>{t('Sign out')}</button></div></div>}
          </header>
          <main id="main" key={route} className="gutter py-6 lg:py-8 max-w-[1280px] mx-auto page-in">{children}</main>
        </div>
      </div>
      {!showTeacher && student && <Tutor />}
      <Toasts />
      <Celebration />
    </div>
  );
}

export { Toasts, Celebration };
