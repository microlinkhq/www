import { borders, layout, colors, theme } from 'theme'
import { cdnUrl } from 'helpers/cdn-url'
import React from 'react'

import Box from 'components/elements/Box'
import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import Heading from 'components/elements/Heading'
import Image from 'components/elements/Image/Image'
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
    title: 'Screenshots from AI agents',
    description:
      'Capture pixel-perfect screenshots of any website directly from Claude, Cursor, or any MCP-compatible client. No browser automation setup required.'
  },
  {
    title: 'PDF generation',
    description:
      'Generate PDFs from any URL through your AI assistant. Full control over paper size, margins, orientation, and page ranges — all via natural language.'
  },
  {
    title: 'Web to markdown',
    description:
      'Convert any webpage to clean, structured markdown optimized for LLM context windows. 80% fewer tokens than raw HTML.'
  },
  {
    title: 'Metadata extraction',
    description:
      'Extract structured metadata from any URL — title, description, author, date, images, and logos. Normalized and ready to use.'
  },
  {
    title: 'Web scraping',
    description:
      'Extract structured data from any website using CSS selectors. Scrape custom fields, lists, and nested data without writing a single line of code.'
  },
  {
    title: 'Works with any MCP client',
    description:
      'Compatible with Claude Desktop, Cursor, Windsurf, and any tool that supports the Model Context Protocol. One install, every client.'
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
      Browser superpowers for AI agents
    </Heading>
    <Caption
      forwardedAs='h2'
      css={theme({
        pt: [3, 3, 4, 4],
        px: 4,
        maxWidth: layout.large
      })}
    >
      Screenshots, PDFs, markdown, metadata, and web scraping — accessible from
      Claude, Cursor, or any MCP client. One install, every AI tool.
    </Caption>
    <Flex css={theme({ pt: [3, 3, 4, 4], fontSize: [2, 2, 3, 3] })}>
      <ArrowLink
        css={theme({ pr: [2, 4, 4, 4] })}
        href='/docs/api/getting-started/mcp'
      >
        Get Started
      </ArrowLink>
      <ArrowLink href='https://github.com/microlinkhq/mcp'>
        See on GitHub
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
        Add the following configuration to your client's settings file. Works
        with <Link href='https://claude.ai/download'>Claude Desktop</Link>,{' '}
        <Link href='https://cursor.com'>Cursor</Link>,{' '}
        <Link href='https://windsurf.com'>Windsurf</Link>, and any other
        MCP-compatible client.
      </Text>
    </Flex>
  </Container>
)

