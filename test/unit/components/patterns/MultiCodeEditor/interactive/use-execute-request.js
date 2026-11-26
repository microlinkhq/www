import { describe, expect, test } from 'vitest'
import { withoutSnippetKey } from '../../../../../../src/components/patterns/MultiCodeEditor/interactive/use-execute-request.js'

describe('withoutSnippetKey', () => {
  test('drops the snippet key and keeps the request options', () => {
    expect(
      withoutSnippetKey({ apiKey: 'YOUR_API_TOKEN', screenshot: true })
    ).toEqual({ screenshot: true })
    expect(withoutSnippetKey({ meta: false })).toEqual({ meta: false })
  })
})
