import createClient from 'microlink.io'
import { mqlCode, sdkCall } from './mql-code'

export const FREE_FUNCTION_CODE_LIMIT = 1024

export const getSitemapUrls = `async ({ page }) => {
  // Discover sitemap URLs from this origin's robots.txt
  const { href: robotsUrl } = new URL('/robots.txt', page.url())
  const res = await fetch(robotsUrl)
  const body = res.ok ? await res.text() : ''
  const robotsParser = require('robots-parser')
  const sitemaps = robotsParser(robotsUrl, body).getSitemaps()

  // Walk nested sitemap indexes. \`fetcher\` is how each document is loaded.
  return require('xml-urls')(sitemaps, { fetcher: fetch })
}`

const microlink = createClient()

export const fetchSitemapUrls = async siteUrl => {
  const { isFulfilled, value } = await microlink.function(
    siteUrl,
    getSitemapUrls
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
    function: getSitemapUrls
  }).JavaScript

export const sitemapCardCode = siteUrl =>
  sdkCall(siteUrl, {
    function: getSitemapUrls
  })
