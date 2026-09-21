import { borders, layout, colors, fonts, radii, theme } from 'theme'
import React, { useState, useMemo, useCallback, useRef } from 'react'

import Box from 'components/elements/Box'
import CodeCopy from 'components/elements/Codecopy'
import Container from 'components/elements/Container'
import InputIcon from 'components/elements/Input/InputIcon'
import Flex from 'components/elements/Flex'
import Heading from 'components/elements/Heading'
import Video from 'components/elements/Video/Video'
import { Link } from 'components/elements/Link'
import Meta from 'components/elements/Meta/Meta'
import Subhead from 'components/elements/Subhead'
import Text from 'components/elements/Text'
import Terminal from 'components/elements/Terminal/Terminal'

import ArrowLink from 'components/patterns/ArrowLink'
import Block from 'components/patterns/Block/Block'
import Caption from 'components/patterns/Caption/Caption'
import Faq from 'components/patterns/Faq/Faq'
import Features from 'components/patterns/Features/Features'
import Layout from 'components/patterns/Layout'
import { HeroEditorTabs } from 'components/patterns/MultiCodeEditor/hero-editor-tabs'
import { ProseTable, TableCard } from 'components/patterns/ProductStory/table'
import { UNAVATAR_FALLBACK, UNAVATAR_TOKEN } from 'helpers/unavatar'

const FEATURES = [
  {
    title: 'screenshot',
    description:
      'Ask your AI to screenshot any page and get back a CDN URL in seconds. Full-page, element crops, animated capture, device emulation, browser overlays, custom CSS/JS.'
  },
  {
    title: 'pdf',
    description:
      'Turn any URL into a downloadable PDF on demand. Your AI controls paper size, margins, orientation, scale, and page range — no headless browser setup required.'
  },
  {
    title: 'markdown',
    description:
      'Any webpage, clean Markdown output. 80% fewer tokens than raw HTML. Feed articles, docs, and research straight into your LLM context window.'
  },
  {
    title: 'extract',
    description:
      'The power tool. Scrape custom fields with CSS selectors and compose a screenshot, a PDF, and metadata in a single request. Structured JSON back.'
  },
  {
    title: 'metadata',
    description:
      'Fast, normalized metadata from any URL — title, description, author, date, and image. Plus a dedicated logo tool for pulling brand assets.'
  },
  {
    title: 'video & audio',
    description:
      'Extract a direct playable source from any media page. Video covers YouTube, Vimeo, TikTok, and Instagram; audio covers SoundCloud, Spotify, Mixcloud, and more.'
  },
  {
    title: 'search',
    description:
      'Google as structured data. Ranked results, knowledge graph, people-also-ask, and related searches — across news, images, videos, places, and shopping.'
  },
  {
    title: 'function',
    description:
      "Run your own JavaScript inside Microlink's server-side browser sandbox. Automate the clicks, scrolls, and scraping the API doesn't cover out of the box."
  },
  {
    title: 'technologies',
    description:
      'Detect the full stack behind any site via Wappalyzer — frameworks, CDNs, analytics, and e-commerce platforms your competitors are running.'
  },
  {
    title: 'lighthouse',
    description:
      'Audit any URL for performance, accessibility, best practices, and SEO with Google Lighthouse — every failing rule listed, before launch not after.'
  },
  {
    title: 'collect',
    description:
      'Pull every link, image, video, audio source, or email address off a page in one call. Absolute, deduped arrays — ready to crawl or archive.'
  },
  {
    title: 'embed',
    description:
      'Get the oEmbed-ready iframe for YouTube, Tweets, CodePen, and hundreds more — the markup plus the scripts it needs, no manual wiring.'
  }
]

const CLAUDE_CODE_INSTALL =
  'claude mcp add --transport stdio microlink -- npx -y @microlink/mcp'

const CHATGPT_INSTALL = 'codex mcp add microlink -- npx -y @microlink/mcp'

const MCP_CONFIG_NPX = `{
  "mcpServers": {
    "microlink": {
      "command": "npx",
      "args": ["-y", "@microlink/mcp"]
    }
  }
}`

const PROMPT_TAIL =
  'No API key is required for the free tier (25 requests/day). You can read the docs at https://microlink.io/docs/api/getting-started/mcp (source: https://github.com/microlinkhq/mcp). Then use Microlink MCP when you need screenshots, PDFs, markdown, metadata, or scraping from any URL.'

const commandPrompt = command =>
  `Install the Microlink MCP server. Run \`${command}\`. ${PROMPT_TAIL}`

const configPrompt = where =>
  `Install the Microlink MCP server. ${where}

${MCP_CONFIG_NPX}

${PROMPT_TAIL}`

const TabLogo = ({ domain }) => (
  <img
    alt=''
    width={16}
    height={16}
    decoding='async'
    src={`https://unavatar.io/domain/${domain}?token=${UNAVATAR_TOKEN}&fallback=${UNAVATAR_FALLBACK}`}
    style={{
      display: 'block',
      objectFit: 'contain',
      flexShrink: 0,
      borderRadius: radii[2]
    }}
  />
)

const INSTALL_TABS = [
  {
    label: 'Claude Code',
    icon: <TabLogo domain='claude.ai' />,
    hint: 'Run this in your terminal.',
    snippet: CLAUDE_CODE_INSTALL,
    prompt: commandPrompt(CLAUDE_CODE_INSTALL)
  },
  {
    label: 'ChatGPT',
    icon: <TabLogo domain='chatgpt.com' />,
    hint: 'Run this in your terminal.',
    snippet: CHATGPT_INSTALL,
    prompt: commandPrompt(CHATGPT_INSTALL)
  },
  {
    label: 'Cursor',
    icon: <TabLogo domain='cursor.com' />,
    hint: 'Add this to .cursor/mcp.json.',
    snippet: MCP_CONFIG_NPX,
    prompt: configPrompt('Add this to `.cursor/mcp.json`:')
  },
  {
    label: 'Other agents',
    hint: 'Add this to your MCP client config.',
    snippet: MCP_CONFIG_NPX,
    prompt: configPrompt('Add this to your MCP client config.')
  }
]

