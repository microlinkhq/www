import { Cpu, Edit3, GitMerge, Package, Terminal, Zap } from 'react-feather'
import React from 'react'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Heading from 'components/elements/Heading'
import Meta from 'components/elements/Meta/Meta'
import Subhead from 'components/elements/Subhead'
import Text from 'components/elements/Text'
import { Link } from 'components/elements/Link'

import Caption from 'components/patterns/Caption/Caption'
import Layout from 'components/patterns/Layout'

import { borders, colors, layout, radii, shadows, theme } from 'theme'

const INTEGRATIONS = [
  {
    name: 'MCP',
    category: 'AI agents',
    description:
      'Give Claude, Cursor, Codex, and any MCP client a browser for screenshots, scraping, search, PDFs, and more.',
    href: '/integrations/mcp',
    icon: Cpu,
    accent: 'pink7'
  },
  {
    name: 'Microlink SDK',
    category: 'Developer tools',
    description:
      'Use every Microlink product through one semantic JavaScript API for Node.js, browsers, and Deno.',
    href: '/integrations/sdk',
    icon: Package,
    accent: 'blue7'
  },
  {
    name: 'CLI',
    category: 'Developer tools',
    description:
      'Run metadata, screenshot, Markdown, PDF, search, and the rest of the Microlink API from your terminal.',
    href: '/integrations/cli',
    icon: Terminal,
    accent: 'green7'
  },
  {
    name: 'n8n',
    category: 'Automation',
    description:
      'Capture website intelligence (screenshot, PDF, and Markdown) inside n8n workflows with a ready-to-use Microlink template.',
    href: 'https://n8n.io/workflows/16490-capture-website-intelligence-report-screenshot-pdf-and-markdown-with-microlink/',
    icon: GitMerge,
    accent: 'red7'
  },
  {
    name: 'Zapier',
    category: 'Automation',
    description:
      'Connect Microlink to thousands of apps on Zapier: screenshot, PDF, metadata, and Markdown actions inside any Zap.',
    href: 'https://zapier.com/apps/microlink/integrations',
    icon: Zap,
    accent: 'orange7'
  },
  {
    name: 'Component builder',
    category: 'Frontend',
    description:
      'Design a link preview and copy a zero-dependency component for React, Vue, Angular, Svelte, Astro, or vanilla JavaScript.',
    href: '/integrations/builder',
    icon: Edit3,
    accent: 'violet7'
  }
]

const CATEGORIES = [...new Set(INTEGRATIONS.map(({ category }) => category))]

const IntegrationCard = ({
  name,
  category,
  description,
  href,
  icon: Icon,
  accent
}) => (
  <Link
    href={href}
    css={theme({
      display: 'flex',
      flexDirection: 'column',
      color: 'black',
      bg: 'white',
      border: `${borders[1]} ${colors.black10}`,
      borderRadius: radii[3],
      boxShadow: shadows[0],
      p: [3, 3, 4, 4],
      textDecoration: 'none',
      transition: 'transform 150ms ease, box-shadow 150ms ease',
      ':hover': {
        color: 'black',
        boxShadow: shadows[2],
        transform: 'translateY(-2px)'
      },
      ':focus-visible': {
        outline: `2px solid ${colors[accent]}`,
        outlineOffset: '2px'
      }
    })}
  >
    <Flex
      css={theme({ alignItems: 'center', justifyContent: 'space-between' })}
    >
      <Flex
        css={theme({
          alignItems: 'center',
          justifyContent: 'center',
          width: 48,
          height: 48,
          color: accent,
          bg: 'black05',
          borderRadius: radii[2]
        })}
      >
        <Icon size={24} />
      </Flex>
      <Text
        css={theme({
          color: 'black50',
          fontSize: 0,
          fontWeight: 'bold',
          letterSpacing: '0.04em',
          textTransform: 'uppercase'
        })}
      >
        {category}
      </Text>
    </Flex>
    <Subhead
      forwardedAs='h2'
      css={theme({ fontSize: [2, 2, 3, 3], mt: 3, textAlign: 'left' })}
    >
      {name}
    </Subhead>
    <Text
      css={theme({
        color: 'black80',
        fontSize: [1, 1, 2, 2],
        lineHeight: 2,
        mt: 2
      })}
    >
      {description}
    </Text>
    <Text css={theme({ color: accent, fontWeight: 'bold', mt: 'auto', pt: 3 })}>
      Explore integration →
    </Text>
  </Link>
)

