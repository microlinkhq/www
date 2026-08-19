import React from 'react'
import {
  Activity,
  AlignLeft,
  Aperture,
  AtSign,
  Camera,
  Code,
  FileText,
  Film,
  Filter,
  Headphones,
  Image,
  Layers,
  Layout,
  Link2,
  Music,
  Play,
  Printer,
  Search,
  Tag,
  Video
} from 'react-feather'

import Box from 'components/elements/Box'
import Subhead from 'components/elements/Subhead'
import Container from 'components/elements/Container'
import { Link } from 'components/elements/Link'
import Caption from 'components/patterns/Caption/Caption'

import { colors, layout, theme, SECTION_VERTICAL_SPACING } from 'theme'

export const ACCENT = 'blue6'

export const PACKAGE_NAME = 'microlink.io'
export const REPOSITORY_URL = 'https://github.com/microlinkhq/microlink'
export const NPM_URL = 'https://www.npmjs.com/package/microlink.io'
export const DOCS_URL = '/docs/sdk/getting-started/overview'

export const INSTALL_SNIPPET = 'npm install microlink.io'

export const METHOD_GROUPS = [
  {
    id: 'content',
    label: 'Content',
    caption:
      'Turn a URL into rendered output — structured data, documents, and hosted assets.',
    accent: {
      dot: colors.blue6,
      icon: colors.blue7,
      chipBg: 'blue0',
      chipBorder: 'blue2',
      shadow: 'rgba(34, 139, 230, 0.45)'
    },
    methods: [
      {
        title: 'screenshot',
        icon: Camera,
        description:
          'Any URL as a hosted image — full page, device emulation, custom CSS.'
      },
      {
        title: 'metadata',
        icon: Tag,
        description:
          'Unified metadata from Open Graph, Twitter Cards, JSON-LD, and HTML.'
      },
      {
        title: 'markdown',
        icon: FileText,
        description:
          'The page as clean Markdown, ready for LLM context windows.'
      },
      {
        title: 'html',
        icon: Code,
        description: 'Fully rendered HTML, captured after JavaScript runs.'
      },
      {
        title: 'pdf',
        icon: Printer,
        description:
          'Print any URL to PDF with format, margin, and scale control.'
      },
      {
        title: 'embed',
        icon: Layout,
        description: 'oEmbed-style iframe HTML for rich cards.'
      },
      {
        title: 'logo',
        icon: Aperture,
        description:
          'The brand logo behind any URL, with an optional color palette.'
      },
      {
        title: 'text',
        icon: AlignLeft,
        description: 'Readable plain text with the markup stripped out.'
      }
    ]
  },
  {
    id: 'specialized',
    label: 'Specialized',
    caption:
      'Deeper capabilities — remote code execution, search, custom extraction, and tech detection.',
    accent: {
      dot: colors.violet6,
      icon: colors.violet7,
      chipBg: 'violet0',
      chipBorder: 'violet2',
      shadow: 'rgba(121, 80, 242, 0.45)'
    },
    methods: [
      {
        title: 'run',
        icon: Play,
        description:
          'Execute your own JavaScript against a live page and get the value back.'
      },
      {
        title: 'search',
        icon: Search,
        description:
          'Google results as structured data, with built-in pagination and per-result expansion.'
      },
      {
        title: 'video',
        icon: Film,
        description: 'The primary video as a direct, playable asset.'
      },
      {
        title: 'audio',
        icon: Headphones,
        description: 'The primary audio track as a direct asset.'
      },
      {
        title: 'extract',
        icon: Filter,
        description: 'Typed values pulled with CSS selector rules.'
      },
      {
        title: 'technologies',
        icon: Layers,
        description: 'The tech stack powering any site.'
      },
      {
        title: 'lighthouse',
        icon: Activity,
        description: 'A full Lighthouse report for any URL.'
      }
    ]
  },
  {
    id: 'collections',
    label: 'Collections',
    caption: 'Sweep a page and get every matching resource back as an array.',
    accent: {
      dot: colors.teal6,
      icon: colors.teal7,
      chipBg: 'teal0',
      chipBorder: 'teal2',
      shadow: 'rgba(18, 184, 134, 0.45)'
    },
    methods: [
      {
        title: 'links',
        icon: Link2,
        description: 'Matching hrefs as absolute, deduped URLs.'
      },
      {
        title: 'images',
        icon: Image,
        description: 'Image assets collected from the page.'
      },
      {
        title: 'videos',
        icon: Video,
        description: 'Video sources collected from the page.'
      },
      {
        title: 'audios',
        icon: Music,
        description: 'Audio sources collected from the page.'
      },
      {
        title: 'emails',
        icon: AtSign,
        description: 'Addresses found in mailto links and plain text.'
      }
    ]
  }
]

