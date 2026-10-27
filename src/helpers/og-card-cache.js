import { createHash } from 'node:crypto'
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync
} from 'node:fs'
import path from 'node:path'

export const cardKey = inputs =>
  createHash('sha256').update(JSON.stringify(inputs)).digest('hex')

const readManifest = manifestPath => {
  try {
    return JSON.parse(readFileSync(manifestPath, 'utf8'))
  } catch {
    return {}
  }
}

const cardFile = slug => `${slug}.png`

const removeOrphanCards = (outDir, cards) => {
  const expected = new Set(cards.map(card => cardFile(card.slug)))
  for (const file of readdirSync(outDir)) {
    if (file.endsWith('.png') && !expected.has(file)) {
      rmSync(path.join(outDir, file))
    }
  }
}

export const reuseRenderedCards = async ({
  cards,
  outDir,
  manifestPath,
  render
}) => {
  mkdirSync(outDir, { recursive: true })
  const manifest = readManifest(manifestPath)
  const isUpToDate = card =>
    manifest[card.slug] === card.key &&
    existsSync(path.join(outDir, cardFile(card.slug)))

  const reused = cards.filter(isUpToDate)
  const stale = cards.filter(card => !isUpToDate(card))
  const renderedSlugs = new Set((await render(stale)).map(card => card.slug))
  const rendered = stale.filter(card => renderedSlugs.has(card.slug))

  removeOrphanCards(outDir, cards)
  mkdirSync(path.dirname(manifestPath), { recursive: true })
  writeFileSync(
    manifestPath,
    JSON.stringify(
      Object.fromEntries(
        [...reused, ...rendered].map(card => [card.slug, card.key])
      )
    )
  )

  return { reused: reused.length, rendered: rendered.length }
}
