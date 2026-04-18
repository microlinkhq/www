import React from 'react'
import styled from 'styled-components'
import { Check as CheckIcon } from 'react-feather'

import Box from 'components/elements/Box'
import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import LineBreak from 'components/elements/LineBreak'
import SubheadBase from 'components/elements/Subhead'
import Text from 'components/elements/Text'
import FeatherIcon from 'components/icons/Feather'
import CaptionBase from 'components/patterns/Caption/Caption'
import { withTitle } from 'helpers/hoc/with-title'
import { colors, layout, theme } from 'theme'

const Subhead = withTitle(SubheadBase)
const Caption = withTitle(CaptionBase)

const SECTION_VERTICAL_SPACING = [4, 4, 5, 5]

const PLAN_NAMES = ['Free', 'Pro', 'Enterprise']

const ROWS = [
  {
    label: 'Daily quota',
    values: ['50 req/day', 'Up to 20K req/day', 'Custom']
  },
  {
    label: 'Monthly quota',
    values: ['~1.5K req/month', '45K – 560K req/month', 'Millions+']
  },
  { label: 'API key', values: [false, true, true] },
  { label: 'Configurable TTL', values: [false, true, true] },
  { label: 'Custom HTTP headers', values: [false, true, true] },
  { label: 'Automatic proxy resolution', values: [false, true, true] },
  { label: 'Adblock & cookie banners', values: [true, true, true] },
  {
    label: 'Global CDN edge cache',
    values: ['Shared', 'Shared', 'Dedicated']
  },
  {
    label: 'Concurrency',
    values: ['Limited', 'Standard', 'Custom']
  },
  {
    label: 'SLA',
    values: ['Best effort', '99.9%', 'Custom']
  },
  {
    label: 'Support',
    values: ['Community', 'Priority email', 'Dedicated channel']
  },
  { label: 'Custom DPA', values: [false, false, true] },
  { label: 'Dedicated infrastructure', values: [false, false, true] }
]

const Table = styled(Box)`
  ${theme({
    width: '100%',
    bg: 'white',
    borderRadius: 3,
    overflow: 'hidden'
  })}
  border: 1px solid ${colors.black10};
  box-shadow: 0 2px 8px ${colors.black05};
`

/* Use display:flex rows so flex proportions are consistent across header + body */
const Row = styled(Flex)`
  ${theme({
    alignItems: 'stretch',
    width: '100%'
  })}
  border-top: 1px solid ${colors.black10};

  &:first-of-type {
    border-top: 0;
  }
`

const HeaderRow = styled(Row)`
  ${theme({ bg: 'black05' })}
  border-top: 0;
`

/* flex: 1.4 on label col, flex: 1 on each plan col — shared between header and body */
const LabelCell = styled(Flex)`
  ${theme({
    flex: '1.4 1 0',
    minWidth: 0,
    px: [2, 3, 4, 4],
    py: [3, 3, 3, 3],
    alignItems: 'center',
    justifyContent: 'flex-start',
    fontFamily: 'sans',
    fontSize: [0, 1, '15px', '15px'],
    fontWeight: 'bold',
    color: 'black'
  })}
`

const PlanCell = styled(Flex)`
  ${theme({
    flex: '1 1 0',
    minWidth: 0,
    px: [2, 3, 3, 3],
    py: [3, 3, 3, 3],
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: 'sans',
    fontSize: [0, 1, 1, 1],
    color: 'black80',
    fontVariantNumeric: 'tabular-nums'
  })}
`

const ProPlanCell = styled(PlanCell)`
  ${theme({ bg: 'black05', color: 'black' })}
`

const HeaderLabelCell = styled(LabelCell)`
  ${theme({
    fontSize: [0, 1, 2, 2],
    letterSpacing: 1
  })}
`

const HeaderPlanCell = styled(PlanCell)`
  ${theme({
    fontWeight: 'bold',
    color: 'black',
    fontSize: [0, 1, 2, 2]
  })}
`

const ProHeaderPlanCell = styled(HeaderPlanCell)`
  ${theme({ bg: 'black05', color: 'pink7' })}
`

