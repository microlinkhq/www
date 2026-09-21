export const CONTENT = {
  slug: 'website-to-pdf/clean-layout',
  head: {
    title: 'Convert a web page to PDF without ads or banners',
    description:
      'Get a clean PDF from any URL: ads and consent scripts blocked before render, sticky headers removed with one CSS rule, print or screen styles on demand.'
  },
  hero: {
    title: 'Convert a web page to a clean PDF, without ads or cookie banners',
    intro:
      'Convert a web page to PDF without ads, consent dialogs or a sticky header stamped on every page break. Research exports, client reports, legal copies and reading lists all need the content, not the browser tab around it. The PDF API blocks the third-party noise before the page renders and lets you hide the rest with one CSS rule.',
    cta: { label: 'Start with the PDF API', href: '/pdf' }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'Browser-saved PDFs carry the ads, banners and sticky headers along',
    paragraphs: [
      'Web pages are built to be scrolled, not paginated. Print one as it is and the ad slots leave holes in the text, the cookie banner covers the first paragraph, the fixed navigation repeats at the top of every sheet, and a wide layout gets squeezed into an unreadable column.',
      'The usual fixes are manual or brittle. Reader mode and print dialogs work for one page at a time, not for a pipeline. HTML-to-PDF converters that skip the browser skip the site’s CSS too, so the result looks nothing like the article. A self-hosted headless Chrome prints faithfully, including every popup it was served.',
      'Microlink renders the page in a real browser with [adblock](/docs/api/parameters/adblock) enabled by default, so ad, tracker and cookie consent requests are blocked before they run. PDFs use the print media type, so the site’s print stylesheet applies, and [styles](/docs/api/parameters/styles) removes whatever is left. Switch [mediaType](/docs/api/parameters/mediaType) to screen when the print stylesheet strips too much.'
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
    title: 'How to convert a web page to PDF without ads',
    intro:
      'Start with the defaults, because they already block most of the noise. Add a CSS rule for site-specific chrome, then pick print or screen styles depending on what the site ships. The [PDF page preparation guide](/docs/guides/pdf/page-preparation) walks through each control.',
    steps: [
      {
        label: '1 · Print with the defaults',
        sdk: "const { url } = await microlink.pdf('https://example.com/article')",
        note: 'No options needed: adblock stops ads, trackers and third-party consent services, and the print media type applies the site’s own print stylesheet. url points to the hosted A4 document.'
      },
      {
        label: '2 · Hide sticky chrome and narrow the layout',
        sdk: `const { url } = await microlink.pdf('https://example.com/article', {
  styles: [
    'header, .navbar, .cookie-banner, .newsletter { display: none !important }',
    'main { max-width: 900px !important; margin: 0 auto !important }'
  ]
})`,
        note: 'Injected CSS removes the navigation that would repeat on each page and gives long text a readable measure. styles accepts inline rules or the absolute URL of a stylesheet.'
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
        note: 'mediaType=screen keeps the on-screen design when the print stylesheet removes images or changes fonts. Try the result first with the [website to PDF converter](/tools/website-to-pdf) before wiring the URL into your code.'
      }
    ],
    params: [
      {
        name: 'adblock',
        href: '/docs/api/parameters/adblock',
        note: 'Blocks third-party ad, tracker and cookie consent requests. On by default on every plan.'
      },
      {
        name: 'styles',
        href: '/docs/api/parameters/styles',
        note: 'Inline CSS or an absolute stylesheet URL injected before printing.'
      },
      {
        name: 'mediaType',
        href: '/docs/api/parameters/mediaType',
        note: 'print (the default for PDFs) or screen.'
      },
      {
        name: 'click',
        href: '/docs/api/parameters/click',
        note: 'Clicks one selector or several in order, to dismiss a first-party banner or expand a section before printing.'
      },
      {
        name: 'javascript',
        href: '/docs/api/parameters/javascript',
        note: 'Set to false for static pages to skip client-side widgets and reduce rendering work. Default true.'
      }
    ],
    outro:
      'Think in page state: block the noise, wait for the content, hide the chrome, then print. The same options drive [screenshots without cookie banners or ads](/use-cases/website-screenshot/block-cookie-banners-and-ads), so a clean capture recipe carries over. Reach for the function parameter only when CSS and clicks are not enough.'
  },
  why: {
    title: 'Why a real browser with adblock makes a cleaner PDF',
    intro:
      'Rendering the real page and subtracting the noise is more faithful than converting raw HTML, and blocking a request is more reliable than hiding its result. The [adblock feature](/features/adblock) runs inside the rendering browser on every plan.',
    cards: [
      {
        kicker: 'Blocked at the network',
        title: 'Ads and consent scripts never execute.',
        body: 'The adblock engine stops third-party ad, tracker and consent requests before the page renders. There is nothing to hide afterwards, the page loads faster, and the layout is the one the content was designed for.',
        note: 'Turn it off with adblock: false only when the PDF must show the page exactly as a first-time visitor sees it.'
      },
      {
        kicker: 'Print styles, then your styles',
        title: 'Two layers of CSS shape the document.',
        body: 'The site’s print stylesheet applies first because PDFs render with the print media type. Your injected styles apply on top, which is where sticky headers, sidebars, newsletter boxes and first-party popups disappear.',
        note: 'A narrower max-width on the main column is the single most effective rule for long articles: fewer awkward page breaks, easier reading. It is the base of the [article archiving recipe](/use-cases/website-to-pdf/archive-articles).'
      },
      {
        kicker: 'Screen when needed',
        title: 'mediaType: screen preserves the web design.',
        body: 'Some sites ship print stylesheets that strip images or change fonts. Switching to the screen media type prints the page as it looks in the browser, and the styles parameter still lets you trim it.',
        note: 'When not to: if you need the consent flow or the ads in the document, for an audit or a compliance record, disable adblock and skip the CSS. If you only need the text, [clean Markdown](/use-cases/website-to-markdown/clean-content) is lighter than a PDF.'
      }
    ]
  },
  faq: [
    {
      question: 'Why does my PDF still show a cookie banner?',
      answer:
        'The banner is probably first-party, built into the site’s own code rather than injected by a consent service, so it is not a third-party request adblock can stop. Hide it with styles, for example .cookie-banner { display: none !important }, or dismiss it with click before printing.'
    },
    {
      question: 'Should I use print or screen styles when converting a page to PDF?',
      answer:
        'Start with print, the default for PDFs: it applies the site’s print stylesheet and usually gives a document-oriented layout. Switch mediaType to screen when that stylesheet removes images or changes the design in ways you do not want. Injected styles work on top of either.'
    },
    {
      question: 'How do I remove the sticky header that repeats on every PDF page?',
      answer:
        'Fixed and sticky headers are the usual cause. Hide them with styles, for example header { display: none !important }. Narrowing the main column with a max-width in the same rule set also produces cleaner page breaks.'
    },
    {
      question: 'Do I need a paid plan to convert a web page to PDF without ads?',
      answer:
        'No. adblock, styles, mediaType and click are request options available on every plan, including the free endpoint with 25 requests per day and no API key. A Pro plan adds [custom headers, proxy, filename and configurable caching](/pricing) when you move to production.'
    },
    {
      question: 'Does disabling JavaScript produce a cleaner PDF?',
      answer:
        'For static or server-rendered pages, often yes. javascript: false stops client-side widgets, popups and late-loading embeds from running and reduces rendering work. Keep it enabled for pages that build their content in the browser, or the PDF will be empty.'
    }
  ],
  cta: {
    headlinePrefix: 'Ready for',
    headlineAccent: 'clean PDFs',
    body: 'Ads and banners gone by default, chrome removed with one rule. Start on the free tier and print your first clean document today.',
    href: '/pdf',
    label: 'Print a clean PDF'
  },
  howTo: {
    name: 'How to convert a web page to PDF without ads or banners',
    steps: [
      {
        title: 'Print the URL with the defaults',
        description:
          'Request the URL with pdf enabled. adblock is on by default and blocks ads, trackers and third-party consent services, and the print media type applies the site’s print stylesheet.'
      },
      {
        title: 'Hide what is left with CSS',
        description:
          'Pass a styles rule that sets display: none on sticky headers, first-party cookie banners and newsletter boxes, and narrow the main column with a max-width for better page breaks.'
      },
      {
        title: 'Choose print or screen styles',
        description:
          'Keep the default print media type for a document layout, or set mediaType to screen when the print stylesheet removes images or changes the design.'
      }
    ]
  }
}
