import PricePicker, { DEFAULT_PLAN } from 'components/elements/PricePicker'
import { Caption, ArrowLink, Checkout } from 'components/patterns'
import React, { useState } from 'react'
import { formatNumber } from 'helpers'
import styled from 'styled-components'
import { colors } from 'theme'

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

const FREE_PLAN_RATE_LIMIT = 50

const Requests = ({ suffix, ...props }) => (
  <Label
    display='inline'
    aria-label={`requests per ${suffix}`}
    suffix={`/${suffix}`}
    {...props}
  >
    requests
  </Label>
)

const PricingLink = ({ children, ...props }) => {
  return (
    <Link.External color='black' {...props}>
      <Caption
        fontSize={[1, 1, 2, 2]}
        display='inline'
        color='inherit'
        textAlign='left'
      >
        {children}
      </Caption>
    </Link.External>
  )
}

const PricingBox = props => (
  <Box
    borderRadius={5}
    textAlign='center'
    width={['100%', '100%', 8, 8]}
    px={[0, 0, 5, 5]}
    py={[0, 0, 5, 5]}
    my={[4, 0, 0, 0]}
    border={[0, 0, 1, 1]}
    bg='white'
    {...props}
  />
)

const FreePricingBox = styled(PricingBox)`
  border-color: ${colors.black20};
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-right: 0;
`

const ProPricingBoxGradient = styled(PricingBox)`
  display: flex;
  flex-direction: column;
  position: relative;
  left: -1px;
  border none;
  background: linear-gradient(90deg, #f76698, #c03fa2 60%, #8c1bab 100%);
  border-radius: 7px;
  padding: 2px;
  `

const ProPricingBox = styled(Box)`
  background: #fff;
  border-radius: 6px;
`

const EnterprisePricingBox = styled(PricingBox)`
  border-color: ${colors.black20};
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  position: relative;
  border-left: 0;
  left: -1px;
`

export const createPricingTable = Checkout => {
  const PricingTable = ({ canonicalUrl, stripeKey, apiEndpoint, ...props }) => {
    const [plan, setPlan] = useState(DEFAULT_PLAN)
    const { monthlyPrice, id: planId } = plan
    const humanMonthlyPrice = formatNumber(monthlyPrice)

    return (
      <Flex
        flexDirection={['column', 'column', 'row', 'row']}
        ml='auto'
        mr='auto'
        px={[0, 0, 4, 4]}
        pb={Container.defaultProps.pt}
        {...props}
      >
        <FreePricingBox my={[0, 0, 5, 5]} pt={[3, 3, 5, 5]}>
          <Subhead fontSize={[3, 3, 4, 4]}>Free</Subhead>

          <Box pt={4}>
            <Text>
              {FREE_PLAN_RATE_LIMIT} <Requests suffix='day' />
            </Text>
            <Box pt={4}>
              <PriceMonthly>0</PriceMonthly>
            </Box>
          </Box>

          <Box as='ul' m={0} pl={4} pt={4} textAlign='left'>
            <Text as='li' pt={1}>
              <PricingLink href='/sdk'>Microlink SDK</PricingLink>
            </Text>
            <Text as='li' pt={1}>
              <PricingLink href='/pdf'>Microlink PDF</PricingLink>
            </Text>
            <Text as='li' pt={1}>
              <PricingLink href='/insights'>Microlink insights</PricingLink>
            </Text>
            <Text as='li' pt={1}>
              <PricingLink href='/recipes'>Microlink recipes</PricingLink>
            </Text>
            <Text as='li'>
              <PricingLink href='/meta'>Microlink metadata</PricingLink>
            </Text>
            <Text as='li' pt={1}>
              <PricingLink href='/screenshot'>Microlink screenshot</PricingLink>
            </Text>
          </Box>

          <Box pt={4}>
            <ArrowLink href='/docs/api/getting-started/overview' fontSize={2}>
              Get started
            </ArrowLink>
          </Box>
        </FreePricingBox>

        <ProPricingBoxGradient>
          <ProPricingBox flex={1} px={[0, 0, 5, 5]} py={[0, 0, 5, 5]}>
            <Box>
              <Subhead fontSize={[3, 3, 4, 4]} pt={[3, 3, 5, 5]}>
                Pro
              </Subhead>

              <Box pt={4}>
                <Text>
                  <PricePicker onChange={setPlan} /> <Requests suffix='month' />
                </Text>
                <Box pt='26px'>
                  <Text fontSize={0}>
                    <PriceMonthly>
                      <Highlight as='span'>{humanMonthlyPrice}</Highlight>
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
                  <PricingLink href='/docs/api/parameters/ttl'>
                    Configurable TTL
                  </PricingLink>
                </Text>
                <Text as='li' pt={1}>
                  <PricingLink href='/docs/api/parameters/headers'>
                    Custom HTTP headers
                  </PricingLink>
                </Text>
                <Text as='li' pt={1}>
                  <PricingLink href='/docs/api/parameters/proxy'>
                    Automatic proxy resolution
                  </PricingLink>
                </Text>
              </Box>
            </Box>
            <Box pt={4}>
              <Checkout
                planId={planId}
                canonicalUrl={canonicalUrl}
                stripeKey={stripeKey}
              />
            </Box>
          </ProPricingBox>
        </ProPricingBoxGradient>

        <EnterprisePricingBox my={[0, 0, 5, 5]} pt={[3, 3, 5, 5]}>
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
          </Box>

          <Box pt={4}>
            <ArrowLink href='/enterprise' fontSize={2}>
              Read more
            </ArrowLink>
          </Box>
        </EnterprisePricingBox>
      </Flex>
    )
  }

  return PricingTable
}

export default createPricingTable(Checkout)