const MCP_CLIENTS = [
  ['https://code.claude.com/docs/en/mcp', 'Claude Code'],
  ['https://learn.chatgpt.com/docs/extend/mcp', 'ChatGPT'],
  ['https://cursor.com/docs/mcp', 'Cursor'],
  ['https://docs.windsurf.com/windsurf/cascade/mcp', 'Windsurf'],
  [
    'https://code.visualstudio.com/docs/copilot/customization/mcp-servers',
    'VS Code'
  ]
]

const NOTE_CSS = {
  m: 0,
  fontFamily: 'sans',
  fontSize: 0,
  lineHeight: 3,
  hyphens: 'none'
}

const InstallPanel = ({ hint, snippet }) => (
  <Box
    css={theme({
      fontFamily: 'sans',
      px: [3, 4],
      py: [3, 4],
      textAlign: 'left',
      whiteSpace: 'normal'
    })}
  >
    <Text
      css={theme({
        m: 0,
        color: 'black',
        fontFamily: 'sans',
        fontSize: 1,
        fontWeight: 'regular',
        letterSpacing: 0,
        lineHeight: 2
      })}
    >
      Install the Microlink MCP server.
    </Text>
    <Text
      css={theme({
        m: 0,
        mt: 1,
        color: 'black60',
        fontFamily: 'sans',
        fontSize: 0,
        lineHeight: 2
      })}
    >
      {hint}
    </Text>
    <Box
      css={theme({
        mt: 3,
        px: 3,
        py: 3,
        bg: 'gray1',
        border: 1,
        borderColor: 'black10',
        borderRadius: 2,
        overflow: 'auto'
      })}
    >
      <Text
        as='pre'
        css={theme({
          m: 0,
          color: 'black80',
          fontFamily: 'mono',
          fontSize: 0,
          letterSpacing: 0,
          lineHeight: 2,
          wordBreak: 'break-word',
          whiteSpace: 'pre-wrap'
        })}
      >
        {snippet}
      </Text>
    </Box>
    <Text css={theme({ ...NOTE_CSS, mt: 3, color: 'black60' })}>
      No API key needed for the free tier (25 requests/day).
    </Text>
    <Text css={theme({ ...NOTE_CSS, mt: 1, color: 'black50' })}>
      Then use it for screenshots, PDFs, markdown, metadata, or scraping any
      URL.
    </Text>
  </Box>
)

const Hero = () => (
  <Flex
    as='section'
    css={theme({ flexDirection: 'column', alignItems: 'center' })}
  >
    <Heading
      css={theme({
        mt: [3, 3, 0, 0],
        maxWidth: layout.normal,
        textAlign: 'center'
      })}
    >
      Give your agent the live web
    </Heading>
    <Caption
      forwardedAs='h2'
      titleize={false}
      css={theme({
        pt: [3, 3, 4, 4],
        px: 4,
        maxWidth: layout.small
      })}
    >
      One MCP config. Then screenshot, scrape, or convert any URL.
    </Caption>
    <Flex css={theme({ pt: [3, 3, 4, 4], fontSize: [2, 2, 3, 3] })}>
      <ArrowLink
        css={theme({ pr: [2, 4, 4, 4] })}
        href='/docs/api/getting-started/mcp'
      >
        Read the docs
      </ArrowLink>
      <ArrowLink href='https://github.com/microlinkhq/mcp'>
        View on GitHub
      </ArrowLink>
    </Flex>
  </Flex>
)

const Installation = () => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const active = INSTALL_TABS[selectedIndex]

  return (
    <Container
      as='section'
      id='installation'
      css={theme({
        alignItems: 'center',
        maxWidth: layout.normal,
        pt: [4, 4, 5, 5],
        mb: [4, 4, 4, 5]
      })}
    >
      <Flex
        css={theme({
          flexDirection: 'column',
          alignItems: ['center', 'center', 'flex-start', 'flex-start'],
          width: '100%',
          mt: [2, 2, 0]
        })}
      >
        <Terminal
          autoHeight
          blinkCursor={false}
          text={active.prompt}
          headerContent={
            <HeroEditorTabs
              examples={INSTALL_TABS}
              selectedIndex={selectedIndex}
              onSelect={setSelectedIndex}
              ariaLabel='MCP client'
              idPrefix='mcp-install-tab'
              controlsId='mcp-install-snippet'
            />
          }
          contentId='mcp-install-snippet'
          contentRole='tabpanel'
          contentLabelledBy={`mcp-install-tab-${selectedIndex}`}
        >
          <InstallPanel hint={active.hint} snippet={active.snippet} />
        </Terminal>
        <Text
          css={theme({
            pt: 4,
            fontSize: [1, 1, 2, 2],
            color: 'black60',
            textAlign: ['center', 'center', 'left', 'left'],
            width: '100%'
          })}
        >
          The prompt installs Microlink MCP and starts using it. No API key
          needed for the free tier (25 requests/day).
        </Text>
      </Flex>
    </Container>
  )
}

