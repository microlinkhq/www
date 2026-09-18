import { theme, shadows } from 'theme'
import React from 'react'
import styled from 'styled-components'

import Box from 'components/elements/Box'
import { Link } from 'components/elements/Link'
import Text from 'components/elements/Text'

import { ACCENT, useCasePath } from '../use-cases'

export { CardGrid } from 'components/patterns/CustomerStory/primitives'

const FALLBACK_CTA = 'View use case'

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

const CardLink = styled(Link)`
  ${theme({ fontWeight: 'bold', fontSize: [0, 1, 1, 1] })}
  margin-top: auto;
`

export const UseCaseCard = ({ entry, accent = ACCENT }) => (
  <Card>
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
    <Text css={theme({ color: 'black70', fontSize: 1, lineHeight: 2 })}>
      {entry.blurb}
    </Text>
    <CardLink href={useCasePath(entry.slug)} css={theme({ color: accent.text })}>
      {entry.cta || FALLBACK_CTA}&nbsp;→
    </CardLink>
  </Card>
)
