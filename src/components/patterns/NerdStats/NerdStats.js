import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Terminal } from 'react-feather'
import { transition } from 'theme'
import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'

const NERD_STATS_STORAGE_KEY = 'screenshot-nerd-stats'

const ALL_HEADER_KEYS = [
  'x-cache-status',
  'x-cache-ttl',
  'x-cache-stale-ttl',
  'x-cache',
  'x-response-time',
  'x-fetch-time',
  'x-fetch-mode',
  'x-pricing-plan',
  'x-region',
  'x-request-id',
  'x-client-ip',
  'x-timestamp',
  'x-amz-cf-pop',
  'x-amz-apigw-id',
  'x-amzn-requestid',
  'x-amzn-remapped-connection',
  'x-amzn-remapped-content-length',
  'x-amzn-remapped-date',
  'x-content-type-options',
  'x-dns-prefetch-control',
  'x-download-options',
  'x-permitted-cross-domain-policies',
  'x-robots-tag',
  'x-rate-limit-limit',
  'x-rate-limit-remaining',
  'x-rate-limit-reset',
  'x-xss-protection',
  'cf-cache-status',
  'cf-ray',
  'age',
  'cache-control',
  'etag',
  'server-timing',
  'content-encoding',
  'content-length',
  'alt-svc',
  'via',
  'server',
  'date'
]

const FULL_SECTIONS = [
  {
    label: 'Cache',
    keys: ['x-cache-status', 'x-cache-ttl', 'x-cache-stale-ttl', 'x-cache']
  },
  {
    label: 'Timing',
    keys: ['x-response-time', 'x-fetch-time', 'x-fetch-mode']
  },
  {
    label: 'Cloudflare',
    keys: [
      'cf-ray',
      'age',
      'cache-control',
      'etag',
      'server-timing',
      'content-encoding',
      'content-length',
      'alt-svc',
      'via',
      'server',
      'date'
    ]
  },
  {
    label: 'Rate Limit',
    keys: ['x-rate-limit-limit', 'x-rate-limit-remaining', 'x-rate-limit-reset']
  },
  {
    label: 'Infra',
    keys: [
      'x-region',
      'x-amz-cf-pop',
      'x-pricing-plan',
      'x-amz-apigw-id',
      'x-amzn-requestid',
      'x-amzn-remapped-connection',
      'x-amzn-remapped-content-length',
      'x-amzn-remapped-date'
    ]
  },
  {
    label: 'Request',
    keys: ['x-request-id', 'x-client-ip', 'x-timestamp']
  },
  {
    label: 'Security',
    keys: [
      'x-content-type-options',
      'x-dns-prefetch-control',
      'x-download-options',
      'x-permitted-cross-domain-policies',
      'x-xss-protection'
    ]
  }
]

export const extractNerdStats = headers => {
  if (!headers) return null
  const stats = {}
  let hasAny = false

  if (typeof headers.get === 'function') {
    for (const key of ALL_HEADER_KEYS) {
      const value = headers.get(key)
      if (value != null) {
        stats[key] = String(value)
        hasAny = true
      }
    }
  } else {
    const headerMap = {}
    for (const k of Object.keys(headers)) {
      headerMap[k.toLowerCase()] = headers[k]
    }
    for (const key of ALL_HEADER_KEYS) {
      const value = headerMap[key]
      if (value != null) {
        stats[key] = String(value)
        hasAny = true
      }
    }
  }

  return hasAny ? stats : null
}

const LABEL_MAP = {
  'cf-cache-status': 'status',
  'cf-ray': 'ray',
  'cache-control': 'policy',
  'server-timing': 'timing',
  'content-encoding': 'encoding',
  'content-length': 'size',
  'alt-svc': 'http/3',
  'x-pricing-plan': 'plan',
  'x-cache-status': 'status',
  'x-cache-ttl': 'ttl',
  'x-cache-stale-ttl': 'stale ttl',
  'x-response-time': 'response time',
  'x-fetch-time': 'fetch time',
  'x-fetch-mode': 'fetch mode',
  'x-rate-limit-limit': 'limit',
  'x-rate-limit-remaining': 'remaining',
  'x-rate-limit-reset': 'reset',
  'x-request-id': 'request id',
  'x-client-ip': 'client ip',
  'x-amz-cf-pop': 'pop',
  'x-amz-apigw-id': 'gateway id',
  'x-amzn-requestid': 'aws request id'
}

const formatLabel = key => {
  return LABEL_MAP[key] || key.replace(/^x-/, '').replace(/-/g, ' ')
}

