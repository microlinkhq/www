import { describe, expect, test } from 'vitest'
import {
  responseBodyText,
  showResponseFade
} from '../../../../../../src/components/patterns/MultiCodeEditor/interactive/hooks.js'

const bytes = new Uint8Array([1, 2, 3])

describe('showResponseFade', () => {
  test('shows the fade when the response or its content type is missing', () => {
    expect(showResponseFade(null, false)).toBe(true)
    expect(showResponseFade({}, false)).toBe(true)
    expect(showResponseFade({ headers: undefined }, false)).toBe(true)
    expect(showResponseFade({ headers: {} }, false)).toBe(true)
    expect(
      showResponseFade(
        { headers: { 'content-type': 'application/json' } },
        false
      )
    ).toBe(true)
  })

  test('hides the fade for an image and keeps it for the api key form', () => {
    const image = { headers: { 'content-type': 'image/png' } }
    expect(showResponseFade(image, false)).toBe(false)
    expect(showResponseFade(image, true)).toBe(true)
  })
})

describe('responseBodyText', () => {
  test('describes a response that has no content type', () => {
    expect(responseBodyText({ body: bytes, headers: {} })).toBe(
      'Binary content ()\nSize: 3 bytes'
    )
    expect(responseBodyText({ body: bytes })).toBe(
      'Binary content ()\nSize: 3 bytes'
    )
  })

  test('still rejects an unsupported content type', () => {
    expect(() =>
      responseBodyText({
        body: bytes,
        headers: { 'content-type': 'application/pdf' }
      })
    ).toThrow('Unsupported content type: application/pdf')
  })
})
