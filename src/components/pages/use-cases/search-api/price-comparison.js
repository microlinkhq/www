export const CONTENT = {
  slug: 'search-api/price-comparison',
  head: {
    title: 'Google Shopping API for price comparison',
    description: 'Compare competitor prices from Google Shopping: merchant, numeric price, currency symbol and rating for every listing, geo-targeted by country.'
  },
  hero: {
    title: 'Compare prices across merchants with a Google Shopping API',
    intro: 'A Google Shopping API gives price comparison its data without a scraper per retailer: one query returns the listings Google Shopping shows for a product, each with the merchant, a numeric price and the rating. Ecommerce teams watch competitors, marketplaces benchmark their sellers and deal sites look for the lowest offer. The [Search API](/search) returns those listings as parsed JSON, one country at a time.',
    cta: {
      label: 'Start with the Search API',
      href: '/search'
    }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'Competitor prices live on dozens of retailer sites with different markup',
    paragraphs: [
      'Knowing where you stand on price means checking the same product on every merchant that sells it. Each retailer renders prices its own way, loads some of them with JavaScript, formats them with local separators and currency signs, and changes its templates without warning. One scraper per site is a maintenance job that never ends.',
      'Scraping a shopping results page looks like a shortcut, but the page is built for people: prices are strings such as “$1,699.00”, merchants are text next to a logo and ratings are stars. Turning that into numbers you can compare is another parser, and it breaks just as often as the retailer ones.',
      'type: shopping returns every listing with title, url, publisher for the merchant, and price as a currency symbol plus an amount that is already a number. rating arrives as score, scale and review count when Google shows one. location geo-targets the listings by country, so you compare prices in the market you actually sell in.'
    ]
  },
  how: {
    title: 'How to track competitor prices with the Google Shopping API',
    intro: 'Query the product, turn the listings into rows, then compare them with your own price. The [shopping guide](/docs/guides/search/shopping) lists every field.',
    steps: [
      {
        label: '1 · Query the product in one market',
        sdk: "const { results } = await microlink.search('sony wh-1000xm5', {\n  type: 'shopping',\n  location: 'gb'\n})\n\nconst offers = results.map(({ title, publisher, price, rating, url }) => ({\n  title,\n  merchant: publisher,\n  amount: price.amount,\n  symbol: price.symbol,\n  rating: rating?.score,\n  url\n}))",
        note: 'price.amount is a number and price.symbol the currency sign, so the offers are ready to sort. rating is optional, which is why score is read with ?.'
      },
      {
        label: '2 · Find the floor and your gap to it',
        code: 'const sorted = offers.slice().sort((a, b) => a.amount - b.amount)\n\nconst lowest = sorted[0]\nconst median = sorted[Math.floor(sorted.length / 2)].amount\nconst gap = ourPrice - lowest.amount',
        language: 'js',
        note: 'No currency parsing: sort and aggregate amount directly. gap is how far the cheapest merchant sits below ourPrice, your own listing price.'
      },
      {
        label: '3 · Repeat per market',
        sdk: "const markets = ['us', 'gb', 'de']\n\nconst byMarket = await Promise.all(\n  markets.map(async location => {\n    const { results } = await microlink.search('sony wh-1000xm5', {\n      type: 'shopping',\n      location\n    })\n    return { location, results }\n  })\n)",
        note: 'Each market is one request. Keep amounts grouped by location: symbol is the sign shown on the listing, not an ISO currency code, so never average amounts across markets.'
      }
    ],
    params: [
      {
        name: 'type',
        href: '/docs/sdk/methods/search/shopping',
        note: "'shopping' returns title, url, publisher, price, and optional image, rating and id."
      },
      {
        name: 'location',
        href: '/docs/sdk/methods/search',
        note: 'Two-letter country code that geo-targets the listings, such as gb or de.'
      },
      {
        name: 'limit',
        href: '/docs/sdk/methods/search',
        note: 'Maximum number of listings per page.'
      },
      {
        name: 'page',
        href: '/docs/sdk/methods/search',
        note: 'Later pages for broad queries, one request each. next() does the same from a result.'
      }
    ],
    outro: 'Shopping results show what Google Shopping lists, not what every retailer prints on its own product page. When you need the price from one specific page, including shops Google does not list, extract it from that page with the [Microlink SDK](/integrations/sdk).'
  },
  why: {
    title: 'Why a shopping search API beats one scraper per retailer',
    intro: 'Price monitoring usually breaks at the parsing step. Starting from parsed listings removes the part that breaks most.',
    cards: [
      {
        kicker: 'Parsed, not scraped',
        title: 'amount is a number you can sort.',
        body: 'Every listing carries price.amount as a number and price.symbol as the currency sign, so filtering under a threshold or computing an average is one line of JavaScript. No regular expressions for thousands separators.',
        note: 'The [product intelligence pattern](/docs/guides/search/patterns) runs thresholds and averages on the same fields.'
      },
      {
        kicker: 'Every merchant at once',
        title: 'One query covers the retailers Google lists.',
        body: 'publisher names the merchant on each listing, so a single request shows who sells the product and at what price. A new competitor needs no new code: if Google Shopping lists them, they appear in the results.',
        note: 'Need pictures rather than prices? [Search Google Images with full-size URLs](/use-cases/search-api/image-search) and get the dimensions of every result.'
      },
      {
        kicker: 'Per country',
        title: 'location picks the market.',
        body: 'Pass a two-letter country code and the listings are geo-targeted to that market. Running the same product across several codes gives you a regional price map with one request per country.',
        note: 'When not to: Google Shopping does not list every retailer, and a listing is not a promise of stock or of the checkout total. For a price you match by contract, read it from the merchant’s own page. For [local store details such as hours and phone](/use-cases/search-api/local-business-leads), use the maps surface.'
      }
    ]
  },
  faq: [
    {
      question: 'How do I get Google Shopping prices through an API?',
      answer: "Call microlink.search with the product name and type: 'shopping'. Each result has title, url, publisher (the merchant), price with a numeric amount and a currency symbol, and an optional rating and image."
    },
    {
      question: 'Can I track competitor prices over time with the Shopping API?',
      answer: 'Yes, by running the same queries on your own schedule and storing each amount with a timestamp. The API returns the current listings; it does not keep price history or send alerts, so the time series lives in your database.'
    },
    {
      question: 'Does the Google Shopping price include the currency?',
      answer: 'price.symbol carries the currency sign shown on the listing, such as $ or €, and price.amount the number. Query one market at a time with location and compare amounts within a market, not across currencies.'
    },
    {
      question: 'How many requests does product price monitoring use?',
      answer: 'One per search call. Tracking 200 products in three countries once a day is 600 requests a day, about 18,000 a month, which fits a [Pro plan](/pricing) of 46,000 requests from €39/month. Search has no free tier: it is paid from the first request.'
    },
    {
      question: 'Is the price comparison API affiliated with Google?',
      answer: 'No. Microlink Search is an independent product that queries public Google surfaces, Google Shopping included. It is not affiliated with or endorsed by Google, and Google is a trademark of Google LLC.'
    }
  ],
  cta: {
    headlinePrefix: 'Ready to compare',
    headlineAccent: 'every merchant',
    body: 'Parsed prices from Google Shopping, per country, as JSON. Get a Pro key and run your first price comparison today.',
    href: '/search',
    label: 'Compare Shopping prices'
  },
  howTo: {
    name: 'How to track competitor prices with the Google Shopping API',
    steps: [
      {
        title: 'Query the product in one market',
        description: "Call microlink.search with the product name, type: 'shopping' and a location code, and map each listing to its title, merchant, amount, symbol, rating and url."
      },
      {
        title: 'Find the lowest price and your gap to it',
        description: 'Sort the offers by the numeric amount, take the lowest and the median, and subtract the lowest amount from your own price.'
      },
      {
        title: 'Repeat per market',
        description: 'Run the same query once per country code and keep the amounts grouped by market, since the symbol is a currency sign rather than a code.'
      }
    ]
  }
}
