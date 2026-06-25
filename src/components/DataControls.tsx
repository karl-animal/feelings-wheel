import type { ProgressMap, Session } from "../types";
import { downloadBackup, parseBackup } from "../lib/backup";

interface DataControlsProps {
  progress: ProgressMap;
  sessions: Session[];
  onImportProgress: (progress: ProgressMap) => void;
  onImportSessions: (sessions: Session[]) => void;
  onReset: () => void;
  flash: (msg: string) => void;
}

export function DataControls({
  progress,
  sessions,
  onImportProgress,
  onImportSessions,
  onReset,
  flash,
}: DataControlsProps) {
  const exportData = () => {
    try {
      downloadBackup(progress, sessions);
      flash("Backup exported.");
    } catch {
      flash("Export failed.");
    }
  };

  const importData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = parseBackup(String(reader.result));
        if (parsed.progress) onImportProgress(parsed.progress);
        if (parsed.sessions) onImportSessions(parsed.sessions);
        flash("Backup imported.");
      } catch {
        flash("Couldn't read that file.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const reset = () => {
    if (
      confirm("Clear ALL progress and session logs? Export a backup first if you want to keep them.")
    ) {
      onReset();
    }
  };

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
          <input type="file" accept="application/json" onChange={importData} className="hidden" />
        </label>
        <button
          onClick={reset}
          className="font-mono text-xs uppercase tracking-wider text-stone-400 hover:text-red-500 transition-colors px-3 py-2 rounded-md border border-stone-200 ml-auto"
        >
          Reset
        </button>
      </div>
      <p className="font-mono text-[11px] text-stone-400 mt-2 leading-relaxed">
        Progress and logs save to this device only — export a backup now and then. Housetraining stays a
        separate, medical-first question.
      </p>
    </div>
  );
}
