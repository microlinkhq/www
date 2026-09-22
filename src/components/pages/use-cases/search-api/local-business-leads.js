export const CONTENT = {
  slug: 'search-api/local-business-leads',
  head: {
    title: 'Google Maps scraper API for local business leads',
    description: 'Build local business lead lists from Google Maps: name, address, phone, website, hours, rating and Place ID as JSON, plus emails from each site.'
  },
  hero: {
    title: 'Build local business lead lists with a Google Maps scraper API',
    intro: 'A Google Maps scraper API turns a category and a city into a lead list: “dentists in lyon” returns the businesses Google Maps shows, with address, phone, website, rating, opening hours and a Google Place ID. Sales teams, agencies and local marketplaces all need that list fresh and structured. The [Search API](/search) returns it as JSON, and the same SDK finds the contact emails on each website.',
    cta: {
      label: 'Start with the Search API',
      href: '/search'
    }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'Local business data is locked in a map, one pin at a time',
    paragraphs: [
      'Everything a lead list needs is on Google Maps: the name, the address, the phone number, the website and how well the business is reviewed. It is also presented one pin and one side panel at a time, and copying a few hundred listings by hand is a week of work that goes stale as businesses open, move and close.',
      'Scraping the map yourself means driving a browser through an infinite scroll, parsing panels whose markup keeps changing, and routing the session through proxies so it is not blocked. Directories sell the same data in bulk, but you get a static export, not a query you can rerun for a new city tomorrow.',
      'type: maps returns each listing with title, address, coordinates, rating and ratingCount, types, price level, phone, website url, opening hours by day and the Google Place ID. Listings carry no email field, so the SDK [emails method](/docs/sdk/methods/emails) reads addresses from the business website in a second call.'
    ]
  },
  how: {
    title: 'How to pull local business data from Google Maps with an API',
    intro: 'Search a category in a city, keep the fields a sales team uses, then enrich the listings that have a website. The [maps guide](/docs/guides/search/maps) documents every field.',
    steps: [
      {
        label: '1 · Search a category in a city',
        sdk: "const page = await microlink.search('dentists in lyon', {\n  type: 'maps',\n  location: 'fr'\n})\n\nconst leads = page.results.map(place => ({\n  name: place.title,\n  address: place.address,\n  phone: place.phone?.number,\n  website: place.url,\n  rating: place.rating,\n  reviews: place.ratingCount,\n  hours: place.opening?.hours,\n  placeId: place.place?.id\n}))",
        note: 'phone, url, opening and place are optional, since not every listing has them. place.id is the Google Place ID, the key for downstream calls to other mapping services.'
      },
      {
        label: '2 · Go past the first page',
        sdk: "let page = await microlink.search('dentists in lyon', {\n  type: 'maps',\n  location: 'fr'\n})\nconst byCid = new Map()\n\nwhile (page && page.results.length > 0 && byCid.size < 60) {\n  for (const place of page.results) byCid.set(place.cid, place)\n  page = await page.next()\n}",
        note: 'Each next() call is one more request for the following page of listings. Keying on cid, which every listing carries, keeps each business once.'
      },
      {
        label: '3 · Find the emails on each website',
        sdk: 'const enriched = await Promise.all(\n  Array.from(byCid.values())\n    .filter(place => place.url && place.rating >= 4.5)\n    .map(async place => ({\n      name: place.title,\n      phone: place.phone?.number,\n      website: place.url,\n      emails: await microlink.emails(place.url)\n    }))\n)',
        note: 'emails() scans the site for mailto links and addresses in plain text and returns bare strings. It is one request per website, so filter down to the leads you will contact before enriching.'
      }
    ],
    params: [
      {
        name: 'type',
        href: '/docs/sdk/methods/search/maps',
        note: "'maps' adds opening hours, price level, types, description and Place ID to the places fields."
      },
      {
        name: "type: 'places'",
        href: '/docs/sdk/methods/search/places',
        note: 'The lighter type: name, address, coordinates, rating, ratingCount, category, phone and website.'
      },
      {
        name: 'location',
        href: '/docs/sdk/methods/search',
        note: 'Two-letter country code. Put the city in the query itself.'
      },
      {
        name: 'page',
        href: '/docs/sdk/methods/search',
        note: 'Jumps to a later page of listings; next() walks them one by one.'
      },
      {
        name: 'emails',
        href: '/docs/sdk/methods/emails',
        note: 'Addresses found on a website, from mailto links and plain text, as bare strings.'
      }
    ],
    outro: 'Addresses written as name [at] domain, drawn as images or assembled by JavaScript are not detected by emails(). The [entity and local lookup pattern](/docs/guides/search/patterns) shows when places is enough and when maps is worth it.'
  },
  why: {
    title: 'Why Google Maps listings beat a directory export for lead lists',
    intro: 'A directory export is a snapshot. A query is a list you can rebuild for any category, any city, any day.',
    cards: [
      {
        kicker: 'Query, not export',
        title: 'New city, new list, same code.',
        body: 'Change “dentists in lyon” to “physiotherapists in porto” and the same pipeline produces a new list. Coverage follows what Google Maps shows for the query, which is also where local customers look.',
        note: 'Generate category and city pairs and run them in parallel. [Keyword research with autocomplete](/use-cases/search-api/keyword-research) finds the category names people actually type.'
      },
      {
        kicker: 'Qualify before you call',
        title: 'Ratings, reviews and hours are already fields.',
        body: 'rating and ratingCount separate established businesses from new ones, opening.hours tells your team when someone will pick up, and price.level segments by market position. Qualifying is plain JavaScript over the JSON.',
        note: 'Only need names, addresses and coordinates for a map? The places type returns fewer fields, as the [places guide](/docs/guides/search/places) shows.'
      },
      {
        kicker: 'Contact data where it exists',
        title: 'Phone from the listing, email from the website.',
        body: 'Listings carry the phone number Google shows and the website URL. The website is where businesses publish their addresses, and the same client reads them with one call per site.',
        note: 'When not to: maps results include no email addresses, owner names or company registration data, and a public listing is not consent to be contacted. Check the outreach rules of each market you prospect. To read [custom fields from each business website](/use-cases/website-metadata/custom-fields), extract them from the site itself.'
      }
    ]
  },
  faq: [
    {
      question: 'Can a Google Maps scraper API return business emails?',
      answer: 'Not from the listing: maps results include phone, website, address, hours and ratings, but no email field. Pass each website URL to microlink.emails() to collect the addresses published on the site, one request per website.'
    },
    {
      question: 'What is the difference between the places and maps search types?',
      answer: 'places returns simpler listings: name, address, coordinates, rating, review count, category, phone and website. maps adds opening hours by day, price level, place types, a description, a thumbnail and the Google Place ID. Use maps for lead lists where hours and IDs matter.'
    },
    {
      question: 'How do I get more than one page of Google Maps business listings?',
      answer: 'Call page.next() to fetch the following page with the same query and options, or pass page: 3 to jump straight to it. Each page is one request, so stop as soon as you have enough listings.'
    },
    {
      question: 'How much does a local business data API cost with Microlink?',
      answer: 'Each search page is one request and each emails() call one more. Search has no free tier: it is paid from the first request, and [Pro plans](/pricing) start at €39/month for 46,000 requests with a 99.9% SLA.'
    },
    {
      question: 'Is this the official Google Maps Platform API?',
      answer: 'No. Microlink Search is an independent product that queries public Google surfaces and returns structured results. It is not affiliated with or endorsed by Google, and Google is a trademark of Google LLC.'
    }
  ],
  cta: {
    headlinePrefix: 'Ready to build',
    headlineAccent: 'your lead list',
    body: 'Businesses from Google Maps with phone, website, hours and Place ID, plus the emails on each site. Start with one city today.',
    href: '/search',
    label: 'Find local business leads'
  },
  howTo: {
    name: 'How to build a local business lead list from Google Maps',
    steps: [
      {
        title: 'Search a category in a city',
        description: "Call microlink.search with a category and a city as the query, type: 'maps' and the country code, and map each listing to name, address, phone, website, rating, reviews, hours and Place ID."
      },
      {
        title: 'Go past the first page',
        description: 'Call next() on each page until you have enough listings, keyed by cid so every business appears once.'
      },
      {
        title: 'Find the emails on each website',
        description: 'Filter the listings to the ones worth contacting, then call microlink.emails() with each website URL to collect the published addresses.'
      }
    ]
  }
}
