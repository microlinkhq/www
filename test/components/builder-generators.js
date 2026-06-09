import { expect, describe, it } from 'vitest'

import {
  buildCardHtml,
  resolveStyle,
  DEFAULT_CONFIG
} from '../../src/helpers/link-card.js'
import {
  RUNTIME_RENDERER,
  FETCH_CORE,
  GENERATORS
} from '../../src/components/pages/builder/generators.js'

// Compile the shipped runtime renderer string into a callable function, exactly
// as it runs inside a generated component.
// eslint-disable-next-line no-new-func
const renderCard = new Function(
  'data',
  'style',
  `${RUNTIME_RENDERER}\nreturn renderCard(data, style)`
)

const SAMPLE = {
  url: 'https://example.com/a-post?ref=1',
  title: 'A "great" <article> about & things',
  description:
    'A reasonably long description that should exercise truncation and clamping across the small and large card variants without breaking anything.',
  publisher: 'Example & Co',
  author: 'Jane Doe',
  date: '2024-03-08T10:00:00.000Z',
  image: { url: 'https://example.com/og.png', palette: ['#112233'] },
  logo: { url: 'https://example.com/favicon.png' }
}

const runtimeStyle = config => ({
  ...resolveStyle(config),
  variant: config.variant
})

// Every variant × element/layout combination the generators can emit.
const VARIANTS = ['large', 'wide', 'small']
const CONFIGS = [
  { label: 'default', config: DEFAULT_CONFIG },
  {
    label: 'all elements + dark + author/date',
    config: {
      ...DEFAULT_CONFIG,
      theme: 'dark',
      metaBefore: false,
      elements: {
        description: true,
        siteIcon: true,
        siteName: true,
        authorTopic: true,
        date: true
      }
    }
  },
  {
    label: 'custom dimensions + image right',
    config: {
      ...DEFAULT_CONFIG,
      width: 520,
      height: 220,
      imagePosition: 'right'
    }
  },
  {
    label: 'no image data',
    config: DEFAULT_CONFIG,
    data: { ...SAMPLE, image: undefined, logo: undefined }
  }
]

describe('builder generators — runtime renderer parity', () => {
  for (const variant of VARIANTS) {
    for (const { label, config, data = SAMPLE } of CONFIGS) {
      it(`renders ${variant} identically to buildCardHtml (${label})`, () => {
        const cfg = { ...config, variant }
        const expected = buildCardHtml(data, cfg)
        const actual = renderCard(data, runtimeStyle(cfg))
        expect(actual).toBe(expected)
      })
    }
  }
})

describe('builder generators — framework output', () => {
  it('every generator returns a non-empty string', () => {
    for (const generate of Object.values(GENERATORS)) {
      const out = generate(DEFAULT_CONFIG)
      expect(typeof out).toBe('string')
      expect(out.length).toBeGreaterThan(100)
    }
  })

  it('selects pro endpoint via fetch core', () => {
    expect(FETCH_CORE).toContain('pro.microlink.io')
    expect(FETCH_CORE).toContain('api.microlink.io')
    expect(FETCH_CORE).toContain('x-api-key')
  })

  it('vanilla exposes the global microlink(selector, options)', () => {
    const out = GENERATORS.Vanilla(DEFAULT_CONFIG)
    expect(out).toContain('global.microlink = microlink')
    expect(out).toContain('querySelectorAll')
    expect(out).toContain('replaceWith')
  })

  it('react/vue/angular/svelte embed the renderer and fetch core', () => {
    for (const name of ['React', 'Vue', 'Angular', 'Svelte']) {
      const out = GENERATORS[name](DEFAULT_CONFIG)
      expect(out).toContain('function renderCard')
      expect(out).toContain('function microlinkFetch')
    }
  })
})
