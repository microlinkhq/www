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
  GOOGLE_ANALYTICS_ID
} = process.env

if (!STRIPE_KEY) throw envError('STRIPE_KEY')
if (!PAYMENT_API_KEY) throw envError('PAYMENT_API_KEY')
if (!PAYMENT_ENDPOINT) throw envError('PAYMENT_ENDPOINT')

const isProduction = NODE_ENV === 'production'

const SITE_URL = (() => {
  return 'http://localhost:8000'
  return CONTEXT === 'production' ? URL : DEPLOY_URL
})()

module.exports = {
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
