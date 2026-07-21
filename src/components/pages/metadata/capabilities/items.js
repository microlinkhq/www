import React from 'react'
import styled from 'styled-components'
import { space, theme } from 'theme'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import { ACCENT } from '../shared'

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
        <path d='M9 4H8a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2 2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h1' />
        <path d='M15 4h1a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2 2 2 0 0 0-2 2v4a2 2 0 0 1-2 2h-1' />
      </svg>
    ),
    title: 'Every source merged, zero parsing',
    description: (
      <>
        Open Graph, Twitter Cards, JSON-LD, oEmbed, microdata, RDFa, and HTML
        tags combined into <b>one unified schema</b>. Stop writing{' '}
        <b>per-site fallback logic</b> and ship consistent previews at scale.
      </>
    )
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
        <rect x='3' y='3' width='18' height='18' rx='2' />
        <circle cx='9' cy='9' r='2' />
        <path d='m21 15-5-5L5 21' />
      </svg>
    ),
    title: 'Brand-ready visuals out of the box',
    description: (
      <>
        Get high-resolution images, logos, favicons, and the{' '}
        <b>dominant color palette</b> for every URL — perfect for{' '}
        <b>rich link cards and theming</b> without manual art direction.
      </>
    )
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
        <path d='M13 2 3 14h9l-1 8 10-12h-9l1-8z' />
      </svg>
    ),
    title: 'Real browser, SPA-ready rendering',
    description: (
      <>
        Every request runs in a <b>real headless Chrome session</b> that
        executes JavaScript, hydrates SPAs, and waits for selectors — so you get
        accurate metadata from dynamic pages that <b>plain scrapers miss</b>.
      </>
    )
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
        <path d='M2 12h20' />
        <path d='M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z' />
      </svg>
    ),
    title: 'Production-grade edge infrastructure',
    description: (
      <>
        Global CDN caching, automatic retries, and <b>99.9% uptime</b> handle
        the scraping complexity for you — with a{' '}
        <b>free tier of 25 requests per day</b> to get started.
      </>
    )
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
    flexShrink: 0
  })};
  color: ${ACCENT};
`

export const CapabilityList = () => (
  <Flex
    css={[
      theme({ gap: [3, 3, 3, 4], width: '100%' }),
      {
        flexDirection: 'column',
        '@media (min-width: 768px) and (max-width: 1199px)': {
          flexDirection: 'row',
          flexWrap: 'wrap',
          '& > *': { width: 'calc(50% - 12px)' }
        }
      }
    ]}
  >
    {CAPABILITIES.map(({ icon, title, description }) => (
      <CapabilityItem key={title}>
        <CapabilityIcon>{icon}</CapabilityIcon>
        <Flex css={theme({ flexDirection: 'column', gap: 1 })}>
          <Text
            css={theme({
              fontWeight: 'bold',
              fontSize: [1, 1, 2, 2]
            })}
          >
            {title}
          </Text>
          <Text
            css={theme({
              fontSize: [0, 0, 1, 1],
              color: 'black70',
              lineHeight: 2
            })}
          >
            {description}
          </Text>
        </Flex>
      </CapabilityItem>
    ))}
  </Flex>
)
