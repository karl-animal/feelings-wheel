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

// Cheap content signature (djb2 + length) used to detect whether the current
// data differs from the last backup. Not cryptographic — just change detection.
export function dataSignature(progress: ProgressMap, sessions: Session[]): string {
  const str = JSON.stringify({ progress, sessions });
  let h = 5381;
  for (let i = 0; i < str.length; i++) {
    h = (((h << 5) + h) + str.charCodeAt(i)) | 0;
  }
  return (h >>> 0).toString(36) + ":" + str.length;
}

// --- Backup metadata (UI-only; tracks when you last saved a copy) ---
export type BackupKind = "exported" | "imported";

export interface BackupMeta {
  at: string; // ISO timestamp
  sig: string; // data signature at that time
  kind: BackupKind;
}

const META_KEY = "bennie-backup-meta-v1";

export function loadBackupMeta(): BackupMeta | null {
  try {
    const raw = localStorage.getItem(META_KEY);
    return raw ? (JSON.parse(raw) as BackupMeta) : null;
  } catch {
    return null;
  }
}

export function saveBackupMeta(meta: BackupMeta): void {
  try {
    localStorage.setItem(META_KEY, JSON.stringify(meta));
  } catch {
    // non-fatal
  }
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
