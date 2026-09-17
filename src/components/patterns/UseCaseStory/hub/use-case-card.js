import { breakpoints, theme, shadows } from 'theme'
import React from 'react'
import styled from 'styled-components'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import { Link } from 'components/elements/Link'
import Text from 'components/elements/Text'

import { StoryTag } from 'components/patterns/CustomerStory/chrome'

import { VerticalIconTile } from '../landing/vertical-icon'
import { ACCENT, getVertical, useCasePath } from '../use-cases'

export const CardGrid = styled(Box)`
  display: grid;
  grid-template-columns: 1fr;
  ${theme({ gap: [3, 3, 4, 4], width: '100%' })}

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
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: 3
  })}
  box-shadow: ${shadows[1]};
`

const CardLogo = styled('img')`
  ${theme({ display: 'block', borderRadius: 2, width: '40px', height: '40px' })}
  object-fit: cover;
`

const CardLink = styled(Link)`
  ${theme({ fontWeight: 'bold', fontSize: [0, 1, 1, 1] })}
  margin-top: auto;
`

export const UseCaseCard = ({
  entry,
  accent = ACCENT,
  cta = 'View use case →'
}) => {
  const vertical = entry.vertical ? getVertical(entry.vertical) : null

  return (
    <Card>
      <Flex css={theme({ alignItems: 'center', gap: 2 })}>
        {entry.icon
          ? (
            <CardLogo
              src={entry.icon}
              alt=''
              width='40'
              height='40'
              loading='lazy'
              decoding='async'
            />
            )
          : (
            <VerticalIconTile vertical={vertical} size={40} />
            )}
        <Text
          as='h3'
          css={theme({
            m: 0,
            color: 'black',
            fontSize: 2,
            fontWeight: 'bold',
            lineHeight: 1,
            minWidth: 0
          })}
        >
          {entry.name}
        </Text>
      </Flex>
      <Text css={theme({ color: 'black70', fontSize: 1, lineHeight: 2 })}>
        {entry.blurb}
      </Text>
      <StoryTag accent={accent} css={theme({ alignSelf: 'flex-start' })}>
        {entry.category}
      </StoryTag>
      <CardLink href={useCasePath(entry.slug)} css={theme({ color: accent.text })}>
        {cta}
      </CardLink>
    </Card>
  )
}
