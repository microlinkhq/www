// Resolves a page's static OG card path. The cards themselves are rendered at
// build time by `@microlink/og/generate` (see `gatsby-node.js`) and written to
// `public/og/<slug>.png`; here we only compute where to point `og:image`.
//
// `slug` comes from `@microlink/og/sitemap` — a pure, dependency-free module,
// so this file is safe in the browser bundle (`Meta.js`).

import { slug } from '@microlink/og/sitemap'

// Pages that don't get a card (Gatsby internals: /404, dev-404, app shell).
const isOgPage = pathname =>
  !/^\/(404|dev-404-page|offline-plugin-app-shell-fallback)/.test(pathname)

// Static path for a page's card, or null when it shouldn't have one. Shared by
// the build generator and `Meta.js` so they always agree on what exists.
export const ogImagePath = pathname =>
  isOgPage(pathname) ? `/og/${slug(pathname)}.png` : null

// Absolute card URL for `<meta og:image>`, or null when there's no card.
export const ogImageUrl = (pathname, siteUrl) => {
  if (!pathname) return null
  const path = ogImagePath(pathname)
  return path ? `${siteUrl}${path}` : null
}
