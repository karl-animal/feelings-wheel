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

// Start of the trailing 7-day window (today plus the previous 6 days).
export function weekStartStr(): string {
  const d = new Date();
  d.setDate(d.getDate() - 6);
  return d.toLocaleDateString("en-CA");
}