const About = () => (
  <Container
    as='section'
    id='about'
    css={theme({
      alignItems: 'center',
      maxWidth: [layout.normal, layout.normal, layout.large, layout.large],
      pb: [3, 3]
    })}
  >
    <Subhead css={theme({ px: [3, 3, 0, 0] })} variant='gradient'>
      The entire Microlink API, inside your AI
    </Subhead>
    <Caption
      css={theme({
        pt: [3, 3, 4, 4],
        px: [4, 4, 4, 0],
        maxWidth: [layout.small, layout.small, layout.normal, layout.normal]
      })}
    >
      <b>Microlink MCP</b> is a Model Context Protocol server that gives AI
      agents direct access to the Microlink API. Your AI assistant can take
      screenshots, generate PDFs, convert pages to markdown, extract metadata,
      and scrape structured data — all through natural language.
    </Caption>

    <Block
      blockOne={
        <Image
          css={theme({
            px: [4, 0, 0, 0],
            width: ['100%', 6, 7, 8]
          })}
          alt='AI-powered browser automation'
          src='https://cdn.microlink.io/illustrations/genius-idea.svg'
        />
      }
      blockTwo={
        <Flex
          css={theme({
            px: [4, 0, 0, 0],
            flexDirection: 'column',
            alignItems: 'baseline'
          })}
        >
          <Subhead
            css={theme({
              pt: [3, 3, 3, 0],
              fontSize: [2, 2, 3, 3],
              textAlign: 'left'
            })}
          >
            Natural language, real results
          </Subhead>
          <Text css={theme({ pt: [2, 2, 3, 3], maxWidth: 8 })}>
            Ask your AI to &quot;take a screenshot of example.com&quot; or
            &quot;extract the metadata from this article&quot; and get back
            structured, production-quality output. No API calls to write, no
            SDKs to configure.
          </Text>
        </Flex>
      }
    />

    <Block
      flexDirection='row-reverse'
      blockTwo={
        <Flex
          css={theme({
            px: [4, 0, 0, 0],
            flexDirection: 'column',
            alignItems: 'baseline'
          })}
        >
          <Subhead
            css={theme({
              pt: [3, 3, 3, 0],
              fontSize: [2, 2, 3, 3],
              textAlign: 'left'
            })}
          >
            One server, every capability
          </Subhead>
          <Text css={theme({ pt: [2, 2, 3, 3], maxWidth: 8 })}>
            Screenshots, PDFs, markdown conversion, metadata extraction, and web
            scraping — all from a single MCP server. No need to install separate
            tools for each task.
          </Text>
        </Flex>
      }
      blockOne={
        <Image
          css={theme({
            px: [4, 0, 0, 0],
            width: ['100%', 6, 7, 8]
          })}
          alt='Unified browser capabilities'
          src='https://cdn.microlink.io/illustrations/robots.svg'
        />
      }
    />

    <Block
      blockOne={
        <Image
          css={theme({
            px: [4, 0, 0, 0],
            width: ['100%', 6, 7, 8]
          })}
          alt='Works with any MCP client'
          src='https://cdn.microlink.io/illustrations/abstract-page-is-under-construction.svg'
        />
      }
      blockTwo={
        <Flex
          css={theme({
            px: [4, 0, 0, 0],
            flexDirection: 'column',
            alignItems: 'baseline'
          })}
        >
          <Subhead
            css={theme({
              pt: [3, 3, 3, 0],
              fontSize: [2, 2, 3, 3],
              textAlign: 'left'
            })}
          >
            Any MCP client, zero config
          </Subhead>
          <Text css={theme({ pt: [2, 2, 3, 3], maxWidth: 8 })}>
            Works with Claude Desktop, Cursor, Windsurf, and every
            MCP-compatible tool. Add the config once, and every client gets
            access to the full Microlink API.
          </Text>
        </Flex>
      }
    />
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
          pb: [4, 4, 5, 5],
          textAlign: 'center',
          fontSize: [3, 3, 4, 4]
        })}
        variant='gradient'
      >
        See it in action
      </Subhead>
      {/* TODO: Replace with a real screenshot/video of MCP in use inside Claude or Cursor */}
      <Image
        css={theme({
          width: ['100%', '100%', layout.normal, layout.normal],
          maxWidth: layout.normal
        })}
        alt='Microlink MCP in action'
        src='https://cdn.microlink.io/illustrations/abstract-2.svg'
      />
    </Flex>
  </Block>
)

