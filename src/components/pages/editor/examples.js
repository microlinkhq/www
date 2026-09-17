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
    id: 'page-state',
    label: 'Get agent-ready page state',
    files: filesFromEntry(
      toSdkSnippet({
        url: 'https://example.com',
        fn: `({ page }) => page.$$eval(
  'a[href],button,input:not([type=hidden]),select,textarea,[role=button],[role=link]',
  elements => {
    const selector = element => {
      const path = []
      for (let node = element; node && node !== document.body; node = node.parentElement) {
        const siblings = [...node.parentElement.children].filter(
          sibling => sibling.tagName === node.tagName
        )
        path.unshift(node.localName + (siblings.length > 1
          ? \`:nth-of-type(\${siblings.indexOf(node) + 1})\`
          : ''))
      }
      return \`body>\${path.join('>')}\`
    }
    const roles = { A: 'link', BUTTON: 'button', INPUT: 'input', SELECT: 'select', TEXTAREA: 'textbox' }
    const visible = element => {
      const style = getComputedStyle(element)
      return element.getClientRects().length && style.visibility !== 'hidden'
    }
    const text = element => element.getAttribute('aria-label') ||
      element.getAttribute('placeholder') ||
      (element.tagName === 'SELECT'
        ? element.selectedOptions[0]?.textContent
        : element.innerText) || ''
    return {
      title: document.title,
      url: location.href,
      elements: elements.filter(visible)
        .map((element, index) => ({
          index,
          role: element.getAttribute('role') || roles[element.tagName] || element.localName,
          text: text(element).replace(/\s+/g, ' ').trim(),
          selector: selector(element)
        }))
    }
  }
)`
      })
    )
  },
  {
    id: 'structured-data',
    label: 'Extract structured data',
    files: filesFromEntry(
      toSdkSnippet({
        url: 'https://microlink.io',
        fn: `({ page }) => page.$$eval('script[type="application/ld+json"]', scripts =>
  scripts.flatMap(script => {
    try {
      const value = JSON.parse(script.textContent)
      return Array.isArray(value) ? value : [value]
    } catch (_) {
      return []
    }
  })
)`
      })
    )
  },
  {
    id: 'page-outline',
    label: 'Build a page outline',
    files: filesFromEntry(
      toSdkSnippet({
        url: 'https://microlink.io',
        fn: `({ page }) => page.$$eval('h1, h2, h3, h4, h5, h6', headings =>
  headings
    .filter(heading => heading.getClientRects().length)
    .map(heading => ({
      level: Number(heading.tagName.slice(1)),
      text: heading.textContent.replace(/\\s+/g, ' ').trim()
    }))
    .filter(heading => heading.text)
)`
      })
    )
  },
  {
    id: 'technology-signals',
    label: 'Inspect technology signals',
    files: filesFromEntry(
      toSdkSnippet({
        url: 'https://microlink.io',
        fn: `({ page }) => page.evaluate(() => ({
  generator: document.querySelector('meta[name="generator"]')?.content || null,
  scripts: [...document.scripts]
    .map(script => script.src)
    .filter(Boolean)
    .map(src => new URL(src).hostname)
    .filter((host, index, hosts) => hosts.indexOf(host) === index),
  stylesheets: [...document.querySelectorAll('link[rel="stylesheet"][href]')]
    .map(link => new URL(link.href).hostname)
    .filter((host, index, hosts) => hosts.indexOf(host) === index),
  globals: ['React', 'Vue', 'angular', 'jQuery', 'Shopify', 'WordPress']
    .filter(name => name in window)
}))`
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
