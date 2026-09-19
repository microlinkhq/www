export const CONTENT = {
  slug: 'website-to-markdown/llm-context',
  head: {
    title: 'Turn any URL into LLM context: Markdown, links, emails',
    description:
      'Build a complete context object for an agent from one URL: clean Markdown, every link, contact emails, normalized metadata and the tech stack.'
  },
  hero: {
    title: 'Turn any URL into context for an LLM or agent',
    intro:
      'An agent that reads a page needs more than its text: what the page is, where it links, how to contact the company, what it runs on. The Microlink SDK exposes each of those as a method, so one URL becomes one structured context object.',
    cta: { label: 'Start with the Markdown API', href: '/markdown' }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'Raw HTML is expensive context and incomplete context',
    paragraphs: [
      'Feeding HTML to a model wastes most of the tokens on markup and misses what is not in the visible text: the canonical title, the author, the outbound links, the email in a footer, the framework the site runs on.',
      'Microlink’s SDK methods each return one clean facet of the page. markdown() gives the body, links() every absolute URL, emails() the addresses, metadata() the normalized fields and technologies() the stack. Combine them and the agent gets a page it can reason about.'
    ]
  },
  how: {
    title: 'Compose the context from methods',
    intro:
      'Every method takes the same URL and the same shared options, so they compose in parallel and share the cache.',
    steps: [
      {
        label: '1 · Gather the facets in parallel',
        sdk: "const url = 'https://example.com'\n\nconst [markdown, links, emails, meta, technologies] = await Promise.all([\n  microlink.markdown(url, { selector: 'main' }),\n  microlink.links(url),\n  microlink.emails(url),\n  microlink.metadata(url),\n  microlink.technologies(url)\n])",
        note: 'Five methods, one URL, one context object; each call is cached independently.'
      },
      {
        label: '2 · Shape it for the model',
        sdk: 'const context = {\n  title: meta.title,\n  description: meta.description,\n  author: meta.author,\n  published: meta.date,\n  content: markdown,\n  links: links.slice(0, 50),\n  contacts: emails,\n  stack: technologies\n    .filter(({ confidence }) => confidence === 100)\n    .map(({ name }) => name)\n}',
        note: 'Trim links and keep confident technology detections so the context stays small and reliable.'
      },
      {
        label: '3 · Give the agent a tool',
        sdk: "const readPage = {\n  name: 'read_page',\n  description: 'Fetch a URL as Markdown with its links and metadata',\n  execute: async ({ url }) => {\n    const [content, meta] = await Promise.all([\n      microlink.markdown(url, { selector: 'main' }),\n      microlink.metadata(url)\n    ])\n    return { title: meta.title, content }\n  }\n}",
        note: 'Wrap the calls as a tool so the model decides when to read a page.'
      }
    ],
    params: [
      {
        name: 'markdown',
        href: '/docs/sdk/methods/markdown',
        note: 'The page as clean Markdown, scoped with selector or selectorAll.'
      },
      {
        name: 'links',
        href: '/docs/sdk/methods/links',
        note: 'Every link as an absolute, deduplicated URL.'
      },
      {
        name: 'emails',
        href: '/docs/sdk/methods/emails',
        note: 'Email addresses from mailto links and plain text.'
      },
      {
        name: 'metadata',
        href: '/docs/sdk/methods/metadata',
        note: 'title, description, author, publisher, date, image and logo, normalized.'
      },
      {
        name: 'technologies',
        href: '/docs/sdk/methods/technologies',
        note: 'The tech stack with a confidence score per detection.'
      },
      {
        name: 'proxy',
        href: '/docs/api/parameters/proxy',
        note: 'Add it when a site blocks automated access; Pro plans.'
      }
    ],
    outro:
      'Obfuscated addresses such as name [at] domain are not detected by emails(); run your own logic with function() when you need them.'
  },
  why: {
    title: 'Why facets beat one big scrape',
    intro:
      'A page is several kinds of information. Asking for each one explicitly is cheaper and more accurate than parsing everything.',
    cards: [
      {
        kicker: 'Token efficient',
        title: 'Markdown is the content; everything else is metadata.',
        body: 'The body arrives as Markdown that preserves headings, lists and tables without markup noise, while links, emails and fields arrive as small JSON arrays and strings. The model reads structure, not tags.',
        note: 'The [Markdown API](/markdown) page shows the token reduction against raw HTML for typical pages.'
      },
      {
        kicker: 'Normalized, not scraped',
        title: 'Each facet has a stable shape across sites.',
        body: 'links() always returns absolute deduplicated URLs; emails() bare strings; metadata() the same field names for every site. Your prompt template never changes per source.',
        note: 'Every method accepts the shared options, so a proxy, a wait or a cache TTL applies uniformly.'
      },
      {
        kicker: 'Cached and composable',
        title: 'Parallel calls share the same fetch policy.',
        body: 'Responses are cached for 24 hours by default, so an agent that revisits a page pays once. Add ttl and staleTtl on Pro plans to tune freshness for the whole context.',
        note: 'When not to: if the model only needs a summary of the text, markdown() alone is enough; add facets when the task asks for links, contacts or the stack.'
      }
    ]
  },
  faq: [
    {
      question: 'Do the context facets count as one request or several?',
      answer:
        'Each method is one API request. Cache hits still count but are served from the edge in milliseconds, so revisiting the same URL is fast and predictable.'
    },
    {
      question: 'Can I get all facets in a single request?',
      answer:
        'Partly. metadata() accepts custom rules through the data option, so Markdown and normalized fields can share one request. Links and emails are extraction rules too, so they can join the same data object with the extract grammar.'
    },
    {
      question: 'How do agents handle pages that block bots?',
      answer:
        'Pass proxy: true on any method to route through the automatic proxy resolution, a Pro capability. The EPROXYNEEDED error code tells you when a target requires it.'
    },
    {
      question: 'Is there a ready-made integration for AI agents?',
      answer:
        'Yes. The [MCP server](/integrations/mcp) exposes Microlink to agents that speak the Model Context Protocol, and the [skills](/skills) catalog packages common workflows.'
    }
  ],
  cta: {
    headlinePrefix: 'Ready to give your agent',
    headlineAccent: 'the whole page',
    body: 'Markdown, links, emails, metadata and stack from one URL and one client. Start on the free tier and build your first read_page tool today.',
    href: '/markdown',
    label: 'Build LLM context'
  }
}
