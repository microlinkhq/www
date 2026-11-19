import { describe, expect, test } from 'vitest'
import { formatCaptureTags } from '../../../../../src/components/patterns/RaceContainer/utils'

describe('formatCaptureTags', () => {
  test('a full-page capture shows only its width, since the height follows the page', () => {
    expect(
      formatCaptureTags({
        width: 1920,
        height: 1080,
        fullPage: true,
        format: 'jpeg'
      })
    ).toEqual(['Desktop screenshot', '1920w', 'Full‑page', 'JPEG'])
  })

  test('a viewport capture shows both dimensions', () => {
    expect(
      formatCaptureTags({
        width: 393,
        height: 852,
        fullPage: false,
        format: 'png'
      })
    ).toEqual(['Mobile screenshot', '393×852', 'PNG'])
  })

  test('a capture without a height shows its width', () => {
    expect(formatCaptureTags({ width: 1280, format: 'png' })).toEqual([
      'Desktop screenshot',
      '1280w',
      'PNG'
    ])
  })

  test('a capture without a format omits that tag', () => {
    expect(
      formatCaptureTags({ width: 1280, height: 800, fullPage: false })
    ).toEqual(['Desktop screenshot', '1280×800'])
  })

  test('an unknown URL has no tags', () => {
    expect(formatCaptureTags(undefined)).toEqual([])
  })
})
