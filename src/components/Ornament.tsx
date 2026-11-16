export function Star({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false" fill="currentColor">
      <path d="M12 1 L15.2 8.8 L23 12 L15.2 15.2 L12 23 L8.8 15.2 L1 12 L8.8 8.8 Z" />
    </svg>
  );
}

export function StarDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 text-gold ${className}`} aria-hidden="true">
      <span className="h-px w-16 bg-current opacity-50" />
      <Star />
      <span className="h-px w-16 bg-current opacity-50" />
    </div>
  );
}
