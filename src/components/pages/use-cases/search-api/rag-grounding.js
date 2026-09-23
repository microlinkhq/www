export const CONTENT = {
  slug: 'search-api/rag-grounding',
  head: {
    title: 'Ground LLM answers with a search API for RAG',
    description: 'Ground chatbot and agent answers in live Google results: search, read the top sources as Markdown and cite them, at one request per source.'
  },
  hero: {
    title: 'Ground chatbot answers in live results with a search API for RAG',
    intro: 'A search API for RAG gives a model what its training data cannot: what the web says today. Retrieval becomes a query, the top results become sources, and the answer cites them. Support bots, research assistants and agents that answer about releases, prices or news all need that step. The [Search API](/search) returns results as JSON and reads any of them as Markdown on demand.',
    cta: {
      label: 'Start with the Search API',
      href: '/search'
    }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'A model without retrieval answers from a snapshot and fills the gaps',
    paragraphs: [
      'Every model has a training cutoff. Ask about a release from last week, a price that changed yesterday or a company that pivoted, and it answers confidently from old data or invents a plausible detail. Users only notice when it is wrong, and by then they have stopped trusting the rest.',
      'A vector store grounds answers in documents you already indexed, not in what changed on the web since. Scraping search results for live retrieval means proxies, a parser per results layout and a second scraper for every source page, all before the model writes its first token.',
      'Search first, expand selectively. microlink.search returns ten results for one request, period keeps them recent, and result.markdown() fetches only the sources worth reading, as Markdown that uses fewer tokens than HTML. The model gets fresh, citable context, and you decide how many requests each answer costs.'
    ]
  },
  how: {
    title: 'How to ground LLM answers with real-time search',
    intro: 'Retrieve, expand the top sources, and pass them to the model with their URLs so the answer can cite them. The [content expansion guide](/docs/guides/search/content-expansion) describes the two-step model this follows.',
    steps: [
      {
        label: '1 · Retrieve recent results',
        sdk: "const question = 'What changed in the latest Node.js LTS release?'\n\nconst page = await microlink.search('Node.js LTS release notes', {\n  period: 'month',\n  limit: 5\n})",
        note: 'period keeps the results recent and limit caps the page at five. Each result carries title, url and description, often enough to decide what is worth reading.'
      },
      {
        label: '2 · Expand the top sources as Markdown',
        sdk: 'const sources = await Promise.all(\n  page.results.slice(0, 3).map(async (result, index) => ({\n    id: index + 1,\n    title: result.title,\n    url: result.url,\n    content: (await result.markdown()).slice(0, 8000)\n  }))\n)',
        note: 'Three expansions are three more requests, four for the whole answer. Truncating each source keeps the prompt inside your context budget.'
      },
      {
        label: '3 · Answer with citations',
        code: "const context = sources\n  .map(({ id, title, url, content }) => '[' + id + '] ' + title + ' (' + url + ')\\n' + content)\n  .join('\\n\\n')\n\nconst answer = await llm.generate({\n  system: 'Answer only from the sources. Cite them as [n].',\n  prompt: context + '\\n\\nQuestion: ' + question\n})",
        language: 'js',
        note: 'llm.generate stands for your model client. Numbered sources with their URLs let the model cite, and let you render each citation as a link.'
      }
    ],
    params: [
      {
        name: 'period',
        href: '/docs/sdk/methods/search',
        note: 'hour, day, week, month or year. Keeps retrieval recent.'
      },
      {
        name: 'limit',
        href: '/docs/sdk/methods/search',
        note: 'Maximum number of results per page. Fewer results, smaller tool output.'
      },
      {
        name: 'type',
        href: '/docs/sdk/methods/search',
        note: "Route to 'news' or 'scholar' when the question is about current events or research."
      },
      {
        name: 'markdown()',
        href: '/docs/guides/search/content-expansion',
        note: 'Reads one result as Markdown, one request per call.'
      },
      {
        name: 'markdown',
        href: '/docs/sdk/methods/search',
        note: 'true fetches the Markdown of every result up front instead of on demand.'
      }
    ],
    outro: 'markdown: true is simpler, but it reads every result whether the model needs it or not, so keep it for small limits. The [agent tool calling pattern](/docs/guides/search/patterns) lets the model decide when to search and which sources to read.'
  },
  why: {
    title: 'Why search plus selective reading is the right shape for LLM grounding',
    intro: 'Grounding has two costs: requests and tokens. Splitting retrieval from reading keeps both proportional to what the answer needs.',
    cards: [
      {
        kicker: 'Predictable cost',
        title: 'One request to search, one per source read.',
        body: 'Ten results cost one request. Reading three of them costs three more. The budget per answer is a number you choose, not a side effect of how many links a page happened to have.',
        note: 'For questions about papers or current events, route the retrieval to [Scholar papers and citations](/use-cases/search-api/scholar-citations) or [Google News by country](/use-cases/search-api/news-monitoring).'
      },
      {
        kicker: 'Fewer tokens',
        title: 'Markdown instead of HTML for every source.',
        body: 'markdown() returns each source as Markdown, which uses fewer tokens than HTML for the same content and keeps the headings, lists and tables a model can follow.',
        note: 'Already have the URLs? [Turn any URL into LLM context](/use-cases/website-to-markdown/llm-context) with Markdown, links and metadata in parallel.'
      },
      {
        kicker: 'The model decides',
        title: 'Expose search and read as two tools.',
        body: 'Give an agent a search tool that returns title, url and description, and a read tool that returns Markdown. The model searches, reads the sources it trusts, and asks for the next page only when the first was not enough.',
        note: 'When not to: if the answer lives in your own documents, a vector store over them is faster and cheaper than a live search per question. Live search is for what changes on the web, and it adds a network round trip to every grounded answer.'
      }
    ]
  },
  faq: [
    {
      question: 'How do I use a search API for RAG?',
      answer: 'Search the question with microlink.search, expand the top results with result.markdown(), and pass the Markdown to the model with each source’s URL. Restrict freshness with period and cap the page with limit so every answer has a known cost.'
    },
    {
      question: 'How much does grounding an LLM answer with live search cost?',
      answer: 'One request for the search and one per result you expand, so search plus three sources is four requests per answer. Search has no free tier: [Pro plans](/pricing) start at €39/month for 46,000 requests with a 99.9% SLA.'
    },
    {
      question: 'How fast is real-time search for chatbots?',
      answer: 'Search results arrive in about a second. Reading a source fetches a full page, which is slower than the search itself, so expand sources in parallel and only the ones the answer needs.'
    },
    {
      question: 'Should an LLM grounding API return HTML or Markdown?',
      answer: 'Markdown for the model: it uses fewer tokens than HTML for the same content. Call result.html() when your own code needs the DOM, for example to parse a table with selectors before handing the data to the model.'
    },
    {
      question: 'Is the web search for LLMs affiliated with Google?',
      answer: 'No. Microlink Search is an independent product that queries public Google surfaces. It is not affiliated with or endorsed by Google, and Google is a trademark of Google LLC.'
    }
  ],
  cta: {
    headlinePrefix: 'Ready to ground',
    headlineAccent: 'every answer',
    body: 'Live search results plus Markdown for the sources worth reading. Get a Pro key and ship your first grounded answer today.',
    href: '/search',
    label: 'Ground LLM answers'
  },
  howTo: {
    name: 'How to ground LLM answers with a search API',
    steps: [
      {
        title: 'Retrieve recent results',
        description: 'Call microlink.search with the question as a query, a period such as month and a small limit.'
      },
      {
        title: 'Expand the top sources as Markdown',
        description: 'Call markdown() on the first three results in parallel, number them and truncate each one to fit your context budget.'
      },
      {
        title: 'Answer with citations',
        description: 'Join the numbered sources with their titles and URLs into the prompt and instruct the model to answer only from them and cite each one.'
      }
    ]
  }
}
