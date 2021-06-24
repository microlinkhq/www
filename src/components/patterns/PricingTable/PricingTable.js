import PricePicker, { DEFAULT_PLAN } from 'components/elements/PricePicker'
import { Caption, ArrowLink, Checkout } from 'components/patterns'
import { ExternalLink as ExternalIcon } from 'react-feather'
import { transition, colors } from 'theme'
import React, { useState } from 'react'
import { formatNumber } from 'helpers'
import styled from 'styled-components'

import {
  PriceMonthly,
  Link,
  Highlight,
  Box,
  Label,
  Flex,
  Text,
  Container,
  Subhead
} from 'components/elements'

const FREE_PLAN_RATE_LIMIT = 100

const Requests = props => (
  <Label display='inline' {...props}>
    requests
  </Label>
)

const PricingLink = ({ children, ...props }) => {
  return (
    <Link color='black' {...props}>
      <Caption
        fontSize={[1, 1, 2, 2]}
        display='inline'
        color='inherit'
        textAlign='left'
        pb={2}
        css={`
          svg {
            transition: stroke ${transition.medium};
          }
          &:hover svg {
            stroke: ${colors.hoverLink};
          }
        `}
      >
        {children}

        <Flex display='inline-flex' ml={1}>
          <ExternalIcon size={14} color={colors.black20} />
        </Flex>
      </Caption>
    </Link>
  )
}

const PricingBox = props => (
  <Box
    borderRadius={5}
    textAlign='center'
    width={['100%', '100%', 8, 8]}
    px={[0, 0, 5, 5]}
    py={[0, 0, 5, 5]}
    border={[0, 0, 1, 1]}
    bg='white'
    {...props}
  />
)

export const createPricingTable = Checkout => ({
  canonicalUrl,
  stripeKey,
  apiEndpoint,
  ...props
}) => {
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

  const FreePricingBox = styled(PricingBox)`
    border-color: ${colors.black10};
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  `

  const ProPricingBox = styled(PricingBox)`
    border-color: ${colors.black50};
    display: flex;
    flex-direction: column;
    position: relative;
    left: -1px;
  `

  const EnterprisePricingBox = styled(PricingBox)`
    border-color: ${colors.black10};
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    position: relative;
    left: -1px;
  `

  return (
    <Flex
      flexDirection={['column', 'column', 'row', 'row']}
      as='section'
      ml='auto'
      mr='auto'
      px={[0, 0, 4, 4]}
      pb={Container.defaultProps.pt}
      {...props}
    >
      <FreePricingBox my={[0, 0, 5, 5]} pt={5}>
        <Subhead fontSize={[3, 3, 4, 4]}>Free</Subhead>

        <Box pt={4}>
          <Text>
            {FREE_PLAN_RATE_LIMIT} <Requests suffix='/day' />
          </Text>
          <Box pt={4}>
            <PriceMonthly>0</PriceMonthly>
          </Box>
        </Box>

        <Box as='ul' m={0} pl={4} pt={4} textAlign='left'>
          <Text as='li'>
            <PricingLink href='/blog/edge-cdn/'>
              Microlink Cache layer
            </PricingLink>
          </Text>
          <Text as='li'>
            <PricingLink href='/meta'>Unified metadata</PricingLink>
          </Text>
          <Text as='li' pt={1}>
            <PricingLink href='/screenshot'>Take screenshots</PricingLink>
          </Text>
          <Text as='li' pt={1}>
            <PricingLink href='/pdf'>Export to PDF</PricingLink>
          </Text>
          <Text as='li' pt={1}>
            <PricingLink href='/insights'>Insights reports</PricingLink>
          </Text>
          <Text as='li' pt={1}>
            <PricingLink href='/recipes'>Web Scraping</PricingLink>
          </Text>
        </Box>

        <Box pt={4}>
          <ArrowLink href='/docs/api/getting-started/overview'>
            Get Started
          </ArrowLink>
        </Box>
      </FreePricingBox>

      <ProPricingBox pb={[0, 0, 6, 6]}>
        <Box flex={1}>
          <Subhead fontSize={[3, 3, 4, 4]} pt={5}>
            Pro
          </Subhead>

          <Box pt={4}>
            <Text>
              <PricePicker onChange={priceSelected} />{' '}
              <Requests suffix='/month' />
            </Text>
            <Box pt='26px'>
              <Text fontSize={0}>
                <PriceMonthly>
                  <Highlight as='span' isHighlight={isHighlight}>
                    {humanMonthlyPrice}
                  </Highlight>
                </PriceMonthly>
              </Text>
            </Box>
          </Box>

          <Box as='ul' m={0} pl={4} pt={4} textAlign='left'>
            <Text as='li'>
              Everything in Free,{' '}
              <Text as='span' fontWeight='bold'>
                plus
              </Text>
              :
            </Text>
            <Text as='li' pt={1}>
              <PricingLink href='/docs/api/parameters/headers'>
                Custom HTTP headers
              </PricingLink>
            </Text>
            <Text as='li' pt={1}>
              <PricingLink href='/docs/api/parameters/proxy'>
                Automatic proxy rotation
              </PricingLink>
            </Text>
            <Text as='li' pt={1}>
              <PricingLink href='/docs/api/parameters/ttl'>
                Configurable TTL
              </PricingLink>
            </Text>
            <Text as='li' style={{ opacity: 0 }} />
            <Text as='li' style={{ opacity: 0 }} />
          </Box>
        </Box>

        <Box>
          <Checkout
            planId={planId}
            canonicalUrl={canonicalUrl}
            stripeKey={stripeKey}
          />
        </Box>
      </ProPricingBox>

      <EnterprisePricingBox my={[0, 0, 5, 5]} pt={5}>
        <Subhead fontSize={[3, 3, 4, 4]}>Enterprise</Subhead>

        <Box pt={4}>
          <Text>Starts from</Text>
          <Box pt={4}>
            <PriceMonthly>500</PriceMonthly>
          </Box>
        </Box>

        <Box as='ul' m={0} pl={4} pt={4} textAlign='left'>
          <Text as='li'>
            Everything in Pro,{' '}
            <Text as='span' fontWeight='bold'>
              plus
            </Text>
            :
          </Text>
          <Text as='li' pt={1}>
            <PricingLink href='/enterprise'>Custom API endpoint</PricingLink>
          </Text>
          <Text as='li' pt={1}>
            <PricingLink href='/enterprise'>
              Dedicated CDN distribution
            </PricingLink>
          </Text>
          <Text as='li' pt={1}>
            <PricingLink href='/enterprise'>
              S3 like storage integration
            </PricingLink>
          </Text>
          <Text as='li' style={{ opacity: 0 }} />
          <Text as='li' style={{ opacity: 0 }} />
        </Box>

        <Box pt={4}>
          <ArrowLink href='/enterprise'>Read More</ArrowLink>
        </Box>
      </EnterprisePricingBox>
    </Flex>
  )
}

export default createPricingTable(Checkout)
