import Image from "next/image";

// The one place the logo file is referenced. To switch to the SVG logo, change
// SRC (and the intrinsic size below if its proportions differ).
const SRC = "/assets/crado-mark-black.png";
const INTRINSIC = { width: 882, height: 1001 };

type Props = {
  /** Rendered height in CSS pixels. */
  height: number;
  alt?: string;
  priority?: boolean;
  className?: string;
};

/** The Crado mark. Fixed-size, so next/image serves 1x and 2x sources and it stays sharp on high-density screens. */
export default function CradoMark({ height, alt = "", priority, className }: Props) {
  const width = Math.round((height * INTRINSIC.width) / INTRINSIC.height);
  return (
    <Image
      src={SRC}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={className}
      style={{ display: "block", width, height }}
    />
  );
}
