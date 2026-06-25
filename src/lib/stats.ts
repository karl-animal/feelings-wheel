import type { ProgressMap, Session } from "../types";

export interface WeekBucket {
  /** Monday of the week, as YYYY-MM-DD. */
  start: string;
  /** Short axis label, e.g. "Jun 23". */
  label: string;
  minutes: number;
  sessions: number;
}

// Monday (local) of the week containing d.
function mondayOf(d: Date): Date {
  const x = new Date(d);
  const dow = (x.getDay() + 6) % 7; // 0 = Monday … 6 = Sunday
  x.setDate(x.getDate() - dow);
  x.setHours(0, 0, 0, 0);
  return x;
}

function ymd(d: Date): string {
  return d.toLocaleDateString("en-CA");
}

function shortLabel(d: Date): string {
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

// Minutes (and session counts) bucketed into the last `weeks` calendar weeks,
// including empty weeks, oldest → newest.
export function weeklyMinutes(sessions: Session[], weeks = 8): WeekBucket[] {
  const thisMonday = mondayOf(new Date());
  const buckets: WeekBucket[] = [];
  const byStart = new Map<string, WeekBucket>();

  for (let i = weeks - 1; i >= 0; i--) {
    const start = new Date(thisMonday);
    start.setDate(start.getDate() - i * 7);
    const bucket: WeekBucket = {
      start: ymd(start),
      label: shortLabel(start),
      minutes: 0,
      sessions: 0,
    };
    buckets.push(bucket);
    byStart.set(bucket.start, bucket);
  }

  for (const s of sessions) {
    if (!s.date) continue;
    const start = ymd(mondayOf(new Date(s.date + "T00:00:00")));
    const bucket = byStart.get(start);
    if (bucket) {
      bucket.minutes += s.minutes || 0;
      bucket.sessions += 1;
    }
  }

  return buckets;
}

export interface DrillCount {
  id: string;
  count: number;
  minutes: number;
}

// How many sessions (and total minutes) tagged each exercise.
export function exerciseDrillCounts(sessions: Session[]): Map<string, DrillCount> {
  const counts = new Map<string, DrillCount>();
  for (const s of sessions) {
    for (const id of s.exIds || []) {
      const cur = counts.get(id) ?? { id, count: 0, minutes: 0 };
      cur.count += 1;
      cur.minutes += s.minutes || 0;
      counts.set(id, cur);
    }
  }
  return counts;
}

// Exercises currently marked "Learning" (progress === 1), ranked by how few
// sessions they've been tagged in — the ones most worth a session. Includes
// those with zero logged sessions.
export function neglectedLearning(
  progress: ProgressMap,
  drills: Map<string, DrillCount>,
  learningIds: string[]
): DrillCount[] {
  return learningIds
    .filter((id) => progress[id] === 1)
    .map((id) => drills.get(id) ?? { id, count: 0, minutes: 0 })
    .sort((a, b) => a.count - b.count || a.id.localeCompare(b.id));
}
