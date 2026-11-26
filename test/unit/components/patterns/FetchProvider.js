import { describe, expect, test, vi } from 'vitest'

import {
  applyFetchError,
  errorCopy,
  fetchErrorState,
  finishFetch
} from '../../../../src/components/patterns/FetchProvider'

vi.mock('helpers/demo-links', () => ({
  findDemoLinkByVariations: () => undefined
}))

describe('FetchProvider error copy', () => {
  test('shows the API description with a link to learn more', () => {
    expect(
      errorCopy({
        code: 'ERATE',
        description: 'Your daily rate limit has been reached.',
        more: 'https://microlink.io/erate'
      })
    ).toEqual({
      text: 'Your daily rate limit has been reached.',
      more: 'https://microlink.io/erate',
      linkText: 'Learn more.'
    })
  })

  test('an error without a description asks to report the URL', () => {
    expect(errorCopy({ more: 'https://microlink.io/report' })).toEqual({
      text: 'The URL has something weird.',
      more: 'https://microlink.io/report',
      linkText: 'Report it.'
    })
    expect(errorCopy().text).toBe('The URL has something weird.')
    expect(
      errorCopy({ description: '', more: 'https://microlink.io/report' })
    ).toEqual({
      text: 'The URL has something weird.',
      more: 'https://microlink.io/report',
      linkText: 'Report it.'
    })
  })
})

describe('FetchProvider fetch settlement', () => {
  test('a superseded fetch does not settle, the current one does', () => {
    const apply = vi.fn()
    finishFetch(1, 2, apply)
    expect(apply).not.toHaveBeenCalled()
    finishFetch(2, 2, apply)
    expect(apply).toHaveBeenCalledTimes(1)
  })
})

describe('FetchProvider fetch failure', () => {
  test('a silent failure returns to the initial state and leaves the error', () => {
    const err = new Error('nope')
    const setStatus = vi.fn()
    const setError = vi.fn()
    expect(fetchErrorState(true, err)).toEqual({ status: 'initial' })
    applyFetchError(true, err, setStatus, setError)
    expect(setStatus).toHaveBeenCalledWith('initial')
    expect(setError).not.toHaveBeenCalled()
  })

  test('a failure the visitor can see keeps the error', () => {
    const err = new Error('nope')
    const setStatus = vi.fn()
    const setError = vi.fn()
    expect(fetchErrorState(false, err)).toEqual({ status: 'error', error: err })
    applyFetchError(false, err, setStatus, setError)
    expect(setStatus).toHaveBeenCalledWith('error')
    expect(setError).toHaveBeenCalledWith(err)
  })
})
