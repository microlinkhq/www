import { expect, it } from 'vitest'

import { getFileType } from '../../../scripts/fetch-data/providers/fetch-formats'

it('resolves the media type from the file extension', () => {
  const cdn = 'https://cdn.microlink.io/file-examples'
  expect(getFileType(`${cdn}/sample.png`)).toBe('image')
  expect(getFileType(`${cdn}/sample.webp`)).toBe('image')
  expect(getFileType(`${cdn}/sample.mp4`)).toBe('video')
  expect(getFileType(`${cdn}/sample.mp3`)).toBe('audio')
  expect(getFileType(`${cdn}/sample.pdf`)).toBe('application')
})

it('falls back to application for unknown extensions', () => {
  expect(getFileType('https://example.com/file.unknownext')).toBe('application')
})
