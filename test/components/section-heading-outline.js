import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'

const read = file => fs.readFileSync(path.join(process.cwd(), file), 'utf8')

const faq = read('src/components/patterns/Faq/Faq.js')
const openSource = read('src/components/patterns/OpenSource/OpenSource.js')

const captionAt = (source, index) =>
  source.slice(index, source.indexOf('>', index))

const captionsIn = source =>
  [...source.matchAll(/<Caption\b/g)].map(({ index }) =>
    captionAt(source, index)
  )

describe('the supporting copy under a section title', () => {
  test('is a paragraph, so it does not read as a heading of its own', () => {
    const [lead] = captionsIn(faq).filter(caption =>
      caption.includes('px: [4, 0, 0, 0]')
    )
    expect(lead).toContain("as='p'")
    expect(openSource.slice(openSource.indexOf('<Caption'))).toMatch(
      /^<Caption\s+as='p'/
    )
  })

  test('keeps the FAQ questions as real headings', () => {
    const [question] = captionsIn(faq)
    expect(question).not.toContain("as='p'")
    expect(faq.indexOf('const Question')).toBeLessThan(faq.indexOf('<Caption'))
  })

  test('still leads each section with its title', () => {
    expect(faq.indexOf('<Subhead')).toBeLessThan(faq.indexOf('{caption}'))
    expect(openSource.indexOf('<Subhead')).toBeLessThan(
      openSource.indexOf('<RepoCardItem')
    )
  })
})
