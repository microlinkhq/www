import { system } from 'helpers'
import React, { Fragment, Component } from 'react'
import styled, { keyframes } from 'styled-components'
import { Check, HelpCircle } from 'react-feather'
import {
  Box,
  Tooltip,
  Hide,
  Label,
  LinkSolid,
  Flex,
  Text,
  Lead,
  Checkout
} from 'components/elements'

import PricePicker, { DEFAULT_PLAN } from 'components/elements/PricePicker'

import { colors } from 'theme'
import { formatNumber } from 'helpers'

const FREE_PLAN_RATE_LIMIT = 250

const toLocale = number => Math.round(number).toLocaleString('en-US')

const getMonthlyPrice = price => `$${price}/month`

const getPlanDescription = reqs => `${toLocale(reqs)} daily requests`

const TOOLTIPS = {
  'Rate Limit':
    'Maximum number of requests you can consume until reach the quota.',
  'Request Concurrency': 'Maximum simultaneous requests you can make.',
  'Request Caching':
    'Speed up response timing caching payload for same API calls.',
  'Screenshot support': 'Take partial or full screenshot for any website.',
  'Video detection':
    'It extracts the original video source from any link provided',
  'Color Detection':
    'It extracts palette & predominant colors for any image detected',
  'Live Support':
    'We provide chat support to help you integrate with your services.'
}

const Price = styled(Lead)`
  font-weight: bold;
  &::before {
    content: '$';
    font-weight: 100;
    font-size: 0.8em;
    position: relative;
    top: -5px;
    left: 0;
    color: ${colors.black50};
  }
  &::after {
    content: '/month';
    font-weight: 100;
    font-size: 0.8em;
    position: relative;
    top: 0;
    color: ${colors.black50};
  }
`

Price.defaultProps = {
  fontSize: 2
}

const highlight = keyframes`
  from {
     background-color: yellow;
   }
   to {
     background-color: #fff;
   }
`

const Highlight = styled.span`
  animation-name: ${highlight};
  animation-duration: 1s;
  animation-fill-mode: forwards;
`

const TableDataCell = system(
  {
    as: 'td'
  },
  'textAlign',
  'color',
  'space',
  'fontWeight',
  'fontSize',
  'width'
)

const TableRow = system(
  {
    as: 'tr'
  },
  'textAlign',
  'color',
  'space',
  'fontWeight',
  'fontSize'
)

const TableHeader = system(
  {
    as: 'th'
  },
  'textAlign',
  'color',
  'space',
  'fontWeight',
  'fontSize'
)

const Table = system(
  { as: 'table' },
  {
    tableLayout: 'fixed',
    'border-collapse': 'collapse',
    textAlign: 'center'
  },
  'space'
)

const PricingHeader = ({ children }) => {
  const [featureHeader, ...pricingPlans] = children
  return (
    <TableRow>
      <TableHeader
        fontWeight='bold'
        color='darkBlue700'
        textAlign='right'
        fontSize={2}
      >
        {featureHeader}
      </TableHeader>
      {pricingPlans.map((children, index) => (
        <TableHeader
          pb={'.85rem'}
          px={[3, '5rem']}
          fontWeight='bold'
          fontSize={2}
          color='blue700'
          key={`${featureHeader}_${children}_${index}`}
          children={children}
        />
      ))}
    </TableRow>
  )
}

const PricingRow = ({ children, ...props }) => {
  const [name, ...values] = children

  return (
    <TableRow>
      <TableHeader {...props}>
        <Hide breakpoints={[2, 3]}>
          <Text
            fontSize={0}
            color='darkBlue400'
            fontWeight='bold'
            children={name}
          />
        </Hide>
        <Hide breakpoints={[0, 1]}>
          <Tooltip text={TOOLTIPS[name]}>
            <Text
              fontSize={1}
              color='darkBlue400'
              fontWeight='bold'
              style={{ cursor: 'help' }}
            >
              {name}{' '}
              {name && (
                <HelpCircle
                  size={12}
                  color={colors.black50}
                  style={{ vertialAlign: 'middle' }}
                />
              )}
            </Text>
          </Tooltip>
        </Hide>
      </TableHeader>
      {values.map((children, index) => (
        <TableDataCell
          fontWeight='normal'
          color='black80'
          fontSize={1}
          key={`${name}_${children}_${index}`}
          children={children}
        />
      ))}
    </TableRow>
  )
}

