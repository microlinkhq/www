import React, { useState } from 'react'

import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import { DEFAULT_PLAN } from 'components/elements/PricePicker'
import Toggle from 'components/elements/Toggle/Toggle'
import { theme } from 'theme'

import EnterprisePlanCard from './EnterprisePlanCard'
import FreePlanCard from './FreePlanCard'
import PlansFooter from './PlansFooter'
import ProPlanCard from './ProPlanCard'

export { CURRENCIES, formatPrice } from './shared'

const PLAN_TABS = [
  { id: 'free', node: 'Free' },
  { id: 'pro', node: 'Pro' },
  { id: 'enterprise', node: 'Enterprise' }
]

const Plans = ({ canonicalUrl, stripeKey, footer = 'none' }) => {
  const [plan, setPlan] = useState(DEFAULT_PLAN)
  const [activePlan, setActivePlan] = useState('pro')

  return (
    <Container
      as='section'
      id='pricing-plans'
      css={theme({
        alignItems: 'center',
        maxWidth: '100%',
        py: [4, 4, 5, 5],
        px: [3, 3, 4, 4]
      })}
    >
      <Flex
        css={theme({
          display: ['flex', 'flex', 'none', 'none'],
          justifyContent: 'center',
          pb: 4,
          width: '100%'
        })}
      >
        <Toggle
          aria-label='Pricing plans'
          defaultValue='pro'
          onChange={setActivePlan}
          css={theme({ width: 'auto' })}
        >
          {PLAN_TABS}
        </Toggle>
      </Flex>
      <Flex
        css={theme({
          flexDirection: ['column', 'column', 'row', 'row'],
          alignItems: ['stretch', 'stretch', 'flex-start', 'flex-start'],
          justifyContent: 'center',
          gap: [4, 4, 3, 4],
          width: '100%'
        })}
      >
        <FreePlanCard activePlan={activePlan} />
        <ProPlanCard
          activePlan={activePlan}
          plan={plan}
          onPlanChange={setPlan}
          canonicalUrl={canonicalUrl}
          stripeKey={stripeKey}
        />
        <EnterprisePlanCard activePlan={activePlan} />
      </Flex>

      {footer !== 'none' && <PlansFooter footer={footer} />}
    </Container>
  )
}

export default Plans
