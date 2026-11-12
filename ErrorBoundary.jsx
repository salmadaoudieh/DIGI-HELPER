import { Component } from 'react';
import { t } from '../lib/i18n.js';

export default class ErrorBoundary extends Component {
  constructor(p) { super(p); this.state = { error: null }; }
  static getDerivedStateFromError(error) { return { error }; }
  componentDidCatch(error, info) { console.error('Digi Helper error:', error, info); }
  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div className="app-bg min-h-screen grid place-items-center gutter">
        <div className="glass p-8 max-w-md text-center grid gap-3">
          <div className="text-4xl" aria-hidden="true">🛠️</div>
          <h1 className="font-display text-xl font-semibold">{t('Something went wrong on this screen')}</h1>
          <p className="text-muted text-sm">{t('Your progress is saved. Reload to continue, or reset local data if the problem keeps happening.')}</p>
          <div className="flex gap-2 justify-center">
            <button className="btn btn-primary" onClick={() => { location.hash = 'home'; location.reload(); }}>{t('Reload')}</button>
            <button className="btn" onClick={() => { try { localStorage.removeItem('dh.state.v2'); } catch { /* ignore */ } location.hash = 'home'; location.reload(); }}>{t('Reset local data')}</button>
          </div>
        </div>
      </div>
    );
  }
}
