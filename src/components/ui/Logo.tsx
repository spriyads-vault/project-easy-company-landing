import Image from "next/image";
import { LOGO_PATH } from "@/lib/site";

interface LogoProps {
  /** Rendered height in px; width follows the mark's 882×1000 aspect ratio. */
  height: number;
  alt?: string;
  className?: string;
}

/** The mark loads eagerly but without a preload, so it never competes with the hero text for bandwidth. */
export default function Logo({ height, alt = "Crado", className }: LogoProps) {
  const width = Math.round((height * 882) / 1000);
  return (
    <Image
      src={LOGO_PATH}
      alt={alt}
      width={width}
      height={height}
      loading="eager"
      sizes={`${width}px`}
      className={`block h-auto ${className ?? ""}`}
      style={{ height, width: "auto" }}
    />
  );
}
