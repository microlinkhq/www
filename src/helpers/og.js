// Build-time OG cards are written to `public/images/og/<slug>.png` and served
// as plain static files at `/images/og/<slug>.png` — the same space as other
// `/images/*` assets. `@microlink/og`'s `imagePath` returns `/og/<slug>.png`
// (or null for pages that don't get a card, e.g. Gatsby internals); we serve
// it under `/images`.
import { imagePath } from '@microlink/og'

export const ogImageUrl = (pathname, base) => {
  const path = imagePath(pathname)
  return base && path ? `${base}/images${path}` : null
}
