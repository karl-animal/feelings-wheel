import { LocalStorageStore } from "./localStorageStore";
import type { TrainingStore } from "./types";

export type { TrainingStore } from "./types";

// Single place to swap the backing store. Replace this with a sync-backed
// adapter later and nothing else needs to change.
export const store: TrainingStore = new LocalStorageStore();
