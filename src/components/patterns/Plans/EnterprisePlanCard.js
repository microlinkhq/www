import React from 'react'

import Caps from 'components/elements/Caps'
import { Link } from 'components/elements/Link'
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
    <PlanName>Business & Enterprise</PlanName>
    <PlanTagline>Bought the way companies buy.</PlanTagline>
    <PlanCheckList css={theme({ pt: [3, 3, 4, 4] })}>
      <PlanCheck>Everything in Pro, plus:</PlanCheck>
      <PlanCheck>
        <Link href='/enterprise#what-business-includes'>
          Card or invoice, PO number, net 30
        </Link>
      </PlanCheck>
      <PlanCheck>
        <Link href='/enterprise#your-data-protected'>
          NDA, DPA & service agreement
        </Link>
      </PlanCheck>
      <PlanCheck>Vendor assessments on request</PlanCheck>
      <PlanCheck>Same named contact</PlanCheck>
      <PlanCheck>Annual billing, 10% discount</PlanCheck>
    </PlanCheckList>
    <Caps
      css={theme({
        pt: [3, 3, 4, 4],
        fontSize: 0,
        fontWeight: 'bold',
        color: 'black60'
      })}
    >
      Enterprise adds
    </Caps>
    <PlanCheckList>
      <PlanCheck>
        <Link href='/enterprise#what-enterprise-includes'>
          Dedicated endpoint & browser pool
        </Link>
      </PlanCheck>
      <PlanCheck>
        <Link href='/enterprise#what-enterprise-includes'>
          Dedicated CDN & S3-like storage
        </Link>
      </PlanCheck>
      <PlanCheck>
        <Link href='/enterprise#choose-where-your-hardware-lives'>
          Hosted where you need it
        </Link>
      </PlanCheck>
    </PlanCheckList>
    <PlanAction>
      <ArrowLink href='/enterprise'>View details</ArrowLink>
    </PlanAction>
  </PricingCard>
)

export default EnterprisePlanCard
