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

// `og:image` must resolve to a real file. On Vercel previews the cards only
// exist on the preview host, so point the image base there; canonical/og:url
// stay on the production domain. Everywhere else it matches SITE_URL.
const previewHost = process.env.VERCEL_BRANCH_URL || process.env.VERCEL_URL
const OG_IMAGE_BASE =
  process.env.VERCEL_ENV === 'preview' && previewHost
    ? `https://${previewHost}`
    : SITE_URL

module.exports = {
  ...process.env,
  SITE_URL,
  CANONICAL_URL,
  OG_IMAGE_BASE
}
