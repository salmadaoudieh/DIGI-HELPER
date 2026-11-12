// Thin API client. When the Digi Helper server is reachable, accounts, progress, AI tutoring
// and DigiScan go through it. Otherwise the app runs fully offline (browser-only demo).

import { t } from './i18n.js';

/* global __SINGLE__ */
const SINGLE = typeof __SINGLE__ !== 'undefined' && __SINGLE__;
export const server = { checked: false, online: false, ai: false, vision: false };

export async function checkServer() {
  if (SINGLE) { Object.assign(server, { checked: true, online: false, ai: false }); return server; }
  try {
    const ctrl = new AbortController(); const tm = setTimeout(() => ctrl.abort(), 1800);
    const res = await fetch('/api/health', { signal: ctrl.signal }); clearTimeout(tm);
    const j = await res.json();
    Object.assign(server, { checked: true, online: !!j.ok, ai: !!j.ai, vision: !!j.ai });
  } catch { Object.assign(server, { checked: true, online: false, ai: false }); }
  return server;
}

export class ApiError extends Error { constructor(msg, status) { super(msg); this.status = status; } }

export async function api(path, { method = 'GET', body, token, form, timeout = 30000 } = {}) {
  const headers = {};
  if (token) headers.Authorization = `Bearer ${token}`;
  if (body && !form) headers['Content-Type'] = 'application/json';
  const ctrl = new AbortController(); const tm = setTimeout(() => ctrl.abort(), timeout);
  let res;
  try {
    res = await fetch(`/api${path}`, { method, headers, body: form || (body ? JSON.stringify(body) : undefined), signal: ctrl.signal });
  } catch (e) {
    throw new ApiError(e.name === 'AbortError' ? t('The server took too long to respond.') : t('Could not reach the Digi Helper server.'), 0);
  } finally { clearTimeout(tm); }
  let data = null; try { data = await res.json(); } catch { /* empty */ }
  if (!res.ok) throw new ApiError(data?.error ? t(data.error) : t('Request failed ({status})', { status: res.status }), res.status);
  return data;
}

// ---------- browser-only accounts (used when no server is running) ----------
const KEY = 'dh.accounts.v1';
function readAccounts() { try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch { return {}; } }
function writeAccounts(a) { try { localStorage.setItem(KEY, JSON.stringify(a)); } catch { /* storage blocked */ } }
async function hash(text) {
  try {
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
    return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
  } catch { let h = 0; for (const c of text) h = (h * 31 + c.charCodeAt(0)) | 0; return `w${h}`; }
}

export function validateCredentials({ username, password }) {
  if (!/^[a-zA-Z0-9_.-]{3,24}$/.test(username || '')) return t('Usernames are 3–24 letters, numbers, dots, dashes or underscores.');
  if (!password || password.length < 8) return t('Use a password with at least 8 characters.');
  return null;
}

export async function signup(role, data) {
  const err = validateCredentials(data); if (err) throw new ApiError(err, 400);
  if (server.online) return api('/auth/signup', { method: 'POST', body: { role, ...data } });
  const accounts = readAccounts(); const key = `${role}:${data.username.toLowerCase()}`;
  if (accounts[key]) throw new ApiError(t('That username is taken. Try another one.'), 409);
  const salt = Math.random().toString(36).slice(2);
  const { password, ...profile } = data;
  accounts[key] = { salt, hash: await hash(salt + password), profile, role, id: `local-${role}-${data.username.toLowerCase()}` };
  writeAccounts(accounts);
  return { user: { id: accounts[key].id, role, ...profile }, token: null, offline: true };
}

export async function login(role, { username, password }) {
  if (!username || !password) throw new ApiError(t('Enter your username and password.'), 400);
  if (server.online) return api('/auth/login', { method: 'POST', body: { role, username, password } });
  const acc = readAccounts()[`${role}:${username.toLowerCase()}`];
  if (!acc || acc.hash !== (await hash(acc.salt + password))) throw new ApiError(t('That username and password do not match.'), 401);
  return { user: { id: acc.id, role, ...acc.profile }, token: null, offline: true };
}

/** Sanitize free text before display/storage: strip control chars, trim, cap length. */
export function clean(text, max = 500) {
  return String(text ?? '').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').replace(/[<>]/g, '').trim().slice(0, max);
}
