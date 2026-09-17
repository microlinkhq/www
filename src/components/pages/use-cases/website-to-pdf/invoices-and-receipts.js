export const CONTENT = {
  slug: 'website-to-pdf/invoices-and-receipts',
  head: {
    title: 'Generate PDF invoices from an authenticated URL',
    description:
      'Turn the invoice page your app already renders into a PDF: forward the session header, hide the navigation with CSS and name the file for download.'
  },
  hero: {
    title: 'Generate PDF invoices and receipts from your own app pages',
    intro:
      'Your application already renders the invoice as HTML, with the customer’s data and your styles. Instead of maintaining a second template for PDF, print that page: forward the session so the browser is logged in, strip the app chrome, and get a hosted PDF back.',
    cta: { label: 'Start with the PDF API', href: '/pdf' }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'A second invoice template is a second source of bugs',
    paragraphs: [
      'PDF libraries need their own layout code, their own fonts and their own tests, and they drift from the web version the moment someone changes a line item. Meanwhile the browser already renders the exact document your customer sees on screen.',
      'The PDF API prints any URL with a real browser. Forward the session cookie or token as a request header, hide the sidebar and buttons with injected CSS, pick the paper format and margins, and name the resulting file. The page stays the single source of truth.'
    ]
  },
  how: {
    title: 'Print the page you already have',
    intro:
      'Three options do the work: a forwarded header for authentication, a CSS rule for the chrome, and the PDF options for paper and filename.',
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
        note: 'The session travels as an HTTP header, the app chrome is hidden with CSS, and the download gets a readable name.'
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
        note: 'A4 or Letter, with per-side margins, keeps the invoice printable on paper.'
      },
      {
        label: '3 · The same request with curl',
        code: "curl -G https://pro.microlink.io \\\n  -d url=https://app.example.com/invoices/42 \\\n  -d pdf=true \\\n  -d meta=false \\\n  -d filename=invoice-42.pdf \\\n  -H 'x-api-key: $MICROLINK_API_KEY' \\\n  -H 'x-api-header-cookie: session=abc123'",
        language: 'bash',
        note: 'Credentials stay in HTTP headers; the query string only carries public options.'
      }
    ],
    params: [
      {
        name: 'pdf',
        href: '/docs/api/parameters/pdf',
        note: 'Turn on PDF generation; the response carries the hosted document URL and size.'
      },
      {
        name: 'headers',
        href: '/docs/api/parameters/headers',
        note: 'Forward headers to the target; use x-api-header-* request headers for secrets. Pro plans.'
      },
      {
        name: 'styles',
        href: '/docs/api/parameters/styles',
        note: 'Inject CSS to hide navigation, sidebars and buttons before printing.'
      },
      {
        name: 'filename',
        href: '/docs/api/parameters/filename',
        note: 'Name the generated file for downloads and archives. Pro plans.'
      },
      {
        name: 'pdf.format',
        href: '/docs/api/parameters/pdf/format',
        note: 'A4 by default; Letter, Legal and the A series are available.'
      },
      {
        name: 'pdf.margin',
        href: '/docs/api/parameters/pdf/margin',
        note: 'One value for all sides or an object per side.'
      }
    ],
    outro:
      'PDF generation renders with the print media type by default, so a print stylesheet in your app applies automatically. Switch mediaType to screen if you want the on-screen layout instead.'
  },
  why: {
    title: 'Why print the page instead of templating a PDF',
    intro:
      'The invoice page is already tested, styled and localized. Reusing it removes a whole class of drift.',
    cards: [
      {
        kicker: 'One template',
        title: 'The web page and the PDF cannot disagree.',
        body: 'Every change to line items, taxes or branding ships to the PDF the moment it ships to the page. There is no second layout engine to keep in sync and no font packaging to maintain.',
        note: 'A print stylesheet in your app, applied automatically because PDFs render with the print media type, is usually all the customization you need.'
      },
      {
        kicker: 'Authenticated, not scripted',
        title: 'Forward the session instead of automating a login.',
        body: 'A cookie or token in an x-api-header-* request header makes the browser load the invoice as that user. No login form replay, no multi-factor prompt, no shared password.',
        note: 'Keep these calls on your backend and hand the resulting URL to the customer, or stream the file through your own endpoint.'
      },
      {
        kicker: 'Ready to download',
        title: 'Named files and direct URLs.',
        body: 'filename gives the document a readable name, and embed=pdf.url turns the API URL into a direct download when you want a link instead of JSON.',
        note: 'When not to: the hosted PDF lives on the CDN for the cache lifetime, up to 31 days. For legally required retention, download the file and store it yourself.'
      }
    ]
  },
  faq: [
    {
      question: 'How do I generate a PDF of a page that requires login?',
      answer:
        'Send the session cookie or bearer token as an x-api-header-cookie or x-api-header-authorization header on your request to pro.microlink.io. Microlink forwards it to the target, so the browser loads the page as that user.'
    },
    {
      question: 'How do I remove the app navigation from the invoice PDF?',
      answer:
        'Inject CSS with the styles parameter, for example nav, aside { display: none !important }. A print stylesheet in your app achieves the same, since PDFs render with the print media type by default.'
    },
    {
      question: 'Can I name the downloaded invoice file?',
      answer:
        'Yes. The filename parameter, available on Pro plans, names the generated asset. Combine it with embed=pdf.url when you want the API URL to return the PDF directly.'
    },
    {
      question: 'How long is the generated invoice PDF available?',
      answer:
        'For the cache lifetime of the request: 24 hours by default, up to 31 days with ttl on Pro plans. Download and store the file yourself if you need it permanently.'
    },
    {
      question: 'Is the invoice rendered in a shared browser?',
      answer:
        'No. Every request runs in its own isolated browser instance, and the resulting PDF is served from Microlink’s CDN for the cache lifetime of that request.'
    }
  ],
  cta: {
    headlinePrefix: 'Ready to generate',
    headlineAccent: 'invoice PDFs',
    body: 'Print the invoice page you already render, with the session forwarded and the chrome removed. Get a Pro key and ship downloadable invoices this week.',
    href: '/pdf',
    label: 'Generate your first invoice PDF'
  }
}
