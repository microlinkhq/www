export const CONTENT = {
  slug: 'website-to-pdf/dynamic-content',
  head: {
    title: 'PDF of JavaScript-rendered pages and charts',
    description:
      'Print dashboards, charts and single-page apps to PDF after they finish rendering: wait for a selector or a lifecycle event, click to expand, then print.'
  },
  hero: {
    title: 'Print JavaScript-rendered pages and charts to PDF',
    intro:
      'Dashboards draw their charts after the data arrives, and single-page apps render nothing until their bundle runs. Print too early and the PDF is a spinner. The PDF API waits for the element you name, then prints.',
    cta: { label: 'Start with the PDF API', href: '/pdf' }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'The page is loaded before it is drawn',
    paragraphs: [
      'Browsers fire the load event when resources are fetched, not when the framework has rendered or the chart library has finished animating. A PDF printed at that moment captures skeletons, empty axes and placeholder text.',
      'With waitForSelector the print waits until a specific element exists and is visible. waitUntil picks a lifecycle event such as network idle, waitForTimeout adds a fixed delay as a last resort, and click opens the tab or section you need before printing.'
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
    title: 'Wait for the chart, then print',
    intro:
      'Navigate quickly, wait for the exact content, then print. Add interactions when the content sits behind a control.',
    steps: [
      {
        label: '1 · Wait for the chart to draw',
        sdk: "const { url } = await microlink.pdf('https://app.example.com/report', {\n  waitUntil: 'domcontentloaded',\n  waitForSelector: '.chart svg',\n  format: 'A4',\n  landscape: true\n})",
        note: 'The print fires once the SVG exists; landscape suits wide charts.'
      },
      {
        label: '2 · Expand sections before printing',
        sdk: "const { url } = await microlink.pdf('https://app.example.com/report', {\n  click: ['#expand-all'],\n  waitForSelector: '.section.expanded',\n  waitUntil: 'networkidle0'\n})",
        note: 'click runs before the wait, so collapsed accordions and tabs end up open in the document.'
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
        note: 'Works on the free endpoint within the 30-second timeout; Pro extends it to 60 seconds.'
      }
    ],
    params: [
      {
        name: 'waitForSelector',
        href: '/docs/api/parameters/waitForSelector',
        note: 'Wait until the selector matches a visible element.'
      },
      {
        name: 'waitUntil',
        href: '/docs/api/parameters/waitUntil',
        note: 'auto, load, domcontentloaded, networkidle0 or networkidle2; accepts an array.'
      },
      {
        name: 'waitForTimeout',
        href: '/docs/api/parameters/waitForTimeout',
        note: 'Fixed delay when no stable selector exists; capped by the request timeout.'
      },
      {
        name: 'click',
        href: '/docs/api/parameters/click',
        note: 'Open tabs, expand accordions or dismiss dialogs before printing.'
      },
      {
        name: 'scroll',
        href: '/docs/api/parameters/scroll',
        note: 'Bring lazy sections into view so they load.'
      },
      {
        name: 'javascript',
        href: '/docs/api/parameters/javascript',
        note: 'Keep it enabled for client-rendered pages; disable it only for static ones.'
      }
    ],
    outro:
      'CSS animations are disabled by default and prefers-reduced-motion is set, which chart libraries that honour it use to skip entrance animations.'
  },
  why: {
    title: 'Why waits belong in the print request',
    intro:
      'A PDF is a snapshot of one page state. Declaring that state makes the snapshot reproducible.',
    cards: [
      {
        kicker: 'Condition, not duration',
        title: 'The print happens when the element exists.',
        body: 'Waiting for a selector returns as soon as the chart is drawn and still handles the slow case. A fixed delay is either too short on a bad day or too slow on every other day.',
        note: 'Combine domcontentloaded with waitForSelector to skip fonts and analytics scripts that never affect the content.'
      },
      {
        kicker: 'Interactions included',
        title: 'click and scroll put the page in the right state.',
        body: 'Collapsed accordions, hidden tabs and lazy-loaded sections are UI state. Open them, scroll to them, then wait for what they reveal, all inside one request.',
        note: 'Order matters: interactions run first, waits after, print last.'
      },
      {
        kicker: 'Same recipe as screenshots',
        title: 'One page-state model across outputs.',
        body: 'The wait, click and scroll options behave the same for PDFs and screenshots, so a recipe that [captures a dashboard image](/use-cases/website-screenshot/dynamic-content) also prints it.',
        note: 'When not to: a report that exists only as data may be better rendered by a print-ready HTML page you control, then printed with the PDF API; do not fight a dashboard UI that was never meant for paper.'
      }
    ]
  },
  faq: [
    {
      question: 'Why is my PDF empty or showing a loading state?',
      answer:
        'The print fired before the app rendered. Add waitForSelector for an element that only exists once the data has loaded, or set waitUntil to networkidle0 when the page keeps fetching.'
    },
    {
      question: 'Can I print a specific tab or an expanded section?',
      answer:
        'Yes. Use click with the selector of the tab or the expand control, then waitForSelector for the content it reveals, and the PDF includes it.'
    },
    {
      question: 'How long can the PDF API wait for content?',
      answer:
        'Up to the request timeout: 30 seconds on the free endpoint and 60 seconds on Pro plans. A waitForTimeout larger than that is ignored.'
    },
    {
      question: 'Do charts print with their final values?',
      answer:
        'Chart libraries that honour prefers-reduced-motion skip entrance animations because the API sets it by default. For libraries that animate regardless, wait for a selector the library adds when drawing completes, or add a short waitForTimeout.'
    }
  ],
  cta: {
    headlinePrefix: 'Ready to print',
    headlineAccent: 'rendered dashboards',
    body: 'Wait for the chart, then print. Start on the free tier and turn your first single-page report into a PDF today.',
    href: '/pdf',
    label: 'Print dynamic content'
  }
}
