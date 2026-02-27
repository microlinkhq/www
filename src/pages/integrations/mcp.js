import { borders, layout, colors, fonts, theme } from 'theme'
import { cdnUrl } from 'helpers/cdn-url'
import React, { useState, useMemo, useCallback } from 'react'

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
    description='Give Claude, Cursor, and any MCP client screenshots, PDFs, web scraping, markdown, and metadata extraction. One config block, nine browser tools, zero boilerplate.'
    image={cdnUrl('logo/banner.jpeg')}
    noSuffix
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
        thumbnailUrl: cdnUrl('logo/banner.jpeg'),
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
            name: 'What can my AI agent do with it?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Screenshot any URL, generate a PDF, convert a webpage to clean Markdown, pull normalized metadata, scrape custom fields with CSS selectors, extract video or audio sources, run a Lighthouse audit, detect a site's tech stack, and extract color palettes — all through natural language."
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
            name: 'How is this different from calling the Microlink API directly?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The Microlink API requires writing code. Microlink MCP lets your AI agent call the same API through natural language, with no code needed. MCP translates requests into Microlink API calls and returns structured results.'
            }
          },
          {
            '@type': 'Question',
            name: 'How do I install it?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The recommended way requires no installation — use npx directly in your MCP client config with @microlink/mcp as the command. Optionally, install globally with npm install -g @microlink/mcp and reference it via node with the absolute path to the local entry point.'
            }
          }
        ]
      }
    ]}
  />
)

