# Feature icons evidence

Six concept teardowns for the home page "Production-ready infrastructure" cards (`src/components/pages/home/production.js`). Intended use: inline `<img>` at up to 240 × 168 px on white. Every object is a concept illustration; no dimension is authoritative.

| Icon | Feature group | Evidence | Construction |
| --- | --- | --- | --- |
| `scale` | Server blades, plinth, capacity arrow | Concept | Three rounded blades with drive bays and status LEDs lift off a plinth; the newest blade and the arrow carry the accent |
| `edge` | Globe, stand, edge locations | Concept | Graticule globe lifts off its stand; five edge nodes lift radially along dashed trails |
| `developer` | Editor window, code lines, agent badge | Concept | Window plate with title bar, code bars and a `</>` badge exploded toward the viewer |
| `programmable` | Substrate with gull-wing pins, die, heat spreader | Concept | Chip package exploded vertically; die carries the accent |
| `cache` | Three cache layers | Concept | Coaxial cylinders separated along Z, top layer accented |
| `security` | Lock body, shackle, key cylinder | Concept | Shackle lifts out of its body holes; key cylinder slides out of its bore along a trail |

All six share one camera (`azimuth -122, elevation 30, roll 0`) and the site palette from `src/theme`: `gray8` outlines, `gray7` edges, the brand `gradientStops` on accent linework, a `pink1` to `violet1` accent fill and a `violet3` glow, matching the pink/violet tinted tiles used across the home page. The test pins each color to its token.

## Rebuild and proof

```sh
npm run build:feature-icons
node scripts/build-feature-icons --proof=/tmp/feature-icons-proof
npm run test:integration -- test/integration/scripts/build-feature-icons.js
```

The generator runs `optimo` (the same step as the pre-commit hook), so its output is byte-identical to the committed files.

`teardown/` is vendored from the teardown skill (`geometry.js`, `projection.js`, `sheet.js`). The pre-commit prettier step reformats them; the logic is unchanged.
