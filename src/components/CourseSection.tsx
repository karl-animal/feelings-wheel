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

// A few paw prints that float up when a behavior is marked Solid.
const PAWS = [
  { left: "-2px", rot: "-18deg", delay: "0ms" },
  { left: "8px", rot: "10deg", delay: "70ms" },
  { left: "18px", rot: "-6deg", delay: "140ms" },
];

export function CourseSection({ course, progress, onCycle }: CourseSectionProps) {
  const [open, setOpen] = useState(false);
  // Exercise id currently playing its change animation, and whether it just
  // hit Solid (which also triggers the paw burst).
  const [pop, setPop] = useState<{ id: string; solid: boolean } | null>(null);
  const ids = course.weeks.flatMap((w) => w.ex.map((e) => e.id));

  const handleCycle = (id: string) => {
    const nextState = ((progress[id] ?? 0) + 1) % 3;
    onCycle(id);
    setPop({ id, solid: nextState === 2 });
    window.setTimeout(() => setPop((p) => (p && p.id === id ? null : p)), 700);
  };

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
                  const isPopping = pop?.id === e.id;
                  return (
                    <li key={e.id}>
                      <button
                        onClick={() => handleCycle(e.id)}
                        className="w-full text-left px-5 py-3 flex items-start gap-3 hover:bg-stone-50 transition-colors focus:outline-none focus:bg-stone-50"
                      >
                        <span className="relative mt-0.5 shrink-0 h-6 w-6">
                          <span
                            className={`h-6 w-6 rounded-full ${s.dot} ${
                              st ? "ring-2 ring-offset-1 " + s.ring : ""
                            } flex items-center justify-center text-white text-xs font-bold transition-all ${
                              isPopping ? "animate-pop" : ""
                            }`}
                          >
                            {st === 2 ? "✓" : ""}
                          </span>
                          {isPopping && pop?.solid && (
                            <span className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2">
                              {PAWS.map((p, i) => (
                                <span
                                  key={i}
                                  className="paw"
                                  style={{ left: p.left, animationDelay: p.delay, ["--paw-rot" as string]: p.rot }}
                                >
                                  🐾
                                </span>
                              ))}
                            </span>
                          )}
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
