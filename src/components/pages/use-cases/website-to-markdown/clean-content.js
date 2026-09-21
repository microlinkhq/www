export const CONTENT = {
  slug: 'website-to-markdown/clean-content',
  head: {
    title: 'Clean Markdown from any URL, without nav or boilerplate',
    description:
      'Get clean Markdown from a URL: scope the conversion to the article body with a CSS selector, keep ads and consent scripts blocked, drop the rest.'
  },
  hero: {
    title: 'Get clean Markdown from a URL, without navigation or boilerplate',
    intro:
      'Clean Markdown from a URL starts with converting the right element, not with cleaning up afterwards. Whole-page Markdown carries the menu, the footer, the cookie notice and three related-post widgets, and every one of them costs tokens and confuses retrieval. The Markdown API lets a RAG pipeline, a read-it-later app or a docs importer convert exactly the element that holds the content, so only the article body turns into Markdown.',
    cta: { label: 'Start with the Markdown API', href: '/markdown' }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'Navigation and boilerplate end up in your Markdown',
    paragraphs: [
      'On a typical article page the readable text is a minority of the markup. Navigation, sidebars, comment forms and legal footers repeat on every URL of the site, so an index built from whole pages is dominated by identical noise. Ask it a question and the closest match is often a menu.',
      'Cleaning after the conversion means heuristics: a readability API or library, regular expressions over Markdown, per-site blocklists of phrases. They work until a layout changes, and they fail silently, either by leaving the newsletter form in or by cutting the last paragraph of the article out.',
      'Microlink’s conversion already drops scripts, styles and navigation chrome, and [adblock](/features/adblock) removes third-party ads, trackers and consent services at the network level before the page renders. For everything else, a [selector](/docs/sdk/methods/extract/selector) scopes the conversion to main or article, and a small injected script removes site-specific widgets inside that scope before the conversion runs.'
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
    title: 'How to get clean Markdown from a URL with a selector',
    intro:
      'A selector does most of the work. selectorAll returns one Markdown string per match when the content is a list, and modules removes leftovers inside the scope. The [URL to Markdown guide](/docs/guides/content-conversion/url-to-markdown) shows the same scoping with the raw API.',
    steps: [
      {
        label: '1 · Convert only the article',
        sdk: "const markdown = await microlink.markdown('https://example.com/blog/post', {\n  selector: 'article'\n})",
        note: 'The conversion is limited to the first element matching the selector, so the header, the sidebar and the footer never enter the Markdown. The call resolves to a string.'
      },
      {
        label: '2 · One string per item',
        sdk: "const comments = await microlink.markdown('https://example.com/thread', {\n  selectorAll: '.comment'\n})\n\nconsole.log(comments.length)",
        note: 'selectorAll resolves to an array with one Markdown string per matching element, which suits threads, listings and search results where each item should become its own document.'
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
        note: 'modules runs JavaScript in the page before the conversion, so the removed nodes never reach the Markdown, and embed=markdown returns the result directly as text/markdown. The [page preparation guide](/docs/guides/data-extraction/page-preparation) covers click, scroll and styles for pages that need more.'
      }
    ],
    params: [
      {
        name: 'selector',
        href: '/docs/sdk/methods/extract/selector',
        note: 'Scope the conversion to the first element matching a CSS selector.'
      },
      {
        name: 'selectorAll',
        href: '/docs/sdk/methods/extract/selectorAll',
        note: 'Convert every matching element and get an array with one Markdown string each.'
      },
      {
        name: 'adblock',
        href: '/docs/api/parameters/adblock',
        note: 'Blocks third-party ad, tracker and cookie consent requests. On by default.'
      },
      {
        name: 'modules',
        href: '/docs/api/parameters/modules',
        note: 'Inject inline JavaScript or a module URL to remove site-specific widgets before the conversion runs.'
      },
      {
        name: 'meta',
        href: '/docs/api/parameters/meta',
        note: 'false skips metadata detection when you only want the body. Default true.'
      }
    ],
    outro:
      'Start with main or article, since most publishing platforms wrap the content in one of them, and fall back to a site-specific selector only when they do not. Paste a URL into the [URL to Markdown tool](/tools/url-to-markdown) to see the unscoped output you are starting from.'
  },
  why: {
    title: 'Why scoping at the source gives cleaner Markdown',
    intro:
      'Cleaning Markdown after the fact needs heuristics. Scoping the conversion needs a selector.',
    cards: [
      {
        kicker: 'Tokens you do not pay for',
        title: 'Boilerplate never reaches the model.',
        body: 'A conversion scoped to the article body is a fraction of the whole page. Fewer tokens per document means cheaper embeddings, cheaper prompts and more documents per context window.',
        note: 'The [Markdown API](/markdown) page puts the saving at up to 80% fewer tokens than raw HTML, and scoping compounds it.'
      },
      {
        kicker: 'Better retrieval',
        title: 'Chunks contain content, not menus.',
        body: 'When every page in an index shares the same navigation text, similarity search surfaces the navigation. Scoped conversions keep each chunk about its own subject, which is what makes answers cite the right page.',
        note: 'For a whole site, run the scoped request over every URL with [bulk Markdown conversion](/use-cases/website-to-markdown/bulk-conversion), and convert list items with selectorAll so each item becomes its own document.'
      },
      {
        kicker: 'Deterministic',
        title: 'The same selector yields the same body every run.',
        body: 'Readability heuristics change their mind when a layout changes. A selector either matches or resolves to null, a failure you can detect and alert on instead of indexing the wrong text.',
        note: 'When not to: if you convert thousands of unrelated sites and cannot maintain selectors, start with main and article and accept some noise. A per-site selector map is a later optimization, not a prerequisite.'
      }
    ]
  },
  faq: [
    {
      question: 'Which selector gives the cleanest Markdown for an article?',
      answer:
        'Try main or article first, because most platforms wrap the content in one of them. Otherwise inspect the page and pick the container that holds the text, such as .post-content. Any CSS selector that document.querySelector accepts works.'
    },
    {
      question: 'What happens if the Markdown selector matches nothing?',
      answer:
        'The value resolves to null, so your code can detect it and fall back to a broader selector or to the whole page. To declare the fallback in the request, write the rule with [extract](/docs/sdk/methods/extract) and pass an array of selectors: the first one that yields a value wins.'
    },
    {
      question: 'How do I get clean Markdown from a URL without the navigation?',
      answer:
        'Scope the conversion with selector so only the content container is converted. Navigation, sidebars and footers live outside that element, so they are never part of the output and there is nothing to strip afterwards.'
    },
    {
      question: 'Does adblock change the Markdown output?',
      answer:
        'Yes, for the better. It blocks third-party ads, trackers and cookie consent services before the page renders, so their text never enters the conversion. It is on by default on every plan, the same behavior that produces [clean PDFs without ads](/use-cases/website-to-pdf/clean-layout).'
    },
    {
      question: 'Can I remove elements inside the scoped Markdown content?',
      answer:
        'Yes. Inject a small script with modules that removes the nodes, for example share buttons or newsletter forms, before the conversion runs. If the content itself is rendered by JavaScript, combine it with the waits described in [Markdown from JavaScript-rendered pages](/use-cases/website-to-markdown/javascript-rendered-pages).'
    }
  ],
  cta: {
    headlinePrefix: 'Ready for',
    headlineAccent: 'content-only Markdown',
    body: 'One selector removes the noise at the source. Start on the free tier and convert your first article body today.',
    href: '/markdown',
    label: 'Convert clean Markdown'
  },
  howTo: {
    name: 'How to get clean Markdown from a URL without boilerplate',
    steps: [
      {
        title: 'Convert only the article',
        description:
          'Call the Markdown method with selector set to article or main. Only the first matching element is converted, so navigation, sidebars and footers stay out.'
      },
      {
        title: 'Convert list items separately',
        description:
          'Use selectorAll with the item selector to get an array with one Markdown string per comment, listing or search result.'
      },
      {
        title: 'Remove leftovers before converting',
        description:
          'Pass modules with a short script that removes share buttons, newsletter forms or related posts inside the scope, and add embed=markdown to receive the Markdown directly.'
      }
    ]
  }
}
