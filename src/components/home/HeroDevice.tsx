import type { CSSProperties } from "react";
import { CheckIcon } from "@/components/site/icons";
import BrandMark from "./BrandMark";

// Connector lines draw in turn once the board has assembled (ms from page load).
const L = ["2400ms", "2700ms", "3000ms", "3600ms"];

const BOARD_LABEL =
  "Gateway board Rev C line drawing. The clock routing between Y1 and U1 is marked as changed. The Rev B test report links to Y1, the emissions requirement to the USB connector J1, a lab email from Northfield Test Lab to test point TP3, and the Rev C clock-routing review, ready for review, to U1.";

type Card = {
  title: string;
  sub?: string;
  icon: "report" | "requirement" | "mail" | "review";
  pending: string;
  done: string;
  delay: number;
  /** Position when the cards float beside the board (1100px and up). */
  pos: CSSProperties;
  rise?: string;
};

const CARDS: Card[] = [
  { title: "Rev B test report", icon: "report", pending: "Linking…", done: "Linked", delay: 2850, pos: { left: 0, top: "24%" } },
  {
    title: "Emissions requirement",
    sub: "EN 55032 · Class B",
    icon: "requirement",
    pending: "Linking…",
    done: "Linked",
    delay: 3150,
    pos: { left: 0, top: "74%" },
  },
  { title: "Lab email", sub: "Northfield Test Lab", icon: "mail", pending: "Linking…", done: "Linked", delay: 3450, pos: { right: 0, top: "20%" } },
  {
    title: "Rev C clock-routing review",
    icon: "review",
    pending: "Preparing…",
    done: "Ready for review",
    delay: 4000,
    pos: { right: 0, top: "58%" },
    rise: "14px",
  },
];

function CardIcon({ icon }: { icon: Card["icon"] }) {
  if (icon === "report") return <BrandMark kind="pdf" />;
  if (icon === "mail") return <BrandMark kind="gmail" />;
  return (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 18 18" fill="none" stroke="#2A3441" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="block flex-none">
      {icon === "requirement" ? (
        <>
          <path d="M7 4.5h8M7 9h8M7 13.5h8" />
          <path d="m2.5 4.5 1 1 1.8-2M2.5 9l1 1 1.8-2M2.5 13.5l1 1 1.8-2" />
        </>
      ) : (
        <>
          <circle cx="5" cy="4" r="1.6" />
          <circle cx="5" cy="14" r="1.6" />
          <circle cx="13" cy="6.5" r="1.6" />
          <path d="M5 5.6v6.8M13 8.1c0 3-2.4 3.5-8 4" />
        </>
      )}
    </svg>
  );
}

function GlassCard({ card }: { card: Card }) {
  const vars = { "--d": `${card.delay}ms`, "--y": card.rise ?? "6px" } as CSSProperties;
  return (
    <div
      style={vars}
      className="hx-card box-border border border-[rgba(24,24,27,0.08)] bg-[rgba(255,255,255,0.7)] p-4 text-left shadow-[0_16px_40px_rgba(24,24,27,0.10)] backdrop-blur-[20px]"
    >
      <span className="flex items-start gap-2">
        <span className="mt-0.5">
          <CardIcon icon={card.icon} />
        </span>
        <span className="text-sm leading-[1.4] tracking-[-0.01em] whitespace-nowrap text-fg">
          {card.title}
          {card.sub && <span className="block text-[13px] text-fg-muted">{card.sub}</span>}
          <span className="mt-2 grid h-[22px] w-max items-center border border-[rgba(24,24,27,0.08)] bg-[rgba(255,255,255,0.7)] px-2 text-[11px] leading-[1.4]">
            <span className="hx-pending col-start-1 row-start-1 text-fg-muted" aria-hidden="true">
              {card.pending}
            </span>
            <span className="hx-done col-start-1 row-start-1 inline-flex items-center gap-1 text-fg">
              <CheckIcon size={9} strokeWidth={2} />
              {card.done}
            </span>
          </span>
        </span>
      </span>
    </div>
  );
}

