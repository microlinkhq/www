import React from 'react'
import styled from 'styled-components'
import { space, theme } from 'theme'
import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import { CDN_EDGES } from 'helpers/cdn-edges'

const CAPABILITIES = [
  {
    icon: (
      <svg
        width='20'
        height='20'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        aria-hidden='true'
      >
        <polyline points='22 12 18 12 15 21 9 3 6 12 2 12' />
      </svg>
    ),
    title: '80% fewer tokens',
    description:
      'Markdown reduces token usage by 80% compared to raw HTML. A 20,000-token page becomes 4,000 tokens — fit 5x more content into every LLM context window.'
  },
  {
    icon: (
      <svg
        width='20'
        height='20'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        aria-hidden='true'
      >
        <circle cx='11' cy='11' r='8' />
        <path d='M21 21l-4.35-4.35' />
      </svg>
    ),
    title: 'Flexible scope control',
    description:
      'Extract the whole page, narrow to a CSS selector like main or article, or combine multiple selectors with fallback arrays for precise content targeting.'
  },
  {
    icon: (
      <svg
        width='20'
        height='20'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        aria-hidden='true'
      >
        <path d='M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z' />
        <polyline points='14 2 14 8 20 8' />
        <line x1='16' y1='13' x2='8' y2='13' />
        <line x1='16' y1='17' x2='8' y2='17' />
        <polyline points='10 9 9 9 8 9' />
      </svg>
    ),
    title: 'YAML frontmatter metadata',
    description:
      'Enable the meta parameter to get title, author, date, description, word count, and reading time as structured YAML frontmatter prepended to the markdown output.'
  },
  {
    icon: (
      <svg
        width='20'
        height='20'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        aria-hidden='true'
      >
        <circle cx='12' cy='12' r='10' />
        <polyline points='12 6 12 12 16 14' />
      </svg>
    ),
    title: 'Sub-second cached responses',
    description: `Cached responses return in milliseconds from ${CDN_EDGES} Cloudflare edge locations. Configure TTL caching rules to keep your content fresh with minimal latency.`
  }
]

const CapabilityItem = styled(Flex)`
  ${theme({ gap: 2, alignItems: 'flex-start' })};
`

const CapabilityIcon = styled(Flex)`
  ${theme({
    width: space[4],
    height: space[4],
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    color: 'orange7'
  })};
`

export const CapabilityList = () => (
  <Box
    css={theme({
      display: 'grid',
      gridTemplateColumns: ['1fr', '1fr', '1fr 1fr', '1fr 1fr'],
      gap: [3, 3, 4, 4],
      width: ['100%', '100%', '85%', '80%'],
      mx: 'auto'
    })}
  >
    {CAPABILITIES.map(({ icon, title, description }) => (
      <CapabilityItem key={title}>
        <CapabilityIcon>{icon}</CapabilityIcon>
        <Flex css={theme({ flexDirection: 'column', gap: 1 })}>
          <Text
            as='h3'
            css={theme({
              fontWeight: 'bold',
              fontSize: [1, 1, 2, 2]
            })}
          >
            {title}
          </Text>
          <Text css={theme({ fontSize: [0, 0, 1, 1] })}>{description}</Text>
        </Flex>
      </CapabilityItem>
    ))}
  </Box>
)
