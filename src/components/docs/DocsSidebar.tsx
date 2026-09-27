"use client";

import { useEffect, useState } from "react";
import { SIDEBAR } from "@/lib/docs";

const IDS = SIDEBAR.flatMap(([, ids]) => ids);

export default function DocsSidebar() {
  const [active, setActive] = useState(IDS[0]);

  useEffect(() => {
    const onScroll = () => {
      let cur = IDS[0];
      for (const id of IDS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) cur = id;
      }
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) {
        cur = IDS[IDS.length - 1];
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      aria-label="Documentation"
      className="sticky top-(--header-h) hidden h-[calc(100vh-var(--header-h))] w-64 shrink-0 flex-col gap-8 self-start overflow-y-auto border-r border-ink p-8 font-mono text-xs leading-4 lg:flex"
    >
      {SIDEBAR.map(([label, ids]) => (
        <div key={label} className="flex flex-col gap-1">
          <div className="mb-2 tracking-[0.1em] text-mist">{label}</div>
          {ids.map((id) => {
            const on = id === active;
            return (
              <a
                key={id}
                href={`#${id}`}
                aria-current={on ? "location" : undefined}
                className={`block border-l py-1.5 pl-3 no-underline transition-colors duration-150 hover:text-paper ${
                  on ? "border-mint text-mint" : "border-ink text-fog"
                }`}
              >
                #{id}
              </a>
            );
          })}
        </div>
      ))}
    </nav>
  );
}
