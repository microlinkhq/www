import { breakpoints, theme } from 'theme'
import React from 'react'
import styled from 'styled-components'

import Box from 'components/elements/Box'
import Subhead from 'components/elements/Subhead'

import {
  Caption,
  Eyebrow,
  FeatureCard,
  FEATURES,
  Section,
  SectionInner
} from 'components/patterns/FeatureStory'

const Grid = styled(Box)`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  ${theme({ gap: [3, 3, 3, 3] })}

  @media (min-width: ${breakpoints[1]}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`

export const FeaturesGrid = () => (
  <Section id='features' css={theme({ scrollMarginTop: 4 })}>
    <SectionInner>
      <Box css={theme({ textAlign: 'center', pb: [4, 4, 5, 5] })}>
        <Eyebrow css={theme({ pb: 3, display: 'block' })}>Engineering</Eyebrow>
        <Subhead>The principles behind every Microlink product.</Subhead>
        <Caption
          forwardedAs='p'
          titleize={false}
          css={theme({
            pt: [3, 3, 3, 3],
            mx: 'auto',
            maxWidth: '36em',
            color: 'black70'
          })}
        >
          Scraping, proxy, caching, headers, and security aren’t bolted onto one
          product — they’re shared primitives every Microlink request can use.
        </Caption>
      </Box>

      <Grid>
        {FEATURES.map(feature => (
          <FeatureCard key={feature.slug} feature={feature} />
        ))}
      </Grid>
    </SectionInner>
  </Section>
)
