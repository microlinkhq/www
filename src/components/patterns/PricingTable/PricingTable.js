import PricePicker, { DEFAULT_PLAN } from 'components/elements/PricePicker'
import { Highlight, Box, Label, Flex, Text } from 'components/elements'
import { Checkout } from 'components/patterns'
import React, { useState } from 'react'
import { formatNumber } from 'helpers'
import styled from 'styled-components'
import { Check } from 'react-feather'

import { labelStyle } from '../../elements/Label'

const FREE_PLAN_RATE_LIMIT = 100

const Price = styled(Text)`
  font-weight: bold;
  &::before {
    content: '€';
    position: relative;
    top: -5px;
    left: 0;
    ${labelStyle}
  }
  &::after {
    content: '/month';
    position: relative;
    top: 0;
    ${labelStyle}
  }
`

Price.defaultProps = {
  fontSize: 2
}

const PricingHeader = ({ children }) => {
  const [featureHeader, ...pricingPlans] = children
  return (
    <Text as='tr'>
      <Text as='th' color='darkBlue700' textAlign='right' fontSize={2}>
        {featureHeader}
      </Text>
      {pricingPlans.map((children, index) => (
        <Text
          as='th'
          pb='.85rem'
          px={[3, 3, 3, 5]}
          fontWeight='regular'
          fontSize={2}
          color='blue700'
          key={`${featureHeader}_${children}_${index}`}
          children={children}
        />
      ))}
    </Text>
  )
}

const CheckMark = () => (
  <Flex justifyContent='center'>
    <Check />
  </Flex>
)

const PricingRow = ({ children, ...props }) => {
  const [name, ...values] = children
  return (
    <Text as='tr'>
      <Text as='th' {...props}>
        <Text
          fontSize={0}
          color='darkBlue400'
          fontWeight='regular'
          children={name}
        />
      </Text>
      {values.map((children, index) => (
        <Text
          as='td'
          fontWeight='normal'
          color='black80'
          fontSize={1}
          key={`${name}_${children}_${index}`}
          children={children}
        />
      ))}
    </Text>
  )
}

PricingRow.defaultProps = {
  py: 2,
  textAlign: 'left'
}

const Description = props => (
  <Text color='black60' fontWeight='normal' fontSize={1} {...props} />
)

function PricingTable ({ canonicalUrl, stripeKey, apiEndpoint, ...props }) {
  const [state, setState] = useState({
    ...DEFAULT_PLAN,
    isHighlight: false
  })

  const priceSelected = plan => {
    const newState = plan

    setState({ ...newState, isHighlight: true })

    setTimeout(() => {
      setState({ ...newState, isHighlight: false })
    }, Highlight.HIGHLIGHT_DURATION)
  }

  const { isHighlight, monthlyPrice, planId } = state
  const humanMonthlyPrice = formatNumber(monthlyPrice)

  return (
    <Box
      as='section'
      ml='auto'
      mr='auto'
      px={[0, 0, 0, 6]}
      pt={[3, 3, 4, 4]}
      {...props}
    >
      <Box
        as='table'
        width='100%'
        textAlign='center'
        style={{ tableLayout: 'auto', borderCollapse: 'collapse' }}
      >
        <thead>
          <PricingHeader children={['', 'Free', 'Pro']} />
        </thead>
        <tbody>
          <PricingRow
            children={[
              <>
                <Text>Universal Embed</Text>
                <Description>
                  Effortless metadata normalization via Open Graph, oEmbed,
                  JSON+LD and HTML markup.
                </Description>
              </>,
              <CheckMark key='metadata-free' />,
              <CheckMark key='metadata-pro' />
            ]}
          />
          <PricingRow
            children={[
              <>
                <Text>Take Screenshots</Text>
                <Description>
                  Live screenshotting with overlay composition and stale
                  revalidation, hosted at Microlink CDN.
                </Description>
              </>,
              <CheckMark key='screenshot-free' />,
              <CheckMark key='screenshot-pro' />
            ]}
          />
          <PricingRow
            children={[
              <>
                <Text>Export to PDF</Text>
                <Description>
                  On demand URL to PDF, costless effective with stale
                  revalidation, hosted at Microlink CDN.
                </Description>
              </>,
              <CheckMark key='pdf-free' />,
              <CheckMark key='pdf-pro' />
            ]}
          />
          <PricingRow
            children={[
              <>
                <Text>Cloud Browsering</Text>
                <Description>
                  Automatic URL prerendering detection via top notch headless
                  browser with adblock capabilities.
                </Description>
              </>,
              <CheckMark key='prerender-free' />,
              <CheckMark key='prerender-pro' />
            ]}
          />
          <PricingRow
            children={[
              <>
                <Text>HTTP Headers</Text>
                <Description>
                  Customize every single request specifying custom HTTP headers
                  to fits use case scenarios.
                </Description>
              </>,
              '',
              <CheckMark key='headers-pro' />
            ]}
          />
          <PricingRow
            children={[
              <>
                <Text>Proxy Rotation</Text>
                <Description>
                  Gather the top 500 popular sites to never be blocked or
                  claked, auto handling retry scenarios.
                </Description>
              </>,
              '',
              <CheckMark key='proxy-pro' />
            ]}
          />
          <PricingRow
            children={[
              <>
                <Text>Configurable TTL</Text>
                <Description>
                  Configurable built-in response cache for serving pre-computed
                  content to fit high demand scenarios.
                </Description>
              </>,
              '',
              <CheckMark key='ttl-pro' />
            ]}
          />
          <PricingRow
            children={[
              <>
                <Text>Service Usage</Text>
                <Description>
                  API quota associated with your plan that determines how many
                  requests you can perform in a window of time.
                </Description>
              </>,
              <>
                {FREE_PLAN_RATE_LIMIT}{' '}
                <Label display='inline' children='reqs' suffix='/day' />
              </>,
              <PricePicker key='price-picker' onChange={priceSelected} />
            ]}
          />
          <PricingRow
            children={[
              '',
              <Price py={3} key='free-plan' children={0} />,
              <Price py={3} key={`pro-plan-${humanMonthlyPrice}`}>
                <Highlight as='span' isHighlight={isHighlight}>
                  {humanMonthlyPrice}
                </Highlight>
              </Price>
            ]}
          />
          <PricingRow
            children={[
              '',
              '',
              <Checkout
                key='checkout'
                planId={planId}
                canonicalUrl={canonicalUrl}
                stripeKey={stripeKey}
              />
            ]}
          />
        </tbody>
      </Box>
    </Box>
  )
}

export default PricingTable
