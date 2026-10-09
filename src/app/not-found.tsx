import type { Metadata } from "next";
import { NotFound } from "@crado/site-active";

export const metadata: Metadata = {
  title: { absolute: "Page not found | Crado" },
};

export default function NotFoundPage() {
  return <NotFound />;
}
