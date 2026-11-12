import { useEffect } from 'react';
import { useStore } from './lib/store.jsx';
import { t } from './lib/i18n.js';
import Shell, { Toasts, Celebration } from './components/Shell.jsx';
import { Aurora, PointerEffects } from './components/Fx.jsx';
import Landing from './pages/Landing.jsx';
import Auth from './pages/Auth.jsx';
import Demo from './pages/Demo.jsx';
import StudentDashboard from './pages/StudentDashboard.jsx';
import DigiWorld from './pages/DigiWorld.jsx';
import DigiMind from './pages/DigiMind.jsx';
import Diagnostic from './pages/Diagnostic.jsx';
import DetectivePage from './pages/Detective.jsx';
import PathPage from './pages/Path.jsx';
import Learn from './pages/Learn.jsx';
import Challenge from './pages/Challenge.jsx';
import DigiScan from './pages/DigiScan.jsx';
import Journey from './pages/Journey.jsx';
import { Analytics, Achievements, Profile } from './pages/StudentExtras.jsx';
import { TeacherOverview, ClassroomPulse, LessonCreator } from './pages/Teacher.jsx';

const PAGES = {
  dashboard: StudentDashboard, world: DigiWorld, mind: DigiMind, diagnostic: Diagnostic, detective: DetectivePage,
  path: PathPage, learn: Learn, challenge: Challenge, scan: DigiScan, journey: Journey, analytics: Analytics,
  achievements: Achievements, me: Profile, teacher: TeacherOverview, pulse: ClassroomPulse, creator: LessonCreator,
};
const TITLES = { home: 'Digi Helper', login: 'Sign in', demo: 'Competition Demo', dashboard: 'Dashboard', world: 'DigiWorld', mind: 'DigiMind', diagnostic: 'Diagnostic', detective: 'Mistake Detective', path: 'My Path', learn: 'Learn', challenge: 'Daily Challenge', scan: 'DigiScan', journey: 'Journey', analytics: 'Analytics', achievements: 'Achievements', me: 'Profile', teacher: 'Class Overview', pulse: 'Classroom Pulse', creator: 'Lesson Creator' };

export default function App() {
  const { route, canSee, state, nav } = useStore();
  const allowed = canSee(route);
  useEffect(() => { document.title = route === 'home' ? t('Digi Helper') : t('{title} · Digi Helper', { title: t(TITLES[route] || 'Digi Helper') }); }, [route, state.lang]);
  useEffect(() => {
    if (!allowed && PAGES[route]) nav(state.session ? (state.session.role === 'teacher' ? 'teacher' : 'dashboard') : 'login');
  }, [allowed, route]); // eslint-disable-line react-hooks/exhaustive-deps

  const fx = <><Aurora /><PointerEffects /></>;
  if (route === 'login') return <>{fx}<div className="stack"><Auth /></div><Toasts /></>;
  if (route === 'demo') return <>{fx}<div className="stack"><Demo /></div><Toasts /></>;
  const Page = PAGES[route];
  if (!Page || !allowed) return <>{fx}<div className="stack"><Landing /></div><Toasts /><Celebration /></>;
  return <Shell><Page key={route} /></Shell>;
}