/** The hero illustration: a gateway board assembling, its changed clock trace, and the evidence linked to it. */
export default function HeroDevice() {
  return (
    <div className="hero-rise relative mx-auto mt-16 w-full max-w-[1200px]">
      <div role="img" aria-label={BOARD_LABEL} className="hx-stage relative w-full">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-1/2 h-[900px] w-[1200px] max-w-[140%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(closest-side,rgba(205,221,242,0.35),rgba(205,221,242,0)_100%),radial-gradient(40%_40%_at_82%_40%,rgba(191,163,230,0.14),rgba(191,163,230,0))]"
        />
        <div data-par="0.015" className="absolute inset-0 overflow-hidden min-[760px]:overflow-visible">
          <svg aria-hidden="true" viewBox="0 0 1200 680" className="hx-board absolute block overflow-visible">
      <g fill="none" stroke="#18181B" strokeOpacity="0.75" strokeWidth="1" strokeLinejoin="round" strokeLinecap="round">
      <g className="hx-base">
      <path d="M215.5 479.2L686.6 647.8L686.6 673.8L215.5 505.2Z" fill="#FAFAF9" />
      <path d="M686.6 647.8L984.5 541.2L984.5 567.2L686.6 673.8Z" fill="#FAFAF9" />
      <path d="M513.4 372.6L984.5 541.2L686.6 647.8L215.5 479.2Z" fill="#FAFAF9" />
      <path d="M513.4 382.5L956.8 541.2L686.6 637.9L243.2 479.2Z" fill="none" strokeOpacity="0.5" />
      <ellipse cx="513.4" cy="394.9" rx="7" ry="4.2" fill="#FAFAF9" />
      <ellipse cx="513.4" cy="394.9" rx="2.6" ry="1.6" fill="none" />
      <ellipse cx="922.2" cy="541.2" rx="7" ry="4.2" fill="#FAFAF9" />
      <ellipse cx="922.2" cy="541.2" rx="2.6" ry="1.6" fill="none" />
      <ellipse cx="277.8" cy="479.2" rx="7" ry="4.2" fill="#FAFAF9" />
      <ellipse cx="277.8" cy="479.2" rx="2.6" ry="1.6" fill="none" />
      <ellipse cx="686.6" cy="625.5" rx="7" ry="4.2" fill="#FAFAF9" />
      <ellipse cx="686.6" cy="625.5" rx="2.6" ry="1.6" fill="none" />
      <path d="M423.3 560.6L451.0 570.5L451.0 578.5L423.3 568.6Z" fill="none" strokeWidth="1.2" />
      </g>
      <g stroke="#A1A1AA" strokeDasharray="3 3" strokeOpacity="1" className="hx-asm">
      <path d="M513.4 16.9L513.4 394.9" />
      <path d="M922.2 163.2L922.2 541.2" />
      <path d="M277.8 101.2L277.8 479.2" />
      <path d="M686.6 247.5L686.6 625.5" />
      </g>
      <g>
      <path d="M236.3 359.2L686.6 520.4L686.6 523.4L236.3 362.2Z" fill="#FFFFFF" style={{ filter: "drop-shadow(0 18px 24px rgba(205,221,242,0.9))" }} />
      <path d="M686.6 520.4L963.7 421.2L963.7 424.2L686.6 523.4Z" fill="#FFFFFF" style={{ filter: "drop-shadow(0 18px 24px rgba(205,221,242,0.9))" }} />
      <path d="M513.4 260.0L963.7 421.2L686.6 520.4L236.3 359.2Z" fill="#FFFFFF" style={{ filter: "drop-shadow(0 18px 24px rgba(205,221,242,0.9))" }} />
      <ellipse cx="513.4" cy="274.9" rx="5.5" ry="3.3" fill="none" />
      <ellipse cx="922.2" cy="421.2" rx="5.5" ry="3.3" fill="none" />
      <ellipse cx="277.8" cy="359.2" rx="5.5" ry="3.3" fill="none" />
      <ellipse cx="686.6" cy="505.5" rx="5.5" ry="3.3" fill="none" />
      <path d="M608.7 362.3L695.3 393.3L608.7 424.3L522.1 393.3Z" fill="none" />
      <path d="M608.7 377.2L653.7 393.3L608.7 409.4L563.6 393.3Z" fill="none" strokeOpacity="0.5" />
      <path d="M594.8 362.3L601.7 364.8" strokeOpacity="0.6" />
      <path d="M688.3 395.8L695.3 398.3" strokeOpacity="0.6" />
      <path d="M622.5 362.3L615.6 364.8" strokeOpacity="0.6" />
      <path d="M529.0 395.8L522.1 398.3" strokeOpacity="0.6" />
      <path d="M585.3 365.7L592.2 368.2" strokeOpacity="0.6" />
      <path d="M678.8 399.2L685.7 401.7" strokeOpacity="0.6" />
      <path d="M632.0 365.7L625.1 368.2" strokeOpacity="0.6" />
      <path d="M538.5 399.2L531.6 401.7" strokeOpacity="0.6" />
      <path d="M575.8 369.1L582.7 371.6" strokeOpacity="0.6" />
      <path d="M669.3 402.6L676.2 405.1" strokeOpacity="0.6" />
      <path d="M641.6 369.1L634.6 371.6" strokeOpacity="0.6" />
      <path d="M548.0 402.6L541.1 405.1" strokeOpacity="0.6" />
      <path d="M566.2 372.5L573.2 375.0" strokeOpacity="0.6" />
      <path d="M659.8 406.0L666.7 408.5" strokeOpacity="0.6" />
      <path d="M651.1 372.5L644.2 375.0" strokeOpacity="0.6" />
      <path d="M557.6 406.0L550.6 408.5" strokeOpacity="0.6" />
      <path d="M556.7 375.9L563.6 378.4" strokeOpacity="0.6" />
      <path d="M650.2 409.4L657.2 411.9" strokeOpacity="0.6" />
      <path d="M660.6 375.9L653.7 378.4" strokeOpacity="0.6" />
      <path d="M567.1 409.4L560.2 411.9" strokeOpacity="0.6" />
      <path d="M547.2 379.4L554.1 381.8" strokeOpacity="0.6" />
      <path d="M640.7 412.8L647.6 415.3" strokeOpacity="0.6" />
      <path d="M670.1 379.4L663.2 381.8" strokeOpacity="0.6" />
      <path d="M576.6 412.8L569.7 415.3" strokeOpacity="0.6" />
      <path d="M537.6 382.8L544.6 385.2" strokeOpacity="0.6" />
      <path d="M631.2 416.2L638.1 418.7" strokeOpacity="0.6" />
      <path d="M679.7 382.8L672.7 385.2" strokeOpacity="0.6" />
      <path d="M586.1 416.2L579.2 418.7" strokeOpacity="0.6" />
      <path d="M528.1 386.2L535.0 388.6" strokeOpacity="0.6" />
      <path d="M621.6 419.6L628.6 422.1" strokeOpacity="0.6" />
      <path d="M689.2 386.2L682.3 388.6" strokeOpacity="0.6" />
      <path d="M595.7 419.6L588.7 422.1" strokeOpacity="0.6" />
      <path d="M518.6 389.6L525.5 392.1" strokeOpacity="0.6" />
      <path d="M612.1 423.1L619.1 425.5" strokeOpacity="0.6" />
      <path d="M698.7 389.6L691.8 392.1" strokeOpacity="0.6" />
      <path d="M605.2 423.1L598.3 425.5" strokeOpacity="0.6" />
      <path d="M558.4 348.0L579.2 355.5L551.5 365.4L530.7 358.0Z" fill="none" />
      <path d="M561.9 351.8L568.8 354.2L561.9 356.7L555.0 354.2Z" fill="#18181B" fillOpacity="0.55" stroke="none" />
      <path d="M548.0 356.7L555.0 359.2L548.0 361.7L541.1 359.2Z" fill="#18181B" fillOpacity="0.55" stroke="none" />
      <path d="M537.6 340.6L548.0 344.3L541.1 346.8L530.7 343.1Z" fill="none" />
      <path d="M513.4 349.3L523.8 353.0L516.9 355.5L506.5 351.8Z" fill="none" />
      <ellipse cx="523.8" cy="338.1" rx="3" ry="1.8" fill="none" stroke="#18181B" strokeOpacity="0.6" />
      <ellipse cx="499.5" cy="346.8" rx="3" ry="1.8" fill="none" stroke="#18181B" strokeOpacity="0.6" />
      <path d="M645.0 361.7L652.0 364.2L641.6 367.9L634.6 365.4Z" fill="none" />
      <path d="M693.5 379.0L700.5 381.5L690.1 385.2L683.1 382.8Z" fill="none" />
      <ellipse cx="655.4" cy="360.4" rx="3" ry="1.8" fill="none" stroke="#18181B" strokeOpacity="0.6" />
      <ellipse cx="703.9" cy="377.8" rx="3" ry="1.8" fill="none" stroke="#18181B" strokeOpacity="0.6" />
      <path d="M690.1 402.6L700.5 406.3L693.5 408.8L683.1 405.1Z" fill="none" />
      <path d="M665.8 411.3L676.2 415.0L669.3 417.5L658.9 413.8Z" fill="none" />
      <ellipse cx="707.4" cy="411.3" rx="3" ry="1.8" fill="none" stroke="#18181B" strokeOpacity="0.6" />
      <ellipse cx="683.1" cy="420.0" rx="3" ry="1.8" fill="none" stroke="#18181B" strokeOpacity="0.6" />
      <path d="M395.6 376.6L430.3 389.0L404.3 398.3L369.6 385.9Z" fill="none" />
      <path d="M416.4 391.4L423.3 393.9L416.4 396.4L409.5 393.9Z" fill="#18181B" fillOpacity="0.55" stroke="none" />
      <path d="M381.8 379.0L388.7 381.5L381.8 384.0L374.8 381.5Z" fill="#18181B" fillOpacity="0.55" stroke="none" />
      <path d="M402.6 396.4L409.5 398.9L399.1 402.6L392.2 400.1Z" fill="none" />
      <path d="M367.9 384.0L374.8 386.5L364.4 390.2L357.5 387.7Z" fill="none" />
      <ellipse cx="388.7" cy="403.8" rx="3" ry="1.8" fill="none" stroke="#18181B" strokeOpacity="0.6" />
      <ellipse cx="354.1" cy="391.4" rx="3" ry="1.8" fill="none" stroke="#18181B" strokeOpacity="0.6" />
      <path d="M458.0 421.2L485.7 431.1L461.4 439.8L433.7 429.9Z" fill="none" strokeWidth="1.2" />
      <path d="M454.5 423.1L459.7 424.9L454.5 426.8L449.3 424.9Z" fill="#18181B" fillOpacity="0.55" stroke="none" />
      <path d="M461.4 425.5L466.6 427.4L461.4 429.3L456.2 427.4Z" fill="#18181B" fillOpacity="0.55" stroke="none" />
      <path d="M468.4 428.0L473.6 429.9L468.4 431.7L463.2 429.9Z" fill="#18181B" fillOpacity="0.55" stroke="none" />
      <path d="M475.3 430.5L480.5 432.4L475.3 434.2L470.1 432.4Z" fill="#18181B" fillOpacity="0.55" stroke="none" />
      <ellipse cx="489.2" cy="437.3" rx="3" ry="1.8" fill="none" stroke="#18181B" strokeOpacity="0.6" />
      <path d="M856.3 432.4L880.6 441.0L742.0 490.6L717.8 482.0Z" fill="none" />
      <path d="M856.3 435.3L861.9 437.3L856.3 439.3L850.8 437.3Z" fill="#18181B" fillOpacity="0.55" stroke="none" />
      <path d="M866.7 439.1L872.3 441.0L866.7 443.0L861.2 441.0Z" fill="#18181B" fillOpacity="0.55" stroke="none" />
      <path d="M839.0 441.5L844.6 443.5L839.0 445.5L833.5 443.5Z" fill="#18181B" fillOpacity="0.55" stroke="none" />
      <path d="M849.4 445.3L855.0 447.2L849.4 449.2L843.9 447.2Z" fill="#18181B" fillOpacity="0.55" stroke="none" />
      <path d="M821.7 447.7L827.2 449.7L821.7 451.7L816.2 449.7Z" fill="#18181B" fillOpacity="0.55" stroke="none" />
      <path d="M832.1 451.5L837.6 453.4L832.1 455.4L826.5 453.4Z" fill="#18181B" fillOpacity="0.55" stroke="none" />
      <path d="M804.4 453.9L809.9 455.9L804.4 457.9L798.8 455.9Z" fill="#18181B" fillOpacity="0.55" stroke="none" />
      <path d="M814.8 457.7L820.3 459.6L814.8 461.6L809.2 459.6Z" fill="#18181B" fillOpacity="0.55" stroke="none" />
      <path d="M787.1 460.1L792.6 462.1L787.1 464.1L781.5 462.1Z" fill="#18181B" fillOpacity="0.55" stroke="none" />
      <path d="M797.4 463.9L803.0 465.8L797.4 467.8L791.9 465.8Z" fill="#18181B" fillOpacity="0.55" stroke="none" />
      <path d="M769.7 466.3L775.3 468.3L769.7 470.3L764.2 468.3Z" fill="#18181B" fillOpacity="0.55" stroke="none" />
      <path d="M780.1 470.1L785.7 472.0L780.1 474.0L774.6 472.0Z" fill="#18181B" fillOpacity="0.55" stroke="none" />
      <path d="M752.4 472.5L758.0 474.5L752.4 476.5L746.9 474.5Z" fill="#18181B" fillOpacity="0.55" stroke="none" />
      <path d="M762.8 476.3L768.4 478.2L762.8 480.2L757.3 478.2Z" fill="#18181B" fillOpacity="0.55" stroke="none" />
      <path d="M735.1 478.7L740.6 480.7L735.1 482.7L729.6 480.7Z" fill="#18181B" fillOpacity="0.55" stroke="none" />
      <path d="M745.5 482.5L751.0 484.4L745.5 486.4L739.9 484.4Z" fill="#18181B" fillOpacity="0.55" stroke="none" />
      <text x="617.3" y="361.7" fontFamily="var(--font-space-grotesk), system-ui, sans-serif" fontSize="9" fill="#71717A" stroke="none">
      U1
      </text>
      <text x="558.4" y="345.6" fontFamily="var(--font-space-grotesk), system-ui, sans-serif" fontSize="9" fill="#71717A" stroke="none">
      Y1
      </text>
      <text x="534.2" y="336.9" fontFamily="var(--font-space-grotesk), system-ui, sans-serif" fontSize="9" fill="#71717A" stroke="none">
      C1
      </text>
      <text x="489.2" y="353.0" fontFamily="var(--font-space-grotesk), system-ui, sans-serif" fontSize="9" fill="#71717A" stroke="none">
      C2
      </text>
      <text x="641.6" y="358.0" fontFamily="var(--font-space-grotesk), system-ui, sans-serif" fontSize="9" fill="#71717A" stroke="none">
      C3
      </text>
      <text x="690.1" y="375.3" fontFamily="var(--font-space-grotesk), system-ui, sans-serif" fontSize="9" fill="#71717A" stroke="none">
      C4
      </text>
      <text x="707.4" y="406.3" fontFamily="var(--font-space-grotesk), system-ui, sans-serif" fontSize="9" fill="#71717A" stroke="none">
      C5
      </text>
      <text x="665.8" y="421.2" fontFamily="var(--font-space-grotesk), system-ui, sans-serif" fontSize="9" fill="#71717A" stroke="none">
      C6
      </text>
      <text x="395.6" y="374.1" fontFamily="var(--font-space-grotesk), system-ui, sans-serif" fontSize="9" fill="#71717A" stroke="none">
      U2
      </text>
      <text x="399.1" y="405.1" fontFamily="var(--font-space-grotesk), system-ui, sans-serif" fontSize="9" fill="#71717A" stroke="none">
      C7
      </text>
      <text x="340.2" y="384.0" fontFamily="var(--font-space-grotesk), system-ui, sans-serif" fontSize="9" fill="#71717A" stroke="none">
      C8
      </text>
      <text x="468.4" y="439.8" fontFamily="var(--font-space-grotesk), system-ui, sans-serif" fontSize="9" fill="#71717A" stroke="none">
      J1
      </text>
      <text x="859.8" y="428.6" fontFamily="var(--font-space-grotesk), system-ui, sans-serif" fontSize="9" fill="#71717A" stroke="none">
      J2
      </text>
      <path d="M542.8 344.9L558.4 350.5L558.4 353.0L561.9 354.2" pathLength="1" strokeDasharray="1" fill="none" stroke="rgba(24,24,27,0.55)" strokeWidth="1" className="hx-trace" />
      <path d="M535.9 342.5L523.8 338.1" pathLength="1" strokeDasharray="1" fill="none" stroke="rgba(24,24,27,0.55)" strokeWidth="1" className="hx-trace" />
      <path d="M518.6 353.6L530.7 358.0L544.6 358.0L548.0 359.2" pathLength="1" strokeDasharray="1" fill="none" stroke="rgba(24,24,27,0.55)" strokeWidth="1" className="hx-trace" />
      <path d="M511.7 351.1L499.5 346.8" pathLength="1" strokeDasharray="1" fill="none" stroke="rgba(24,24,27,0.55)" strokeWidth="1" className="hx-trace" />
      <path d="M629.4 369.7L638.1 366.6" pathLength="1" strokeDasharray="1" fill="none" stroke="rgba(24,24,27,0.55)" strokeWidth="1" className="hx-trace" />
      <path d="M648.5 362.9L655.4 360.4" pathLength="1" strokeDasharray="1" fill="none" stroke="rgba(24,24,27,0.55)" strokeWidth="1" className="hx-trace" />
      <path d="M677.9 387.1L686.6 384.0" pathLength="1" strokeDasharray="1" fill="none" stroke="rgba(24,24,27,0.55)" strokeWidth="1" className="hx-trace" />
      <path d="M697.0 380.3L703.9 377.8" pathLength="1" strokeDasharray="1" fill="none" stroke="rgba(24,24,27,0.55)" strokeWidth="1" className="hx-trace" />
      <path d="M676.2 400.1L686.6 403.8" pathLength="1" strokeDasharray="1" fill="none" stroke="rgba(24,24,27,0.55)" strokeWidth="1" className="hx-trace" />
      <path d="M697.0 407.6L707.4 411.3" pathLength="1" strokeDasharray="1" fill="none" stroke="rgba(24,24,27,0.55)" strokeWidth="1" className="hx-trace" />
      <path d="M652.0 408.8L662.4 412.5" pathLength="1" strokeDasharray="1" fill="none" stroke="rgba(24,24,27,0.55)" strokeWidth="1" className="hx-trace" />
      <path d="M672.7 416.2L683.1 420.0" pathLength="1" strokeDasharray="1" fill="none" stroke="rgba(24,24,27,0.55)" strokeWidth="1" className="hx-trace" />
      <path d="M454.5 424.9L464.9 421.2L464.9 411.3L416.4 393.9" pathLength="1" strokeDasharray="1" fill="none" stroke="rgba(24,24,27,0.55)" strokeWidth="1.8" className="hx-trace" />
      <path d="M381.8 381.5L367.9 376.6L367.9 366.6L399.1 355.5L447.6 355.5L530.7 385.2" pathLength="1" strokeDasharray="1" fill="none" stroke="rgba(24,24,27,0.55)" strokeWidth="1.8" className="hx-trace" />
      <path d="M412.9 395.2L406.0 397.6" pathLength="1" strokeDasharray="1" fill="none" stroke="rgba(24,24,27,0.55)" strokeWidth="1" className="hx-trace" />
      <path d="M395.6 401.4L388.7 403.8" pathLength="1" strokeDasharray="1" fill="none" stroke="rgba(24,24,27,0.55)" strokeWidth="1" className="hx-trace" />
      <path d="M378.3 382.8L371.4 385.2" pathLength="1" strokeDasharray="1" fill="none" stroke="rgba(24,24,27,0.55)" strokeWidth="1" className="hx-trace" />
      <path d="M361.0 389.0L354.1 391.4" pathLength="1" strokeDasharray="1" fill="none" stroke="rgba(24,24,27,0.55)" strokeWidth="1" className="hx-trace" />
      <path d="M475.3 432.4L489.2 437.3" pathLength="1" strokeDasharray="1" fill="none" stroke="rgba(24,24,27,0.55)" strokeWidth="1" className="hx-trace" />
      <path d="M461.4 427.4L532.5 402.0" pathLength="1" strokeDasharray="1" fill="none" stroke="rgba(24,24,27,0.55)" strokeWidth="1.1" className="hx-trace" />
      <path d="M468.4 429.9L539.4 404.5" pathLength="1" strokeDasharray="1" fill="none" stroke="rgba(24,24,27,0.55)" strokeWidth="1.1" className="hx-trace" />
      <path d="M634.6 420.0L769.7 468.3" pathLength="1" strokeDasharray="1" fill="none" stroke="rgba(24,24,27,0.55)" strokeWidth="1" className="hx-trace" />
      <path d="M620.8 424.9L683.1 447.2L683.1 449.7L752.4 474.5" pathLength="1" strokeDasharray="1" fill="none" stroke="rgba(24,24,27,0.55)" strokeWidth="1" className="hx-trace" />
      <path d="M572.3 358.0L589.6 364.2" fill="none" stroke="rgba(24,24,27,0.55)" strokeWidth="1.6" />
      <path d="M572.3 358.0L589.6 364.2" fill="none" stroke="#B6E88E" strokeWidth="1.6" className="hx-clk" />
      <path d="M558.4 362.9L575.8 369.1" fill="none" stroke="rgba(24,24,27,0.55)" strokeWidth="1.6" />
      <path d="M558.4 362.9L575.8 369.1" fill="none" stroke="#B6E88E" strokeWidth="1.6" className="hx-clk" />
      <ellipse cx="555.0" cy="356.7" rx="34" ry="20" fill="none" stroke="#B6E88E" strokeWidth="1" className="hx-ring" style={{ filter: "drop-shadow(0 0 4px rgba(182,232,142,0.8))" }} />
      </g>
      <path d="M437.2 431.1L458.0 438.6L430.3 448.5L409.5 441.0Z" fill="#FAFAF9" />
      <path d="M409.5 448.5C369.5 488.5 289.5 468.5 199.5 538.5" fill="none" strokeWidth="2.2" />
      <g transform="translate(0 -70)">
      <g className="hx-lid">
      <path d="M215.5 171.2L686.6 339.8L686.6 357.8L215.5 189.2Z" fill="#FAFAF9" />
      <path d="M686.6 339.8L984.5 233.2L984.5 251.2L686.6 357.8Z" fill="#FAFAF9" />
      <path d="M513.4 64.6L984.5 233.2L686.6 339.8L215.5 171.2Z" fill="#FAFAF9" />
      <ellipse cx="513.4" cy="86.9" rx="4" ry="2.4" fill="none" />
      <ellipse cx="922.2" cy="233.2" rx="4" ry="2.4" fill="none" />
      <ellipse cx="277.8" cy="171.2" rx="4" ry="2.4" fill="none" />
      <ellipse cx="686.6" cy="317.5" rx="4" ry="2.4" fill="none" />
      <path d="M821.7 204.7L852.9 215.8L832.1 223.3L800.9 212.1Z" fill="none" />
      <path d="M513.4 109.2L617.3 146.4" strokeOpacity="0.6" />
      <path d="M499.5 114.2L603.5 151.4" strokeOpacity="0.6" />
      <path d="M485.7 119.1L589.6 156.3" strokeOpacity="0.6" />
      <path d="M471.8 124.1L575.8 161.3" strokeOpacity="0.6" />
      <path d="M458.0 129.0L561.9 166.2" strokeOpacity="0.6" />
      </g>
      </g>
      <g className="hx-chip">
      <path d="M555.1 295.3L555.1 343.3" stroke="#A1A1AA" strokeWidth="1" />
      <rect x="473.1" y="271.3" width="164" height="24" rx="12" fill="#FFFFFF" stroke="#E4E4E7" />
      <text x="555.1" y="287.3" textAnchor="middle" fontFamily="var(--font-space-grotesk), system-ui, sans-serif" fontSize="11" fill="#18181B" stroke="none">
      Changed: clock routing
      </text>
      </g>
      </g>
      <text x="214" y="336" fontFamily="var(--font-space-grotesk), system-ui, sans-serif" fontSize="11" fill="#71717A" className="hx-asm">
      Gateway board · Rev C
      </text>
      <g className="max-[1099px]:hidden">
      <path d="M180 245C200 340 279.47999999999996 463.48 299.5 493.5" pathLength="1" fill="none" stroke="#A1A1AA" strokeWidth="1" className="hx-line" style={{ "--d": L[0] } as CSSProperties} />
      <path d="M180 245C200 340 279.47999999999996 463.48 299.5 493.5" pathLength="1" fill="none" stroke="#A1A1AA" strokeWidth="1" className="hx-flow" />
      <circle cx="180.0" cy="245.0" r="3.5" fill="#FFFFFF" stroke="#71717A" strokeWidth="1" className="hx-dot" style={{ "--d": L[0] } as CSSProperties} />
      <circle cx="299.5" cy="493.5" r="3.5" fill="#FFFFFF" stroke="#71717A" strokeWidth="1" className="hx-dot" style={{ "--d": L[0] } as CSSProperties} />
      <path d="M170 503C190 495 205.49599999999998 487.2 215.5 479.2" pathLength="1" fill="none" stroke="#A1A1AA" strokeWidth="1" className="hx-line" style={{ "--d": L[1] } as CSSProperties} />
      <path d="M170 503C190 495 205.49599999999998 487.2 215.5 479.2" pathLength="1" fill="none" stroke="#A1A1AA" strokeWidth="1" className="hx-flow" />
      <circle cx="170.0" cy="503.0" r="3.5" fill="#FFFFFF" stroke="#71717A" strokeWidth="1" className="hx-dot" style={{ "--d": L[1] } as CSSProperties} />
      <circle cx="215.5" cy="479.2" r="3.5" fill="#FFFFFF" stroke="#71717A" strokeWidth="1" className="hx-dot" style={{ "--d": L[1] } as CSSProperties} />
      <path d="M1070 228V394" pathLength="1" fill="none" stroke="#A1A1AA" strokeWidth="1" className="hx-line" style={{ "--d": L[2] } as CSSProperties} />
      <path d="M1070 228V394" pathLength="1" fill="none" stroke="#A1A1AA" strokeWidth="1" className="hx-flow" />
      <circle cx="1070.0" cy="228.0" r="3.5" fill="#FFFFFF" stroke="#71717A" strokeWidth="1" className="hx-dot" style={{ "--d": L[2] } as CSSProperties} />
      <circle cx="1070.0" cy="394.0" r="3.5" fill="#FFFFFF" stroke="#71717A" strokeWidth="1" className="hx-dot" style={{ "--d": L[2] } as CSSProperties} />
      <path d="M940 450C800 450 640 376.72 563.0 358.7" pathLength="1" fill="none" stroke="#A1A1AA" strokeWidth="1" className="hx-line" style={{ "--d": L[3] } as CSSProperties} />
      <path d="M940 450C800 450 640 376.72 563.0 358.7" pathLength="1" fill="none" stroke="#A1A1AA" strokeWidth="1" className="hx-flow" />
      <circle cx="940.0" cy="450.0" r="3.5" fill="#FFFFFF" stroke="#71717A" strokeWidth="1" className="hx-dot" style={{ "--d": L[3] } as CSSProperties} />
      <circle cx="563.0" cy="358.7" r="3.5" fill="#FFFFFF" stroke="#71717A" strokeWidth="1" className="hx-dot" style={{ "--d": L[3] } as CSSProperties} />
      </g>
          </svg>
        </div>
        <div className="max-[1099px]:hidden">
          {CARDS.map((card) => (
            <div
              key={card.title}
              data-par="0.035"
              className="absolute w-[clamp(236px,21.67%,260px)]"
              style={card.pos}
            >
              <GlassCard card={card} />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(236px,1fr))] gap-x-4 gap-y-6 min-[1100px]:hidden">
        {CARDS.map((card) => (
          <div key={card.title} className="relative">
            <span aria-hidden="true" className="absolute -top-[17px] left-6 h-4 w-px bg-[rgba(42,52,65,0.3)]" />
            <GlassCard card={card} />
          </div>
        ))}
      </div>
      <p className="m-0 mt-4 text-center text-xs leading-[1.5] text-fg-subtle">Illustrative example</p>
    </div>
  );
}
