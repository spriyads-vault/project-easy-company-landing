/**
 * The v6 "record block": a cube drawn from dashed hatch lines, lit from the upper left, with short dash streams
 * flowing into it from both sides. Ported from the design's draw() and seed() (Crado Homepage v6.dc.html, Hero art
 * section); constants are the design's. Pure canvas code, no React.
 */

export interface RecordBlockPalette {
  /** Hatch colour and opacity. */
  ink: string;
  alpha: number;
  /** Face fill (the band behind the art). */
  fill: string;
  /** Stream colour; streams are drawn only when set. */
  stream?: string;
}

/** Hero on the page: Ink dashes, ultramarine (primary) streams. */
export const HERO_PALETTE: RecordBlockPalette = { ink: "#141821", alpha: 0.85, fill: "#F8F7F6", stream: "#1430B8" };
/** Agents section on the forest band: on-dark dashes, no streams. */
export const AGENTS_PALETTE: RecordBlockPalette = { ink: "#F8F7F6", alpha: 0.85, fill: "#12302A" };

/** Small still block on the page (404): Ink dashes on the page colour, no streams. */
export const STILL_PALETTE: RecordBlockPalette = { ink: "#141821", alpha: 0.85, fill: "#F8F7F6" };

/** The design's still frame for the agents block, and for the hero when motion is off. */
export const AGENTS_TIME = 2600;
/** Design default for streamDensity (3 to 14 lanes per side). */
export const STREAM_DENSITY = 7;

interface Particle {
  side: -1 | 1;
  lane: number;
  speed: number;
  off: number;
  len: number;
}

/** Deterministic stream particles (mulberry32, seed 1337), so every render matches the design. */
export function seedParticles(density = STREAM_DENSITY): Particle[] {
  let a = 1337;
  const r = () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const n = Math.max(3, Math.min(14, density));
  const parts: Particle[] = [];
  for (const side of [-1, 1] as const) {
    for (let i = 0; i < n; i++) {
      const lane = i / (n - 1) - 0.5;
      for (let j = 0; j < 4; j++) parts.push({ side, lane: lane + (r() - 0.5) * 0.04, speed: 0.025 + r() * 0.035, off: r(), len: 5 + r() * 12 });
    }
  }
  return parts;
}

type Vec3 = [number, number, number];

/**
 * Draws one frame at time `t` (ms). Sizes the backing store to the element at the device pixel ratio.
 * Returns false when the canvas has no size yet.
 */
export function drawRecordBlock(cv: HTMLCanvasElement, t: number, pal: RecordBlockPalette, parts: Particle[]): boolean {
  const rc = cv.getBoundingClientRect();
  if (!rc.width || !rc.height) return false;
  const dpr = window.devicePixelRatio || 1;
  const W = Math.round(rc.width * dpr);
  const H = Math.round(rc.height * dpr);
  if (cv.width !== W || cv.height !== H) {
    cv.width = W;
    cv.height = H;
  }
  const ctx = cv.getContext("2d");
  if (!ctx) return false;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const streams = !!pal.stream;
  const w = rc.width;
  const h = rc.height;
  const cx = w / 2;
  const cy = h / 2;
  const s = Math.min(w, h) * (streams ? 0.27 : 0.3);
  ctx.clearRect(0, 0, w, h);

  if (pal.stream) {
    ctx.strokeStyle = pal.stream;
    ctx.lineWidth = 1.5;
    const L = cx - s * 0.9;
    const spread = Math.min(h * 0.42, s * 2.6);
    for (const p of parts) {
      const pos = (t * p.speed + p.off * L * 3) % L;
      const k = pos / L;
      const y0 = cy + p.lane * spread * 2;
      const y = y0 + (cy - y0) * k * k * 0.75;
      const x = p.side < 0 ? pos : w - pos;
      ctx.globalAlpha = Math.min(1, k * 5) * 0.9;
      ctx.beginPath();
      ctx.moveTo(x - p.len / 2, y);
      ctx.lineTo(x + p.len / 2, y);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }

  const ay = t * 0.00016 + 0.62;
  const ax = -0.48;
  const cyA = Math.cos(ay);
  const syA = Math.sin(ay);
  const cxA = Math.cos(ax);
  const sxA = Math.sin(ax);
  const rot = ([x, y, z]: Vec3): Vec3 => {
    const x1 = x * cyA - z * syA;
    const z1 = x * syA + z * cyA;
    return [x1, y * cxA - z1 * sxA, y * sxA + z1 * cxA];
  };
  const proj = (v: Vec3): Vec3 => {
    const [x, y, z] = rot(v);
    const k = 5 / (5 + z);
    return [cx + x * s * k, cy + y * s * k, z];
  };
  const light: Vec3 = [-0.35, -0.8, -0.5];
  const ln = Math.hypot(...light);
  const faces: { pts: Vec3[]; b: number; z: number }[] = [];
  for (let a3 = 0; a3 < 3; a3++) {
    for (const sg of [-1, 1]) {
      const n: Vec3 = [0, 0, 0];
      n[a3] = sg;
      const rn = rot(n);
      if (rn[2] >= 0) continue;
      const u = (a3 + 1) % 3;
      const v = (a3 + 2) % 3;
      const pts = [
        [-1, -1],
        [1, -1],
        [1, 1],
        [-1, 1],
      ].map(([a, b]) => {
        const p: Vec3 = [0, 0, 0];
        p[a3] = sg;
        p[u] = a;
        p[v] = b;
        return proj(p);
      });
      const b = Math.max(0, (rn[0] * light[0] + rn[1] * light[1] + rn[2] * light[2]) / ln);
      faces.push({ pts, b, z: pts.reduce((m, p) => m + p[2], 0) });
    }
  }
  faces.sort((a, b) => b.z - a.z);

  ctx.lineWidth = 1.2;
  for (const f of faces) {
    ctx.save();
    ctx.beginPath();
    f.pts.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])));
    ctx.closePath();
    ctx.globalAlpha = 1;
    ctx.fillStyle = pal.fill;
    ctx.fill();
    ctx.clip();
    ctx.strokeStyle = pal.ink;
    ctx.globalAlpha = pal.alpha;
    const xs = f.pts.map((p) => p[0]);
    const ys = f.pts.map((p) => p[1]);
    const x0 = Math.min(...xs) - 20;
    const x1 = Math.max(...xs) + 20;
    const sp = 3.2 + f.b * 3.6;
    const dash = 5 + f.b * 3;
    const gap = 1.5 + f.b * 7;
    ctx.setLineDash([dash, gap]);
    let i = 0;
    for (let y = Math.min(...ys); y <= Math.max(...ys); y += sp, i++) {
      ctx.lineDashOffset = (i * 7.3) % (dash + gap);
      ctx.beginPath();
      ctx.moveTo(x0, y);
      ctx.lineTo(x1, y);
      ctx.stroke();
    }
    ctx.restore();
  }
  ctx.setLineDash([]);
  ctx.globalAlpha = 1;
  return true;
}
