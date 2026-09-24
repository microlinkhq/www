export const CONTENT = {
  slug: 'search-api/serp-to-markdown',
  head: {
    title: 'SERP to Markdown or HTML from any Google query',
    description: 'Turn a search query into the Google results page as Markdown or HTML, next to the structured results. For SERP archives, feature checks and LLMs.'
  },
  hero: {
    title: 'SERP to Markdown: the whole Google results page from a query',
    intro: 'SERP to Markdown means reading the whole results page, not only the ten links: the snippets, the questions and the order everything appears in. SEO teams archive it, analysts watch search features come and go, and models summarize what a query looks like today. The [Search API](/search) takes a query, not a URL, and returns the results page as Markdown or HTML next to the structured results.',
    cta: {
      label: 'Start with the Search API',
      href: '/search'
    }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'Structured results drop the page, raw scraping drops the reliability',
    paragraphs: [
      'Structured search results are the right input for most code, but they flatten the page: they tell you which links ranked, not what else the page showed around them. Questions about SERP features, how crowded a query is, or what a searcher saw on a given day need the page itself.',
      'Fetching the results page yourself means building the search URL, getting blocked from the first requests, and running an HTML to Markdown converter on whatever comes back. URL to Markdown tools cannot help either: they expect a URL you already have, not a query and a country.',
      'Every search returns a page object with page.markdown() and page.html(). They fetch the Google results page for the same query and options, as Markdown for models and text pipelines or as HTML for your own selectors. Pass markdown: true or html: true to fetch the page and every result up front.'
    ]
  },
  how: {
    title: 'How to convert Google results to Markdown with the SDK',
    intro: 'Search once for the structured results, then ask the same page object for its Markdown or HTML. The [content expansion guide](/docs/guides/search/content-expansion) covers both the page and the result level.',
    steps: [
      {
        label: '1 · Get the results page as Markdown',
        sdk: "const page = await microlink.search('technical seo checklist', {\n  location: 'gb'\n})\n\nconst serpMarkdown = await page.markdown()",
        note: 'page.results holds the structured results; page.markdown() fetches the results page itself, for the same query and location, as Markdown.'
      },
      {
        label: '2 · Archive the HTML per country',
        sdk: "const snapshots = await Promise.all(\n  ['us', 'gb', 'de'].map(async location => {\n    const page = await microlink.search('technical seo checklist', { location })\n    return {\n      location,\n      takenAt: new Date().toISOString(),\n      links: page.results.map(({ title, url }) => ({ title, url })),\n      html: await page.html()\n    }\n  })\n)",
        note: 'Each snapshot stores the ranked links and the raw HTML side by side, so you can re-parse search features later with selectors you have not written yet.'
      },
      {
        label: '3 · Fetch everything up front',
        sdk: "const page = await microlink.search('technical seo checklist', {\n  limit: 3,\n  markdown: true\n})\n\nconst serp = await page.markdown()\nconst sources = await Promise.all(page.results.map(result => result.markdown()))",
        note: 'markdown: true prefetches the results page and every URL-backed result, so these calls resolve immediately with content already fetched. Keep limit small: every result is read whether you use it or not.'
      }
    ],
    params: [
      {
        name: 'page.markdown()',
        href: '/docs/guides/search/content-expansion',
        note: 'The Google results page for the query, as Markdown.'
      },
      {
        name: 'page.html()',
        href: '/docs/guides/search/content-expansion',
        note: 'The results page as HTML, for selectors and archives.'
      },
      {
        name: 'markdown',
        href: '/docs/sdk/methods/search',
        note: 'true fetches the Markdown of the results page and of every result up front.'
      },
      {
        name: 'html',
        href: '/docs/sdk/methods/search',
        note: 'true does the same with HTML.'
      },
      {
        name: 'location',
        href: '/docs/sdk/methods/search',
        note: 'Two-letter country code; the page you get is the one for that country.'
      }
    ],
    outro: 'Converting a page whose URL you already have is a different job: [website to Markdown for LLM context](/use-cases/website-to-markdown/llm-context) and the [Markdown API](/markdown) take a URL instead of a query. You can also try that conversion in the browser with [URL to Markdown](/tools/url-to-markdown).'
  },
  why: {
    title: 'Why SERP to Markdown beats saving raw Google HTML yourself',
    intro: 'The results page is data about the query. Getting it next to the structured results means you never choose between the two.',
    cards: [
      {
        kicker: 'Two views, one query',
        title: 'Structured results and the page itself.',
        body: 'page.results gives your code the ranked links; page.markdown() gives you the page as a model reads it, with the same query, location and period. No second pipeline has to build the search URL.',
        note: 'Compute positions from the structured side with [rank tracking by country](/use-cases/search-api/rank-tracking), and keep the HTML as evidence of what the page showed.'
      },
      {
        kicker: 'Markdown for models',
        title: 'Fewer tokens than HTML for the same page.',
        body: 'A model asked to describe what a query looks like reads Markdown more cheaply than markup. HTML stays available for when your own code needs the DOM, such as detecting a feature by its element.',
        note: 'For the questions and follow-up queries on the page as JSON, [keyword research with People Also Ask](/use-cases/search-api/keyword-research) reads them without any parsing.'
      },
      {
        kicker: 'Only when you ask',
        title: 'The page is fetched on demand.',
        body: 'The search itself is one request. page.markdown() and page.html() fetch the results page through Microlink only when called, and the markdown and html options prefetch everything when you know you will use it.',
        note: 'When not to: if you only need titles, URLs and snippets, the structured results already have them and the page fetch is wasted. And this starts from a query; for a URL you already know, use the Markdown API.'
      }
    ]
  },
  faq: [
    {
      question: 'How do I convert a Google SERP to Markdown?',
      answer: 'Run microlink.search with your query and options, then call page.markdown() on the result. It fetches the Google results page for that same query and returns it as Markdown, next to the structured page.results.'
    },
    {
      question: 'Can I get the raw HTML of Google search results?',
      answer: 'Yes. page.html() returns the results page as HTML, useful for archiving and for detecting search features with your own selectors. Pass html: true to fetch it, and the HTML of every result, up front.'
    },
    {
      question: 'What is the difference between SERP to Markdown and URL to Markdown?',
      answer: 'SERP to Markdown starts from a query and returns the Google results page for it. URL to Markdown starts from a page address and converts that page. Use the [Markdown API](/markdown) when you already have the URL.'
    },
    {
      question: 'How many requests does fetching a SERP as Markdown use?',
      answer: 'The search is one request, and each page or result you expand is fetched through the Microlink API as well. markdown: true expands the results page and every result, so pair it with a small limit. Search has no free tier; [Pro plans](/pricing) start at €39/month for 46,000 requests.'
    },
    {
      question: 'Is the SERP to Markdown API affiliated with Google?',
      answer: 'No. Microlink Search is an independent product that queries public Google surfaces. It is not affiliated with or endorsed by Google, and Google is a trademark of Google LLC.'
    }
  ],
  cta: {
    headlinePrefix: 'Ready to read',
    headlineAccent: 'the whole SERP',
    body: 'Structured results plus the full results page as Markdown or HTML, from one query. Get a Pro key and take your first snapshot today.',
    href: '/search',
    label: 'Get SERPs as Markdown'
  },
  howTo: {
    name: 'How to convert Google search results to Markdown',
    steps: [
      {
        title: 'Get the results page as Markdown',
        description: 'Call microlink.search with the query and a location code, then call page.markdown() to fetch the results page itself as Markdown.'
      },
      {
        title: 'Archive the HTML per country',
        description: 'Run the query once per country code and store the ranked links, a timestamp and page.html() side by side for later analysis.'
      },
      {
        title: 'Fetch everything up front',
        description: 'Pass markdown: true with a small limit to prefetch the results page and every result, so the markdown() calls resolve immediately.'
      }
    ]
  }
}
