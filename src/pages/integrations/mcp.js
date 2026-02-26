import { borders, layout, colors, fonts, theme } from 'theme'
import { cdnUrl } from 'helpers/cdn-url'
import React, { useRef, useEffect } from 'react'

import Box from 'components/elements/Box'
import Container from 'components/elements/Container'
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

const FEATURES = [
  {
    title: 'extract',
    description:
      'The Swiss Army knife. Pull metadata, scrape custom fields with CSS selectors, capture a screenshot, generate a PDF, extract video, run Lighthouse — all in one request.'
  },
  {
    title: 'screenshot',
    description:
      'Ask your AI to screenshot any page and get back a CDN URL in seconds. Full-page, device emulation, browser overlays, custom CSS/JS — every option the Microlink screenshot API offers.'
  },
  {
    title: 'pdf',
    description:
      'Turn any URL into a downloadable PDF on demand. Your AI controls paper size, margins, orientation, and page range — no headless browser setup required.'
  },
  {
    title: 'markdown',
    description:
      'Any webpage, clean Markdown output. 80% fewer tokens than raw HTML. Feed articles, docs, and research straight into your LLM context window.'
  },
  {
    title: 'text',
    description:
      'Extract plain text from any URL, stripping all HTML and formatting. The lightest option when all you need is raw readable content.'
  },
  {
    title: 'meta',
    description:
      'Fast, normalized metadata from any URL — title, description, author, date, image, and favicon. Lighter than extract when all you need are the basics.'
  },
  {
    title: 'video & audio',
    description:
      'Extract a direct playable source from any media page. Video works with YouTube, Vimeo, TikTok, Instagram, and hundreds of other platforms. Audio covers SoundCloud, Spotify, Mixcloud, and more.'
  },
  {
    title: 'palette',
    description:
      'Dominant color palette from any page images, ranked by coverage. Returns hex codes plus WCAG-contrast-safe background and overlay colors for design work.'
  },
  {
    title: 'insights',
    description:
      'Ask your AI to audit any site for performance, accessibility, SEO, and best practices via Lighthouse. Pairs with tech-stack detection via Wappalyzer.'
  }
]

const MCP_CONFIG_WITH_KEY = `{
  "mcpServers": {
    "microlink": {
      "command": "npx",
      "args": ["-y", "@microlink/mcp"],
      "env": {
        "MICROLINK_API_KEY": "your-api-key" // Optional - Free tier 50 reqs/day
      }
    }
  }
}`

const Hero = () => (
  <Flex
    as='section'
    css={theme({ flexDirection: 'column', alignItems: 'center' })}
  >
    <Heading
      css={theme({
        maxWidth: layout.large,
        textAlign: 'center',
        fontSize: [3, 4, 4, 5]
      })}
    >
      The web browser your AI agent never had
    </Heading>
    <Caption
      forwardedAs='h2'
      css={theme({
        pt: [3, 3, 4, 4],
        px: 4,
        maxWidth: layout.large
      })}
    >
      One config block gives Claude, Cursor, and any MCP client access to
      screenshots, PDFs, web scraping, markdown conversion, and metadata
      extraction. No API wrangling, no extra SDKs.
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

const Installation = () => (
  <Container
    as='section'
    id='installation'
    css={theme({
      alignItems: 'center',
      maxWidth: layout.small,
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
      <Terminal title='mcp.json'>{MCP_CONFIG_WITH_KEY}</Terminal>
      <Text
        css={theme({
          pt: 4,
          fontSize: [1, 1, 2, 2],
          color: 'black60',
          textAlign: ['center', 'center', 'left', 'left'],
          width: '100%'
        })}
      >
        Paste this into your MCP client config file.{' '}
        <Link href='https://claude.ai/download'>Claude Desktop</Link>,{' '}
        <Link href='https://cursor.com'>Cursor</Link>,{' '}
        <Link href='https://windsurf.com'>Windsurf</Link>, and every other
        MCP-compatible client get access immediately.
      </Text>
    </Flex>
  </Container>
)

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
      borderTop: `${borders[1]} ${colors.black10}`,
      borderBottom: `${borders[1]} ${colors.black10}`
    })}
  >
    <Flex
      css={theme({
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
      })}
    >
      <Subhead
        css={theme({
          mb: 3,
          textAlign: 'center',
          fontSize: [3, 4, 4, 4]
        })}
        variant='gradient'
      >
        Ask. Get. Done.
      </Subhead>
      <Text css={theme({ pb: [3, 3, 4, 4], fontSize: [1, 2, 3, 3] })}>
        Use the Microlink API through natural language.
      </Text>
      <Video
        src='https://cdn.microlink.io/mcp/codex.mp4'
        title='Microlink MCP in action'
        controls={false}
        css={theme({
          width: ['100%', '100%', layout.normal, layout.normal],
          mb: [3, 3, 4, 4],
          maxWidth: layout.normal,
          borderRadius: 3,
          boxShadow: '0 32px 80px rgba(0,0,0,0.1), 0 8px 24px rgba(0,0,0,0.1)'
        })}
      />
    </Flex>
  </Block>
)

