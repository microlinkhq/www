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

const SITE_URL = (() => {
  if (!process.env.NETLIFY) return 'http://localhost:8000'
  return process.env.DEPLOY_URL
})()

console.log('DEBUG', { SITE_URL })
console.log('DEBUG', { NETLIFY: process.env.NETLIFY })
console.log('DEBUG', { CONTEXT: process.env.CONTEXT })
console.log('DEBUG', { URL: process.env.URL })
console.log('DEBUG', { DEPLOY_URL: process.env.DEPLOY_URL })

module.exports = {
  ...process.env,
  SITE_URL
}
