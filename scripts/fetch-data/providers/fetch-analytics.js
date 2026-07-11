'use strict'

const path = require('path')

const ANALYTICS_URL = 'https://analytics.microlink.io?domain=microlink.io'
const CLOUDFLARE_NETWORK_URL = 'https://www.cloudflare.com/network/'
const FALLBACK_CDN_EDGES = 330

const roundPretty = pretty => {
  const match = String(pretty).match(/^([\d.]+)(\D+)$/)
  if (match === null) throw new Error('ANALYTICS_PRETTY_UNEXPECTED')
  const [, value, unit] = match
  return `${Math.floor(Number(value) / 50) * 50}${unit}`
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
          reqs_pretty: roundPretty(analytics.reqs_pretty),
          cdn_edges: cdnEdges
        }
      ]
    },
    { dist: path.resolve(__dirname, '../../../data/analytics.json') }
  )

module.exports.roundPretty = roundPretty
module.exports.parseCdnEdges = parseCdnEdges
