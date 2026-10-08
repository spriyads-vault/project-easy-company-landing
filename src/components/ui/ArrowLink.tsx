import Link from "next/link";
import type { ReactNode } from "react";

interface ArrowLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

/** "Read the docs →" style link. Design animates `gap`; here only the arrow moves (transform). */
export default function ArrowLink({ href, children, className }: ArrowLinkProps) {
  const external = href.startsWith("http") || href.startsWith("mailto:");
  const inner = (
    <>
      {children}
      <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-[3px]">
        →
      </span>
    </>
  );
  const cls = `group inline-flex gap-1.5 text-sm font-medium ${className ?? ""}`;
  return external ? (
    <a href={href} className={cls}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}
