import { Bar } from "./Bar";
import { fmtMin } from "../lib/format";

interface StatsCardProps {
  overall: number;
  weekSessions: number;
  weekMinutes: number;
  solidCount: number;
}

export function StatsCard({ overall, weekSessions, weekMinutes, solidCount }: StatsCardProps) {
  return (
    <div className="bg-white rounded-xl border border-stone-200 p-5 mb-5 shadow-sm">
      <div className="flex items-baseline justify-between mb-3">
        <span className="font-mono text-xs uppercase tracking-widest text-stone-500">Overall</span>
        <span className="font-mono text-2xl font-bold tabular-nums">{overall}%</span>
      </div>
      <Bar pct={overall} />
      <div className="grid grid-cols-3 gap-2 mt-4 text-center">
        <div>
          <div className="font-mono text-lg font-bold tabular-nums">{weekSessions}</div>
          <div className="font-mono text-[10px] uppercase tracking-wider text-stone-400">sessions / wk</div>
        </div>
        <div>
          <div className="font-mono text-lg font-bold tabular-nums">{fmtMin(weekMinutes)}</div>
          <div className="font-mono text-[10px] uppercase tracking-wider text-stone-400">time / wk</div>
        </div>
        <div>
          <div className="font-mono text-lg font-bold tabular-nums">{solidCount}</div>
          <div className="font-mono text-[10px] uppercase tracking-wider text-stone-400">solid</div>
        </div>
      </div>
    </div>
  );
}
