import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import { theme, layout, SECTION_VERTICAL_SPACING } from 'theme'
import {
  HOME_CONTENT_WIDTH,
  CAPACITY_REQUESTS_PER_MONTH
} from 'components/pages/home/catalog'
import { CDN_EDGES } from 'helpers/cdn-edges'
import Subhead from 'components/elements/Subhead'
import Caption from 'components/patterns/Caption/Caption'

import React from 'react'

const FEATURES = [
  {
    icon: 'cloud2',
    title: 'Grows with you',
    description:
      'Capacity scales automatically with your traffic. One request or millions, a single script or a fleet of agents — no need to warn us before a spike.'
  },
  {
    icon: 'cdn',
    title: 'Fast everywhere',
    description: `Responses are served from ${CDN_EDGES} CDN edge locations close to your users, so requests stay quick anywhere in the world.`
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
      'Simple options cover the common cases. Custom browser code covers everything else.'
  },
  {
    icon: 'cache',
    title: 'Built-in cache',
    description:
      'Run the same request twice and the result comes back in milliseconds from the edge. A single ttl parameter controls how fresh it needs to be.'
  },
  {
    icon: 'security',
    title: 'Secure by design',
    description:
      'Every request runs in its own isolated browser over an encrypted connection. Your traffic stays private.'
  }
]

const Production = () => (
  <Box
    as='section'
    id='features'
    css={theme({
      bg: 'white',
      color: 'black',
      py: SECTION_VERTICAL_SPACING
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
      <Subhead variant='gradient'>Production-ready infrastructure</Subhead>

      <Caption
        forwardedAs='div'
        css={theme({
          mx: 'auto',
          pt: [3, 3, 4, 4]
        })}
      >
        From your first request to millions, the same infrastructure scales with
        you — we&rsquo;ve sustained {CAPACITY_REQUESTS_PER_MONTH} requests per
        month for a single customer. No maintenance, no capacity planning.
      </Caption>
    </Box>

    <Box
      css={theme({
        maxWidth: HOME_CONTENT_WIDTH,
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
            boxShadow: 2
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
