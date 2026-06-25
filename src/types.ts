// Three-state progress per exercise. Advance on the criterion, not the calendar.
export type ProgressState = 0 | 1 | 2; // 0 = not started, 1 = learning, 2 = solid

export interface Exercise {
  id: string;
  name: string;
  note: string;
}

export interface Week {
  num: string;
  ex: Exercise[];
}

export interface Course {
  id: string;
  name: string;
  source: string;
  weeks: Week[];
}

export interface Session {
  id: string;
  date: string; // YYYY-MM-DD (local)
  minutes: number;
  exIds: string[]; // tagged exercise ids
  notes: string;
}

export type ProgressMap = Record<string, ProgressState>;

export interface TrainingState {
  progress: ProgressMap;
  sessions: Session[];
}

// The on-disk backup format. Kept compatible with existing exports:
// { app, version, progress, sessions }.
export interface BackupPayload {
  app: string;
  version: number;
  savedAt?: string;
  progress: ProgressMap;
  sessions: Session[];
}
