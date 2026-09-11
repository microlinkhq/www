import { ENTRY_FILE, filesFromEntry, toSdkSnippet } from './shared'

export const EXAMPLES = [
  {
    id: 'first-function',
    label: 'Your first function',
    files: filesFromEntry(
      toSdkSnippet({
        url: 'https://example.com',
        fn: '({ page }) => page.title()',
        log: 'ola'
      })
    )
  },
  {
    id: 'no-browser',
    label: 'Skip the browser',
    files: filesFromEntry(
      toSdkSnippet({
        url: 'https://example.com',
        fn: '() => 40 + 2'
      })
    )
  },
  {
    id: 'throw',
    label: 'Read a thrown error',
    files: filesFromEntry(
      toSdkSnippet({
        url: 'https://example.com',
        fn: '() => { throw new Error("boom") }'
      })
    )
  },
  {
    id: 'eval',
    label: 'Read an element',
    files: filesFromEntry(
      toSdkSnippet({
        url: 'https://example.com',
        fn: "({ page }) => page.$eval('h1', el => el.textContent)"
      })
    )
  },
  {
    id: 'click-wait',
    label: 'Click, wait, then scrape',
    files: filesFromEntry(
      toSdkSnippet({
        url: 'https://news.ycombinator.com',
        fn: `async ({ page }) => {
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
    page.click('a.morelink')
  ])
  return page.$$eval('.titleline a', els =>
    els.map(el => el.textContent)
  )
}`
      })
    )
  },
  {
    id: 'cheerio',
    label: 'require() a package',
    files: filesFromEntry(
      toSdkSnippet({
        url: 'https://microlink.io/blog',
        fn: `async ({ page }) => {
  const cheerio = require('cheerio')
  const $ = cheerio.load(await page.content())
  return $('article').map((i, el) => ({
    title: $(el).find('h2, h3').first().text(),
    href: $(el).find('a').attr('href')
  })).get()
}`
      })
    )
  },
  {
    id: 'multiple-files',
    label: 'Multiple files',
    files: {
      [ENTRY_FILE]: `import createClient from 'microlink.io'
import { scrape } from './scrape.mjs'

const microlink = createClient()

export default microlink.function('https://example.com', scrape)
`,
      'scrape.mjs': `export const scrape = ({ page }) => page.title()
`
    }
  },
  {
    id: 'typescript',
    label: 'TypeScript function',
    files: {
      [ENTRY_FILE]: `import createClient from 'microlink.io'
import { scrape } from './scrape.ts'

const microlink = createClient()

export default microlink.function('https://example.com', scrape)
`,
      'scrape.ts': `type Page = {
  title: () => Promise<string>
  $eval: <T>(selector: string, fn: (el: Element) => T) => Promise<T>
}

export const scrape = async ({ page }: { page: Page }) => {
  const title = await page.title()
  const heading = await page.$eval('h1', el => el.textContent)
  return { title, heading }
}
`
    }
  }
]

export const DEFAULT_EXAMPLE = EXAMPLES[0]
export const DEFAULT_FILES = DEFAULT_EXAMPLE.files

export const exampleIdForFiles = files => {
  const serialized = JSON.stringify(files)
  const match = EXAMPLES.find(
    example => JSON.stringify(example.files) === serialized
  )
  return match ? match.id : 'custom'
}
