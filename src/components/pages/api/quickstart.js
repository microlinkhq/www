import React from 'react'
import { theme } from 'theme'
import styled from 'styled-components'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'

import {
  QUICKSTART,
  CardGrid,
  CardText,
  CardTitle,
  SectionBlock,
  StaticCard,
  tileColors
} from './shared'

const STEP_TILE = tileColors('blue')

const StepNumber = styled(Flex)(
  theme({
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    borderRadius: 3,
    fontFamily: 'mono',
    fontSize: 1,
    fontWeight: 'bold',
    flexShrink: 0
  })
)

const StepCode = styled(Box).attrs({ as: 'code' })(
  theme({
    display: 'block',
    mt: 3,
    px: 3,
    py: 2,
    bg: 'gray0',
    border: 1,
    borderColor: 'black05',
    borderRadius: 3,
    fontFamily: 'mono',
    fontSize: 0,
    lineHeight: 2,
    color: 'black80',
    overflowWrap: 'anywhere'
  })
)

export const Quickstart = () => (
  <SectionBlock
    id='quickstart'
    title={QUICKSTART.title}
    caption={QUICKSTART.caption}
  >
    <CardGrid as='ol' $columns={3} $tabletColumns={1}>
      {QUICKSTART.steps.map((step, index) => (
        <Box as='li' key={step.title} css={theme({ minWidth: 0 })}>
          <StaticCard>
            <StepNumber
              aria-hidden='true'
              css={{ background: STEP_TILE.bg, color: STEP_TILE.color }}
            >
              {index + 1}
            </StepNumber>
            <CardTitle>{step.title}</CardTitle>
            <CardText>{step.description}</CardText>
            <StepCode>{step.code}</StepCode>
          </StaticCard>
        </Box>
      ))}
    </CardGrid>
  </SectionBlock>
)
