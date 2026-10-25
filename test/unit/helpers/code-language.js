import { describe, expect, test, vi } from 'vitest'

import {
  CODE_LANGUAGE_STORAGE_KEY,
  createCodeLanguageStore,
  rememberLanguage,
  resolveLanguage
} from '../../../src/helpers/code-language.js'

const memoryStorage = (entries = {}) => {
  const data = new Map(Object.entries(entries))
  return {
    data,
    getItem: key => (data.has(key) ? data.get(key) : null),
    setItem: (key, value) => data.set(key, String(value))
  }
}

const storageEvent = key => Object.assign(new Event('storage'), { key })

const MQL_LANGUAGES = [
  'CLI',
  'cURL',
  'JavaScript',
  'Python',
  'Ruby',
  'PHP',
  'Golang'
]

describe('rememberLanguage', () => {
  test('puts the latest choice first and drops older duplicates', () => {
    expect(rememberLanguage(['Python', 'Ruby'], 'Ruby')).toEqual([
      'Ruby',
      'Python'
    ])
  })

  test('deduplicates labels case-insensitively', () => {
    expect(rememberLanguage(['ruby'], 'Ruby')).toEqual(['Ruby'])
  })

  test('keeps the list bounded', () => {
    const recent = Array.from({ length: 12 }, (_, index) => `lang-${index}`)
    expect(rememberLanguage(recent, 'next')).toHaveLength(10)
  })
})

describe('resolveLanguage', () => {
  test('picks the most recent language the editor offers', () => {
    expect(resolveLanguage(MQL_LANGUAGES, ['Vue', 'Ruby'], 'JavaScript')).toBe(
      'Ruby'
    )
  })

  test('falls back to the default when nothing recent matches', () => {
    expect(resolveLanguage(['React', 'Vue'], ['Ruby'], 'Vue')).toBe('Vue')
    expect(resolveLanguage(MQL_LANGUAGES, [], 'JavaScript')).toBe('JavaScript')
  })

  test('returns the editor label even when the stored case differs', () => {
    expect(resolveLanguage(MQL_LANGUAGES, ['ruby'], 'JavaScript')).toBe('Ruby')
  })
})

describe('createCodeLanguageStore', () => {
  test('reads the persisted list and keeps the snapshot referentially stable', () => {
    const storage = memoryStorage({
      [CODE_LANGUAGE_STORAGE_KEY]: JSON.stringify(['Ruby', 'Python'])
    })
    const store = createCodeLanguageStore({ storage })

    expect(store.getSnapshot()).toEqual(['Ruby', 'Python'])
    expect(store.getSnapshot()).toBe(store.getSnapshot())
    expect(store.getServerSnapshot()).toEqual([])
  })

  test('remember persists the choice and notifies every subscriber', () => {
    const storage = memoryStorage()
    const store = createCodeLanguageStore({ storage })
    const first = vi.fn()
    const second = vi.fn()
    store.subscribe(first)
    store.subscribe(second)

    store.remember('Ruby')

    expect(storage.data.get(CODE_LANGUAGE_STORAGE_KEY)).toBe(
      JSON.stringify(['Ruby'])
    )
    expect(store.getSnapshot()).toEqual(['Ruby'])
    expect(first).toHaveBeenCalledTimes(1)
    expect(second).toHaveBeenCalledTimes(1)
  })

  test('a storage event from another tab refreshes the snapshot', () => {
    const storage = memoryStorage()
    const target = new EventTarget()
    const store = createCodeLanguageStore({ storage, target })
    const listener = vi.fn()
    store.subscribe(listener)

    storage.setItem(CODE_LANGUAGE_STORAGE_KEY, JSON.stringify(['PHP']))
    target.dispatchEvent(storageEvent('unrelated-key'))
    expect(listener).not.toHaveBeenCalled()

    target.dispatchEvent(storageEvent(CODE_LANGUAGE_STORAGE_KEY))
    expect(listener).toHaveBeenCalledTimes(1)
    expect(store.getSnapshot()).toEqual(['PHP'])

    storage.data.clear()
    target.dispatchEvent(storageEvent(null))
    expect(store.getSnapshot()).toEqual([])
  })

  test('the storage listener is attached once and removed with the last subscriber', () => {
    const target = new EventTarget()
    const add = vi.spyOn(target, 'addEventListener')
    const remove = vi.spyOn(target, 'removeEventListener')
    const store = createCodeLanguageStore({ storage: memoryStorage(), target })

    const unsubscribeFirst = store.subscribe(() => {})
    const unsubscribeSecond = store.subscribe(() => {})
    expect(add).toHaveBeenCalledTimes(1)

    unsubscribeFirst()
    expect(remove).not.toHaveBeenCalled()
    unsubscribeSecond()
    expect(remove).toHaveBeenCalledTimes(1)
  })

  test('tolerates legacy bare strings and malformed values', () => {
    expect(
      createCodeLanguageStore({
        storage: memoryStorage({ [CODE_LANGUAGE_STORAGE_KEY]: 'Ruby' })
      }).getSnapshot()
    ).toEqual(['Ruby'])
    expect(
      createCodeLanguageStore({
        storage: memoryStorage({ [CODE_LANGUAGE_STORAGE_KEY]: '{"a":1}' })
      }).getSnapshot()
    ).toEqual([])
    expect(
      createCodeLanguageStore({
        storage: memoryStorage({
          [CODE_LANGUAGE_STORAGE_KEY]: JSON.stringify(['Ruby', 3, ''])
        })
      }).getSnapshot()
    ).toEqual(['Ruby'])
  })

  test('works without storage, as on the server or with storage blocked', () => {
    const store = createCodeLanguageStore()
    expect(store.getSnapshot()).toEqual([])
    expect(() => store.remember('Ruby')).not.toThrow()
    expect(store.getSnapshot()).toEqual(['Ruby'])
  })
})
