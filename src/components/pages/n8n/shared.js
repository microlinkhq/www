import React from 'react'
import {
  Activity,
  AlignLeft,
  Aperture,
  Camera,
  FileText,
  Film,
  Music,
  Printer,
  Tag
} from 'react-feather'

import Box from 'components/elements/Box'
import Container from 'components/elements/Container'
import { Link } from 'components/elements/Link'
import Subhead from 'components/elements/Subhead'
import Caption from 'components/patterns/Caption/Caption'

import { layout, theme, SECTION_VERTICAL_SPACING } from 'theme'

export const ACCENT = 'red6'

export const ACCENT_CHIP = {
  bg: 'red0',
  border: 'red2',
  icon: 'red7',
  shadow: 'rgba(250, 82, 82, 0.45)'
}

export const PACKAGE_NAME = 'n8n-nodes-microlink'
export const NPM_URL = 'https://www.npmjs.com/package/n8n-nodes-microlink'
export const REPOSITORY_URL =
  'https://github.com/microlinkhq/n8n-nodes-microlink'
export const DOCS_URL = '/docs/api/getting-started/overview'

export const INSTALL_STEPS = [
  {
    title: 'Open Community Nodes',
    description: 'In your n8n instance, go to Settings, then Community Nodes.'
  },
  {
    title: 'Install the package',
    description:
      'Enter n8n-nodes-microlink and install it. Microlink shows up in the node panel right after.'
  },
  {
    title: 'Drop it in a workflow',
    description:
      'Pick an operation, pass a URL, and connect the output to the next node. Credentials are optional.'
  }
]

export const OPERATIONS = [
  {
    value: 'extract',
    name: 'Extract',
    icon: Tag,
    description: 'Return metadata and extracted data for a URL.',
    detail: (
      <>
        The default operation. Title, description, author, image, logo and your
        own <Link href='/metadata'>extraction rules</Link>.
      </>
    )
  },
  {
    value: 'screenshot',
    name: 'Screenshot',
    icon: Camera,
    description: 'Generate a screenshot.',
    detail: (
      <>
        Full page, element, device and format controls, the same ones the{' '}
        <Link href='/screenshot'>screenshot API</Link> exposes.
      </>
    )
  },
  {
    value: 'pdf',
    name: 'PDF',
    icon: Printer,
    description: 'Generate a PDF.',
    detail: (
      <>
        Paper format, margin, scale, landscape and page ranges, as on the{' '}
        <Link href='/pdf'>PDF API</Link>.
      </>
    )
  },
  {
    value: 'markdown',
    name: 'Markdown',
    icon: FileText,
    description: 'Return page content in Markdown.',
    detail: (
      <>
        Headings, lists and links preserved, ready for a model.{' '}
        <Link href='/markdown'>URL to Markdown</Link> in one step.
      </>
    )
  },
  {
    value: 'text',
    name: 'Text',
    icon: AlignLeft,
    description: 'Return page content as plain text.',
    detail: (
      <>
        Navigation, banners and footers dropped.{' '}
        <Link href='/text'>Readable text</Link> with the markup stripped out.
      </>
    )
  },
  {
    value: 'audio',
    name: 'Audio',
    icon: Music,
    description: 'Detect playable audio sources.',
    detail: (
      <>
        Podcast and music pages resolve to a playable URL. See{' '}
        <Link href='/media'>media detection</Link>.
      </>
    )
  },
  {
    value: 'video',
    name: 'Video',
    icon: Film,
    description: 'Detect playable video sources.',
    detail: (
      <>
        Video pages resolve to a browser friendly source, ready to embed or
        download.
      </>
    )
  },
  {
    value: 'insights',
    name: 'Insights',
    icon: Activity,
    description: 'Get performance and technology insights.',
    detail: (
      <>
        Lighthouse scores and the technology stack behind a site, from the{' '}
        <Link href='/insights'>insights API</Link>.
      </>
    )
  },
  {
    value: 'logo',
    name: 'Logo',
    icon: Aperture,
    description: 'Return logo metadata, including logo.palette.',
    detail: (
      <>
        The brand mark behind a domain, plus its colors. See the{' '}
        <Link href='/logo'>logo API</Link>.
      </>
    )
  }
]