const MediaPlaceholder = () => (
  <Block
    forwardedAs='section'
    id='demo'
    flexDirection='column'
    css={theme({
      px: 4,
      py: [4, 4, 5, 5],
      width: '100%',
      bg: 'pinky',
      borderTop: 1,
      borderTopColor: 'black10',
      borderBottom: 1,
      borderBottomColor: 'black10'
    })}
  >
    <Flex
      css={theme({
        flexDirection: ['column', 'column', 'column', 'row'],
        alignItems: 'center',
        justifyContent: 'center',
        gap: [0, 0, 0, 5],
        width: '100%'
      })}
    >
      <Flex
        css={theme({
          flexDirection: 'column',
          alignItems: ['center', 'center', 'center', 'flex-start'],
          flex: '1 1 auto',
          minWidth: 0
        })}
      >
        <Subhead
          css={theme({
            mb: 3,
            textAlign: ['center', 'center', 'center', 'left']
          })}
          variant='gradient'
        >
          Ask. Get. Done.
        </Subhead>
        <Text
          css={theme({
            fontSize: [1, 2, 2, 3],
            textAlign: ['center', 'center', 'center', 'left']
          })}
        >
          Use the Microlink API through natural language.
        </Text>
        <Text
          css={theme({
            mt: 3,
            fontSize: [0, 1, 1, 2],
            textAlign: ['center', 'center', 'center', 'left'],
            maxWidth: '600px',
            color: 'black60'
          })}
        >
          Tell your AI what you need. It screenshots, scrapes, converts, and
          extracts — straight from the live web. Type a request. Get a result.
        </Text>
      </Flex>
      <Video
        src='https://cdn.microlink.io/mcp/claude.mp4'
        title='Microlink MCP in action'
        controls={false}
        css={theme({
          width: ['100%', '100%', '100%', '50%'],
          mt: [3, 3, 4, 0],
          maxWidth: ['100%', '100%', '750px', '900px'],
          borderRadius: 3,
          boxShadow: '0 32px 80px rgba(0,0,0,0.1), 0 8px 24px rgba(0,0,0,0.1)'
        })}
      />
    </Flex>
  </Block>
)

const FAQ_ITEMS = [
  {
    question: 'What is Microlink MCP?',
    text: 'Microlink MCP is a Model Context Protocol server that connects AI agents to the Microlink API. It lets AI assistants like Claude and Cursor take screenshots, generate PDFs, convert pages to markdown, extract metadata, and scrape structured data from any website.',
    answer: (
      <>
        <div>
          Microlink MCP is a Model Context Protocol server that gives AI
          assistants direct access to the Microlink API. Claude, Cursor,
          Windsurf, and any other MCP-compatible client can take screenshots,
          generate PDFs, scrape structured data, convert pages to markdown, and
          extract metadata — through natural language.
        </div>
        <div>
          MCP is an open standard for connecting AI applications to external
          tools. Microlink MCP implements that standard for browser and web-data
          capabilities.
        </div>
      </>
    )
  },
  {
    question: 'Which AI clients are supported?',
    text: 'Microlink MCP works with any client that supports the Model Context Protocol, including Claude Code, ChatGPT, Cursor, Windsurf, Continue, and more. Claude Code and ChatGPT install with one command; Cursor and every other client use the same config block.',
    answer: (
      <>
        <div>
          Any client that supports the Model Context Protocol works:{' '}
          {MCP_CLIENTS.map(([href, label], i) => (
            <React.Fragment key={href}>
              {i > 0 ? ', ' : null}
              <Link href={href} logoIcon>
                {label}
              </Link>
            </React.Fragment>
          ))}
          , and more.
        </div>
        <div>
          As new MCP-compatible tools ship, Microlink MCP works with them
          automatically — no updates needed on your end.
        </div>
      </>
    )
  },
  {
    question: 'What can my AI agent do with it?',
    text: "Screenshot any URL, generate a PDF, convert a webpage to clean Markdown or HTML, pull normalized metadata and brand logos, scrape custom fields with CSS selectors, extract video and audio sources, collect every link, image, and email, run a Lighthouse audit, detect a site's tech stack, search Google as structured data, and run custom JavaScript in a browser sandbox — all through natural language.",
    answer: (
      <>
        <div>
          Screenshot any URL, generate a PDF, convert a webpage to clean
          Markdown or HTML, pull normalized metadata and brand logos, scrape
          custom fields with CSS selectors, extract video and audio sources,
          collect every link, image, and email, run a Lighthouse audit, detect a
          site&apos;s tech stack, search Google as structured data, and run
          custom JavaScript in a browser sandbox.
        </div>
        <div>
          All twenty tools are available through natural language — no code, no
          API calls, no configuration beyond the initial setup.
        </div>
      </>
    )
  },
  {
    question: 'Do I need an API key?',
    text: 'You can start using Microlink MCP without an API key. The free tier covers 25 requests per day — enough to try out the toolset. The one exception is Search, which runs on paid plans and needs an API key. Add your Microlink API key for Search, production volume, or pro features.',
    answer: (
      <>
        <div>
          No API key required to get started. The free tier covers 25 requests
          per day — enough to explore the toolset. The one exception is Search,
          which runs on paid plans and needs an API key.
        </div>
        <div>
          Add your <Link href='/#pricing'>Microlink API key</Link> when you need
          Search, production volume, configurable TTL, custom headers, or proxy
          support.
        </div>
      </>
    )
  },
  {
    question: 'Is there a free tier?',
    text: 'Yes. Microlink has a free tier of 25 requests per day, no credit card required. Every tool except Search is available on the free tier; Search runs on paid plans. When you need more volume or pro features, ask MCP or a Microlink skill to log in or upgrade the account.',
    answer: (
      <>
        <div>
          Yes. Start immediately with 25 free requests per day — no credit card,
          no signup required. Every tool except Search is available on the free
          tier; Search runs on paid plans.
        </div>
        <div>
          When you need more throughput or pro features, ask MCP or a{' '}
          <Link href='/skills'>Microlink skill</Link> to log in or upgrade the
          account.
        </div>
      </>
    )
  },
  {
    question: 'How is this different from calling the Microlink API directly?',
    text: 'The Microlink API requires writing code. Microlink MCP lets your AI agent call the same API through natural language, with no code needed. MCP translates requests into Microlink API calls and returns structured results.',
    answer: (
      <>
        <div>
          Calling the API directly means writing HTTP requests, handling auth,
          parsing responses, and wiring everything up in code. Microlink MCP
          removes all of that — your AI agent calls the same API through natural
          language, and structured results come back automatically.
        </div>
        <div>
          Use the API directly when you need full programmatic control. Use the
          MCP server when you want your AI assistant to handle web tasks on its
          own.
        </div>
      </>
    )
  },
  {
    question: 'How is MCP different from a Microlink skill?',
    text: 'They overlap in what Microlink can do and differ in who runs the call. A skill is a playbook: markdown loaded into the agent so it can write microlink.screenshot(), npx microlink.io, or api.microlink.io itself. MCP is a runtime: the assistant invokes a tool such as microlink_screenshot, and @microlink/mcp hits the API. Use MCP to do Microlink in the assistant. Use a skill to teach the assistant to write Microlink. They compose, so install both when you chat with URLs and ship integration code.',
    answer: (
      <>
        <div>
          They overlap in what Microlink can do. They differ in who runs the
          call.
        </div>
        <div>
          A <Link href='/skills'>skill</Link> is a playbook. Markdown loaded
          into the agent so it can write <code>microlink.screenshot()</code>,{' '}
          <code>npx microlink.io</code>, or <code>api.microlink.io</code>{' '}
          itself. MCP is a runtime: the assistant invokes a tool such as{' '}
          <code>microlink_screenshot</code>, and <code>@microlink/mcp</code>{' '}
          hits the API.
        </div>
        <TableCard>
          <ProseTable>
            <thead>
              <tr>
                <Text as='th' scope='col'>
                  User wants
                </Text>
                <Text as='th' scope='col'>
                  Recommend
                </Text>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>“Screenshot this URL” in chat</td>
                <td>MCP</td>
              </tr>
              <tr>
                <td>“Add Microlink to my app, script, or CLI”</td>
                <td>
                  Skill (<Link href='/skills/microlink'>microlink</Link>)
                </td>
              </tr>
              <tr>
                <td>
                  “Query params or embed URL for an <code>&lt;img&gt;</code>”
                </td>
                <td>
                  Skill (<Link href='/skills/microlink-api'>microlink-api</Link>
                  )
                </td>
              </tr>
              <tr>
                <td>“Wire Microlink into Cursor or Claude as a tool”</td>
                <td>MCP</td>
              </tr>
              <tr>
                <td>“Buy a key from the assistant”</td>
                <td>MCP</td>
              </tr>
            </tbody>
          </ProseTable>
        </TableCard>
        <div>
          They compose. A coding agent with the skill generates SDK code. An
          assistant with MCP executes products without writing code. Install
          both when you chat with URLs and ship integration code.
        </div>
      </>
    )
  }
]

