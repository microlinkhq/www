import React, { useEffect, useState } from 'react'

import Box from 'components/elements/Box'
import { colors, theme } from 'theme'

const HN_PAGE_HEADERS = {
  server: 'nginx',
  date: 'Thu, 28 May 2026 14:48:04 GMT',
  'content-type': 'text/html; charset=utf-8',
  'transfer-encoding': 'chunked',
  connection: 'keep-alive',
  vary: 'Accept-Encoding',
  'cache-control': 'private; max-age=0',
  'x-frame-options': 'DENY',
  'x-content-type-options': 'nosniff',
  'x-xss-protection': '1; mode=block',
  'referrer-policy': 'origin',
  'strict-transport-security': 'max-age=31556900',
  'content-security-policy':
    "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/ https://cdnjs.cloudflare.com/; frame-src 'self' https://www.google.com/recaptcha/; style-src 'self' 'unsafe-inline'; img-src 'self' https://account.ycombinator.com; frame-ancestors 'self'",
  'content-encoding': 'gzip'
}

const HN_DATA = {
  publisher: 'ycombinator.com',
  lang: 'en',
  title: 'Hacker News',
  url: 'https://news.ycombinator.com/',
  date: '2026-05-28T14:48:04.000Z',
  image: {
    url: 'https://news.ycombinator.com/y18.svg',
    type: 'svg',
    size: 315,
    height: 18,
    width: 18,
    size_pretty: '315 B'
  },
  author: null,
  description: null,
  logo: {
    url: 'https://news.ycombinator.com/y18.svg',
    type: 'svg',
    size: 315,
    height: 18,
    width: 18,
    size_pretty: '315 B'
  }
}

const CLI_RESPONSE = {
  request: {
    url: 'https://pro.microlink.io/?url=https%3A%2F%2Fnews.ycombinator.com%2F',
    headers: {
      'x-api-key': 'J9fAp…'
    }
  },
  response: {
    url: 'https://pro.microlink.io/?url=https%3A%2F%2Fnews.ycombinator.com%2F',
    body: {
      status: 'success',
      data: HN_DATA,
      statusCode: 200,
      redirects: [],
      headers: HN_PAGE_HEADERS
    },
    headers: {
      'accept-ranges': 'bytes',
      'access-control-allow-origin': '*',
      'access-control-expose-headers':
        'server-timing,x-cache-stale-ttl,x-cache-status,x-cache-ttl,x-cache-ttl,x-fetch-mode,x-fetch-time,x-pricing-plan,x-rate-limit-limit,x-rate-limit-remaining,x-rate-limit-reset,x-region,x-request-id,x-response-time,x-timestamp',
      age: '19659',
      'alt-svc': 'h3=":443"; ma=86400',
      'cache-control': 'public, must-revalidate, max-age=77113',
      'cf-cache-status': 'HIT',
      'cf-ray': 'a030d1a01eb5f775-MAD',
      connection: 'keep-alive',
      'content-encoding': 'gzip',
      'content-length': '598',
      'content-security-policy':
        "default-src 'self';base-uri 'self';font-src 'self' https: data:;form-action 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
      'content-type': 'application/json; charset=utf-8',
      'cross-origin-opener-policy': 'same-origin',
      date: 'Thu, 28 May 2026 22:50:32 GMT',
      etag: '"588-539E3aBmLYUmxV0EuwlYXqx6PXg"',
      nel: '{"report_to":"cf-nel","success_fraction":0.0,"max_age":604800}',
      'origin-agent-cluster': '?1',
      'referrer-policy': 'no-referrer',
      'report-to':
        '{"group":"cf-nel","max_age":604800,"endpoints":[{"url":"https://a.nel.cloudflare.com/report/v4?s=DZBGcU46Q%2BRI7P1WExuaEJbWLBfMBRW8UdS2DsuVOaTa7hyV4faG7zcx7QTxck2Rdp%2FqiRUrN%2FgMo7tMfE2KeK0lcp3fSpjaOJDZiZIJhmtTNnmu7sZDFGo%2BJhTkhoMpEUU%3D"}]}',
      server: 'cloudflare',
      'server-timing': 'total;dur=95,purge;dur=0',
      'strict-transport-security': 'max-age=31536000; includeSubDomains',
      vary: 'accept-encoding',
      via: '1.1 ea7e522186bf94839907358932e6a7b8.cloudfront.net (CloudFront)',
      'x-amz-apigw-id': 'eFf89HnlIAMEMdg=',
      'x-amz-cf-id': 'BGz9XIBEOj4B6FjJHp9-rgoYt0brifrWRTBc2LTPio0eBnCDsHyC4A==',
      'x-amz-cf-pop': 'MAD53-P6',
      'x-amzn-remapped-connection': 'keep-alive',
      'x-amzn-remapped-content-length': '1239',
      'x-amzn-remapped-date': 'Thu, 28 May 2026 17:22:52 GMT',
      'x-amzn-requestid': '72cca9b4-50de-41a2-8bae-db2663f7794d',
      'x-cache': 'Miss from cloudfront',
      'x-cache-stale-ttl': 'false',
      'x-cache-status': 'HIT',
      'x-cache-ttl': '86400000',
      'x-client-ip': '88.20.248.235',
      'x-content-type-options': 'nosniff',
      'x-dns-prefetch-control': 'off',
      'x-download-options': 'noopen',
      'x-fetch-mode': 'fetch',
      'x-fetch-time': '328ms',
      'x-permitted-cross-domain-policies': 'none',
      'x-pricing-plan': 'pro',
      'x-region': 'iad',
      'x-request-id': 'iad:b1852aba-ebb5-4a17-abc0-1af09af8c171',
      'x-response-time': '95ms',
      'x-robots-tag': 'noindex, nofollow, nosnippet',
      'x-timestamp': '1779979686196',
      'x-xss-protection': '0'
    },
    statusCode: 200
  }
}

