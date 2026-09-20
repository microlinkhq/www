import { getSitemapUrls } from '../../../helpers/get-sitemap-urls'

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
    id: 'metadata',
    label: 'Read metadata',
    files: filesFromEntry(
      toSdkSnippet({
        url: 'https://microlink.io',
        fn: '({ page }) => page.metadata()'
      })
    )
  },
  {
    id: 'extract-css',
    label: 'Extract with CSS rules',
    files: filesFromEntry(
      toSdkSnippet({
        url: 'https://microlink.io',
        fn: `({ page }) => page.extract({
  title: { selector: 'h1', attr: 'text' },
  description: {
    selector: 'meta[name="description"]',
    attr: 'content'
  }
})`
      })
    )
  },
  {
    id: 'extract-list',
    label: 'Extract a collection',
    files: filesFromEntry(
      toSdkSnippet({
        url: 'https://news.ycombinator.com',
        fn: `({ page }) => page.extract({
  stories: {
    selectorAll: '.athing',
    attr: {
      title: { selector: '.titleline > a', attr: 'text' },
      href: { selector: '.titleline > a', attr: 'href', type: 'url' }
    }
  }
})`
      })
    )
  },
  {
    id: 'extract-evaluate',
    label: 'Extract with evaluate',
    files: filesFromEntry(
      toSdkSnippet({
        url: 'https://vercel.com',
        fn: `({ page }) => page.extract({
  version: {
    evaluate: 'window.next.version',
    type: 'string'
  }
})`
      })
    )
  },
  {
    id: 'sitemap',
    label: 'List sitemap URLs',
    files: filesFromEntry(
      toSdkSnippet({
        url: 'https://microlink.io',
        fn: getSitemapUrls
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
    id: 'extract',
    label: 'Read the page',
    files: filesFromEntry(
      toSdkSnippet({
        url: 'https://microlink.io',
        fn: `({ page }) => page.evaluate(() => ({
  title: document.title,
  links: document.links.length,
  resources: performance.getEntriesByType('resource').length
}))`
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
    id: 'inject',
    label: 'Inject a script',
    files: filesFromEntry(
      toSdkSnippet({
        url: 'https://microlink.io',
        fn: `({ page }) => page.evaluate(() =>
  $('a[href^="/docs"]').map((i, el) => el.href).get()
)`,
        opts: "{ scripts: 'https://code.jquery.com/jquery-3.5.0.min.js' }"
      })
    )
  },
  {
    id: 'proxy',
    label: 'Run through a proxy',
    files: filesFromEntry(
      toSdkSnippet({
        url: 'https://github.com/microlinkhq/mql',
        fn: `async ({ page }) => {
  await page.waitForSelector('#repo-stars-counter-star')
  return page.$eval('#repo-stars-counter-star', el => el.title)
}`,
        opts: "{ proxy: { location: 'us' } }"
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
      'scrape.ts': `import type { FunctionArgs } from 'microlink.io'

export const scrape = async ({ page }: FunctionArgs) => {
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
