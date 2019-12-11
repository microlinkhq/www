'use strict'

const envError = propName =>
  new TypeError(`Need to declare a ${propName}' env.`)

const {
  DEPLOY_URL,
  CONTEXT,
  NODE_ENV = 'development',
  URL,
  STRIPE_KEY,
  PAYMENT_API_KEY,
  PAYMENT_ENDPOINT,
  GOOGLE_ANALYTICS_ID,
  CDN_URL = 'https://cdn.microlink.io'
} = process.env

if (!CDN_URL) throw envError('CDN_URL')
if (!STRIPE_KEY) throw envError('STRIPE_KEY')
if (!PAYMENT_API_KEY) throw envError('PAYMENT_API_KEY')
if (!PAYMENT_ENDPOINT) throw envError('PAYMENT_ENDPOINT')

const isProduction = NODE_ENV === 'production'

const SITE_URL = (() => {
  if (!isProduction) return 'http://localhost:8000'
  return CONTEXT === 'production' ? URL : DEPLOY_URL
})()

module.exports = {
  CDN_URL,
  CONTEXT,
  DEPLOY_URL,
  GOOGLE_ANALYTICS_ID,
  isProduction,
  NODE_ENV,
  PAYMENT_API_KEY,
  PAYMENT_ENDPOINT,
  SITE_URL,
  STRIPE_KEY,
  URL
}
