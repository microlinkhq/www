import { expect, describe, it } from 'vitest'

import { collectTimestamps } from '../../../scripts/git-timestamps'

const LOG = [
  '2026-09-01T10:00:00+02:00',
  '',
  'src/content/security.md',
  'src/pages/index.js',
  '2026-10-26T11:12:42+01:00',
  '',
  'src/content/security.md',
  'README.md'
].join('\n')

const NOW = new Date('2026-11-08T10:53:39+01:00')

describe('collectTimestamps', () => {
  it('stamps files with the day of their first and last commit', () => {
    expect(collectTimestamps({ log: LOG, now: NOW })).toEqual({
      created: {
        'src/content/security.md': '2026-09-01T00:00:00.000Z',
        'src/pages/index.js': '2026-09-01T00:00:00.000Z'
      },
      modified: {
        'src/content/security.md': '2026-10-26T00:00:00.000Z',
        'src/pages/index.js': '2026-09-01T00:00:00.000Z'
      }
    })
  })

  it('stamps files staged in the commit being made with today', () => {
    const { modified, created } = collectTimestamps({
      log: LOG,
      staged: 'src/content/security.md\nsrc/content/new-page.md\n',
      now: NOW
    })

    expect(modified['src/content/security.md']).toBe('2026-11-08T00:00:00.000Z')
    expect(created['src/content/security.md']).toBe('2026-09-01T00:00:00.000Z')
    expect(modified['src/content/new-page.md']).toBe('2026-11-08T00:00:00.000Z')
    expect(created['src/content/new-page.md']).toBe('2026-11-08T00:00:00.000Z')
    expect(modified['src/pages/index.js']).toBe('2026-09-01T00:00:00.000Z')
  })

  it('ignores staged files outside content and pages', () => {
    const { modified } = collectTimestamps({
      log: LOG,
      staged: 'README.md\nscripts/git-timestamps.js',
      now: NOW
    })

    expect(Object.keys(modified)).toEqual([
      'src/content/security.md',
      'src/pages/index.js'
    ])
  })

  it('outputs keys sorted by path', () => {
    const { modified } = collectTimestamps({
      log: LOG,
      staged: 'src/content/a.md',
      now: NOW
    })

    expect(Object.keys(modified)).toEqual([
      'src/content/a.md',
      'src/content/security.md',
      'src/pages/index.js'
    ])
  })
})
