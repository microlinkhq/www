export const CONTENT = {
  slug: 'website-screenshot/animated-screenshots',
  head: {
    title: 'Animated screenshots: record any page as video',
    description:
      'An animated screenshot records any URL as a short MP4 or WebM instead of a still image. Up to 10 seconds at 60 fps, embeddable in a video tag.'
  },
  hero: {
    title: 'Record a website as a video instead of a screenshot',
    intro:
      'Some pages only make sense while they move: a WebGL scene, a scroll-driven landing page, a loading sequence, a chart that animates in. A still frame reports one arbitrary moment of it. Set one option and the Screenshot API opens the page in a real browser, records it, and returns a hosted MP4 or WebM alongside the still image.',
    cta: { label: 'Open the Screenshot API', href: '/screenshot' }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'A still image cannot show a page that moves',
    paragraphs: [
      'Screenshot APIs return one frame. For a static document that is the whole page. For a product hero with a scroll animation, a canvas demo, or a dashboard that fills in as data arrives, one frame is a coin flip: you get the page mid-transition, or before the content settles, or after the motion has already finished.',
      'The usual answer is to record it yourself. That means driving a headless browser, attaching a screencast session, collecting frames, then running them through a video encoder, and keeping all of it alive on your own machines. The output is a video file you now have to host.',
      'The [screenshot.animated](/docs/api/parameters/screenshot/animated) option replaces that pipeline with one option on the request you already send. The browser records the page as it plays and the response carries a hosted video URL next to the usual still image, so a capture and a recording cost the same single call.'
    ],
    figure: {
      request: {
        url: 'https://threejs.org/examples/webgl_animation_skinning_blending',
        params: {
          screenshot: true,
          meta: false,
          embed: 'screenshot.url',
          viewport: { width: 1200, height: 750, deviceScaleFactor: 1 }
        }
      },
      alt: 'A single still frame captured from an animated WebGL page',
      width: 1200,
      height: 750,
      caption:
        'One still frame of a page that never stops moving, generated live by a plain screenshot request.'
    },
    live: {
      label: 'Open the MP4 the same page records',
      request: {
        url: 'https://threejs.org/examples/webgl_animation_skinning_blending',
        params: {
          screenshot: { animated: true },
          meta: false,
          embed: 'screenshot.animated.url'
        }
      }
    }
  },
  how: {
    title: 'How to record an animated screenshot',
    intro:
      'Set animated to true for the defaults, or pass an object to set the length, the frame rate and the container. Recording starts at navigation, so the opening moments show the page loading before the content settles.',
    steps: [
      {
        label: '1 · Record with the defaults',
        sdk: "const { animated } = await microlink.screenshot('https://example.com', {\n  animated: true\n})\n\nconsole.log(animated.url, animated.type)",
        note: 'Five seconds at 30 fps, encoded as H.264 MP4. The response still carries the regular image, so one request gives you both a poster frame and the video.'
      },
      {
        label: '2 · Set length, frame rate and container',
        sdk: "const { animated } = await microlink.screenshot('https://example.com', {\n  animated: { duration: '8s', fps: 60, type: 'webm' }\n})",
        note: 'duration accepts milliseconds or the 8s form and tops out at 10 seconds. fps tops out at 60. type is mp4 for H.264 or webm for VP9.'
      },
      {
        label: '3 · Let the CSS motion play',
        sdk: "const { animated } = await microlink.screenshot('https://example.com', {\n  animated: { duration: '6s' },\n  animations: true\n})",
        note: 'CSS animations and transitions are off by default, which keeps still captures identical between runs. A recording of CSS-driven motion needs them on, so set [animations](/docs/api/parameters/animations) to true.'
      },
      {
        label: '4 · The same recording as a URL',
        request: {
          url: 'https://example.com',
          params: {
            screenshot: { animated: true },
            meta: false,
            embed: 'screenshot.animated.url'
          }
        },
        note: 'With [embed](/docs/api/parameters/embed) the response body is the video itself rather than JSON, so this URL goes straight into the src of a video tag. It works on the free endpoint with no API key.'
      }
    ],
    params: [
      {
        name: 'screenshot.animated',
        href: '/docs/api/parameters/screenshot/animated',
        note: 'Records the page instead of capturing it. Takes true, or an object with duration (default 5000, max 10000), fps (default 30, max 60) and type.'
      },
      {
        name: 'animations',
        href: '/docs/api/parameters/animations',
        note: 'Enables CSS animations and transitions, which are disabled by default. Also drives prefers-reduced-motion in the page.'
      },
      {
        name: 'embed',
        href: '/docs/api/parameters/embed',
        note: 'Returns the video bytes instead of JSON when set to screenshot.animated.url.'
      },
      {
        name: 'device',
        href: '/docs/api/parameters/device',
        note: 'Records at a named device preset. Applies to the whole request, so the recording uses that viewport and user agent.'
      },
      {
        name: 'ttl',
        href: '/docs/api/parameters/ttl',
        note: 'Controls how long the hosted recording is reused before the page is recorded again.'
      }
    ],
    outro:
      'The recording captures the viewport, not the full scrollable page, so frame what you want with a [viewport](/docs/api/parameters/viewport) or a [device](/docs/api/parameters/device) preset. For motion that starts late, give it a longer duration rather than a wait: the clock starts at navigation.'
  },
  why: {
    title: 'Why record on the API instead of in your own browser fleet',
    intro:
      'A recording is a screenshot with a time axis. Treating it as one request option is what keeps it cheap to produce and cheap to serve.',
    cards: [
      {
        kicker: 'One request',
        title: 'No screencast pipeline to operate.',
        body: 'Driving a browser, attaching a screencast, buffering frames and encoding them is several moving parts and a machine to run them on. Here it is one option on a request, and the encoded video comes back hosted and cached.',
        note: 'The still image arrives in the same response, which is what you want for the poster attribute of a video tag.'
      },
      {
        kicker: 'Composable',
        title: 'Every other browser setting still applies.',
        body: 'A recording is not a separate product. Emulate a phone, force a color scheme, block cookie banners, click something first, then record the result. The options compose exactly as they do for a still capture.',
        note: 'Pair it with [device emulation](/use-cases/website-screenshot/mobile) to record the mobile version, or with a [dark theme](/use-cases/website-screenshot/dark-mode) for the dark variant.'
      },
      {
        kicker: 'Bounded',
        title: 'Short clips, predictable weight.',
        body: 'Ten seconds is the ceiling, and frame rate and container are yours to choose. H.264 plays everywhere; VP9 in WebM trades compatibility for size. Both are far lighter than the GIF people reach for first.',
        note: 'When not to: for a long page or a flow with many steps, a recording is the wrong tool. Capture the whole page as a still with [fullPage](/docs/api/parameters/screenshot/fullPage) or script the steps with a [browser function](/function).'
      }
    ]
  },
  faq: [
    {
      question: 'How do I record a website as a video with an API?',
      answer:
        'Send a screenshot request with animated set to true. The page is opened in a real browser, recorded for five seconds at 30 fps by default, and the response carries a hosted MP4 URL in the animated object.'
    },
    {
      question: 'How long can an animated screenshot recording be?',
      answer:
        'Up to 10 seconds. The default is 5000 milliseconds and duration also accepts the 8s form. Recording starts at navigation, so a longer duration is how you reach motion that begins later.'
    },
    {
      question: 'Can I get an animated GIF instead of a video?',
      answer:
        'No. The output is H.264 in an MP4 container by default, or VP9 in WebM when you set type to webm. Both are much smaller than an equivalent GIF. Keep the MP4 default when playback has to work everywhere.'
    },
    {
      question: 'Why does my recording miss the animation on the page?',
      answer:
        'CSS animations and transitions are disabled by default so that still captures stay identical between runs. Set [animations](/docs/api/parameters/animations) to true to let them play. Motion driven by JavaScript or WebGL runs either way.'
    },
    {
      question: 'Can I serve the recording straight into a video tag?',
      answer:
        'Yes. Add embed set to screenshot.animated.url and the response body is the video itself rather than JSON, so the request URL works as the src of a video tag. Recordings are available on the free endpoint with 25 requests per day, see [pricing](/pricing) for more volume.'
    }
  ],
  cta: {
    headlinePrefix: 'Ready to record',
    headlineAccent: 'the motion',
    body: 'One option turns a capture into a clip. Start on the free endpoint and record your first page today.',
    href: '/screenshot',
    label: 'Record a page'
  },
  howTo: {
    name: 'How to record a website as a video with an API',
    steps: [
      {
        title: 'Record with the defaults',
        description:
          'Send a screenshot request with animated set to true to record five seconds of the page at 30 fps as an MP4.'
      },
      {
        title: 'Tune the recording',
        description:
          'Pass an object with duration up to 10 seconds, fps up to 60, and type set to mp4 or webm.'
      },
      {
        title: 'Enable CSS motion',
        description:
          'Set animations to true so CSS animations and transitions play while the page is recorded.'
      },
      {
        title: 'Serve the video',
        description:
          'Add embed set to screenshot.animated.url so the request returns the video bytes and works as the src of a video tag.'
      }
    ]
  }
}
