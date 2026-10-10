import type { ReactNode } from "react";
import Announcement from "@/components/home-v6/sections/Announcement";
import { Footer } from "@/components/home-v6/sections/Closing";
import SiteHeader from "@/components/home-v6/SiteHeader";
import SkipLink from "@/components/site/SkipLink";
import type { WaitlistSource } from "@/lib/waitlist/schema";
import "./site.css";

interface SiteShellV6Props {
  /** Attribution for the footer waitlist form. */
  source?: WaitlistSource;
  /** Marks the docs layout (its contents bar changes the anchor offset under 1024px). */
  docs?: boolean;
  /** Level of the footer waitlist title (h2 when the page has no h2 of its own). */
  waitlistHeading?: "h2" | "h3";
  /** Leave the footer waitlist out (/waitlist, which is the form). */
  waitlist?: boolean;
  children: ReactNode;
}

/**
 * The v6 homepage's announcement, header and footer (with the waitlist) around a docs, legal or 404 page. Section
 * links and "Book a case review" go to the homepage; "Join the waitlist" scrolls to this page's footer form.
 */
export default function SiteShellV6({ source, docs, waitlistHeading, waitlist, children }: SiteShellV6Props) {
  return (
    <div
      data-site-v6
      data-docs-v6={docs ? "" : undefined}
      className="overflow-x-clip bg-v6-page font-v6-sans text-[length:var(--v6-doc-body)] leading-(--v6-doc-body-lh) font-normal text-v6-ink [font-variant-numeric:normal] [-webkit-font-smoothing:auto] [-moz-osx-font-smoothing:auto]"
    >
      <SkipLink target="main" />
      <Announcement />
      <SiteHeader linkBase="/" />
      {children}
      <Footer linkBase="/" source={source} waitlistHeading={waitlistHeading} waitlist={waitlist} />
    </div>
  );
}
