// Resolves a page's static OG card path. The cards themselves are rendered at
// build time by `@microlink/og/generate` (see `gatsby-node.js`) and written to
// `public/og/<slug>.png`; here we only compute where to point `og:image`.
//
// `slug` comes from `@microlink/og/sitemap` — a pure, dependency-free module,
// so this file is safe in the browser bundle (`Meta.js`).

import { slug } from '@microlink/og/sitemap'

// Pages that don't get a card (Gatsby internals: /404, dev-404, app shell).
// The trailing boundary keeps real content routes that merely start with these
// names (e.g. /404-explained) eligible for a card.
const isOgPage = pathname =>
  !/^\/(404|dev-404-page|offline-plugin-app-shell-fallback)(\/|$)/.test(
    pathname
  )

// Static path for a page's card, or null when it shouldn't have one. Shared by
// the build generator and `Meta.js` so they always agree on what exists.
export const ogImagePath = pathname =>
  isOgPage(pathname) ? `/og/${slug(pathname)}.png` : null

// Absolute card URL for `<meta og:image>`, or null when there's no card or no
// base (e.g. `gatsby develop`, where the cards aren't generated — callers then
// fall back to the default banner).
export const ogImageUrl = (pathname, base) => {
  if (!pathname || !base) return null
  const path = ogImagePath(pathname)
  return path ? `${base}${path}` : null
}
