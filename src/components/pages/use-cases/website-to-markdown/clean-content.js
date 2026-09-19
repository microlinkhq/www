export const CONTENT = {
  slug: 'website-to-markdown/clean-content',
  head: {
    title: 'Clean Markdown from any URL, no nav or boilerplate',
    description:
      'Scope the conversion to the article body with a selector, block ads and consent scripts by default and drop the rest before converting.'
  },
  hero: {
    title: 'Clean Markdown from any URL, without navigation or boilerplate',
    intro:
      'Whole-page Markdown carries the menu, the footer, the cookie notice and three related-post widgets. Every one of them costs tokens and confuses retrieval. The Markdown API lets you convert exactly the element that holds the content.',
    cta: { label: 'Start with the Markdown API', href: '/markdown' }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'Boilerplate is most of the page',
    paragraphs: [
      'On a typical article page the readable text is a minority of the markup. Navigation, sidebars, comment forms and legal footers repeat on every URL of the site, so an index built from whole pages is dominated by identical noise.',
      'Microlink’s conversion already drops scripts, styles and navigation chrome, and adblock removes third-party ads and consent services at the network level. For the rest, a selector scopes the conversion to main or article, and a small script removes anything specific to the site before the conversion runs.'
    ],
    live: {
      label: 'Open the live Markdown of the main element',
      request: {
        url: 'https://microlink.io/docs/api/getting-started/overview',
        params: {
          data: { markdown: { selector: 'main', attr: 'markdown' } },
          meta: false,
          embed: 'markdown'
        }
      }
    }
  },
  how: {
    title: 'Scope first, then subtract',
    intro:
      'A selector does most of the work. selectorAll returns one Markdown string per match when the content is a list, and modules removes leftovers inside the scope.',
    steps: [
      {
        label: '1 · Convert only the article',
        sdk: "const markdown = await microlink.markdown('https://example.com/blog/post', {\n  selector: 'article'\n})",
        note: 'The conversion is limited to the first element matching the selector.'
      },
      {
        label: '2 · One string per item',
        sdk: "const comments = await microlink.markdown('https://example.com/thread', {\n  selectorAll: '.comment'\n})\n\nconsole.log(comments.length)",
        note: 'selectorAll resolves to an array, useful for threads, listings and search results.'
      },
      {
        label: '3 · Remove leftovers, as a URL',
        request: {
          url: 'https://example.com/blog/post',
          params: {
            data: { markdown: { selector: 'main', attr: 'markdown' } },
            meta: false,
            embed: 'markdown',
            modules:
              "document.querySelectorAll('.share, .newsletter, .related').forEach(node => node.remove())"
          }
        },
        note: 'modules runs JavaScript in the page before the conversion, so removed nodes never reach the Markdown; embed returns it directly.'
      }
    ],
    params: [
      {
        name: 'selector',
        href: '/docs/sdk/methods/extract/selector',
        note: 'Scope the conversion to the first matching element.'
      },
      {
        name: 'selectorAll',
        href: '/docs/sdk/methods/extract/selectorAll',
        note: 'Convert every matching element, one Markdown string each.'
      },
      {
        name: 'adblock',
        href: '/docs/api/parameters/adblock',
        note: 'Ads, trackers and consent services blocked by default.'
      },
      {
        name: 'modules',
        href: '/docs/api/parameters/modules',
        note: 'Remove site-specific widgets from the DOM before the conversion runs.'
      },
      {
        name: 'meta',
        href: '/docs/api/parameters/meta',
        note: 'false skips metadata extraction when you only want the body.'
      }
    ],
    outro:
      'Start with main or article; most publishing platforms wrap the content in one of them. Fall back to a site-specific selector only when they do not.'
  },
  why: {
    title: 'Why scope at the source',
    intro:
      'Cleaning Markdown after the fact needs heuristics. Scoping the conversion needs a selector.',
    cards: [
      {
        kicker: 'Tokens you do not pay for',
        title: 'Boilerplate never reaches the model.',
        body: 'A conversion scoped to the article body is a fraction of the whole page. Fewer tokens per document means cheaper embeddings, cheaper prompts and more documents per context window.',
        note: 'The [Markdown API](/markdown) page quantifies the saving against raw HTML; scoping compounds it.'
      },
      {
        kicker: 'Better retrieval',
        title: 'Chunks contain content, not menus.',
        body: 'When every page in an index shares the same navigation text, similarity search surfaces the navigation. Scoped conversions keep each chunk about its own subject.',
        note: 'For structured pages, convert list items with selectorAll so each item becomes its own document.'
      },
      {
        kicker: 'Deterministic',
        title: 'The same selector yields the same body every run.',
        body: 'Readability heuristics change their mind when a layout changes. A selector either matches or fails loudly, which is what a pipeline you monitor needs.',
        note: 'When not to: if you have thousands of unrelated sites and cannot maintain selectors, start with main and article and accept some noise; a per-site selector map is a later optimization.'
      }
    ]
  },
  faq: [
    {
      question: 'Which selector should I use for the article body?',
      answer:
        'Try main or article first; most platforms wrap the content in one of them. Otherwise inspect the page and pick the container that holds the text, such as .post-content.'
    },
    {
      question: 'What if the Markdown selector matches nothing?',
      answer:
        'The field resolves to null, so your code can detect it and fall back to a broader selector or to the whole page. Pass an array of selectors to declare that fallback in the request itself.'
    },
    {
      question: 'Does adblock change the Markdown output?',
      answer:
        'It removes third-party ads, trackers and consent services before the page renders, so their text never enters the conversion. It is on by default on every plan.'
    },
    {
      question: 'Can I remove elements inside the scoped content?',
      answer:
        'Yes. Inject a small script with modules that removes the nodes, for example share buttons or newsletter forms, before the conversion runs.'
    }
  ],
  cta: {
    headlinePrefix: 'Ready for',
    headlineAccent: 'content-only Markdown',
    body: 'One selector removes the noise at the source. Start on the free tier and convert your first article body today.',
    href: '/markdown',
    label: 'Convert clean Markdown'
  }
}
