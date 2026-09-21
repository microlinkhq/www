import React from 'react'
import { theme } from 'theme'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'

import {
  HOW,
  CardGrid,
  CardText,
  CardTitle,
  SectionBlock,
  StaticCard
} from './shared'

const StepNumber = ({ children }) => (
  <Flex
    aria-hidden='true'
    css={theme({
      alignItems: 'center',
      justifyContent: 'center',
      width: '40px',
      height: '40px',
      borderRadius: 3,
      fontFamily: 'mono',
      fontSize: 1,
      fontWeight: 'bold',
      flexShrink: 0,
      bg: 'blue0',
      color: 'blue7'
    })}
  >
    {children}
  </Flex>
)

export const How = () => (
  <SectionBlock id='how' title={HOW.title} caption={HOW.caption}>
    <CardGrid as='ol' $columns={3} $tabletColumns={1}>
      {HOW.steps.map((step, index) => (
        <Box as='li' key={step.title} css={theme({ minWidth: 0 })}>
          <StaticCard>
            <StepNumber>{index + 1}</StepNumber>
            <CardTitle>{step.title}</CardTitle>
            <CardText>{step.description}</CardText>
          </StaticCard>
        </Box>
      ))}
    </CardGrid>
  </SectionBlock>
)
