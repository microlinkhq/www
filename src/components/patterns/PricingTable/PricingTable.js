import PricePicker, { DEFAULT_PLAN } from 'components/elements/PricePicker'
import { transition, layout, cx, colors, fontSizes } from 'theme'
import { External as ExternalIcon } from 'components/icons'
import { Caption, Checkout } from 'components/patterns'
import { CheckCircle } from 'react-feather'
import React, { useState } from 'react'
import { formatNumber } from 'helpers'
import styled from 'styled-components'

import {
  Caps,
  Link,
  Highlight,
  Hide,
  Box,
  Label,
  Flex,
  Text,
  Container
} from 'components/elements'

import { labelStyle } from '../../elements/Label'

const FREE_PLAN_RATE_LIMIT = 50

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
    ${labelStyle}
    ${props => props.label && `content: '${props.label}';`}
  }
`

Price.defaultProps = {
  fontSize: [1, 2, 2, 2]
}

const PricingPrice = props => (
  <>
    <Hide breakpoints={[1, 2, 3]}>
      <Price py={3} key='free-plan' children={0} {...props} />
      <Text css={labelStyle}>/month</Text>
    </Hide>
    <Hide breakpoints={[0]}>
      <Price key='free-plan' py={3} children={0} label='/month' {...props} />
    </Hide>
  </>
)

const PricingRequest = () => (
  <>
    <Hide breakpoints={[1, 2, 3]}>
      <Text>reqs</Text>
      <Text css={labelStyle}>/day</Text>
    </Hide>
    <Hide breakpoints={[0]}>
      <Label display='inline' children='reqs' suffix='/day' />
    </Hide>
  </>
)

const PricingHeader = ({ children }) => {
  const [featureHeader, ...pricingPlans] = children
  return (
    <Text as='tr'>
      <Text as='th' textAlign='right' fontSize={2} children={featureHeader} />
      {pricingPlans.map((children, index) => (
        <Text
          as='th'
          px={['12px', 2, 4, 4]}
          key={`${featureHeader}_${children}_${index}`}
          children={children}
        />
      ))}
    </Text>
  )
}

const PricingIcon = ({ type, ...props }) => {
  const color = type === 'yes' ? cx('close') : cx('gray')
  return (
    <Flex
      justifyContent='center'
      style={{ position: 'relative', top: '-14px' }}
      {...props}
    >
      {type === 'yes' && <CheckCircle color={color} />}
    </Flex>
  )
}

const PricingRow = ({ children, ...props }) => {
  const [name, ...values] = children
  return (
    <Text as='tr'>
      <Text as='th' {...props}>
        <Text fontSize={0} fontWeight='regular' children={name} />
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
  pb: 5,
  textAlign: 'left'
}

const Description = props => (
  <Text pr={[0, 0, 4, 4]} color='black60' fontWeight='normal' {...props} />
)

const FeatureLink = ({ children, ...props }) => {
  return (
    <Link color='black' {...props}>
      <Caption
        color='inherit'
        textAlign='left'
        pb={2}
        css={`
          svg {
            position: relative;
            top: -2px;
            transition: stroke ${transition.medium};
          }

          &:hover svg {
            stroke: ${colors.hoverLink};
          }
        `}
      >
        {children} <ExternalIcon width={fontSizes[1]} ml={1} />
      </Caption>
    </Link>
  )
}

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
      px={[0, 0, 4, 4]}
      pb={Container.defaultProps.pt}
      maxWidth={layout.normal}
      {...props}
    >
      <Box
        as='table'
        width='100%'
        textAlign='center'
        style={{
          tableLayout: 'auto',
          borderCollapse: 'collapse'
        }}
      >
        <thead>
          <PricingHeader
            children={[
              '',
              <Caps
                fontWeight='bold'
                fontSize={[0, 2, 2, 2]}
                key='header-free'
                children='Free'
              />,
              <Caps
                fontWeight='bold'
                fontSize={[0, 2, 2, 2]}
                key='header-pro'
                children='Pro'
              />
            ]}
          />
        </thead>
        <tbody>
          <PricingRow
            children={[
              <>
                <FeatureLink
                  href='/recipes/universal-embed'
                  children='Unified metadata'
                />
                <Description>
                  Effortless metadata normalization via Open Graph, oEmbed,
                  JSON+LD and HTML markup.
                </Description>
              </>,
              <PricingIcon type='yes' key='metadata-free' />,
              <PricingIcon type='yes' key='metadata-pro' />
            ]}
          />
          <PricingRow
            children={[
              <>
                <FeatureLink href='/screenshots' children='Take Screenshots' />
                <Description>
                  Live screenshotting with overlay composition and stale
                  revalidation, hosted at Microlink CDN.
                </Description>
              </>,
              <PricingIcon type='yes' key='screenshot-free' />,
              <PricingIcon type='yes' key='screenshot-pro' />
            ]}
          />
          <PricingRow
            children={[
              <>
                <FeatureLink href='/pdf' children='Export to PDF' />
                <Description>
                  Convert any URL into PDF, costless effective with stale
                  revalidation, hosted at Microlink CDN.
                </Description>
              </>,
              <PricingIcon type='yes' key='pdf-free' />,
              <PricingIcon type='yes' key='pdf-pro' />
            ]}
          />
          <PricingRow
            children={[
              <>
                <FeatureLink
                  href='/insights'
                  children='Web Perfomance Audits'
                />
                <Description>
                  Track performance metrics scores over time, generating
                  Lighthouse reports on demand.
                </Description>
              </>,
              <PricingIcon type='yes' key='prerender-free' />,
              <PricingIcon type='yes' key='prerender-pro' />
            ]}
          />
          <PricingRow
            children={[
              <>
                <FeatureLink href='/recipes' children='Web Scraping' />
                <Description>
                  Browser automation made simple via top notch headless browser
                  running on the edge.
                </Description>
              </>,
              <PricingIcon type='yes' key='prerender-free' />,
              <PricingIcon type='yes' key='prerender-pro' />
            ]}
          />
          <PricingRow
            children={[
              <>
                <FeatureLink href='/headers' children='HTTP Headers' />
                <Description>
                  Customize every single request specifying custom HTTP headers
                  to fits use case scenarios.
                </Description>
              </>,
              <PricingIcon type='no' key='headers-free' />,
              <PricingIcon type='yes' key='headers-pro' />
            ]}
          />
          <PricingRow
            children={[
              <>
                <FeatureLink href='/proxy' children='Residential Proxies' />
                <Description>
                  Gather the top 500 popular sites to never be blocked or
                  claked, auto handling retry scenarios.
                </Description>
              </>,
              <PricingIcon type='no' key='proxy-free' />,
              <PricingIcon type='yes' key='proxy-pro' />
            ]}
          />
          <PricingRow
            children={[
              <>
                <FeatureLink href='/ttl' children='Configurable TTL' />
                <Description>
                  Low response time with adaptative time-to-live cache to fit
                  high demand scenarios.
                </Description>
              </>,
              <PricingIcon type='no' key='ttl-free' />,
              <PricingIcon type='yes' key='ttl-pro' />
            ]}
          />
          <PricingRow
            children={[
              <>
                <Caption
                  titleize={false}
                  textAlign='left'
                  pb={2}
                  fontWeight='bold'
                >
                  Service Usage
                </Caption>
                <Description>
                  API quota limit associated with your plan that determines how
                  many requests you can perform in a window of time.
                </Description>
              </>,
              <Text key='price-free'>
                <Text
                  mb={1}
                  children={FREE_PLAN_RATE_LIMIT}
                  style={{
                    border: '1px solid transparent',
                    padding: '2px'
                  }}
                />
                <PricingRequest />
              </Text>,
              <Text key='price-pro'>
                <PricePicker onChange={priceSelected} />
                <PricingRequest />
              </Text>
            ]}
          />
          <PricingRow
            children={[
              '',
              <PricingPrice
                pt={3}
                pb={[0, 3, 3, 3]}
                key='free-plan'
                children={0}
              />,
              <PricingPrice
                pt={3}
                pb={[0, 3, 3, 3]}
                key={`pro-plan-${humanMonthlyPrice}`}
              >
                <Highlight as='span' isHighlight={isHighlight}>
                  {humanMonthlyPrice}
                </Highlight>
              </PricingPrice>
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
