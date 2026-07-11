import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import { theme, layout, SECTION_VERTICAL_SPACING } from 'theme'
import {
  CAPACITY_REQUESTS_PER_MONTH,
  HOME_CONTENT_WIDTH
} from 'components/pages/home/catalog'
import Subhead from 'components/elements/Subhead'
import Caption from 'components/patterns/Caption/Caption'

import React from 'react'

const FEATURES = [
  {
    icon: 'cloud2',
    title: 'Grows with you',
    description:
      'Capacity scales automatically with your traffic. One request or millions, a single script or a fleet of agents, everything keeps working.'
  },
  {
    icon: 'costless',
    title: 'Cost efficient',
    description:
      'Pay only for what you use. Smart engineering keeps the price per request low as you grow.'
  },
  {
    icon: 'cdn',
    title: 'Fast everywhere',
    description:
      'Results come from servers close to you, so requests stay quick anywhere in the world.'
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
    icon: 'declarative',
    title: 'Simple by design',
    description:
      'Say what you want in a single request. No setup, no sessions, nothing to maintain.'
  },
  {
    icon: 'hardware',
    title: 'Optimized hardware',
    description:
      'Modern hardware tuned for rendering web pages, so results stay fast even under heavy load.'
  },
  {
    icon: 'cache',
    title: 'Built-in cache',
    description:
      'Run the same request twice and the result comes back in milliseconds. You control how fresh it needs to be.'
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
      pt: SECTION_VERTICAL_SPACING
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
        From one request
        <br />
        <Subhead variant='gradient' as='span'>
          to millions
        </Subhead>
      </Subhead>

      <Caption
        forwardedAs='div'
        css={theme({
          mx: 'auto',
          pt: [3, 3, 4, 4]
        })}
      >
        Microlink is the infrastructure between your agents and the web: behind
        every request, a real browser in the cloud opens the page, does the
        work, and delivers the result. Agents retry, loop, and fan out in
        parallel; the platform is built to absorb exactly that traffic. Our
        largest customers process {CAPACITY_REQUESTS_PER_MONTH} requests a
        month, and nobody had to warn us first.
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
