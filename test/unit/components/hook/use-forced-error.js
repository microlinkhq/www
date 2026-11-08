import { beforeEach, describe, expect, test, vi } from 'vitest'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

import { useForcedError } from '../../../../src/components/hook/use-forced-error'

vi.mock('components/hook/use-query-state', () => ({
  useQueryState: () => [globalThis.__forcedQuery, () => {}]
}))

vi.mock('react', async () => {
  const react = await vi.importActual('react')
  return {
    ...react,
    useEffect: effect => {
      effect()
    }
  }
})

const Probe = ({ onError }) => {
  useForcedError(onError)
  return null
}

describe('useForcedError', () => {
  beforeEach(() => {
    globalThis.__forcedQuery = { state: undefined }
  })

  test('writes the forced error for a state code', () => {
    globalThis.__forcedQuery = { state: ' erate ' }
    const onError = vi.fn()
    renderToStaticMarkup(<Probe onError={onError} />)
    expect(onError).toHaveBeenCalledWith(
      expect.objectContaining({ code: 'ERATE' })
    )
  })

  test('does not write when the state is empty or not a string', () => {
    const onError = vi.fn()
    globalThis.__forcedQuery = { state: '   ' }
    renderToStaticMarkup(<Probe onError={onError} />)
    globalThis.__forcedQuery = { state: ['ERATE'] }
    renderToStaticMarkup(<Probe onError={onError} />)
    expect(onError).not.toHaveBeenCalled()
  })
})
