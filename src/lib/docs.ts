export const PAYLOAD = `{
  "system_version": "2.4.0-deterministic",
  "artifact_id": "art_fcc_15b_8829a",
  "target_standard": "FCC_PART_15_SUBPART_B_CLASS_B",
  "evaluation_mode": "NEURO_SYMBOLIC_RIGID",
  "results": [
    {
      "clause": "15.109(a)",
      "metric": "Radiated Emissions (30MHz - 1GHz)",
      "limit_unit": "dBuV/m",
      "limit_value": 40.0,
      "measured_peak": 38.2,
      "margin_db": -1.8,
      "verdict": "PASS",
      "provenance": {
        "source_doc": "chamber_run_revC_final.pdf",
        "page_index": 14,
        "coordinate_bbox": [120.4, 450.2, 380.1, 510.0]
      }
    }
  ]
}`;

export const SIDEBAR: [string, string[]][] = [
  ["SYSTEM ARCHITECTURE", ["overview", "ingestion-primitives", "deterministic-gates"]],
  ["COMPLIANCE COVERAGE", ["regulatory-standards", "verification-trace"]],
  ["ENTERPRISE SECURITY", ["tenant-isolation", "data-handling"]],
];

export type Token = { t: string; c: string; bg: string };

// Minimal JSON syntax highlighter, ported from the design's tokenizer.
function tokenize(line: string): Token[] {
  const out: Token[] = [];
  const re = /("(?:[^"\\]|\\.)*")(\s*:)?|(-?\d+(?:\.\d+)?)|([{}[\],])|(\s+)/g;
  const plain = (t: string): Token => ({ t, c: "#F4F2EC", bg: "transparent" });
  let m: RegExpExecArray | null;
  let last = 0;
  while ((m = re.exec(line))) {
    if (m.index > last) out.push(plain(line.slice(last, m.index)));
    last = re.lastIndex;
    if (m[1] && m[2]) {
      out.push({ t: m[1], c: "#F7DF8C", bg: "transparent" });
      out.push({ t: m[2], c: "#8F9BA7", bg: "transparent" });
    } else if (m[1]) {
      const pass = m[1] === '"PASS"';
      out.push({ t: m[1], c: pass ? "#151B23" : "#A7A6DA", bg: pass ? "#B2ECA1" : "transparent" });
    } else if (m[3]) out.push(plain(m[3]));
    else if (m[4]) out.push({ t: m[4], c: "#8F9BA7", bg: "transparent" });
    else out.push(plain(m[0]));
  }
  if (last < line.length) out.push(plain(line.slice(last)));
  return out;
}

export const JSON_LINES = PAYLOAD.split("\n").map((l, i) => ({ n: i + 1, toks: tokenize(l) }));
