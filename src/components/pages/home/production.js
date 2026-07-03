import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import { fonts, colors } from 'theme'
import styled from 'styled-components'
import React from 'react'

// "Production ready" wall: nine capability cards under a centered header. Each
// card pairs a pre-rendered 3D glyph (static/images/icons/*.png) with a title +
// blurb. The illustrations already bake in their own colored glow on a white
// field, so cards stay pure white and the PNGs blend edge to edge.

const SANS = fonts.sans

const tone = {
  ink: '#0b1220', // primary text
  muted: '#6b7280', // secondary text
  border: '#eef0f4', // card border
  surface: colors.white // card fill (matches the icons' white field)
}

// headline accent: magenta→violet→blue sweep
const HEAD_GRADIENT = 'linear-gradient(90deg,#e0479e,#8b5cf6 52%,#3e55ff)'

const SHADOW_INK = '16, 24, 40'
const shadow = {
  card: `0 6px 20px rgba(${SHADOW_INK},0.04)`
}

const radius = { card: '22px' }

// title, blurb + icon filename (served from static/ at /images/icons/*.png)
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

/* --------------------------------- header -------------------------------- */

const Section = styled.section`
  background: ${tone.surface};
  font-family: ${SANS};
  color: ${tone.ink};
  padding-top: 40px;
  -webkit-font-smoothing: antialiased;
`

const Heading = styled.h2`
  font-size: clamp(34px, 6vw, 64px);
  line-height: 1.03;
  font-weight: 800;
  letter-spacing: -0.02em;
  margin: 0;
  color: ${tone.ink};

  .grad {
    display: block;
    background: ${HEAD_GRADIENT};
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
`

const Subtitle = styled.p`
  font-size: clamp(17px, 2.2vw, 21px);
  line-height: 1.5;
  color: ${tone.muted};
  font-weight: 400;
  max-width: 640px;
  margin: 22px auto 0;
`

/* ---------------------------------- grid --------------------------------- */

const Grid = styled.div`
  max-width: 1180px;
  margin: 56px auto 0;
  padding: 0 clamp(16px, 4vw, 28px) 72px;
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(3, minmax(0, 1fr));

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`

const Card = styled(Box)`
  background: ${tone.surface};
  border: 1px solid ${tone.border};
  border-radius: ${radius.card};
  padding: 28px 28px 32px;
  box-shadow: ${shadow.card};
`

const IconWrap = styled(Flex)`
  align-items: center;
  justify-content: center;
  height: 168px;
  margin-bottom: 20px;
`

const Icon = styled.img`
  max-height: 100%;
  max-width: 82%;
  object-fit: contain;
`

const Title = styled(Text).attrs({ as: 'h3' })`
  font-size: 21px;
  font-weight: 700;
  line-height: 1.2;
  color: ${tone.ink};
`

const Desc = styled(Text).attrs({ as: 'p' })`
  font-size: 15px;
  line-height: 1.5;
  color: ${tone.muted};
  margin-top: 8px;
`

/* --------------------------------- section ------------------------------- */

const Production = () => (
  <Section id='features'>
    <Box
      css={{
        maxWidth: '900px',
        margin: '0 auto',
        textAlign: 'center',
        padding: '0 24px'
      }}
    >
      <Heading>
        Production ready,
        <span className='grad'>browser as a service</span>
      </Heading>

      <Subtitle>
        Microlink gives you a full-stack browser automation platform designed
        for real-world scale. Built to be fast, reliable, and effortless to
        integrate, so you can ship with confidence.
      </Subtitle>
    </Box>

    <Grid>
      {FEATURES.map(({ icon, title, description }) => (
        <Card key={title}>
          <IconWrap>
            <Icon
              src={`/images/icons/${icon}.png`}
              alt={title}
              loading='lazy'
            />
          </IconWrap>
          <Title>{title}</Title>
          <Desc>{description}</Desc>
        </Card>
      ))}
    </Grid>
  </Section>
)

export default Production
