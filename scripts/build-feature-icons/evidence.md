# Feature icons evidence

Six concept teardowns for the home page "Production-ready infrastructure" cards (`src/components/pages/home/production.js`). Intended use: an inline SVG at up to 240 × 168 px on a white card. Every object is a concept illustration; no dimension is authoritative.

| Icon | Feature group | Evidence | Construction |
| --- | --- | --- | --- |
| `scale` | Server blades, plinth, capacity arrow | Concept | Three rounded blades with drive bays and status LEDs lift off a plinth; the newest blade and the arrow carry the accent |
| `edge` | Globe, stand, edge locations | Concept | Graticule globe lifts off its stand; five edge nodes lift radially off the globe |
| `developer` | Editor window, code lines, agent badge | Concept | Window plate with title bar, code bars and a `</>` badge exploded toward the viewer |
| `programmable` | Substrate with gull-wing pins, die, heat spreader | Concept | Chip package exploded vertically; die carries the accent |
| `cache` | Three cache layers | Concept | Coaxial cylinders separated along Z, top layer accented |
| `security` | Lock body, shackle, key cylinder | Concept | Shackle lifts out of its body holes; key cylinder slides out of its bore |

All six share one camera (`azimuth -122, elevation 30, roll 0`). The generator writes geometry only, to `src/components/pages/home/feature-icons/geometry.json`: per icon a viewBox sized for the 240 × 168 px card box, a glow ellipse, and its parts in far-to-near paint order. Each part carries its own silhouette fill, its self-occluded linework per line role (relative path data, 0.1 unit precision) and its hover shift, the projected explosion vector times `HOVER_SPREAD`.

Each part is rendered isolated, so occlusion between parts comes from painter's order with opaque fills instead of clipped linework. That is what lets a part slide on hover without exposing gaps where a neighbor used to hide it.

`FeatureIcon` (`src/components/pages/home/feature-icons/index.js`) owns the look: `gray8` outlines, `gray7` edges, the brand `gradientStops` on accent linework, a `pink1` to `violet1` accent fill and a `violet3` glow, all read from `src/theme`. Hovering a card (`data-feature-card`) slides each part that already has an assembly offset further along that axis, with a 40 ms stagger. A part with no offset, such as the plinth or the lock body, stays put. The motion is gated on `(hover: hover) and (pointer: fine)` and `prefers-reduced-motion: no-preference`.

## Rebuild and proof

```sh
npm run build:feature-icons
npm run storybook
npm run test:integration -- test/integration/scripts/build-feature-icons.js
```

The story `Pages/Home/Feature icons` renders the real Production section, so hover states can be checked in a browser.

`teardown/` is vendored from the teardown skill (`geometry.js`, `projection.js`, `sheet.js`). The pre-commit prettier step reformats them; the logic is unchanged.
