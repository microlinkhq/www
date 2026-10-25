import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'

const read = file => fs.readFileSync(path.join(process.cwd(), file), 'utf8')

const PRODUCT_TITLE = /^[^—–|.:]+ API — [^—–|]+$/
const HYPHEN_SEPARATOR = / - /

const toolbarLinks = read('src/components/patterns/Toolbar/ToolbarLinks.js')

const productPaths = () => {
  const start = toolbarLinks.indexOf("label: 'Products'")
  const end = toolbarLinks.indexOf("label: 'Tools'", start)
  const section = toolbarLinks.slice(start, end)
  return [...section.matchAll(/href: '(\/[^']*)'/g)].map(match => match[1])
}

const pageFile = pathname =>
  [`src/pages${pathname}.js`, `src/pages${pathname}/index.js`].find(file =>
    fs.existsSync(path.join(process.cwd(), file))
  )

const headBlock = source => {
  const start = source.indexOf('export const Head')
  return source.slice(start, source.indexOf('\n)', start))
}

const metaTitle = pageSource => {
  const [, module] = pageSource.match(
    /\bMETA\b[^}]*\}\s+from '(components\/pages\/[^']+)'/
  )
  const shared = read(`src/${module}.js`)
  const start = shared.indexOf('export const META = {')
  const [, title] = shared.slice(start).match(/^ {2}title: '([^']+)'/m)
  return title
}

const productTitle = pathname => {
  const source = read(pageFile(pathname))
  const head = headBlock(source)
  if (/title=\{META\.title\}/.test(head)) return metaTitle(source)
  const [, title] = head.match(/title='([^']+)'/)
  return title
}

describe('product page titles', () => {
  const paths = productPaths()

  test('reads every product from the toolbar', () => {
    expect(paths).toEqual(
      expect.arrayContaining(['/api', '/screenshot', '/search', '/insights'])
    )
    expect(paths.every(pageFile)).toBe(true)
  })

  test.each(paths)('%s title reads "<Keyword> API — <tagline>"', pathname => {
    const title = productTitle(pathname)
    expect(title).toMatch(PRODUCT_TITLE)
    expect(title).not.toMatch(HYPHEN_SEPARATOR)
  })
})
