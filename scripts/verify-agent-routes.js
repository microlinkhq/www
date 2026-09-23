#!/usr/bin/env node
'use strict'

const BASE_URL = (process.argv[2] || 'https://microlink.io').replace(/\/+$/, '')
const EXPECT_MARKDOWN_FILES = !process.argv.includes('--preview')

const HTML = 'text/html,application/xhtml+xml;q=0.9,*/*;q=0.8'
const MARKDOWN = 'text/markdown'
const ANY = '*/*'

const SECURITY_HEADERS = [
  'content-security-policy',
  'x-frame-options',
  'permissions-policy',
  'x-content-type-options'
]

const request = async (pathname, accept, { follow = false } = {}) => {
  const response = await fetch(`${BASE_URL}${pathname}`, {
    headers: { accept },
    redirect: follow ? 'follow' : 'manual'
  })
  const body = await response.text()
  return {
    status: response.status,
    type: response.headers.get('content-type') || '',
    vary: (response.headers.get('vary') || '').toLowerCase(),
    location: response.headers.get('location') || '',
    headers: response.headers,
    body
  }
}

const variesByAccept = ({ vary }) =>
  vary.split(',').some(token => token.trim() === 'accept')

const isMarkdown = ({ type }) => type.startsWith('text/markdown')
const isHtml = ({ type }) => type.startsWith('text/html')
const looksLikeHtml = ({ body }) => /^\s*<!doctype html/i.test(body)

const checks = [
  [
    'home negotiates to markdown (curl -L)',
    async () => {
      const response = await request('/', MARKDOWN, { follow: true })
      const ok =
        response.status === 200 &&
        isMarkdown(response) &&
        variesByAccept(response) &&
        response.body.trim().length > 0 &&
        !looksLikeHtml(response)
      return [ok, response]
    },
    { productionOnly: true }
  ],
  [
    'home redirects markdown clients to /index.md',
    async () => {
      const response = await request('/', MARKDOWN)
      return [
        [302, 307].includes(response.status) &&
          response.location.endsWith('/index.md'),
        response
      ]
    }
  ],
  [
    'home serves HTML to browsers, varying by Accept',
    async () => {
      const response = await request('/', HTML)
      return [
        response.status === 200 && isHtml(response) && variesByAccept(response),
        response
      ]
    }
  ],
  [
    'page redirects markdown clients to its .md',
    async () => {
      const response = await request('/pricing', MARKDOWN)
      return [
        [302, 307].includes(response.status) &&
          response.location.endsWith('/pricing.md'),
        response
      ]
    }
  ],
  [
    'page .md is markdown, varying by Accept',
    async () => {
      const response = await request('/pricing.md', ANY)
      return [
        response.status === 200 &&
          isMarkdown(response) &&
          variesByAccept(response) &&
          !looksLikeHtml(response),
        response
      ]
    },
    { productionOnly: true }
  ],
  [
    'site redirect still fires for */* clients',
    async () => {
      const response = await request('/docs', ANY)
      return [
        response.status === 308 &&
          response.location.endsWith('/docs/api/getting-started/overview'),
        response
      ]
    }
  ],
  [
    'missing .md is a 404 that does not pose as markdown',
    async () => {
      const response = await request('/notexist-agent-probe.md', ANY)
      return [response.status === 404 && !isMarkdown(response), response]
    }
  ],
  [
    'missing page is an HTML 404 for browsers',
    async () => {
      const response = await request('/notexist-agent-probe', HTML)
      return [response.status === 404 && isHtml(response), response]
    }
  ],
  [
    'pages carry the security headers',
    async () => {
      const response = await request('/pricing', HTML)
      return [
        SECURITY_HEADERS.every(name => response.headers.has(name)),
        response
      ]
    }
  ]
]

const describe = ({ status, type, vary, location, headers }) =>
  [
    status,
    type && `type=${type}`,
    `vary=${vary || '-'}`,
    location && `location=${location}`,
    `security=${SECURITY_HEADERS.filter(name => headers.has(name)).length}/${
      SECURITY_HEADERS.length
    }`
  ]
    .filter(Boolean)
    .join(' ')

const main = async () => {
  let failures = 0
  console.log(`${BASE_URL}${EXPECT_MARKDOWN_FILES ? '' : ' (preview)'}`)
  for (const [name, check, { productionOnly } = {}] of checks) {
    if (productionOnly && !EXPECT_MARKDOWN_FILES) {
      console.log(`SKIP  ${name} (no markdown files on preview builds)`)
      continue
    }
    const [ok, response] = await check()
    if (!ok) failures += 1
    console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}  [${describe(response)}]`)
  }
  process.exitCode = failures ? 1 : 0
}

main()
