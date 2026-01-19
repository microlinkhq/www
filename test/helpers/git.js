import { describe, it, expect, vi } from 'vitest'

const tinyspawn = vi.hoisted(() => vi.fn())

vi.mock('tinyspawn', () => ({ default: tinyspawn }))

/* eslint-disable import/first */
import { getLastModifiedDate, branchName } from '../../src/helpers/git'
/* eslint-enable import/first */

describe('git helpers', () => {
  it('getLastModifiedDate calls git log for filepath', async () => {
    tinyspawn.mockResolvedValueOnce({ stdout: '2024-01-01T00:00:00Z' })

    const result = await getLastModifiedDate('src/helpers/git.js')

    expect(tinyspawn).toHaveBeenCalledWith(
      'git log --max-count=1 --format=%cI -- src/helpers/git.js'
    )
    expect(result).toBe('2024-01-01T00:00:00.000Z')
  })

  it('branchName returns current branch', async () => {
    tinyspawn.mockResolvedValueOnce({ stdout: 'main' })

    const result = await branchName()

    expect(tinyspawn).toHaveBeenCalledWith('git rev-parse --abbrev-ref HEAD')
    expect(result).toBe('main')
  })
})