const ProductInformation = () => (
  <Faq
    css={theme({
      pt: [4, 4, 5, 5],
      pb: [4, 4, 5, 5],
      borderTop: 1,
      borderTopColor: 'black10',
      borderBottom: 1,
      borderBottomColor: 'black10'
    })}
    questions={FAQ_ITEMS}
  />
)

export const Head = () => (
  <Meta
    title='Microlink MCP — Web scraping & browser tools for AI agents'
    description='Give Claude, Cursor, and any MCP client screenshots, PDFs, web scraping, markdown, metadata, media extraction, Lighthouse audits, and Google search. One config block, twenty tools, zero boilerplate.'
    noSuffix
    structured={[
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        '@id': 'https://microlink.io/integrations/mcp',
        name: 'Microlink MCP',
        description:
          'An MCP server that gives Claude, Cursor, and any AI client access to screenshots, PDFs, web scraping, markdown conversion, metadata, media extraction, Lighthouse audits, and structured Google search. One config block, twenty tools.',
        url: 'https://microlink.io/integrations/mcp',
        applicationCategory: ['DeveloperApplication', 'API'],
        keywords: [
          'MCP server',
          'Model Context Protocol',
          'AI agent tools',
          'screenshot API MCP',
          'PDF generation MCP',
          'web to markdown MCP',
          'metadata extraction',
          'web scraping AI',
          'Claude MCP',
          'Cursor MCP',
          'Microlink MCP'
        ],
        about: [
          { '@type': 'Thing', name: 'Model Context Protocol' },
          { '@type': 'Thing', name: 'AI Agent Browser Automation' },
          { '@type': 'Thing', name: 'Screenshot API' },
          { '@type': 'Thing', name: 'PDF Generation' },
          { '@type': 'Thing', name: 'Web Scraping' },
          { '@type': 'Thing', name: 'Metadata Extraction' }
        ],
        provider: {
          '@type': 'Organization',
          '@id': 'https://microlink.io/about',
          name: 'Microlink',
          url: 'https://microlink.io'
        },
        isPartOf: {
          '@type': 'WebSite',
          '@id': 'https://microlink.io',
          url: 'https://microlink.io',
          name: 'Microlink'
        }
      },
      {
        '@context': 'https://schema.org',
        '@type': 'VideoObject',
        name: 'Microlink MCP in action',
        description:
          'See how Claude and other AI agents use Microlink MCP to take screenshots, convert pages to markdown, and scrape structured data through natural language.',
        thumbnailUrl: 'https://cdn.microlink.io/logo/banner.jpeg',
        contentUrl: 'https://cdn.microlink.io/mcp/codex.mp4',
        uploadDate: '2025-02-01',
        publisher: {
          '@type': 'Organization',
          name: 'Microlink',
          url: 'https://microlink.io'
        }
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        '@id': 'https://microlink.io/integrations/mcp#faq',
        url: 'https://microlink.io/integrations/mcp',
        mainEntity: FAQ_ITEMS.map(({ question, text }) => ({
          '@type': 'Question',
          name: question,
          acceptedAnswer: { '@type': 'Answer', text }
        }))
      }
    ]}
  />
)

