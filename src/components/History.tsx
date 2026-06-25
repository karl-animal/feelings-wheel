import { useState } from "react";
import type { Session } from "../types";
import { EX_BY_ID } from "../data/curriculum";
import { fmtDate, fmtMin } from "../lib/format";

interface HistoryProps {
  sessions: Session[];
  totalMinutes: number;
  onDelete: (id: string) => void;
}

export function History({ sessions, totalMinutes, onDelete }: HistoryProps) {
  const [showAll, setShowAll] = useState(false);

  if (sessions.length === 0) return null;

  const visible = showAll ? sessions : sessions.slice(0, 4);

  return (
    <div className="bg-white rounded-xl border border-stone-200 p-5 mb-5 shadow-sm">
      <div className="flex items-baseline justify-between mb-3">
        <h2 className="font-mono text-xs uppercase tracking-widest text-stone-500">History</h2>
        <span className="font-mono text-[11px] text-stone-400">
          {sessions.length} logged · {fmtMin(totalMinutes)} total
        </span>
      </div>
      <ul className="space-y-3">
        {visible.map((s) => (
          <li key={s.id} className="border-b border-stone-100 last:border-0 pb-3 last:pb-0">
            <div className="flex items-baseline justify-between gap-2">
              <span className="font-medium text-sm">{fmtDate(s.date)}</span>
              <span className="font-mono text-xs text-stone-500 tabular-nums">{fmtMin(s.minutes)}</span>
              <button
                onClick={() => onDelete(s.id)}
                className="text-stone-300 hover:text-red-500 text-sm leading-none ml-1"
              >
                ×
              </button>
            </div>
            {s.exIds && s.exIds.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1.5">
                {s.exIds.map(
                  (id) =>
                    EX_BY_ID[id] && (
                      <span
                        key={id}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-stone-100 text-stone-600"
                      >
                        {EX_BY_ID[id].name}
                      </span>
                    )
                )}
              </div>
            )}
            {s.notes && <p className="text-xs text-stone-600 mt-1.5 leading-snug">{s.notes}</p>}
          </li>
        ))}
      </ul>
      {sessions.length > 4 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="font-mono text-[11px] uppercase tracking-wider text-teal-700 mt-3"
        >
          {showAll ? "Show less" : `Show all ${sessions.length}`}
        </button>
      )}
    </div>
  );
}
