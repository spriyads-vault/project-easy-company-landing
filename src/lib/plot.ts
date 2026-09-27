// Deterministic data for the radiated-emissions sweep (FIG. 2).
// Ported verbatim from the design's buildPlot(): seeded PRNG, log-frequency axis.

const F0 = 30;
const F1 = 1000;
const Y0 = 10;
const Y1 = 60;

const fx = (f: number) => (Math.log(f / F0) / Math.log(F1 / F0)) * 100;
const fy = (db: number) => ((db - Y0) / (Y1 - Y0)) * 100;
const pct = (v: number) => v.toFixed(2) + "%";

const LIMITS: [number, number, number][] = [
  [30, 88, 40.0],
  [88, 216, 43.5],
  [216, 960, 46.0],
  [960, 1000, 54.0],
];
const limitAt = (f: number) => (LIMITS.find(([a, b]) => f >= a && f < b) ?? LIMITS[3])[2];

const PEAKS: [number, number, "H" | "V"][] = [
  [48.02, 31.4, "V"],
  [96.1, 34.9, "H"],
  [144.3, 38.2, "V"],
  [216.8, 47.0, "H"],
  [288.5, 40.7, "V"],
  [432.0, 44.1, "H"],
  [648.2, 36.0, "V"],
];

export type PlotPoint = { left: string; bottom: string; size: string; color: string };
export type Tick = { pos: string; label: string };
export type Row = {
  f: string;
  pol: string;
  level: string;
  limit: string;
  margin: string;
  clause: string;
  result: string;
  mColor: string;
  bg: string;
};

export function buildPlot() {
  let seed = 7;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;

  const points: PlotPoint[] = [];
  for (let i = 0; i < 150; i++) {
    const f = F0 * Math.exp(rnd() * Math.log(F1 / F0));
    let db = 14 + rnd() * 12 + (Math.log(f / F0) / Math.log(F1 / F0)) * 8;
    for (let k = 1; k <= 17; k++) {
      const hm = 54.2 * k;
      if (Math.abs(f - hm) / hm < 0.015) db += 8 + rnd() * 4;
    }
    db = Math.min(db, limitAt(f) - 4);
    points.push({ left: pct(fx(f)), bottom: pct(fy(db)), size: "4px", color: "#8F9BA7" });
  }
  PEAKS.forEach(([f, db]) => {
    if (f === 216.8) return;
    const m = limitAt(f) - db;
    points.push({
      left: pct(fx(f)),
      bottom: pct(fy(db)),
      size: "7px",
      color: m < 3 ? "#F7DF8C" : "#F4F2EC",
    });
  });

  const limitSegs = LIMITS.map(([a, b, l]) => ({
    left: pct(fx(a)),
    width: pct(fx(b) - fx(a)),
    bottom: pct(fy(l)),
  }));
  const limitRisers = LIMITS.slice(1).map(([a, , l], i) => {
    const prev = LIMITS[i][2];
    return { left: pct(fx(a)), bottom: pct(fy(prev)), height: pct(fy(l) - fy(prev)) };
  });
  const xTicks: Tick[] = [30, 50, 100, 200, 300, 500, 1000].map((f) => ({
    pos: pct(fx(f)),
    label: String(f),
  }));
  const yTicks: Tick[] = [10, 20, 30, 40, 50, 60].map((v) => ({
    pos: pct(fy(v)),
    label: String(v),
  }));
  const rows: Row[] = PEAKS.map(([f, db, pol]) => {
    const lim = limitAt(f);
    const m = lim - db;
    const fail = m < 0;
    const near = !fail && m < 3;
    return {
      f: f.toFixed(2),
      pol,
      level: db.toFixed(1),
      limit: lim.toFixed(1),
      margin: (m >= 0 ? "+" : "−") + Math.abs(m).toFixed(1) + " dB",
      clause: "15.109(a)",
      result: fail ? "FAIL" : near ? "MARGINAL" : "PASS",
      mColor: fail ? "#F1A4AB" : near ? "#F7DF8C" : "#B2ECA1",
      bg: fail ? "rgba(241,164,171,0.12)" : "transparent",
    };
  });

  return {
    points,
    limitSegs,
    limitRisers,
    xTicks,
    yTicks,
    rows,
    spike: { left: pct(fx(216.8)), bottom: pct(fy(47.0)) },
  };
}