export const RESPONSE_MODES = [
  {
    name: 'Auto',
    description: 'JSON, unless the request asks for embedded content.'
  },
  { name: 'JSON', description: 'The full Microlink API response, every time.' },
  { name: 'Text', description: 'The raw response body as a single field.' },
  {
    name: 'Binary',
    description:
      'The image or the document itself, attached to the item so the next node can store it.'
  }
]

export const WORKFLOW_SNIPPET = `Operation:        Screenshot
URL:              {{ $json.url }}
Response Mode:    Binary
Binary Property:  data
Options:
  Screenshot Full Page:  true
  Viewport Width:        1280
  Wait Until:            networkidle0
  Ad Block:              true`

export const QUESTIONS = [
  {
    question: 'What is the Microlink node?',
    answer: (
      <>
        <div>
          n8n is a workflow tool: every step is a node, and nodes pass items to
          each other. The Microlink node is one of those steps. Give it a URL
          and it returns what that page contains, so a workflow can read the web
          without a browser, a scraper or a server of your own.
        </div>
        <div>
          It is published as an n8n community node under the name{' '}
          <Link href={NPM_URL}>n8n-nodes-microlink</Link>, MIT licensed.
        </div>
      </>
    )
  },
  {
    question: 'Do I need an API key?',
    answer: (
      <>
        <div>
          No. Without credentials the node calls{' '}
          <code>https://api.microlink.io</code> on the free tier, which allows
          25 requests per day.
        </div>
        <div>
          Add a Microlink API credential and every request goes to{' '}
          <code>https://pro.microlink.io</code> with your key in the{' '}
          <code>x-api-key</code> header. The key field is optional, and n8n
          tests the credential when you save it. See{' '}
          <Link href='/pricing'>pricing</Link>.
        </div>
      </>
    )
  },
  {
    question: 'How do I install it?',
    answer: (
      <>
        <div>
          Open Settings, then Community Nodes, enter{' '}
          <code>n8n-nodes-microlink</code> and install it. On n8n Cloud the node
          appears in the editor immediately; a self-hosted instance may need a
          restart.
        </div>
      </>
    )
  },
  {
    question: 'How do I save a screenshot or a PDF as a file?',
    answer: (
      <>
        <div>
          Set Response Mode to Binary. The node downloads the result and
          attaches it to the item under the binary property you name, which
          defaults to <code>data</code>. Any node that accepts binary input,
          such as a storage or an email node, takes it from there.
        </div>
      </>
    )
  },
  {
    question: 'Can an AI Agent use it as a tool?',
    answer: (
      <>
        <div>
          Yes. The node is marked usable as a tool, so it can be attached to an
          n8n AI Agent and called when the agent needs to read a page. For an
          agent outside n8n, the same capabilities ship as an{' '}
          <Link href='/integrations/mcp'>MCP server</Link>.
        </div>
      </>
    )
  },
  {
    question: 'What if the option I need is not in the list?',
    answer: (
      <>
        <div>
          The node exposes 58 options, and Additional Query Parameters covers
          everything else: any{' '}
          <Link href='/docs/api/getting-started/overview'>
            Microlink API parameter
          </Link>{' '}
          as a key and a value, dot notation included. Those entries are applied
          last, so they override whatever the options set.
        </div>
      </>
    )
  },
  {
    question: 'Is it open source?',
    answer: (
      <>
        <div>
          Yes. The node lives at{' '}
          <Link href={REPOSITORY_URL}>microlinkhq/n8n-nodes-microlink</Link>{' '}
          under the MIT license, and is published to npm from CI with a
          provenance statement.
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
