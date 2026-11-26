import { describe, expect, test } from 'vitest'

import {
  errorCopy,
  fetchErrorState
} from '../../../../src/components/patterns/FetchProvider'

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

describe('FetchProvider fetch failure', () => {
  test('a silent failure returns to the initial state', () => {
    expect(fetchErrorState(true, new Error('nope'))).toEqual({
      status: 'initial'
    })
  })

  test('a failure the visitor can see keeps the error', () => {
    const err = new Error('nope')
    expect(fetchErrorState(false, err)).toEqual({ status: 'error', error: err })
  })
})
