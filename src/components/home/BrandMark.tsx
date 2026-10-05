export type BrandKind = "gmail" | "pdf";

/** Full-colour product marks, drawn on a 24px grid. */
export default function BrandMark({ kind, size = 16 }: { kind: BrandKind; size?: number }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" className="block flex-none">
      {kind === "gmail" ? (
        <>
          <path fill="#4285F4" d="M2 6.4V19a1 1 0 0 0 1 1h3.6v-9.2z" />
          <path fill="#34A853" d="M17.4 20H21a1 1 0 0 0 1-1V6.4l-4.6 4.4z" />
          <path fill="#FBBC04" d="M17.4 4.6v6.2L22 6.4V5.2c0-1.7-2-2.7-3.4-1.6z" />
          <path fill="#EA4335" d="M6.6 10.8V4.6L12 8.7l5.4-4.1v6.2L12 14.9z" />
          <path fill="#C5221F" d="M2 5.2v1.2l4.6 4.4V4.6L5.4 3.6C4 2.5 2 3.5 2 5.2z" />
        </>
      ) : (
        <>
          <path fill="#E5252A" d="M5 2h9l5 5v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z" />
          <path fill="#fff" fillOpacity=".45" d="M14 2l5 5h-4a1 1 0 0 1-1-1z" />
          <path fill="none" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" d="M7.5 17.2c2.6-1.6 4.6-5 4.1-7.4-.3-1.2-1.4-.8-1.2.6.3 2.2 2.7 4.6 5.1 4.8 1 .1 1-1.1-.1-1.2-2.3-.2-5 .8-7.9 3.2z" />
        </>
      )}
    </svg>
  );
}
