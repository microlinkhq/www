import createClient from 'microlink.io'
import { mqlCode } from './mql-code'

export const FREE_FUNCTION_CODE_LIMIT = 1024

export const getSitemapUrls = `async ({ site }) => {
  const parse = require('robots-parser')
  const origin = new URL('/robots.txt', site).href
  const r = await fetch(origin)
  const maps = [...new Set(parse(origin, r.ok ? await r.text() : '').getSitemaps().flatMap(loc => {
    try {
      const u = new URL(loc, origin)
      return /^https?:$/.test(u.protocol) ? [u.href] : []
    } catch (e) { return [] }
  }))]
  const seen = new Set(), urls = new Set()
  const walk = async u => {
    if (seen.has(u) || seen.size > 1000) return
    seen.add(u)
    try {
      const res = await fetch(u)
      if (!res.ok) return
      let m, re = /<loc>([^<]+)<\\/loc>/gi, xml = await res.text()
      while ((m = re.exec(xml))) {
        try {
          const href = new URL(m[1].trim(), u).href
          /\\.xml(\\.gz)?(\\?|#|$)/i.test(href) ? await walk(href) : urls.add(href)
        } catch (e) {}
      }
    } catch (e) {}
  }
  for (const s of maps) await walk(s)
  return [...urls]
}`

const microlink = createClient()

export const fetchSitemapUrls = async siteUrl => {
  const { isFulfilled, value } = await microlink.function(
    siteUrl,
    getSitemapUrls,
    { site: siteUrl }
  )

  if (!isFulfilled) {
    const error = new Error(value?.message || 'Function failed.')
    error.name = value?.name || 'Error'
    error.code = value?.name
    throw error
  }

  return Array.isArray(value) ? value : []
}

export const sitemapSdkSnippet = siteUrl =>
  mqlCode(siteUrl, {
    function: getSitemapUrls,
    site: siteUrl
  }).JavaScript
