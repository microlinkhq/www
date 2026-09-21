export const CONTENT = {
  slug: 'website-to-pdf/invoices-and-receipts',
  head: {
    title: 'Generate invoice PDFs from an authenticated URL',
    description:
      'Print the HTML invoice your app already renders to PDF: forward the session as a header, hide the navigation with CSS, set A4 margins and name the file.'
  },
  hero: {
    title: 'Generate PDF invoices and receipts from your app’s own URLs',
    intro:
      'Generate an invoice PDF from the URL your app already serves, with the customer’s data, your styles and your locale. Billing pages, order receipts, monthly statements and signed quotes all start as HTML behind a login. Forward the session so the browser is logged in, strip the app chrome with CSS, and get a hosted PDF back.',
    cta: { label: 'Start with the PDF API', href: '/pdf' }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'A second invoice template for PDF is a second source of bugs',
    paragraphs: [
      'The invoice exists twice in most codebases: once as the HTML page the customer sees, and once as a PDF template written for a rendering library. The second copy needs its own layout code, its own fonts and its own tests, and it drifts the moment someone adds a tax line or a new currency to the first.',
      'The usual escape routes do not hold either. Asking customers to print from the browser gives you their margins, their headers and the sidebar on every page. Running your own headless Chrome works until the login flow changes, the instance leaks memory, or month-end sends every customer to the download button at once.',
      'The PDF API prints any URL with a real browser. Send the session cookie or token as an x-api-header-* request header and Microlink [forwards it to the target page](/docs/api/parameters/headers), so the invoice loads as that user. Hide the sidebar and the buttons with [injected CSS](/docs/api/parameters/styles), pick the paper with the PDF options, and name the file. The page stays the single source of truth.'
    ]
  },
  how: {
    title: 'How to generate an invoice PDF from an authenticated URL',
    intro:
      'Three options do the work: a forwarded header for authentication, a CSS rule for the chrome, and the PDF options for paper and filename. The [private pages guide for PDFs](/docs/guides/pdf/private-pages) covers the header patterns in depth.',
    steps: [
      {
        label: '1 · Print the authenticated invoice',
        sdk: `const { url } = await microlink.pdf('https://app.example.com/invoices/42', {
  headers: {
    'x-api-header-cookie': \`session=\${process.env.SESSION_COOKIE}\`
  },
  styles: ['nav, aside, .actions { display: none !important }'],
  filename: 'invoice-42.pdf'
})`,
        note: 'The SDK sends the cookie as a real HTTP header, never in the URL. Microlink strips the x-api-header- prefix and forwards it, the CSS hides the app chrome, and url points to the hosted PDF.'
      },
      {
        label: '2 · Set paper format and margins',
        sdk: `const { url, size_pretty: size } = await microlink.pdf(
  'https://app.example.com/invoices/42',
  {
    format: 'A4',
    margin: { top: '12mm', bottom: '16mm', left: '10mm', right: '10mm' },
    headers: {
      'x-api-header-cookie': \`session=\${process.env.SESSION_COOKIE}\`
    }
  }
)`,
        note: 'A4 is the default format; switch to Letter for US customers. The response also carries the file size, which is handy for email attachments. The [paper size and margins recipe](/use-cases/website-to-pdf/paper-size-and-margins) lists every layout option.'
      },
      {
        label: '3 · The same request with curl',
        code: "curl -G https://pro.microlink.io \\\n  -d url=https://app.example.com/invoices/42 \\\n  -d pdf=true \\\n  -d meta=false \\\n  -d filename=invoice-42.pdf \\\n  -H 'x-api-key: $MICROLINK_API_KEY' \\\n  -H 'x-api-header-cookie: session=abc123'",
        language: 'bash',
        note: 'Credentials stay in HTTP headers and the query string only carries public options. meta=false skips metadata extraction, the biggest speedup for PDF-only requests. Authenticated requests go to pro.microlink.io with your [API key](/docs/api/basics/authentication).'
      }
    ],
    params: [
      {
        name: 'pdf',
        href: '/docs/api/parameters/pdf',
        note: 'Turns on PDF generation; the response carries the hosted document URL, type and size.'
      },
      {
        name: 'headers',
        href: '/docs/api/parameters/headers',
        note: 'Forwards HTTP headers to the target page; send secrets as x-api-header-* request headers. Pro plans.'
      },
      {
        name: 'styles',
        href: '/docs/api/parameters/styles',
        note: 'Injects inline CSS or a stylesheet URL to hide navigation, sidebars and buttons before printing.'
      },
      {
        name: 'filename',
        href: '/docs/api/parameters/filename',
        note: 'Names the generated file for downloads and archives. Pro plans.'
      },
      {
        name: 'pdf.format',
        href: '/docs/api/parameters/pdf/format',
        note: 'A4 by default; Letter, Legal, Tabloid, Ledger and A0 to A6 are available.'
      },
      {
        name: 'pdf.margin',
        href: '/docs/api/parameters/pdf/margin',
        note: 'One value for all sides or an object per side, in px, in, cm or mm. Default 0.35cm.'
      }
    ],
    outro:
      'PDF generation renders with the print media type by default, so a print stylesheet in your app applies automatically. Set [mediaType](/docs/api/parameters/mediaType) to screen if you want the on-screen layout instead.'
  },
  why: {
    title: 'Why print the invoice page instead of templating a PDF',
    intro:
      'The invoice page is already tested, styled and localized. Reusing it removes a whole class of drift, and the [headers feature](/features/headers) keeps the login out of your automation code.',
    cards: [
      {
        kicker: 'One template',
        title: 'The web page and the PDF cannot disagree.',
        body: 'Every change to line items, taxes or branding ships to the PDF the moment it ships to the page. There is no second layout engine to keep in sync, no font packaging to maintain and no separate test suite for the document.',
        note: 'A print stylesheet in your app, applied automatically because PDFs render with the print media type, is usually all the customization you need.'
      },
      {
        kicker: 'Authenticated, not scripted',
        title: 'Forward the session instead of automating a login.',
        body: 'A cookie or token in an x-api-header-* request header makes the browser load the invoice as that user. There is no login form to replay, no multi-factor prompt to work around and no shared password to store.',
        note: 'Keep these calls on your backend. Every request runs in its own [isolated browser](/features/isolation), so one customer’s session never meets another’s.'
      },
      {
        kicker: 'Ready to download',
        title: 'Named files and direct URLs.',
        body: 'filename gives the document a readable name, and embed=pdf.url turns the API URL into a direct download when you want a link instead of JSON. The same request works for a single receipt or for a month-end run.',
        note: 'When not to: treat the hosted URL as delivery, not as your system of record. For invoices you must retain for years, download the file and store it yourself, and see [PDF download links](/use-cases/website-to-pdf/download-links-and-previews) for the delivery side.'
      }
    ]
  },
  faq: [
    {
      question: 'How do I generate a PDF of an invoice page that requires login?',
      answer:
        'Send the session cookie or bearer token as an x-api-header-cookie or x-api-header-authorization header on your request to pro.microlink.io. Microlink strips the prefix and forwards the header to the target, so the browser loads the page as that user. Forwarding headers requires a Pro plan; the [private pages patterns](/docs/guides/common/private-pages) explain when to use each header path.'
    },
    {
      question: 'How do I remove the app navigation from the invoice PDF?',
      answer:
        'Inject CSS with the styles parameter, for example nav, aside { display: none !important }. A print stylesheet in your app achieves the same without any parameter, since PDFs render with the print media type by default.'
    },
    {
      question: 'Can I name the invoice PDF file that customers download?',
      answer:
        'Yes. The filename parameter, available on Pro plans, names the generated asset, for example invoice-42.pdf. Combine it with embed=pdf.url when you want the API URL to return the PDF directly instead of JSON. Using filename without a Pro key fails with the EFILENAME error code.'
    },
    {
      question: 'How long does a generated invoice PDF stay available?',
      answer:
        'The response is cached for 24 hours by default, and from 1 minute up to 31 days with ttl on Pro plans, so repeat requests return the same hosted document without rendering again. Invoices usually carry legal retention periods, so download the file and keep it in your own storage rather than relying on the cache.'
    },
    {
      question: 'Is my invoice PDF rendered in a browser shared with other requests?',
      answer:
        'No. Every request runs in its own isolated browser instance, so cookies, storage and forwarded headers from one render are never visible to another. Keep the API call on your backend so the session value never reaches client-side code.'
    }
  ],
  cta: {
    headlinePrefix: 'Ready to generate',
    headlineAccent: 'invoice PDFs',
    body: 'Print the invoice page you already render, with the session forwarded and the chrome removed. Get a Pro key and ship downloadable invoices this week.',
    href: '/pdf',
    label: 'Generate your first invoice PDF'
  },
  howTo: {
    name: 'How to generate an invoice PDF from an authenticated URL',
    steps: [
      {
        title: 'Forward the session as a request header',
        description:
          'Call the PDF API with the invoice URL and send the session cookie or bearer token as an x-api-header-cookie or x-api-header-authorization header, so the browser loads the page as that user.'
      },
      {
        title: 'Hide the app chrome with CSS',
        description:
          'Pass a styles rule such as nav, aside, .actions { display: none !important } so the sidebar, navigation and buttons do not print.'
      },
      {
        title: 'Set the paper format and margins',
        description:
          'Choose A4 or Letter with pdf.format and set per-side margins with pdf.margin so the invoice prints cleanly on paper.'
      },
      {
        title: 'Name the file and deliver it',
        description:
          'Add filename to give the PDF a readable name, read the hosted URL from the response, and store the file in your own storage for long-term retention.'
      }
    ]
  }
}
