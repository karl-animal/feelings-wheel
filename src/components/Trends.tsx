import { useMemo } from "react";
import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { ProgressMap, Session } from "../types";
import { ALL_EXERCISE_IDS, EX_BY_ID } from "../data/curriculum";
import { exerciseDrillCounts, neglectedLearning, weeklyMinutes } from "../lib/stats";
import { fmtMin } from "../lib/format";

interface TrendsProps {
  sessions: Session[];
  progress: ProgressMap;
}

const TEAL = "#0d9488";
const TEAL_DIM = "#99f6e4";

interface TipProps {
  active?: boolean;
  payload?: { payload: { label: string; minutes: number; sessions: number } }[];
}

function ChartTip({ active, payload }: TipProps) {
  if (!active || !payload || !payload.length) return null;
  const d = payload[0].payload;
  return (
    <div className="rounded-md border border-stone-200 bg-white px-2 py-1 shadow-sm">
      <div className="font-mono text-[10px] uppercase tracking-wider text-stone-400">Week of {d.label}</div>
      <div className="font-mono text-xs text-stone-700 tabular-nums">
        {fmtMin(d.minutes)} · {d.sessions} {d.sessions === 1 ? "session" : "sessions"}
      </div>
    </div>
  );
}

export function Trends({ sessions, progress }: TrendsProps) {
  const weeks = useMemo(() => weeklyMinutes(sessions, 8), [sessions]);
  const drills = useMemo(() => exerciseDrillCounts(sessions), [sessions]);

  const mostDrilled = useMemo(
    () =>
      [...drills.values()]
        .sort((a, b) => b.count - a.count || b.minutes - a.minutes)
        .slice(0, 6),
    [drills]
  );

  const neglected = useMemo(
    () => neglectedLearning(progress, drills, ALL_EXERCISE_IDS).slice(0, 6),
    [progress, drills]
  );

  const hasSessions = sessions.length > 0;
  const maxCount = mostDrilled.length ? mostDrilled[0].count : 0;
  const peakWeek = weeks.reduce((m, w) => Math.max(m, w.minutes), 0);

  return (
    <div className="bg-white rounded-xl border border-stone-200 p-5 mb-5 shadow-sm">
      <div className="flex items-baseline justify-between mb-3">
        <h2 className="font-mono text-xs uppercase tracking-widest text-stone-500">Trends</h2>
        <span className="font-mono text-[11px] text-stone-400">last 8 weeks</span>
      </div>

      {!hasSessions ? (
        <p className="text-sm text-stone-500 leading-relaxed">
          Log a few sessions and your weekly minutes and most-practiced behaviors will show up here.
        </p>
      ) : (
        <>
          {/* Minutes per week */}
          <div className="font-mono text-[10px] uppercase tracking-wider text-stone-400 mb-2">
            Minutes / week
          </div>
          <div className="h-44 -ml-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeks} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
                <XAxis
                  dataKey="label"
                  tick={{ fontSize: 10, fontFamily: "monospace", fill: "#a8a29e" }}
                  axisLine={{ stroke: "#e7e5e4" }}
                  tickLine={false}
                  interval={0}
                />
                <YAxis
                  width={28}
                  tick={{ fontSize: 10, fontFamily: "monospace", fill: "#a8a29e" }}
                  axisLine={false}
                  tickLine={false}
                  allowDecimals={false}
                />
                <Tooltip content={<ChartTip />} cursor={{ fill: "#f5f5f4" }} />
                <Bar dataKey="minutes" radius={[3, 3, 0, 0]}>
                  {weeks.map((w) => (
                    <Cell key={w.start} fill={w.minutes === peakWeek && peakWeek > 0 ? TEAL : TEAL_DIM} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Most drilled */}
          <div className="font-mono text-[10px] uppercase tracking-wider text-stone-400 mt-4 mb-2">
            Most drilled
          </div>
          <ul className="space-y-1.5">
            {mostDrilled.map((d) => (
              <li key={d.id} className="flex items-center gap-2">
                <span className="flex-1 min-w-0 truncate text-sm text-stone-700">
                  {EX_BY_ID[d.id]?.name ?? d.id}
                </span>
                <span className="shrink-0 h-1.5 rounded-full bg-teal-500" style={{ width: `${(d.count / maxCount) * 48 + 8}px` }} />
                <span className="shrink-0 whitespace-nowrap font-mono text-[11px] text-stone-400 tabular-nums text-right">
                  {d.count}× · {fmtMin(d.minutes)}
                </span>
              </li>
            ))}
          </ul>

          {/* Neglected / could use a session */}
          {neglected.length > 0 && (
            <>
              <div className="font-mono text-[10px] uppercase tracking-wider text-stone-400 mt-4 mb-2">
                Learning — could use a session
              </div>
              <div className="flex flex-wrap gap-1.5">
                {neglected.map((d) => (
                  <span
                    key={d.id}
                    className="text-[11px] px-2 py-1 rounded-full border border-amber-200 bg-amber-50 text-amber-800"
                  >
                    {EX_BY_ID[d.id]?.name ?? d.id}
                    <span className="font-mono text-amber-500 ml-1 tabular-nums">{d.count}×</span>
                  </span>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
