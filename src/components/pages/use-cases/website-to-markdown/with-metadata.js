export const CONTENT = {
  slug: 'website-to-markdown/with-metadata',
  head: {
    title: 'URL to Markdown with metadata frontmatter',
    description:
      'Convert any page to Markdown with a YAML frontmatter block: title, author, date, description, word count and reading time from the same request.'
  },
  hero: {
    title: 'Convert a URL to Markdown with its metadata as frontmatter',
    intro:
      'A Markdown body without a title, an author or a date is hard to index and harder to cite. The Markdown API can prepend the page’s normalized metadata as YAML frontmatter, so every converted document arrives self-describing.',
    cta: { label: 'Start with the Markdown API', href: '/markdown' }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'Content without context is hard to store',
    paragraphs: [
      'Pipelines that feed LLMs, search indexes or knowledge bases need more than the text: who wrote it, when, what it is about, how long it is. Scraping those fields separately means a second request and a second parser.',
      'Set meta to true on a Markdown request served with embed and Microlink prepends a YAML frontmatter block: title, description, author, publisher, date, language, canonical URL, image and logo details, word count and reading time. Then the Markdown body follows.'
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
    title: 'One request, frontmatter plus body',
    intro:
      'The direct Markdown response carries the frontmatter. In the SDK, the same fields ride along as JSON next to the Markdown rule.',
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
        note: 'The response body is text/markdown: a YAML block with the normalized fields, then the converted page.'
      },
      {
        label: '2 · Metadata and Markdown as JSON',
        sdk: "const { title, author, date, markdown } = await microlink.metadata(\n  'https://example.com/blog/post',\n  { data: { markdown: { attr: 'markdown' } } }\n)",
        note: 'metadata() returns the normalized fields, and the markdown rule adds the body to the same object.'
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
        note: 'When you want a custom field set, compose the frontmatter yourself from the JSON response.'
      }
    ],
    params: [
      {
        name: 'meta',
        href: '/docs/api/parameters/meta',
        note: 'true adds the normalized fields; with embed=markdown they become YAML frontmatter. Use an object to pick fields.'
      },
      {
        name: 'data',
        href: '/docs/api/parameters/data',
        note: 'The markdown rule: data.markdown.attr=markdown converts the page.'
      },
      {
        name: 'embed',
        href: '/docs/api/parameters/embed',
        note: 'Return the Markdown as the response body with a text/markdown content type.'
      },
      {
        name: 'prerender',
        href: '/docs/api/parameters/prerender',
        note: 'true forces a browser render for client-side pages whose metadata only exists after JavaScript runs.'
      }
    ],
    outro:
      'Fields that cannot be detected come back as null in JSON, so consumers should treat every field as optional.'
  },
  why: {
    title: 'Why frontmatter is the right container',
    intro:
      'Frontmatter is the convention every static site generator, note app and RAG loader already understands.',
    cards: [
      {
        kicker: 'Normalized fields',
        title: 'The same keys for every site.',
        body: 'Microlink merges Open Graph, Twitter Cards, JSON-LD and the HTML itself into one predictable shape. Your loader reads title, author and date the same way for a newspaper and a personal blog.',
        note: 'The [choosing fields](/docs/guides/metadata/choosing-fields) guide shows how to request only the keys you index.'
      },
      {
        kicker: 'Sized for context windows',
        title: 'Word count and reading time tell you what you are ingesting.',
        body: 'The frontmatter includes the word count and the reading time, so a pipeline can chunk, skip or prioritize documents before spending tokens on them.',
        note: 'Pair it with a [scoped conversion](/use-cases/website-to-markdown/clean-content) to keep navigation and footers out of the count.'
      },
      {
        kicker: 'One request',
        title: 'Metadata and content from the same render.',
        body: 'Because both come from one fetch, the frontmatter describes exactly the body below it: same URL, same moment, same cache entry.',
        note: 'When not to: if you only need the body for a summarizer, keep meta at false; it is the biggest single speedup for content-only requests.'
      }
    ]
  },
  faq: [
    {
      question: 'Which fields appear in the Markdown frontmatter?',
      answer:
        'The normalized metadata: title, description, author, publisher, date, language, canonical URL, image and logo details, plus word count and reading time. Fields the page does not expose are absent or null.'
    },
    {
      question: 'Can I get the frontmatter fields without the direct response?',
      answer:
        'Yes. Call metadata() with a data.markdown rule and you get the same fields as JSON next to the Markdown body, then compose the frontmatter however you like.'
    },
    {
      question: 'Does frontmatter work for PDFs and office documents?',
      answer:
        'The Markdown conversion works for PDF, DOCX, XLSX and PPTX URLs; the metadata fields depend on what the file exposes, so expect fewer of them than for a web page.'
    },
    {
      question: 'Can I choose only some frontmatter fields?',
      answer:
        'Yes. Pass meta as an object, for example meta: { title: true, author: true, date: true }, to detect only those fields and keep the response smaller.'
    }
  ],
  cta: {
    headlinePrefix: 'Ready for',
    headlineAccent: 'self-describing Markdown',
    body: 'Title, author, date and reading time on top of every converted page. Start on the free tier and feed your pipeline documents that explain themselves.',
    href: '/markdown',
    label: 'Convert with frontmatter'
  }
}
