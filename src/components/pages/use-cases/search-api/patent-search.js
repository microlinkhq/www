export const CONTENT = {
  slug: 'search-api/patent-search',
  head: {
    title: 'Google Patents API for prior art search',
    description: 'Run prior art searches on Google Patents from code: inventor, assignee, ISO 8601 priority, filing and grant dates, publication number and PDF link.'
  },
  hero: {
    title: 'Run prior art searches with a Google Patents API',
    intro: 'A Google Patents API makes a prior art search repeatable: each query returns filings with inventor, assignee, priority, filing and grant dates, the publication number and a PDF link. Patent attorneys screen for novelty, R&D teams check what is already filed before they build, and competitive intelligence watches what rivals publish. The [Search API](/search) returns those filings as JSON with ISO 8601 dates.',
    cta: {
      label: 'Start with the Search API',
      href: '/search'
    }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'Prior art hides across thousands of filings and several kinds of date',
    paragraphs: [
      'A prior art search is one question asked many ways: synonyms, component names, the problem the invention solves. Each phrasing surfaces different filings, and the useful signal sits in the metadata: who invented it, which company holds it and which date came first.',
      'Reading patent result pages by hand means copying numbers and dates into a spreadsheet, per query, per run. Scraping them means telling priority from filing from publication dates, handling missing grants, and rebuilding the parser whenever the markup changes.',
      'type: patents returns each filing with title, abstract, url, inventor, assignee, language, the priority, filing and publication dates in ISO 8601, a grant date when there is one, the publication number, a PDF link and figure thumbnails. [result.markdown()](/docs/guides/search/content-expansion) fetches the full patent page when a filing deserves a close read.'
    ]
  },
  how: {
    title: 'How to search prior art with the Google Patents API',
    intro: 'Search the concept several ways, merge the filings by publication number, then read the closest ones. The [patents guide](/docs/guides/search/patents) lists every field.',
    steps: [
      {
        label: '1 · Search one phrasing of the concept',
        sdk: "const { results } = await microlink.search('predicated load prefetching', {\n  type: 'patents'\n})\n\nconst filings = results.map(patent => ({\n  number: patent.publication.number,\n  title: patent.title,\n  assignee: patent.assignee,\n  inventor: patent.inventor,\n  priority: patent.priority.date,\n  granted: patent.grant?.date ?? null,\n  pdf: patent.pdf?.url\n}))",
        note: 'priority, filing and publication are always present; grant and pdf are optional. publication.number identifies a filing across queries.'
      },
      {
        label: '2 · Merge several phrasings, earliest first',
        sdk: "const phrasings = [\n  'predicated load prefetching',\n  'prefetch on conditional load instruction',\n  'speculative memory prefetch predicate'\n]\n\nconst pages = await Promise.all(\n  phrasings.map(query => microlink.search(query, { type: 'patents' }))\n)\n\nconst byNumber = new Map()\nfor (const { results } of pages) {\n  for (const patent of results) byNumber.set(patent.publication.number, patent)\n}\n\nconst timeline = Array.from(byNumber.values()).sort(\n  (a, b) => Date.parse(a.priority.date) - Date.parse(b.priority.date)\n)",
        note: 'One request per phrasing. Sorting by priority date orders the merged filings by their earliest claimed date, the order a novelty review reads them in.'
      },
      {
        label: '3 · Read the closest filings',
        sdk: 'const closest = timeline.slice(0, 3)\n\nconst fullText = await Promise.all(\n  closest.map(async patent => ({\n    number: patent.publication.number,\n    assignee: patent.assignee,\n    markdown: await patent.markdown()\n  }))\n)',
        note: 'markdown() fetches the Google Patents page of each filing as Markdown, one request each, ready for a reviewer or a model to read side by side.'
      }
    ],
    params: [
      {
        name: 'type',
        href: '/docs/sdk/methods/search/patents',
        note: "'patents' returns inventor, assignee, language, priority, filing, grant and publication dates, pdf, figures and id."
      },
      {
        name: 'page',
        href: '/docs/sdk/methods/search',
        note: 'Later pages of filings for broad concepts, one request each.'
      },
      {
        name: 'limit',
        href: '/docs/sdk/methods/search',
        note: 'Maximum number of filings per page.'
      },
      {
        name: 'markdown()',
        href: '/docs/guides/search/content-expansion',
        note: 'Reads the full patent page as Markdown, one request per filing.'
      }
    ],
    outro: 'For patent monitoring, run the same queries on your own schedule and keep the filings whose publication.date is newer than your last run. The API does not store watchlists or send notifications. The [content expansion guide](/docs/guides/search/content-expansion) explains when HTML fits better than Markdown for a patent page.'
  },
  why: {
    title: 'Why structured patent results speed up prior art review',
    intro: 'Prior art review is triage over dates and names. Getting those as fields instead of text moves the triage into code.',
    cards: [
      {
        kicker: 'Dates that sort',
        title: 'Priority, filing, publication and grant in ISO 8601.',
        body: 'Every date is an ISO 8601 string under its own key, so the earliest priority date, the gap between filing and grant, and the filings published this month are one comparison each.',
        note: 'Researching papers rather than filings? [Collect papers and citation counts from Scholar](/use-cases/search-api/scholar-citations) with the same client.'
      },
      {
        kicker: 'Who holds what',
        title: 'Assignee and inventor on every filing.',
        body: 'Group by assignee to see which companies are active in a space, or by inventor to follow a team across employers. Each filing carries a language code, so foreign-language filings can go to translation first.',
        note: 'For competitor activity beyond filings, [monitor their press coverage in Google News](/use-cases/search-api/news-monitoring) by country.'
      },
      {
        kicker: 'Full text on demand',
        title: 'Read only the filings that matter.',
        body: 'One search returns abstracts and metadata for a page of filings in one request. Expanding a filing with markdown() or downloading pdf.url is a separate step you take only for the close ones.',
        note: 'When not to: this searches what Google Patents ranks for a query. It is not a legal opinion and not an exhaustive register search, so a formal patentability or freedom to operate opinion still needs a patent professional and the official registers.'
      }
    ]
  },
  faq: [
    {
      question: 'How do I search prior art with a Google Patents API?',
      answer: "Call microlink.search with a description of the invention and type: 'patents'. Run several phrasings, merge the filings by publication number and sort by priority date to see the earliest claimed dates first."
    },
    {
      question: 'Which dates does the patent search API return?',
      answer: 'priority.date, filing.date and publication.date on every filing, all ISO 8601, plus grant.date when the filing lists a grant. publication.number carries the publication number, such as US20170083338A1.'
    },
    {
      question: 'Can I set up patent monitoring for a technology or a competitor?',
      answer: 'Yes, as your own loop: run queries that describe the technology on a schedule, filter by assignee in code, and keep filings with a publication.date newer than your previous run. The API has no watchlists or alerts.'
    },
    {
      question: 'How much does patent search with the Search API cost?',
      answer: 'Each results page is one request, and each filing expanded with markdown() is one more. Search has no free tier: it is paid from the first request, and [Pro plans](/pricing) start at €39/month for 46,000 requests.'
    },
    {
      question: 'Is this an official Google Patents API?',
      answer: 'No. Microlink Search is an independent product that queries public Google surfaces, Google Patents included. It is not affiliated with or endorsed by Google, and Google is a trademark of Google LLC.'
    }
  ],
  cta: {
    headlinePrefix: 'Ready to search',
    headlineAccent: 'prior art',
    body: 'Patent filings with inventors, assignees and ISO 8601 dates as JSON. Get a Pro key and run your first prior art search today.',
    href: '/search',
    label: 'Search patents'
  },
  howTo: {
    name: 'How to search prior art with the Google Patents API',
    steps: [
      {
        title: 'Search one phrasing of the concept',
        description: "Call microlink.search with a description of the invention and type: 'patents', and map each filing to its publication number, title, assignee, inventor, priority date, grant date and PDF link."
      },
      {
        title: 'Merge several phrasings',
        description: 'Run each phrasing in parallel, deduplicate the filings by publication number and sort them by priority date, earliest first.'
      },
      {
        title: 'Read the closest filings',
        description: 'Call markdown() on the top filings to fetch each Google Patents page as Markdown for a reviewer or a model.'
      }
    ]
  }
}
