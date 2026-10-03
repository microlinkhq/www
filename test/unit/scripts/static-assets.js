import { describe, expect, it } from 'vitest'

import {
  generateFilename,
  isImageUrl,
  resolveExtension
} from '../../../scripts/static-assets'

describe('resolveExtension', () => {
  it('names an extension-less URL after the served media type', () => {
    expect(
      resolveExtension({
        url: 'https://placehold.co/450x300',
        contentType: 'image/svg+xml; charset=utf-8'
      })
    ).toBe('.svg')
  })

  it('prefers the served media type over a misleading URL extension', () => {
    expect(
      resolveExtension({
        url: 'https://cdn.example.com/photo.png',
        contentType: 'image/webp'
      })
    ).toBe('.webp')
  })

  it('maps every supported image media type', () => {
    const cases = {
      'image/avif': '.avif',
      'image/bmp': '.bmp',
      'image/gif': '.gif',
      'image/heic': '.heic',
      'image/jpeg': '.jpg',
      'image/jxl': '.jxl',
      'image/png': '.png',
      'image/svg+xml': '.svg',
      'image/webp': '.webp'
    }
    for (const [contentType, extension] of Object.entries(cases)) {
      expect(
        resolveExtension({ url: 'https://example.com/a', contentType })
      ).toBe(extension)
    }
  })

  it('falls back to the URL extension for generic media types', () => {
    expect(
      resolveExtension({
        url: 'https://example.com/photo.JPEG',
        contentType: 'application/octet-stream'
      })
    ).toBe('.jpg')
    expect(resolveExtension({ url: 'https://example.com/photo.gif' })).toBe(
      '.gif'
    )
  })

  it('rejects responses that are not images', () => {
    expect(() =>
      resolveExtension({
        url: 'https://example.com/photo.png',
        contentType: 'text/html; charset=utf-8'
      })
    ).toThrow('not a supported image (content-type: text/html)')
    expect(() =>
      resolveExtension({ url: 'https://placehold.co/450x300' })
    ).toThrow('content-type: none')
  })
})

describe('generateFilename', () => {
  it('keeps a descriptive basename and swaps in the resolved extension', () => {
    expect(generateFilename('https://placehold.co/450x300', 1, '.svg')).toBe(
      '450x300.svg'
    )
    expect(
      generateFilename('https://cdn.example.com/hero-shot.png', 1, '.webp')
    ).toBe('hero-shot.webp')
  })

  it('generates a name when the basename is too short', () => {
    expect(generateFilename('https://example.com/a.png', 3, '.png')).toBe(
      'image-3.png'
    )
  })
})

describe('isImageUrl', () => {
  it('accepts external URLs with an image extension', () => {
    expect(isImageUrl('https://example.com/photo.JPG')).toBe(true)
    expect(isImageUrl('https://example.com/logo.svg')).toBe(true)
  })

  it('rejects local paths and non-image URLs', () => {
    expect(isImageUrl('/images/photo.png')).toBe(false)
    expect(isImageUrl('https://example.com/page')).toBe(false)
    expect(isImageUrl('https://example.com/doc.pdf')).toBe(false)
  })
})
