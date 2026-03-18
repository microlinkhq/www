import { describe, expect, it } from 'vitest'
import {
  validate,
  buildFixSnippet
} from '../src/components/pages/sharing-debugger/metatags/validators/index.js'

const baseMetadata = {
  title: 'Microlink sharing debugger',
  description:
    'Inspect Open Graph, social previews, and metadata issues before you share a link.',
  image: {
    url: 'https://example.com/og-image.png',
    width: 1200,
    height: 630,
    size: 1024 * 150,
    size_pretty: '150 kB'
  },
  logo: {
    url: 'https://example.com/logo.png',
    width: 256,
    height: 256,
    size: 1024 * 8,
    size_pretty: '8 kB'
  },
  url: 'https://example.com/post',
  publisher: 'Example',
  author: 'Microlink',
  lang: 'en-US',
  date: '2026-03-17T00:00:00.000Z'
}

describe('sharing debugger validators', () => {
  it('keeps the locale raw value separate from the display value', () => {
    const localeField = validate(baseMetadata).find(
      ({ name }) => name === 'locale'
    )

    expect(localeField.value).toBe('en-US')
    expect(localeField.displayValue).toContain('en-US')
    expect(localeField.displayValue).toContain('English')
  })

  it('does not recommend nonstandard logo or image tags', () => {
    const snippet = buildFixSnippet({
      issues: [
        { name: 'image', value: 'https://example.com/og-image.png' },
        {
          name: 'logo',
          value: 'https://example.com/logo.png',
          isNullable: false
        }
      ],
      metadata: baseMetadata
    })

    expect(snippet).not.toContain('meta name="image"')
    expect(snippet).not.toContain('property="og:logo"')
    expect(snippet).toContain(
      'name="twitter:card" content="summary_large_image"'
    )
    expect(snippet).toContain('rel="icon"')
  })

  it('builds locale snippets from the raw locale value', () => {
    const snippet = buildFixSnippet({
      issues: [{ name: 'locale', value: 'en-US' }],
      metadata: baseMetadata
    })

    expect(snippet).toContain('<!-- <html lang="en"> -->')
    expect(snippet).toContain('property="og:locale" content="en_US"')
    expect(snippet).not.toContain('English')
  })
})
