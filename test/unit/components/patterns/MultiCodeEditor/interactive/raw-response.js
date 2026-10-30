import { describe, expect, test } from 'vitest'
import { toRawResponse } from '../../../../../../src/components/patterns/MultiCodeEditor/interactive/raw-response.js'

const CONTENT_TYPE_JSON = { 'content-type': 'application/json' }
const CONTENT_TYPE_PNG = { 'content-type': 'image/png' }

describe('toRawResponse', () => {
  test('re-encodes a parsed JSON response so the viewers can decode it', () => {
    const body = { status: 'success', data: { title: 'Microlink' } }
    const result = {
      ...body,
      response: { body, headers: new Headers(CONTENT_TYPE_JSON) }
    }
    const raw = toRawResponse(result)
    expect(raw.headers).toEqual(CONTENT_TYPE_JSON)
    expect(JSON.parse(new TextDecoder().decode(raw.body))).toEqual(body)
  })

  test('keeps embed bytes intact and untouched', () => {
    const body = new Uint8Array([137, 80, 78, 71]).buffer
    const raw = toRawResponse({ body, headers: new Headers(CONTENT_TYPE_PNG) })
    expect(raw.headers).toEqual(CONTENT_TYPE_PNG)
    expect(raw.body).toBe(body)
    expect(raw.body.byteLength).toBe(4)
  })
})
