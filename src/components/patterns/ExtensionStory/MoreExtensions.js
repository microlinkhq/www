import { colors, shadows, theme } from 'theme'
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

import { EXTENSIONS } from './extensions'

const CardsRow = styled(Flex)`
  ${theme({
    gap: [3, 3, 4, 4],
    width: '100%',
    flexWrap: 'wrap',
    justifyContent: 'center',
    px: SECTION_PX,
    py: 3
  })}
`

const Card = styled(Box)`
  ${theme({
    bg: 'white',
    border: 1,
    borderColor: 'black10',
    borderRadius: 3,
    p: [3, 3, 4, 4],
    width: '100%',
    maxWidth: '340px',
    display: 'flex',
    flexDirection: 'column',
    gap: 3
  })}
  box-shadow: ${shadows[1]};
`

const IconCircle = styled(Flex)`
  ${theme({
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  })}
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

export const MoreExtensions = ({ accent, currentSlug }) => {
  const list = EXTENSIONS.filter(extension => extension.slug !== currentSlug)
  if (list.length === 0) return null
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
            More extensions
          </Eyebrow>
          <Subhead
            css={theme({
              textAlign: 'center'
            })}
          >
            Bring Microlink everywhere you work
          </Subhead>
        </Box>

        <CardsRow role='list' aria-label='More extensions'>
          {list.map(({ slug, name, blurb, icon: Icon, href }) => (
            <Card key={slug} role='listitem'>
              <Flex css={theme({ alignItems: 'center', gap: 2 })}>
                <IconCircle css={theme({ bg: accent.bgSoft })}>
                  <Icon size={20} color={colors[accent.text]} />
                </IconCircle>
                <CardName>{name}</CardName>
              </Flex>
              <CardBlurb>{blurb}</CardBlurb>
              <CardLink href={href} css={theme({ color: accent.text })}>
                View extension →
              </CardLink>
            </Card>
          ))}
        </CardsRow>
      </SectionInner>
    </Section>
  )
}
