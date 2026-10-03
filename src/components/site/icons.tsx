export function ArrowIcon({ size = 12 }: { size?: number }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" className="flex-none">
      <path d="M2 6h8M6.5 2.5 10 6l-3.5 3.5" />
    </svg>
  );
}

export function CheckIcon({ size = 12, strokeWidth = 1.7 }: { size?: number; strokeWidth?: number }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={strokeWidth} className="flex-none">
      <path d="M2.5 6.2 5 8.5l4.5-5" />
    </svg>
  );
}

export function ChevronIcon() {
  return (
    <svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#9AA3AE" strokeWidth="1.3" className="flex-none">
      <path d="m4.5 2.5 3.5 3.5-3.5 3.5" />
    </svg>
  );
}
