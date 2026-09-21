export const CONTENT = {
  slug: 'website-to-pdf/dynamic-content',
  head: {
    title: 'Print JavaScript-rendered pages and charts to PDF',
    description:
      'Convert dashboards, charts and single-page apps to PDF after they finish rendering: wait for a selector or a lifecycle event, click to expand, then print.'
  },
  hero: {
    title: 'Convert JavaScript-rendered pages, dashboards and charts to PDF',
    intro:
      'Convert a JavaScript-rendered page to PDF only once it has finished drawing. Dashboards plot their charts after the data arrives, and single-page apps render nothing until their bundle runs, so a print fired too early is a PDF of a spinner. Analytics exports, weekly KPI reports and printable views of React, Vue or Angular apps all need the same thing: the PDF API waits for the element you name, then prints.',
    cta: { label: 'Start with the PDF API', href: '/pdf' }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'The PDF prints before the JavaScript-rendered page has drawn',
    paragraphs: [
      'Browsers fire the load event when resources are fetched, not when the framework has rendered or the chart library has finished drawing. A PDF printed at that moment captures skeletons, empty axes and placeholder text.',
      'The reflex fix is a fixed delay, and it fails both ways: three seconds is too short on a slow day and wasted on every fast one. Fetch-based converters never run the JavaScript at all, so for a client-rendered app they print an empty shell. Scripting your own headless browser works, but then you own the waits, the timeouts and the crashes.',
      'With [waitForSelector](/docs/api/parameters/waitForSelector) the print waits until a specific element appears in the DOM. [waitUntil](/docs/api/parameters/waitUntil) picks a lifecycle event such as network idle, waitForTimeout adds a fixed delay as a last resort, and [click](/docs/api/parameters/click) opens the tab or section you need before printing.'
    ],
    live: {
      label: 'Open a PDF printed after the content rendered',
      request: {
        url: 'https://dev.to',
        params: {
          pdf: true,
          meta: false,
          embed: 'pdf.url',
          waitUntil: 'domcontentloaded',
          waitForSelector: 'article'
        }
      }
    }
  },
  how: {
    title: 'How to print a JavaScript-rendered page to PDF once it is ready',
    intro:
      'Navigate quickly, wait for the exact content, then print. Add interactions when the content sits behind a control. The [PDF page preparation guide](/docs/guides/pdf/page-preparation) shows each wait strategy with a live example.',
    steps: [
      {
        label: '1 · Wait for the chart to draw',
        sdk: `const { url } = await microlink.pdf('https://app.example.com/report', {
  waitUntil: 'domcontentloaded',
  waitForSelector: '.chart svg',
  format: 'A4',
  landscape: true
})`,
        note: 'domcontentloaded moves on as soon as the DOM is parsed, and the print fires once the chart’s SVG exists. Landscape suits wide charts; url points to the hosted PDF.'
      },
      {
        label: '2 · Expand sections before printing',
        sdk: `const { url } = await microlink.pdf('https://app.example.com/report', {
  click: ['#expand-all'],
  waitForSelector: '.section.expanded',
  waitUntil: 'networkidle0'
})`,
        note: 'click opens collapsed accordions and tabs, and waitForSelector holds the print until the content they reveal is in the DOM. Selectors passed as an array are clicked in order.'
      },
      {
        label: '3 · The same request as a URL',
        request: {
          url: 'https://app.example.com/report',
          params: {
            pdf: true,
            meta: false,
            waitForSelector: '.chart svg',
            waitUntil: 'domcontentloaded'
          }
        },
        note: 'Works on the free endpoint within the 30-second timeout; Pro extends it to 60 seconds. If the report sits behind a login, forward the session as described in [PDF invoices from authenticated pages](/use-cases/website-to-pdf/invoices-and-receipts).'
      }
    ],
    params: [
      {
        name: 'waitForSelector',
        href: '/docs/api/parameters/waitForSelector',
        note: 'Waits until the CSS selector appears in the page before printing.'
      },
      {
        name: 'waitUntil',
        href: '/docs/api/parameters/waitUntil',
        note: 'auto (default), load, domcontentloaded, networkidle0 or networkidle2; accepts an array.'
      },
      {
        name: 'waitForTimeout',
        href: '/docs/api/parameters/waitForTimeout',
        note: 'Fixed delay for when no stable selector exists; capped by the request timeout.'
      },
      {
        name: 'click',
        href: '/docs/api/parameters/click',
        note: 'Opens tabs, expands accordions or dismisses dialogs before printing.'
      },
      {
        name: 'scroll',
        href: '/docs/api/parameters/scroll',
        note: 'Scrolls to a selector to bring lazy sections into view so they load.'
      },
      {
        name: 'javascript',
        href: '/docs/api/parameters/javascript',
        note: 'Enabled by default; keep it on for client-rendered pages and disable it only for static ones.'
      }
    ],
    outro:
      'CSS [animations](/docs/api/parameters/animations) are disabled by default and prefers-reduced-motion is set accordingly, which chart libraries that honor it use to skip entrance animations. When a page still misbehaves, the [PDF troubleshooting guide](/docs/guides/pdf/troubleshooting) maps each symptom to a fix.'
  },
  why: {
    title: 'Why the wait belongs in the PDF request',
    intro:
      'A PDF is a snapshot of one page state. Declaring that state in the request makes the snapshot reproducible, whoever runs it and whenever.',
    cards: [
      {
        kicker: 'Condition, not duration',
        title: 'The print happens when the element exists.',
        body: 'Waiting for a selector returns as soon as the chart is drawn and still handles the slow case. A fixed delay is either too short on a bad day or too slow on every other day.',
        note: 'Combine domcontentloaded with waitForSelector so the request does not sit waiting for fonts and analytics scripts that never affect the content.'
      },
      {
        kicker: 'Interactions included',
        title: 'click and scroll put the page in the right state.',
        body: 'Collapsed accordions, hidden tabs and lazy-loaded sections are UI state. Open them, scroll to them, then wait for what they reveal, all inside one request and without a script of your own.',
        note: 'For flows that need more than clicks, such as typing into a filter, the [browser automation feature](/features/automation) and the function parameter give you the full page object.'
      },
      {
        kicker: 'Same recipe as screenshots',
        title: 'One page-state model across outputs.',
        body: 'The wait, click and scroll options behave the same for PDFs and screenshots, so the recipe that captures a dashboard as an image also prints it as a document.',
        note: 'When not to: if you only need the chart as an image, [screenshots of JavaScript-rendered pages](/use-cases/website-screenshot/dynamic-content) are lighter. A report that exists only as data is often better served by a print-ready HTML page you control, printed with the PDF API, than by a dashboard UI that was never meant for paper.'
      }
    ]
  },
  faq: [
    {
      question: 'Why is my PDF empty or showing a loading spinner?',
      answer:
        'The print fired before the app rendered. Add waitForSelector for an element that only exists once the data has loaded, or set waitUntil to networkidle0 when the page keeps fetching. A reliable pattern is waitUntil: domcontentloaded plus a selector wait.'
    },
    {
      question: 'Can I print a specific tab or an expanded section to PDF?',
      answer:
        'Yes. Use click with the selector of the tab or the expand control, then waitForSelector for the content it reveals, and the PDF includes it. Pass an array to click several controls in order.'
    },
    {
      question: 'How long can the PDF API wait for content to render?',
      answer:
        'Up to the request timeout: 30 seconds on the free endpoint and 60 seconds on Pro plans. A waitForTimeout larger than that is ignored. Keep your waits well inside that budget, because the print itself also needs time.'
    },
    {
      question: 'Do charts print to PDF with their final values?',
      answer:
        'Chart libraries that honor prefers-reduced-motion skip entrance animations because the API disables animations by default. For libraries that animate regardless, wait for a selector the library adds when drawing completes, or add a short waitForTimeout.'
    },
    {
      question: 'Does the PDF API run JavaScript before printing a single-page app?',
      answer:
        'Yes. Every PDF is rendered in a headless browser with JavaScript enabled by default, so React, Vue, Angular and other client-rendered apps build their DOM before the print. You only need to tell the API what to wait for. Wide dashboards usually also want the [landscape and scale options](/use-cases/website-to-pdf/paper-size-and-margins).'
    }
  ],
  cta: {
    headlinePrefix: 'Ready to print',
    headlineAccent: 'rendered dashboards',
    body: 'Wait for the chart, then print. Start on the free tier and turn your first single-page report into a PDF today.',
    href: '/pdf',
    label: 'Print dynamic content'
  },
  howTo: {
    name: 'How to print a JavaScript-rendered page to PDF',
    steps: [
      {
        title: 'Navigate fast and wait for the content',
        description:
          'Request the URL with pdf enabled, set waitUntil to domcontentloaded and set waitForSelector to an element that only exists once the chart or the data has rendered.'
      },
      {
        title: 'Open the sections you need',
        description:
          'Use click to open tabs or expand accordions and scroll to load lazy sections, then wait for the selector of the content they reveal.'
      },
      {
        title: 'Print with the right layout',
        description:
          'Add pdf.format and pdf.landscape for wide dashboards, and fall back to a short waitForTimeout only when no stable selector exists.'
      }
    ]
  }
}
