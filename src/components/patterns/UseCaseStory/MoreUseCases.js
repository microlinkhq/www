import { breakpoints, colors, theme, shadows } from 'theme'
import React from 'react'
import styled from 'styled-components'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import { Link } from 'components/elements/Link'
import Subhead from 'components/elements/Subhead'
import Text from 'components/elements/Text'

import { Eyebrow } from 'components/patterns/CustomerStory/chrome'
import {
  SECTION_PX,
  SECTION_MAX_WIDTH,
  Section,
  SectionInner
} from 'components/patterns/CustomerStory/primitives'

import { VerticalIconTile } from './landing/vertical-icon'
import {
  USE_CASES,
  getUseCase,
  getVertical,
  useCasePath,
  useCasesByVertical
} from './use-cases'

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

const FALLBACK_LIMIT = 6
const FALLBACK_CTA = 'View use case'

const notCurrent = currentSlug => entry => entry && entry.slug !== currentSlug

const resolveEntries = ({ currentSlug, slugs }) => {
  if (Array.isArray(slugs)) {
    return slugs.map(getUseCase).filter(notCurrent(currentSlug))
  }
  const current = getUseCase(currentSlug)
  const siblings = current && current.vertical
    ? useCasesByVertical(current.vertical).filter(notCurrent(currentSlug))
    : []
  if (siblings.length >= 2) return siblings
  return USE_CASES.filter(notCurrent(currentSlug)).slice(0, FALLBACK_LIMIT)
}

const CardIcon = ({ entry }) =>
  entry.icon
    ? (
      <CarouselLogo
        src={entry.icon}
        alt=''
        width='40'
        height='40'
        loading='lazy'
        decoding='async'
      />
      )
    : (
      <VerticalIconTile vertical={getVertical(entry.vertical)} size={40} />
      )

export const MoreUseCases = ({
  accent,
  currentSlug,
  slugs,
  eyebrow = 'More use cases',
  title = 'Explore more ways to build with Microlink',
  mt = 5
}) => {
  const list = resolveEntries({ currentSlug, slugs })
  if (list.length < 2) return null
  return (
    <Section css={theme({ px: 0, mt })}>
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
            {eyebrow}
          </Eyebrow>
          <Subhead
            css={theme({
              textAlign: 'center'
            })}
          >
            {title}
          </Subhead>
        </Box>

        <CarouselTrack
          role='list'
          aria-label={eyebrow}
          css={theme({ maxWidth: '100%', mx: 'auto' })}
        >
          {list.map(entry => (
            <CarouselCard key={entry.slug} role='listitem'>
              <Flex css={theme({ alignItems: 'center', gap: 2 })}>
                <CardIcon entry={entry} />
                <CarouselCardName>{entry.name}</CarouselCardName>
              </Flex>
              <CarouselCardBlurb>{entry.blurb}</CarouselCardBlurb>
              <CarouselCardLink
                href={useCasePath(entry.slug)}
                css={theme({ color: accent.text })}
              >
                {entry.cta || FALLBACK_CTA}&nbsp;→
              </CarouselCardLink>
            </CarouselCard>
          ))}
        </CarouselTrack>
      </SectionInner>
    </Section>
  )
}