const ProductInformation = () => (
  <Faq
    css={theme({
      py: [4, 4, 5, 5],
      borderTop: `${borders[1]} ${colors.black10}`,
      borderBottom: `${borders[1]} ${colors.black10}`
    })}
    questions={[
      {
        question: 'What is Microlink MCP?',
        answer: (
          <>
            <div>
              Microlink MCP is a Model Context Protocol server that gives AI
              assistants direct access to the Microlink API. Claude, Cursor,
              Windsurf, and any other MCP-compatible client can take
              screenshots, generate PDFs, scrape structured data, convert pages
              to markdown, and extract metadata — through natural language.
            </div>
            <div>
              MCP is an open standard for connecting AI applications to external
              tools. Microlink MCP implements that standard for browser and
              web-data capabilities.
            </div>
          </>
        )
      },
      {
        question: 'Do I need an API key?',
        answer: (
          <>
            <div>
              No API key required to get started. The free tier covers 50
              requests per day — enough to explore all ten tools.
            </div>
            <div>
              Add your <Link href='/#pricing'>Microlink API key</Link> when you
              need production volume, configurable TTL, custom headers, or proxy
              support.
            </div>
          </>
        )
      },
      {
        question: 'Which AI clients are supported?',
        answer: (
          <>
            <div>
              Any client that supports the Model Context Protocol works: Claude
              Desktop, Cursor, Windsurf, VS Code, Continue, and more. The same
              config block works everywhere.
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
        answer: (
          <>
            <div>
              Screenshot any URL, generate a PDF, convert a webpage to clean
              Markdown, pull normalized metadata, scrape custom fields with CSS
              selectors, extract video or audio sources, run a Lighthouse audit,
              detect a site&apos;s tech stack, and extract color palettes.
            </div>
            <div>
              All ten tools are available through natural language — no code, no
              API calls, no configuration beyond the initial setup.
            </div>
          </>
        )
      },
      {
        question: 'Is there a free tier?',
        answer: (
          <>
            <div>
              Yes. Start immediately with 50 free requests per day — no credit
              card, no signup required. All ten tools are available on the free
              tier.
            </div>
            <div>
              When you need more throughput or pro features, upgrade to a paid
              plan at any time from{' '}
              <Link href='/#pricing'>microlink.io/#pricing</Link>.
            </div>
          </>
        )
      },
      {
        question:
          'How is this different from calling the Microlink API directly?',
        answer: (
          <>
            <div>
              Calling the API directly means writing HTTP requests, handling
              auth, parsing responses, and wiring everything up in code.
              Microlink MCP removes all of that — your AI agent calls the same
              API through natural language, and structured results come back
              automatically.
            </div>
            <div>
              Use the API directly when you need full programmatic control. Use
              the MCP server when you want your AI assistant to handle web tasks
              on its own.
            </div>
          </>
        )
      },
      {
        question: 'How do I install it?',
        answer: (
          <>
            <div>
              The recommended way requires no installation. Use <code>npx</code>{' '}
              directly in your MCP client config:
            </div>
            <Terminal
              title='mcp.json'
              css={{ marginTop: '12px', marginBottom: '12px' }}
            >
              {
                '{\n  "mcpServers": {\n    "microlink": {\n      "command": "npx",\n      "args": ["-y", "@microlink/mcp"]\n    }\n  }\n}'
              }
            </Terminal>
            <div>
              Optionally, install globally to run it as a named command:
            </div>
            <Terminal
              title='Terminal'
              shellSymbol='$'
              css={{ marginTop: '12px', marginBottom: '12px' }}
            >
              npm install -g @microlink/mcp
            </Terminal>
            <div>
              And then reference it via <code>node</code> with the absolute path
              to the local entry point:
            </div>
            <Terminal
              title='mcp.json'
              css={{ marginTop: '12px', marginBottom: '12px' }}
            >
              {
                '{\n  "mcpServers": {\n    "microlink": {\n      "command": "node",\n      "args": ["/absolute/path/to/mcp/src/index.js"],\n      "env": {\n        "MICROLINK_API_KEY": "YOUR_MICROLINK_API_KEY"\n      }\n    }\n  }\n}'
              }
            </Terminal>
          </>
        )
      }
    ]}
  />
)

export const Head = () => (
  <Meta
    title='Microlink MCP — Web scraping & browser tools for AI agents'
    description='Give Claude, Cursor, and any MCP client access to screenshots, PDFs, web scraping, markdown conversion, and metadata extraction. One config block, nine browser tools, no boilerplate.'
    image={cdnUrl('logo/banner.jpeg')}
    structured={[
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        '@id': 'https://microlink.io/mcp',
        name: 'Microlink MCP',
        description:
          'An MCP server that gives Claude, Cursor, and any AI client access to screenshots, PDFs, web scraping, markdown conversion, and metadata extraction. One config block, nine browser tools.',
        url: 'https://microlink.io/mcp',
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
        ]
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        '@id': 'https://microlink.io/mcp#faq',
        url: 'https://microlink.io/mcp',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is Microlink MCP?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Microlink MCP is a Model Context Protocol server that connects AI agents to the Microlink API. It lets AI assistants like Claude and Cursor take screenshots, generate PDFs, convert pages to markdown, extract metadata, and scrape structured data from any website.'
            }
          },
          {
            '@type': 'Question',
            name: 'Do I need an API key?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'You can start using Microlink MCP without an API key. The free tier gives you enough requests to try out all capabilities. For production use, add your Microlink API key to unlock pro features.'
            }
          },
          {
            '@type': 'Question',
            name: 'Which AI clients are supported?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Microlink MCP works with any client that supports the Model Context Protocol, including Claude Desktop, Cursor, Windsurf, Continue, and more.'
            }
          },
          {
            '@type': 'Question',
            name: 'What can I do with Microlink MCP?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Take screenshots of any website, generate PDFs from URLs, convert webpages to clean markdown, extract metadata, and scrape custom data using CSS selectors — all through natural language.'
            }
          },
          {
            '@type': 'Question',
            name: 'Is there a free tier?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Microlink has a free tier that lets you use all API capabilities without a credit card. When you need more volume or pro features, upgrade to a paid plan at any time.'
            }
          },
          {
            '@type': 'Question',
            name: 'How is Microlink MCP different from using the API directly?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The Microlink API requires writing code. Microlink MCP lets your AI agent call the same API through natural language, with no code needed. MCP translates requests into Microlink API calls and returns structured results.'
            }
          },
          {
            '@type': 'Question',
            name: 'How do I install Microlink MCP?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Install globally with npm install -g @microlink/mcp, then add the MCP server configuration to your AI client settings file. See the GitHub repository for detailed setup instructions.'
            }
          }
        ]
      }
    ]}
  />
)

