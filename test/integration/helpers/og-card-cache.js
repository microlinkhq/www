import {
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync
} from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { beforeEach, describe, expect, test } from 'vitest'

import {
  cardKey,
  reuseRenderedCards
} from '../../../src/helpers/og-card-cache.js'

const card = (slug, inputs = slug) => ({
  pathname: `/${slug}`,
  slug,
  key: cardKey([inputs])
})

let outDir
let manifestPath

const renderInto = (dir, { failing = [] } = {}) => {
  const calls = []
  const render = async cards => {
    calls.push(cards.map(card => card.slug))
    return cards.flatMap(card => {
      if (failing.includes(card.slug)) return []
      writeFileSync(path.join(dir, `${card.slug}.png`), card.key)
      return [{ slug: card.slug }]
    })
  }
  return { render, calls }
}

const build = (cards, options) => {
  const renderer = renderInto(outDir, options)
  return reuseRenderedCards({
    cards,
    outDir,
    manifestPath,
    render: renderer.render
  }).then(result => ({ ...result, calls: renderer.calls }))
}

beforeEach(() => {
  const root = mkdtempSync(path.join(tmpdir(), 'og-card-cache-'))
  outDir = path.join(root, 'public', 'images', 'og')
  manifestPath = path.join(root, 'node_modules', '.cache', 'og-cards.json')
})

describe('cardKey', () => {
  test('changes when any card input changes', () => {
    expect(cardKey(['2.2.0', '/blog', { title: 'A' }])).toBe(
      cardKey(['2.2.0', '/blog', { title: 'A' }])
    )
    expect(cardKey(['2.2.0', '/blog', { title: 'A' }])).not.toBe(
      cardKey(['2.2.0', '/blog', { title: 'B' }])
    )
    expect(cardKey(['2.2.0', '/blog', { title: 'A' }])).not.toBe(
      cardKey(['2.3.0', '/blog', { title: 'A' }])
    )
  })
})

describe('reuseRenderedCards', () => {
  test('renders every card on the first build', async () => {
    const result = await build([card('a'), card('b')])
    expect(result).toMatchObject({ reused: 0, rendered: 2 })
    expect(result.calls).toEqual([['a', 'b']])
  })

  test('renders only cards whose inputs changed since the last build', async () => {
    await build([card('a'), card('b')])
    const result = await build([card('a'), card('b', 'b-new-title')])
    expect(result).toMatchObject({ reused: 1, rendered: 1 })
    expect(result.calls).toEqual([['b']])
    expect(readFileSync(path.join(outDir, 'b.png'), 'utf8')).toBe(
      cardKey(['b-new-title'])
    )
  })

  test('re-renders a card whose file is gone even if the manifest lists it', async () => {
    await build([card('a')])
    rmSync(path.join(outDir, 'a.png'))
    const result = await build([card('a')])
    expect(result.calls).toEqual([['a']])
  })

  test('retries a card that failed to render on the next build', async () => {
    await build([card('a'), card('b')], { failing: ['b'] })
    const result = await build([card('a'), card('b')])
    expect(result).toMatchObject({ reused: 1, rendered: 1 })
    expect(result.calls).toEqual([['b']])
  })

  test('removes cards for pages that no longer exist', async () => {
    await build([card('a'), card('b')])
    await build([card('a')])
    expect(readdirSync(outDir)).toEqual(['a.png'])
  })

  test('treats a corrupt manifest as an empty one', async () => {
    await build([card('a')])
    writeFileSync(manifestPath, '{not json')
    const result = await build([card('a')])
    expect(result).toMatchObject({ reused: 0, rendered: 1 })
  })
})
