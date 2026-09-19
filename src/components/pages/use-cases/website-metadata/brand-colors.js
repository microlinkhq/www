export const CONTENT = {
  slug: 'website-metadata/brand-colors',
  head: {
    title: "Extract brand colors from a website's images",
    description:
      'Get the dominant palette and accessible text and background pairs from any site’s logo and preview image in one request, ready to theme your cards.'
  },
  hero: {
    title: 'Extract brand colors from any website’s logo and images',
    intro:
      'A preview card looks native when it borrows the brand’s colors. Instead of picking them by hand, ask the Metadata API for the palette of the page’s logo and image, with a background color and a readable text color already computed.',
    cta: { label: 'Start with the Metadata API', href: '/metadata' }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'Theming previews by hand does not scale',
    paragraphs: [
      'Cards, embeds and link lists look generic in one shade of gray. Tinting each one to the linked brand requires a color you do not have, and extracting it from images means downloading them and running a quantizer yourself.',
      'With palette enabled, every image field in the metadata, the logo and the preview image, gains a palette array of dominant colors plus background_color, color and alternative_color chosen for contrast. One request, theme included.'
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
    title: 'Ask for the palette, use the pairs',
    intro:
      'palette is a boolean. The computed colors arrive on the image and logo fields; use the pair fields directly in your CSS.',
    steps: [
      {
        label: '1 · Palette with the SDK',
        sdk: "const { image, logo } = await microlink.metadata('https://example.com', {\n  palette: true\n})\n\nconsole.log(image.palette, image.background_color, image.color)",
        note: 'Each image field carries its palette and the accessible foreground and background pair.'
      },
      {
        label: '2 · Theme a preview card',
        sdk: "const { title, logo } = await microlink.metadata('https://example.com', {\n  palette: true,\n  meta: { title: true, logo: true }\n})\n\nconst card = {\n  backgroundColor: logo.background_color,\n  color: logo.color,\n  accent: logo.alternative_color\n}",
        note: 'Restrict meta to the fields you need; the logo palette is often the truest brand color.'
      },
      {
        label: '3 · The same request as a URL',
        request: {
          url: 'https://example.com',
          params: { palette: true, meta: { image: true, logo: true } }
        },
        note: 'palette=true adds the color fields to every image-like field in the response.'
      }
    ],
    params: [
      {
        name: 'palette',
        href: '/docs/api/parameters/palette',
        note: 'Adds palette, background_color, color and alternative_color to image fields.'
      },
      {
        name: 'meta',
        href: '/docs/api/parameters/meta',
        note: 'Keep only image and logo when colors are all you need.'
      },
      {
        name: 'data',
        href: '/docs/api/parameters/data',
        note: 'Extract a different image with a rule and type image to get its palette too.'
      },
      {
        name: 'ttl',
        href: '/docs/api/parameters/ttl',
        note: 'Brand colors change rarely; cache them for the maximum on Pro plans.'
      }
    ],
    outro:
      'background_color is the palette color chosen as the background, and color and alternative_color are text colors picked to read on it.'
  },
  why: {
    title: 'Why compute colors at the API',
    intro:
      'The image is already fetched to measure it. Extracting its colors in the same pass costs nothing extra on your side.',
    cards: [
      {
        kicker: 'Accessible by default',
        title: 'The pairs are chosen for contrast, not just dominance.',
        body: 'A dominant color is often unusable as a background. Microlink returns a background_color with a readable color and an alternative_color, so cards meet contrast expectations without a second library.',
        note: 'Use the raw palette array when you want to pick your own accent from the top colors.'
      },
      {
        kicker: 'From the real assets',
        title: 'Logo and preview image, not a guess.',
        body: 'The palette is computed from the page’s own logo and image, which is where brand color lives. No lookup tables, no manual curation per domain.',
        note: 'For a custom image, add a [data rule](/use-cases/website-metadata/custom-fields) with type image and it gets a palette as well.'
      },
      {
        kicker: 'Cached with the preview',
        title: 'Colors ride along with the metadata you already fetch.',
        body: 'Because palette is part of the same response, a link preview and its theme share one request and one cache entry.',
        note: 'When not to: sites with a monochrome logo or a photographic hero image produce palettes that are not brand colors; fall back to your own accent when the pair looks off.'
      }
    ]
  },
  faq: [
    {
      question: 'Which fields does palette add?',
      answer:
        'For each image-like field, such as image and logo: palette, an array of dominant colors; background_color, chosen for contrast; and color plus alternative_color, text colors that read on that background.'
    },
    {
      question: 'Does palette work with custom extracted images?',
      answer:
        'Yes. A data rule with type image resolves to an asset object, and with palette enabled it carries the same color fields.'
    },
    {
      question: 'Are the extracted colors accessible?',
      answer:
        'The background and text pairs are selected for contrast so text stays readable. Verify against your own contrast target when the card carries small text.'
    },
    {
      question: 'Does palette slow down the request?',
      answer:
        'It adds image processing to the request. Keep meta scoped to image and logo, and cache the result with ttl, since brand colors rarely change.'
    }
  ],
  cta: {
    headlinePrefix: 'Ready to theme',
    headlineAccent: 'with brand colors',
    body: 'Palettes and accessible pairs from the logo and image of any site. Start on the free tier and tint your first preview card today.',
    href: '/metadata',
    label: 'Extract a palette'
  }
}
