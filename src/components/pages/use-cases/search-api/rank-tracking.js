export const CONTENT = {
  slug: 'search-api/rank-tracking',
  head: {
    title: 'Keyword rank checker API for Google by country',
    description: 'Track Google rankings per keyword and country: ordered results as JSON, position computed from the index and page offset, history in your database.'
  },
  hero: {
    title: 'Track Google rankings by country with a keyword rank checker API',
    intro: 'A keyword rank checker API answers one question on a loop: where does my domain rank for this query, in this country, today? SEO teams, agencies reporting to clients and product teams watching a launch all need that number per keyword and per market. The [Search API](/search) returns the results in order, so the rank is where your domain appears in the list.',
    cta: {
      label: 'Start with the Search API',
      href: '/search'
    }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'Rank trackers report one number and hide how they measured it',
    paragraphs: [
      'Google results differ by country, so “position 4” means nothing without the market it was measured in. Checking by hand from one browser shows your own local results, and repeating it for hundreds of keywords across several countries every week is not a job for a person.',
      'Off-the-shelf rank trackers solve the volume with a dashboard and a price per tracked keyword, but the data stays inside their tool and their definition of position. Scraping Google yourself means proxies in every country, a parser for a results page that keeps changing, and blocked sessions as soon as volume grows.',
      'The Search API returns results in order, geo-targeted with a two-letter location code. There is no position field: the rank is the index of your domain in the results plus the number of results on earlier pages. Walk the pages with next() until you find the domain or reach the depth you care about, and store the number where your reports already live.'
    ]
  },
  how: {
    title: 'How to track SERP positions by country with the Search API',
    intro: 'Search the keyword in a country, walk the pages, and compute the position from the index. The [web search guide](/docs/guides/search/search) documents the result fields.',
    steps: [
      {
        label: '1 · Find the domain in the results',
        sdk: "const isDomain = (url, domain) => {\n  const { hostname } = new URL(url)\n  return hostname === domain || hostname.endsWith('.' + domain)\n}\n\nconst rankOf = async (keyword, domain, location, depth = 3) => {\n  let page = await microlink.search(keyword, { location })\n  let offset = 0\n\n  for (let n = 1; n <= depth && page; n++) {\n    const index = page.results.findIndex(({ url }) => isDomain(url, domain))\n    if (index !== -1) {\n      return { position: offset + index + 1, url: page.results[index].url }\n    }\n    offset += page.results.length\n    if (n < depth) page = await page.next()\n  }\n\n  return { position: null, url: null }\n}",
        note: 'Each page is one request, so a depth of 3 costs at most three. position is 1-based across pages, subdomains count as your domain, and null means not found within the depth.'
      },
      {
        label: '2 · Run the keyword set per country',
        sdk: "const keywords = ['headless browser api', 'website screenshot api']\nconst countries = ['us', 'gb', 'es']\nconst checkedAt = new Date().toISOString()\n\nconst rows = []\nfor (const location of countries) {\n  for (const keyword of keywords) {\n    const { position, url } = await rankOf(keyword, 'example.com', location)\n    rows.push({ keyword, location, position, url, checkedAt })\n  }\n}",
        note: 'One row per keyword and country with a timestamp, ready for the table your reports read. url records which of your pages ranked, which is how you spot two of your own URLs competing for one query.'
      },
      {
        label: '3 · Compare with the previous run',
        code: "const movements = rows.map(row => {\n  const before = previous.get(row.keyword + ':' + row.location)\n  const change = before && row.position ? before - row.position : null\n  return Object.assign({}, row, { change })\n})",
        language: 'js',
        note: 'A positive change means the page moved up. previous stands for the last run loaded from your database, keyed by keyword and country; the API does not keep rank history.'
      }
    ],
    params: [
      {
        name: 'location',
        href: '/docs/sdk/methods/search',
        note: 'Two-letter country code. The only geo option: there is no city, device or language parameter.'
      },
      {
        name: 'page',
        href: '/docs/sdk/methods/search',
        note: 'Jumps to a results page directly instead of walking with next().'
      },
      {
        name: 'limit',
        href: '/docs/sdk/methods/search',
        note: 'Maximum number of results per page. Count results, not pages, when you compute the offset.'
      },
      {
        name: 'type',
        href: '/docs/sdk/methods/search/search',
        note: "Omit it: the default 'search' returns title, url and description in order."
      }
    ],
    outro: 'Results carry title, url and description, with no ads, local pack or position fields, so the rank computed here counts the listed results only. When you need to see everything the page showed around the links, [capture the SERP as Markdown or HTML](/use-cases/search-api/serp-to-markdown) next to the positions.'
  },
  why: {
    title: 'Why compute rankings yourself instead of renting a rank tracker',
    intro: 'A position is a derived number. Deriving it yourself means you know exactly what it measures and you own every row.',
    cards: [
      {
        kicker: 'Your definition',
        title: 'Position is index plus offset, nothing hidden.',
        body: 'You decide whether a subdomain counts as your domain, how deep to look and what to record when you are not found. The same function works for competitors: pass their domain against the same results.',
        note: 'One results page answers for every domain on it, so store the full list and compute competitor positions with no extra requests. [Pagination in the search method](/docs/sdk/methods/search) covers next() and page.'
      },
      {
        kicker: 'Country by country',
        title: 'One location code per market.',
        body: 'Rankings in Spain and in the United States are different lists. location takes a two-letter country code, so running the same keyword per country gives a market-by-market view at one request per page per country.',
        note: 'Pair positions with [Google News brand monitoring](/use-cases/search-api/news-monitoring) to explain a jump in visibility with the coverage behind it.'
      },
      {
        kicker: 'Costs you can predict',
        title: 'Keywords × countries × pages, per run.',
        body: 'Each results page is one request. 100 keywords in 3 countries at a depth of one page, checked daily, is 300 requests a day, about 9,000 a month.',
        note: 'When not to: if you need city-level or mobile versus desktop rankings, or search volume next to each position, this API does not provide them. It geo-targets by country only and returns results, not keyword metrics. For new terms to track, start with [autocomplete keyword research](/use-cases/search-api/keyword-research).'
      }
    ]
  },
  faq: [
    {
      question: 'How does a keyword rank checker API calculate position?',
      answer: 'There is no position field in the response. Find the index of your domain in page.results and add the number of results on the pages before it, plus one. That is the 1-based rank among the returned results for that country.'
    },
    {
      question: 'Can I check Google rankings for a city or on mobile?',
      answer: 'No. location geo-targets results by two-letter country code, and there is no city, device or language option. Track what the API supports, country-level results, and keep the same settings across runs so positions stay comparable.'
    },
    {
      question: 'How many pages deep should SERP position tracking go?',
      answer: 'Most tracking stops at the first two or three pages. Each page is one request, fetched with page.next() or the page option, so depth multiplies cost. Stop as soon as your domain is found.'
    },
    {
      question: 'Does the rank tracking API store ranking history?',
      answer: 'No. Each call returns the current results; history is the rows you store. Run the job on your own scheduler, save keyword, country, position, url and timestamp, and compare runs in your database. Search has no free tier, and [Pro plans](/pricing) start at €39/month for 46,000 requests.'
    },
    {
      question: 'Is the Microlink rank checker affiliated with Google?',
      answer: 'No. Microlink Search is an independent product that queries public Google results. It is not affiliated with or endorsed by Google, and Google is a trademark of Google LLC.'
    }
  ],
  cta: {
    headlinePrefix: 'Ready to track',
    headlineAccent: 'rankings by country',
    body: 'Ordered results per country as JSON, and positions you compute yourself. Get a Pro key and record your first run today.',
    href: '/search',
    label: 'Track rankings by country'
  },
  howTo: {
    name: 'How to track Google rankings by country with an API',
    steps: [
      {
        title: 'Find the domain in the results',
        description: 'Search the keyword with a location code, look for your domain in page.results, and walk the following pages with next() up to a fixed depth. The position is the index plus the results on earlier pages, plus one.'
      },
      {
        title: 'Run the keyword set per country',
        description: 'Loop over keywords and country codes, and store one row per pair with the position, the ranking URL and a timestamp.'
      },
      {
        title: 'Compare with the previous run',
        description: 'Load the last run from your database, keyed by keyword and country, and subtract the new position from the old one to get the movement.'
      }
    ]
  }
}
