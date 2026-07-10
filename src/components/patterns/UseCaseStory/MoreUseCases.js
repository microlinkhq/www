import { breakpoints, colors, theme, shadows } from 'theme'
import React from 'react'
import styled from 'styled-components'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import { Link } from 'components/elements/Link'
import SubheadBase from 'components/elements/Subhead'
import Text from 'components/elements/Text'

import { Eyebrow } from 'components/patterns/CustomerStory/chrome'
import {
  SECTION_PX,
  SECTION_MAX_WIDTH,
  Section,
  SectionInner
} from 'components/patterns/CustomerStory/primitives'

import { USE_CASES } from './use-cases'

const CarouselTrack = styled(Flex)`
  ${theme({
    gap: [3, 3, 4, 4],
    width: '100%',
    overflowX: 'auto',
    px: SECTION_PX,
    py: 3,
    justifyContent: ['flex-start', 'flex-start', 'center', 'center']
  })}
  scroll-snap-type: x mandatory;
  scroll-padding-inline: 24px;
  scrollbar-width: thin;
  scrollbar-color: ${colors.black10} transparent;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${colors.black10};
    border-radius: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }

  @media (min-width: ${breakpoints[1]}) {
    scroll-padding-inline: 32px;
  }
`

const CarouselCard = styled(Box)`
  ${theme({
    bg: 'white',
    border: 1,
    borderColor: 'black10',
    borderRadius: 3,
    p: [3, 3, 4, 4],
    minWidth: ['260px', '280px', '300px', '320px'],
    maxWidth: '320px',
    flex: '0 0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: 3
  })}
  box-shadow: ${shadows[1]};
  scroll-snap-align: start;
`

const CarouselLogo = styled('img')`
  ${theme({
    display: 'block',
    width: '40px',
    height: '40px',
    borderRadius: 2
  })}
  object-fit: cover;
`

const CarouselCardName = styled(Text)`
  ${theme({
    color: 'black',
    fontSize: 2,
    fontWeight: 'bold',
    lineHeight: 1
  })}
`

const CarouselCardBlurb = styled(Text)`
  ${theme({
    color: 'black70',
    fontSize: 1,
    lineHeight: 2
  })}
`

const CarouselCardLink = styled(Link)`
  ${theme({
    fontWeight: 'bold',
    fontSize: [0, 1, 1, 1]
  })}
  margin-top: auto;
`

export const MoreUseCases = ({ accent, currentSlug }) => {
  const list = USE_CASES.filter(c => c.slug !== currentSlug)
  if (list.length < 2) return null
  return (
    <Section css={theme({ px: 0, mt: 5 })}>
      <SectionInner css={theme({ maxWidth: '100%', px: 0 })}>
        <Box
          css={theme({
            maxWidth: SECTION_MAX_WIDTH,
            mx: 'auto',
            px: SECTION_PX,
            pb: [3, 3, 4, 4],
            textAlign: 'center'
          })}
        >
          <Eyebrow accent={accent} css={theme({ pb: 2, display: 'block' })}>
            More use cases
          </Eyebrow>
          <SubheadBase
            css={theme({
              fontSize: ['24px', '28px', '34px', '38px'],
              textAlign: 'center',
              letterSpacing: '-0.01em',
              lineHeight: 0
            })}
          >
            Explore more ways to build with Microlink
          </SubheadBase>
        </Box>

        <CarouselTrack
          role='list'
          aria-label='More use cases'
          css={theme({ maxWidth: '100%', mx: 'auto' })}
        >
          {list.map(({ slug, name, blurb, icon }) => (
            <CarouselCard key={slug} role='listitem'>
              <Flex css={theme({ alignItems: 'center', gap: 2 })}>
                <CarouselLogo
                  src={icon}
                  alt=''
                  width='40'
                  height='40'
                  loading='lazy'
                  decoding='async'
                />
                <CarouselCardName>{name}</CarouselCardName>
              </Flex>
              <CarouselCardBlurb>{blurb}</CarouselCardBlurb>
              <CarouselCardLink
                href={`/use-cases/${slug}`}
                css={theme({ color: accent.text })}
              >
                View use case →
              </CarouselCardLink>
            </CarouselCard>
          ))}
        </CarouselTrack>
      </SectionInner>
    </Section>
  )
}
