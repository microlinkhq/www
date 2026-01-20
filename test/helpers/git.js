import { describe, it, expect, vi, beforeEach } from 'vitest'

const tinyspawn = vi.hoisted(() => vi.fn())
const readFile = vi.hoisted(() => vi.fn())

vi.mock('tinyspawn', () => ({ default: tinyspawn }))
vi.mock('node:fs/promises', () => ({ readFile }))

const loadGitHelpers = async () => {
  const helpers = await import('../../src/helpers/git')
  return helpers
}

describe('git helpers', () => {
  beforeEach(() => {
    tinyspawn.mockReset()
    readFile.mockReset()
  })

  it('getLastModifiedDate calls git log for filepath', async () => {
    vi.resetModules()
    readFile.mockResolvedValueOnce(JSON.stringify({}))
    tinyspawn.mockResolvedValueOnce({ stdout: '2024-01-01T00:00:00Z' })

    const { getLastModifiedDate } = await loadGitHelpers()
    const result = await getLastModifiedDate('src/helpers/git.js')

    expect(tinyspawn).toHaveBeenCalledWith(
      'git log --max-count=1 --format=%cI -- src/helpers/git.js'
    )
    expect(result).toBe('2024-01-01T00:00:00.000Z')
  })

  it('getLastModifiedDate uses precomputed timestamps when available', async () => {
    vi.resetModules()
    readFile.mockResolvedValueOnce(
      JSON.stringify({
        'src/helpers/git.js': '2024-01-01T00:00:00Z'
      })
    )

    const { getLastModifiedDate } = await loadGitHelpers()
    const result = await getLastModifiedDate('src/helpers/git.js')

    expect(tinyspawn).not.toHaveBeenCalled()
    expect(result).toBe('2024-01-01T00:00:00.000Z')
  })

  it('branchName returns current branch', async () => {
    vi.resetModules()
    readFile.mockResolvedValueOnce(JSON.stringify({}))
    tinyspawn.mockResolvedValueOnce({ stdout: 'main' })

    const { branchName } = await loadGitHelpers()
    const result = await branchName()

    expect(tinyspawn).toHaveBeenCalledWith('git rev-parse --abbrev-ref HEAD')
    expect(result).toBe('main')
  })
})