const EXAMPLES = [
  {
    tool: 'microlink_screenshot',
    prompt:
      'Screenshot the Stripe pricing page with a dark browser overlay and share it with the team',
    result:
      'A framed, browser-chrome PNG hosted on CDN — ready to paste into Notion or Slack.'
  },
  {
    tool: 'microlink_screenshot',
    prompt:
      'Take a full-page screenshot of our landing page and export it as a JPEG',
    result:
      'A pixel-perfect full-page capture — every section, above and below the fold — as a JPEG URL.'
  },
  {
    tool: 'microlink_screenshot',
    prompt:
      'Screenshot only the hero section of linear.app using its CSS selector',
    result:
      'An element-level crop of exactly the DOM node you specified — nothing more, nothing less.'
  },
  {
    tool: 'microlink_screenshot',
    prompt:
      'Capture a mobile view of twitter.com to see how the layout looks on a phone screen',
    result:
      'A screenshot taken at 390×844 mobile viewport — identical to what a real iPhone sees.'
  },
  {
    tool: 'microlink_screenshot',
    prompt:
      'Take a screenshot of our staging site with a light browser overlay for the pitch deck',
    result:
      'A polished browser-framed PNG that looks great in presentations — one CDN link, no fuss.'
  },
  {
    tool: 'microlink_extract',
    prompt:
      'Get the metadata and a full-page screenshot of vercel.com in a single request',
    result:
      'Title, description, OG image, author, date — plus a full-page screenshot URL — all in one call.'
  },
  {
    tool: 'microlink_markdown',
    prompt:
      'Read this research paper and summarise the key findings in 5 bullet points',
    result:
      'Clean Markdown output — 80% fewer tokens than raw HTML — fed straight into the LLM context.'
  },
  {
    tool: 'microlink_insights',
    prompt:
      "Audit our competitor's homepage performance and tell me what stack they're running",
    result:
      'Lighthouse scores for performance, accessibility, and SEO, plus Wappalyzer tech-stack detection.'
  },
  {
    tool: 'microlink_extract',
    prompt:
      'Scrape every pricing plan name and its monthly price from this SaaS page',
    result:
      'Structured JSON with the exact fields you asked for, extracted via CSS selectors.'
  },
  {
    tool: 'microlink_palette',
    prompt: 'What are the exact brand colors used on linear.app?',
    result:
      'Hex codes ranked by dominance, plus WCAG-contrast-safe background and overlay colors.'
  },
  {
    tool: 'microlink_pdf',
    prompt:
      'Convert this documentation page to an A4 PDF and send it to the client',
    result:
      'A print-ready PDF with full CSS rendering, hosted on CDN and available immediately.'
  },
  {
    tool: 'microlink_meta',
    prompt:
      'Fetch the title, OG image, and description for each of these 10 blog posts',
    result:
      'Normalized metadata for every URL — title, description, image, author, date, and favicon.'
  },
  {
    tool: 'microlink_text',
    prompt:
      'Extract the plain text content of this article so I can count the words',
    result:
      'Raw readable text — no tags, no scripts, no noise — ready for analysis or summarisation.'
  },
  {
    tool: 'microlink_screenshot',
    prompt:
      'Screenshot the dark-mode version of our app at 1440px wide for the design review',
    result:
      'A full desktop-width capture at the exact viewport you need — dark scheme applied, CDN-hosted.'
  }
]

