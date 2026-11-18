'use strict'

const path = require('path')

const ANALYTICS_URL = 'https://analytics.microlink.io?domain=microlink.io'
const CLOUDFLARE_NETWORK_URL = 'https://www.cloudflare.com/network/'
const FALLBACK_CDN_EDGES = 330
const DIST = path.resolve(__dirname, '../../../data/analytics.json')

const SIGNIFICANT_DIGITS = 2
const UNITS = [
  { value: 1e9, suffix: 'B' },
  { value: 1e6, suffix: 'M' },
  { value: 1e3, suffix: 'K' },
  { value: 1, suffix: '' }
]

const floorToSignificantDigits = value => {
  const step = 10 ** (Math.floor(Math.log10(value)) - SIGNIFICANT_DIGITS + 1)
  return Math.floor(value / step) * step
}

const roundPretty = reqs => {
  if (!Number.isFinite(reqs) || reqs < 1) {
    throw new Error('ANALYTICS_REQS_UNEXPECTED')
  }
  const floored = floorToSignificantDigits(reqs)
  const { value, suffix } = UNITS.find(({ value }) => floored >= value)
  return `${Number((floored / value).toPrecision(SIGNIFICANT_DIGITS))}${suffix}`
}

const parseCdnEdges = html => {
  const match = html.match(/(\d[\d,]*)\s*cities\b[^\d]{0,20}?(\d+)\s*regions/i)
  if (match === null) throw new Error('CDN_EDGES_NOT_FOUND')
  return Number(match[1].replace(/,/g, ''))
}

const fetchAnalytics = async () => {
  const res = await fetch(ANALYTICS_URL)
  const data = await res.json()
  const lastMonth = Object.keys(data.byMonth)[1]
  return data.byMonth[lastMonth]
}

const fetchCdnEdges = async () => {
  try {
    const res = await fetch(CLOUDFLARE_NETWORK_URL)
    return parseCdnEdges(await res.text())
  } catch {
    return FALLBACK_CDN_EDGES
  }
}

module.exports = () =>
  require('../create-provider').fromCode(
    async () => {
      const [analytics, cdnEdges] = await Promise.all([
        fetchAnalytics(),
        fetchCdnEdges()
      ])
      return [
        {
          ...analytics,
          reqs_pretty: roundPretty(analytics.reqs),
          cdn_edges: cdnEdges
        }
      ]
    },
    { dist: DIST }
  )

module.exports.dist = DIST
module.exports.roundPretty = roundPretty
module.exports.parseCdnEdges = parseCdnEdges