const ACCENTS = {
  screenshot: '#7B61FF',
  pdf: '#EA407B',
  embed: '#6366F1',
  metadata: '#F97316',
  logo: '#F59E0B',
  markdown: '#00B4D8',
  html: '#0EA5E9',
  text: '#14B8A6',
  video: '#F43F5E',
  audio: '#D946EF',
  links: '#3B82F6',
  images: '#10B981',
  videos: '#FB7185',
  audios: '#C084FC',
  emails: '#06B6D4',
  technologies: '#A855F7',
  lighthouse: '#EAB308',
  search: '#22C55E',
  function: '#64748B',
  extract: '#067df7'
}

const EXAMPLES = [
  {
    tool: 'screenshot',
    prompt:
      'Screenshot the Stripe pricing page with a dark browser overlay and share it with the team',
    result:
      'A framed, browser-chrome PNG hosted on CDN — ready to paste into Notion or Slack.',
    span: 2
  },
  {
    tool: 'screenshot',
    prompt:
      'Take a full-page screenshot of our landing page and export it as a JPEG',
    result:
      'A pixel-perfect full-page capture — every section, above and below the fold — as a JPEG URL.',
    hidden: true
  },
  {
    tool: 'screenshot',
    prompt:
      'Screenshot only the hero section of linear.app using its CSS selector',
    result:
      'An element-level crop of exactly the DOM node you named — nothing more, nothing less.',
    hidden: true
  },
  {
    tool: 'screenshot',
    prompt:
      'Capture a mobile view of twitter.com at iPhone size for the design review',
    result:
      'A screenshot taken at 390 x 844 mobile viewport — identical to what a real iPhone sees.',
    hidden: true
  },
  {
    tool: 'pdf',
    prompt:
      'Convert this documentation page to an A4 PDF and send it to the client',
    result:
      'A print-ready PDF with full CSS rendering, hosted on CDN and available immediately.'
  },
  {
    tool: 'pdf',
    prompt:
      'Generate a landscape PDF of this analytics dashboard for the board meeting',
    result:
      'A landscape-format PDF at the exact dimensions you specified — charts, colors, and all.',
    hidden: true
  },
  {
    tool: 'pdf',
    prompt: 'Export this invoice page as a PDF so I can send it to accounting',
    result:
      'A pixel-accurate A4 PDF — fonts, tables, and layout fully rendered, ready to download.',
    hidden: true
  },
  {
    tool: 'embed',
    prompt: 'Give me the embeddable iframe for this YouTube video',
    result:
      'oEmbed-ready { html, scripts } — drop it straight into your page, no manual markup.'
  },
  {
    tool: 'embed',
    prompt:
      'Get the embed code for this Tweet so I can put it in our blog post',
    result:
      'The oEmbed HTML plus the script URLs it needs — rendered exactly like the source.',
    hidden: true
  },
  {
    tool: 'markdown',
    prompt:
      'Read this research paper and summarise the key findings in bullet points',
    result:
      'Clean Markdown — 80 % fewer tokens than raw HTML — fed straight into the LLM context.'
  },
  {
    tool: 'markdown',
    prompt:
      'Convert this Wikipedia article to Markdown so I can paste it into Notion',
    result:
      'Structured Markdown — headings, lists, links all preserved — ready to paste anywhere.',
    hidden: true
  },
  {
    tool: 'markdown',
    prompt:
      'Turn the React docs page into Markdown and find every code example',
    result:
      'Full-page Markdown with all code blocks intact — grep, filter, or pipe into your workflow.',
    hidden: true
  },
  {
    tool: 'html',
    prompt:
      'Get the raw HTML of this product page, scoped to the main article node',
    result:
      'The page HTML scoped to your selector — server-rendered by a real browser, ready to parse.'
  },
  {
    tool: 'html',
    prompt: 'Fetch the full HTML of this page after its JavaScript has run',
    result:
      'Fully-rendered HTML from a real browser — dynamic content included, not just the shell.',
    hidden: true
  },
  {
    tool: 'text',
    prompt:
      'Extract the plain text content of this article so I can count the words',
    result:
      'Raw readable text — no tags, no scripts, no noise — ready for analysis or summarisation.'
  },
  {
    tool: 'text',
    prompt:
      'Extract the article body from this page without the nav or footer noise',
    result:
      'Main content only — navigation, headers, footers, and ads stripped out automatically.',
    hidden: true
  },
  {
    tool: 'metadata',
    prompt:
      'Fetch the title, OG image, and description for each of these 10 blog posts',
    result:
      'Normalized metadata for every URL — title, description, image, author, date, and logo.'
  },
  {
    tool: 'metadata',
    prompt:
      'Check if this article has an author and publication date in its metadata',
    result:
      'Parsed author name and ISO date from the page meta — null if absent, never guessed.',
    hidden: true
  },
  {
    tool: 'metadata',
    prompt:
      'Get the OG image and title for this URL so I can build a link preview',
    result:
      'Open Graph image, title, and description — normalized for your link-preview component.',
    hidden: true
  },
  {
    tool: 'logo',
    prompt: 'Get the brand logo for stripe.com in a square shape',
    result:
      'The logo asset — url, type, and dimensions — with a square icon variant when you ask for one.'
  },
  {
    tool: 'logo',
    prompt:
      'Pull the logo of every company in this list for our comparison table',
    result:
      'A direct, CDN-hosted logo URL per site — normalized and ready to render.',
    hidden: true
  },
  {
    tool: 'video',
    prompt:
      'Extract the playable video URL from this YouTube page so I can embed it',
    result:
      'A direct playable source URL — works with YouTube, Vimeo, TikTok, and hundreds more.',
    span: 2
  },
  {
    tool: 'video',
    prompt:
      'Get the direct MP4 from this Vimeo embed so I can cache it locally',
    result:
      'A direct, playable MP4 source URL — no embed, no JavaScript, no rate limits.',
    hidden: true
  },
  {
    tool: 'video',
    prompt:
      'Pull the video source from this TikTok so I can use it in our montage',
    result:
      'A watermark-free direct video URL — ready to download or pipe into ffmpeg.',
    hidden: true
  },
  {
    tool: 'audio',
    prompt:
      'Extract the audio stream from this SoundCloud track so I can embed it',
    result:
      'A direct playable audio URL from SoundCloud — no API key, no scraping setup, no rate limits.'
  },
  {
    tool: 'audio',
    prompt:
      'Get the audio source from this Spotify episode so I can transcribe it',
    result:
      'A direct audio stream URL — ready to pipe into Whisper or any transcription tool.',
    hidden: true
  },
  {
    tool: 'links',
    prompt: 'Collect every link on this blog index page',
    result:
      'An array of absolute, deduped URLs — scope it to a CSS selector when you need a subset.'
  },
  {
    tool: 'links',
    prompt: 'Get all the outbound links from this documentation page',
    result:
      'Every <a href> on the page, resolved to absolute URLs and deduplicated.',
    hidden: true
  },
  {
    tool: 'images',
    prompt: 'Grab every image URL from this product gallery',
    result:
      'An array of absolute, deduped image URLs — scoped to a selector if you want just the gallery.'
  },
  {
    tool: 'images',
    prompt: 'Pull all the images from this article so I can archive them',
    result:
      'Every <img src> on the page, resolved to absolute URLs and deduplicated.',
    hidden: true
  },
  {
    tool: 'videos',
    prompt: 'List every video source embedded on this page',
    result:
      'An array of absolute, deduped <video>/<source> URLs — the whole page, not just the primary one.'
  },
  {
    tool: 'audios',
    prompt: 'Collect every audio file linked on this podcast page',
    result:
      'An array of absolute, deduped <audio>/<source> URLs from across the page.'
  },
  {
    tool: 'emails',
    prompt: "Find every email address on this company's contact page",
    result:
      'A deduped array of addresses — pulled from mailto: links and plain text alike.'
  },
  {
    tool: 'emails',
    prompt: 'Scrape all the emails from this conference speakers page',
    result:
      'Every address on the page, from links and body text, deduplicated.',
    hidden: true
  },
  {
    tool: 'technologies',
    prompt: "Detect what stack our competitor's site is running",
    result:
      'A Wappalyzer report — frameworks, CDNs, analytics, e-commerce platforms, and more.'
  },
  {
    tool: 'technologies',
    prompt: 'Tell me what CMS and analytics tools this site uses',
    result:
      'Detected technologies grouped by category — CMS, CDN, analytics, A/B testing.',
    hidden: true
  },
  {
    tool: 'lighthouse',
    prompt:
      'Audit our checkout page for performance and flag the biggest bottlenecks',
    result:
      'Lighthouse scores for performance, accessibility, best-practices, and SEO — with the failing rules.'
  },
  {
    tool: 'lighthouse',
    prompt:
      'Check our new landing page for accessibility issues before we ship',
    result:
      'The Lighthouse accessibility score with every failing rule listed — fix before launch, not after.',
    hidden: true
  },
  {
    tool: 'search',
    prompt:
      'Search Google for the top MCP servers and give me structured results',
    result:
      'Ranked results — title, url, description — plus knowledge graph and related searches. Needs an API key.',
    span: 2
  },
  {
    tool: 'search',
    prompt: 'Get the latest news about Anthropic as structured data',
    result:
      'News-vertical results with source and date — Google operators like site: work as-is. Needs an API key.',
    hidden: true
  },
  {
    tool: 'function',
    prompt: 'Run a script on this page to grab the price after the JS loads',
    result:
      "Your JavaScript executed in Microlink's server-side browser — the return value comes straight back."
  },
  {
    tool: 'function',
    prompt: 'Scroll this infinite feed and return every post title',
    result:
      'Custom browser automation in a sandbox — you write the function, we run it and return the value.',
    hidden: true
  },
  {
    tool: 'extract',
    prompt:
      'Scrape every pricing plan name and monthly price from this SaaS page',
    result:
      'Structured JSON with the exact fields you asked for, extracted via CSS selectors.',
    span: 2
  },
  {
    tool: 'extract',
    prompt:
      'Get the metadata and a full-page screenshot of vercel.com in one request',
    result:
      'Title, description, OG image — plus a screenshot URL — all composed in a single call.',
    hidden: true
  },
  {
    tool: 'extract',
    prompt: 'Pull the product name, SKU, and price for each item on this page',
    result:
      'A clean JSON array — one object per product — with every field you named.',
    hidden: true
  }
].map(example => ({ ...example, accent: ACCENTS[example.tool] }))

