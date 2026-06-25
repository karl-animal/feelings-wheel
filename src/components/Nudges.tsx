import { useMemo, useState } from "react";
import type { ProgressMap, Session } from "../types";
import { computeNudges } from "../lib/nudges";

const DISMISSED_KEY = "bennie-nudges-dismissed-v1";

function loadDismissed(): string[] {
  try {
    const raw = localStorage.getItem(DISMISSED_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

interface NudgesProps {
  progress: ProgressMap;
  sessions: Session[];
  onBump: (id: string) => void;
}

// Gentle, dismissable suggestions linking the session log to progress.
// Tapping an action advances the state; it never changes on its own.
export function Nudges({ progress, sessions, onBump }: NudgesProps) {
  const [dismissed, setDismissed] = useState<string[]>(loadDismissed);

  const nudges = useMemo(
    () => computeNudges(progress, sessions).filter((n) => !dismissed.includes(n.key)),
    [progress, sessions, dismissed]
  );

  const dismiss = (key: string) => {
    setDismissed((prev) => {
      const next = prev.includes(key) ? prev : [...prev, key];
      try {
        localStorage.setItem(DISMISSED_KEY, JSON.stringify(next));
      } catch {
        // non-fatal
      }
      return next;
    });
  };

  if (nudges.length === 0) return null;

  const visible = nudges.slice(0, 3);

  return (
    <div className="bg-white rounded-xl border border-teal-200 p-5 mb-5 shadow-sm">
      <div className="flex items-baseline justify-between mb-3">
        <h2 className="font-mono text-xs uppercase tracking-widest text-teal-700">Nudges</h2>
        {nudges.length > 3 && (
          <span className="font-mono text-[11px] text-stone-400">+{nudges.length - 3} more</span>
        )}
      </div>
      <ul className="space-y-3">
        {visible.map((n) => (
          <li key={n.key} className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500" />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-stone-700 leading-snug">{n.message}</p>
              <div className="flex items-center gap-3 mt-1.5">
                <button
                  onClick={() => onBump(n.id)}
                  className="font-mono text-[11px] uppercase tracking-wider text-white bg-teal-600 hover:bg-teal-700 transition-colors px-2.5 py-1 rounded-md"
                >
                  {n.action}
                </button>
                <button
                  onClick={() => dismiss(n.key)}
                  className="font-mono text-[11px] uppercase tracking-wider text-stone-400 hover:text-stone-600 transition-colors"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
