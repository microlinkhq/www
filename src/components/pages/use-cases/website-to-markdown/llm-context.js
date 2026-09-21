export const CONTENT = {
  slug: 'website-to-markdown/llm-context',
  head: {
    title: 'Turn any URL into LLM context: Markdown, links, emails',
    description:
      'Build website context for an LLM or agent from one URL: clean Markdown, every link, contact emails, normalized metadata and the detected tech stack.'
  },
  hero: {
    title: 'Turn any URL into context for an LLM or agent',
    intro:
      'Turning a URL into LLM context takes more than the page text: an agent also needs to know what the page is, where it links, how to contact the company and what it runs on. Research agents, sales enrichment, support bots and browsing tools all rebuild that picture by hand. The [Microlink SDK](/integrations/sdk) exposes each part as a method, so one URL becomes one structured context object.',
    cta: { label: 'Start with the Markdown API', href: '/markdown' }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'Raw HTML is expensive and incomplete website context for an LLM',
    paragraphs: [
      'Feeding HTML to a model wastes most of the tokens on markup and still misses what is not in the visible text: the canonical title, the author, the outbound links, the email in a footer, the framework the site runs on. The model pays for the noise and guesses at the rest.',
      'The do-it-yourself version is a fetch, an HTML parser, a readability pass, a link extractor, a regular expression for emails and a metadata library, each with its own failure mode. It breaks on client-rendered pages, and every new question the agent asks about a page means another parser.',
      'Each Microlink SDK method returns one clean facet of the page, so you extract links and emails with the same API that converts the body. markdown() gives the body, links() every absolute URL, emails() the addresses, metadata() the normalized fields and technologies() the stack. They all take the same URL and the same [shared options](/docs/sdk/getting-started/options), so you combine them and the agent gets a page it can reason about.'
    ]
  },
  how: {
    title: 'How to build LLM context from a URL with the SDK',
    intro:
      'Every method takes the same URL and the same shared options, so the calls run in parallel and each one is cached on its own.',
    steps: [
      {
        label: '1 · Gather the facets in parallel',
        sdk: "const url = 'https://example.com'\n\nconst [markdown, links, emails, meta, technologies] = await Promise.all([\n  microlink.markdown(url, { selector: 'main' }),\n  microlink.links(url),\n  microlink.emails(url),\n  microlink.metadata(url),\n  microlink.technologies(url)\n])",
        note: 'Five methods, one URL. markdown() resolves to a string, links() and emails() to arrays of strings, metadata() to the normalized fields and technologies() to an array of detections with a confidence score.'
      },
      {
        label: '2 · Shape it for the model',
        sdk: 'const context = {\n  title: meta.title,\n  description: meta.description,\n  author: meta.author,\n  published: meta.date,\n  content: markdown,\n  links: links.slice(0, 50),\n  contacts: emails,\n  stack: technologies\n    .filter(({ confidence }) => confidence === 100)\n    .map(({ name }) => name)\n}',
        note: 'Trim the links and keep only the confident technology detections so the context stays small and reliable. Fields the page does not expose come back as null, so the object always has the same keys.'
      },
      {
        label: '3 · Give the agent a tool',
        sdk: "const readPage = {\n  name: 'read_page',\n  description: 'Fetch a URL as Markdown with its links and metadata',\n  execute: async ({ url }) => {\n    const [content, meta] = await Promise.all([\n      microlink.markdown(url, { selector: 'main' }),\n      microlink.metadata(url)\n    ])\n    return { title: meta.title, content }\n  }\n}",
        note: 'Wrap the calls as a tool so the model decides when to read a page. If your agent speaks the Model Context Protocol, the [Microlink MCP server](/integrations/mcp) exposes Markdown, metadata and scraping as ready-made tools.'
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
        note: 'Every link as an absolute, deduplicated URL. mailto and javascript hrefs are dropped.'
      },
      {
        name: 'emails',
        href: '/docs/sdk/methods/emails',
        note: 'Email addresses from mailto links and plain text, as bare strings.'
      },
      {
        name: 'metadata',
        href: '/docs/sdk/methods/metadata',
        note: 'title, description, lang, author, publisher, date, image, logo and url, normalized across sites.'
      },
      {
        name: 'technologies',
        href: '/docs/sdk/methods/technologies',
        note: 'The tech stack with name, categories and a confidence score from 0 to 100 per detection.'
      },
      {
        name: 'proxy',
        href: '/docs/api/parameters/proxy',
        note: 'Add it to any method when a site blocks automated access. Pro plans.'
      }
    ],
    outro:
      'Obfuscated addresses such as name [at] domain are not detected by emails(). Run your own logic against the rendered page with the [function method](/docs/sdk/methods/function) when you need them.'
  },
  why: {
    title: 'Why separate facets make better LLM context than one big scrape',
    intro:
      'A page is several kinds of information. Asking for each one explicitly is cheaper and more accurate than parsing everything and hoping the model sorts it out.',
    cards: [
      {
        kicker: 'Token efficient',
        title: 'Markdown is the content; everything else is metadata.',
        body: 'The body arrives as Markdown that preserves headings, lists, tables and code blocks without markup noise, while links, emails and fields arrive as small JSON arrays and strings. The model reads structure, not tags.',
        note: 'The [Markdown API](/markdown) page puts the saving at up to 80% fewer tokens than raw HTML for the body alone.'
      },
      {
        kicker: 'Normalized, not scraped',
        title: 'Each facet has a stable shape across sites.',
        body: 'links() always returns absolute deduplicated URLs, emails() bare strings and metadata() the same field names for every site. Your prompt template never changes per source.',
        note: 'Every method accepts the shared options, so a proxy, a wait or a cache TTL applies uniformly. When a site rejects automated traffic, [convert the blocked page through the proxy](/use-cases/website-to-markdown/blocked-sites).'
      },
      {
        kicker: 'Cached and composable',
        title: 'An agent that revisits a page pays once.',
        body: 'Responses are cached for 24 hours by default and cache hits do not count against your quota. Add ttl and staleTtl on Pro plans to tune freshness for the whole context.',
        note: 'When not to: if the model only needs a summary of the text, markdown() alone is enough, ideally [scoped to the content](/use-cases/website-to-markdown/clean-content). Add facets when the task asks for links, contacts or the stack.'
      }
    ]
  },
  faq: [
    {
      question: 'How do I turn a URL into Markdown context for an LLM?',
      answer:
        'Call microlink.markdown(url) with a selector such as main to get the body as clean Markdown, then add metadata(), links() or emails() for the facts that are not in the text. Combine the results into one object and pass it to the model as context or as a tool result.'
    },
    {
      question: 'Do the Markdown, links and metadata facets count as one request or several?',
      answer:
        'Each method is one API request, so five facets are five requests on a cold cache. Cache hits do not count against your quota and are served from the edge, so an agent that revisits the same URL within the cache lifetime pays nothing extra.'
    },
    {
      question: 'Can I get Markdown and metadata for an agent in a single request?',
      answer:
        'Yes. metadata() accepts custom rules through the data option, so a markdown rule rides along with the normalized fields. Links and emails are extraction rules too, so they can join the same data object. [Markdown with metadata frontmatter](/use-cases/website-to-markdown/with-metadata) shows the single-request pattern.'
    },
    {
      question: 'How do AI agents get Markdown from pages that block bots?',
      answer:
        'Pass proxy: true on any method to route the request through automatic proxy resolution, a Pro capability. The EPROXYNEEDED error code tells you when a target requires it, so the agent can retry only those URLs.'
    },
    {
      question: 'Is there a ready-made Markdown integration for AI agents?',
      answer:
        'Yes. The MCP server exposes Microlink to agents that speak the Model Context Protocol, and the [skills catalog](/skills) packages common workflows as playbooks an agent can load.'
    }
  ],
  cta: {
    headlinePrefix: 'Ready to give your agent',
    headlineAccent: 'the whole page',
    body: 'Markdown, links, emails, metadata and stack from one URL and one client. Start on the free tier and build your first read_page tool today.',
    href: '/markdown',
    label: 'Build LLM context'
  },
  howTo: {
    name: 'How to build LLM context from a URL',
    steps: [
      {
        title: 'Gather the facets in parallel',
        description:
          'Call the markdown, links, emails, metadata and technologies methods with the same URL inside Promise.all. Each one returns one clean facet of the page.'
      },
      {
        title: 'Shape the context for the model',
        description:
          'Build one object with the title, description, author and date from the metadata, the Markdown as content, a trimmed list of links, the emails and the technologies detected with full confidence.'
      },
      {
        title: 'Expose it to the agent as a tool',
        description:
          'Wrap the calls in a read_page tool that takes a URL and returns the title and the Markdown, so the model decides when to read a page.'
      }
    ]
  }
}
