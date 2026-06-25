import { useMemo, useState } from "react";
import type { ProgressMap, Session } from "../types";
import {
  type BackupMeta,
  type ParsedBackup,
  dataSignature,
  downloadBackup,
  loadBackupMeta,
  parseBackup,
  saveBackupMeta,
} from "../lib/backup";
import { fmtRelative } from "../lib/format";

interface DataControlsProps {
  progress: ProgressMap;
  sessions: Session[];
  onImportProgress: (progress: ProgressMap) => void;
  onImportSessions: (sessions: Session[]) => void;
  onReset: () => void;
  flash: (msg: string) => void;
}

interface PendingImport {
  fileName: string;
  parsed: ParsedBackup;
  exCount: number | null;
  sessCount: number | null;
}

export function DataControls({
  progress,
  sessions,
  onImportProgress,
  onImportSessions,
  onReset,
  flash,
}: DataControlsProps) {
  const [meta, setMeta] = useState<BackupMeta | null>(loadBackupMeta);
  const [pending, setPending] = useState<PendingImport | null>(null);

  const currentSig = useMemo(() => dataSignature(progress, sessions), [progress, sessions]);
  const upToDate = meta !== null && meta.sig === currentSig;

  const recordBackup = (kind: BackupMeta["kind"], sig: string) => {
    const next: BackupMeta = { at: new Date().toISOString(), sig, kind };
    setMeta(next);
    saveBackupMeta(next);
  };

  const exportData = () => {
    try {
      downloadBackup(progress, sessions);
      recordBackup("exported", currentSig);
      flash("Backup exported.");
    } catch {
      flash("Export failed.");
    }
  };

  const pickFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    e.target.value = ""; // allow re-picking the same file
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = parseBackup(String(reader.result));
        if (!parsed.progress && !parsed.sessions) {
          flash("Nothing to import in that file.");
          return;
        }
        setPending({
          fileName: file.name,
          parsed,
          exCount: parsed.progress
            ? Object.values(parsed.progress).filter((v) => v > 0).length
            : null,
          sessCount: parsed.sessions ? parsed.sessions.length : null,
        });
      } catch {
        flash("Couldn't read that file.");
      }
    };
    reader.readAsText(file);
  };

  const confirmImport = () => {
    if (!pending) return;
    const { parsed } = pending;
    if (parsed.progress) onImportProgress(parsed.progress);
    if (parsed.sessions) onImportSessions(parsed.sessions);
    // The imported file is now our backup reference point.
    const resultSig = dataSignature(parsed.progress ?? progress, parsed.sessions ?? sessions);
    recordBackup("imported", resultSig);
    setPending(null);
    flash("Backup imported.");
  };

  const reset = () => {
    if (
      confirm("Clear ALL progress and session logs? Export a backup first if you want to keep them.")
    ) {
      onReset();
    }
  };

  const statusLine = !meta
    ? "Never backed up — export a copy to be safe."
    : upToDate
      ? `Up to date — last ${meta.kind} backup ${fmtRelative(meta.at)}.`
      : `Changes since your last backup (${fmtRelative(meta.at)}) — export when you can.`;

  const importSummary = pending
    ? [
        pending.exCount !== null ? `${pending.exCount} exercises in progress` : null,
        pending.sessCount !== null ? `${pending.sessCount} sessions` : null,
      ]
        .filter(Boolean)
        .join(" · ")
    : "";

  return (
    <div className="mt-5 bg-white rounded-xl border border-stone-200 p-4 shadow-sm">
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={exportData}
          className="font-mono text-xs uppercase tracking-wider text-teal-800 bg-teal-50 hover:bg-teal-100 transition-colors px-3 py-2 rounded-md border border-teal-200"
        >
          Export backup
        </button>
        <label className="font-mono text-xs uppercase tracking-wider text-stone-600 bg-stone-50 hover:bg-stone-100 transition-colors px-3 py-2 rounded-md border border-stone-200 cursor-pointer">
          Import
          <input type="file" accept="application/json" onChange={pickFile} className="hidden" />
        </label>
        <button
          onClick={reset}
          className="font-mono text-xs uppercase tracking-wider text-stone-400 hover:text-red-500 transition-colors px-3 py-2 rounded-md border border-stone-200 ml-auto"
        >
          Reset
        </button>
      </div>

      {/* Backup status */}
      <p
        className={`font-mono text-[11px] mt-3 flex items-center gap-1.5 ${
          upToDate ? "text-teal-700" : "text-amber-700"
        }`}
      >
        <span className={`h-1.5 w-1.5 rounded-full ${upToDate ? "bg-teal-500" : "bg-amber-400"}`} />
        {statusLine}
      </p>

      {/* Import confirmation / preview */}
      {pending && (
        <div className="mt-3 rounded-md border border-amber-200 bg-amber-50 p-3">
          <p className="text-xs text-stone-700 leading-snug">
            Import <span className="font-medium break-all">{pending.fileName}</span>? This{" "}
            <span className="font-medium">replaces</span> your current data with{" "}
            {importSummary || "the file's contents"}.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <button
              onClick={confirmImport}
              className="font-mono text-[11px] uppercase tracking-wider text-white bg-teal-600 hover:bg-teal-700 transition-colors px-2.5 py-1 rounded-md"
            >
              Replace data
            </button>
            <button
              onClick={() => setPending(null)}
              className="font-mono text-[11px] uppercase tracking-wider text-stone-400 hover:text-stone-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <p className="font-mono text-[11px] text-stone-400 mt-3 leading-relaxed">
        Progress and logs save to this device only. Cross-device sync can slot in behind the same
        storage layer later — for now, export a backup now and then.
      </p>
    </div>
  );
}
