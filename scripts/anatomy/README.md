# Anatomy figures

The isometric figures on `/manifesto` are generated, not hand-written. Each one is a small machine whose motion is the principle it illustrates.

```bash
npm run build:figures
```

That writes `src/components/pages/manifesto/figures/<id>.json` (the plate markup and the numbers its motion needs) plus `manifest.json` (what the page renders before a figure loads). Commit the JSON together with the source change. `test/integration/components/pages/manifesto/figures.js` rebuilds into a temp directory and fails when the committed JSON is stale.

## Layout

| Path | Role |
| --- | --- |
| `kit/` | Vendored `iso-kit.mjs` and `lathe.mjs` from the anatomy skill (MIT, see `kit/LICENSE`). Not linted, do not edit. |
| `scene.mjs` | Shared camera fit and the base plate, ruler and label plate every figure stands on. |
| `figures/<id>.mjs` | One figure: its world layout, parts in painter's order, and the `motion` data. |
| `build.mjs` | Renders every figure. `--only=<id>` builds one, `--out <dir>` writes elsewhere, `--preview <dir>` also writes standalone HTML pages for review. |

The page side lives in `src/components/pages/manifesto/anatomy/`: `figure.js` loads each figure's JSON when it comes near the viewport, `use-figure-timeline.js` runs the tour, pointer scrub, arrow keys and reduced motion, and `motion/<id>.js` poses the parts for a given time.

## Rules a figure follows

- Moving parts are `<g data-part>` groups moved by `transform`. Rotations of flat parts use `planeRotation` from `motion/timing.js`, which is exact for a rotation inside the plane the part lies in.
- Every number the readout shows comes from the same model that moves the parts.
- Before committing, run the skill's line check on a preview page: `node ~/.claude/skills/anatomy/scripts/lines.mjs <preview>.html` must print `line ends: 0`.
