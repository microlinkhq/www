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
    expect(
      showResponseFade({ headers: { 'content-type': 'IMAGE/PNG' } }, false)
    ).toBe(false)
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

  test('prints json, text, and image bodies', () => {
    const encode = text => new TextEncoder().encode(text)
    expect(
      responseBodyText({
        body: encode('{"status":"success","data":{"title":"Microlink"}}'),
        headers: { 'content-type': 'application/json; charset=utf-8' }
      })
    ).toBe('{\n  "title": "Microlink"\n}')
    expect(
      responseBodyText({
        body: encode('not json'),
        headers: { 'content-type': 'application/json' }
      })
    ).toBe('not json')
    expect(
      responseBodyText({
        body: encode('hello'),
        headers: { 'content-type': 'text/html' }
      })
    ).toBe('hello')
    expect(
      responseBodyText({
        body: bytes,
        headers: { 'content-type': 'IMAGE/PNG' }
      })
    ).toBe('Image content (image/png)\nSize: 3 bytes')
  })
})
