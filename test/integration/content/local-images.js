import { existsSync, readdirSync, readFileSync } from 'fs'
import path from 'path'
import { expect, test } from 'vitest'

const ROOT = path.resolve(__dirname, '../../..')
const CONTENT_DIR = path.join(ROOT, 'src/content')
const STATIC_DIR = path.join(ROOT, 'static')

const MARKDOWN_EXTENSION = /\.mdx?$/
const LOCAL_IMAGE = /!\[[^\]]*\]\((\/[^)\s]+)\)/g

const markdownFiles = readdirSync(CONTENT_DIR, {
  recursive: true,
  withFileTypes: true
})
  .filter(entry => entry.isFile() && MARKDOWN_EXTENSION.test(entry.name))
  .map(entry => path.join(entry.parentPath, entry.name))

const localImages = markdownFiles.flatMap(file =>
  [...readFileSync(file, 'utf8').matchAll(LOCAL_IMAGE)].map(([, image]) => ({
    file: path.relative(ROOT, file),
    image
  }))
)

test('markdown content references local images', () => {
  expect(localImages.length).toBeGreaterThan(0)
})

test('every local image in markdown content exists in static/', () => {
  const missing = localImages.filter(
    ({ image }) => !existsSync(path.join(STATIC_DIR, image))
  )
  expect(missing).toEqual([])
})
