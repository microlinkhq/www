'use strict'

const { writeFile } = require('fs').promises
const { once } = require('events')
const http = require('http')

const listen = async (server, ...args) => {
  server.listen(...args)
  await once(server, 'listening')
  const { address, port, family } = server.address()
  return `http://${family === 'IPv6' ? `[${address}]` : address}:${port}/`
}

const createServer = ({ helmet, withHelmet = false } = {}) =>
  http.createServer((req, res) => {
    const fn = withHelmet ? helmet : (req, res, next) => next()
    fn(req, res, err => {
      if (err) {
        res.statusCode = 500
        res.end(
          'Helmet failed for some unexpected reason. Was it configured correctly?'
        )
        return
      }
      res.end('Hello world!')
    })
  })

const getSecurityHeaders = async () => {
  const helmet = require('helmet')()

  let server = createServer({ helmet, withHelmet: false })

  let serverUrl = await listen(server)

  let res = await fetch(serverUrl)
  const headers = Object.fromEntries(res.headers)

  server.close()

  server = createServer({ helmet, withHelmet: true })
  serverUrl = await listen(server)

  res = await fetch(serverUrl)
  const headersWithHelmet = Object.fromEntries(res.headers)

  server.close()

  const diff = Object.fromEntries(
    Object.entries(headersWithHelmet).filter(
      ([key, value]) => headers[key] !== value
    )
  )

  return Object.entries(diff).map(([key, value]) => ({ key, value }))
}

const mergeHeaders = (existing, incoming) => {
  const replacements = new Map(incoming.map(header => [header.key, header]))
  const merged = existing.map(header => replacements.get(header.key) ?? header)
  const present = new Set(merged.map(({ key }) => key))
  return [...merged, ...incoming.filter(({ key }) => !present.has(key))]
}

const main = async () => {
  const SOURCE_PATTERN = '/(.*)'
  const headers = await getSecurityHeaders()

  const vercelJSON = require('../vercel.json')

  if (!vercelJSON.headers) {
    vercelJSON.headers = [
      {
        source: SOURCE_PATTERN,
        headers
      }
    ]
  } else {
    const rule = vercelJSON.headers.find(rule => rule.source === SOURCE_PATTERN)
    if (!rule) vercelJSON.headers.push({ source: SOURCE_PATTERN, headers })
    else rule.headers = mergeHeaders(rule.headers, headers)
  }

  await writeFile('vercel.json', `${JSON.stringify(vercelJSON, null, 2)}\n`)
}

module.exports = { mergeHeaders }

if (require.main === module) main()