export const Head = () => (
  <Meta
    title='Integrations'
    description='Connect Microlink to AI agents, automation platforms, applications, frontend frameworks, and your terminal through MCP, n8n, Zapier, the SDK, CLI, and component builder.'
    structured={[
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        '@id': 'https://microlink.io/integrations',
        name: 'Microlink integrations',
        description:
          'Connect Microlink to AI agents, applications, frontend frameworks, and your terminal.',
        url: 'https://microlink.io/integrations',
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: INTEGRATIONS.map(
            ({ name, description, href }, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name,
              description,
              url: href.startsWith('http')
                ? href
                : `https://microlink.io${href}`
            })
          )
        }
      }
    ]}
  />
)

const IntegrationsPage = () => (
  <Layout>
    <Flex css={theme({ flexDirection: 'column', alignItems: 'center' })}>
      <Flex
        as='header'
        css={theme({
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: layout.large,
          px: [3, 3, 4, 4],
          textAlign: 'center'
        })}
      >
        <Heading>Integrations</Heading>
        <Caption
          forwardedAs='h2'
          css={theme({ pt: 2, maxWidth: layout.normal })}
        >
          Bring the web into the tools where you already build.
        </Caption>
        <Text
          css={theme({
            color: 'black80',
            fontSize: [1, 1, 2, 2],
            lineHeight: 2,
            maxWidth: layout.normal,
            pt: 3
          })}
        >
          Connect Microlink to AI agents, applications, frontend frameworks, and
          your terminal. Every integration runs on the same browser
          infrastructure and API.
        </Text>
        <Flex
          aria-label='Integration categories'
          css={theme({
            flexWrap: 'wrap',
            gap: 2,
            justifyContent: 'center',
            pt: 4
          })}
        >
          {CATEGORIES.map(category => (
            <Text
              key={category}
              css={theme({
                bg: 'black05',
                border: `${borders[1]} ${colors.black10}`,
                borderRadius: radii[4],
                color: 'black80',
                fontSize: 1,
                px: 3,
                py: 2
              })}
            >
              {category}
            </Text>
          ))}
        </Flex>
      </Flex>

      <Box
        as='main'
        css={theme({
          display: 'grid',
          gridTemplateColumns: [
            '1fr',
            '1fr',
            'repeat(2, 1fr)',
            'repeat(2, 1fr)'
          ],
          gap: 3,
          maxWidth: layout.large,
          px: [3, 3, 4, 4],
          py: [4, 4, 5, 5],
          width: '100%'
        })}
      >
        {INTEGRATIONS.map(integration => (
          <IntegrationCard key={integration.href} {...integration} />
        ))}
      </Box>

      <Box
        css={theme({
          borderTop: `${borders[1]} ${colors.black05}`,
          maxWidth: layout.large,
          px: [3, 3, 4, 4],
          py: [4, 4, 5, 5],
          textAlign: 'center',
          width: '100%'
        })}
      >
        <Subhead>Build directly with the API</Subhead>
        <Text css={theme({ color: 'black80', fontSize: [1, 1, 2, 2], mt: 2 })}>
          Prefer HTTP? Read the{' '}
          <Link href='/docs/api/getting-started/overview'>
            API documentation
          </Link>{' '}
          and make your first request.
        </Text>
      </Box>
    </Flex>
  </Layout>
)

export default IntegrationsPage
