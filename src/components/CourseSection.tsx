import { useState } from "react";
import type { Course, ProgressMap } from "../types";
import { Bar } from "./Bar";
import { STATES } from "../lib/states";
import { pctOf, solidOf } from "../lib/progress";

interface CourseSectionProps {
  course: Course;
  progress: ProgressMap;
  onCycle: (id: string) => void;
}

export function CourseSection({ course, progress, onCycle }: CourseSectionProps) {
  const [open, setOpen] = useState(false);
  const ids = course.weeks.flatMap((w) => w.ex.map((e) => e.id));

  return (
    <section className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-5 py-4 flex items-center gap-3 hover:bg-stone-50 transition-colors focus:outline-none focus:bg-stone-50"
      >
        <div className="flex-1">
          <div className="flex items-baseline justify-between gap-2">
            <h2 className="text-lg font-bold tracking-tight">{course.name}</h2>
            <span className="font-mono text-xs text-stone-400 whitespace-nowrap tabular-nums">
              {solidOf(progress, ids)}/{ids.length} · {pctOf(progress, ids)}%
            </span>
          </div>
          <p className="font-mono text-[11px] uppercase tracking-wider text-stone-400 mt-0.5">{course.source}</p>
          <Bar pct={pctOf(progress, ids)} className="mt-2" />
        </div>
        <span className={`text-stone-400 transition-transform duration-200 ${open ? "rotate-90" : ""}`}>▶</span>
      </button>

      {open && (
        <div className="border-t border-stone-100">
          {course.weeks.map((w) => (
            <div key={w.num}>
              <div className="px-5 pt-3 pb-1 flex items-baseline gap-2">
                <span className="font-mono text-xs font-bold text-stone-300">WEEK</span>
                <span className="font-mono text-sm font-bold text-stone-500 tabular-nums">{w.num}</span>
              </div>
              <ul className="divide-y divide-stone-100">
                {w.ex.map((e) => {
                  const st = progress[e.id] || 0;
                  const s = STATES[st];
                  return (
                    <li key={e.id}>
                      <button
                        onClick={() => onCycle(e.id)}
                        className="w-full text-left px-5 py-3 flex items-start gap-3 hover:bg-stone-50 transition-colors focus:outline-none focus:bg-stone-50"
                      >
                        <span
                          className={`mt-0.5 h-6 w-6 shrink-0 rounded-full ${s.dot} ${
                            st ? "ring-2 ring-offset-1 " + s.ring : ""
                          } flex items-center justify-center text-white text-xs font-bold transition-all`}
                        >
                          {st === 2 ? "✓" : ""}
                        </span>
                        <span className="flex-1 min-w-0">
                          <span className="flex items-baseline justify-between gap-2">
                            <span className={`font-medium ${st === 2 ? "text-stone-400 line-through" : "text-stone-900"}`}>
                              {e.name}
                            </span>
                            <span className={`font-mono text-[10px] uppercase tracking-wider whitespace-nowrap ${s.text}`}>
                              {s.tag}
                            </span>
                          </span>
                          <span className="block text-xs text-stone-500 mt-0.5 leading-snug">{e.note}</span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
