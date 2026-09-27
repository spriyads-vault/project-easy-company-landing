import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-steel bg-night">
      <div className="mx-auto flex max-w-[1264px] flex-wrap items-center justify-between gap-x-8 gap-y-4 p-8">
        <div className="flex items-center gap-2.5">
          <Image src="/assets/crado-logo.png" alt="" width={882} height={1000} className="block h-[22px] w-auto" />
          <span className="font-display text-lg font-bold tracking-[-0.05em] text-paper">Crado</span>
        </div>
        <a
          href="mailto:hello@crado.io"
          className="font-mono text-sm leading-5 text-paper no-underline hover:text-mint"
        >
          hello@crado.io
        </a>
        <div className="flex items-center gap-6 text-sm leading-5">
          <a href="#" className="text-fog no-underline hover:text-paper">
            Privacy
          </a>
          <a href="#" className="text-fog no-underline hover:text-paper">
            Terms
          </a>
          <a
            href="https://www.linkedin.com/company/crado"
            aria-label="Crado on LinkedIn"
            className="flex text-fog hover:text-mint"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
