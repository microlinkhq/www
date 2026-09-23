export const CONTENT = {
  slug: 'search-api/scholar-citations',
  head: {
    title: 'Google Scholar API for papers, citations and PDFs',
    description: 'Search Google Scholar from code: title, year, citation count, byline and PDF link for every paper as JSON, ready to rank, filter and read.'
  },
  hero: {
    title: 'Automate literature reviews with a Google Scholar API',
    intro: 'A Google Scholar API turns a literature search into data: each paper comes back with its title, publication year, citation count and a direct PDF link when one exists. Research teams, R&D groups, grant writers and research agents all start a review the same way, and all lose hours copying results by hand. The [Search API](/search) returns Scholar results as JSON you can sort, filter and read.',
    cta: {
      label: 'Start with the Search API',
      href: '/search'
    }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'A literature review starts with hours of copying Scholar results',
    paragraphs: [
      'Scholar is where many literature searches begin, and it is built for reading one page at a time. Collecting the top papers across a dozen queries, noting citation counts and years, and finding which ones have a free PDF is manual work that starts over every time the research question shifts.',
      'Scraping the results page yourself means parsing a byline that mixes authors, venue and year into one string, pulling citation counts out of link text, and keeping the requests from being blocked. Copying into a spreadsheet does not scale past a handful of queries, and it goes stale the week after.',
      'type: scholar returns each paper with title, url, description, the byline as publisher, year and citations as numbers, a Scholar id and pdf.url when a direct PDF exists. Sort by citations, filter by year, and pass the PDFs or [result.markdown()](/docs/guides/search/content-expansion) to whatever reads the papers.'
    ]
  },
  how: {
    title: 'How to collect papers and citation counts with the Google Scholar API',
    intro: 'Run the queries that define the review, merge and rank the papers, then fetch the full text of the shortlist. The [Scholar guide](/docs/guides/search/scholar) lists every field.',
    steps: [
      {
        label: '1 · Query and rank by citations',
        sdk: "const { results } = await microlink.search('retrieval augmented generation', {\n  type: 'scholar'\n})\n\nconst papers = results\n  .sort((a, b) => b.citations - a.citations)\n  .map(({ id, title, year, citations, publisher, pdf, url }) => ({\n    id,\n    title,\n    year,\n    citations,\n    byline: publisher,\n    pdf: pdf?.url,\n    url\n  }))",
        note: 'citations and year are numbers, so ranking needs no parsing. publisher is the Scholar byline, authors plus venue in one string, and pdf is present only when a direct PDF link exists.'
      },
      {
        label: '2 · Merge several queries into one corpus',
        sdk: "const queries = [\n  'retrieval augmented generation',\n  'dense passage retrieval',\n  'long context language models'\n]\n\nconst pages = await Promise.all(\n  queries.map(query => microlink.search(query, { type: 'scholar' }))\n)\n\nconst corpus = new Map()\nfor (const { results } of pages) {\n  for (const paper of results) {\n    if (paper.year >= 2020) corpus.set(paper.id, paper)\n  }\n}",
        note: 'The Scholar id deduplicates papers that match several queries, and the year cut runs in your code. Three queries are three requests; call next() on any page for more depth.'
      },
      {
        label: '3 · Read the shortlist',
        sdk: 'const shortlist = Array.from(corpus.values())\n  .sort((a, b) => b.citations - a.citations)\n  .slice(0, 5)\n\nconst sources = await Promise.all(\n  shortlist.map(async paper =>\n    paper.pdf\n      ? { title: paper.title, pdf: paper.pdf.url }\n      : { title: paper.title, markdown: await paper.markdown() }\n  )\n)',
        note: 'Papers with a PDF link go to your PDF pipeline. For the rest, markdown() fetches the paper page as Markdown, one request per paper.'
      }
    ],
    params: [
      {
        name: 'type',
        href: '/docs/sdk/methods/search/scholar',
        note: "'scholar' returns title, url, description, publisher, year, citations, id and an optional pdf."
      },
      {
        name: 'page',
        href: '/docs/sdk/methods/search',
        note: 'Later results pages for broad topics, one request each.'
      },
      {
        name: 'limit',
        href: '/docs/sdk/methods/search',
        note: 'Maximum number of papers per page.'
      },
      {
        name: 'markdown()',
        href: '/docs/guides/search/content-expansion',
        note: 'Reads one paper page as Markdown, one request per call.'
      }
    ],
    outro: 'Scholar results are what Google Scholar ranks for a query, not a complete bibliography, and the citation count is the one Scholar shows. Treat the corpus as a starting point and record the queries and date with every review. For filings rather than papers, [search prior art in Google Patents](/use-cases/search-api/patent-search) with the same client.'
  },
  why: {
    title: 'Why a Scholar search API speeds up literature review automation',
    intro: 'The slow part of a review is not reading, it is finding and triage. Structured results turn triage into a sort.',
    cards: [
      {
        kicker: 'Numbers, not strings',
        title: 'citations and year arrive as numbers.',
        body: 'Rank by influence, cut by recency and chart a field over time without parsing “Cited by” out of link text. The Scholar id gives every paper a stable key across your queries.',
        note: 'The [academic research pattern](/docs/guides/search/patterns) sorts by citations and routes papers to PDF or Markdown the same way.'
      },
      {
        kicker: 'Full text on demand',
        title: 'PDF link when it exists, Markdown when it does not.',
        body: 'pdf.url points to the document when Scholar lists a direct PDF. For the rest, markdown() reads the paper page, so a model can summarize the abstract without a scraper of its own.',
        note: 'Turn the PDFs themselves into text with [PDF and document to Markdown conversion](/use-cases/website-to-markdown/documents), which takes the pdf.url as input.'
      },
      {
        kicker: 'Agent ready',
        title: 'A research agent can call it as a tool.',
        body: 'Search returns small structured results and expansion is a separate call, so an agent can search, pick the promising papers and read only those. The cost is one request per search and one per paper read.',
        note: 'When not to: Scholar results do not include reference lists, author profiles or h-index metrics. Each result is a paper with its citation count, and a systematic review still needs the databases its protocol names.'
      }
    ]
  },
  faq: [
    {
      question: 'How do I get citation counts from a Google Scholar API?',
      answer: "Call microlink.search with your query and type: 'scholar'. Every result carries citations and year as numbers, so sorting by citations surfaces the most cited papers first."
    },
    {
      question: 'Can I download the papers found through the Scholar API?',
      answer: 'When Scholar lists a direct PDF, the result includes pdf.url and you fetch it like any file. For papers without one, markdown() returns the paper page as Markdown. Access rights stay with the publisher.'
    },
    {
      question: 'How do I automate a literature review with Scholar results?',
      answer: 'Run the queries that define the review, merge results by id, filter by year and citations in code, then expand the shortlist. Record the queries and the date, since results can change between runs.'
    },
    {
      question: 'How many requests does a Google Scholar search cost?',
      answer: 'One per results page, plus one per paper you expand with markdown(). Search has no free tier: it is paid from the first request, and [Pro plans](/pricing) start at €39/month for 46,000 requests with a 99.9% SLA.'
    },
    {
      question: 'Is the Microlink Scholar API affiliated with Google?',
      answer: 'No. Microlink Search is an independent product that queries public Google surfaces, Google Scholar included. It is not affiliated with or endorsed by Google, and Google is a trademark of Google LLC.'
    }
  ],
  cta: {
    headlinePrefix: 'Ready to automate',
    headlineAccent: 'your literature review',
    body: 'Papers, citation counts and PDF links from Google Scholar as JSON. Get a Pro key and build your first corpus today.',
    href: '/search',
    label: 'Search Scholar papers'
  },
  howTo: {
    name: 'How to collect papers and citation counts from Google Scholar',
    steps: [
      {
        title: 'Query and rank by citations',
        description: "Call microlink.search with the topic and type: 'scholar', sort the results by citations and keep id, title, year, byline, PDF link and url."
      },
      {
        title: 'Merge several queries into one corpus',
        description: 'Run the queries that define the review in parallel, keep papers from the years you need and deduplicate them by Scholar id.'
      },
      {
        title: 'Read the shortlist',
        description: 'Take the most cited papers, send those with a PDF link to your PDF pipeline and call markdown() on the rest to read the paper page.'
      }
    ]
  }
}