const ProductInformation = () => (
  <Faq
    css={theme({
      py: [4, 4, 5, 5],
      bg: 'pinky',
      borderTop: `${borders[1]} ${colors.black10}`,
      borderBottom: `${borders[1]} ${colors.black10}`
    })}
    questions={[
      {
        question: 'What is Microlink MCP?',
        answer: (
          <>
            <div>
              Microlink MCP is a Model Context Protocol server that connects AI
              agents to the Microlink API. It lets AI assistants like Claude and
              Cursor take screenshots, generate PDFs, convert pages to markdown,
              extract metadata, and scrape structured data from any website.
            </div>
            <div>
              MCP is an open standard that allows AI applications to securely
              access external tools and data sources.
            </div>
          </>
        )
      },
      {
        question: 'Do I need an API key?',
        answer: (
          <>
            <div>
              You can start using Microlink MCP without an API key. The free
              tier gives you enough requests to try out all capabilities.
            </div>
            <div>
              For production use or higher volume, you can add your Microlink
              API key to unlock pro features like configurable TTL, custom
              headers, and higher rate limits.
            </div>
          </>
        )
      },
      {
        question: 'Which AI clients are supported?',
        answer: (
          <>
            <div>
              Microlink MCP works with any client that supports the Model
              Context Protocol, including Claude Desktop, Cursor, Windsurf,
              Continue, and more.
            </div>
            <div>
              As MCP adoption grows, Microlink MCP will work with every new
              client automatically — no updates needed.
            </div>
          </>
        )
      },
      {
        question: 'What can I do with it?',
        answer: (
          <>
            <div>
              Take screenshots of any website, generate PDFs from URLs, convert
              webpages to clean markdown, extract metadata (title, description,
              images, author), and scrape custom data using CSS selectors.
            </div>
            <div>
              All capabilities are available through natural language — just ask
              your AI assistant.
            </div>
          </>
        )
      },
      {
        question: 'Is there a free tier?',
        answer: (
          <>
            <div>
              Yes. Microlink has a free tier that lets you use all API
              capabilities without a credit card. It&apos;s the best way to get
              started and test the MCP integration.
            </div>
            <div>
              When you need more volume or pro features, upgrade to a paid plan
              at any time.
            </div>
          </>
        )
      },
      {
        question: 'How is it different from using the Microlink API directly?',
        answer: (
          <>
            <div>
              The Microlink API requires writing code — HTTP requests, SDK
              calls, and parameter configuration. Microlink MCP lets your AI
              agent call the same API through natural language, with no code
              needed.
            </div>
            <div>
              Under the hood, MCP translates your AI&apos;s requests into
              Microlink API calls and returns structured results.
            </div>
          </>
        )
      },
      {
        question: 'How do I install it?',
        answer: (
          <>
            <div>
              Install globally with <code>npm install -g @microlink/mcp</code>,
              then add the MCP server configuration to your AI client&apos;s
              settings file.
            </div>
            <div>
              See the{' '}
              <Link href='https://github.com/microlinkhq/mcp'>
                GitHub repository
              </Link>{' '}
              for detailed setup instructions for each supported client.
            </div>
          </>
        )
      }
    ]}
  />
)

export const Head = () => (
  <Meta
    title='Microlink MCP — Browser superpowers for AI agents'
    description='Screenshots, PDFs, markdown, metadata, and web scraping for Claude, Cursor, and any MCP client. Install the Microlink MCP server and give your AI agent access to the full Microlink API.'
    image={cdnUrl('logo/banner.jpeg')}
    structured={[
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        '@id': 'https://microlink.io/mcp',
        name: 'Microlink MCP',
        description:
          'Model Context Protocol server that gives AI agents access to screenshots, PDFs, markdown conversion, metadata extraction, and web scraping via the Microlink API.',
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

const McpPage = () => (
  <Layout>
    <Hero />
    <Installation />
    <MediaPlaceholder />
    <Features
      css={theme({ px: 4, py: [5, 5, 6, 6] })}
      title={
        <Subhead css={{ width: '100%', textAlign: 'left' }}>
          Every Microlink capability,{' '}
          <span
            css={{
              display: 'block',
              color: '#7B61FF',
              width: '100%',
              textAlign: 'left'
            }}
          >
            at your AI&apos;s fingertips.
          </span>
        </Subhead>
      }
      caption={
        <>
          Give your AI agent the full power of the Microlink API — screenshots,
          PDFs, markdown, metadata, and scraping — with a single MCP server
          install. See the{' '}
          <Link href='/docs/api/getting-started/mcp'>documentation</Link> to get
          started.
        </>
      }
      features={FEATURES}
    />
    <ProductInformation />
  </Layout>
)

export default McpPage
