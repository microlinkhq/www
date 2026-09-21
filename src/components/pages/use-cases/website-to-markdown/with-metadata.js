export const CONTENT = {
  slug: 'website-to-markdown/with-metadata',
  head: {
    title: 'URL to Markdown with metadata as YAML frontmatter',
    description:
      'Convert any URL to Markdown with a YAML frontmatter block on top: title, author, date, description, word count and reading time in one request.'
  },
  hero: {
    title: 'Convert a URL to Markdown with metadata frontmatter',
    intro:
      'URL to Markdown with metadata means every converted page arrives with its title, author and date attached, not just its text. A Markdown body without them is hard to index and harder to cite, which hurts RAG loaders, static site importers, note apps and research archives alike. The Markdown API can prepend the page’s normalized metadata as YAML frontmatter, so each document describes itself.',
    cta: { label: 'Start with the Markdown API', href: '/markdown' }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'Markdown without metadata is hard to index and cite',
    paragraphs: [
      'Pipelines that feed LLMs, search indexes or knowledge bases need more than the text: who wrote it, when, what it is about, how long it is. Without those fields a retrieved chunk cannot be attributed, sorted by date or filtered by language, and the answer built on it cannot cite its source.',
      'Scraping those fields separately means a second request and a second parser. Open Graph, Twitter Cards, JSON-LD and plain HTML tags disagree with each other and vary per site, so the metadata code grows a special case for every source. Then the two results have to be joined, and they may not even describe the same version of the page.',
      'Set [meta](/docs/api/parameters/meta) to true on a Markdown request served with [embed](/docs/api/parameters/embed) and Microlink prepends a YAML frontmatter block: title, author, date, publisher, language, description and canonical URL, the image and logo with their dimensions, plus word count and reading time. The Markdown body follows, from the same fetch.'
    ],
    live: {
      label: 'Open the live Markdown with frontmatter',
      request: {
        url: 'https://microlink.io/blog/edge-cdn',
        params: {
          data: { markdown: { attr: 'markdown' } },
          meta: true,
          embed: 'markdown'
        }
      }
    }
  },
  how: {
    title: 'How to get Markdown with YAML frontmatter from a URL',
    intro:
      'The direct Markdown response carries the frontmatter. In the SDK, the same fields ride along as JSON next to the Markdown rule through the [metadata method](/docs/sdk/methods/metadata).',
    steps: [
      {
        label: '1 · Direct Markdown with frontmatter',
        request: {
          url: 'https://example.com/blog/post',
          params: {
            data: { markdown: { attr: 'markdown' } },
            meta: true,
            embed: 'markdown'
          }
        },
        note: 'The response body is text/markdown: a YAML block between two --- lines with keys such as title, author, date, word_count and reading_time, then the converted page. Save it as a .md file and any frontmatter-aware loader can read it.'
      },
      {
        label: '2 · Metadata and Markdown as JSON',
        sdk: "const { title, author, date, markdown } = await microlink.metadata(\n  'https://example.com/blog/post',\n  { data: { markdown: { attr: 'markdown' } } }\n)",
        note: 'metadata() returns the normalized fields, and the markdown rule adds the body to the same object. One request, one cache entry, no YAML to parse.'
      },
      {
        label: '3 · Build your own frontmatter',
        sdk: `const page = await microlink.metadata('https://example.com/blog/post', {
  data: { markdown: { attr: 'markdown' } }
})

const document = [
  '---',
  \`title: \${JSON.stringify(page.title)}\`,
  \`author: \${JSON.stringify(page.author)}\`,
  \`date: \${page.date}\`,
  \`source: \${page.url}\`,
  '---',
  '',
  page.markdown
].join('\\n')`,
        note: 'When you want a custom field set, different key names or extra fields such as a collection id, compose the frontmatter yourself from the JSON response.'
      }
    ],
    params: [
      {
        name: 'meta',
        href: '/docs/api/parameters/meta',
        note: 'true detects the normalized fields. With embed=markdown they become the YAML frontmatter. Default true.'
      },
      {
        name: 'data',
        href: '/docs/api/parameters/data',
        note: 'The Markdown rule: data.markdown.attr=markdown serializes the page as Markdown.'
      },
      {
        name: 'embed',
        href: '/docs/api/parameters/embed',
        note: 'Return the Markdown field as the response body with a text/markdown content type.'
      },
      {
        name: 'prerender',
        href: '/docs/api/parameters/prerender',
        note: 'true forces a browser render for client-side pages whose metadata only exists after JavaScript runs. Default auto.'
      }
    ],
    outro:
      'Fields that cannot be detected come back as null in JSON, so consumers should treat every field as optional. The [data fields reference](/docs/api/getting-started/data-fields) documents each normalized field and how it is resolved.'
  },
  why: {
    title: 'Why YAML frontmatter is the right container for page metadata',
    intro:
      'Frontmatter is the convention that static site generators, note apps and RAG loaders already understand, so the metadata travels inside the file instead of in a sidecar.',
    cards: [
      {
        kicker: 'Normalized fields',
        title: 'The same keys for every site.',
        body: 'Microlink merges Open Graph, Twitter Cards, JSON-LD and the HTML itself into one predictable shape. Your loader reads title, author and date the same way for a newspaper and a personal blog.',
        note: 'The [choosing fields guide](/docs/guides/metadata/choosing-fields) shows how to request only the keys you index when you work with the JSON response, and the [Metadata API](/metadata) page covers the normalization itself.'
      },
      {
        kicker: 'Sized for context windows',
        title: 'Word count and reading time tell you what you are ingesting.',
        body: 'The frontmatter includes word_count and reading_time, so a pipeline can chunk, skip or prioritize documents before spending tokens on them. A 200-word stub and a 9,000-word guide no longer look the same in the queue.',
        note: 'Pair it with [clean Markdown scoped to the content](/use-cases/website-to-markdown/clean-content) when navigation and footers would otherwise pad the body.'
      },
      {
        kicker: 'One request',
        title: 'Metadata and content from the same fetch.',
        body: 'Because both come from one request, the frontmatter describes exactly the body below it: same URL, same moment, same cache entry. A cache hit returns both and does not count against your quota.',
        note: 'When not to: if you only need the body for a summarizer, keep meta at false. Skipping metadata detection is the first speedup the [performance guide](/docs/guides/data-extraction/caching-and-performance) recommends for content-only requests.'
      }
    ]
  },
  faq: [
    {
      question: 'Which fields appear in the Markdown frontmatter?',
      answer:
        'The normalized metadata: title, author, date, publisher, lang, description and url, the image and logo with their type, size and dimensions, plus word_count and reading_time. Fields the page does not expose are left out or empty, so treat every key as optional.'
    },
    {
      question: 'How do I convert a URL to Markdown with metadata in one request?',
      answer:
        'Send data.markdown.attr=markdown with meta=true and embed=markdown. The response is a Markdown file that starts with a YAML frontmatter block and continues with the converted page. Without embed, the same fields and the Markdown arrive together as JSON.'
    },
    {
      question: 'Can I get the Markdown frontmatter fields as JSON instead of YAML?',
      answer:
        'Yes. Call metadata() with a data.markdown rule and you get the same fields as JSON next to the Markdown body, then compose the frontmatter however you like. The same pattern extends to your own rules, as in [custom fields alongside the metadata](/use-cases/website-metadata/custom-fields).'
    },
    {
      question: 'Does Markdown frontmatter work for PDFs and office documents?',
      answer:
        'The Markdown conversion works for PDF, DOCX, XLSX and PPTX URLs, as described in [PDF and office documents to Markdown](/use-cases/website-to-markdown/documents). The metadata fields depend on what the file exposes, so expect fewer of them than for a web page.'
    },
    {
      question: 'Can I choose which fields go into the Markdown frontmatter?',
      answer:
        'The frontmatter of the direct response carries the full normalized set. For a custom selection, request the JSON response, pick the fields you need and write the YAML block yourself, as the third step above shows. It is a few lines of code and you control the key names.'
    }
  ],
  cta: {
    headlinePrefix: 'Ready for',
    headlineAccent: 'self-describing Markdown',
    body: 'Title, author, date and reading time on top of every converted page. Start on the free tier and feed your pipeline documents that explain themselves.',
    href: '/markdown',
    label: 'Convert with frontmatter'
  },
  howTo: {
    name: 'How to convert a URL to Markdown with metadata frontmatter',
    steps: [
      {
        title: 'Request the Markdown directly with frontmatter',
        description:
          'Call the API with url, data.markdown.attr=markdown, meta=true and embed=markdown. The response is text/markdown with a YAML frontmatter block followed by the converted page.'
      },
      {
        title: 'Get the metadata and the Markdown as JSON',
        description:
          'Call the metadata method with a data.markdown rule. The normalized fields and the Markdown body come back in the same object.'
      },
      {
        title: 'Build your own frontmatter',
        description:
          'Pick the fields you need from the JSON response, write them as a YAML block between two --- lines and append the Markdown body.'
      }
    ]
  }
}
