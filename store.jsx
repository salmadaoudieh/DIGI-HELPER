import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { blankStudent, demoStudent, evaluateAchievements, evaluateUnlocks } from './engine.js';
import { ACHIEVEMENTS } from './data.js';
import { api, checkServer, server } from './api.js';
import { confetti, celebrate } from './fx.js';
import { level } from './engine.js';
import { setLang, LANGS, t } from './i18n.js';

const KEY = 'dh.state.v2';
const Ctx = createContext(null);

const STUDENT_ROUTES = ['dashboard', 'world', 'mind', 'diagnostic', 'detective', 'path', 'learn', 'challenge', 'scan', 'journey', 'analytics', 'achievements', 'me'];
const TEACHER_ROUTES = ['teacher', 'pulse', 'creator'];
export const PUBLIC_ROUTES = ['home', 'login', 'demo'];

// title/phase/say stay in English here (evaluated once at import); they are wrapped with t() where displayed.
export const DEMO_STEPS = [
  { route: 'diagnostic', title: 'Diagnostic test', phase: 'Problem', say: 'Demo Student takes a 10-question algebra diagnostic. Confidence is rated before key questions.', stage: 'fresh' },
  { route: 'diagnostic', view: 'results', title: 'Incorrect answers', phase: 'Problem', say: 'The score is only the start. Digi Helper looks at which concepts were missed, the patterns, timing and confidence.', stage: 'before' },
  { route: 'detective', title: 'Mistake Detective', phase: 'Detection', say: 'For 3x + 5 = 20 the student answered x = 3. Mistake Detective finds exactly which step went wrong.', stage: 'before' },
  { route: 'mind', focus: 'neg', title: 'DigiMind finds the weak concept', phase: 'Detection', say: 'DigiMind traces the errors back to one root concept: Negative Numbers.', stage: 'before' },
  { route: 'path', title: 'Personalized learning path', phase: 'Intervention', say: 'A path is built from the weak concepts, foundations first, each with a recommended learning mode.', stage: 'before' },
  { route: 'learn', concept: 'linear', mode: 'interactive', title: 'Interactive activity', phase: 'Intervention', say: 'The balance game makes "do the same to both sides" physical — including negatives.', stage: 'before' },
  { route: 'challenge', title: 'Daily Digi Challenge', phase: 'Intervention', say: "Today's challenge is built from the student's weakest skill: negative numbers, against the clock.", stage: 'before' },
  { route: 'diagnostic', reassess: true, title: 'Reassessment', phase: 'Improvement', say: 'A week later, the same skills are reassessed.', stage: 'before' },
  { route: 'journey', title: 'Mastery improves', phase: 'Improvement', say: 'Algebra mastery moved from 38% to 81% across seven days (demo data).', stage: 'after' },
  { route: 'teacher', title: 'Teacher sees the improvement', phase: 'Improvement', say: "The teacher's dashboard shows the improvement and what the class still needs.", stage: 'after' },
];

function load() {
  try { const raw = localStorage.getItem(KEY); if (raw) return JSON.parse(raw); } catch { /* blocked storage */ }
  return null;
}
function initial() {
  const saved = load();
  const base = { theme: 'system', palette: 'ocean', lang: guessLang(), textScale: 1, mood: null, session: null, students: {}, teachers: {}, assignments: seedAssignments(), demo: { active: false, step: 0 } };
  const s = saved ? { ...base, ...saved } : base;
  if (!s.students.demo) s.students.demo = demoStudent('before');
  return s;
}

function seedAssignments() {
  return [
    { id: 'a1', type: 'Challenge', title: 'Negative numbers sprint', subject: 'Math', concept: 'neg', difficulty: 'Medium', classes: ['10A'], due: '', questions: 5, createdBy: 'Demo Teacher', demo: true },
    { id: 'a2', type: 'Diagnostic test', title: 'Linear equations check-in', subject: 'Math', concept: 'linear', difficulty: 'Hard', classes: ['10A', '10B'], due: '', questions: 8, createdBy: 'Demo Teacher', demo: true },
  ];
}

function guessLang() {
  try { const l = (navigator.language || 'en').slice(0, 2).toLowerCase(); return ['ar', 'fr'].includes(l) ? l : 'en'; } catch { return 'en'; }
}

