import { next } from '@vercel/functions'

import { buildNotFoundMarkdown } from './src/helpers/not-found.js'

export const config = { matcher: '/:path*.md' }

const PROBE_HEADER = 'x-markdown-probe'

const NOT_FOUND_HEADERS = {
  'content-type': 'text/markdown; charset=utf-8',
  vary: 'Accept, Accept-Encoding',
  'x-robots-tag': 'noindex',
  'cache-control': 'public, max-age=0, must-revalidate'
}

export default async function middleware (request) {
  if (request.headers.get(PROBE_HEADER)) return next()

  const probe = await fetch(request.url, {
    method: 'HEAD',
    headers: { [PROBE_HEADER]: '1' },
    redirect: 'manual'
  })

  if (probe.status !== 404) return next()

  return new Response(buildNotFoundMarkdown(), {
    status: 404,
    headers: NOT_FOUND_HEADERS
  })
}
