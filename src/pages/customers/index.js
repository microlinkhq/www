import { breakpoints, colors, textGradient, theme } from 'theme'
import React from 'react'
import styled from 'styled-components'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import { Link } from 'components/elements/Link'
import Meta from 'components/elements/Meta/Meta'
import SubheadBase from 'components/elements/Subhead'
import LineBreak from 'components/elements/LineBreak'
import Text from 'components/elements/Text'

import {
  BodyText,
  CUSTOMERS,
  DashedGridOverlay,
  Eyebrow,
  Section,
  SectionInner,
  StoryTag
} from 'components/patterns/CustomerStory'
import Layout from 'components/patterns/Layout'

import { cdnUrl } from 'helpers/cdn-url'

const ACCENT = {
  text: 'blue7',
  bgSoft: 'blue0',
  bgEdge: 'blue1',
  highlight: 'blue5'
}

const Hero = () => (
  <Section as='header' css={theme({ pt: [3, 3, 4, 4], pb: [3, 3, 4, 4] })}>
    <SectionInner>
      <Flex css={theme({ alignItems: 'center', gap: 2, pb: [3, 3, 4, 4] })}>
        <StoryTag accent={ACCENT}>Customers</StoryTag>
      </Flex>
      <Text
        as='h1'
        css={theme({
          color: 'black',
          fontWeight: 'bold',
          fontSize: ['32px', '40px', '52px', '60px'],
          textAlign: 'left',
          letterSpacing: '-0.01em',
          lineHeight: 0,
          m: 0,
          scrollMarginTop: 4
        })}
      >
        Companies shipping <LineBreak />
        with <span css={textGradient}>Microlink</span>
      </Text>
      <BodyText css={theme({ pt: [3, 3, 4, 4] })}>
        Real customer stories — how companies ship link previews, screenshots,
        and metadata with Microlink in production.
      </BodyText>
    </SectionInner>
  </Section>
)

const Grid = styled(Box)`
  display: grid;
  grid-template-columns: 1fr;
  ${theme({ gap: [3, 3, 4, 4] })}

  @media (min-width: ${breakpoints[1]}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${breakpoints[2]}) {
    grid-template-columns: repeat(3, 1fr);
  }
`

const Card = styled(Box)`
  ${theme({
    bg: 'white',
    border: 1,
    borderColor: 'black10',
    borderRadius: 3,
    p: [3, 3, 4, 4],
    display: 'flex',
    flexDirection: 'column',
    gap: 3
  })}
  box-shadow: 0 1px 2px ${colors.black05};
`

const CardLogo = styled('img')`
  ${theme({
    display: 'block',
    width: '40px',
    height: '40px',
    borderRadius: 2
  })}
  object-fit: cover;
`

const CardName = styled(Text)`
  ${theme({
    color: 'black',
    fontSize: 2,
    fontWeight: 'bold',
    lineHeight: 1
  })}
`

const CardBlurb = styled(Text)`
  ${theme({
    color: 'black70',
    fontSize: 1,
    lineHeight: 2
  })}
`

const CardLink = styled(Link)`
  ${theme({
    fontWeight: 'bold',
    fontSize: [0, 1, 1, 1]
  })}
  margin-top: auto;
`

const CustomerGrid = () => (
  <Section>
    <SectionInner>
      <Box css={theme({ pb: [3, 3, 4, 4] })}>
        <Eyebrow accent={ACCENT} css={theme({ pb: 2, display: 'block' })}>
          Customer stories
        </Eyebrow>
        <SubheadBase
          css={theme({
            fontSize: ['24px', '28px', '34px', '38px'],
            textAlign: 'left',
            letterSpacing: '-0.01em',
            lineHeight: 0
          })}
        >
          See how each team ships with Microlink
        </SubheadBase>
      </Box>

      <Grid>
        {CUSTOMERS.map(({ slug, name, blurb, icon }) => (
          <Card key={slug}>
            <Flex css={theme({ alignItems: 'center', gap: 2 })}>
              <CardLogo
                src={icon}
                alt=''
                width='40'
                height='40'
                loading='lazy'
                decoding='async'
              />
              <CardName>{name}</CardName>
            </Flex>
            <CardBlurb>{blurb}</CardBlurb>
            <CardLink
              href={`/customers/${slug}`}
              css={theme({ color: 'link' })}
            >
              Read story →
            </CardLink>
          </Card>
        ))}
      </Grid>
    </SectionInner>
  </Section>
)

const CustomersIndexPage = () => (
  <Layout css={theme({ position: 'relative' })}>
    <DashedGridOverlay aria-hidden='true' />
    <Box css={theme({ position: 'relative', zIndex: 1 })}>
      <Hero />
      <CustomerGrid />
    </Box>
  </Layout>
)

export const Head = () => (
  <Meta
    title='Customer stories: how teams ship with Microlink'
    description='Real teams using Microlink in production — link previews, screenshots, and metadata at scale.'
    image={cdnUrl('banner/screenshot.jpeg')}
    schemaType='WebPage'
  />
)

export default CustomersIndexPage
