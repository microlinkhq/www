import { beforeEach, describe, expect, test, vi } from 'vitest'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

import { useForcedError } from '../../../../src/components/hook/use-forced-error'

vi.mock('components/hook/use-query-state', () => ({
  useQueryState: () => [globalThis.__forcedQuery, () => {}]
}))

const Probe = ({ error }) => {
  const shown = useForcedError(error)
  return <>{shown?.code || 'none'}</>
}

const shown = error => renderToStaticMarkup(<Probe error={error} />)

describe('useForcedError', () => {
  beforeEach(() => {
    globalThis.__forcedQuery = { state: undefined }
  })

  test('a state code replaces the request error', () => {
    globalThis.__forcedQuery = { state: ' erate ' }
    expect(shown({ code: 'ETIMEOUT' })).toContain('ERATE')
  })

  test('without a state code the request error shows', () => {
    expect(shown({ code: 'ETIMEOUT' })).toContain('ETIMEOUT')
    globalThis.__forcedQuery = { state: '   ' }
    expect(shown({ code: 'EFATAL' })).toContain('EFATAL')
    globalThis.__forcedQuery = { state: ['ERATE'] }
    expect(shown({ code: 'EUNREACHABLE' })).toContain('EUNREACHABLE')
  })

  test('shows nothing when neither side is an error', () => {
    expect(shown(null)).toContain('none')
  })
})
