import createClient from 'microlink.io'
import { mqlCode } from './mql-code'

export const FREE_FUNCTION_CODE_LIMIT = 1024

export const getSitemapUrls = `async ({ site }) => {
  const o = new URL('/robots.txt', site).href
  const r = await fetch(o)
  const href = (x, b) => {
    try {
      const u = new URL(x.trim().replace(/&amp;/g, '&'), b)
      return /^https?:$/.test(u.protocol) && u.href
    } catch {}
  }
  const maps = [...new Set(require('robots-parser')(o, r.ok ? await r.text() : '').getSitemaps().map(l => href(l, o)).filter(Boolean))]
  const seen = new Set(), urls = new Set()
  const walk = async u => {
    if (seen.has(u) || seen.size >= 1e3) return
    seen.add(u)
    try {
      const res = await fetch(u)
      if (!res.ok) return
      let m, re = /<loc>([^<]+)<\\/loc>/gi, b = Buffer.from(await res.arrayBuffer()), xml = (b[0]==31&&b[1]==139?require('zlib').gunzipSync(b):b).toString()
      while ((m = re.exec(xml))) {
        const h = href(m[1], u)
        h && (/\\.xml(\\.gz)?(\\?|#|$)/i.test(h) ? await walk(h) : urls.add(h))
      }
    } catch {}
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