const EXAMPLES = [
  {
    tool: 'screenshot',
    accent: '#7B61FF',
    prompt:
      'Screenshot the Stripe pricing page with a dark browser overlay and share it with the team',
    result:
      'A framed, browser-chrome PNG hosted on CDN — ready to paste into Notion or Slack.',
    span: 2
  },
  {
    tool: 'markdown',
    accent: '#00B4D8',
    prompt:
      'Read this research paper and summarise the key findings in bullet points',
    result:
      'Clean Markdown — 80 % fewer tokens than raw HTML — fed straight into the LLM context.'
  },
  {
    tool: 'extract',
    accent: '#067df7',
    prompt:
      'Scrape every pricing plan name and monthly price from this SaaS page',
    result:
      'Structured JSON with the exact fields you asked for, extracted via CSS selectors.'
  },
  {
    tool: 'pdf',
    accent: '#EA407B',
    prompt:
      'Convert this documentation page to an A4 PDF and send it to the client',
    result:
      'A print-ready PDF with full CSS rendering, hosted on CDN and available immediately.'
  },
  {
    tool: 'insights',
    accent: '#F59E0B',
    prompt:
      "Audit our competitor's homepage performance and tell me what stack they're running",
    result:
      'Lighthouse scores for performance, accessibility, SEO, plus tech-stack detection.'
  },
  {
    tool: 'palette',
    accent: '#10B981',
    prompt: 'What are the exact brand colors used on linear.app?',
    result:
      'Hex codes ranked by dominance, plus WCAG-contrast-safe background and overlay colors.'
  },
  {
    tool: 'video',
    accent: '#F43F5E',
    prompt:
      'Extract the playable video URL from this YouTube page so I can embed it',
    result:
      'A direct playable source URL — works with YouTube, Vimeo, TikTok, and hundreds more.',
    span: 2
  },
  {
    tool: 'meta',
    accent: '#F97316',
    prompt:
      'Fetch the title, OG image, and description for each of these 10 blog posts',
    result:
      'Normalized metadata for every URL — title, description, image, author, date, and favicon.'
  },
  {
    tool: 'text',
    accent: '#14B8A6',
    prompt:
      'Extract the plain text content of this article so I can count the words',
    result:
      'Raw readable text — no tags, no scripts, no noise — ready for analysis or summarisation.'
  },
  {
    tool: 'screenshot',
    accent: '#7B61FF',
    prompt:
      'Capture a mobile view of twitter.com to see how the layout looks on a phone screen',
    result:
      'A screenshot taken at 390 x 844 mobile viewport — identical to what a real iPhone sees.',
    hidden: true
  },
  {
    tool: 'audio',
    accent: '#D946EF',
    prompt:
      'Extract the audio stream from this SoundCloud track so I can embed it in our app',
    result:
      'A direct playable audio URL from SoundCloud — no API key, no scraping setup, no rate limits.'
  },
  {
    tool: 'extract',
    accent: '#067df7',
    prompt:
      'Get the metadata and a full-page screenshot of vercel.com in a single request',
    result:
      'Title, description, OG image, author, date — plus a screenshot URL — all in one call.',
    span: 2
  },
  {
    tool: 'screenshot',
    accent: '#7B61FF',
    prompt:
      'Screenshot the dark-mode version of our app at 1440 px wide for the design review',
    result:
      'A full desktop-width capture at the exact viewport you need — dark scheme applied, CDN-hosted.'
  },
  {
    tool: 'screenshot',
    accent: '#7B61FF',
    prompt:
      'Take a full-page screenshot of our landing page and export it as a JPEG',
    result:
      'A pixel-perfect full-page capture — every section, above and below the fold — as a JPEG URL.',
    hidden: true
  },
  {
    tool: 'screenshot',
    accent: '#7B61FF',
    prompt:
      'Screenshot only the hero section of linear.app using its CSS selector',
    result:
      'An element-level crop of exactly the DOM node you specified — nothing more, nothing less.',
    hidden: true
  },
  {
    tool: 'screenshot',
    accent: '#7B61FF',
    prompt:
      'Take a screenshot of our staging site with a browser overlay for the pitch deck',
    result:
      'A polished browser-framed PNG that looks great in presentations — one CDN link, no fuss.',
    hidden: true
  },
  {
    tool: 'markdown',
    accent: '#00B4D8',
    prompt:
      'Convert this Wikipedia article to Markdown so I can paste it into Notion',
    result:
      'Clean structured Markdown — headings, lists, links all preserved — ready to paste anywhere.',
    hidden: true
  },
  {
    tool: 'markdown',
    accent: '#00B4D8',
    prompt:
      'Turn this changelog page into Markdown and summarise what changed in the last release',
    result:
      'Parsed Markdown fed to the LLM, which returns a concise summary of the latest version changes.',
    hidden: true
  },
  {
    tool: 'markdown',
    accent: '#00B4D8',
    prompt:
      'Convert the React docs page to Markdown and find all the code examples',
    result:
      'Full-page Markdown with all code blocks intact — grep, filter, or pipe straight into your workflow.',
    hidden: true
  },
  {
    tool: 'extract',
    accent: '#067df7',
    prompt:
      'Find all the author names and publish dates from this blog index page',
    result:
      'An array of structured objects — one per article — with author and date fields extracted via selectors.',
    hidden: true
  },
  {
    tool: 'extract',
    accent: '#067df7',
    prompt:
      'Pull the job title, company, and LinkedIn URL from this profile page',
    result:
      'Structured JSON with every field you named — ready to push into your CRM or spreadsheet.',
    hidden: true
  },
  {
    tool: 'extract',
    accent: '#067df7',
    prompt:
      'Extract the product name, SKU, and price from each item on this e-commerce page',
    result:
      'A clean JSON array — one object per product — with all the fields you specified.',
    hidden: true
  },
  {
    tool: 'pdf',
    accent: '#EA407B',
    prompt: 'Export this invoice page as a PDF so I can send it to accounting',
    result:
      'A pixel-accurate PDF of the page at A4 size — fonts, tables, and layout fully rendered.',
    hidden: true
  },
  {
    tool: 'pdf',
    accent: '#EA407B',
    prompt:
      'Generate a landscape PDF of this analytics dashboard for the board meeting',
    result:
      'A landscape-format PDF at the exact dimensions you specified — charts, colors, and all.',
    hidden: true
  },
  {
    tool: 'pdf',
    accent: '#EA407B',
    prompt: 'Save this terms-of-service page as a PDF for our legal records',
    result:
      'A print-ready PDF with correct pagination, hosted on CDN and ready to download or share.',
    hidden: true
  },
  {
    tool: 'insights',
    accent: '#F59E0B',
    prompt:
      'Check our new landing page for accessibility issues before we ship',
    result:
      'Lighthouse accessibility score with every failing rule listed — fix before launch, not after.',
    hidden: true
  },
  {
    tool: 'insights',
    accent: '#F59E0B',
    prompt:
      'Run a performance audit on our checkout page and flag the biggest bottlenecks',
    result:
      'Core Web Vitals breakdown — LCP, FID, CLS — with actionable suggestions for each.',
    hidden: true
  },
  {
    tool: 'insights',
    accent: '#F59E0B',
    prompt:
      'Detect what CMS our competitor is running and what analytics tools they use',
    result:
      'A full Wappalyzer tech-stack report — CMS, CDN, analytics, A/B testing tools, and more.',
    hidden: true
  },
  {
    tool: 'palette',
    accent: '#10B981',
    prompt:
      'Extract the color palette from our hero image so I can build a matching UI',
    result:
      'Dominant hex codes from the image ranked by coverage — ready to drop into your design system.',
    hidden: true
  },
  {
    tool: 'palette',
    accent: '#10B981',
    prompt:
      'What background color would be safest to use on top of the main image on stripe.com?',
    result:
      'The WCAG-contrast-safe overlay color — guaranteed readable text on any image background.',
    hidden: true
  },
  {
    tool: 'palette',
    accent: '#10B981',
    prompt:
      'Give me the five most used colors on vercel.com so I can match our design',
    result:
      'Five dominant hex codes ranked by usage — with dark/light contrast-safe alternatives for each.',
    hidden: true
  },
  {
    tool: 'video',
    accent: '#F43F5E',
    prompt:
      'Get the direct MP4 URL from this Vimeo embed so I can cache it locally',
    result:
      'A direct, playable MP4 source URL — no embed, no JavaScript, no rate limits.',
    hidden: true
  },
  {
    tool: 'video',
    accent: '#F43F5E',
    prompt:
      'Extract the audio stream from this SoundCloud track so I can transcribe it',
    result:
      'A direct audio source URL from SoundCloud, Spotify, Mixcloud, or any supported platform.',
    hidden: true
  },
  {
    tool: 'video',
    accent: '#F43F5E',
    prompt:
      'Pull the video source from this TikTok so I can use it in our montage',
    result:
      'A watermark-free direct video URL from TikTok — ready to download or pipe into ffmpeg.',
    hidden: true
  },
  {
    tool: 'meta',
    accent: '#F97316',
    prompt:
      'Get the OG image and title for this URL so I can generate a link preview',
    result:
      'Open Graph image URL, title, and description — normalized and ready for your link preview component.',
    hidden: true
  },
  {
    tool: 'meta',
    accent: '#F97316',
    prompt:
      'Check if this article has an author and publication date set in its metadata',
    result:
      'Parsed author name and ISO date from the page meta tags — null if not present, never guessed.',
    hidden: true
  },
  {
    tool: 'meta',
    accent: '#F97316',
    prompt:
      "Pull the favicon URL from our competitor's site for the comparison table",
    result:
      'A direct favicon URL — upsized, normalized, and CDN-hosted — for any page you point at.',
    hidden: true
  },
  {
    tool: 'text',
    accent: '#14B8A6',
    prompt:
      'Pull the raw text from this job listing so I can parse requirements with an LLM',
    result:
      'Plain text stripped of all HTML — just the readable content, ready for LLM processing.',
    hidden: true
  },
  {
    tool: 'text',
    accent: '#14B8A6',
    prompt:
      'Extract the article body from this page without the nav or footer noise',
    result:
      'Main content only — navigation, headers, footers, and ads stripped out automatically.',
    hidden: true
  },
  {
    tool: 'text',
    accent: '#14B8A6',
    prompt:
      'Get the plain text of this product changelog so I can diff it against last month',
    result:
      'Raw text output — no markup, no scripts — ready to compare, diff, or feed into any tool.',
    hidden: true
  },
  {
    tool: 'audio',
    accent: '#D946EF',
    prompt:
      'Get the direct audio source from this Spotify episode so I can transcribe it',
    result:
      'A direct audio stream URL from Spotify — ready to pipe into Whisper or any transcription tool.',
    hidden: true
  },
  {
    tool: 'audio',
    accent: '#D946EF',
    prompt:
      'Pull the audio file from this podcast episode page so I can process it offline',
    result:
      'A direct MP3 or AAC URL from any podcast host — download, transcribe, or archive with no friction.',
    hidden: true
  },
  {
    tool: 'audio',
    accent: '#D946EF',
    prompt:
      'Extract the audio from this Mixcloud mix so I can add it to our playlist',
    result:
      'A direct playable source from Mixcloud — works with hundreds of audio platforms out of the box.',
    hidden: true
  }
]

