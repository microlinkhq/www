import React, { useState } from 'react'

import Box from 'components/elements/Box'
import { Link } from 'components/elements/Link'
import PricePicker, { DEFAULT_PLAN } from 'components/elements/PricePicker'
import Text from 'components/elements/Text'
import { useCurrencyContext } from 'components/hook/use-currency'
import Checkout from 'components/patterns/Checkout'
import { theme } from 'theme'

import {
  CURRENCIES,
  PlanCheck,
  PlanCheckList,
  PlanName,
  PlanTagline,
  PriceTag,
  ProPricingCard,
  planDisplay
} from './shared'

const ProPlanCard = ({ activePlan, canonicalUrl, stripeKey }) => {
  const [plan, setPlan] = useState(DEFAULT_PLAN)
  const [currency] = useCurrencyContext()
  const { monthlyPrice, id: planId, reqsPerMonthTotal } = plan
  const pricePer1k = (
    monthlyPrice[currency] /
    (reqsPerMonthTotal / 1000)
  ).toFixed(2)
  const { symbol: currencySymbol } = CURRENCIES[currency]

  return (
    <ProPricingCard
      id='panel-pro'
      css={theme({ display: planDisplay(activePlan, 'pro') })}
    >
      <PlanName>Pro</PlanName>
      <PlanTagline>For production workloads.</PlanTagline>
      <Box css={theme({ pt: [3, 3, 4, 4] })}>
        <PriceTag prices={monthlyPrice} highlight />
        <Text
          css={theme({
            pt: 2,
            fontSize: 0,
            color: 'pink7',
            fontWeight: 'bold',
            fontVariantNumeric: 'tabular-nums'
          })}
        >
          ≈ {currencySymbol}
          {pricePer1k} per 1,000 requests
        </Text>
      </Box>
      <Box css={theme({ pt: [3, 3, 4, 4] })}>
        <PricePicker onChange={setPlan} />
      </Box>
      <PlanCheckList as='ul' css={theme({ pt: [3, 3, 4, 4] })}>
        <PlanCheck>Everything in Free</PlanCheck>
        <PlanCheck>
          <Link href='/features/proxy'>Automatic proxy resolution</Link>
        </PlanCheck>
        <PlanCheck>
          <Link href='/features/ttl'>Configurable TTL</Link>
        </PlanCheck>
        <PlanCheck>
          <Link href='/features/headers'>Custom HTTP headers</Link>
        </PlanCheck>
        <PlanCheck>
          <Link href='/docs/api/parameters/cacheKey'>Custom cache key</Link>
        </PlanCheck>
        <PlanCheck>Priority email support</PlanCheck>
      </PlanCheckList>
      <Box css={theme({ pt: [4, 4, 5, 5], mt: 'auto' })}>
        <Checkout
          variant='gradient'
          planId={planId}
          canonicalUrl={canonicalUrl}
          stripeKey={stripeKey}
          css={theme({ width: '100%' })}
        />
        <Text
          css={theme({
            pt: 2,
            fontSize: 0,
            color: 'black70',
            textAlign: 'center'
          })}
        >
          Cancel anytime · No setup fees
        </Text>
      </Box>
    </ProPricingCard>
  )
}

export default ProPlanCard
