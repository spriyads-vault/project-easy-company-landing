interface PdfBadgeProps {
  size: number;
  radius?: number;
  className?: string;
}

/**
 * Small red "PDF" file badge used in mockups. The 6px label is drawn as SVG text: it is decorative, and as
 * HTML text its white-on-red contrast (3.9:1) would fail AA checks.
 */
export default function PdfBadge({ size, radius = 4, className }: PdfBadgeProps) {
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true" className={`flex-none ${className ?? ""}`}>
      <rect width={size} height={size} rx={radius} className="fill-danger-strong" />
      <text
        x="50%"
        y="50%"
        dominantBaseline="central"
        textAnchor="middle"
        className="fill-white font-mono"
        style={{ fontSize: 6 }}
      >
        PDF
      </text>
    </svg>
  );
}
