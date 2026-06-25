import { useState } from "react";
import type { Session } from "../types";
import { COURSES } from "../data/curriculum";
import { todayStr } from "../lib/format";

interface LogSessionFormProps {
  onLog: (session: Session) => void;
  flash: (msg: string) => void;
  message: string;
}

export function LogSessionForm({ onLog, flash, message }: LogSessionFormProps) {
  const [date, setDate] = useState(todayStr());
  const [minutes, setMinutes] = useState("");
  const [notes, setNotes] = useState("");
  const [selEx, setSelEx] = useState<string[]>([]);
  const [tagOpen, setTagOpen] = useState(false);

  const toggleEx = (id: string) =>
    setSelEx((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const logSession = () => {
    const m = parseInt(minutes, 10);
    if (!m || m <= 0) {
      flash("Add a duration first.");
      return;
    }
    onLog({
      id: Date.now().toString(36),
      date,
      minutes: m,
      exIds: selEx,
      notes: notes.trim(),
    });
    setMinutes("");
    setNotes("");
    setSelEx([]);
    setTagOpen(false);
    flash("Session logged.");
  };

  return (
    <div className="bg-white rounded-xl border border-stone-200 p-5 mb-5 shadow-sm">
      <h2 className="font-mono text-xs uppercase tracking-widest text-stone-500 mb-3">Log a session</h2>
      <div className="flex gap-2 mb-2">
        <input
          type="date"
          value={date}
          max={todayStr()}
          onChange={(e) => setDate(e.target.value)}
          className="flex-1 min-w-0 border border-stone-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-teal-400"
        />
        <div className="flex items-center border border-stone-200 rounded-md px-3 py-2 focus-within:border-teal-400">
          <input
            type="number"
            inputMode="numeric"
            min="1"
            placeholder="0"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            className="w-12 text-sm text-right focus:outline-none tabular-nums"
          />
          <span className="text-sm text-stone-400 ml-1">min</span>
        </div>
      </div>

      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows={2}
        placeholder="What went well? What to revisit?"
        className="w-full border border-stone-200 rounded-md px-3 py-2 text-sm mb-2 focus:outline-none focus:border-teal-400 resize-none"
      />

      <button
        onClick={() => setTagOpen(!tagOpen)}
        className="font-mono text-[11px] uppercase tracking-wider text-stone-500 hover:text-teal-700 mb-2"
      >
        {tagOpen ? "▾ " : "▸ "}Tag exercises{selEx.length ? ` (${selEx.length})` : ""}
      </button>

      {tagOpen && (
        <div className="max-h-56 overflow-y-auto border border-stone-100 rounded-md p-2 mb-2 bg-stone-50">
          {COURSES.map((c) => (
            <div key={c.id} className="mb-2 last:mb-0">
              <div className="font-mono text-[10px] uppercase tracking-wider text-stone-400 px-1 mb-1">{c.name}</div>
              <div className="flex flex-wrap gap-1">
                {c.weeks
                  .flatMap((w) => w.ex)
                  .map((e) => {
                    const on = selEx.includes(e.id);
                    return (
                      <button
                        key={e.id}
                        onClick={() => toggleEx(e.id)}
                        className={`text-[11px] px-2 py-1 rounded-full border transition-colors ${
                          on
                            ? "bg-teal-600 text-white border-teal-600"
                            : "bg-white text-stone-600 border-stone-200 hover:border-teal-300"
                        }`}
                      >
                        {e.name}
                      </button>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={logSession}
        className="w-full font-mono text-xs uppercase tracking-wider text-white bg-teal-600 hover:bg-teal-700 transition-colors px-3 py-2.5 rounded-md"
      >
        Save session
      </button>
      {message && <p className="font-mono text-[11px] text-teal-700 mt-2">{message}</p>}
    </div>
  );
}
