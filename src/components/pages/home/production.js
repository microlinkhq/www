import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import { theme, layout } from 'theme'
import Subhead from 'components/elements/Subhead'
import Caption from 'components/patterns/Caption/Caption'

import React from 'react'

const CARD_SHADOW = '0 6px 20px rgba(16,24,40,0.04)'

const FEATURES = [
  {
    icon: 'cloud2',
    title: 'Powerful & scalable',
    description:
      'Autoscaling infrastructure that absorbs traffic spikes. Go from one request to millions without changing your code.'
  },
  {
    icon: 'costless',
    title: 'Cost efficient',
    description:
      'Pay only for what you use. Optimized architecture keeps the price per request low as you scale.'
  },
  {
    icon: 'cdn',
    title: 'Global CDN',
    description:
      'Responses served from edge locations around the world, so requests stay fast wherever your users are.'
  },
  {
    icon: 'developer',
    title: 'Developer first',
    description:
      'Clear docs, predictable responses, and SDKs for every major language. Integrate in minutes, not days.'
  },
  {
    icon: 'programmable',
    title: 'Fully programmable',
    description:
      'Query parameters cover the common cases. Custom browser code covers everything else.'
  },
  {
    icon: 'declarative',
    title: 'Declarative usage',
    description:
      'Describe what you want in a single GET request. No sessions, no state, no browser lifecycle to manage.'
  },
  {
    icon: 'hardware',
    title: 'Optimized hardware',
    description:
      'Modern CPUs and GPUs tuned for browser workloads, so rendering stays fast under load.'
  },
  {
    icon: 'cache',
    title: 'Built-in cache',
    description:
      'Repeated requests resolve from cache in milliseconds, with per-request control over freshness.'
  },
  {
    icon: 'security',
    title: 'Secure by design',
    description:
      'Every request runs in an isolated browser instance over TLS. Your traffic stays private.'
  }
]

const Production = () => (
  <Box
    as='section'
    id='features'
    css={theme({
      bg: 'white',
      color: 'black',
      pt: [4, 4, 5, 5]
    })}
  >
    <Box
      css={theme({
        maxWidth: layout.large,
        mx: 'auto',
        textAlign: 'center',
        px: 3
      })}
    >
      <Subhead>
        Production ready,
        <br />
        <Subhead variant='gradient' as='span'>
          browser as a service
        </Subhead>
      </Subhead>

      <Caption
        forwardedAs='div'
        css={theme({
          mx: 'auto',
          pt: [3, 3, 4, 4]
        })}
      >
        A managed pool of headless browsers behind a single API. We handle the
        scaling, the cache, and the CDN, so you never babysit Chrome again.
      </Caption>
    </Box>

    <Box
      css={theme({
        maxWidth: '1180px',
        mx: 'auto',
        mt: 5,
        px: [3, 3, 4],
        pb: 5,
        display: 'grid',
        gap: 4,
        gridTemplateColumns: [
          '1fr',
          'repeat(2, minmax(0, 1fr))',
          'repeat(3, minmax(0, 1fr))'
        ]
      })}
    >
      {FEATURES.map(({ icon, title, description }) => (
        <Box
          key={title}
          css={theme({
            bg: 'white',
            p: 4,
            border: 1,
            borderColor: 'gray2',
            borderRadius: 5,
            boxShadow: CARD_SHADOW
          })}
        >
          <Flex
            css={theme({
              alignItems: 'center',
              justifyContent: 'center',
              height: '168px',
              mb: 3
            })}
          >
            <Box
              as='img'
              src={`/images/icons/${icon}.png`}
              alt={title}
              loading='lazy'
              css={theme({
                maxHeight: '100%',
                maxWidth: '82%',
                objectFit: 'contain'
              })}
            />
          </Flex>
          <Text
            as='h3'
            css={theme({
              fontSize: 2,
              fontWeight: 'bold',
              lineHeight: 0,
              color: 'black'
            })}
          >
            {title}
          </Text>
          <Text
            as='p'
            css={theme({ mt: 2, fontSize: 1, lineHeight: 2, color: 'black70' })}
          >
            {description}
          </Text>
        </Box>
      ))}
    </Box>
  </Box>
)

export default Production
