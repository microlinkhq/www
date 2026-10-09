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
    description:
      'In your self-hosted n8n instance, go to Settings, then Community Nodes.'
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
    description: 'Metadata and custom fields from any URL.',
    detail: (
      <>
        The default operation. Title, description, author, image and logo, plus
        your own <Link href='/docs/api/parameters/data'>extraction rules</Link>.
        See <Link href='/metadata'>metadata</Link>.
      </>
    )
  },
  {
    value: 'screenshot',
    name: 'Screenshot',
    icon: Camera,
    description: 'A screenshot of the page.',
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
    description: 'A PDF of the page.',
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
    description: 'The page content as Markdown.',
    detail: (
      <>
        Headings, lists and links preserved, ready for an LLM. See{' '}
        <Link href='/markdown'>URL to Markdown</Link>.
      </>
    )
  },
  {
    value: 'text',
    name: 'Text',
    icon: AlignLeft,
    description: 'The page content as plain text.',
    detail: (
      <>
        Every tag stripped, only the words left. See{' '}
        <Link href='/text'>URL to text</Link>.
      </>
    )
  },
  {
    value: 'audio',
    name: 'Audio',
    icon: Music,
    description: 'A playable audio source.',
    detail: (
      <>
        Podcast and music pages resolve to a direct audio URL. See{' '}
        <Link href='/media'>media extraction</Link>.
      </>
    )
  },
  {
    value: 'video',
    name: 'Video',
    icon: Film,
    description: 'A playable video source.',
    detail: (
      <>
        Video pages resolve to a direct, browser-friendly file, ready to embed
        or download. See <Link href='/media'>media extraction</Link>.
      </>
    )
  },
  {
    value: 'insights',
    name: 'Insights',
    icon: Activity,
    description: 'Performance scores and tech stack.',
    detail: (
      <>
        Lighthouse scores and the technologies behind a site, from the{' '}
        <Link href='/insights'>insights API</Link>.
      </>
    )
  },
  {
    value: 'logo',
    name: 'Logo',
    icon: Aperture,
    description: 'The logo and its color palette.',
    detail: (
      <>
        The brand mark behind a domain, plus its dominant colors. See the{' '}
        <Link href='/logo'>logo API</Link>.
      </>
    )
  }
]

export const RESPONSE_MODES = [
  {
    name: 'Auto',
    description: 'JSON, or the raw body when Embed picks a single field.'
  },
  { name: 'JSON', description: 'The full Microlink API response, every time.' },
  {
    name: 'Text',
    description: 'The raw response body, returned under a data field.'
  },
  {
    name: 'Binary',
    description:
      'The response body as a file on the item. Pair it with Embed to save the image or the PDF itself.'
  }
]

export const WORKFLOW_SNIPPET = `Operation:        Screenshot
URL:              {{ $json.url }}
Response Mode:    Binary
Binary Property:  data
Options:
  Embed:                 screenshot.url
  Screenshot Full Page:  true
  Viewport Width:        1280
  Wait Until:            networkidle0
  Ad Block:              true`

export const FAQ_ITEMS = [
  {
    question: 'What is the Microlink node for n8n?',
    text: 'n8n is a workflow tool where every step is a node. The Microlink node is one of those steps: give it a URL and it returns metadata, a screenshot, a PDF, Markdown, text, media sources, insights or a logo, so a workflow can read the web without a browser, a scraper or a server of your own. It is published as the MIT licensed community node n8n-nodes-microlink.',
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
    question: 'How do I install it?',
    text: 'On a self-hosted n8n instance, open Settings, then Community Nodes, enter n8n-nodes-microlink and install it. n8n Cloud only installs community nodes that n8n has verified, and this node is not on that list, so it needs a self-hosted instance.',
    answer: (
      <>
        <div>
          On a self-hosted n8n instance, open Settings, then Community Nodes,
          enter <code>n8n-nodes-microlink</code> and install it. Only the
          instance owner can install community nodes.
        </div>
        <div>
          n8n Cloud only installs community nodes that n8n has verified, and
          this node is not on that list, so it needs a self-hosted instance.
        </div>
      </>
    )
  },
  {
    question: 'Do I need an API key?',
    text: 'No. Without credentials the node calls the keyless endpoint, https://api.microlink.io, limited to 25 requests per day. Add a Microlink API credential and every request goes to https://pro.microlink.io with your key in the x-api-key header. n8n tests the credential when you save it.',
    answer: (
      <>
        <div>
          No. Without credentials the node calls the keyless endpoint,{' '}
          <code>https://api.microlink.io</code>, limited to 25 requests per day.
          Enough to build and test a workflow.
        </div>
        <div>
          Add a Microlink API credential and every request goes to{' '}
          <code>https://pro.microlink.io</code> with your key in the{' '}
          <code>x-api-key</code> header. n8n tests the credential when you save
          it. See <Link href='/pricing'>pricing</Link>.
        </div>
      </>
    )
  },
  {
    question: 'How do I save a screenshot or a PDF as a file?',
    text: 'Set the Embed option to screenshot.url or pdf.url, then set Response Mode to Binary. Embed makes the API answer with the file itself instead of JSON, and Binary attaches it to the item under the binary property you name, data by default. Any node that accepts binary input, such as a storage or an email node, takes it from there.',
    answer: (
      <>
        <div>
          Set the Embed option to <code>screenshot.url</code> or{' '}
          <code>pdf.url</code>, then set Response Mode to Binary. Embed makes
          the API answer with the file itself instead of JSON, and Binary
          attaches it to the item under the binary property you name, which
          defaults to <code>data</code>.
        </div>
        <div>
          Any node that accepts binary input, such as a storage or an email
          node, takes it from there.
        </div>
      </>
    )
  },
  {
    question: 'Can an n8n AI Agent use it as a tool?',
    text: 'Yes. The node is marked usable as a tool, so it can be attached to an n8n AI Agent and called when the agent needs to read a page. For an agent outside n8n, the same capabilities ship as an MCP server.',
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
    text: 'The node exposes 58 options, and Additional Query Parameters covers everything else: any Microlink API parameter as a key and a value, dot notation included. Those entries are applied last, so they override whatever the options set.',
    answer: (
      <>
        <div>
          The node exposes 58 options, and Additional Query Parameters covers
          everything else: any{' '}
          <Link href={DOCS_URL}>Microlink API parameter</Link> as a key and a
          value, dot notation included. Those entries are applied last, so they
          override whatever the options set.
        </div>
      </>
    )
  },
  {
    question: 'Is it open source?',
    text: 'Yes. The node lives at microlinkhq/n8n-nodes-microlink under the MIT license, and every release is published to npm from CI with a provenance statement.',
    answer: (
      <>
        <div>
          Yes. The node lives at{' '}
          <Link href={REPOSITORY_URL}>microlinkhq/n8n-nodes-microlink</Link>{' '}
          under the MIT license, and every release is published to npm from CI
          with a provenance statement.
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
