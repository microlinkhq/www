import React from 'react'
import { ArrowUpRight } from 'react-feather'
import { colors, shadows, theme, touchTargets, transition } from 'theme'
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
const REQUEST_TILE = tileColors('green')

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
    whiteSpace: 'pre-wrap',
    overflowWrap: 'anywhere'
  })
)

const RequestBar = styled(Box).attrs({ as: 'a' })`
  ${theme({
    display: 'flex',
    flexWrap: ['wrap', 'wrap', 'nowrap', 'nowrap'],
    alignItems: 'center',
    gap: [2, 2, 3, 3],
    mt: 3,
    px: 3,
    py: 2,
    minWidth: 0,
    minHeight: touchTargets.minHeight,
    width: '100%',
    bg: 'white',
    border: 1,
    borderColor: 'gray2',
    borderRadius: 4,
    boxShadow: shadows[1],
    color: 'black80',
    textDecoration: 'none'
  })}
  transition: border-color ${transition.medium}, color ${transition.medium};

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      border-color: ${colors.gray4};
      ${theme({ color: 'black' })}
    }
  }

  &:focus-visible {
    outline: 2px solid ${colors.link};
    outline-offset: 2px;
  }
`

const RequestMethod = styled(Box).attrs({ as: 'span' })(
  theme({
    px: 2,
    py: 1,
    borderRadius: 2,
    fontFamily: 'mono',
    fontSize: 0,
    fontWeight: 'bold',
    flexShrink: 0
  })
)

const RequestUrl = styled(Box).attrs({ as: 'code' })(
  theme({
    flex: 1,
    flexBasis: ['100%', '100%', '0%', '0%'],
    order: [1, 1, 0, 0],
    minWidth: 0,
    fontFamily: 'mono',
    fontSize: [0, 0, 1, 1],
    lineHeight: 2,
    overflowWrap: 'break-word'
  })
)

const RequestSeparator = styled(Box).attrs({ as: 'span' })(
  theme({ color: 'black40' })
)

const RequestParam = styled(Box).attrs({ as: 'strong' })(
  theme({ fontWeight: 'bold', color: 'black' })
)

const REQUEST_PARTS = QUICKSTART.request.split(/(?=[?&])/)

const RequestPart = ({ part }) => {
  const match = part.match(/^([?&])([^=]+)=(.*)$/)
  if (!match) return part
  const [, separator, param, value] = match
  return (
    <>
      <RequestSeparator>{separator}</RequestSeparator>
      <RequestParam>{param}</RequestParam>
      <RequestSeparator>=</RequestSeparator>
      {value}
    </>
  )
}

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
    <RequestBar
      href={QUICKSTART.request}
      target='_blank'
      rel='noopener noreferrer'
    >
      <RequestMethod
        css={{ background: REQUEST_TILE.bg, color: REQUEST_TILE.color }}
      >
        GET
      </RequestMethod>{' '}
      <RequestUrl>
        {REQUEST_PARTS.map((part, index) => (
          <React.Fragment key={part}>
            {index > 0 && <wbr />}
            <RequestPart part={part} />
          </React.Fragment>
        ))}
      </RequestUrl>
      <Flex
        as='span'
        aria-hidden='true'
        css={theme({ flexShrink: 0, ml: ['auto', 'auto', 0, 0] })}
      >
        <ArrowUpRight size={18} />
      </Flex>
    </RequestBar>
  </SectionBlock>
)
