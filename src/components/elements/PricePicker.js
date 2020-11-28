import { Select } from 'components/elements'
import React, { useState } from 'react'
import { formatNumber } from 'helpers'

const BASE_PLAN_PRICE = 24

const MONTH_DAYS = 28

const createReqsLabels = reqsPerDay => {
  const reqsPerMonth = formatNumber(reqsPerDay * MONTH_DAYS)
  return {
    reqsPerMonth,
    reqsPerMonthPretty: reqsPerMonth.replace(',000', 'K'),
    monthlyPrice: calculateMonthlyPrice(reqsPerDay)
  }
}

const calculateMonthlyPrice = reqsPerDay =>
  (reqsPerDay / 1000) * BASE_PLAN_PRICE

export const PLANS = [
  { planId: 'pro-500-v3', ...createReqsLabels(500) },
  { planId: 'pro-1k-v3', ...createReqsLabels(1000) },
  { planId: 'pro-2k-v3', ...createReqsLabels(2000) },
  { planId: 'pro-3k-v3', ...createReqsLabels(3000) },
  { planId: 'pro-5k-v3', ...createReqsLabels(5000) },
  { planId: 'pro-10k-v3', ...createReqsLabels(10000) },
  { planId: 'pro-15k-v3', ...createReqsLabels(15000) },
  { planId: 'pro-20k-v3', ...createReqsLabels(20000) }
]

export const DEFAULT_PLAN = PLANS[1]

export default props => {
  const [currentPlan, setCurrentPlan] = useState(DEFAULT_PLAN)

  const handleChange = event => {
    const reqsPerMonthPretty = event.target.value
    const newPlan = PLANS.find(
      plan => plan.reqsPerMonthPretty === reqsPerMonthPretty
    )
    setCurrentPlan(newPlan)
    props.onChange(newPlan)
  }

  return (
    <Select
      width={['65px', '65px', '75px', '75px']}
      value={currentPlan.reqsPerMonthPretty}
      onChange={handleChange}
      selected={currentPlan.reqsPerMonthPretty}
      mb={1}
      style={{ fontVariantNumeric: 'tabular-nums' }}
    >
      {Object.keys(PLANS).map(plan => (
        <option key={plan}>{PLANS[plan].reqsPerMonthPretty}</option>
      ))}
    </Select>
  )
}
