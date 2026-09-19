export const CONTENT = {
  slug: 'website-screenshot/block-cookie-banners-and-ads',
  head: {
    title: 'Screenshot a website without cookie banners or ads',
    description:
      'Ads, trackers and consent services are blocked before the page renders. Dismiss first-party banners with click or styles and capture a clean page.'
  },
  hero: {
    title: 'Screenshot a website without cookie banners or ads',
    intro:
      'Consent dialogs, newsletter popups and ad slots ruin automated screenshots: the content you wanted is hidden behind a modal that a human would dismiss in a second. The Screenshot API blocks the third-party noise by default and gives you two options for anything first-party.',
    cta: { label: 'Start with the Screenshot API', href: '/screenshot' }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'The page you capture is not the page your users read',
    paragraphs: [
      'Most consent banners are injected by third-party consent management scripts, and most ads come from third-party networks. Both load late, both shift the layout, and both make two captures of the same URL look different.',
      'The [adblock](/docs/api/parameters/adblock) option, enabled by default, blocks advertisement, tracker and cookie consent sub-requests at the network level before the page renders. A banner built into the site itself still needs a click or a CSS rule, and both are one parameter away.'
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
    title: 'Block the third-party noise, then dismiss what is left',
    intro:
      'Keep adblock on, click the consent button if the banner is first-party, or hide it with injected CSS when clicking is unreliable.',
    steps: [
      {
        label: '1 · Capture with adblock (the default)',
        sdk: "const { url } = await microlink.screenshot('https://example.com', {\n  adblock: true\n})",
        note: 'adblock is true by default, so ads, trackers and third-party consent popups are blocked before rendering.'
      },
      {
        label: '2 · Dismiss a first-party banner',
        sdk: "const { url } = await microlink.screenshot('https://example.com', {\n  click: ['#cookie-accept', '.newsletter-close'],\n  waitForSelector: 'main'\n})",
        note: 'Elements are clicked in order before the capture; wait for the content you care about afterwards.'
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
        note: 'Injected CSS removes the elements from layout without depending on a clickable button.'
      }
    ],
    params: [
      {
        name: 'adblock',
        href: '/docs/api/parameters/adblock',
        note: 'Blocks ad, tracker and cookie consent sub-requests. On by default; set false to capture the page exactly as a first-time visitor sees it.'
      },
      {
        name: 'click',
        href: '/docs/api/parameters/click',
        note: 'One selector or an ordered array of selectors to click before capture.'
      },
      {
        name: 'styles',
        href: '/docs/api/parameters/styles',
        note: 'Inline CSS or a stylesheet URL injected before the capture.'
      },
      {
        name: 'modules',
        href: '/docs/api/parameters/modules',
        note: 'Inject JavaScript as an ES module when a banner needs more than CSS.'
      }
    ],
    outro:
      'Reach for styles before scripts: CSS cannot break the page, and it keeps working when the button label changes.'
  },
  why: {
    title: 'Why blocked, not just hidden',
    intro:
      'Hiding a banner after it loads is fragile. Blocking the request that creates it is faster and repeatable.',
    cards: [
      {
        kicker: 'Network level',
        title: 'Blocked requests never render, so nothing shifts.',
        body: 'The adblock engine stops ad, tracker and consent service requests before the browser executes them. The page loads faster and the layout is the one the content was designed for.',
        note: 'The engine is the open-source Cliqz adblocker, the same technology used by browser extensions, running inside the capture browser.'
      },
      {
        kicker: 'Deterministic captures',
        title: 'The same URL produces the same screenshot.',
        body: 'Without third-party slots and popups, two captures taken hours apart differ only when the content itself changed, which is what visual monitoring needs.',
        note: 'That is why it is on by default on every plan, including the free tier, and why turning it off is an explicit choice.'
      },
      {
        kicker: 'First-party escape hatch',
        title: 'click and styles handle banners the site ships itself.',
        body: 'Some publishers build their consent dialog into their own bundle. Click its accept button, or hide the wrapper with one CSS rule, then wait for the main content before capturing.',
        note: 'When not to: if you need the consent flow itself in the picture, for compliance evidence or a UX review, set adblock to false and capture as a first-time visitor.'
      }
    ]
  },
  faq: [
    {
      question: 'Do I need to enable adblock?',
      answer:
        'No. It is enabled by default on every plan. Pass adblock: false only when you want ads, trackers and consent flows to stay visible.'
    },
    {
      question: 'Which cookie banners does adblock remove?',
      answer:
        'Banners injected by third-party consent management services are blocked at the network level. A dialog built into the site’s own code is not a third-party request, so dismiss it with click or hide it with styles.'
    },
    {
      question: 'What if the accept button has no stable selector?',
      answer: [
        'Use styles to hide the banner wrapper instead of clicking. CSS injection does not depend on a button existing, and display: none removes the element from layout.',
        'For anything more involved, modules and scripts inject JavaScript, and the [function](/docs/api/parameters/function) parameter gives you full browser control.'
      ]
    },
    {
      question: 'Does blocking ads change the layout of the page?',
      answer:
        'Ad slots that never receive a creative usually collapse or stay empty, which is the layout the page has for any visitor with an ad blocker. If a slot leaves a gap you do not want, hide it with styles.'
    }
  ],
  cta: {
    headlinePrefix: 'Ready for',
    headlineAccent: 'clean screenshots',
    body: 'Ads and consent popups gone by default, first-party banners handled with one option. Start on the free tier and capture your first clean page today.',
    href: '/screenshot',
    label: 'Capture a clean screenshot'
  }
}
