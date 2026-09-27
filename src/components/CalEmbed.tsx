"use client";

import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import { CAL_NAMESPACE } from "@/lib/cal";

/**
 * Loads Cal.com's embed script once and registers the "crado" namespace.
 * Any element with data-cal-link + data-cal-namespace="crado" then opens
 * the booking modal on click (see BookPilotButton).
 */
export default function CalEmbed() {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE });
      cal("ui", {
        styles: { branding: { brandColor: "#2A3441" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return null;
}
