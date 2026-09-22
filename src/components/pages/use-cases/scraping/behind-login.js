export const CONTENT = {
  slug: 'scraping/behind-login',
  head: {
    title: 'Scrape pages behind a login with session cookies',
    description:
      'Scrape authenticated pages by forwarding a session cookie or bearer token as a request header. Secrets stay out of the URL. Pro plans.'
  },
  hero: {
    title: 'Scrape data from pages behind a login without scripting the sign-in',
    intro:
      'To scrape a website behind a login, the request has to arrive with a session the site already trusts. Account balances, order histories, analytics dashboards, supplier portals and internal tools all sit behind authentication. The [Scraping API](/features/scraping) forwards your cookie or token as a real request header, so the rules run on the page your user sees.',
    cta: { label: 'Start with the Scraping API', href: '/features/scraping' }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'An anonymous scraper only ever sees the login form',
    paragraphs: [
      'A fresh browser has no cookies. Request an authenticated URL and the site redirects to its sign-in page, which returns 200 like any other page, so your rules run against the login form and every field comes back null without an error.',
      'Scripting the login looks like the fix and is the fragile path. You store a real password next to the scraper, replay a form whose markup changes, and run into the multi-factor prompts and bot checks that exist precisely to stop automated sign-ins. Each run pays for the whole login flow before extracting anything.',
      'If your application already holds a valid session or API token, forward it. Any request header prefixed with x-api-header- reaches the target with the prefix stripped, so x-api-header-cookie arrives as cookie and x-api-header-authorization as authorization. The [private pages guide](/docs/guides/data-extraction/private-pages) shows the pattern for data extraction.'
    ]
  },
  how: {
    title: 'How to scrape authenticated pages with a forwarded session',
    intro:
      'Headers are a Pro feature, so authenticated requests go to pro.microlink.io with your API key. Keep them on your backend, never in client-side code.',
    steps: [
      {
        label: '1 · Forward a session cookie',
        sdk: `const { balance, orders } = await microlink.extract(
  'https://app.example.com/account',
  {
    balance: { selector: '[data-testid=balance]', attr: 'text', type: 'number' },
    orders: { selectorAll: '.order-row .order-id', attr: 'text' }
  },
  {
    headers: {
      'x-api-header-cookie': \`session=\${process.env.SESSION_COOKIE}\`
    },
    cacheKey: \`user-\${userId}\`,
    waitForSelector: '[data-testid=balance]'
  }
)`,
        note: 'The SDK sends headers as real HTTP request headers, never in the URL. Forwarded headers are not part of the cache key, so cacheKey keeps each user in a separate cache entry, and waitForSelector on an element that only exists when signed in doubles as a check that the session was accepted.'
      },
      {
        label: '2 · A bearer token for an authenticated API',
        sdk: `const { content } = await microlink.extract(
  'https://api.example.com/v1/invoices',
  { content: { attr: 'json' } },
  {
    prerender: false,
    headers: {
      'x-api-header-authorization': \`Bearer \${process.env.APP_TOKEN}\`
    },
    cacheKey: \`tenant-\${tenantId}\`
  }
)`,
        note: 'For endpoints that answer with JSON, attr json parses the whole body and returns it with its original shape. prerender: false skips the browser because there is nothing to render, and cacheKey scopes the cached response to the tenant that owns the token.'
      },
      {
        label: '3 · The same request with curl',
        code: "curl -G https://pro.microlink.io \\\n  -d url=https://app.example.com/account \\\n  -d 'data.balance.selector=[data-testid=balance]' \\\n  -d data.balance.attr=text \\\n  -d meta=false \\\n  -d cacheKey=user-42 \\\n  -H \"x-api-key: $MICROLINK_API_KEY\" \\\n  -H 'x-api-header-cookie: session=abc123'",
        language: 'bash',
        note: 'x-api-key authenticates you against pro.microlink.io and the x-api-header-cookie value is what the target receives. The rules travel as data query parameters and the secret only as a header.'
      }
    ],
    params: [
      {
        name: 'headers',
        href: '/docs/api/parameters/headers',
        note: 'Public request shaping such as a language. Secrets go in x-api-header-* request headers instead. Pro plans.'
      },
      {
        name: 'cacheKey',
        href: '/docs/api/parameters/cacheKey',
        note: 'Adds a custom identifier, such as a user id, so each user gets a separate cache entry. Pro plans.'
      },
      {
        name: 'waitForSelector',
        href: '/docs/api/parameters/waitForSelector',
        note: 'Waits for an element that only renders for a signed-in user.'
      },
      {
        name: 'data',
        href: '/docs/api/parameters/data',
        note: 'The extraction rules, identical to any public page.'
      },
      {
        name: 'force',
        href: '/docs/api/parameters/force',
        note: 'Skips the cache when a private page must be read fresh.'
      }
    ],
    outro:
      'Sending x-api-key to the free endpoint fails with EPRO, and the headers parameter without a Pro plan returns EHEADERS. The [SDK options reference](/docs/sdk/getting-started/options) explains how the headers option is routed.'
  },
  why: {
    title: 'Why forwarding a session beats automating the login',
    intro:
      'The session is the smallest credential that makes the page render for a user. Forwarding it keeps the password out of your scraper entirely.',
    cards: [
      {
        kicker: 'No password',
        title: 'Skip the form, the redirect and the second factor.',
        body: 'Your app already has a session from a real sign-in or an OAuth token from the user. Forward it and the browser lands on the authenticated page directly, with nothing to replay and nothing for MFA to block.',
        note: 'The same header pattern captures the page as an image in [screenshots behind a login](/use-cases/website-screenshot/behind-login) and as a document in [PDF invoices from authenticated pages](/use-cases/website-to-pdf/invoices-and-receipts).'
      },
      {
        kicker: 'Isolated',
        title: 'The session never outlives the request.',
        body: 'Every call runs in its own browser that is destroyed when the response is sent, so no cookies or storage are shared between calls and one user’s session can never leak into another request.',
        note: 'The [request isolation page](/features/isolation) describes the one-browser-per-call model, and the [custom headers feature](/features/headers) shows how values ride the HTTP layer.'
      },
      {
        kicker: 'Separate caches',
        title: 'One cache entry per user with cacheKey.',
        body: 'The cache key is derived from the URL and the query parameters, and forwarded headers are not query parameters. Two users requesting the same account URL can share a copy, so add a cacheKey with the user id to keep their data apart.',
        note: 'When not to: Microlink does not log in for you. If all you have is a username and password, sign in with your own backend first and forward the resulting session. Never forward a session that belongs to someone who has not authorized it.'
      }
    ]
  },
  faq: [
    {
      question: 'How do I scrape a website behind a login?',
      answer:
        'Sign in once with your own application, then send the session cookie as an x-api-header-cookie header on a request to pro.microlink.io. Microlink forwards it to the target as a regular cookie, and your extraction rules run on the authenticated page.'
    },
    {
      question: 'Can I scrape an API that needs a bearer token?',
      answer:
        'Yes. Send x-api-header-authorization with the value Bearer followed by the token, and use a rule with attr json to parse the response body. Add prerender: false so the endpoint is fetched without a browser.'
    },
    {
      question: 'Why does my authenticated scrape return null for every field?',
      answer:
        'The rules probably ran on the login page. Check that the cookie name and domain match what the site sets, that the session has not expired, and that the request goes to pro.microlink.io with a valid key. A waitForSelector on a signed-in-only element makes this failure explicit.'
    },
    {
      question: 'Is it safe to put the session cookie in the headers query parameter?',
      answer:
        'No. Query parameters are public and end up in logs, history and shared links. Use the headers parameter only for harmless values such as accept-language, and x-api-header-* request headers for cookies and tokens.'
    },
    {
      question: 'Can I scrape pages behind a login on the free plan?',
      answer:
        'No. Forwarding headers requires a Pro plan and the pro.microlink.io endpoint. The free tier is fine for building and testing your rules on public pages first, then you add the session header on Pro. See [pricing](/pricing).'
    }
  ],
  cta: {
    headlinePrefix: 'Ready to scrape',
    headlineAccent: 'authenticated pages',
    body: 'Forward the session, keep the password out of the scraper. Get a Pro key and extract data from the pages only your users can see.',
    href: '/features/scraping',
    label: 'Scrape behind a login'
  },
  howTo: {
    name: 'How to scrape a page behind a login with a session cookie',
    steps: [
      {
        title: 'Forward the session cookie',
        description:
          'Send the session as an x-api-header-cookie request header together with your extraction rules. The prefix is stripped and the target receives a regular cookie.'
      },
      {
        title: 'Use a bearer token for JSON APIs',
        description:
          'Send x-api-header-authorization with the token and a rule with attr json, with prerender false to skip the browser.'
      },
      {
        title: 'Call the Pro endpoint from your backend',
        description:
          'Point the request at pro.microlink.io with your x-api-key header, and add a cacheKey per user so cached responses stay separate.'
      }
    ]
  }
}
