import { describe, expect, it } from 'vitest'
import {
  buildSharingDebuggerUrl,
  buildSharingDebuggerDisplayUrl
} from '../../src/helpers/share-debugger-url'

describe('buildSharingDebuggerUrl', () => {
  it('returns an empty string when no url is provided', () => {
    expect(buildSharingDebuggerUrl('')).toBe('')
  })

  it('normalizes and encodes the analyzed url', () => {
    expect(buildSharingDebuggerUrl('example.com')).toBe(
      'https://microlink.io/tools/sharing-debugger?url=https%3A%2F%2Fexample.com'
    )
  })

  it('preserves an already absolute url', () => {
    expect(buildSharingDebuggerUrl('https://example.com/post')).toBe(
      'https://microlink.io/tools/sharing-debugger?url=https%3A%2F%2Fexample.com%2Fpost'
    )
  })
})

describe('buildSharingDebuggerDisplayUrl', () => {
  it('returns an empty string when no url is provided', () => {
    expect(buildSharingDebuggerDisplayUrl('')).toBe('')
  })

  it('shows the normalized url without encoded delimiters', () => {
    expect(buildSharingDebuggerDisplayUrl('example.com')).toBe(
      'https://microlink.io/tools/sharing-debugger?url=https://example.com'
    )
  })
})
