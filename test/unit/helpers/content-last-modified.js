import { describe, expect, test, vi } from 'vitest'

import { contentLastModified } from '../../../src/helpers/content-last-modified.js'

const node = (modified, contentFilePath = 'data/skills-content/optimo.md') => ({
  frontmatter: { modified },
  internal: { contentFilePath }
})

describe('contentLastModified', () => {
  test('uses frontmatter.modified and does not ask git', () => {
    const lastModifiedDate = vi.fn()
    expect(
      contentLastModified(node('2026-05-26T15:26:42+02:00'), lastModifiedDate)
    ).toBe('2026-05-26T13:26:42.000Z')
    expect(lastModifiedDate).not.toHaveBeenCalled()
  })

  test('accepts a Date instance', () => {
    const lastModifiedDate = vi.fn()
    expect(
      contentLastModified(
        node(new Date('2026-05-26T13:26:42.000Z')),
        lastModifiedDate
      )
    ).toBe('2026-05-26T13:26:42.000Z')
    expect(lastModifiedDate).not.toHaveBeenCalled()
  })

  test('asks git when the page has no frontmatter', () => {
    const lastModifiedDate = vi.fn(() => '2026-01-01T00:00:00.000Z')
    const page = {
      internal: { contentFilePath: 'data/skills-content/optimo.md' }
    }
    expect(contentLastModified(page, lastModifiedDate)).toBe(
      '2026-01-01T00:00:00.000Z'
    )
    expect(lastModifiedDate).toHaveBeenCalledWith(
      'data/skills-content/optimo.md'
    )
  })

  test('asks git when frontmatter has no modified date', () => {
    const lastModifiedDate = vi.fn(() => '2026-01-01T00:00:00.000Z')
    const page = {
      frontmatter: { title: 'Optimo' },
      internal: { contentFilePath: 'data/skills-content/optimo.md' }
    }
    expect(contentLastModified(page, lastModifiedDate)).toBe(
      '2026-01-01T00:00:00.000Z'
    )
    expect(lastModifiedDate).toHaveBeenCalledOnce()
  })

  test.each([null, '', 'not-a-date'])(
    'asks git when modified is %j',
    modified => {
      const lastModifiedDate = vi.fn(() => '2026-01-01T00:00:00.000Z')
      expect(contentLastModified(node(modified), lastModifiedDate)).toBe(
        '2026-01-01T00:00:00.000Z'
      )
      expect(lastModifiedDate).toHaveBeenCalledOnce()
    }
  )
})