export const QUESTIONS = [
  {
    question: 'What is microlink.io?',
    answer: (
      <>
        <div>
          The official SDK for the{' '}
          <Link href='/docs/api/getting-started/overview'>Microlink API</Link>.
          It organizes the API into semantic products — one method per product —
          so you call <code>microlink.screenshot(url)</code> instead of
          composing query strings by hand.
        </div>
      </>
    )
  },
  {
    question: 'How is it different from @microlink/mql?',
    answer: (
      <>
        <div>
          It&rsquo;s a thin semantic layer over{' '}
          <Link href='https://github.com/microlinkhq/mql'>@microlink/mql</Link>:
          HTTP, authentication, retries, errors, and binary handling are already
          solved there. Each product method sets the right API parameters and
          unwraps the result for you.
        </div>
      </>
    )
  },
  {
    question: 'What happened to the previous Microlink SDK?',
    answer: (
      <>
        <div>
          The previous SDK was a UI component for rendering link previews in
          React, Vue, or vanilla JavaScript. It keeps working and its{' '}
          <Link href='/docs/sdk-legacy/getting-started/overview/'>
            documentation stays available
          </Link>
          , but it&rsquo;s no longer maintained. This package is the SDK going
          forward: it returns data and assets from every Microlink product, with
          no UI attached.
        </div>
      </>
    )
  },
  {
    question: 'Do I need an API key?',
    answer: (
      <>
        <div>
          Not to start. <code>createClient()</code> works on the free tier out
          of the box. Pass <code>{'createClient({ apiKey })'}</code> to unlock{' '}
          <Link href='/pricing'>pro plans</Link> — the key travels as the{' '}
          <code>x-api-key</code> header.
        </div>
        <div>
          <code>search</code> is the exception: it needs an API key on every
          request.
        </div>
      </>
    )
  },
  {
    question: 'How do errors work?',
    answer: (
      <>
        <div>
          Every method throws a <code>MicrolinkError</code> carrying{' '}
          <code>code</code>, <code>statusCode</code>, and a human-readable{' '}
          <code>description</code>, so a single <code>try/catch</code> covers
          the whole client. Retries happen automatically underneath.
        </div>
      </>
    )
  },
  {
    question: 'Where does it run?',
    answer: (
      <>
        <div>
          Node.js, browsers, and Deno. It&rsquo;s published on npm as{' '}
          <Link href={NPM_URL}>microlink.io</Link> and distributed under the MIT
          license.
        </div>
      </>
    )
  },
  {
    question: 'Does it include a CLI?',
    answer: (
      <>
        <div>
          Yes — installing the package also ships a <code>microlink</code>{' '}
          binary where every product is a subcommand, such as{' '}
          <code>microlink markdown https://example.com</code>. Looking for the
          standalone terminal experience? That&rsquo;s{' '}
          <Link href='/integrations/cli'>@microlink/cli</Link>.
        </div>
      </>
    )
  }
]

export const Section = ({ children, css: cssProp, ...props }) => (
  <Container
    as='section'
    css={theme({
      width: '100%',
      maxWidth: '100%',
      px: 3,
      py: SECTION_VERTICAL_SPACING,
      position: 'relative',
      ...cssProp
    })}
    {...props}
  >
    {children}
  </Container>
)

export const SectionHeader = ({ title, caption }) => (
  <Box
    css={theme({
      maxWidth: layout.large,
      mx: 'auto',
      textAlign: 'center',
      px: 3
    })}
  >
    <Subhead variant='gradient'>{title}</Subhead>
    <Caption
      forwardedAs='p'
      css={theme({
        mx: 'auto',
        pt: [3, 3, 4, 4],
        maxWidth: layout.large
      })}
    >
      {caption}
    </Caption>
  </Box>
)
