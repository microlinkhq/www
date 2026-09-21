export const CONTENT = {
  slug: 'website-metadata/missing-or-wrong-metadata',
  head: {
    title: 'Fix a missing og:image with metadata fallback rules',
    description:
      'When a page ships no og:image or a misleading title, override the field with your own rule and chain fallbacks so link previews never render empty.'
  },
  hero: {
    title: 'Fix missing or wrong og:image, title and description',
    intro:
      'When og:image is missing and there is no fallback, the link preview renders as a gray box. Some pages have no Open Graph image at all. Others put the site name where the title should be, or a tracking pixel where the image should be. The Metadata API lets you override any normalized field with a rule and chain fallbacks until one yields a valid value.',
    cta: { label: 'Start with the Metadata API', href: '/metadata' }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'A page with a missing og:image or a wrong title breaks the card',
    paragraphs: [
      'Microlink already merges Open Graph, Twitter Cards, JSON-LD and the HTML into one shape and picks the best candidate for each field. When a page ships wrong or empty tags, there is nothing better to pick from, and the card your users see has no image or the wrong headline.',
      'Patching it in the UI does not scale: every client needs the same special cases, and the stored metadata stays wrong for search, feeds and emails. Asking the site owner to fix their tags works for your own pages, which you can check with the [sharing debugger](/tools/sharing-debugger), but not for the rest of the web.',
      'A [data rule](/docs/api/parameters/data) named after a normalized field overrides it. Point image at the first real picture in the article, title at the h1, description at the first paragraph, and list several rules so the first one that yields a valid value wins.'
    ],
    live: {
      label: 'Open the live JSON with an overridden title',
      request: {
        url: 'https://news.ycombinator.com',
        params: {
          data: { title: { selector: '.titleline > a', attr: 'text' } }
        }
      }
    }
  },
  how: {
    title: 'How to override a title or og:image in the metadata API',
    intro:
      'Name the rule after the field to replace it. Pass an array of rules to try them in order until one matches and passes its type. The [extending results guide](/docs/guides/metadata/extending-results) shows the same data option adding new fields instead.',
    steps: [
      {
        label: '1 · Override og:image with the article image',
        sdk: "const { title, image } = await microlink.metadata('https://example.com/post', {\n  data: {\n    image: {\n      selector: 'article img',\n      attr: 'src',\n      type: 'image'\n    }\n  }\n})",
        note: 'The image rule replaces the normalized image. The image type resolves the src to an absolute URL and expands it into an asset object with width, height, type and size.'
      },
      {
        label: '2 · Fallback chain for the title',
        sdk: "const { title } = await microlink.metadata('https://example.com/post', {\n  data: {\n    title: [\n      { selector: 'meta[property=\"og:title\"]:not([content=\"\"])', attr: 'content' },\n      { selector: 'article h1', attr: 'text' },\n      { selector: 'title', attr: 'text' }\n    ]\n  }\n})",
        note: 'Rules are evaluated in order, and the first one that matches and passes its type wins. The :not([content=""]) part skips an og:title tag that exists but is empty.'
      },
      {
        label: '3 · The same request as a URL',
        request: {
          url: 'https://example.com/post',
          params: {
            data: {
              image: { selector: 'article img', attr: 'src', type: 'image' }
            }
          }
        },
        note: 'Override rules flatten to data.image.selector, data.image.attr and data.image.type, so the fix works from a plain URL on the free endpoint.'
      }
    ],
    params: [
      {
        name: 'data',
        href: '/docs/api/parameters/data',
        note: 'A rule named after a normalized field, such as title or image, overrides that field.'
      },
      {
        name: 'type',
        href: '/docs/sdk/methods/extract/type',
        note: 'image, url, date, string and other validators. A value that fails its type resolves to null.'
      },
      {
        name: 'selector',
        href: '/docs/sdk/methods/extract/selector',
        note: 'The first match of a CSS selector. Accepts an array of selectors as fallbacks.'
      },
      {
        name: 'prerender',
        href: '/docs/api/parameters/prerender',
        note: 'Set to true when the correct tags only exist after JavaScript runs. Default auto.'
      },
      {
        name: 'ping',
        href: '/docs/api/parameters/ping',
        note: 'On by default: every URL in the payload is verified as publicly reachable.'
      }
    ],
    outro:
      'Normalized detection already applies its own fallbacks, so add overrides only for the sites that need them. A small per-domain map of rules is usually enough.'
  },
  why: {
    title: 'Why fix a link preview image at the API, not in the UI',
    intro:
      'Fixing previews in the UI hides the problem in one client. Fixing the field at the API fixes it for every consumer.',
    cards: [
      {
        kicker: 'Named overrides',
        title: 'The response shape does not change.',
        body: 'Because the override uses the field’s own name, every consumer keeps reading image, title and description exactly as before. The fix is invisible to the UI, the search index and the email template.',
        note: 'The same mechanism [adds custom fields](/use-cases/website-metadata/custom-fields) when you need values beyond the normalized set.'
      },
      {
        kicker: 'Validated fallbacks',
        title: 'An empty tag does not win just because it exists.',
        body: 'Selectors that exclude empty content attributes skip blank tags, and the image type rejects values that are not real images. The chain lands on the first usable candidate, or on null when there is none.',
        note: '[ping](/docs/api/parameters/ping), on by default, verifies that every URL in the payload is reachable, so a dead image URL does not reach your card.'
      },
      {
        kicker: 'Cached fix',
        title: 'The corrected preview is cached like any other.',
        body: 'Once resolved, the response is served from the cache for 24 hours by default. Cache hits do not count against your quota, so the extra rules cost nothing on repeat requests.',
        note: 'When not to: if a page has no image at all, no rule can invent one. Render a placeholder from the title, or use a [screenshot of the page as the Open Graph image](/use-cases/website-screenshot/open-graph-images).'
      }
    ]
  },
  faq: [
    {
      question: 'Why is og:image missing from the metadata response?',
      answer:
        'The page probably ships no usable image tag, or the tag points at an unreachable URL that ping filtered out. Add an image rule that targets the article’s real image, or fall back to a screenshot of the page. The [metadata troubleshooting guide](/docs/guides/metadata/troubleshooting) covers client-rendered and blocked pages, the other two causes.'
    },
    {
      question:
        'How do I set an og:image fallback when a page has no metadata image?',
      answer:
        'Pass a data rule named image as an array: first the og:image tag, then the first image inside the article, each with type image. The first candidate that resolves to a real image wins. If none does, the field is null and you can render a placeholder instead.'
    },
    {
      question: 'How do I override the title the metadata API detected?',
      answer:
        'Pass a data rule named title with the selector you trust, such as article h1 with attr text. A rule named after a normalized field replaces that field in the response, so your code keeps reading title as before.'
    },
    {
      question: 'Can I define several metadata fallbacks for one field?',
      answer:
        'Yes. Pass an array of rules for the field. They are evaluated in order and the first one that matches and passes its type wins; if none does, the field is null. The [fallback rules reference](/docs/sdk/methods/extract#fallback-rules) shows the same form for selector and attr on their own.'
    },
    {
      question: 'Do metadata overrides work for client-rendered pages?',
      answer:
        'Yes. Add prerender: true and, if needed, waitForSelector so the rules run against the rendered DOM rather than the initial HTML. See [metadata from single-page apps](/use-cases/website-metadata/javascript-rendered-pages) for the wait options.'
    }
  ],
  cta: {
    headlinePrefix: 'Ready for',
    headlineAccent: 'previews that never break',
    body: 'Override the wrong field, chain the fallbacks, cache the fix. Start on the free tier and repair your first broken preview today.',
    href: '/metadata',
    label: 'Fix a metadata field'
  },
  howTo: {
    name: 'How to fix a missing og:image or a wrong title',
    steps: [
      {
        title: 'Name a rule after the broken field',
        description:
          'Add a data rule called image, title or description. A rule named after a normalized field overrides that field in the response.'
      },
      {
        title: 'Point the rule at the right element',
        description:
          'Use a CSS selector for the real value, such as the first image inside the article with attr src and type image.'
      },
      {
        title: 'Chain fallbacks',
        description:
          'Pass an array of rules for the field. They are tried in order, and the first one that matches and passes its type wins.'
      },
      {
        title: 'Let the cache keep the fix',
        description:
          'The corrected response is cached for 24 hours by default, so repeat requests return the fixed preview without re-evaluating the page.'
      }
    ]
  }
}
