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

// Base host for `og:image`, which must resolve to a real card file: the
// canonical domain in production, the deployment's own host on a preview (the
// cards live only there), and empty everywhere else so callers fall back to the
// banner instead of a 404. `gatsby develop` doesn't generate cards, so it must
// stay empty even if VERCEL_URL leaked into the local env (e.g. `vercel env
// pull`) — hence the explicit `isDev` guard. Canonical/og:url stay on
// production. VERCEL_URL (unique per deployment) is preferred over
// VERCEL_BRANCH_URL (a branch alias that floats to the latest deploy).
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
