import type { ReactNode } from "react";
import Footer from "@/components/home-v8/Footer";
import SiteHeader from "@/components/home-v8/SiteHeader";
import SkipLink from "@/components/site/SkipLink";
import "./site.css";

/**
 * The v8 shell for docs, legal pages and the 404 (NEXT_PUBLIC_FF_HOMEPAGE_V8): the homepage's announcement bar, header
 * and footer around the page content, which keeps its v3 typography. Inside it the accent is the v8 terracotta, not
 * the v3 blue (site.css).
 */
export default function SiteShellV8({ current, children }: { current?: string; children: ReactNode }) {
  return (
    <div data-site-v8="" className="relative isolate overflow-x-clip bg-v8-page text-fg">
      <SkipLink target="main" />
      <SiteHeader variant="page" current={current} />
      {children}
      <Footer linkBase="/" />
    </div>
  );
}
