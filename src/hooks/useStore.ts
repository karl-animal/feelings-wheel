import { useCallback, useEffect, useState } from "react";
import type { ProgressMap, ProgressState, Session } from "../types";
import { store } from "../storage";

// Wraps the storage layer so components never touch persistence directly.
// State updates are applied optimistically in memory and written through to
// the store; swapping in an async backend later changes only ./storage.
export function useStore() {
  const [progress, setProgress] = useState<ProgressMap>({});
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let alive = true;
    store.load().then((state) => {
      if (!alive) return;
      setProgress(state.progress);
      setSessions(state.sessions);
      setLoaded(true);
    });
    return () => {
      alive = false;
    };
  }, []);

  const commitProgress = useCallback((next: ProgressMap) => {
    setProgress(next);
    void store.saveProgress(next);
  }, []);

  const commitSessions = useCallback((next: Session[]) => {
    setSessions(next);
    void store.saveSessions(next);
  }, []);

  // Cycle an exercise: not started -> learning -> solid -> not started.
  const cycleExercise = useCallback(
    (id: string) => {
      setProgress((prev) => {
        const next = { ...prev, [id]: (((prev[id] ?? 0) + 1) % 3) as ProgressState };
        void store.saveProgress(next);
        return next;
      });
    },
    []
  );

  const addSession = useCallback((session: Session) => {
    setSessions((prev) => {
      const next = [session, ...prev].sort((a, b) => (a.date < b.date ? 1 : -1));
      void store.saveSessions(next);
      return next;
    });
  }, []);

  const deleteSession = useCallback((id: string) => {
    setSessions((prev) => {
      const next = prev.filter((s) => s.id !== id);
      void store.saveSessions(next);
      return next;
    });
  }, []);

  const resetAll = useCallback(() => {
    commitProgress({});
    commitSessions([]);
  }, [commitProgress, commitSessions]);

  return {
    loaded,
    progress,
    sessions,
    cycleExercise,
    addSession,
    deleteSession,
    commitProgress,
    commitSessions,
    resetAll,
  };
}
