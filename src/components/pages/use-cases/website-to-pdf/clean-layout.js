export const CONTENT = {
  slug: 'website-to-pdf/clean-layout',
  head: {
    title: 'Convert a web page to a clean PDF without ads',
    description:
      'Print any URL to a PDF without ads, cookie banners or sticky navigation: adblock by default, CSS injection and the choice between print and screen styles.'
  },
  hero: {
    title: 'Convert a web page to a clean PDF, without the ads and banners',
    intro:
      'Saving a page as PDF from a browser drags everything along: consent dialogs, ad slots, a sticky header on every page break. The PDF API blocks the third-party noise before rendering and lets you hide the rest with one CSS rule.',
    cta: { label: 'Start with the PDF API', href: '/pdf' }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'A PDF should read like a document, not a browser tab',
    paragraphs: [
      'Web pages are built to be scrolled, not paginated. Ads and cookie banners overlap the content, navigation repeats at the top of each printed page, and wide layouts get squeezed into unreadable columns.',
      'Microlink renders the page in a real browser with adblock enabled by default, applies the site’s print stylesheet, and gives you styles to remove whatever is left. Switch to the screen media type when the print stylesheet strips too much.'
    ],
    live: {
      label: 'Open the generated PDF',
      request: {
        url: 'https://blog.alexmaccaw.com/advice-to-my-younger-self',
        params: { pdf: true, meta: false, embed: 'pdf.url' }
      }
    }
  },
  how: {
    title: 'Block, hide, then choose the stylesheet',
    intro:
      'Start with the defaults. Add a CSS rule for site-specific chrome, and pick print or screen styles depending on what the site ships.',
    steps: [
      {
        label: '1 · Print with the defaults',
        sdk: "const { url } = await microlink.pdf('https://example.com/article')",
        note: 'adblock removes ads, trackers and consent services; the print media type applies the site’s print stylesheet.'
      },
      {
        label: '2 · Hide sticky chrome and narrow the layout',
        sdk: "const { url } = await microlink.pdf('https://example.com/article', {\n  styles: [\n    'header, .navbar, .cookie-banner, .newsletter { display: none !important }',\n    'main { max-width: 900px !important; margin: 0 auto !important }'\n  ]\n})",
        note: 'Injected CSS removes repeated navigation and gives long text a readable measure.'
      },
      {
        label: '3 · The same request as a URL',
        request: {
          url: 'https://example.com/article',
          params: {
            pdf: true,
            meta: false,
            mediaType: 'screen',
            styles: 'header, .cookie-banner { display: none !important }'
          }
        },
        note: 'mediaType: screen keeps the on-screen design when the print stylesheet removes too much.'
      }
    ],
    params: [
      {
        name: 'adblock',
        href: '/docs/api/parameters/adblock',
        note: 'Blocks ad, tracker and cookie consent sub-requests. On by default.'
      },
      {
        name: 'styles',
        href: '/docs/api/parameters/styles',
        note: 'Inline CSS or a stylesheet URL injected before printing.'
      },
      {
        name: 'mediaType',
        href: '/docs/api/parameters/mediaType',
        note: 'print (the PDF default) or screen.'
      },
      {
        name: 'click',
        href: '/docs/api/parameters/click',
        note: 'Dismiss a first-party banner or expand a section before printing.'
      },
      {
        name: 'javascript',
        href: '/docs/api/parameters/javascript',
        note: 'false renders static pages faster and without client-side widgets.'
      }
    ],
    outro:
      'Think in page state: block the noise, wait for the content, hide the chrome, then print. The same options work for screenshots, so a clean capture recipe carries over.'
  },
  why: {
    title: 'Why the browser is the right PDF engine',
    intro:
      'HTML-to-PDF converters that skip the browser skip the CSS too. Rendering the real page and subtracting the noise is more faithful.',
    cards: [
      {
        kicker: 'Blocked at the network',
        title: 'Ads and consent scripts never execute.',
        body: 'The adblock engine stops third-party ad, tracker and consent requests before the page renders, so there is nothing to hide afterwards and the layout is the one the content was designed for.',
        note: 'Turn it off with adblock: false only when the PDF must show the page exactly as a first-time visitor sees it.'
      },
      {
        kicker: 'Print styles, then your styles',
        title: 'Two layers of CSS shape the document.',
        body: 'The site’s print stylesheet applies first because PDFs render with the print media type. Your injected styles apply on top, which is where sticky headers, sidebars and popups disappear.',
        note: 'A narrower max-width on the main column is the single most effective rule for long articles: fewer awkward page breaks, easier reading.'
      },
      {
        kicker: 'Screen when needed',
        title: 'mediaType: screen preserves the web design.',
        body: 'Some sites ship print stylesheets that strip images or change fonts. Switching to the screen media type prints the page as it looks in the browser, and the styles parameter still lets you trim it.',
        note: 'When not to: if you need the consent flow or the ads in the document, for an audit or a compliance record, disable adblock and skip the CSS.'
      }
    ]
  },
  faq: [
    {
      question: 'Why does my PDF still show a cookie banner?',
      answer:
        'The banner is probably first-party, built into the site’s own code rather than injected by a consent service. Hide it with styles, for example .cookie-banner { display: none !important }, or dismiss it with click before printing.'
    },
    {
      question: 'Should I use print or screen styles for a PDF?',
      answer:
        'Start with print, the default: it applies the site’s print stylesheet and usually gives a document-oriented layout. Switch mediaType to screen when that stylesheet removes images or changes the design in ways you do not want.'
    },
    {
      question: 'Can I remove the header that repeats on every page?',
      answer:
        'Yes. Sticky and fixed headers are the usual cause; hide them with styles, for example header { display: none !important }. Narrowing the main column with a max-width also produces cleaner page breaks.'
    },
    {
      question: 'Does a clean PDF cost more than a normal one?',
      answer:
        'No. adblock, styles and mediaType are request options available on every plan, including the free tier with 25 requests per day.'
    }
  ],
  cta: {
    headlinePrefix: 'Ready for',
    headlineAccent: 'clean PDFs',
    body: 'Ads and banners gone by default, chrome removed with one rule. Start on the free tier and print your first clean document today.',
    href: '/pdf',
    label: 'Print a clean PDF'
  }
}