function routeFromHash() {
  const h = (typeof location !== 'undefined' ? location.hash : '').replace(/^#/, '');
  return /^[a-z-]+$/.test(h) ? h : 'home';
}

export function StoreProvider({ children }) {
  const [state, setState] = useState(initial);
  setLang(state.lang); // synchronous so every t() in this render uses the chosen language
  const [route, setRoute] = useState(routeFromHash);
  const [params, setParams] = useState({});
  const [toasts, setToasts] = useState([]);
  const [celebrations, setCelebrations] = useState([]);
  const [srv, setSrv] = useState({ ...server });

  useEffect(() => { checkServer().then((s) => setSrv({ ...s })); }, []);

  // persist
  useEffect(() => {
    const tm = setTimeout(() => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* ignore */ } }, 250);
    return () => clearTimeout(tm);
  }, [state]);

  // theme + text size
  useEffect(() => {
    const root = document.documentElement;
    if (state.theme === 'system') root.removeAttribute('data-theme'); else root.setAttribute('data-theme', state.theme);
    root.style.setProperty('--text-scale', String(state.textScale));
    if (!state.palette || state.palette === 'ocean') root.removeAttribute('data-palette'); else root.setAttribute('data-palette', state.palette);
    const lang = LANGS.find((l) => l.id === state.lang) || LANGS[0];
    root.setAttribute('lang', lang.id); root.setAttribute('dir', lang.dir);
  }, [state.theme, state.textScale, state.palette, state.lang]);

  // hash routing
  useEffect(() => {
    const onHash = () => setRoute(routeFromHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const nav = useCallback((name, p = {}) => {
    setParams(p);
    if (routeFromHash() === name) setRoute(name); else location.hash = name;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const toast = useCallback((text, kind = 'info') => {
    const id = Math.random().toString(36).slice(2);
    setToasts((ts) => [...ts, { id, text, kind }]);
    setTimeout(() => setToasts((ts) => ts.filter((x) => x.id !== id)), 4200);
  }, []);

  const studentId = state.session?.role === 'student' ? state.session.id : null;
  const student = studentId ? state.students[studentId] : null;

  /** Mutate the signed-in student. fn receives a deep clone and may return a value. */
  const updateStudent = useCallback((fn, id) => {
    let out; const fresh = []; const earned = []; let levelUp = 0;
    setState((s) => {
      const sid = id || s.session?.id; if (!sid || !s.students[sid]) return s;
      const copy = structuredClone(s.students[sid]);
      const lvBefore = level(copy.xp).level;
      out = fn(copy);
      evaluateUnlocks(copy).forEach((d) => { if (!copy.seenUnlocks.includes(d.id)) { copy.seenUnlocks.push(d.id); fresh.push(d); } });
      earned.push(...evaluateAchievements(copy));
      earned.forEach((a) => { const def = ACHIEVEMENTS.find((x) => x.id === a); if (def) copy.xp += def.xp; });
      const lvAfter = level(copy.xp).level; if (lvAfter > lvBefore && sid !== 'demo') levelUp = lvAfter;
      return { ...s, students: { ...s.students, [sid]: copy } };
    });
    // side effects after the state update is queued
    setTimeout(() => {
      fresh.forEach((d) => setCelebrations((c) => [...c, { type: 'unlock', name: d.name, id: d.id }]));
      earned.forEach((a) => { const def = ACHIEVEMENTS.find((x) => x.id === a); if (def) toast(t('{icon} Achievement unlocked: {name} (+{xp} XP)', { icon: def.icon, name: def.name, xp: def.xp }), 'good'); });
      if (fresh.length) celebrate(); else if (earned.length) confetti({ count: 110 });
      if (levelUp) { toast(t('⭐ Level up! You reached level {n}. Your effort is adding up.', { n: levelUp }), 'good'); celebrate(); }
    }, 0);
    return out;
  }, [toast]);

  const signIn = useCallback((session, profile) => {
    setState((s) => {
      const next = { ...s, session };
      if (session.role === 'student' && !s.students[session.id]) next.students = { ...s.students, [session.id]: blankStudent(profile) };
      if (session.role === 'student' && session.remote) next.students = { ...next.students, [session.id]: session.remote };
      if (session.role === 'teacher') next.teachers = { ...s.teachers, [session.id]: { profile } };
      delete next.session.remote;
      return next;
    });
  }, []);

  const signOut = useCallback(() => { setState((s) => ({ ...s, session: null, demo: { active: false, step: 0 } })); nav('home'); }, [nav]);

  const setPref = useCallback((k, v) => setState((s) => ({ ...s, [k]: v })), []);

  const updateProfile = useCallback((patch) => updateStudent((st) => { st.profile = { ...st.profile, ...patch }; }), [updateStudent]);

  const resetStudent = useCallback(() => updateStudent((st) => { const p = st.profile; Object.assign(st, blankStudent(p)); }), [updateStudent]);

  const addAssignment = useCallback((a) => {
    setState((s) => ({ ...s, assignments: [{ ...a, id: `a${Date.now()}` }, ...s.assignments] }));
    const token = state.session?.token;
    if (token && srv.online) api('/assignments', { method: 'POST', token, body: a }).catch(() => toast(t('Saved on this device — the server could not be reached.'), 'bad'));
  }, [state.session, srv.online, toast]);
  const removeAssignment = useCallback((id) => setState((s) => ({ ...s, assignments: s.assignments.filter((a) => a.id !== id) })), []);

  // ---------- Competition demo ----------
  const setDemoStage = useCallback((stage) => setState((s) => ({ ...s, students: { ...s.students, demo: demoStudent(stage) } })), []);

  const demoGo = useCallback((step) => {
    const def = DEMO_STEPS[step]; if (!def) return;
    setState((s) => {
      let students = s.students;
      const cur = s.students.demo;
      const hasDiag = cur && cur.diagnoses.length > 0;
      const isAfter = cur && cur.journey.length >= 7;
      if (def.stage === 'fresh' && hasDiag) students = { ...students, demo: demoStudent('fresh') };
      if (def.stage === 'before' && (!hasDiag || isAfter)) students = { ...students, demo: demoStudent('before') };
      if (def.stage === 'after' && !isAfter) students = { ...students, demo: demoStudent('after') };
      return { ...s, students, session: { role: 'student', id: 'demo', name: 'Demo Student', demo: true }, demo: { active: true, step } };
    });
    nav(def.route, { demoStep: step, focus: def.focus, concept: def.concept, mode: def.mode, view: def.view, reassess: def.reassess });
  }, [nav]);

  const exitDemo = useCallback(() => { setState((s) => ({ ...s, demo: { active: false, step: 0 } })); }, []);

  const enterDemoStudent = useCallback(() => {
    setState((s) => ({ ...s, session: { role: 'student', id: 'demo', name: 'Demo Student', demo: true } }));
    nav('dashboard');
  }, [nav]);

  const enterDemoTeacher = useCallback(() => {
    setState((s) => ({ ...s, session: { role: 'teacher', id: 'demo-teacher', name: 'Ms. Haddad', demo: true }, teachers: { ...s.teachers, 'demo-teacher': { profile: { name: 'Ms. Haddad', school: 'Demo School', classes: ['10A', '10B', '9C'] } } } }));
    nav('teacher');
  }, [nav]);

  // ---------- server sync of progress ----------
  const syncRef = useRef(null);
  useEffect(() => {
    if (!state.session?.token || !student || !srv.online) return;
    clearTimeout(syncRef.current);
    syncRef.current = setTimeout(() => { api('/progress', { method: 'PUT', token: state.session.token, body: { data: student } }).catch(() => {}); }, 1500);
  }, [student, state.session, srv.online]);

  const canSee = useCallback((r) => {
    if (PUBLIC_ROUTES.includes(r)) return true;
    if (STUDENT_ROUTES.includes(r)) return state.session?.role === 'student';
    if (TEACHER_ROUTES.includes(r)) return state.session?.role === 'teacher' || state.demo.active;
    return false;
  }, [state.session, state.demo.active]);

  const value = useMemo(() => ({
    state, route, params, nav, toast, toasts, celebrations, setCelebrations, srv,
    student, studentId, updateStudent, signIn, signOut, setPref, updateProfile, resetStudent,
    addAssignment, removeAssignment, demoGo, exitDemo, setDemoStage, enterDemoStudent, enterDemoTeacher, canSee,
    setParams,
  }), [state, route, params, nav, toast, toasts, celebrations, srv, student, studentId, updateStudent, signIn, signOut, setPref, updateProfile, resetStudent, addAssignment, removeAssignment, demoGo, exitDemo, setDemoStage, enterDemoStudent, enterDemoTeacher, canSee]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useStore = () => useContext(Ctx);
export { STUDENT_ROUTES, TEACHER_ROUTES };
