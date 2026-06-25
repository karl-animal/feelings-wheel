# Bennie's Training

A mobile-first tracker for working a dog through his obedience curriculum and
logging practice sessions. Three courses (Puppy Manners, Basic Manners 3,
Beyond Basics), each split into weeks of exercises. Every exercise cycles
**not started → learning → solid** — advance on the criterion, not the calendar.

Built with Vite + React + TypeScript + Tailwind. Progress and session logs are
stored on-device (localStorage) behind a swappable storage interface.

## Features

- **Curriculum tracking** — three courses by week; tap an exercise to cycle its
  state, with a little pop + paw-print flourish when a behavior goes Solid.
- **Session log** — date, minutes, optional exercise tags, free-text notes;
  weekly stats and a history list with per-entry delete.
- **Trends** — minutes-per-week chart (Recharts), most-drilled exercises, and a
  "Learning — could use a session" list, all derived from session tags.
- **Nudges** — gentle, dismissable suggestions linking the log to progress
  (e.g. "logged 6 sessions on Watch, still Learning — bump it to Solid?").
  Tapping a nudge advances the state; nothing is ever auto-changed.
- **Backup / restore** — export/import JSON; see below.

## Local development

```bash
npm install
npm run dev
```

The dev server prints a local URL (default `http://localhost:5173/`). The app is
mobile-first; use your browser's device toolbar or open it on your phone via the
Network URL (`npm run dev -- --host`).

## Build

```bash
npm run build      # typecheck (tsc -b) + production build into dist/
npm run preview    # serve the production build locally
npm run typecheck  # types only, no emit
```

## Deploy

### GitHub Pages (configured)

A workflow at `.github/workflows/deploy.yml` builds and publishes to GitHub Pages
on every push to `main`. One-time setup: in the repo settings, **Settings → Pages
→ Build and deployment → Source: GitHub Actions**.

The Vite `base` path is set to `/feelings-wheel/` for production builds (it must
match the repo name so assets resolve under
`https://<user>.github.io/feelings-wheel/`). Dev and preview stay at `/`. If the
repo is ever renamed, update `base` in `vite.config.ts`.

### Vercel (alternative)

Vercel works out of the box as a static deploy (build `npm run build`, output
`dist`). It also becomes the natural choice **if you later want serverless
functions** for cross-device sync — see "Storage & sync" below. On Vercel the app
is served from the domain root, so set `base` back to `/` (or make it
conditional on a deploy-target env var).

## Backup / restore

Everything is stored locally to the browser, so back up now and then —
especially before clearing data or switching devices.

- **Export backup** downloads `bennie-backup-YYYY-MM-DD.json` containing
  `{ app, version, progress, sessions }`.
- **Import** reads that file back. It accepts the current format and the original
  app's exports (including a legacy progress-only file), so existing backups
  restore cleanly. Because import **replaces** your current data, it shows a
  confirmation first ("…replaces your current data with N exercises · M
  sessions") so nothing is overwritten silently.
- A **backup status line** tells you whether your data is backed up or has
  changed since the last export/import, with a relative timestamp.
- **Reset** clears all progress and logs (after a confirm). Export first.

Exported backups contain personal data and are git-ignored
(`bennie-backup-*.json`), so they're never accidentally committed.

## Storage & sync

The storage layer lives behind an async `TrainingStore` interface
(`src/storage/types.ts`). The current implementation is `LocalStorageStore`,
wired up in `src/storage/index.ts`. To add cross-device sync later, implement the
same interface against a backend and swap the single export in
`src/storage/index.ts` — no component changes required.

## Project structure

```
src/
  data/curriculum.ts     Typed COURSES data (~72 exercises) + lookups
  types.ts               Shared types (Exercise, Session, ProgressMap, …)
  storage/               TrainingStore interface + localStorage adapter
  hooks/useStore.ts      React hook bridging components ↔ storage
  lib/                   format, progress math, backup, state styling
  components/            Header, StatsCard, LogSessionForm, History,
                         CourseSection, DataControls, Bar
  App.tsx                Composition
```

## Notes

- Obedience track only — no housetraining features.
- Curriculum text is paraphrased and lives in code only; homework PDFs are never
  committed (git-ignored).
- Nothing is ever auto-marked solid; you advance each behavior yourself.
- Add-to-home-screen ready: a paw-print app icon (`public/`) and
  `manifest.webmanifest` provide the home-screen icon, name, and theme color.
  To regenerate the icons, edit and re-run the generator in your tooling of
  choice — they're plain PNGs derived from `favicon.svg`.
