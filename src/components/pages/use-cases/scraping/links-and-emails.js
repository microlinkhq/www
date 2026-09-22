export const CONTENT = {
  slug: 'scraping/links-and-emails',
  head: {
    title: 'Extract all links and email addresses from a page',
    description:
      'Get every link on a page as an absolute URL and every email address as a plain string, scoped to navigation, footer or any CSS selector.'
  },
  hero: {
    title: 'Extract every link and email address from a web page',
    intro:
      'To extract all links from a website page you need absolute URLs, not a mix of relative paths, anchors and javascript: handlers. Lead enrichment, link audits, partner directories, crawl seeds and contact pages all start with the same two lists. The [Scraping API](/features/scraping) returns them with one method each, already cleaned.',
    cta: { label: 'Start with the Scraping API', href: '/features/scraping' }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'Raw hrefs and mailto links need cleaning before they are data',
    paragraphs: [
      'A page’s anchors are a mess of relative paths, fragment links, duplicates, tracking redirects, mailto: and javascript: pseudo-links. Before you can store or follow them, each one needs resolving against the page URL, validating and deduplicating.',
      'Email addresses are worse: some sit in mailto links, others only in plain text in a footer or a contact paragraph. A regular expression over the HTML catches addresses inside scripts and misses the ones behind a mailto prefix, and a plain fetch sees nothing at all on contact pages rendered in the browser.',
      'The [links method](/docs/sdk/methods/links) sweeps every anchor and returns absolute, deduplicated URLs, dropping mailto, javascript and empty hrefs. The [emails method](/docs/sdk/methods/emails) scans mailto links and plain text and returns bare addresses with the mailto prefix stripped. Both accept a selector to scope the sweep and the shared options to render first.'
    ],
    live: {
      label: 'Open the live list of links as JSON',
      request: {
        url: 'https://quotes.toscrape.com',
        params: {
          data: { links: { selectorAll: 'a', attr: 'href', type: 'url' } },
          meta: false
        }
      }
    }
  },
  how: {
    title: 'How to get all URLs and emails from a page',
    intro:
      'Each method is one request that resolves to an array of strings. Scope it, render it, or drop down to a rule when you need more than the URL.',
    steps: [
      {
        label: '1 · Every link and every email',
        sdk: "const url = 'https://example.com/contact'\n\nconst [links, emails] = await Promise.all([\n  microlink.links(url),\n  microlink.emails(url)\n])",
        note: 'links resolves to absolute, deduplicated URLs and emails to addresses such as hello@example.com. The two calls run in parallel and each is cached on its own.'
      },
      {
        label: '2 · Scope to a part of the page',
        sdk: "const nav = await microlink.links('https://example.com', {\n  selectorAll: 'nav a'\n})\n\nconst footer = await microlink.emails('https://example.com', {\n  selector: 'footer'\n})\n\nconst { hostname } = new URL('https://example.com')\nconst external = nav.filter(link => new URL(link).hostname !== hostname)",
        note: 'selectorAll narrows links to the navigation and selector narrows emails to the footer. Filtering by hostname on your side splits internal from external links.'
      },
      {
        label: '3 · Link text next to each URL',
        sdk: "const { anchors } = await microlink.extract('https://example.com', {\n  anchors: {\n    selectorAll: 'main a',\n    attr: {\n      text: { selector: ':scope', attr: 'text' },\n      href: { selector: ':scope', attr: 'href', type: 'url' }\n    }\n  }\n})",
        note: 'links returns URLs only. A nested [extract](/docs/sdk/methods/extract) rule turns each anchor into { text, href }; the :scope selector points both child rules at the anchor itself. That is what a link audit or a sitemap check usually needs.'
      }
    ],
    params: [
      {
        name: 'links',
        href: '/docs/sdk/methods/links',
        note: 'Every anchor as an absolute, deduplicated URL. mailto, javascript and empty hrefs are dropped.'
      },
      {
        name: 'emails',
        href: '/docs/sdk/methods/emails',
        note: 'Addresses from mailto links and plain text, as bare strings.'
      },
      {
        name: 'selectorAll',
        href: '/docs/sdk/methods/extract/selectorAll',
        note: 'Overrides the default a selector of links to scope the sweep.'
      },
      {
        name: 'type',
        href: '/docs/sdk/methods/extract/type',
        note: 'url resolves and validates links, email finds addresses. Keep them when changing the scope.'
      },
      {
        name: 'prerender',
        href: '/docs/api/parameters/prerender',
        note: 'Forces a browser for contact pages and menus rendered on the client.'
      }
    ],
    outro:
      'Both methods read one page per call; they do not crawl. To list every page a site wants indexed, the [sitemap tool](/tools/sitemap) reads its sitemap.xml, and you can run links() or emails() on each URL it returns.'
  },
  why: {
    title: 'Why dedicated link and email methods beat a regex over HTML',
    intro:
      'Links and emails look trivial until you store them. The methods do the resolving, validating and deduplicating that every hand-rolled extractor ends up reimplementing.',
    cards: [
      {
        kicker: 'Clean URLs',
        title: 'Absolute, deduplicated, followable.',
        body: 'Relative hrefs are resolved against the page URL, and values that do not parse as a URL are dropped by the url type. What you get back can go straight into a queue or a database.',
        note: 'Under the hood links is a rule of selectorAll a, attr href and type url, so you can override any part of it or write the rule yourself in a [website to JSON schema](/use-cases/scraping/website-to-json).'
      },
      {
        kicker: 'Both sources',
        title: 'Emails from mailto links and from plain text.',
        body: 'The email type scans the whole document, so an address printed in a paragraph is found as well as one inside a mailto link, and the prefix is stripped from both.',
        note: 'Contact pages rendered by JavaScript need prerender: true and a waitForSelector; [scraping JavaScript-rendered pages](/use-cases/scraping/javascript-rendered-pages) explains the waits.'
      },
      {
        kicker: 'Composable',
        title: 'The same facets feed an LLM or a CRM.',
        body: 'Links and emails are two of the facets that make a page useful to an agent or an enrichment job, next to the body text and the metadata. Each one is a separate, cached request.',
        note: 'When not to: obfuscated addresses such as name [at] domain [dot] com, emails in images or links assembled by JavaScript are not detected. Parse those yourself with [npm packages in a remote function](/use-cases/scraping/npm-packages-remotely).'
      }
    ]
  },
  faq: [
    {
      question: 'How do I extract all links from a website page with an API?',
      answer:
        'Call microlink.links(url). It sweeps every anchor on the page and resolves to an array of absolute, deduplicated URLs. Pass selectorAll to limit it to a region such as nav a or main a.'
    },
    {
      question: 'Does the email extractor API find obfuscated addresses?',
      answer:
        'No. It finds addresses in mailto links and in plain text. Addresses written as name [at] domain, rendered as images or assembled by JavaScript are not detected; handle those with your own logic in a function.'
    },
    {
      question: 'Can I get the anchor text along with each extracted URL?',
      answer:
        'Yes, with extract. A rule with selectorAll a and an object under attr containing text and href rules, each with selector :scope, returns one { text, href } object per link, with href validated as a URL.'
    },
    {
      question: 'Does extracting links crawl the whole website?',
      answer:
        'No. Each call reads one page. To cover a site, get its URL list from the sitemap, or feed the internal links you extracted back into your own queue, and call links() once per page.'
    },
    {
      question: 'Can I get links and emails together with the page content?',
      answer:
        'Yes. Run links(), emails() and markdown() on the same URL in parallel and combine the results. [Turn any URL into LLM context](/use-cases/website-to-markdown/llm-context) shows that pattern with metadata and technologies added.'
    }
  ],
  cta: {
    headlinePrefix: 'Ready to extract',
    headlineAccent: 'every link and email',
    body: 'Absolute URLs and bare email addresses from any page, one method each. Start on the free tier and try it on your own site.',
    href: '/features/scraping',
    label: 'Extract links and emails'
  },
  howTo: {
    name: 'How to extract all links and email addresses from a page',
    steps: [
      {
        title: 'Call links and emails',
        description:
          'Run the links and emails methods on the same URL in parallel. Each resolves to an array of strings.'
      },
      {
        title: 'Scope the sweep',
        description:
          'Pass selectorAll to links or selector to emails to limit the result to the navigation, the main content or the footer.'
      },
      {
        title: 'Add link text when you need it',
        description:
          'Use an extract rule with selectorAll on the anchors and nested text and href rules to get one object per link.'
      }
    ]
  }
}