const CLI_TERMINAL_JSON_THEME = {
  base00: 'rgba(0, 0, 0, 0)',
  base01: colors.white,
  base02: colors.black10,
  base03: colors.black50,
  base04: colors.black50,
  base05: colors.black80,
  base06: colors.black,
  base07: colors.black,
  base08: colors.red6,
  base09: colors.green6,
  base0A: colors.black50,
  base0B: colors.blue6,
  base0C: colors.violet4,
  base0D: colors.black80,
  base0E: colors.green5,
  base0F: colors.blue6
}

const JSON_DEFAULT_EXPAND_LEVEL = 2

// react-json-view only applies shouldCollapse when collapsed > depth; +1 unlocks
// per-field control at the deepest default level (e.g. response.body).
const JSON_COLLAPSED_DEPTH = JSON_DEFAULT_EXPAND_LEVEL + 1

const collapseField = field => {
  const namespaceDepth = field.namespace?.length ?? 0

  if (namespaceDepth <= JSON_DEFAULT_EXPAND_LEVEL) return false

  if (field.name === 'body') return false

  return (
    field.type === 'object' ||
    (field.type === 'array' && Array.isArray(field.src) && field.src.length > 0)
  )
}

const jsonViewCss = theme({
  fontFamily: 'mono',
  fontSize: '13px',
  lineHeight: '20px',
  '& .react-json-view': {
    backgroundColor: 'transparent !important',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    lineHeight: 'inherit',
    padding: 0,
    margin: 0
  },
  '& .pretty-json-container > .object-content > .object-key-val': {
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: '0 !important',
    marginLeft: 0,
    borderLeft: '0 !important'
  },
  '& .pretty-json-container > .object-content > .object-key-val .icon-container':
    {
      width: '14px',
      marginLeft: 0,
      paddingLeft: 0
    },
  '& .object-key-val .object-key-val': {
    paddingTop: 0,
    paddingBottom: 0,
    borderLeft: `1px solid ${colors.black10}`
  },
  '& .brace-row, & .icon-container': {
    cursor: 'pointer'
  }
})

const TerminalJsonView = () => {
  const [ReactJson, setReactJson] = useState(null)

  useEffect(() => {
    let cancelled = false

    import('@microlink/react-json-view').then(module => {
      if (!cancelled) setReactJson(() => module.default)
    })

    return () => {
      cancelled = true
    }
  }, [])

  if (!ReactJson) return null

  return (
    <Box css={jsonViewCss}>
      <ReactJson
        src={CLI_RESPONSE}
        name={false}
        theme={CLI_TERMINAL_JSON_THEME}
        collapsed={JSON_COLLAPSED_DEPTH}
        shouldCollapse={collapseField}
        collapseStringsAfterLength={72}
        quotesOnKeys={false}
        displayDataTypes={false}
        displayObjectSize={false}
        displayArrayKey={false}
        enableClipboard={false}
        onEdit={false}
        onAdd={false}
        onDelete={false}
        onSelect={false}
        sortKeys={false}
        indentWidth={2}
        iconStyle='triangle'
        style={{
          backgroundColor: 'transparent',
          fontFamily: 'inherit',
          fontSize: 'inherit',
          lineHeight: 'inherit'
        }}
      />
    </Box>
  )
}

export default TerminalJsonView
