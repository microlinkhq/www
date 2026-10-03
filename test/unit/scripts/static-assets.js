import { describe, expect, it } from 'vitest'

import {
  generateFilename,
  isImageUrl,
  outsideCodeFences,
  replaceOutsideCodeFences,
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
  it('keeps a descriptive basename, adds a URL hash and the resolved extension', () => {
    expect(generateFilename('https://placehold.co/450x300', '.svg')).toBe(
      '450x300-30e6aa9e.svg'
    )
    expect(
      generateFilename('https://cdn.example.com/hero-shot.png', '.webp')
    ).toBe('hero-shot-53a9422d.webp')
  })

  it('names short basenames image plus the URL hash', () => {
    expect(generateFilename('https://example.com/a.png', '.png')).toBe(
      'image-b86dafa6.png'
    )
  })

  it('gives distinct URLs with the same basename distinct names', () => {
    const names = [
      generateFilename('https://a.com/img/logo.png', '.png'),
      generateFilename('https://b.com/logo.png', '.png'),
      generateFilename('https://x.com/logo.png', '.svg'),
      generateFilename('https://y.com/logo.svg', '.svg'),
      generateFilename('https://a.com/x.png', '.png'),
      generateFilename('https://b.com/y.png', '.png')
    ]
    expect(new Set(names).size).toBe(names.length)
  })

  it('names the same URL the same way every run', () => {
    expect(generateFilename('https://b.com/logo.png', '.png')).toBe(
      generateFilename('https://b.com/logo.png', '.png')
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

describe('code fences', () => {
  const URL =
    'https://api.microlink.io/?url=https://example.com&embed=screenshot.url'
  const DOC = [
    'Embed in any Markdown document:',
    '',
    '```md',
    `![Preview](${URL})`,
    '```',
    '',
    `![Preview](${URL})`,
    '',
    '~~~~html',
    `<img src="${URL}">`,
    '```',
    '~~~~',
    ''
  ].join('\n')

  it('rewrites the rendered image and leaves code examples untouched', () => {
    expect(replaceOutsideCodeFences(DOC, URL, '/images/preview.png')).toBe(
      [
        'Embed in any Markdown document:',
        '',
        '```md',
        `![Preview](${URL})`,
        '```',
        '',
        '![Preview](/images/preview.png)',
        '',
        '~~~~html',
        `<img src="${URL}">`,
        '```',
        '~~~~',
        ''
      ].join('\n')
    )
  })

  it('scans only prose for image references', () => {
    const prose = outsideCodeFences(DOC)
    expect(prose.split(URL)).toHaveLength(2)
    expect(prose).not.toContain('<img')
  })

  it('treats an unclosed fence as code until the end', () => {
    const doc = `before ${URL}\n\`\`\`\nafter ${URL}\n`
    expect(replaceOutsideCodeFences(doc, URL, '/x.png')).toBe(
      `before /x.png\n\`\`\`\nafter ${URL}\n`
    )
  })

  it('replaces every occurrence when there are no fences', () => {
    expect(replaceOutsideCodeFences(`a ${URL} b ${URL}`, URL, '/x.png')).toBe(
      'a /x.png b /x.png'
    )
  })
})