PricingRow.defaultProps = {
  pr: 4,
  py: 2,
  textAlign: 'right'
}

export default class extends Component {
  state = {
    ...DEFAULT_PLAN,
    description: getPlanDescription(DEFAULT_PLAN.reqsPerDay),
    panelLabel: getMonthlyPrice(DEFAULT_PLAN.monthlyPrice)
  }

  priceSelected = plan => {
    this.setState({
      ...plan,
      description: getPlanDescription(plan.reqsPerDay),
      panelLabel: getMonthlyPrice(plan.monthlyPrice)
    })

    if (this.raf) return
    if (this.state.highlight) {
      // reset the animation
      this.setState({ highlight: false }, () => {
        this.raf = requestAnimationFrame(() => {
          this.raf = null
          this.setState({ highlight: true })
        })
      })
    } else {
      this.setState({ highlight: true })
    }
  }

  render () {
    const {
      reqsPerDay,
      highlight,
      description,
      panelLabel,
      monthlyPrice,
      planId
    } = this.state

    const { apiEndpoint, apiKey, stripeKey } = this.props
    const humanMonthlyPrice = formatNumber(monthlyPrice)

    return (
      <Box mx='auto' px={[0, 6]}>
        <Table width='100%'>
          <thead>
            <PricingHeader children={['', 'Free', 'Pro']} />
          </thead>
          <tbody>
            <PricingRow
              children={[
                'Rate Limit',
                <Fragment>
                  {FREE_PLAN_RATE_LIMIT}{' '}
                  <Label display='inline' children='reqs' suffix='/day' />
                </Fragment>,
                <PricePicker onChange={this.priceSelected} />
              ]}
            />
            <PricingRow
              children={[
                'Request Concurrency',
                <Fragment>
                  1 <Label display='inline' children='reqs' suffix='/sec' />
                </Fragment>,
                '∞'
              ]}
            />
            <PricingRow
              children={[
                'Request Caching',
                <Check size={16} color='#654EA3' />,
                <Check size={16} color='#654EA3' />
              ]}
            />
            <PricingRow
              children={[
                'Screenshot support',
                <Check size={16} color='#654EA3' />,
                <Check size={16} color='#654EA3' />
              ]}
            />
            <PricingRow
              children={[
                'Video detection',
                <Check size={16} color='#654EA3' />,
                <Check size={16} color='#654EA3' />
              ]}
            />
            <PricingRow
              children={[
                'Color Detection',
                <Check size={16} color='#654EA3' />,
                <Check size={16} color='#654EA3' />
              ]}
            />
            <PricingRow
              children={[
                'Live Support',
                <Check size={16} color='#654EA3' />,
                <Check size={16} color='#654EA3' />
              ]}
            />
            <PricingRow
              py={3}
              children={[
                '',
                <Price children={0} />,
                <Price>
                  {highlight ? (
                    <Highlight>{humanMonthlyPrice}</Highlight>
                  ) : (
                    <span>{humanMonthlyPrice}</span>
                  )}
                </Price>
              ]}
            />
            <PricingRow
              children={[
                '',
                '',
                <Checkout
                  planId={planId}
                  apiEndpoint={apiEndpoint}
                  apiKey={apiKey}
                  stripeKey={stripeKey}
                  panelLabel={panelLabel}
                  description={description}
                />
              ]}
            />
          </tbody>
        </Table>

        <Flex
          justifyContent='center'
          flexDirection='column'
          alignItems='center'
          pt={[4, 5]}
        >
          <Lead color='gray8' fontSize={2} children='Do you need more?' />
          <Text as='div' mt={1} fontSize={1} color='gray8'>
            <LinkSolid
              fontWeight='bold'
              href='mailto:hello@microlink.io?subject=About pricing'
              children='Contact us'
            />
            .
          </Text>
        </Flex>
      </Box>
    )
  }
}