const formatValue = (key, value) => {
  if (key === 'x-cache-ttl') {
    const ms = Number(value)
    if (!Number.isNaN(ms)) {
      const hours = ms / 3600000
      return hours >= 1
        ? `${ms.toLocaleString()}ms (${hours.toFixed(1)}h)`
        : `${ms.toLocaleString()}ms`
    }
  }
  if (key === 'x-timestamp') {
    const ts = Number(value)
    if (!Number.isNaN(ts)) {
      try {
        return new Date(ts).toISOString().replace('T', ' ').replace('Z', ' UTC')
      } catch {
        return value
      }
    }
  }
  if (key === 'x-rate-limit-reset') {
    const ts = Number(value)
    if (!Number.isNaN(ts)) {
      try {
        const resetDate = new Date(ts * 1000)
        const diff = resetDate - Date.now()
        const mins = Math.max(0, Math.ceil(diff / 60000))
        return `${resetDate
          .toISOString()
          .replace('T', ' ')
          .replace('Z', ' UTC')} (${mins}m)`
      } catch {
        return value
      }
    }
  }
  if (key === 'age') {
    const secs = Number(value)
    if (!Number.isNaN(secs)) {
      if (secs < 60) return `${secs}s`
      if (secs < 3600) return `${Math.floor(secs / 60)}m ${secs % 60}s`
      const h = Math.floor(secs / 3600)
      const m = Math.floor((secs % 3600) / 60)
      return `${h}h ${m}m`
    }
  }
  if (key === 'content-length') {
    const bytes = Number(value)
    if (!Number.isNaN(bytes)) {
      if (bytes < 1024) return `${bytes} B`
      return `${(bytes / 1024).toFixed(1)} KB`
    }
  }
  if (key === 'server-timing') {
    const entries = value
      .split(',')
      .map(s => s.trim())
      .filter(s => s.includes(';dur='))
      .map(s => {
        const [name, ...rest] = s.split(';')
        const dur = rest.find(p => p.startsWith('dur='))
        return dur ? { name: name.trim(), ms: dur.replace('dur=', '') } : null
      })
      .filter(Boolean)

    if (entries.length === 0) return value

    return (
      <span style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {entries.map(({ name, ms }) => (
          <span key={name}>
            <span style={{ color: 'rgba(0, 255, 136, 0.5)' }}>{name}</span> {ms}
            ms
          </span>
        ))}
      </span>
    )
  }
  if (key === 'cache-control') {
    const maxAge = value.match(/max-age=(\d+)/)
    if (maxAge) {
      const secs = Number(maxAge[1])
      const h = Math.floor(secs / 3600)
      const m = Math.floor((secs % 3600) / 60)
      const human = h > 0 ? `${h}h ${m}m` : `${m}m`
      return `${value} (${human})`
    }
  }
  if (key === 'cf-ray') {
    const parts = value.split('-')
    if (parts.length === 2) return `${parts[1]} / ${parts[0]}`
  }
  if (key === 'alt-svc') {
    if (value.includes('h3=')) return 'h3 (HTTP/3)'
  }
  return value
}

const fadeSlide = keyframes`
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
`

const Overlay = styled(Box)`
  position: absolute;
  inset: 0;
  z-index: 5;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
  background: rgba(10, 10, 14, 0.88);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  animation: ${fadeSlide} 250ms cubic-bezier(0.4, 0, 0.2, 1) both;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.15) transparent;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.15);
    border-radius: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const SectionTitle = styled.span`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(0, 255, 136, 0.6);
  padding-bottom: 4px;
  display: block;
`

const Row = styled(Flex)`
  padding: 2px 0;
  gap: 8px;
  align-items: baseline;
  font-size: 13px;
  line-height: 1.5;
`

const Label = styled.span`
  color: rgba(255, 255, 255, 0.45);
  text-transform: capitalize;
  flex-shrink: 0;
  min-width: 90px;
  font-size: 12px;
`

const Value = styled.span`
  color: rgba(0, 255, 136, 0.9);
  word-break: break-all;
  font-variant-numeric: tabular-nums;
`

const ToggleButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 8px;
  aspect-ratio: 1;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  text-decoration: none;
  border: 1px solid;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  font-family: inherit;
  transition: background ${transition.medium}, box-shadow ${transition.medium},
    transform 80ms ease;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  background: ${({ $active }) =>
    $active ? 'rgba(0, 255, 136, 0.08)' : 'white'};
  color: ${({ $active }) =>
    $active ? 'rgba(0, 180, 100, 1)' : 'rgba(0,0,0,0.8)'};
  border-color: ${({ $active }) =>
    $active ? 'rgba(0, 255, 136, 0.25)' : 'rgba(0,0,0,0.1)'};

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    background: ${({ $active }) =>
      $active ? 'rgba(0, 255, 136, 0.12)' : 'rgba(0,0,0,0.02)'};
    border-color: ${({ $active }) =>
      $active ? 'rgba(0, 255, 136, 0.35)' : 'rgba(0,0,0,0.2)'};
  }

  &:active {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 2px solid #067df7;
    outline-offset: 2px;
  }
`

const NerdStatsOverlay = ({ stats }) => {
  if (!stats) return null

  const sections = FULL_SECTIONS.map(section => ({
    ...section,
    entries: section.keys
      .filter(k => stats[k] != null)
      .map(k => ({
        key: k,
        label: formatLabel(k),
        value: formatValue(k, stats[k])
      }))
  })).filter(s => s.entries.length > 0)

  if (sections.length === 0) return null

  return (
    <Overlay
      css={{
        fontFamily:
          '"Operator Mono", "Fira Code", "SF Mono", "Roboto Mono", Menlo, monospace',
        padding: '16px 20px'
      }}
    >
      <Flex
        css={{
          flexDirection: 'column',
          gap: '12px'
        }}
      >
        <Flex
          css={{
            alignItems: 'center',
            gap: '6px',
            paddingBottom: '4px',
            borderBottom: '1px solid rgba(255,255,255,0.08)'
          }}
        >
          <span
            css={{
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'rgba(0, 255, 136, 0.8)'
            }}
          >
            Stats for Nerds
          </span>
        </Flex>
        {sections.map(section => (
          <Box key={section.label}>
            <SectionTitle>{section.label}</SectionTitle>
            {section.entries.map(({ key, label, value }) => (
              <Row key={key}>
                <Label>{label}</Label>
                <Value>{value}</Value>
              </Row>
            ))}
          </Box>
        ))}
      </Flex>
    </Overlay>
  )
}

export const NerdStatsToggle = ({ active, onClick }) => (
  <ToggleButton
    type='button'
    $active={active}
    onClick={onClick}
    aria-label={active ? 'Hide stats for nerds' : 'Show stats for nerds'}
    aria-pressed={active}
  >
    <Terminal size={25} aria-hidden='true' />
  </ToggleButton>
)

export { NERD_STATS_STORAGE_KEY }
export default NerdStatsOverlay
