import type { ProgressMap, Session, TrainingState } from "../types";

// Storage is intentionally behind this async interface so a sync backend
// (e.g. a serverless API + a per-user store) can drop in later without
// touching any component. The localStorage adapter resolves immediately.
export interface TrainingStore {
  /** Load the full state once on startup. */
  load(): Promise<TrainingState>;
  /** Persist the progress map. */
  saveProgress(progress: ProgressMap): Promise<void>;
  /** Persist the session list. */
  saveSessions(sessions: Session[]): Promise<void>;
}
