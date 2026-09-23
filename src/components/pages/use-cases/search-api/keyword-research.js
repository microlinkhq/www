export const CONTENT = {
  slug: 'search-api/keyword-research',
  head: {
    title: 'Google Autocomplete API for keyword research',
    description: 'Get keyword ideas from Google Autocomplete, related searches and People Also Ask as JSON, geo-targeted by country. Long-tail variants from one seed.'
  },
  hero: {
    title: 'Find the queries people type with a Google Autocomplete API',
    intro: 'A Google Autocomplete API returns the queries people start typing, the most direct record of how a market phrases a problem. SEO teams plan content with it, product teams name features with it, and agents expand a vague prompt into precise searches. The [Search API](/search) returns suggestions, related searches and People Also Ask questions as JSON.',
    cta: {
      label: 'Start with the Search API',
      href: '/search'
    }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'Keyword lists come from guesses, or from a tool that guesses for you',
    paragraphs: [
      'Content that ranks answers the question people actually type. A brainstorm produces the phrasing a team uses internally, which rarely matches the long-tail queries buyers enter, and those long-tail variants are where a new page has a chance.',
      'Typing seeds into a search box and copying the dropdown works for five queries, not five hundred. Keyword suites solve scale with their own databases and a seat price, and calling a suggest endpoint yourself means handling blocking and parsing for a result that is only a list of strings.',
      'type: autocomplete returns suggestions as value strings, and it is lightweight and fast. The default web search adds relatedSearches and peopleAlsoAsk to the results page, turning one seed into follow-up queries and real questions. location geo-targets both by country, so the ideas match the market you write for.'
    ]
  },
  how: {
    title: 'How to get keyword suggestions from the Google Autocomplete API',
    intro: 'Expand a seed with autocomplete, add a letter to reach the long tail, then pull the questions from the results page. The [autocomplete guide](/docs/guides/search/autocomplete) shows the result shape.',
    steps: [
      {
        label: '1 · Expand a seed',
        sdk: "const page = await microlink.search('headless browser', {\n  type: 'autocomplete',\n  location: 'us'\n})\n\nconst ideas = page.results.map(({ value }) => value)",
        note: 'Each suggestion is a value string. Autocomplete results have no url, so there is nothing to expand: they are inputs for the next query.'
      },
      {
        label: '2 · Reach the long tail with a letter',
        sdk: "const seed = 'headless browser'\nconst letters = 'abcdefghijklmnopqrstuvwxyz'.split('')\n\nconst pages = await Promise.all(\n  letters.map(letter =>\n    microlink.search(seed + ' ' + letter, {\n      type: 'autocomplete',\n      location: 'us'\n    })\n  )\n)\n\nconst longTail = Array.from(\n  new Set(pages.flatMap(({ results }) => results.map(({ value }) => value)))\n)",
        note: 'Twenty-six requests collect the suggestions for every next letter, deduplicated with a Set. Save it for the seeds that matter, not every idea on the list.'
      },
      {
        label: '3 · Pull questions and related searches',
        sdk: "const serp = await microlink.search('headless browser api', {\n  location: 'us'\n})\n\nconst questions = (serp.peopleAlsoAsk || []).map(({ question }) => question)\nconst related = (serp.relatedSearches || []).map(({ query }) => query)",
        note: 'The default search type returns peopleAlsoAsk and relatedSearches next to the results when Google shows them. Questions become headings and FAQ entries; related searches become the next seeds.'
      }
    ],
    params: [
      {
        name: 'type',
        href: '/docs/sdk/methods/search/autocomplete',
        note: "'autocomplete' returns suggestions as value strings. Results cannot be expanded."
      },
      {
        name: 'location',
        href: '/docs/sdk/methods/search',
        note: 'Two-letter country code. There is no language option, only country.'
      },
      {
        name: 'relatedSearches',
        href: '/docs/guides/search/search',
        note: 'Follow-up queries from the web results page, as objects with a query field.'
      },
      {
        name: 'peopleAlsoAsk',
        href: '/docs/guides/search/search',
        note: 'Related questions with question, snippet, title and link, when Google shows them.'
      }
    ],
    outro: 'None of these surfaces returns search volume, cost per click or keyword difficulty. Use them to discover phrasing and questions, then size the shortlist with the metrics source you already trust. The [query expansion pattern](/docs/guides/search/patterns) shows autocomplete feeding heavier searches.'
  },
  why: {
    title: 'Why autocomplete beats a brainstorm for keyword research',
    intro: 'Suggestions are what people type, in the words they type it. That makes them the right raw material for a keyword list.',
    cards: [
      {
        kicker: 'Demand in its own words',
        title: 'Suggestions are real queries, not synonyms.',
        body: 'Autocomplete completes a prefix with queries people search for, which is why its phrasing fits titles and headings better than a thesaurus. The guide lists demand modeling and prompt seeding among its uses.',
        note: 'Check where you already rank for the phrases you find with [rank tracking by country](/use-cases/search-api/rank-tracking).'
      },
      {
        kicker: 'Questions included',
        title: 'People Also Ask arrives structured.',
        body: 'peopleAlsoAsk comes back as question, snippet, title and link, so an FAQ outline is a map over an array. The link shows the source behind each answer, which is the page your content competes with.',
        note: 'Want the whole results page as text for a content brief? [Get the SERP as Markdown](/use-cases/search-api/serp-to-markdown) from the same query.'
      },
      {
        kicker: 'Per market',
        title: 'location sets the country.',
        body: 'Pass a two-letter location code to research the market you write for rather than the one your office sits in. Every seed and every letter variant is one request, so a market is a known cost.',
        note: 'When not to: autocomplete does not tell you how many people search a phrase or how hard it is to rank for it. If you prioritize by volume or difficulty, pair these ideas with a keyword metrics source. Grounding an assistant in live results instead? See [live search for LLM answers](/use-cases/search-api/rag-grounding).'
      }
    ]
  },
  faq: [
    {
      question: 'How do I use the Google Autocomplete API for keyword research?',
      answer: "Call microlink.search with a seed and type: 'autocomplete'. Each result is a value string with a suggested query. Append letters to the seed to reach long-tail variants, and run the default search type to add related searches and People Also Ask questions."
    },
    {
      question: 'Does the keyword suggestions API return search volume?',
      answer: 'No. Autocomplete returns suggested queries only, and web results add related searches and questions. There is no volume, cost per click or difficulty field, so size your shortlist with a metrics source.'
    },
    {
      question: 'Can I get People Also Ask questions through the Search API?',
      answer: 'Yes. The default search type returns peopleAlsoAsk with question, snippet, title and link when Google shows the box for that query, alongside relatedSearches and the organic results.'
    },
    {
      question: 'How many requests does autocomplete keyword research use?',
      answer: 'One per query. A seed plus 26 letter variants is 27 requests, and each web search for questions is one more. Search has no free tier: it is paid from the first request, with [Pro plans](/pricing) from €39/month for 46,000 requests.'
    },
    {
      question: 'Is this Google Suggest API an official Google product?',
      answer: 'No. Microlink Search is an independent product that queries public Google surfaces, autocomplete included. It is not affiliated with or endorsed by Google, and Google is a trademark of Google LLC.'
    }
  ],
  cta: {
    headlinePrefix: 'Ready to find',
    headlineAccent: 'what people search',
    body: 'Autocomplete suggestions, related searches and questions as JSON, per country. Get a Pro key and expand your first seed today.',
    href: '/search',
    label: 'Research keywords'
  },
  howTo: {
    name: 'How to get keyword suggestions from the Google Autocomplete API',
    steps: [
      {
        title: 'Expand a seed',
        description: "Call microlink.search with the seed, type: 'autocomplete' and a location code, and read the value of each result."
      },
      {
        title: 'Reach the long tail with a letter',
        description: 'Run the seed followed by each letter of the alphabet in parallel and merge the suggestions into a deduplicated set.'
      },
      {
        title: 'Pull questions and related searches',
        description: 'Run a default web search for the strongest idea and read peopleAlsoAsk for questions and relatedSearches for the next seeds.'
      }
    ]
  }
}
