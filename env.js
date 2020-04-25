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
const SITE_URL = process.env.DEPLOY_URL || process.env.NOW_URL || DEV_URL
const CANONICAL_URL = SITE_URL === DEV_URL ? DEV_URL : ALIAS_URL

module.exports = {
  ...process.env,
  SITE_URL,
  CANONICAL_URL
}
