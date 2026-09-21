export const CONTENT = {
  slug: 'website-screenshot/block-cookie-banners-and-ads',
  head: {
    title: 'Screenshot a website without cookie banners or ads',
    description:
      'Get clean captures of any URL: consent scripts, trackers and ad networks are blocked before the page renders, and click or CSS removes first-party popups.'
  },
  hero: {
    title: 'Take a website screenshot without cookie banners, popups or ads',
    intro:
      'A screenshot without a cookie banner is what every thumbnail, archive and monitoring job wants, and what a headless browser rarely delivers. Consent dialogs, newsletter popups and ad slots cover the content a human would reach in one click. The Screenshot API blocks the third-party noise by default with its built-in [adblock](/features/adblock) and gives you two options for anything the site ships itself.',
    cta: { label: 'Start with the Screenshot API', href: '/screenshot' }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'Cookie banners and ads cover the page you wanted to capture',
    paragraphs: [
      'An automated browser is always a first-time visitor: no stored consent, no dismissed popup, no ad preferences. Every capture gets the full consent wall, and the article, the product or the dashboard you wanted sits dimmed behind it.',
      'The usual fixes are fragile. A fixed delay does not remove anything. A script that hunts for an “Accept” button breaks when the label, the language or the vendor changes. And because ads and consent scripts load late and shift the layout, two captures of the same URL taken an hour apart rarely match.',
      'The [adblock](/docs/api/parameters/adblock) parameter, enabled by default, stops third-party requests for advertisements, trackers and cookie consent services at the network level, before the page renders. A banner built into the site’s own code is not a third-party request, so it needs a [click](/docs/api/parameters/click) on its button or a rule injected with [styles](/docs/api/parameters/styles). Both are one parameter away.'
    ],
    figure: {
      request: {
        url: 'https://www.spiegel.de',
        params: {
          screenshot: true,
          meta: false,
          embed: 'screenshot.url',
          viewport: { width: 1200, height: 750, deviceScaleFactor: 1 }
        }
      },
      alt: 'A news homepage captured without its consent dialog',
      width: 1200,
      height: 750,
      caption:
        'Generated live by the API call below with adblock at its default, so the consent service never loads.'
    }
  },
  how: {
    title: 'How to remove cookie consent popups and ads from a screenshot',
    intro:
      'Work in layers: keep adblock on, click the consent button when the banner is first-party, and hide the wrapper with injected CSS when clicking is unreliable. The [page interaction guide](/docs/guides/screenshot/page-interaction) walks through each layer with live examples.',
    steps: [
      {
        label: '1 · Capture with adblock (the default)',
        sdk: "const { url } = await microlink.screenshot('https://example.com', {\n  adblock: true\n})",
        note: 'adblock is true by default, so you can leave it out. Ads, trackers and third-party consent services are blocked before rendering, and the response carries the hosted image URL.'
      },
      {
        label: '2 · Dismiss a first-party banner',
        sdk: "const { url } = await microlink.screenshot('https://example.com', {\n  click: ['#cookie-accept', '.newsletter-close'],\n  waitForSelector: 'main'\n})",
        note: 'Selectors are clicked in array order, so you can close one layer before the next. [waitForSelector](/docs/api/parameters/waitForSelector) then holds the capture until the content you care about is visible.'
      },
      {
        label: '3 · Or hide it with CSS',
        request: {
          url: 'https://example.com',
          params: {
            screenshot: true,
            meta: false,
            styles: '.cookie-banner, .ad-slot { display: none !important }'
          }
        },
        note: 'Injected CSS takes the elements out of the layout without depending on a clickable button. styles accepts inline rules or the absolute URL of a stylesheet.'
      }
    ],
    params: [
      {
        name: 'adblock',
        href: '/docs/api/parameters/adblock',
        note: 'Blocks third-party ad, tracker and cookie consent requests. On by default; set it to false to capture the page as a first-time visitor sees it.'
      },
      {
        name: 'click',
        href: '/docs/api/parameters/click',
        note: 'One CSS selector or an ordered array of selectors to click before the capture.'
      },
      {
        name: 'styles',
        href: '/docs/api/parameters/styles',
        note: 'Inline CSS or an absolute stylesheet URL injected into the page before the capture.'
      },
      {
        name: 'modules',
        href: '/docs/api/parameters/modules',
        note: 'Injects JavaScript as an ES module when a banner needs more than CSS to go away.'
      }
    ],
    outro:
      'Reach for styles before scripts: CSS cannot break the page, and it keeps working when the button label changes. When nothing else is enough, the [function](/docs/api/parameters/function) parameter gives you full control of the browser page.'
  },
  why: {
    title: 'Why blocking the request beats hiding the banner',
    intro:
      'Hiding a popup after it loads is a race. Blocking the request that creates it is faster and repeatable, which is what an ad-free screenshot API needs at volume.',
    cards: [
      {
        kicker: 'Network level',
        title: 'Blocked requests never render, so nothing shifts.',
        body: 'The adblock engine stops ad, tracker and consent service requests before the browser executes them. Those requests are not essential to the page, so skipping them also cuts response time. The layout you capture is the one the content was designed for.',
        note: 'The engine is the open-source Cliqz adblocker running inside the capture browser, so the filtering happens before a single ad or consent script executes.'
      },
      {
        kicker: 'Repeatable captures',
        title: 'The same URL produces the same screenshot.',
        body: 'Without third-party slots and popups, two captures taken hours apart differ only when the content itself changed. That is the baseline visual monitoring, archives and thumbnails depend on.',
        note: 'The same default keeps documents readable in the [clean PDF recipe](/use-cases/website-to-pdf/clean-layout), since adblock applies to every request that renders a page.'
      },
      {
        kicker: 'First-party escape hatch',
        title: 'click and styles handle banners the site ships itself.',
        body: 'Some publishers build the consent dialog into their own bundle. Click its accept button, or hide the wrapper with one CSS rule, then wait for the main content before capturing. No custom browser script is required.',
        note: 'When not to: if you need the consent flow itself in the picture, for compliance evidence or a UX review, set adblock to false and capture the page as a first-time visitor sees it.'
      }
    ]
  },
  faq: [
    {
      question: 'How do I take a screenshot without the cookie banner?',
      answer:
        'Most of the time you do nothing: adblock is on by default and blocks third-party consent services before the page renders. If a banner still shows, it is first-party, so add click with the selector of its accept button or hide it with a styles rule.'
    },
    {
      question: 'Do I need to enable adblock to get ad-free screenshots?',
      answer:
        'No. It is enabled by default, including on the free endpoint. Pass adblock: false only when you want ads, trackers and consent flows to stay visible in the capture.'
    },
    {
      question: 'Which cookie consent popups does the screenshot adblock remove?',
      answer:
        'Popups injected by third-party consent management services are blocked at the network level, along with ad networks and trackers. A dialog built into the site’s own code is not a third-party request, so dismiss it with click or hide it with styles.'
    },
    {
      question:
        'How do I hide a banner in a screenshot when its button has no stable selector?',
      answer: [
        'Use styles to hide the banner wrapper instead of clicking. CSS injection does not depend on a button existing, and display: none takes the element out of the layout.',
        'For anything more involved, modules and scripts inject JavaScript, and the [function parameter](/docs/api/parameters/function) gives you full browser control.'
      ]
    },
    {
      question: 'Does blocking ads change the layout of the screenshot?',
      answer:
        'Ad slots that never receive a creative usually collapse or stay empty, which is the layout any visitor with an ad blocker already gets. If a slot leaves a gap you do not want, hide it with a styles rule.'
    }
  ],
  cta: {
    headlinePrefix: 'Ready for',
    headlineAccent: 'clean screenshots',
    body: 'Ads and consent popups are gone by default, and first-party banners take one option. Start on the free endpoint and capture your first clean page today.',
    href: '/screenshot',
    label: 'Capture a clean screenshot'
  },
  howTo: {
    name: 'How to screenshot a website without cookie banners or ads',
    steps: [
      {
        title: 'Capture with adblock on',
        description:
          'Request the screenshot with the default adblock setting so third-party ads, trackers and consent services are blocked before the page renders.'
      },
      {
        title: 'Dismiss a first-party banner',
        description:
          'Pass click with the selector of the accept button, and waitForSelector for the main content, so the banner is closed before the capture.'
      },
      {
        title: 'Or hide it with CSS',
        description:
          'Pass styles with a display: none rule for the banner wrapper and any empty ad slot when there is no reliable button to click.'
      }
    ]
  }
}
