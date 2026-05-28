const HERO_TYPING_OPTION_KEYS = ['type', 'location', 'period']
const HERO_TYPE_CHAR_MS = 32
const HERO_TYPE_GAP_MS = 260
const HERO_TYPE_START_MS = 80

const shortenValueForEditor = value => {
  if (typeof value === 'string') {
    if (value === '[truncated data URL]') return 'data:image/webp;base64...'
    if (value.startsWith('data:')) return `${value.slice(0, 20)}...`
    return value
  }
  if (Array.isArray(value)) return value.map(shortenValueForEditor)
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [
        key,
        shortenValueForEditor(item)
      ])
    )
  }
  return value
}

export const parseJsonPayload = payload => {
  try {
    const parsed = typeof payload === 'string' ? JSON.parse(payload) : payload
    const root = Array.isArray(parsed?.results) ? parsed.results : parsed
    return shortenValueForEditor(root)
  } catch {
    return {}
  }
}

const toPreviewItems = payload => {
  if (Array.isArray(payload)) return payload.filter(Boolean).slice(0, 4)
  if (payload && typeof payload === 'object') return [payload]
  return []
}

export const formatPriceLabel = price => {
  if (!price || typeof price !== 'object') return null
  if (typeof price.symbol === 'string' && typeof price.amount === 'number') {
    return `${price.symbol}${price.amount}`
  }
  if (typeof price.amount === 'number') return `${price.amount}`
  return null
}

const VERTICAL_PREVIEW_TRANSFORMS = {
  places: items =>
    items.map(item => ({
      ...item,
      reviewCount: item.reviewCount ?? item.ratingCount ?? item.rating?.reviews
    })),
  shopping: items =>
    items.map(item => ({ ...item, priceLabel: formatPriceLabel(item.price) })),
  patents: items =>
    items.map(item => ({
      ...item,
      publicationNumber: item.publication?.number
    }))
}

export const getVerticalPreviewResult = (verticalId, payload) => {
  const items = toPreviewItems(payload)
  const transform = VERTICAL_PREVIEW_TRANSFORMS[verticalId]
  return { variant: verticalId, data: transform ? transform(items) : items }
}

const createCode = code =>
  `const google = require('@microlink/google')({ apiKey: MICROLINK_API_KEY })

${code}

console.log(page.results)
`.trim()

const getVerticalExampleCode = (query, verticalId) =>
  createCode(`const page = await google('${query}', { type: '${verticalId}' })`)

export const getVerticalExampleOptions = (verticalId, examples) => {
  if (!examples || examples.length === 0) {
    return [
      {
        id: verticalId,
        label: verticalId,
        description: '',
        code: getVerticalExampleCode(verticalId, verticalId),
        payload: []
      }
    ]
  }

  return examples.map(example => ({
    id: example.query,
    label: example.query,
    description: example.description,
    code: getVerticalExampleCode(example.query, verticalId),
    payload: example.payload
  }))
}

export const formatBytes = bytes => {
  if (typeof bytes !== 'number') return ''
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

export const formatRelativeTime = isoDate => {
  if (!isoDate) return ''
  const then = new Date(isoDate).getTime()
  if (Number.isNaN(then)) return ''
  const diffMs = Date.now() - then
  const hours = Math.round(diffMs / (1000 * 60 * 60))
  if (hours < 1) return 'just now'
  if (hours < 24) return `${hours}h ago`
  const days = Math.round(hours / 24)
  if (days < 30) return `${days}d ago`
  const months = Math.round(days / 30)
  if (months < 12) return `${months}mo ago`
  const years = Math.round(months / 12)
  return `${years}y ago`
}

export const formatCoordinate = (value, positiveLabel, negativeLabel) => {
  if (typeof value !== 'number') return null
  const direction = value >= 0 ? positiveLabel : negativeLabel
  return `${Math.abs(value).toFixed(4)}° ${direction}`
}

export const buildBreadcrumb = url => {
  try {
    const parsed = new URL(url)
    const host = parsed.host.replace(/^www\./, '')
    const segments = parsed.pathname
      .split('/')
      .filter(Boolean)
      .slice(0, 2)
      .join(' › ')
    return {
      host,
      path: segments ? ` › ${segments}` : '',
      origin: parsed.origin
    }
  } catch {
    return { host: url, path: '', origin: '' }
  }
}

const HOST_BRAND_MAP = {
  'techcrunch.com': { icon: 'techcrunch', tint: '#FFFFFF' },
  'google.com': { icon: 'google', tint: '#FFFFFF' }
}

const HOST_MONOGRAM_OVERRIDES = {
  'openai.com': { label: 'AI', tint: '#10A37F' },
  'theverge.com': { label: 'V', tint: '#5200FF' },
  'ft.com': { label: 'FT', tint: '#FFF1E5', color: '#990F3D' }
}

const MONOGRAM_PALETTE = [
  '#5B8DEF',
  '#4DA167',
  '#F2994A',
  '#EB5757',
  '#9B51E0',
  '#2D9CDB',
  '#219653'
]

export const monogramTintFor = seed => {
  if (!seed) return MONOGRAM_PALETTE[0]
  let hash = 0
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0
  }
  return MONOGRAM_PALETTE[hash % MONOGRAM_PALETTE.length]
}

