export const CONTENT = {
  slug: 'scraping/load-more-and-pagination',
  head: {
    title: 'Scrape paginated lists and Load more buttons',
    description:
      'Scrape paginated websites one call per page in parallel, or click a Load more button inside a remote Puppeteer function until the list is complete.'
  },
  hero: {
    title: 'Scrape paginated results and the items behind a Load more button',
    intro:
      'To scrape a Load more button or a paginated website you need every item, not the first twenty. Catalogs, job boards, review pages, directories and search results all split their lists across pages or hide them behind a button. The [Scraping API](/features/scraping) covers both: one request per page for numbered pagination, and a short function for lists that grow on click.',
    cta: { label: 'Start with the Scraping API', href: '/features/scraping' }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'The first request only returns the first page of results',
    paragraphs: [
      'Your rules work, the array comes back, and it has exactly as many items as the first page shows. The rest sit behind a page 2 link, a ?page= parameter or a Load more button that fetches the next batch with JavaScript, and none of them are in the HTML you scraped.',
      'Writing a crawler for that means a queue, a loop and a browser you keep alive between pages, plus logic to notice the end of the list. For Load more buttons it means Puppeteer code that clicks, waits for the new items and repeats, running on infrastructure you have to host and scale.',
      'Split the problem by pagination type. Numbered pages have their own URLs, so each one is a normal extraction request and they run in parallel. A Load more button needs clicks inside one browser session, which is what the [function parameter](/docs/api/parameters/function) is for: your Puppeteer code runs on Microlink’s browser, clicks until the list is complete and returns the items.'
    ],
    live: {
      label: 'Open the live JSON for page 2 of a paginated demo',
      request: {
        url: 'https://quotes.toscrape.com/page/2/',
        params: {
          data: {
            quotes: {
              selectorAll: '.quote',
              attr: {
                text: { selector: '.text', attr: 'text' },
                author: { selector: '.author', attr: 'text' }
              }
            }
          },
          meta: false
        }
      }
    }
  },
  how: {
    title: 'How to scrape a paginated website and a Load more button',
    intro:
      'Use the lightest tool that reaches every item. Page URLs first, a function only when the list grows in place. The [browser interaction guide](/docs/guides/function/browser-interaction) documents the click-and-wait pattern.',
    steps: [
      {
        label: '1 · Numbered pages, in parallel',
        sdk: `const rules = {
  quotes: {
    selectorAll: '.quote',
    attr: {
      text: { selector: '.text', attr: 'text' },
      author: { selector: '.author', attr: 'text' }
    }
  }
}

const pages = [1, 2, 3, 4, 5].map(n => \`https://quotes.toscrape.com/page/\${n}/\`)
const results = await Promise.all(pages.map(url => microlink.extract(url, rules)))
const quotes = results.flatMap(result => result.quotes)`,
        note: 'Each page is one request with the same rules, and the calls run concurrently with no throttling. An empty quotes array on a page past the end tells you where to stop.'
      },
      {
        label: '2 · Load more, clicked inside a function',
        sdk: "const loadAll = async ({ page, clicks }) => {\n  for (let i = 0; i < clicks; i++) {\n    const button = await page.$('button.load-more')\n    if (!button) break\n    const count = await page.$$eval('.results li', items => items.length)\n    await button.click()\n    await page.waitForFunction(\n      n => document.querySelectorAll('.results li').length > n,\n      {},\n      count\n    )\n  }\n  return page.$$eval('.results li', items => items.map(el => el.textContent.trim()))\n}\n\nconst { isFulfilled, value } = await microlink.function(\n  'https://example.com/catalog',\n  loadAll,\n  { clicks: 10 }\n)",
        note: 'The function clicks, waits until more items exist than before, and stops when the button disappears or after the number of clicks you pass. clicks is a custom option, forwarded to the function as a named argument.'
      },
      {
        label: '3 · Or one click with page preparation',
        sdk: "const { items } = await microlink.extract(\n  'https://example.com/catalog',\n  { items: { selectorAll: '.results li', attr: 'text' } },\n  { click: 'button.show-all', waitForSelector: '.results li' }\n)",
        note: '[click](/docs/api/parameters/click) runs before the rules without writing a function. It fits a single Show all toggle or an accordion; a button that must be pressed repeatedly needs step 2.'
      }
    ],
    params: [
      {
        name: 'function',
        href: '/docs/api/parameters/function',
        note: 'Runs your Puppeteer code on the page. 15 seconds on free, up to 60 seconds on Pro.'
      },
      {
        name: 'click',
        href: '/docs/api/parameters/click',
        note: 'Clicks the elements matching a CSS selector before extraction.'
      },
      {
        name: 'waitForSelector',
        href: '/docs/api/parameters/waitForSelector',
        note: 'Waits for the list items before the rules read them.'
      },
      {
        name: 'scroll',
        href: '/docs/api/parameters/scroll',
        note: 'Scrolls one element into view. It triggers lazy content once, it does not scroll forever.'
      },
      {
        name: 'selectorAll',
        href: '/docs/sdk/methods/extract/selectorAll',
        note: 'Returns every item on the page as an array.'
      }
    ],
    outro:
      'Size the function to its time budget: every click waits for a network round trip on the target, so ten clicks on a slow site can exceed the 15 second free limit and return a TimeoutError. The [function troubleshooting guide](/docs/guides/function/troubleshooting) covers timeouts and the other plan-aware errors.'
  },
  why: {
    title: 'Why one request per page beats a long-lived crawler',
    intro:
      'Independent requests fail independently, cache independently and run in parallel. Keep the browser session only where the site forces you to.',
    cards: [
      {
        kicker: 'Parallel by default',
        title: 'Pages are requests, not steps in a loop.',
        body: 'When page URLs are predictable, fire them all at once. There is no throttling on the API, each page is cached on its own, and one failed page is one retry rather than a restarted crawl.',
        note: 'Each page uses the same nested rules as [scraping tables and repeated lists](/use-cases/scraping/tables-and-lists), so one rule set covers the whole listing.'
      },
      {
        kicker: 'Real clicks',
        title: 'Load more runs in a real browser.',
        body: 'The function gets the full Puppeteer page after navigation, so clicks, waits and scrolling behave exactly as they do locally. You write the loop and Microlink runs the browser.',
        note: 'The same runtime handles any browser automation you would write locally: [run Puppeteer without hosting Chrome](/use-cases/scraping/run-puppeteer-without-chrome) covers the runtime and its limits.'
      },
      {
        kicker: 'Bounded',
        title: 'Every run has a clear ceiling.',
        body: 'The free plan gives a function 15 seconds and 64 MB, Pro up to 60 seconds and 128 MB. Hitting a limit returns isFulfilled false with a named error instead of hanging.',
        note: 'When not to: infinite feeds with thousands of items do not fit in one call. Look for the JSON endpoint the page calls as you scroll and read it page by page as [cached JSON](/use-cases/scraping/json-endpoints) instead.'
      }
    ]
  },
  faq: [
    {
      question: 'How do I scrape a Load more button?',
      answer:
        'Send a function that clicks the button, waits until more items are in the DOM, repeats until the button is gone, and returns the items. It runs in Microlink’s browser, so there is no Puppeteer to host.'
    },
    {
      question: 'Can I scrape a paginated website in parallel?',
      answer:
        'Yes. When pages have their own URLs, build the list of URLs and send one extraction request per page at the same time. The API applies no throttling; the free tier allows 25 requests per day in total.'
    },
    {
      question: 'Why does scroll not load every item on an infinite scroll page?',
      answer:
        'The scroll parameter scrolls a single element into view once. That triggers one batch of lazy content, not an endless feed. Scroll in a loop inside a function, or read the JSON endpoint the page requests as it scrolls.'
    },
    {
      question: 'How many times can a function click Load more before it times out?',
      answer:
        'As many as fit in the time limit: 15 seconds on the free plan and up to 60 seconds on Pro. Pass a click count as a custom option, and check profiling in the response to see how long each run took.'
    },
    {
      question: 'Does each scraped page count as a separate request?',
      answer:
        'Yes. Each API call is one request, whether it reads page 1 or runs a function that clicks ten times. Cache hits never count against your quota, so re-reading unchanged pages within the cache lifetime is free. See [pricing](/pricing).'
    }
  ],
  cta: {
    headlinePrefix: 'Ready to scrape',
    headlineAccent: 'every page of the list',
    body: 'Parallel requests for numbered pages, a function for Load more. Start on the free tier and get past page one today.',
    href: '/features/scraping',
    label: 'Scrape a paginated list'
  },
  howTo: {
    name: 'How to scrape paginated lists and Load more buttons',
    steps: [
      {
        title: 'Request numbered pages in parallel',
        description:
          'Build the URL of every page and send one extraction request per page with the same rules, then merge the arrays.'
      },
      {
        title: 'Click Load more inside a function',
        description:
          'Send a Puppeteer function that clicks the button, waits for more items and repeats until the button is gone or a click limit is reached.'
      },
      {
        title: 'Use click for a single toggle',
        description:
          'For one Show all button or accordion, pass the click parameter with waitForSelector and keep the declarative rules.'
      }
    ]
  }
}
