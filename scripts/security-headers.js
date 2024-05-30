'use strict'

const { writeFile } = require('fs').promises
const { once } = require('events')
const helmet = require('helmet')()
const http = require('http')

const listen = async (server, ...args) => {
  server.listen(...args)
  await once(server, 'listening')
  const { address, port, family } = server.address()
  return `http://${family === 'IPv6' ? `[${address}]` : address}:${port}/`
}

const createServer = ({ withHelmet = false } = {}) =>
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
  let server = createServer({ withHelmet: false })

  let serverUrl = await listen(server)

  let res = await fetch(serverUrl)
  const headers = Object.fromEntries(res.headers)

  server.close()

  server = createServer({ withHelmet: true })
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

;(async () => {
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
    else rule.headers = headers
  }

  await writeFile('vercel.json', JSON.stringify(vercelJSON, null, 2))
})()