const TOOLS = [
  'screenshot',
  'pdf',
  'embed',
  'metadata',
  'logo',
  'markdown',
  'html',
  'text',
  'video',
  'audio',
  'links',
  'images',
  'videos',
  'audios',
  'emails',
  'technologies',
  'lighthouse',
  'search',
  'function',
  'extract'
].map(tool => ({ tool, accent: ACCENTS[tool] }))

const examplesCss = `
  @keyframes ex-tool-in {
    from { transform: scaleX(1); }
    to   { transform: scaleX(1.04); }
  }
  @keyframes ex-card-in {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .ex-tilt {
    --tilt-return: 1000ms;
    --tilt-return-ease: cubic-bezier(0.22, 1, 0.36, 1);
    --tilt-follow: 400ms;
    --tilt-follow-ease: cubic-bezier(0.22, 1, 0.36, 1);
    --tilt-glare-fade: 300ms;
    perspective: 1000px;
    animation: ex-card-in 0.3s ease both;
  }
  .ex-card {
    position: relative;
    transform: rotateX(var(--tilt-rx, 0deg)) rotateY(var(--tilt-ry, 0deg));
    transform-style: preserve-3d;
    transition: box-shadow 0.25s ease,
      transform var(--tilt-return) var(--tilt-return-ease);
  }
  .ex-card.is-tilting {
    transition: box-shadow 0.25s ease,
      transform var(--tilt-follow) var(--tilt-follow-ease);
    will-change: transform;
  }
  .ex-card:hover {
    box-shadow: 0 2px 4px rgba(0,0,0,0.04), 0 12px 40px rgba(0,0,0,0.10), 0 24px 64px rgba(0,0,0,0.06);
  }
  .ex-glare {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    pointer-events: none;
    opacity: 0;
    background: radial-gradient(circle 200px at var(--tilt-gx, 50%) var(--tilt-gy, 50%),
      var(--card-accent), transparent 70%);
    transition: opacity var(--tilt-glare-fade) ease;
  }
  .ex-tilt.is-hover .ex-glare {
    opacity: 0.1;
  }
  .ex-copy {
    opacity: 0;
    transition: opacity 0.2s ease;
  }
  .ex-card:hover .ex-copy {
    opacity: 1;
  }
  .ex-open {
    display: inline-flex;
    align-items: center;
    opacity: 0.5;
    border-radius: 4px;
    transition: opacity 0.2s ease;
  }
  .ex-open:hover,
  .ex-open:focus-visible {
    opacity: 1;
  }
  .ex-open:focus-visible,
  .ex-pill:focus-visible {
    outline: 2px solid var(--card-accent, var(--pill-accent, rgba(6,125,247,0.9)));
    outline-offset: 2px;
  }
  .ex-ball {
    opacity: 0.35;
  }
  .ex-tool {
    transition: color 0.25s ease;
    transform-origin: left center;
  }
  .ex-card:hover .ex-tool {
    color: var(--card-accent);
    animation: ex-tool-in 0.3s ease forwards;
  }
  .ex-pill {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 7px 12px;
    width: 100%;
    border-radius: 999px;
    border: 1px solid rgba(0,0,0,0.1);
    background: white;
    cursor: pointer;
    font-family: ${fonts.mono};
    font-size: 13px;
    color: rgba(0,0,0,0.55);
    transition: border-color 0.2s ease, color 0.2s ease, background-color 0.2s ease;
    user-select: none;
    appearance: none;
    outline: none;
  }
  .ex-pill:hover {
    border-color: var(--pill-accent, rgba(0,0,0,0.3));
    color: var(--pill-accent, rgba(0,0,0,0.8));
  }
  .ex-pill.active {
    border-color: var(--pill-accent, rgba(0,0,0,0.5));
    color: var(--pill-accent, rgba(0,0,0,0.8));
    background-color: var(--pill-bg, rgba(0,0,0,0.04));
  }
  .ex-pill-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    flex-shrink: 0;
    background-color: var(--pill-accent, rgba(0,0,0,0.3));
    opacity: 0.4;
    transition: opacity 0.2s ease;
  }
  .ex-pill.active .ex-pill-dot {
    opacity: 1;
  }
  @media (prefers-reduced-motion: reduce) {
    .ex-tilt,
    .ex-card,
    .ex-ball,
    .ex-tool,
    .ex-copy,
    .ex-open,
    .ex-pill,
    .ex-pill-dot {
      animation: none !important;
      transition: none !important;
    }
    .ex-card {
      transform: none !important;
    }
  }
`

