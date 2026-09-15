import { expect, test } from 'vitest'

import {
  maskTraceHeaders,
  toTracePayload
} from '../../src/components/pages/editor/trace'

test('masks the API key the way --trace does', () => {
  expect(maskTraceHeaders({ 'x-api-key': 'secret-key' })).toEqual({
    'x-api-key': 'secre…'
  })
})

test('keeps the --trace request/response shape', () => {
  expect(
    toTracePayload({
      requestUrl: 'https://api.microlink.io/?url=https%3A%2F%2Fexample.com',
      requestOptions: {
        responseType: 'json',
        headers: { 'x-api-key': 'secret-key' }
      },
      response: {
        url: 'https://api.microlink.io/?url=https%3A%2F%2Fexample.com',
        statusCode: 200,
        headers: { 'x-request-id': 'abc' },
        body: { status: 'success', data: { title: 'Example' } }
      }
    })
  ).toEqual({
    request: {
      url: 'https://api.microlink.io/?url=https%3A%2F%2Fexample.com',
      headers: { 'x-api-key': 'secre…' }
    },
    response: {
      url: 'https://api.microlink.io/?url=https%3A%2F%2Fexample.com',
      statusCode: 200,
      headers: { 'x-request-id': 'abc' },
      body: { status: 'success', data: { title: 'Example' } }
    }
  })
})
