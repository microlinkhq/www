import React from 'react'
import { Globe, Image, RefreshCw, Shield } from 'react-feather'

const BracketsIcon = () => (
  <svg
    width='14'
    height='14'
    viewBox='0 0 14 14'
    fill='none'
    aria-hidden='true'
  >
    <path
      d='M5 2H3.5C2.67 2 2 2.67 2 3.5v7C2 11.33 2.67 12 3.5 12H5M9 2h1.5C11.33 2 12 2.67 12 3.5v7c0 .83-.67 1.5-1.5 1.5H9'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
    />
  </svg>
)

const PdfIcon = () => (
  <svg
    width='14'
    height='14'
    viewBox='0 0 14 14'
    fill='none'
    aria-hidden='true'
  >
    <path
      d='M4 1.5h4.5L11 4v8.5a.5.5 0 01-.5.5h-6a.5.5 0 01-.5-.5v-11z'
      stroke='currentColor'
      strokeWidth='1.3'
      strokeLinejoin='round'
    />
    <path d='M8.5 1.5V4H11' stroke='currentColor' strokeWidth='1.3' />
    <path
      d='M4.5 8h5M4.5 10h3'
      stroke='currentColor'
      strokeWidth='1.3'
      strokeLinecap='round'
    />
  </svg>
)

const MarkdownIcon = () => (
  <svg
    width='14'
    height='14'
    viewBox='0 0 14 14'
    fill='none'
    aria-hidden='true'
  >
    <rect
      x='1.5'
      y='2.5'
      width='11'
      height='9'
      rx='1.5'
      stroke='currentColor'
      strokeWidth='1.3'
    />
    <path
      d='M3.5 9V5l1.5 2L6.5 5v4M8.5 9V6.5M8.5 9l2-2.5'
      stroke='currentColor'
      strokeWidth='1.3'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
)

const HeadersIcon = () => (
  <svg
    width='14'
    height='14'
    viewBox='0 0 14 14'
    fill='none'
    aria-hidden='true'
  >
    <rect
      x='2'
      y='2'
      width='10'
      height='10'
      rx='1.5'
      stroke='currentColor'
      strokeWidth='1.3'
    />
    <path d='M2 5.5h10M5.5 2v10' stroke='currentColor' strokeWidth='1.3' />
  </svg>
)

export const OUTPUTS = [
  { label: 'JSON data', icon: BracketsIcon, color: 'secondary' },
  { label: 'Screenshot', icon: Image, color: 'blue7' },
  { label: 'PDF', icon: PdfIcon, color: 'red7' },
  { label: 'Markdown', icon: MarkdownIcon, color: 'blue8' },
  { label: 'Headers forwarded', icon: HeadersIcon, color: 'green7' },
  { label: 'Proxy resolved', icon: Globe, color: 'blue7' },
  { label: 'Cached (TTL 1d)', icon: RefreshCw, color: 'blue6' },
  { label: 'Isolated request', icon: Shield, color: 'violet7', bolt: true }
]

export const PARAMS = [
  { key: 'url', value: 'https://example.com' },
  { key: 'data', value: 'title,price' },
  { key: 'function', value: 'return window.title' },
  { key: 'prerender', value: 'true' },
  { key: 'proxy', value: 'true' },
  { key: 'ttl', value: '1d' },
  { key: 'headers[x-api-header-cookie]', value: '***' },
  { key: 'x-fetch-mode', value: 'auto' }
]
