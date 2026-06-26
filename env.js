'use strict'

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development'
}

if (!process.env.CDN_URL) {
  process.env.CDN_URL = 'https://cdn.microlink.io'
}

if (process.env.NODE_ENV === 'development') {
  ;['STRIPE_KEY', 'PAYMENT_API_KEY', 'PAYMENT_ENDPOINT'].forEach(
    key => (process.env[key] = process.env[key] || 'stub')
  )
}

const required = [
  'CDN_URL',
  'STRIPE_KEY',
  'PAYMENT_API_KEY',
  'PAYMENT_ENDPOINT'
]

const missing = required.filter(key => process.env[key] == null)

if (missing.length > 0) {
  throw new Error(
    `Missing required environment variable(s): ${missing.join(', ')}`
  )
}

const DEV_URL = 'http://localhost:8000'
const ALIAS_URL = 'https://microlink.io'
const isDev = process.env.NODE_ENV === 'development'

const SITE_URL = isDev
  ? DEV_URL
  : process.env.DEPLOY_URL || process.env.NOW_URL || ALIAS_URL

const CANONICAL_URL = isDev ? DEV_URL : ALIAS_URL

// `og:image` must resolve to a real file. The cards are only written by
// `gatsby build`, so the base is whatever host actually serves them:
//   - production  → the canonical domain (SITE_URL)
//   - preview     → that deployment's own host (the cards live only there)
//   - anything else (dev, or a preview with no host) → empty, so callers fall
//     back to the default banner instead of a URL that 404s.
// Canonical / og:url always stay on the production domain.
//
// Prefer VERCEL_URL (unique per deployment) over VERCEL_BRANCH_URL (a branch
// alias that floats to the latest deploy) so a card always resolves to the
// exact deployment that generated it.
const previewHost = process.env.VERCEL_URL || process.env.VERCEL_BRANCH_URL
const OG_IMAGE_BASE = isDev
  ? ''
  : process.env.VERCEL_ENV === 'production'
    ? SITE_URL
    : previewHost
      ? `https://${previewHost}`
      : ''

module.exports = {
  ...process.env,
  SITE_URL,
  CANONICAL_URL,
  OG_IMAGE_BASE
}
