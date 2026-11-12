// Lightweight visual effects: confetti bursts and palette colour helpers. No dependencies.

const reduced = () => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

export function paletteColors() {
  const cs = getComputedStyle(document.documentElement);
  return ['--p1', '--p2', '--p3', '--p4', '--good', '--warn'].map((v) => cs.getPropertyValue(v).trim()).filter(Boolean);
}

let canvas = null; let ctx = null; let parts = []; let raf = 0;

function ensureCanvas() {
  if (canvas) return;
  canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  Object.assign(canvas.style, { position: 'fixed', inset: '0', width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: '95' });
  document.body.appendChild(canvas);
  ctx = canvas.getContext('2d');
  const resize = () => { const d = window.devicePixelRatio || 1; canvas.width = innerWidth * d; canvas.height = innerHeight * d; ctx.setTransform(d, 0, 0, d, 0, 0); };
  resize(); window.addEventListener('resize', resize);
}

function tick() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  parts = parts.filter((p) => p.life > 0);
  for (const p of parts) {
    p.vy += 0.16; p.vx *= 0.992; p.x += p.vx; p.y += p.vy; p.rot += p.vr; p.life -= 1;
    ctx.save(); ctx.globalAlpha = Math.min(1, p.life / 40); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.fillStyle = p.c;
    if (p.shape === 0) ctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2);
    else if (p.shape === 1) { ctx.beginPath(); ctx.arc(0, 0, p.s / 2.6, 0, Math.PI * 2); ctx.fill(); }
    else { ctx.beginPath(); ctx.moveTo(0, -p.s / 2); ctx.lineTo(p.s / 2, p.s / 2); ctx.lineTo(-p.s / 2, p.s / 2); ctx.closePath(); ctx.fill(); }
    ctx.restore();
  }
  if (parts.length) raf = requestAnimationFrame(tick); else { raf = 0; ctx.clearRect(0, 0, innerWidth, innerHeight); }
}

/** Fire confetti from a point (defaults to the centre-top of the screen) or from an element. */
export function confetti({ x, y, el, count = 90, spread = 1, power = 1 } = {}) {
  if (typeof window === 'undefined' || reduced()) return;
  ensureCanvas();
  if (el) { const r = el.getBoundingClientRect(); x = r.left + r.width / 2; y = r.top + r.height / 2; }
  x ??= innerWidth / 2; y ??= innerHeight * 0.35;
  const colors = paletteColors();
  for (let i = 0; i < count; i++) {
    const a = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.2 * spread;
    const v = (6 + Math.random() * 8) * power;
    parts.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, rot: Math.random() * 6, vr: (Math.random() - 0.5) * 0.4, s: 7 + Math.random() * 7, c: colors[i % colors.length], life: 110 + Math.random() * 60, shape: i % 3 });
  }
  if (!raf) raf = requestAnimationFrame(tick);
}

/** Two cannons from the bottom corners — for the big moments. */
export function celebrate() {
  if (reduced()) return;
  confetti({ x: 0, y: innerHeight, count: 80, spread: 0.5, power: 1.5 });
  confetti({ x: innerWidth, y: innerHeight, count: 80, spread: 0.5, power: 1.5 });
  setTimeout(() => confetti({ count: 70 }), 250);
}
