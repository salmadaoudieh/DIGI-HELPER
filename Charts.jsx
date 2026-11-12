import { useEffect, useState } from 'react';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement,
  Filler, Tooltip, Legend, RadialLinearScale,
} from 'chart.js';
import { Line, Bar, Doughnut, Radar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Filler, Tooltip, Legend, RadialLinearScale);

const reduce = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/** Read theme tokens so chart text/grid follow light & dark mode. */
export function useChartTheme() {
  const read = () => {
    const cs = getComputedStyle(document.documentElement);
    const v = (n) => cs.getPropertyValue(n).trim();
    return { fg: v('--fg'), muted: v('--muted'), line: v('--line'), accent: v('--accent'), cyan: v('--cyan'), violet: v('--violet'), good: v('--good'), warn: v('--warn'), bad: v('--bad'), faint: v('--faint'), surface: v('--surface-solid') };
  };
  const [t, setT] = useState(read);
  useEffect(() => {
    const update = () => setT(read());
    const mo = new MutationObserver(update);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    const mq = window.matchMedia('(prefers-color-scheme: dark)'); mq.addEventListener?.('change', update);
    return () => { mo.disconnect(); mq.removeEventListener?.('change', update); };
  }, []);
  return t;
}

function alpha(hex, a) {
  if (!hex || !hex.startsWith('#')) return hex;
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
}

function base(t, { y100 = true, legend = false, stacked = false } = {}) {
  return {
    responsive: true, maintainAspectRatio: false,
    animation: reduce ? false : { duration: 1100, easing: 'easeOutQuart' },
    plugins: {
      legend: { display: legend, labels: { color: t.muted, boxWidth: 12, boxHeight: 12, usePointStyle: true, font: { family: 'Manrope', weight: 600 } } },
      tooltip: { backgroundColor: t.surface, titleColor: t.fg, bodyColor: t.fg, borderColor: t.line, borderWidth: 1, padding: 10, cornerRadius: 10, titleFont: { family: 'Manrope', weight: 700 }, bodyFont: { family: 'JetBrains Mono' } },
    },
    scales: {
      x: { stacked, grid: { display: false }, ticks: { color: t.muted, font: { family: 'Manrope', size: 11 } }, border: { color: t.line } },
      y: { stacked, ...(y100 ? { min: 0, max: 100 } : { beginAtZero: true }), grid: { color: t.line }, ticks: { color: t.muted, font: { family: 'JetBrains Mono', size: 10 }, ...(y100 ? { callback: (v) => `${v}%`, stepSize: 25 } : {}) }, border: { display: false } },
    },
  };
}

export function LineChart({ labels, series, height = 240, y100 = true, legend }) {
  const t = useChartTheme();
  const data = {
    labels,
    datasets: series.map((s, i) => {
      const col = t[s.color] || s.color || t.accent;
      return {
        label: s.label, data: s.data, borderColor: col, borderWidth: 2.5, tension: 0.35, fill: i === 0 && s.fill !== false,
        backgroundColor: (ctx) => {
          const { chart } = ctx; const { ctx: c, chartArea } = chart; if (!chartArea) return alpha(col, 0.15);
          const g = c.createLinearGradient(0, chartArea.top, 0, chartArea.bottom); g.addColorStop(0, alpha(col, 0.32)); g.addColorStop(1, alpha(col, 0)); return g;
        },
        pointRadius: s.data.map((_, j) => (j === s.data.length - 1 ? 5 : 2.5)), pointBackgroundColor: col, pointBorderColor: t.surface, pointBorderWidth: 2,
        borderDash: s.dash ? [6, 5] : undefined,
      };
    }),
  };
  return <div style={{ height }}><Line data={data} options={base(t, { y100, legend: legend ?? series.length > 1 })} /></div>;
}

export function BarChart({ labels, series, height = 240, horizontal, y100 = true, colors, legend }) {
  const t = useChartTheme();
  const data = {
    labels,
    datasets: series.map((s) => {
      const col = t[s.color] || s.color || t.accent;
      return { label: s.label, data: s.data, backgroundColor: colors ? colors.map((c) => alpha(t[c] || c, 0.85)) : alpha(col, 0.85), borderRadius: 6, borderSkipped: false, maxBarThickness: 34 };
    }),
  };
  const opts = base(t, { y100, legend: legend ?? series.length > 1 });
  if (horizontal) { opts.indexAxis = 'y'; const { x, y } = opts.scales; opts.scales = { x: { ...y, grid: { color: t.line } }, y: { ...x } }; }
  return <div style={{ height }}><Bar data={data} options={opts} /></div>;
}

export function DoughnutChart({ labels, data, colors, height = 220 }) {
  const t = useChartTheme();
  const d = { labels, datasets: [{ data, backgroundColor: colors.map((c) => t[c] || c), borderColor: t.surface, borderWidth: 3, hoverOffset: 6 }] };
  const opts = { responsive: true, maintainAspectRatio: false, cutout: '64%', animation: reduce ? false : { duration: 900 }, plugins: { legend: { position: 'bottom', labels: { color: t.muted, usePointStyle: true, boxWidth: 10, font: { family: 'Manrope', weight: 600, size: 11 } } }, tooltip: base(t).plugins.tooltip } };
  return <div style={{ height }}><Doughnut data={d} options={opts} /></div>;
}

export function RadarChart({ labels, series, height = 280 }) {
  const t = useChartTheme();
  const d = { labels, datasets: series.map((s) => { const col = t[s.color] || s.color; return { label: s.label, data: s.data, borderColor: col, backgroundColor: alpha(col, 0.18), pointBackgroundColor: col, borderWidth: 2 }; }) };
  const opts = {
    responsive: true, maintainAspectRatio: false, animation: reduce ? false : { duration: 900 },
    plugins: { legend: { labels: { color: t.muted, usePointStyle: true, font: { family: 'Manrope', weight: 600 } } }, tooltip: base(t).plugins.tooltip },
    scales: { r: { min: 0, max: 100, angleLines: { color: t.line }, grid: { color: t.line }, pointLabels: { color: t.muted, font: { family: 'Manrope', size: 11, weight: 600 } }, ticks: { display: false, stepSize: 25 } } },
  };
  return <div style={{ height }}><Radar data={d} options={opts} /></div>;
}

export function Sparkline({ data, color = 'cyan', height = 44 }) {
  const t = useChartTheme(); const col = t[color] || color;
  const d = { labels: data.map((_, i) => i), datasets: [{ data, borderColor: col, borderWidth: 2, tension: 0.4, fill: true, backgroundColor: alpha(col, 0.15), pointRadius: data.map((_, i) => (i === data.length - 1 ? 3 : 0)), pointBackgroundColor: col }] };
  const opts = { responsive: true, maintainAspectRatio: false, animation: reduce ? false : { duration: 700 }, plugins: { legend: { display: false }, tooltip: { enabled: false } }, scales: { x: { display: false }, y: { display: false, min: 0, max: 100 } } };
  return <div style={{ height }}><Line data={d} options={opts} /></div>;
}