const TOOLS = [
  { tool: 'screenshot', accent: '#7B61FF' },
  { tool: 'markdown', accent: '#00B4D8' },
  { tool: 'extract', accent: '#067df7' },
  { tool: 'pdf', accent: '#EA407B' },
  { tool: 'insights', accent: '#F59E0B' },
  { tool: 'palette', accent: '#10B981' },
  { tool: 'video', accent: '#F43F5E' },
  { tool: 'audio', accent: '#D946EF' },
  { tool: 'meta', accent: '#F97316' },
  { tool: 'text', accent: '#14B8A6' }
]

const examplesCss = `
  @keyframes ex-ball-on {
    0%   { transform: scale(1);    opacity: 0.35; box-shadow: none; }
    45%  { transform: scale(1.7);  opacity: 1; }
    75%  { transform: scale(0.85); }
    100% { transform: scale(1);    opacity: 1; box-shadow: 0 0 0 3px var(--card-accent), 0 0 10px var(--card-accent); }
  }
  @keyframes ex-tool-in {
    from { letter-spacing: 0; }
    to   { letter-spacing: 0.04em; }
  }
  @keyframes ex-card-in {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .ex-card {
    transition: box-shadow 0.25s ease;
    animation: ex-card-in 0.3s ease both;
  }
  .ex-card:hover {
    box-shadow: 0 2px 4px rgba(0,0,0,0.04), 0 12px 40px rgba(0,0,0,0.10), 0 24px 64px rgba(0,0,0,0.06);
  }
  .ex-ball {
    opacity: 0.35;
  }
  .ex-card:hover .ex-ball {
    animation: ex-ball-on 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }
  .ex-tool {
    transition: color 0.25s ease;
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
  .ex-pill:hover .ex-pill-dot,
  .ex-pill.active .ex-pill-dot {
    opacity: 1;
  }
`

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
        css={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '8px',
          marginTop: '32px',
          marginBottom: '8px'
        }}
      >
        {TOOLS.map(({ tool, accent }) => (
          <button
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
        css={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '14px',
          marginTop: '12px',
          '@media screen and (min-width: 600px)': {
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '16px'
          },
          '@media screen and (min-width: 768px)': {
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '18px'
          }
        }}
      >
        {visible.map((example, i) => (
          <Flex
            key={`${active}-${example.tool}-${i}`}
            className='ex-card'
            style={{
              '--card-accent': example.accent,
              animationDelay: `${i * 35}ms`
            }}
            css={{
              flexDirection: 'column',
              gridColumn: 'span 1',
              borderRadius: '12px',
              padding: '22px 24px',
              backgroundColor: 'white',
              border: `1px solid ${colors.black10}`,
              '@media screen and (min-width: 768px)': {
                gridColumn: example.span ? `span ${example.span}` : 'span 1'
              }
            }}
          >
            <Flex
              css={{ alignItems: 'center', gap: '8px', marginBottom: '16px' }}
            >
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
                borderTop: `1px solid ${colors.black10}`,
                paddingTop: '12px'
              }}
            >
              {example.result}
            </Text>
          </Flex>
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
      pb: [4, 4, 5, 5],
      borderTop: `${borders[1]} ${colors.black10}`,
      borderBottom: `${borders[1]} ${colors.black10}`
    })}
  >
    <Container
      css={theme({
        pt: [4, 4, 5, 5],
        alignItems: 'center',
        maxWidth: [layout.normal, layout.normal, layout.large, layout.large],
        px: [4, 4, 4, 4]
      })}
    >
      <Subhead variant='gradient' css={theme({ fontSize: [3, 3, 4, 4] })}>
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
