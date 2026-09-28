"use client";

import type { ComponentPropsWithoutRef, MouseEvent } from "react";
import { CAL_URL, openBooking } from "@/lib/booking";

type Props = Omit<ComponentPropsWithoutRef<"a">, "href">;

/** A real link to the Cal.com page that opens the on-page booking modal when JS is available. */
export default function PilotLink({ onClick, children, ...rest }: Props) {
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    openBooking(e);
  };
  return (
    <a href={CAL_URL} rel="noopener noreferrer" onClick={handle} {...rest}>
      {children}
    </a>
  );
}
