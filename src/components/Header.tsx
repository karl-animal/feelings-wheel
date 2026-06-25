export function Header() {
  return (
    <header className="mb-6">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-stone-500 mb-2">Training log</p>
      <h1 className="text-4xl font-bold tracking-tight leading-none mb-3">Bennie's training</h1>
      <p className="text-sm text-stone-600 leading-relaxed">
        Built from Kevin Duggan's LASPCA curriculum. Advance on the criterion, not the calendar.
        Log each session below; mark behaviors solid in the courses further down.
      </p>
    </header>
  );
}
