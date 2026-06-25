import type { BackupPayload, ProgressMap, Session } from "../types";
import { todayStr } from "./format";

export const BACKUP_APP = "bennie-training";
export const BACKUP_VERSION = 3;

export function buildBackup(progress: ProgressMap, sessions: Session[]): BackupPayload {
  return {
    app: BACKUP_APP,
    version: BACKUP_VERSION,
    savedAt: new Date().toISOString(),
    progress,
    sessions,
  };
}

export function downloadBackup(progress: ProgressMap, sessions: Session[]): void {
  const payload = buildBackup(progress, sessions);
  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `bennie-backup-${todayStr()}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export interface ParsedBackup {
  progress?: ProgressMap;
  sessions?: Session[];
}

// Reads the current backup format { app, version, progress, sessions } and
// also tolerates a legacy progress-only object (the very first export shape).
export function parseBackup(text: string): ParsedBackup {
  const p = JSON.parse(text) as unknown;
  if (!p || typeof p !== "object") {
    throw new Error("Not a backup file.");
  }
  const obj = p as Record<string, unknown>;
  const out: ParsedBackup = {};

  if (obj.progress && typeof obj.progress === "object") {
    out.progress = obj.progress as ProgressMap;
  }
  if (Array.isArray(obj.sessions)) {
    out.sessions = obj.sessions as Session[];
  }
  // Legacy: a bare progress map with no wrapper.
  if (!out.progress && !out.sessions) {
    out.progress = obj as ProgressMap;
  }
  return out;
}
