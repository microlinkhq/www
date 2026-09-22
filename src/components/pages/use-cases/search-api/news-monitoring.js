export const CONTENT = {
  slug: 'search-api/news-monitoring',
  head: {
    title: 'Google News API for brand and media monitoring',
    description: 'Monitor brand mentions from Google News by country and time window. Get headline, publisher, ISO 8601 date and URL for every article as JSON.'
  },
  hero: {
    title: 'Monitor brand mentions with a Google News API',
    intro: 'A Google News API turns brand and media monitoring into a query: ask for the last hour of coverage of a name and get back the headline, publisher, ISO 8601 date and URL of each article. PR teams, investor relations, trust and safety and competitive intelligence all need that feed, usually for several countries at once. The [Search API](/search) returns it as structured JSON, so your code decides what counts as a mention.',
    cta: {
      label: 'Start with the Search API',
      href: '/search'
    }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'Brand mentions scattered across Google News, one country at a time',
    paragraphs: [
      'Coverage of a brand does not arrive in one place. A launch is picked up by trade press in the United States, a regulator’s statement lands in German outlets, and a complaint spreads through Japanese media, each ranked in its own regional edition of Google News. Checking by hand misses the stories that matter during the hours they matter.',
      'Scraping news results yourself means parsing markup that changes without notice, turning relative dates such as “3 hours ago” into timestamps, and routing traffic through proxies so the requests keep working. Alert emails and RSS readers skip outlets without feeds and give you no control over the region or the time window.',
      'type: news returns each article with title, url, description, publisher and an ISO 8601 date, plus a thumbnail when Google shows one. period narrows the window to the last hour, day or week, and location picks the regional edition with a two-letter country code. Run one query per market in parallel and merge the results into your own feed.'
    ]
  },
  how: {
    title: 'How to monitor brand mentions with the Google News API',
    intro: 'Monitoring is a loop you own: query each market, keep what is new, alert on it. Microlink returns the articles; the schedule, the storage and the alert channel stay in your stack. The [news guide](/docs/guides/search/news) documents every field.',
    steps: [
      {
        label: '1 · Query the last hour of coverage',
        sdk: "const page = await microlink.search('Acme Corp', {\n  type: 'news',\n  period: 'hour'\n})\n\nconst mentions = page.results.map(({ title, url, publisher, date }) => ({\n  title,\n  url,\n  publisher,\n  date\n}))",
        note: 'period: hour limits results to articles from the last hour, the tightest window available. Every result carries title, url, description, publisher and date, and image when Google shows a thumbnail.'
      },
      {
        label: '2 · Cover several markets in parallel',
        sdk: "const markets = ['us', 'gb', 'de', 'jp']\n\nconst feeds = await Promise.all(\n  markets.map(async location => {\n    const { results } = await microlink.search('Acme Corp', {\n      type: 'news',\n      location,\n      period: 'day'\n    })\n    return results.map(article => Object.assign(article, { location }))\n  })\n)",
        note: 'One request per market, run concurrently. Tagging each article with its location keeps the regional edition it came from, which is what a PR team filters by.'
      },
      {
        label: '3 · Keep only what you have not seen',
        code: 'const seen = new Set(await store.getSeenUrls())\n\nconst fresh = feeds\n  .flat()\n  .filter(({ url }) => !seen.has(url))\n  .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))\n\nawait store.addSeenUrls(fresh.map(({ url }) => url))\nawait notify(fresh)',
        language: 'js',
        note: 'Deduplicate on url, since one story can surface in several regions and in consecutive runs. The ISO 8601 date sorts with Date.parse, no relative-date parsing. store and notify stand for your database and your alert channel.'
      }
    ],
    params: [
      {
        name: 'type',
        href: '/docs/sdk/methods/search/news',
        note: "'news' returns title, url, description, date, publisher and an optional image."
      },
      {
        name: 'period',
        href: '/docs/sdk/methods/search',
        note: 'hour, day, week, month or year. Restricts results by recency.'
      },
      {
        name: 'location',
        href: '/docs/sdk/methods/search',
        note: 'Two-letter country code that geo-targets the results, such as de or jp.'
      },
      {
        name: 'page',
        href: '/docs/sdk/methods/search',
        note: 'Fetches a later results page, like next(), when a busy hour has more coverage than one page.'
      }
    ],
    outro: 'Microlink does not schedule queries or send alerts. Run the loop from the scheduler you already have, as often as your freshness target requires; every run costs one request per market. The [integration patterns](/docs/guides/search/patterns) include the multi-region monitoring recipe this page builds on.'
  },
  why: {
    title: 'Why a news search API beats alert emails for media monitoring',
    intro: 'Alerts decide for you what a mention is and when you hear about it. An API that returns the raw feed moves those decisions into code you control.',
    cards: [
      {
        kicker: 'Timestamps you can sort',
        title: 'Every article has an ISO 8601 date and a publisher.',
        body: 'No “2 hours ago” strings to parse and no outlet names to guess from the URL. date sorts and compares directly, publisher groups coverage by outlet, and image gives a dashboard card its thumbnail.',
        note: 'Need the article, not the snippet? Call [result.markdown() on the results worth reading](/docs/guides/search/content-expansion) to fetch the full article through Microlink as Markdown.'
      },
      {
        kicker: 'Regional editions',
        title: 'One query per country, all in parallel.',
        body: 'location takes a two-letter country code, so the same brand query covers each market separately and you know which edition surfaced each story. Adding a market means adding a code to an array.',
        note: 'Tracking products instead of press? The [Google Shopping price comparison recipe](/use-cases/search-api/price-comparison) uses the same location option on shopping listings.'
      },
      {
        kicker: 'Your loop, your rules',
        title: 'Frequency, deduplication and alerting stay in your code.',
        body: 'There is no dashboard to configure and no rule language to learn. Each run is one request per market, so the cost of monitoring is markets times runs, and you choose both numbers.',
        note: 'When not to: news returns what Google News ranks for the query and window, with a year as the widest period. It is not a historical press archive, a sentiment service or a social listening tool. For evergreen mentions on any site, query the [default web search surface](/docs/guides/search/search) instead.'
      }
    ]
  },
  faq: [
    {
      question: 'How do I monitor brand mentions with a Google News API?',
      answer: "Call microlink.search with the brand name, type: 'news' and a period such as hour or day. Run it on your own schedule, once per country you care about, and store the article URLs so the next run only surfaces new coverage."
    },
    {
      question: 'Can the media monitoring API send alerts or run on a schedule?',
      answer: 'No. The API answers queries; it does not store watchlists, run on a timer or push notifications. Trigger the queries from a cron job, a queue worker or a scheduled function, and send new articles to Slack, email or your own dashboard.'
    },
    {
      question: 'What is the shortest time window for Google News monitoring?',
      answer: 'period: hour, which restricts results to articles from the last hour. The other values are day, week, month and year. Dates come back as ISO 8601 timestamps, so you can also drop anything older than your previous run in code.'
    },
    {
      question: 'How much does news monitoring with the Search API cost?',
      answer: 'Every search call is one request, so four markets checked every hour is 96 requests a day, about 2,900 a month. Search has no free tier: it is paid from the first request, and [Pro plans](/pricing) start at €39/month for 46,000 requests with a 99.9% SLA.'
    },
    {
      question: 'Is this an official Google News API?',
      answer: 'No. Microlink Search is an independent product that queries public Google surfaces and returns structured results. It is not affiliated with or endorsed by Google, and Google is a trademark of Google LLC.'
    }
  ],
  cta: {
    headlinePrefix: 'Ready to monitor',
    headlineAccent: 'every mention',
    body: 'Brand coverage from Google News as JSON, one query per market. Get a Pro key and ship your first monitoring loop today.',
    href: '/search',
    label: 'Monitor news mentions'
  },
  howTo: {
    name: 'How to monitor brand mentions with a Google News API',
    steps: [
      {
        title: 'Query the last hour of coverage',
        description: "Call microlink.search with the brand name, type: 'news' and period: 'hour', and map each result to its title, url, publisher and date."
      },
      {
        title: 'Cover several markets in parallel',
        description: 'Run the same query once per two-letter country code with the location option inside Promise.all, and tag each article with the market it came from.'
      },
      {
        title: 'Keep only new articles',
        description: 'Deduplicate the merged feed on url against the URLs stored by previous runs, sort by the ISO 8601 date and send the new articles to your alert channel.'
      }
    ]
  }
}
