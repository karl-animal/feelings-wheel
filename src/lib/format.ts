// Local YYYY-MM-DD (en-CA gives an ISO-like local date).
export function todayStr(): string {
  return new Date().toLocaleDateString("en-CA");
}

export function fmtMin(m: number): string {
  if (m < 60) return m + "m";
  const h = Math.floor(m / 60);
  const r = m % 60;
  return r ? h + "h " + r + "m" : h + "h";
}

export function fmtDate(s: string): string {
  const d = new Date(s + "T00:00:00");
  return d.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

// Coarse "time ago" for backup timestamps.
export function fmtRelative(iso: string): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "";
  const mins = Math.round((Date.now() - then) / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.round(hrs / 24);
  return `${days}d ago`;
}

// Start of the trailing 7-day window (today plus the previous 6 days).
export function weekStartStr(): string {
  const d = new Date();
  d.setDate(d.getDate() - 6);
  return d.toLocaleDateString("en-CA");
}
