"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { dismissBooking, installBooking } from "@/lib/booking";

/** Mounted once in the root layout: one Cal.com integration for the whole site. */
export default function BookingManager() {
  const pathname = usePathname();

  useEffect(() => installBooking(), []);

  // Never carry an open modal (or its scroll lock) across a client-side navigation.
  useEffect(() => () => dismissBooking(false), [pathname]);

  return null;
}
