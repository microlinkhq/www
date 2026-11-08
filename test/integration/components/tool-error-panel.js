import { readFileSync } from 'node:fs'
import { describe, expect, test } from 'vitest'

const read = path =>
  readFileSync(new URL(`../../../${path}`, import.meta.url), 'utf8')

const FORCED_ERROR_TOOLS = [
  'src/components/pages/embed-url/EmbedTool.js',
  'src/pages/tools/url-to-markdown.js',
  'src/pages/tools/website-screenshot/animated.js',
  'src/pages/tools/website-screenshot/full-page.js',
  'src/pages/tools/website-screenshot/index.js',
  'src/pages/tools/website-screenshot/mobile.js',
  'src/pages/tools/website-to-pdf/index.js'
]

const BULK_TOOLS = [
  'src/pages/tools/website-screenshot/bulk.js',
  'src/pages/tools/website-to-pdf/bulk.js'
]

describe('tool error panel', () => {
  test('single-result tools force the panel from ?state=', () => {
    FORCED_ERROR_TOOLS.forEach(file => {
      expect(read(file), file).toContain('useForcedError(setError)')
    })
  })

  test('bulk tools force the panel from ?state= while idle', () => {
    BULK_TOOLS.forEach(file => {
      const source = read(file)
      expect(source, file).toContain('toForcedError(state)')
      expect(source, file).toContain("forcedError ? 'forced-error' : 'empty'")
    })
  })

  test('sitemap and sharing debugger overlay the forced error', () => {
    expect(
      read('src/components/pages/sitemap/hero/use-sitemap-state.js')
    ).toContain('error: toForcedError(query.state) || error')
    expect(
      read('src/components/pages/sharing-debugger/hero/index.js')
    ).toContain(
      "toForcedError(query.state) || (status === 'error' ? error : null)"
    )
  })

  test('the nytimes iframe cap is in both preview paths', () => {
    const source = read('src/components/pages/embed-url/EmbedTool.js')
    expect(source).toContain("src: 'https://www.nytimes.com/svc/oembed/'")
    expect(source).toContain("maxWidth: '440px'")
    expect(source.split('PROVIDER_FRAME_WIDTH_CSS').length - 1).toBe(3)
  })
})
