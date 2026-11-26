import { describe, expect, test } from 'vitest'
import {
  STORED_API_KEY,
  clearStoredApiKey
} from '../../../src/helpers/clear-stored-api-key'

const memoryStorage = entries => {
  const store = new Map(Object.entries(entries))
  return {
    removeItem: key => store.delete(key),
    entries: () => Object.fromEntries(store)
  }
}

describe('clearStoredApiKey', () => {
  test('removes a key saved by an earlier visit and keeps everything else', () => {
    const localStorage = memoryStorage({
      [STORED_API_KEY]: '"pasted"',
      'microlink.attribution': '{}'
    })
    clearStoredApiKey({ localStorage })
    expect(localStorage.entries()).toEqual({ 'microlink.attribution': '{}' })
  })

  test('does nothing when no key was saved', () => {
    const localStorage = memoryStorage({})
    clearStoredApiKey({ localStorage })
    expect(localStorage.entries()).toEqual({})
  })

  test('survives a browser that blocks storage access', () => {
    const win = {
      get localStorage () {
        throw new DOMException('The operation is insecure.', 'SecurityError')
      }
    }
    expect(() => clearStoredApiKey(win)).not.toThrow()
  })
})
