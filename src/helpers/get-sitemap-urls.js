import createClient from 'microlink.io'
import { mqlCode } from './mql-code'

export const FREE_FUNCTION_CODE_LIMIT = 1024

export const getSitemapUrls = `async ({ site }) => {
  const parse = require('robots-parser')
  const robotsUrl = new URL('/robots.txt', site).href
  const r = await fetch(robotsUrl)
  const body = r.ok ? await r.text() : ''
  const sitemaps = [...new Set(parse(robotsUrl, body).getSitemaps().flatMap(loc => {
    try {
      const u = new URL(loc, robotsUrl)
      return u.protocol === 'http:' || u.protocol === 'https:' ? [u.href] : []
    } catch (e) { return [] }
  }))]
  const seen = new Set()
  const pages = new Set()
  const walk = async u => {
    if (seen.has(u) || seen.size > 1000) return
    seen.add(u)
    const res = await fetch(u)
    if (!res.ok) return
    const xml = await res.text()
    const re = /<loc>([^<]+)<\\/loc>/gi
    let m
    while ((m = re.exec(xml))) {
      const href = new URL(m[1].trim(), u).href
      if (/\\.xml$/i.test(new URL(href).pathname)) await walk(href)
      else pages.add(href)
    }
  }
  for (const s of sitemaps) await walk(s)
  return [...pages]
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
