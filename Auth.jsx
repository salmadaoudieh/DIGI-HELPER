import { useState } from 'react';
import { useStore } from '../lib/store.jsx';
import { login, signup, clean } from '../lib/api.js';
import { Logo, Controls } from '../components/Shell.jsx';
import { AVATARS, GRADES, SUBJECTS, MODES } from '../lib/data.js';
import { blankStudent } from '../lib/engine.js';
import { t } from '../lib/i18n.js';

export default function Auth() {
  const { nav, signIn, srv, enterDemoStudent, enterDemoTeacher } = useStore();
  const [role, setRole] = useState('student');
  const [mode, setMode] = useState('signup');
  const [f, setF] = useState({ name: '', username: '', password: '', grade: 'Grade 10', subjects: ['Math'], preference: 'visual', avatar: '🦉', school: '' });
  const [err, setErr] = useState(''); const [busy, setBusy] = useState(false);
  const set = (k, v) => setF((x) => ({ ...x, [k]: v }));

  async function submit(e) {
    e.preventDefault(); setErr(''); setBusy(true);
    try {
      let res;
      if (mode === 'signup') {
        const name = clean(f.name, 40);
        if (name.length < 2) throw new Error(t('Tell us what to call you (at least 2 characters).'));
        if (role === 'student' && !f.subjects.length) throw new Error(t('Pick at least one subject.'));
        const data = role === 'student'
          ? { username: f.username.trim(), password: f.password, name, grade: f.grade, subjects: f.subjects, preference: f.preference, avatar: f.avatar }
          : { username: f.username.trim(), password: f.password, name, school: clean(f.school, 60) };
        res = await signup(role, data);
      } else {
        res = await login(role, { username: f.username.trim(), password: f.password });
      }
      const u = res.user;
      const profile = role === 'student'
        ? { name: u.name, grade: u.grade, subjects: u.subjects, preference: u.preference, avatar: u.avatar, className: '10A' }
        : { name: u.name, school: u.school, classes: ['10A', '10B', '9C'] };
      signIn({ role, id: u.id, name: u.name, token: res.token, offline: !!res.offline, remote: role === 'student' && res.progress ? { ...blankStudent(profile), ...res.progress, profile } : undefined }, profile);
      nav(role === 'student' ? 'dashboard' : 'teacher');
    } catch (e2) { setErr(e2.message || t('Something went wrong. Try again.')); } finally { setBusy(false); }
  }

  return (
    <div className="app-bg min-h-screen">
      <header className="gutter py-4 max-w-[1100px] mx-auto flex items-center"><button onClick={() => nav('home')} aria-label={t('Digi Helper home')}><Logo /></button><div className="ms-auto"><Controls compact /></div></header>
      <main id="main" className="gutter max-w-[1100px] mx-auto py-6 grid lg:grid-cols-[1fr_1.1fr] gap-8 items-start">
        <div className="pt-4">
          <div className="eyebrow mb-2">{mode === 'signup' ? t('Create your space') : t('Welcome back')}</div>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold">{role === 'student' ? t('Your personal learning environment') : t('See what your class really understands')}</h1>
          <p className="text-muted mt-3 max-w-md">{role === 'student' ? t('A short profile is all we need. No email, no birthday, no phone number.') : t('Create lessons, assign challenges and read the Classroom Pulse.')}</p>
          <div className="glass p-5 mt-8 grid gap-3">
            <div className="font-semibold">{t('Just exploring?')}</div>
            <p className="text-sm text-muted">{t('Jump straight in with ready-made demo accounts.')}</p>
            <div className="flex flex-wrap gap-2">
              <button className="btn btn-sm" onClick={enterDemoStudent}>{t('🚀 Continue as Demo Student')}</button>
              <button className="btn btn-sm" onClick={enterDemoTeacher}>{t('🏫 Continue as Demo Teacher')}</button>
              <button className="btn btn-sm btn-ghost" onClick={() => nav('demo')}>{t('▶ Competition demo')}</button>
            </div>
          </div>
          {!srv.online && <p className="text-xs text-faint mt-4">ⓘ {t('No server detected — accounts you create are stored only in this browser. Run the Digi Helper server for secure server-side accounts.')}</p>}
        </div>

        <form onSubmit={submit} className="glass glow-edge p-6 sm:p-8 grid gap-5" noValidate>
          <div className="grid grid-cols-2 gap-2 panel p-1" role="tablist" aria-label={t('Account type')}>
            {['student', 'teacher'].map((r) => <button type="button" key={r} role="tab" aria-selected={role === r} onClick={() => setRole(r)} className={`rounded-xl py-2.5 font-bold text-sm transition ${role === r ? 'bg-accent text-white' : 'text-muted hover:text-fg'}`}>{r === 'student' ? t('🎒 Student') : t('🏫 Teacher')}</button>)}
          </div>
          <div className="flex gap-4 text-sm font-semibold">
            {['signup', 'login'].map((mm) => <button type="button" key={mm} onClick={() => { setMode(mm); setErr(''); }} className={mode === mm ? 'text-fg border-b-2 pb-1' : 'text-muted pb-1'} style={mode === mm ? { borderColor: 'var(--cyan)' } : undefined}>{mm === 'signup' ? t('Sign up') : t('Log in')}</button>)}
          </div>

          {mode === 'signup' && (
            <div>
              <label className="label" htmlFor="f-name">{role === 'student' ? t('First name or nickname') : t('Display name')}</label>
              <input id="f-name" className="input" value={f.name} onChange={(e) => set('name', e.target.value)} maxLength={40} autoComplete="nickname" placeholder={role === 'student' ? t('e.g. Lina') : t('e.g. Ms. Haddad')} />
            </div>
          )}
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="label" htmlFor="f-user">{t('Username')}</label><input id="f-user" className="input" value={f.username} onChange={(e) => set('username', e.target.value)} maxLength={24} autoComplete="username" placeholder="lina.k" /></div>
            <div><label className="label" htmlFor="f-pass">{t('Password')}</label><input id="f-pass" type="password" className="input" value={f.password} onChange={(e) => set('password', e.target.value)} autoComplete={mode === 'signup' ? 'new-password' : 'current-password'} placeholder={t('8+ characters')} /></div>
          </div>

          {mode === 'signup' && role === 'student' && (
            <>
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className="label" htmlFor="f-grade">{t('Grade')}</label><select id="f-grade" className="input" value={f.grade} onChange={(e) => set('grade', e.target.value)}>{GRADES.map((g) => <option key={g} value={g}>{t(g)}</option>)}</select></div>
                <div>
                  <span className="label">{t('Avatar (optional)')}</span>
                  <div className="flex flex-wrap gap-1.5" role="radiogroup" aria-label={t('Avatar')}>{AVATARS.map((a) => <button type="button" key={a} role="radio" aria-checked={f.avatar === a} aria-label={t('Avatar {a}', { a })} onClick={() => set('avatar', a)} className={`w-9 h-9 rounded-lg text-lg panel ${f.avatar === a ? 'ring-2 ring-[var(--accent)]' : ''}`}>{a}</button>)}</div>
                </div>
              </div>
              <div>
                <span className="label">{t('Subjects')}</span>
                <div className="flex flex-wrap gap-2">{SUBJECTS.map((s) => <button type="button" key={s} className="chip" aria-pressed={f.subjects.includes(s)} onClick={() => set('subjects', f.subjects.includes(s) ? f.subjects.filter((x) => x !== s) : [...f.subjects, s])}>{t(s)}</button>)}</div>
              </div>
              <div>
                <span className="label">{t('How do you like to learn?')}</span>
                <div className="grid grid-cols-2 gap-2">{Object.values(MODES).map((mo) => <button type="button" key={mo.id} aria-pressed={f.preference === mo.id} onClick={() => set('preference', mo.id)} className={`panel p-3 text-start ${f.preference === mo.id ? 'ring-2 ring-[var(--accent)]' : ''}`}><div className="font-bold text-sm">{mo.icon} {mo.name}</div><div className="text-xs text-muted">{mo.desc}</div></button>)}</div>
              </div>
            </>
          )}
          {mode === 'signup' && role === 'teacher' && (
            <div><label className="label" htmlFor="f-school">{t('School (optional)')}</label><input id="f-school" className="input" value={f.school} onChange={(e) => set('school', e.target.value)} maxLength={60} /></div>
          )}

          {err && <div role="alert" className="panel p-3 text-sm" style={{ borderColor: 'var(--bad)', color: 'var(--bad)' }}>{err}</div>}
          <button className="btn btn-primary btn-lg" disabled={busy}>{busy ? t('Please wait…') : mode === 'signup' ? (role === 'student' ? t('Create student account') : t('Create teacher account')) : t('Log in')}</button>
        </form>
      </main>
    </div>
  );
}
