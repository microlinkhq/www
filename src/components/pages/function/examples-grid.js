import React from 'react'
import styled from 'styled-components'
import { breakpoints, colors, shadows, theme, transition } from 'theme'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'

import { GLANCE } from './product-shared'
import { CodeTile } from './examples-tiles'

const Grid = styled(Box)(
  theme({
    display: 'grid',
    gap: 3,
    width: '100%'
  }),
  `
  grid-template-columns: minmax(0, 1fr);

  @media (min-width: ${breakpoints[1]}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: ${breakpoints[2]}) {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }
`
)

const Card = styled(Box).attrs({ as: 'a' })(
  theme({
    display: 'flex',
    flexDirection: 'column',
    minHeight: ['220px', '220px', '260px', '280px'],
    minWidth: 0,
    bg: 'white',
    color: 'black',
    border: 1,
    borderColor: 'gray2',
    borderRadius: 5,
    overflow: 'hidden',
    boxShadow: shadows[2]
  }),
  ({ $span }) => `
  text-decoration: none;
  touch-action: manipulation;

  @media (min-width: ${breakpoints[2]}) {
    grid-column: span ${$span};
  }

  &:focus-visible {
    outline: 2px solid ${colors.link};
    outline-offset: 2px;
  }

  &:hover [data-explore],
  &:focus-visible [data-explore] {
    color: ${colors.black};
  }

  @media (prefers-reduced-motion: no-preference) {
    transition: transform ${transition.medium}, box-shadow ${transition.medium};

    &:hover,
    &:focus-visible {
      transform: translateY(-2px);
      box-shadow: ${shadows[4]};
    }
  }
`
)

const Foot = styled(Flex)(
  theme({
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 3,
    px: 3,
    pb: 3,
    pt: 2
  })
)

const Title = styled(Text)(
  theme({
    fontWeight: 'bold',
    fontSize: 1,
    minWidth: 0
  })
)

const Explore = styled(Text)(
  theme({
    fontSize: 0,
    color: 'gray7',
    flexShrink: 0
  })
)

export const FunctionExamplesGrid = () => (
  <Grid>
    {GLANCE.items.map(item => (
      <Card key={item.id} href={item.href} $span={item.span}>
        <CodeTile code={item.code} />
        <Foot>
          <Title as='span'>{item.title}</Title>
          <Explore as='span' data-explore>
            Explore →
          </Explore>
        </Foot>
      </Card>
    ))}
  </Grid>
)
