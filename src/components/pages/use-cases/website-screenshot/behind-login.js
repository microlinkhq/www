export const CONTENT = {
  slug: 'website-screenshot/behind-login',
  head: {
    title: 'Screenshot pages behind a login with an API',
    description:
      'Capture dashboards, invoices and account pages by forwarding a session cookie or bearer token as a request header. Credentials never touch the URL.'
  },
  hero: {
    title: 'Screenshot pages behind a login',
    intro:
      'Dashboards, invoices, admin panels and customer reports live behind authentication. To capture them you need the browser to carry a session, and you need that session to stay out of any URL. The Screenshot API forwards headers on the request itself.',
    cta: { label: 'Start with the Screenshot API', href: '/screenshot' }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'The screenshot browser is not logged in',
    paragraphs: [
      'A fresh headless browser has no cookies, so an authenticated URL redirects to the login page and the capture shows a sign-in form. Automating the login flow is slow, brittle and often blocked by multi-factor authentication.',
      'Microlink lets you forward any header to the target: send it as an x-api-header-* HTTP header on your request and it reaches the page as the original header. A session cookie or an authorization token is enough for the browser to load the page as that user.'
    ]
  },
  how: {
    title: 'Forward the session, keep it out of the URL',
    intro:
      'Two paths exist: the headers query parameter for public values such as a language, and x-api-header-* request headers for cookies and tokens. Use the second for anything secret.',
    steps: [
      {
        label: '1 · Forward a session cookie with the SDK',
        sdk: `const { url } = await microlink.screenshot('https://app.example.com/dashboard', {
  headers: {
    'x-api-header-cookie': \`session=\${process.env.SESSION_COOKIE}\`
  }
})`,
        note: 'The SDK sends headers as real HTTP request headers; Microlink strips the x-api-header- prefix and forwards cookie to the target.'
      },
      {
        label: '2 · Or a bearer token',
        sdk: `const { url } = await microlink.screenshot('https://app.example.com/reports/42', {
  headers: {
    'x-api-header-authorization': \`Bearer \${process.env.APP_TOKEN}\`
  },
  waitForSelector: '#report'
})`,
        note: 'Any header works the same way; wait for the authenticated content before capturing.'
      },
      {
        label: '3 · The same request with curl',
        code: "curl -G https://pro.microlink.io \\\n  -d url=https://app.example.com/dashboard \\\n  -d screenshot=true \\\n  -d meta=false \\\n  -H 'x-api-key: $MICROLINK_API_KEY' \\\n  -H 'x-api-header-cookie: session=abc123'",
        language: 'bash',
        note: 'Credentials travel as HTTP headers on the Microlink request, never in the query string.'
      }
    ],
    params: [
      {
        name: 'headers',
        href: '/docs/api/parameters/headers',
        note: 'Non-sensitive headers as a query parameter. Pro plans.'
      },
      {
        name: 'waitForSelector',
        href: '/docs/api/parameters/waitForSelector',
        note: 'Wait for an element that only exists once the user is authenticated.'
      },
      {
        name: 'screenshot.element',
        href: '/docs/api/parameters/screenshot/element',
        note: 'Capture just the widget or table you need from the dashboard.'
      },
      {
        name: 'proxy',
        href: '/docs/api/parameters/proxy',
        note: 'Add it when the authenticated site also sits behind antibot protection.'
      }
    ],
    outro:
      'Forwarding headers requires a Pro plan. Sending x-api-key to the free endpoint fails with EPRO, so point authenticated requests at pro.microlink.io.'
  },
  why: {
    title: 'Why forward headers instead of scripting the login',
    intro:
      'A session is the smallest thing that makes a page render for a user, and forwarding it keeps the sensitive part off the wire you do not control.',
    cards: [
      {
        kicker: 'No login automation',
        title: 'Skip the form, the redirect and the second factor.',
        body: 'Your application already holds a valid session or token. Forward it and the browser lands on the authenticated page directly, without replaying a login flow that changes and that MFA is designed to stop.',
        note: 'For [private dashboards under load](/use-cases/website-screenshot/traffic-spikes) the same request caches per user when you add a cacheKey.'
      },
      {
        kicker: 'Secrets stay in headers',
        title: 'x-api-header-* never touches the query string.',
        body: 'Query parameters end up in logs, browser history and shared links. HTTP headers on the Microlink request do not, which is why cookies and tokens go there and only harmless values go in the headers parameter.',
        note: 'Keep these requests on your backend. If a frontend must trigger them, route through your own proxy so the credentials never reach the browser.'
      },
      {
        kicker: 'Composable',
        title: 'Everything else still applies to the authenticated page.',
        body: 'Wait for the report to render, capture a single element, emulate a phone or hide the navigation with styles. The session is one more request option, not a different product.',
        note: 'When not to: if the page renders user data you are not authorized to store, or the session belongs to a third party, do not forward it; capture only what your own product owns.'
      }
    ]
  },
  faq: [
    {
      question: 'How do I pass a cookie to the page being captured?',
      answer:
        'Send it as the x-api-header-cookie header on your request to pro.microlink.io. Microlink strips the x-api-header- prefix and forwards it to the target as a regular cookie header.'
    },
    {
      question: 'Can I put the cookie in the headers query parameter instead?',
      answer:
        'You can, but query parameters are public and end up in logs and history. Use the headers parameter for values such as Accept-Language and x-api-header-* request headers for anything sensitive.'
    },
    {
      question: 'Is capturing private pages available on the free plan?',
      answer:
        'No. Forwarding headers, whether through the headers parameter or x-api-header-* request headers, requires a Pro plan and the pro.microlink.io endpoint.'
    },
    {
      question: 'The page still shows the login form. What is wrong?',
      answer: [
        'Check that the cookie name and domain match what the application sets, that the session has not expired, and that you are sending the request to pro.microlink.io with a valid x-api-key.',
        'If the site also uses antibot protection, add proxy: true; an EPROXYNEEDED error confirms it is needed.'
      ]
    }
  ],
  cta: {
    headlinePrefix: 'Ready to capture',
    headlineAccent: 'private pages',
    body: 'Forward the session, keep the secret off the URL. Get a Pro key and screenshot the dashboards only your users can see.',
    href: '/screenshot',
    label: 'Capture behind a login'
  }
}
