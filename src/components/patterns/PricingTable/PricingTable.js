import { formatNumber } from 'helpers'
import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { Check } from 'react-feather'
import { Box, Label, Flex, Text } from 'components/elements'
import { Checkout } from 'components/patterns'
import PricePicker, { DEFAULT_PLAN } from 'components/elements/PricePicker'

import { colors, fontWeights } from 'theme'

const FREE_PLAN_RATE_LIMIT = 250
const HIGHLIGHT_DURATION = 1
const HIGHLIGHT_STATE_TIMEOUT = HIGHLIGHT_DURATION * 1000

const Price = styled(Text)`
  font-weight: bold;
  &::before {
    content: '€';
    font-weight: ${fontWeights.light};
    font-size: 0.8em;
    position: relative;
    top: -5px;
    left: 0;
    color: ${colors.black80};
  }
  &::after {
    content: '/month';
    font-weight: ${fontWeights.light};
    font-size: 0.8em;
    position: relative;
    top: 0;
    color: ${colors.black50};
  }
`

Price.defaultProps = {
  fontSize: 2
}

const animateHighlight = keyframes`
  from {
    background-color: yellow;
  }
  to {
    background-color: #fff;
  }
`

const Highlight = styled.span`
  animation-name: ${animateHighlight};
  animation-duration: ${HIGHLIGHT_DURATION}s;
  animation-fill-mode: forwards;
`

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
          px={[3, 3, 3, '5rem']}
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

function PricingTable ({ siteUrl, apiKey, stripeKey, apiEndpoint }) {
  const [state, setState] = useState({
    ...DEFAULT_PLAN,
    highlight: false
  })

  const priceSelected = plan => {
    const newState = plan

    setState({ ...newState, highlight: true })

    setTimeout(function () {
      setState({ ...newState, highlight: false })
    }, HIGHLIGHT_STATE_TIMEOUT)
  }

  const { highlight, monthlyPrice, planId } = state
  const humanMonthlyPrice = formatNumber(monthlyPrice)

  return (
    <Box ml='auto' mr='auto' px={[0, 0, 0, 6]} pt={4} pb={5}>
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
                <Text>Unified metadata</Text>
                <Text color='gray' fontWeight='normal' fontSize='12px'>
                  Normalized from Open Graph, JSON+LD or HTML markup, such as
                  author, images, colors, dates, lang, etc.
                </Text>
              </>,
              <CheckMark key='metadata-free' />,
              <CheckMark key='metadata-pro' />
            ]}
          />
          <PricingRow
            children={[
              <>
                <Text>Multimedia detection</Text>
                <Text color='gray' fontWeight='normal' fontSize='12px'>
                  Detecting the original streaming source for any audio or
                  video.
                </Text>
              </>,
              <CheckMark key='multimedia-free' />,
              <CheckMark key='multimedia-pro' />
            ]}
          />
          <PricingRow
            children={[
              <>
                <Text>Take screenshots</Text>
                <Text color='gray' fontWeight='normal' fontSize='12px'>
                  Live screenshotting support with overlay and device
                  capabilities, reloaded in the background.
                </Text>
              </>,
              <CheckMark key='screenshot-free' />,
              <CheckMark key='screenshot-pro' />
            ]}
          />
          <PricingRow
            children={[
              <>
                <Text>Cloud browsering</Text>
                <Text color='gray' fontWeight='normal' fontSize='12px'>
                  Preload URL content using headless browser cloud computing
                  when necessary.
                </Text>
              </>,
              <CheckMark key='prerender-free' />,
              <CheckMark key='prerender-pro' />
            ]}
          />
          <PricingRow
            children={[
              <>
                <Text>Proxy rotation</Text>
                <Text color='gray' fontWeight='normal' fontSize='12px'>
                  Gather the top 500 popular sites to never be blocked or
                  claked, auto handling retry scenarios.
                </Text>
              </>,
              '',
              <CheckMark key='proxy-pro' />
            ]}
          />
          <PricingRow
            children={[
              <>
                <Text>Cache layer</Text>
                <Text color='gray' fontWeight='normal' fontSize='12px'>
                  Configurable built-in response cache for serving pre-computed
                  content to fit high demand scenarios.
                </Text>
              </>,
              '',
              <CheckMark key='cache-pro' />
            ]}
          />
          <PricingRow
            children={[
              <>
                <Text>Service usage</Text>
                <Text color='gray' fontWeight='normal' fontSize='12px'>
                  Determine how many requests you can perform in a window of
                  time.
                </Text>
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
                key='checkout'
                planId={planId}
                siteUrl={siteUrl}
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
