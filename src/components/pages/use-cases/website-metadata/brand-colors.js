export const CONTENT = {
  slug: 'website-metadata/brand-colors',
  head: {
    title: 'Extract brand colors from a website’s logo and images',
    description:
      'Get the dominant color palette of any site’s logo and og:image, plus a readable background and text pair, in one metadata request. Made for themed cards.'
  },
  hero: {
    title: 'Extract brand colors from any website’s logo and preview image',
    intro:
      'Extract brand colors from a website without downloading a single image: the Metadata API returns the dominant palette of the page’s logo and preview image, with a background color and readable text colors already picked. Link cards, bookmark managers, CRMs and directory listings use it to tint each entry to the brand it points at.',
    cta: { label: 'Start with the Metadata API', href: '/metadata' }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'Picking brand colors by hand does not scale past a few domains',
    paragraphs: [
      'Cards, embeds and link lists look generic in one shade of gray. Tinting each one to the linked brand needs a color you do not have, for thousands of domains you have never seen.',
      'Doing it yourself means finding the logo and the og:image, downloading both, running a color quantizer and then checking contrast, because the most dominant color of an image is often unusable behind text. A hand-curated table of brand colors goes stale at the first rebrand.',
      'With [palette](/docs/api/parameters/palette) enabled, every image field in the metadata gains a palette array ordered from most to least dominant, plus background_color, color and alternative_color chosen for contrast. The colors arrive in the same response as the [normalized metadata](/metadata), so the card and its theme come from one request.'
    ],
    live: {
      label: 'Open the live JSON with palettes',
      request: {
        url: 'https://github.com/microlinkhq',
        params: { palette: true, meta: { image: true, logo: true } }
      }
    }
  },
  how: {
    title: 'How to get a color palette from a logo or og:image',
    intro:
      'palette is a boolean and defaults to false. The computed colors arrive on the image and logo fields as hexadecimal strings, ready to drop into your CSS. The [extending results guide](/docs/guides/metadata/extending-results) lists the other enrichments that ride on the same request.',
    steps: [
      {
        label: '1 · Palette with the SDK',
        sdk: "const { image, logo } = await microlink.metadata('https://example.com', {\n  palette: true\n})\n\nconsole.log(image.palette, image.background_color, image.color)",
        note: 'Each image field now carries palette, an array of hex colors from most to least dominant, next to background_color, color and alternative_color.'
      },
      {
        label: '2 · Theme a preview card',
        sdk: "const { title, logo } = await microlink.metadata('https://example.com', {\n  palette: true,\n  meta: { title: true, logo: true }\n})\n\nconst card = {\n  backgroundColor: logo.background_color,\n  color: logo.color,\n  accent: logo.alternative_color\n}",
        note: 'Restricting [meta](/docs/api/parameters/meta) to title and logo skips the detection you do not render. The logo palette is often the truest brand color, because preview images tend to be photographs.'
      },
      {
        label: '3 · The same request as a URL',
        request: {
          url: 'https://example.com',
          params: { palette: true, meta: { image: true, logo: true } }
        },
        note: 'palette=true adds the color fields to every image field in the JSON. The request runs on the free endpoint, with no API key.'
      }
    ],
    params: [
      {
        name: 'palette',
        href: '/docs/api/parameters/palette',
        note: 'Boolean, default false. Adds palette, background_color, color and alternative_color to every detected image field.'
      },
      {
        name: 'meta',
        href: '/docs/api/parameters/meta',
        note: 'Keep only image and logo when colors are all you need.'
      },
      {
        name: 'data',
        href: '/docs/api/parameters/data',
        note: 'Extract a different image with a rule of type image and it gets a palette too.'
      },
      {
        name: 'ttl',
        href: '/docs/api/parameters/ttl',
        note: 'Brand colors change rarely; cache them for up to 31 days. Pro plans.'
      }
    ],
    outro:
      'background_color is the palette color with the best WCAG contrast ratio for use as a background, color is the best color to lay over it, and alternative_color is the second best. When only two colors can be parsed, alternative_color equals color.'
  },
  why: {
    title: 'Why compute dominant colors in the metadata API',
    intro:
      'The image is already fetched to measure its dimensions and size. Extracting its colors in the same pass saves you a download, a quantizer and a contrast library.',
    cards: [
      {
        kicker: 'Accessible by default',
        title: 'The pairs are chosen for contrast, not just dominance.',
        body: 'A dominant color is often unusable behind text. Microlink returns a background_color picked for a good WCAG contrast ratio, the color that reads best over it and an alternative, so cards stay legible without a second library.',
        note: 'Use the raw palette array when you want to pick your own accent from the most dominant colors.'
      },
      {
        kicker: 'From the real assets',
        title: 'Logo and preview image, not a guess.',
        body: 'The palette is computed from the page’s own logo and preview image, which is where brand color lives. There are no lookup tables and no manual curation per domain, so a rebrand shows up when the cache expires.',
        note: 'For a different image, add a [custom data rule](/use-cases/website-metadata/custom-fields) with type image and it carries the same color fields.'
      },
      {
        kicker: 'Cached with the preview',
        title: 'Colors ride along with the metadata you already fetch.',
        body: 'Because palette is part of the metadata response, a link preview and its theme share one request and one cache entry. Responses are cached for 24 hours by default, and cache hits do not count against your quota.',
        note: 'When not to: a monochrome logo or a photographic hero image produces a palette that is not the brand color. Fall back to your own accent when the pair looks off.'
      }
    ]
  },
  faq: [
    {
      question: 'Which fields does palette add to the metadata response?',
      answer:
        'For each image field, such as image and logo: palette, an array of hex colors from most to least dominant; background_color, the color with the best contrast ratio for a background; and color plus alternative_color, the two best colors to place over it. The rest of the asset object (url, type, width, height, size) is unchanged.'
    },
    {
      question:
        'How do I extract brand colors from a website without downloading its images?',
      answer:
        'Request the page’s metadata with palette: true. Microlink finds the logo and the preview image, computes their palettes server-side and returns the colors as hex strings in the JSON, so your code never touches the image files.'
    },
    {
      question:
        'Does palette work with a custom image extracted next to the metadata?',
      answer:
        'Yes. A data rule with type image resolves to an asset object, and with palette enabled it carries the same color fields as image and logo. The [type reference](/docs/sdk/methods/extract/type) lists every media type a rule can resolve to.'
    },
    {
      question: 'Are the colors from the metadata palette accessible?',
      answer:
        'background_color is chosen for a good WCAG contrast ratio and color is the best match over it, so regular body text stays readable. Verify against your own contrast target when the card carries small or light text.'
    },
    {
      question: 'Does palette slow down a metadata request?',
      answer:
        'It adds image processing, which is why the [caching and performance guide](/docs/guides/metadata/caching-and-performance) lists it among the enrichments to skip when you do not need them. Keep meta scoped to image and logo, and cache the result with ttl on Pro plans, since brand colors rarely change.'
    }
  ],
  cta: {
    headlinePrefix: 'Ready to theme',
    headlineAccent: 'with brand colors',
    body: 'Palettes and accessible pairs from the logo and image of any site. Start on the free tier and tint your first preview card today.',
    href: '/metadata',
    label: 'Extract a palette'
  },
  howTo: {
    name: 'How to extract brand colors from a website',
    steps: [
      {
        title: 'Enable palette on a metadata request',
        description:
          'Call the Metadata API with palette set to true. Every detected image field, such as image and logo, gains the color fields.'
      },
      {
        title: 'Read the accessible pair',
        description:
          'Use background_color as the card background, color as the text color and alternative_color as the accent. The palette array holds the raw dominant colors.'
      },
      {
        title: 'Scope and cache the request',
        description:
          'Restrict meta to image and logo so nothing else is detected, and cache the result with ttl because brand colors rarely change.'
      }
    ]
  }
}
