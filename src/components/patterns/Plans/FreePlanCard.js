import React from 'react'
import { useLocation } from '@gatsbyjs/reach-router'

import Box from 'components/elements/Box'
import { Link } from 'components/elements/Link'
import Text from 'components/elements/Text'
import { SignupLink } from 'components/patterns/SignupLink'
import { eventLocation } from 'helpers/dashboard-url'
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

const FREE_PLAN_RATE_LIMIT = 100

const FreePlanSignupLink = () => {
  const { pathname } = useLocation()

  return (
    <SignupLink cta={`${eventLocation(pathname)}:free-plan`}>
      Get your free API key
    </SignupLink>
  )
}

const FreePlanCard = ({ activePlan }) => (
  <PricingCard
    id='panel-free'
    css={theme({ display: planDisplay(activePlan, 'free') })}
  >
    <PlanName>Free</PlanName>
    <PlanTagline>Every Pro feature. No card.</PlanTagline>
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
        {FREE_PLAN_RATE_LIMIT} requests per month
      </Text>
    </Box>
    <PlanCheckList css={theme({ pt: [3, 3, 4, 4] })}>
      <PlanCheck>{FREE_PLAN_RATE_LIMIT} requests / month</PlanCheck>
      <PlanCheck>
        <Link href='/screenshot'>Screenshot</Link>, <Link href='/pdf'>PDF</Link>
        , <Link href='/integrations/sdk'>SDK</Link>
      </PlanCheck>
      <PlanCheck>
        <Link href='/metadata'>Metadata</Link>, <Link href='/logo'>Logo</Link>,{' '}
        <Link href='/insights'>Insights</Link>
      </PlanCheck>
      <PlanCheck>
        <Link href='/markdown'>Markdown</Link>, <Link href='/html'>HTML</Link>,{' '}
        <Link href='/text'>Text</Link>
      </PlanCheck>
      <PlanCheck>
        <Link href='/function'>Function</Link>, <Link href='/media'>Media</Link>
        , <Link href='/file-conversion'>File Conversion</Link>
      </PlanCheck>
      <PlanCheck>
        <Link href='/search'>Search</Link>, <Link href='/embed'>Embed</Link>,{' '}
        <Link href='/features/proxy'>Proxy</Link>
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
      <FreePlanSignupLink />
    </PlanAction>
  </PricingCard>
)

export default FreePlanCard