const renderValue = value => {
  if (value === true) {
    return (
      <FeatherIcon
        icon={CheckIcon}
        size='18px'
        css={theme({ color: 'pink7' })}
        aria-label='Included'
      />
    )
  }
  if (value === false) {
    return (
      <Text
        as='span'
        aria-label='Not included'
        css={theme({ color: 'black30', fontWeight: 'bold' })}
      >
        —
      </Text>
    )
  }
  return value
}

// Mobile: per-plan stacked summary
const MobileStack = ({ plan, planIndex }) => (
  <Box
    css={theme({
      bg: planIndex === 1 ? 'black05' : 'white',
      borderRadius: 3,
      border: 1,
      borderColor: 'black10',
      p: 3
    })}
  >
    <Text
      css={theme({
        fontSize: 2,
        fontWeight: 'bold',
        color: planIndex === 1 ? 'pink7' : 'black',
        pb: 2,
        borderBottom: 1,
        borderBottomColor: 'black10'
      })}
    >
      {plan}
    </Text>
    <Box css={theme({ pt: 2 })}>
      {ROWS.map(({ label, values }) => (
        <Flex
          key={label}
          css={theme({
            justifyContent: 'space-between',
            alignItems: 'center',
            py: 2,
            fontSize: 1
          })}
        >
          <Text as='span' css={theme({ color: 'black70', pr: 2 })}>
            {label}
          </Text>
          <Box css={theme({ textAlign: 'right', color: 'black' })}>
            {renderValue(values[planIndex])}
          </Box>
        </Flex>
      ))}
    </Box>
  </Box>
)

const Comparison = () => (
  <Container
    as='section'
    id='comparison'
    css={theme({
      bg: 'white',
      maxWidth: '100%',
      py: SECTION_VERTICAL_SPACING,
      px: [3, 3, 4, 4],
      alignItems: 'center'
    })}
  >
    <Box
      css={theme({
        textAlign: 'center',
        maxWidth: layout.normal,
        pb: [4, 4, 5, 5]
      })}
    >
      <Subhead
        titleize={false}
        css={theme({
          fontSize: ['28px', '34px', '42px', '46px']
        })}
      >
        Compare every feature,
        <LineBreak />
        side by <span css={theme({ color: 'pink7' })}>side</span>.
      </Subhead>
      <Caption
        forwardedAs='div'
        titleize={false}
        css={theme({
          pt: [3, 3, 4, 4],
          fontSize: [1, 2, 2, 2]
        })}
      >
        Every paid plan unlocks the same toolbox. Pick the volume that matches
        your traffic — upgrade or downgrade in a click.
      </Caption>
    </Box>

    {/* Desktop / tablet: flex-based grid table */}
    <Box
      css={theme({
        display: ['none', 'none', 'block', 'block'],
        width: '100%',
        maxWidth: layout.large
      })}
    >
      <Table role='table'>
        <Box role='rowgroup'>
          <HeaderRow role='row'>
            <HeaderLabelCell role='columnheader'>Feature</HeaderLabelCell>
            {PLAN_NAMES.map((name, index) =>
              index === 1 ? (
                <ProHeaderPlanCell role='columnheader' key={name}>
                  {name}
                </ProHeaderPlanCell>
              ) : (
                <HeaderPlanCell role='columnheader' key={name}>
                  {name}
                </HeaderPlanCell>
              )
            )}
          </HeaderRow>
        </Box>
        <Box role='rowgroup'>
          {ROWS.map(({ label, values }) => (
            <Row role='row' key={label}>
              <LabelCell role='rowheader'>{label}</LabelCell>
              {values.map((value, index) =>
                index === 1 ? (
                  <ProPlanCell role='cell' key={index}>
                    {renderValue(value)}
                  </ProPlanCell>
                ) : (
                  <PlanCell role='cell' key={index}>
                    {renderValue(value)}
                  </PlanCell>
                )
              )}
            </Row>
          ))}
        </Box>
      </Table>
    </Box>

    {/* Mobile: stacked per-plan cards */}
    <Box
      css={theme({
        display: ['flex', 'flex', 'none', 'none'],
        flexDirection: 'column',
        gap: 3,
        width: '100%',
        maxWidth: layout.normal
      })}
    >
      {PLAN_NAMES.map((plan, index) => (
        <MobileStack key={plan} plan={plan} planIndex={index} />
      ))}
    </Box>
  </Container>
)

export default Comparison
