// Visual treatment for each progress state. Teal = solid, amber = learning.
export interface StateStyle {
  tag: string;
  dot: string;
  text: string;
  ring: string;
}

export const STATES: StateStyle[] = [
  { tag: "Not started", dot: "bg-stone-300", text: "text-stone-400", ring: "" },
  { tag: "Learning", dot: "bg-amber-400", text: "text-amber-700", ring: "ring-amber-300" },
  { tag: "Solid", dot: "bg-teal-600", text: "text-teal-800", ring: "ring-teal-400" },
];
