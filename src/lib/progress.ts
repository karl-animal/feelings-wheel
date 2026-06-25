import type { ProgressMap } from "../types";

// Weighted completion: solid counts full, learning counts half.
export function pctOf(progress: ProgressMap, ids: string[]): number {
  if (ids.length === 0) return 0;
  const solid = ids.filter((id) => progress[id] === 2).length;
  const learning = ids.filter((id) => progress[id] === 1).length;
  return Math.round(((solid + learning * 0.5) / ids.length) * 100);
}

export function solidOf(progress: ProgressMap, ids: string[]): number {
  return ids.filter((id) => progress[id] === 2).length;
}
