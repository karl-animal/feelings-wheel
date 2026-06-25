import type { ProgressMap, Session, TrainingState } from "../types";
import type { TrainingStore } from "./types";

// These keys match the original single-file app exactly, so existing on-device
// data carries over with no migration and nothing is lost.
const PROGRESS_KEY = "bennie-training-progress-v2";
const SESSIONS_KEY = "bennie-sessions-v1";

function loadKey<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function saveKey(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Quota or private-mode failures are non-fatal; in-memory state still holds.
  }
}

export class LocalStorageStore implements TrainingStore {
  async load(): Promise<TrainingState> {
    const progress = loadKey<ProgressMap>(PROGRESS_KEY) ?? {};
    const sessions = loadKey<Session[]>(SESSIONS_KEY) ?? [];
    return { progress, sessions };
  }

  async saveProgress(progress: ProgressMap): Promise<void> {
    saveKey(PROGRESS_KEY, progress);
  }

  async saveSessions(sessions: Session[]): Promise<void> {
    saveKey(SESSIONS_KEY, sessions);
  }
}
