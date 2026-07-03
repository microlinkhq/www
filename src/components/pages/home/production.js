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
      'Auto-scale infrastructure built for massive workloads. Handle millions of requests with ease.'
  },
  {
    icon: 'costless',
    title: 'Costless solution',
    description:
      'Optimized architecture and smart resource management deliver more value at a fraction of the cost.'
  },
  {
    icon: 'cdn',
    title: 'Global CDN',
    description:
      'Distributed worldwide with a global CDN to ensure speed, reliability, and low latency wherever you are.'
  },
  {
    icon: 'developer',
    title: 'Developer first',
    description:
      'Built by developers, for developers. Intuitive APIs, clear docs, and SDKs that make integration a breeze.'
  },
  {
    icon: 'programmable',
    title: 'Fully programmable',
    description:
      'Integrate with your stack. Use your favorite language and build exactly what you need.'
  },
  {
    icon: 'declarative',
    title: 'Declarative usage',
    description:
      'Simple, declarative API. Get results with a single request and spend less time on integration.'
  },
  {
    icon: 'hardware',
    title: 'Optimized hardware',
    description:
      'High-performance infrastructure with modern CPUs and GPUs optimized for browser workloads.'
  },
  {
    icon: 'cache',
    title: 'Built-in cache',
    description:
      'Intelligent caching layer for instant responses and reduced load. Because speed matters.'
  },
  {
    icon: 'security',
    title: 'Security compliance',
    description:
      'Enterprise-grade security with compliance standards you can trust. Your data is in safe hands.'
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
          mt: 4
        })}
      >
        Microlink gives you a full-stack browser automation platform designed
        for real-world scale. Built to be fast, reliable, and effortless to
        integrate, so you can ship with confidence.
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
