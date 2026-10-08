import type { ReactNode } from "react";
import WaitlistProvider from "@/components/waitlist/WaitlistProvider";
import Banner from "./Banner";
import Footer from "./Footer";
import Nav from "./Nav";
import SkipLink from "./SkipLink";

interface SiteShellProps {
  variant: "home" | "docs" | "page";
  children: ReactNode;
}

/** Skip link, banner, nav, footer and the waitlist dialog shared by every public page. */
export default function SiteShell({ variant, children }: SiteShellProps) {
  return (
    <WaitlistProvider hashSource={variant === "docs" ? "docs" : "section"}>
      <div className="relative isolate overflow-x-clip bg-bg text-fg">
        <SkipLink target="main" />
        <Banner variant={variant === "home" ? "home" : "docs"} />
        <Nav variant={variant} />
        {children}
        <Footer variant={variant} />
      </div>
    </WaitlistProvider>
  );
}
