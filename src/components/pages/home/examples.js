import Box from 'components/elements/Box'
import Subhead from 'components/elements/Subhead'
import { Link } from 'components/elements/Link'
import Caption from 'components/patterns/Caption/Caption'
import ExamplesSwitcher, {
  sdkExample
} from 'components/patterns/ExamplesSwitcher'
import {
  HOME_CONTENT_WIDTH,
  SEARCH_EXAMPLE
} from 'components/pages/home/catalog'
import heroDemoRequests from 'components/pages/home/hero-demo-requests'
import { layout, theme, SECTION_VERTICAL_SPACING } from 'theme'
import React from 'react'

const { DEMO_URLS, FN_SNIPPET } = heroDemoRequests

const PANELS = [
  {
    id: 'screenshot',
    title: 'Take a screenshot',
    description: 'Capture any URL as a hosted image.',
    snippet: sdkExample(`const { url } = await microlink.screenshot(
  '${DEMO_URLS.screenshot}',
  { type: 'png', fullPage: true }
)

console.log(url)
// → 'https://cdn.microlink.io/…'`)
  },
  {
    id: 'pdf',
    title: 'Generate a PDF',
    description: 'Render a printable document from any URL.',
    snippet: sdkExample(`const { url } = await microlink.pdf(
  '${DEMO_URLS.pdf}',
  { format: 'A4', margin: '0.5cm', scale: 1 }
)

console.log(url)
// → 'https://cdn.microlink.io/….pdf'`)
  },
  {
    id: 'metadata',
    title: 'Read metadata',
    description: 'Normalize Open Graph, Twitter, and schema data.',
    snippet: sdkExample(`const { title, description, image } =
  await microlink.metadata('${DEMO_URLS.metadata}')

console.log({ title, description, image })
// → {
//   title: 'GitHub: Let’s build from here',
//   description: 'GitHub is where people build software.',
//   image: { url: 'https://…', width: 1200, height: 600 }
// }`)
  },
  {
    id: 'embed',
    title: 'Build an embed',
    description: 'Turn any URL into embeddable rich-card HTML.',
    snippet: sdkExample(`const { html } = await microlink.embed(
  '${DEMO_URLS.embed}',
  { iframe: true }
)

console.log(html)
// → '<iframe src="https://cdn.microlink.io/…" …></iframe>'`)
  },
  {
    id: 'markdown',
    title: 'Get Markdown',
    description: 'Turn a page into clean Markdown for RAG or indexing.',
    snippet: sdkExample(`const markdown = await microlink.markdown(
  '${DEMO_URLS.markdown}',
  { selector: 'article', meta: true }
)

console.log(markdown)
// → '---\\ntitle: …\\n---\\n\\n# Getting started\\n…'`)
  },
  {
    id: 'html',
    title: 'Get HTML',
    description: 'Return fully rendered HTML after JavaScript runs.',
    snippet: sdkExample(`const html = await microlink.html(
  '${DEMO_URLS.html}',
  { selector: 'body', styles: true }
)

console.log(html)
// → '<body>\\n  <div>\\n    <h1>Example Domain</h1>\\n    …\\n  </div>\\n</body>'`)
  },
  {
    id: 'text',
    title: 'Extract text',
    description: 'Readable plain text — no markup noise.',
    snippet: sdkExample(`const text = await microlink.text(
  '${DEMO_URLS.text}',
  { selector: 'article' }
)

console.log(text)
// → 'Wikipedia is a free online encyclopedia…'`)
  },
  {
    id: 'logo',
    title: 'Fetch a logo',
    description: 'Get the brand logo and optional palette.',
    snippet: sdkExample(`const { url, palette } = await microlink.logo(
  '${DEMO_URLS.logo}',
  { palette: true }
)

console.log({ url, palette })
// → {
//   url: 'https://cdn.microlink.io/….png',
//   palette: ['#24292f', '#ffffff', …]
// }`)
  },
  {
    id: 'technologies',
    title: 'Detect technologies',
    description: 'Identify the tech stack behind any site.',
    snippet: sdkExample(`const technologies = await microlink.technologies(
  '${DEMO_URLS.technologies}'
)

console.log(technologies)
// → [{ name: 'Next.js', … }, { name: 'Vercel', … }]`)
  },
  {
    id: 'search',
    title: 'Search the web',
    description: 'Turn Google results into structured data.',
    snippet: sdkExample(`const page = await microlink.search(
  '${SEARCH_EXAMPLE.query}'
)

console.log(page.results)
// → [{ title, url, description }, …]`)
  },
  {
    id: 'function',
    title: 'Run a function',
    description: 'Execute custom browser code and return a value.',
    snippet: sdkExample(`const { value } = await microlink.run(
  '${DEMO_URLS.function}',
  ${FN_SNIPPET}
)

console.log(value)
// → ['https://example.com/', 'https://iana.org/…', …]`)
  },
  {
    id: 'extract',
    title: 'Extract fields',
    description: 'Pull typed values with CSS selectors.',
    snippet: sdkExample(`const { price } = await microlink.extract(
  '${DEMO_URLS.pdf}',
  { price: { selector: '.price', type: 'string' } }
)

console.log(price)
// → '$20 / month'`)
  },
  {
    id: 'links',
    title: 'Collect links',
    description: 'Gather matching hrefs as absolute, deduped URLs.',
    snippet: sdkExample(`const links = await microlink.links(
  '${DEMO_URLS.markdown}',
  { selectorAll: 'nav a' }
)

console.log(links)
// → ['https://microlink.io/docs', 'https://microlink.io/blog', …]`)
  },
  {
    id: 'emails',
    title: 'Harvest emails',
    description: 'Find mailto and plain-text addresses.',
    snippet: sdkExample(`const emails = await microlink.emails(
  'https://microlink.io'
)

console.log(emails)
// → ['hello@microlink.io']`)
  },
  {
    id: 'images',
    title: 'Collect images',
    description: 'Gather image assets from the page.',
    snippet: sdkExample(`const images = await microlink.images(
  '${DEMO_URLS.screenshot}',
  { selectorAll: 'img' }
)

console.log(images)
// → [{ url: 'https://….jpg', width: 1200, height: 630 }, …]`)
  }
]

const Examples = () => (
  <Box
    as='section'
    id='examples'
    aria-labelledby='package-examples-title'
    css={theme({
      bg: 'white',
      color: 'black',
      py: SECTION_VERTICAL_SPACING
    })}
  >
    <Box
      css={theme({
        maxWidth: layout.large,
        mx: 'auto',
        textAlign: 'center',
        px: 3
      })}
    >
      <Subhead id='package-examples-title' variant='gradient'>
        One SDK. Every product.
      </Subhead>
      <Caption
        forwardedAs='p'
        css={theme({
          mx: 'auto',
          pt: [3, 3, 4, 4]
        })}
      >
        The{' '}
        <Link href='https://www.npmjs.com/package/microlink.io' logoIcon>
          Microlink SDK
        </Link>{' '}
        gives you a consistent interface to everything Microlink offers.
      </Caption>
    </Box>

    <Box
      css={theme({
        maxWidth: HOME_CONTENT_WIDTH,
        mx: 'auto',
        mt: [4, 4, 5, 5],
        px: [3, 3, 4, 4]
      })}
    >
      <ExamplesSwitcher panels={PANELS} visibleTabs={5} />
    </Box>
  </Box>
)

export default Examples
