import Image from "next/image";
import Link from "next/link";
import { isLive } from "@/content/capability-status";
import { FOOTER, FOOTER_COPYRIGHT, FOOTER_NVIDIA, FOOTER_TAGLINE, type FooterLink } from "@/content/home-v8";
import StatusTag from "./StatusTag";

const LINK = "text-[16px] leading-6 text-v8-link transition-colors duration-200 hover:text-v8-white";

function FootLink({ link }: { link: FooterLink }) {
  // Only a link whose capabilities are not all live carries a tag (live coverage is the default and stays untagged).
  const tagged = link.capabilities?.find((id) => !isLive(id));
  const label = (
    <>
      {link.label}
      {tagged && <StatusTag capability={tagged} className="ml-2 align-[2px]" />}
    </>
  );
  if (link.href.startsWith("/")) {
    return (
      <Link href={link.href} className={LINK}>
        {label}
      </Link>
    );
  }
  return (
    <a
      href={link.href}
      className={LINK}
      {...(link.href === "#get-started" ? { "data-wl-source": "section" } : {})}
      {...(link.external ? { target: "_blank", rel: "noopener" } : {})}
    >
      {label}
      {link.external && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  );
}

/** Footer (design: link columns, the legal row) with the NVIDIA Inception member badge. */
export default function Footer() {
  return (
    <footer className="bg-v8-page px-6 pt-[72px] pb-9 shadow-[0_-1px_0_var(--color-v8-ring)]">
      <div className="mx-auto max-w-[1120px]">
        <div className="flex flex-wrap justify-between gap-12">
          <p className="m-0 max-w-[320px] flex-[1_1_260px] text-[24px] leading-[30px] font-medium">{FOOTER_TAGLINE}</p>
          <nav aria-label="Footer" className="grid flex-[3_1_560px] grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-9">
            {FOOTER.map((col) => (
              <div key={col.title}>
                <h2 className="m-0 text-[15px] leading-[21px] font-normal text-v8-grey">{col.title}</h2>
                <ul className="m-0 mt-4 flex list-none flex-col gap-3 p-0">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <FootLink link={l} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <div className="mt-[72px] flex flex-wrap items-center justify-between gap-4 pt-6 text-[15px] leading-[21px] text-v8-muted shadow-[0_-1px_0_var(--color-v8-ring)]">
          <span className="text-[20px] font-medium text-v8-white">Crado</span>
          <div className="flex flex-wrap items-center gap-3">
            <span>
              {FOOTER_COPYRIGHT} · {FOOTER_NVIDIA}
            </span>
            {/* The member badge as supplied (501×217), served unaltered and scaled to 32px tall. */}
            <Image src="/assets/nvidia-inception-badge.png" alt="NVIDIA Inception program member" width={74} height={32} unoptimized loading="lazy" className="block h-8 w-auto" />
          </div>
        </div>
      </div>
    </footer>
  );
}