const scrollbarHideCss = `
  .mcp-scroll-track { scrollbar-width: none; -ms-overflow-style: none; }
  .mcp-scroll-track::-webkit-scrollbar { display: none; }
`

const ExamplesScroll = () => {
  const trackRef = useRef(null)
  const isPaused = useRef(false)
  const rafRef = useRef(null)
  const posRef = useRef(0)

  useEffect(() => {
    const el = trackRef.current
    if (!el) return

    const step = () => {
      if (!isPaused.current) {
        posRef.current += 0.7
        const half = el.scrollWidth / 2
        if (posRef.current >= half) posRef.current = 0
        el.scrollLeft = Math.round(posRef.current)
      }
      rafRef.current = requestAnimationFrame(step)
    }

    rafRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <Box
      css={{
        marginTop: '40px',
        WebkitMaskImage:
          'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        maskImage:
          'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)'
      }}
    >
      <Flex
        ref={trackRef}
        className='mcp-scroll-track'
        onMouseEnter={() => {
          isPaused.current = true
        }}
        onMouseLeave={() => {
          isPaused.current = false
        }}
        onTouchStart={() => {
          isPaused.current = true
        }}
        onTouchEnd={() => {
          isPaused.current = false
        }}
        css={{
          overflowX: 'scroll',
          gap: '20px',
          paddingBottom: '8px',
          cursor: 'grab'
        }}
      >
        {[...EXAMPLES, ...EXAMPLES].map((example, i) => (
          <Flex
            key={i}
            css={theme({
              flexDirection: 'column',
              flexShrink: 0,
              width: ['320px', '420px', '500px', '520px'],
              border: 1,
              borderColor: 'black10',
              borderRadius: 3,
              px: [3, 3, 4, 4],
              py: [3, 3, 3, 3],
              bg: 'white'
            })}
          >
            <Text
              css={theme({
                fontFamily: fonts.mono,
                fontSize: 0,
                color: 'secondary',
                mb: 2
              })}
            >
              {example.tool}
            </Text>
            <Box
              css={theme({
                borderLeft: `3px solid ${colors.secondary}`,
                pl: 3,
                mb: 2,
                flex: 1
              })}
            >
              <Text
                css={theme({
                  fontSize: [1, 1, 1, 2],
                  color: 'black80',
                  fontStyle: 'italic'
                })}
              >
                &ldquo;{example.prompt}&rdquo;
              </Text>
            </Box>
            <Text css={theme({ fontSize: 1, color: 'black50' })}>
              {example.result}
            </Text>
          </Flex>
        ))}
      </Flex>
    </Box>
  )
}

const Examples = () => (
  <Box
    as='section'
    id='examples'
    css={theme({
      bg: 'pinky',
      pb: [4, 4, 5, 5],
      borderTop: `${borders[1]} ${colors.black10}`,
      borderBottom: `${borders[1]} ${colors.black10}`
    })}
  >
    <style>{scrollbarHideCss}</style>
    <Container
      css={theme({
        pt: [4, 4, 5, 5],
        alignItems: 'center',
        maxWidth: [layout.normal, layout.normal, layout.large, layout.large],
        px: [4, 4, 4, 0]
      })}
    >
      <Subhead variant='gradient' css={theme({ fontSize: [4, 4, 5, 5] })}>
        Unlock the web for your agents
      </Subhead>
      <Caption
        css={theme({
          pt: [3, 3, 4, 4],
          maxWidth: [layout.small, layout.small, layout.normal, layout.normal]
        })}
      >
        Even behind bot detection, cookie walls, and ads.
      </Caption>
    </Container>
    <ExamplesScroll />
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
        <Subhead css={{ width: '100%', textAlign: 'left' }}>
          Ten tools.{' '}
          <span
            css={{
              display: 'block',
              color: '#7B61FF',
              width: '100%',
              textAlign: 'left'
            }}
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
