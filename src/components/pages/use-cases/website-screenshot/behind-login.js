export const CONTENT = {
  slug: 'website-screenshot/behind-login',
  head: {
    title: 'Screenshot pages behind a login with cookies or tokens',
    description:
      'Capture dashboards, invoices and account pages by forwarding a session cookie or bearer token as a request header. Credentials never touch the URL.'
  },
  hero: {
    title: 'Screenshot pages behind a login without scripting the sign-in',
    intro:
      'To screenshot pages behind a login, the browser has to carry a session, and that session has to stay out of any URL. Dashboards for client reports, invoices for billing emails, admin panels for audits and staging sites behind basic auth all live behind authentication. The [Screenshot API](/screenshot) forwards headers on the request itself, so the page loads as your logged-in user.',
    cta: { label: 'Start with the Screenshot API', href: '/screenshot' }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'A screenshot of an authenticated page shows the login form',
    paragraphs: [
      'A fresh headless browser has no cookies, so an authenticated URL redirects to the login page and the capture shows a sign-in form. The request succeeds, the image is delivered, and the report you emailed contains a password field instead of a chart.',
      'Automating the login flow is the obvious fix and the worst one. Filling the form on every capture is slow, breaks whenever the markup changes, and is exactly what multi-factor authentication and bot protection are designed to stop. It also means storing a real password next to your screenshot job.',
      'Microlink lets you forward any header to the target: send it as an x-api-header-* HTTP header on your request and it reaches the page as the original header. A session cookie or an authorization token is enough for the browser to load the page as that user, and the [headers reference](/docs/api/parameters/headers) explains why secrets belong there and not in the query string.'
    ]
  },
  how: {
    title:
      'How to screenshot a page behind a login',
    intro:
      'Two paths exist: the headers query parameter for public values such as a language, and x-api-header-* request headers for cookies and tokens. Use the second for anything secret. The [private pages guide](/docs/guides/screenshot/private-pages) covers both.',
    steps: [
      {
        label: '1 · Forward a session cookie with the SDK',
        sdk: `const { url } = await microlink.screenshot('https://app.example.com/dashboard', {
  headers: {
    'x-api-header-cookie': \`session=\${process.env.SESSION_COOKIE}\`
  }
})`,
        note: 'The SDK sends headers as real HTTP request headers. Microlink strips the x-api-header- prefix and forwards cookie to the target, so the dashboard renders as the session owner and you get back the hosted image URL.'
      },
      {
        label: '2 · Or a bearer token',
        sdk: `const { url } = await microlink.screenshot('https://app.example.com/reports/42', {
  headers: {
    'x-api-header-authorization': \`Bearer \${process.env.APP_TOKEN}\`
  },
  waitForSelector: '#report'
})`,
        note: 'Any header works the same way, Basic and Bearer authorization included. [waitForSelector](/docs/api/parameters/waitForSelector) holds the capture until the authenticated content exists, which also proves the session was accepted.'
      },
      {
        label: '3 · The same request with curl',
        code: "curl -G https://pro.microlink.io \\\n  -d url=https://app.example.com/dashboard \\\n  -d screenshot=true \\\n  -d meta=false \\\n  -H 'x-api-key: $MICROLINK_API_KEY' \\\n  -H 'x-api-header-cookie: session=abc123'",
        language: 'bash',
        note: 'Credentials travel as HTTP headers on the Microlink request, never in the query string. x-api-key authenticates you against pro.microlink.io, and the x-api-header-cookie value is what the target receives.'
      }
    ],
    params: [
      {
        name: 'headers',
        href: '/docs/api/parameters/headers',
        note: 'Non-sensitive headers as a public query parameter; secrets go in x-api-header-* request headers. Pro plans.'
      },
      {
        name: 'waitForSelector',
        href: '/docs/api/parameters/waitForSelector',
        note: 'Waits for an element that only exists once the user is authenticated.'
      },
      {
        name: 'screenshot.element',
        href: '/docs/api/parameters/screenshot/element',
        note: 'Crops the capture to the widget or table you need from the dashboard.'
      },
      {
        name: 'styles',
        href: '/docs/api/parameters/styles',
        note: 'Injects CSS to hide navigation, avatars or other app chrome before the capture.'
      },
      {
        name: 'cacheKey',
        href: '/docs/api/parameters/cacheKey',
        note: 'Appends a custom identifier, such as a user id, to the cache key. Pro plans.'
      },
      {
        name: 'proxy',
        href: '/docs/api/parameters/proxy',
        note: 'Add it when the authenticated site also sits behind antibot protection. Pro plans.'
      }
    ],
    outro:
      'Forwarding headers requires a Pro plan. Sending x-api-key to the free endpoint fails with EPRO, so point authenticated requests at pro.microlink.io, as the [authentication docs](/docs/api/basics/authentication) describe.'
  },
  why: {
    title: 'Why forwarding headers beats scripting the login for screenshots',
    intro:
      'A session is the smallest thing that makes a page render for a user, and forwarding it keeps the sensitive part off the wire you do not control.',
    cards: [
      {
        kicker: 'No login automation',
        title: 'Skip the form, the redirect and the second factor.',
        body: 'Your application already holds a valid session or token. Forward it and the browser lands on the authenticated page directly, without replaying a login flow that changes and that MFA is designed to stop.',
        note: 'The cache key is derived from the URL and the query parameters. When several users capture the same URL, add a [cacheKey](/docs/api/parameters/cacheKey) per user so their captures live in separate cache entries.'
      },
      {
        kicker: 'Secrets stay in headers',
        title: 'x-api-header-* never touches the query string.',
        body: 'Query parameters end up in logs, browser history and shared links. HTTP headers on the Microlink request do not, which is why cookies and tokens go there and only harmless values go in the headers parameter.',
        note: 'Keep these requests on your backend. The [custom headers feature](/features/headers) shows how the values ride the HTTP layer, and every capture runs in its own [isolated browser](/features/isolation) that is destroyed afterwards, so a forwarded session is never shared between requests.'
      },
      {
        kicker: 'Composable',
        title: 'Everything else still applies to the authenticated page.',
        body: 'Wait for the report to render, capture a single element, emulate a phone or hide the navigation with styles. The session is one more request option, not a different product.',
        note: 'When not to: if the page renders user data you are not authorized to store, or the session belongs to a third party, do not forward it. For documents rather than images, the same header pattern drives [PDF invoices from authenticated pages](/use-cases/website-to-pdf/invoices-and-receipts).'
      }
    ]
  },
  faq: [
    {
      question: 'How do I pass a cookie to the page being screenshotted?',
      answer:
        'Send it as the x-api-header-cookie header on your request to pro.microlink.io. Microlink strips the x-api-header- prefix and forwards it to the target as a regular cookie header, so the page loads with that session.'
    },
    {
      question:
        'Can I put the session cookie in the headers query parameter for a screenshot?',
      answer:
        'You can, but query parameters are public and end up in logs and history. Use the headers parameter for values such as Accept-Language, and x-api-header-* request headers for anything sensitive.'
    },
    {
      question: 'Can I screenshot a page behind a login on the free plan?',
      answer:
        'No. Forwarding headers, whether through the headers parameter or x-api-header-* request headers, requires a Pro plan and the pro.microlink.io endpoint. Using the headers parameter without one returns the EHEADERS error.'
    },
    {
      question: 'Why does my screenshot still show the login form?',
      answer: [
        'Check that the cookie name and domain match what the application sets, that the session has not expired, and that you are sending the request to pro.microlink.io with a valid x-api-key.',
        'If the site also uses antibot protection, add proxy: true; an EPROXYNEEDED error confirms it is needed. The [built-in proxy recipe](/use-cases/website-screenshot/built-in-proxy) covers that case.'
      ]
    },
    {
      question: 'Can I screenshot a page protected by HTTP basic auth?',
      answer:
        'Yes. Send the credentials as an x-api-header-authorization header with the value Basic followed by the base64-encoded user and password. Microlink forwards it as a regular Authorization header, so the browser gets past the basic auth prompt and captures the page.'
    }
  ],
  cta: {
    headlinePrefix: 'Ready to capture',
    headlineAccent: 'private pages',
    body: 'Forward the session, keep the secret off the URL. Get a Pro key and screenshot the dashboards only your users can see.',
    href: '/screenshot',
    label: 'Capture behind a login'
  },
  howTo: {
    name: 'How to screenshot a page behind a login',
    steps: [
      {
        title: 'Forward a session cookie',
        description:
          'Send the session as an x-api-header-cookie HTTP header on the Microlink request. The prefix is stripped and the cookie reaches the target page, which renders as that user.'
      },
      {
        title: 'Or forward a bearer token',
        description:
          'Send x-api-header-authorization with the token and add waitForSelector for an element that only exists once the user is authenticated.'
      },
      {
        title: 'Call the Pro endpoint',
        description:
          'Point the request at pro.microlink.io with your x-api-key header. Credentials stay in HTTP headers and never appear in the query string.'
      }
    ]
  }
}
