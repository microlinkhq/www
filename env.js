'use strict'

const envError = propName =>
  new TypeError(`Need to declare a ${propName}' env.`)

const {
  DEPLOY_URL,
  CONTEXT,
  NODE_ENV,
  URL,
  STRIPE_KEY,
  PAYMENT_API_KEY,
  PAYMENT_ENDPOINT,
  GOOGLE_ANALYTICS_ID
} = process.env

if (!STRIPE_KEY) throw envError('STRIPE_KEY')
if (!PAYMENT_API_KEY) throw envError('PAYMENT_API_KEY')
if (!PAYMENT_ENDPOINT) throw envError('PAYMENT_ENDPOINT')

const isProduction = NODE_ENV === 'production'

const SITE_URL = (() => {
  if (!isProduction) return 'http://localhost:8000'
  return CONTEXT === 'production' ? URL : DEPLOY_URL
})()

module.exports = {
  isProduction,
  DEPLOY_URL,
  CONTEXT,
  NODE_ENV,
  URL,
  STRIPE_KEY,
  PAYMENT_API_KEY,
  PAYMENT_ENDPOINT,
  GOOGLE_ANALYTICS_ID,
  SITE_URL
}
