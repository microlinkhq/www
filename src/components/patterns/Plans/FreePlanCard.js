import React from 'react'

import Box from 'components/elements/Box'
import { Link } from 'components/elements/Link'
import Text from 'components/elements/Text'
import ArrowLink from 'components/patterns/ArrowLink'
import { theme } from 'theme'

import {
  PlanAction,
  PlanCheck,
  PlanCheckList,
  PlanName,
  PlanTagline,
  PriceTag,
  PricingCard,
  planDisplay
} from './shared'

const FREE_PLAN_RATE_LIMIT = 25

const FreePlanCard = ({ activePlan }) => (
  <PricingCard
    id='panel-free'
    css={theme({ display: planDisplay(activePlan, 'free') })}
  >
    <PlanName>Free</PlanName>
    <PlanTagline>Try the API in seconds. No card.</PlanTagline>
    <Box css={theme({ pt: [3, 3, 4, 4] })}>
      <PriceTag prices={0} />
      <Text
        css={theme({
          pt: 2,
          fontSize: 0,
          color: 'black70',
          fontVariantNumeric: 'tabular-nums'
        })}
      >
        {FREE_PLAN_RATE_LIMIT} requests per day
      </Text>
    </Box>
    <PlanCheckList as='ul' css={theme({ pt: [3, 3, 4, 4] })}>
      <PlanCheck>{FREE_PLAN_RATE_LIMIT} requests / day</PlanCheck>
      <PlanCheck>
        <Link href='/screenshot'>Screenshot</Link>, <Link href='/pdf'>PDF</Link>
        , <Link href='/integrations/sdk'>SDK</Link>
      </PlanCheck>
      <PlanCheck>
        <Link href='/metadata'>Metadata</Link>, <Link href='/logo'>Logo</Link>,{' '}
        <Link href='/insights'>Insights</Link>
      </PlanCheck>
      <PlanCheck>
        <Link href='/blog/edge-cdn'>Global edge cache</Link>
      </PlanCheck>
      <PlanCheck>
        <Link href='/docs/api/parameters/adblock'>
          Adblock & cookie banners
        </Link>
      </PlanCheck>
      <PlanCheck>
        <Link href='/community'>Community support</Link>
      </PlanCheck>
    </PlanCheckList>
    <PlanAction>
      <ArrowLink href='/docs/guides'>Get started free</ArrowLink>
    </PlanAction>
  </PricingCard>
)

export default FreePlanCard