const OPEN_IN = [
  {
    name: 'Claude',
    domain: 'claude.ai',
    href: prompt => `https://claude.ai/new?q=${encodeURIComponent(prompt)}`
  },
  {
    name: 'ChatGPT',
    domain: 'chatgpt.com',
    href: prompt => `https://chatgpt.com/?q=${encodeURIComponent(prompt)}`
  }
]

const NEEDS_API_KEY = new Set(['search'])

const mcpConfigLines = withKey => [
  '{',
  '  "mcpServers": {',
  '    "microlink": {',
  '      "command": "npx",',
  `      "args": ["-y", "@microlink/mcp"]${withKey ? ',' : ''}`,
  ...(withKey
    ? [
        '      "env": {',
        '        "MICROLINK_API_KEY": "your-api-key"',
        '      }'
      ]
    : []),
  '    }',
  '  }',
  '}'
]

const buildLaunchPrompt = (task, tool) => {
  const needsKey = NEEDS_API_KEY.has(tool)
  return [
    `Use the Microlink MCP server — specifically the \`microlink_${tool}\` tool — to do this:`,
    '',
    task,
    '',
    "If the Microlink MCP isn't installed yet, add it to your MCP client config and retry:",
    '',
    ...mcpConfigLines(needsKey),
    '',
    needsKey
      ? 'Search runs on paid plans, so it needs a Microlink API key — grab one at https://microlink.io/#pricing. Setup guide: https://microlink.io/integrations/mcp'
      : 'No API key needed for the free tier (25 requests/day). Setup guide: https://microlink.io/integrations/mcp'
  ].join('\n')
}

const TILT_MAX = 10

