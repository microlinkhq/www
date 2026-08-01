import React from 'react'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
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
  PricingCard,
  planDisplay
} from './shared'

const EnterprisePlanCard = ({ activePlan }) => (
  <PricingCard
    id='panel-enterprise'
    css={theme({ display: planDisplay(activePlan, 'enterprise') })}
  >
    <PlanName>Enterprise</PlanName>
    <PlanTagline>Dedicated infra for high-volume.</PlanTagline>
    <Box css={theme({ pt: [3, 3, 4, 4] })}>
      <Flex css={theme({ alignItems: 'baseline', gap: 1 })}>
        <Text
          as='span'
          css={theme({
            fontSize: [2, 2, 3, 3],
            fontWeight: 'bold',
            color: 'black',
            lineHeight: 0
          })}
        >
          Custom
        </Text>
      </Flex>
      <Text css={theme({ pt: 2, fontSize: 0, color: 'black70' })}>
        Tailored to your volume
      </Text>
    </Box>
    <PlanCheckList as='ul' css={theme({ pt: [3, 3, 4, 4] })}>
      <PlanCheck>Everything in Pro</PlanCheck>
      <PlanCheck>
        <Link href='/enterprise'>Custom API endpoint</Link>
      </PlanCheck>
      <PlanCheck>
        <Link href='/enterprise'>Dedicated CDN distribution</Link>
      </PlanCheck>
      <PlanCheck>
        <Link href='/enterprise'>S3-like storage integration</Link>
      </PlanCheck>
      <PlanCheck>Custom SLA & DPA available</PlanCheck>
    </PlanCheckList>
    <PlanAction>
      <ArrowLink href='/enterprise'>Explore Enterprise</ArrowLink>
    </PlanAction>
  </PricingCard>
)

export default EnterprisePlanCard