export const monogramFor = host => {
  if (!host) return '•'
  const base = host.replace(/^www\./, '').split('.')[0]
  return base.slice(0, 2).toUpperCase()
}

const lookupHost = (map, host) => {
  if (!host) return null
  const normalized = host.replace(/^www\./, '').toLowerCase()
  if (map[normalized]) return map[normalized]
  const match = Object.keys(map).find(key => normalized.endsWith(`.${key}`))
  return match ? map[match] : null
}

export const brandMatchFor = host => lookupHost(HOST_BRAND_MAP, host)
export const monogramOverrideFor = host =>
  lookupHost(HOST_MONOGRAM_OVERRIDES, host)

export const createTablistKeyHandler =
  ({ items, onSelect, focusTab }) =>
    (event, index) => {
      const lastIndex = items.length - 1
      let nextIndex = null

      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        nextIndex = index === lastIndex ? 0 : index + 1
      } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        nextIndex = index === 0 ? lastIndex : index - 1
      } else if (event.key === 'Home') {
        nextIndex = 0
      } else if (event.key === 'End') {
        nextIndex = lastIndex
      }

      if (nextIndex === null) return
      event.preventDefault()
      const nextId = items[nextIndex].id
      onSelect(nextId)
      if (focusTab) focusTab(nextId)
    }

export const extractHeroTypingTargets = code => {
  if (!code) return []
  const targets = []
  const queryMatch = code.match(/google\(\s*(['"])([\s\S]*?)\1/)
  if (queryMatch) targets.push(queryMatch[2])
  HERO_TYPING_OPTION_KEYS.forEach(key => {
    const pattern = new RegExp(`${key}\\s*:\\s*(['"])([\\s\\S]*?)\\1`)
    const match = code.match(pattern)
    if (match) targets.push(match[2])
  })
  return targets
}

export const findHeroTypingSpans = (root, targets) => {
  const spans = Array.from(root.querySelectorAll('.sh__token--string'))
  const remaining = [...targets]
  const matches = []
  for (const span of spans) {
    if (remaining.length === 0) break
    const text = span.textContent
    const idx = remaining.indexOf(text)
    if (idx === -1) continue
    remaining.splice(idx, 1)
    matches.push({ span, text })
  }
  return matches.length === targets.length ? matches : null
}

export const runHeroTypingSequence = (
  matches,
  prefersReducedMotion,
  onComplete
) => {
  const timers = []
  let cancelled = false

  const caret = document.createElement('span')
  caret.className = 'hero-code-caret'
  caret.setAttribute('aria-hidden', 'true')

  matches.forEach(match => {
    match.span.textContent = ''
  })

  if (prefersReducedMotion) {
    matches.forEach(match => {
      match.span.textContent = match.text
    })
    if (onComplete) onComplete()
    return () => {}
  }

  const finish = () => {
    if (cancelled) return
    if (caret.parentNode) caret.parentNode.removeChild(caret)
    if (onComplete) onComplete()
  }

  const typeInto = (match, onDone) => {
    if (cancelled) return
    match.span.textContent = ''
    match.span.appendChild(caret)
    let i = 0

    const tick = () => {
      if (cancelled) return
      i += 1
      match.span.insertBefore(
        document.createTextNode(match.text.charAt(i - 1)),
        caret
      )
      if (i < match.text.length) {
        timers.push(window.setTimeout(tick, HERO_TYPE_CHAR_MS))
      } else {
        onDone()
      }
    }

    timers.push(window.setTimeout(tick, HERO_TYPE_CHAR_MS))
  }

  const runIndex = index => {
    if (cancelled) return
    if (index >= matches.length) return finish()
    typeInto(matches[index], () => {
      if (cancelled) return
      if (index + 1 < matches.length) {
        timers.push(
          window.setTimeout(() => runIndex(index + 1), HERO_TYPE_GAP_MS)
        )
      } else {
        finish()
      }
    })
  }

  timers.push(window.setTimeout(() => runIndex(0), HERO_TYPE_START_MS))

  return () => {
    cancelled = true
    timers.forEach(id => window.clearTimeout(id))
    if (caret.parentNode) caret.parentNode.removeChild(caret)
  }
}

export const truncateLineCss = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
}