const ExampleCard = ({ example, delay }) => {
  const wrapRef = useRef(null)
  const cardRef = useRef(null)

  const handleMove = useCallback(e => {
    if (e.pointerType && e.pointerType !== 'mouse') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const wrap = wrapRef.current
    const card = cardRef.current
    if (!wrap || !card) return
    const r = wrap.getBoundingClientRect()
    const px = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width))
    const py = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height))
    wrap.classList.add('is-hover')
    card.classList.add('is-tilting')
    card.style.setProperty(
      '--tilt-ry',
      ((px - 0.5) * TILT_MAX).toFixed(2) + 'deg'
    )
    card.style.setProperty(
      '--tilt-rx',
      ((0.5 - py) * TILT_MAX).toFixed(2) + 'deg'
    )
    card.style.setProperty('--tilt-gx', (px * 100).toFixed(1) + '%')
    card.style.setProperty('--tilt-gy', (py * 100).toFixed(1) + '%')
  }, [])

  const handleLeave = useCallback(() => {
    const wrap = wrapRef.current
    const card = cardRef.current
    if (!wrap || !card) return
    wrap.classList.remove('is-hover')
    card.classList.remove('is-tilting')
    card.style.setProperty('--tilt-rx', '0deg')
    card.style.setProperty('--tilt-ry', '0deg')
  }, [])

  const launchPrompt = buildLaunchPrompt(example.prompt, example.tool)

  return (
    <Box
      ref={wrapRef}
      className='ex-tilt'
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={{ animationDelay: `${delay}ms` }}
      css={{
        gridColumn: 'span 1',
        '@media screen and (min-width: 768px)': {
          gridColumn: example.span ? `span ${example.span}` : 'span 1'
        }
      }}
    >
      <Flex
        ref={cardRef}
        className='ex-card'
        style={{ '--card-accent': example.accent }}
        css={{
          flexDirection: 'column',
          height: '100%',
          borderRadius: '12px',
          padding: '22px 24px',
          backgroundColor: 'white',
          border: borders[1],
          borderColor: colors.black10
        }}
      >
        <Flex css={{ alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <Box
            className='ex-ball'
            css={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: example.accent,
              flexShrink: 0
            }}
          />
          <Text
            className='ex-tool'
            css={{
              fontFamily: fonts.mono,
              fontSize: '13px',
              color: colors.black70
            }}
          >
            {example.tool}
          </Text>
          <Flex
            className='ex-actions'
            css={{ marginLeft: 'auto', alignItems: 'center', gap: '10px' }}
          >
            {OPEN_IN.map(client => (
              <a
                key={client.name}
                className='ex-open'
                href={client.href(launchPrompt)}
                target='_blank'
                rel='noopener noreferrer'
                aria-label={`Open this ${example.tool} prompt in ${client.name}`}
                title={`Open in ${client.name}`}
              >
                <InputIcon width='15px' height='15px' query={client.domain} />
              </a>
            ))}
            <div className='ex-copy'>
              <CodeCopy text={launchPrompt} />
            </div>
          </Flex>
        </Flex>
        <Text
          css={{
            fontSize: '17px',
            fontWeight: 500,
            color: colors.black80,
            lineHeight: 1.5,
            marginBottom: '16px',
            flex: 1,
            letterSpacing: '-0.01em'
          }}
        >
          &ldquo;{example.prompt}&rdquo;
        </Text>
        <Text
          css={{
            fontSize: '13px',
            color: colors.black40,
            lineHeight: 1.45,
            borderTop: borders[1],
            borderTopColor: colors.black10,
            paddingTop: '12px'
          }}
        >
          {example.result}
        </Text>
        <span className='ex-glare' aria-hidden='true' />
      </Flex>
    </Box>
  )
}

const ExamplesGrid = () => {
  const [active, setActive] = useState('all')
  const handlePillClick = useCallback(e => {
    const tool = e.currentTarget.dataset.tool
    setActive(curr => (curr === tool ? 'all' : tool))
  }, [])

  const visible = useMemo(
    () =>
      active === 'all'
        ? EXAMPLES.filter(e => !e.hidden)
        : EXAMPLES.filter(e => e.tool === active),
    [active]
  )

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: examplesCss }} />
      <Box
        css={theme({
          display: 'grid',
          gridTemplateColumns: [
            'repeat(2, 1fr)',
            'repeat(3, 1fr)',
            'repeat(5, 1fr)'
          ],
          gap: '8px',
          mt: '32px',
          mb: '8px'
        })}
      >
        {TOOLS.map(({ tool, accent }) => (
          <button
            type='button'
            key={tool}
            data-tool={tool}
            className={`ex-pill${active === tool ? ' active' : ''}`}
            style={{ '--pill-accent': accent, '--pill-bg': `${accent}14` }}
            onClick={handlePillClick}
          >
            <span className='ex-pill-dot' />
            {tool}
          </button>
        ))}
      </Box>
      <Box
        css={theme({
          display: 'grid',
          gridTemplateColumns: ['1fr', 'repeat(2, 1fr)', 'repeat(3, 1fr)'],
          gap: ['14px', '16px', '18px'],
          mt: '12px'
        })}
      >
        {visible.map((example, i) => (
          <ExampleCard
            key={`${active}-${example.prompt}`}
            example={example}
            delay={i * 35}
          />
        ))}
      </Box>
    </>
  )
}

const Examples = () => (
  <Box
    as='section'
    id='examples'
    css={theme({
      bg: 'pinky',
      pb: [5, 5, 6, 6],
      borderTop: 1,
      borderTopColor: 'black10',
      borderBottom: 1,
      borderBottomColor: 'black10'
    })}
  >
    <Container
      css={theme({
        pt: [5, 5, 6, 6],
        alignItems: 'center',
        maxWidth: [layout.normal, layout.normal, layout.large, layout.large],
        px: [4, 4, 4, 4]
      })}
    >
      <Subhead variant='gradient'>Unlock the web for your agents</Subhead>
      <Caption
        css={theme({
          pt: [3, 3, 4, 4],
          maxWidth: [layout.small, layout.small, layout.normal, layout.normal]
        })}
      >
        Even behind bot detection, cookie walls, and ads.
      </Caption>
      <ExamplesGrid />
    </Container>
  </Box>
)

const McpPage = () => (
  <Layout>
    <Hero />
    <Installation />
    <MediaPlaceholder />
    <Features
      css={theme({ px: 4, py: [5, 5, 6, 6] })}
      title={
        <Subhead css={theme({ width: '100%', textAlign: 'left' })}>
          Twenty tools.{' '}
          <span
            css={theme({
              display: 'block',
              color: '#7B61FF',
              width: '100%',
              textAlign: 'left'
            })}
          >
            Zero boilerplate.
          </span>
        </Subhead>
      }
      caption={
        <>
          Everything Microlink can do, available to your AI through natural
          language. No HTTP clients, no API keys on day one, no parsing layers.
          Read the{' '}
          <Link href='/docs/api/getting-started/mcp'>documentation</Link> to get
          started.
        </>
      }
      features={FEATURES}
    />
    <Examples />
    <ProductInformation />
  </Layout>
)

export default McpPage
