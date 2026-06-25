import type { ProgressMap, ProgressState, Session } from "../types";
import { ALL_EXERCISE_IDS, EX_BY_ID } from "../data/curriculum";
import { exerciseDrillCounts } from "./stats";

// How much practice it takes before we gently suggest advancing a state.
const BUMP_TO_SOLID_AT = 5; // Learning -> Solid
const BUMP_TO_LEARNING_AT = 2; // Not started -> Learning

export interface Nudge {
  /** Exercise id. */
  id: string;
  /** Stable key for dismissal, e.g. "pm1-watch->2". */
  key: string;
  /** State to advance to (always current + 1, so a single cycle applies it). */
  target: ProgressState;
  count: number;
  message: string;
  action: string;
}

// Never auto-changes anything — these are suggestions, derived from how often
// each exercise has been tagged in sessions vs its current state.
export function computeNudges(progress: ProgressMap, sessions: Session[]): Nudge[] {
  const drills = exerciseDrillCounts(sessions);
  const out: Nudge[] = [];

  for (const id of ALL_EXERCISE_IDS) {
    const state = progress[id] ?? 0;
    const count = drills.get(id)?.count ?? 0;
    const name = EX_BY_ID[id]?.name ?? id;

    if (state === 1 && count >= BUMP_TO_SOLID_AT) {
      out.push({
        id,
        key: `${id}->2`,
        target: 2,
        count,
        message: `Logged ${count} sessions on ${name}, still marked Learning — ready to bump it to Solid?`,
        action: "Bump to Solid",
      });
    } else if (state === 0 && count >= BUMP_TO_LEARNING_AT) {
      out.push({
        id,
        key: `${id}->1`,
        target: 1,
        count,
        message: `Drilled ${name} ${count}× but it's still Not started — mark it Learning?`,
        action: "Mark Learning",
      });
    }
  }

  // Most-practiced first.
  return out.sort((a, b) => b.count - a.count);
}
