import Link from "next/link";
import SkipLink from "@/components/site/SkipLink";
import Logo from "@/components/ui/Logo";

/** The v3 (dark) 404. */
export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-bg font-display text-fg">
      <SkipLink target="main" />
      <header className="mx-auto flex h-14 w-full max-w-page items-center px-(--space-gutter)">
        <Link href="/" aria-label="Crado home" className="flex">
          <Logo height={22} alt="" />
        </Link>
      </header>
      <main id="main" className="mx-auto flex w-full max-w-page flex-1 flex-col items-start px-(--space-gutter) py-[clamp(80px,12vw,160px)]">
        <p className="m-0 font-mono text-[10px] tracking-[0.1em] text-fg-faint">404</p>
        <h1 className="m-0 mt-5 text-[clamp(36px,6vw,56px)] leading-[1.05] font-bold tracking-[-0.035em]">This page isn&apos;t here.</h1>
        <nav aria-label="Recovery" className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className="inline-flex h-9 items-center rounded-sm bg-fg px-3.5 text-sm font-medium text-bg hover:bg-white hover:text-bg">
            Go to the home page
          </Link>
          <Link href="/docs" className="inline-flex h-9 items-center rounded-sm border border-line-4 px-3.5 text-sm font-medium hover:bg-surface-3">
            Read the docs
          </Link>
        </nav>
      </main>
    </div>
  );
}
