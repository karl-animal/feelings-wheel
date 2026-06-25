import { Suspense, lazy, useMemo, useState } from "react";
import { COURSES, ALL_EXERCISE_IDS } from "./data/curriculum";
import { useStore } from "./hooks/useStore";
import { pctOf, solidOf } from "./lib/progress";
import { weekStartStr } from "./lib/format";
import { Header } from "./components/Header";
import { StatsCard } from "./components/StatsCard";
import { LogSessionForm } from "./components/LogSessionForm";
import { History } from "./components/History";
import { Nudges } from "./components/Nudges";
import { CourseSection } from "./components/CourseSection";

// Recharts is heavy, so the Trends card is code-split and loaded on demand.
const Trends = lazy(() =>
  import("./components/Trends").then((m) => ({ default: m.Trends }))
);
import { DataControls } from "./components/DataControls";

export default function App() {
  const {
    progress,
    sessions,
    cycleExercise,
    addSession,
    deleteSession,
    commitProgress,
    commitSessions,
    resetAll,
  } = useStore();

  const [msg, setMsg] = useState("");
  const flash = (t: string) => {
    setMsg(t);
    setTimeout(() => setMsg(""), 2500);
  };

  const overall = pctOf(progress, ALL_EXERCISE_IDS);
  const solidCount = solidOf(progress, ALL_EXERCISE_IDS);

  const { weekSessions, weekMinutes, totalMinutes } = useMemo(() => {
    const wkStart = weekStartStr();
    const week = sessions.filter((s) => s.date >= wkStart);
    return {
      weekSessions: week.length,
      weekMinutes: week.reduce((a, s) => a + (s.minutes || 0), 0),
      totalMinutes: sessions.reduce((a, s) => a + (s.minutes || 0), 0),
    };
  }, [sessions]);

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900">
      <div className="max-w-2xl mx-auto px-5 py-8">
        <Header />

        <StatsCard
          overall={overall}
          weekSessions={weekSessions}
          weekMinutes={weekMinutes}
          solidCount={solidCount}
        />

        <LogSessionForm onLog={addSession} flash={flash} message={msg} />

        <Nudges progress={progress} sessions={sessions} onBump={cycleExercise} />

        <Suspense
          fallback={
            <div className="bg-white rounded-xl border border-stone-200 p-5 mb-5 shadow-sm h-44 animate-pulse" />
          }
        >
          <Trends sessions={sessions} progress={progress} />
        </Suspense>

        <History sessions={sessions} totalMinutes={totalMinutes} onDelete={deleteSession} />

        <div className="space-y-4">
          {COURSES.map((c) => (
            <CourseSection key={c.id} course={c} progress={progress} onCycle={cycleExercise} />
          ))}
        </div>

        <DataControls
          progress={progress}
          sessions={sessions}
          onImportProgress={commitProgress}
          onImportSessions={commitSessions}
          onReset={resetAll}
          flash={flash}
        />
      </div>
    </div>
  );
}
