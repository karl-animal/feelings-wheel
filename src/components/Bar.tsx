interface BarProps {
  pct: number;
  className?: string;
}

export function Bar({ pct, className }: BarProps) {
  return (
    <div className={`h-2 w-full bg-stone-200 rounded-full overflow-hidden ${className || ""}`}>
      <div
        className="h-full bg-teal-600 transition-all duration-500 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
