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
  { id: 'pro-500-v3', ...createReqsLabels(500) },
  { id: 'pro-1k-v3', ...createReqsLabels(1000) },
  { id: 'pro-2k-v3', ...createReqsLabels(2000) },
  { id: 'pro-3k-v3', ...createReqsLabels(3000) },
  { id: 'pro-5k-v3', ...createReqsLabels(5000) },
  { id: 'pro-10k-v3', ...createReqsLabels(10000) },
  { id: 'pro-15k-v3', ...createReqsLabels(15000) },
  { id: 'pro-20k-v3', ...createReqsLabels(20000) }
]

export const DEFAULT_PLAN = PLANS[1]

const PricePicker = ({ onChange }) => {
  const [plan, setPlan] = useState(DEFAULT_PLAN)

  const handleChange = event => {
    const selectedPlan = PLANS.find(
      ({ reqsPerMonthPretty }) => reqsPerMonthPretty === event.target.value
    )
    setPlan(selectedPlan)
    onChange(selectedPlan)
  }

  return (
    <Select
      aria-label={`${plan.reqsPerMonthPretty.replace(
        'K',
        '000'
      )} requests per month`}
      width={['65px', '65px', '75px', '75px']}
      value={plan.reqsPerMonthPretty}
      onChange={handleChange}
      selected={plan.reqsPerMonthPretty}
      style={{ fontVariantNumeric: 'tabular-nums' }}
      mb={1}
    >
      {Object.keys(PLANS).map(plan => (
        <option key={plan}>{PLANS[plan].reqsPerMonthPretty}</option>
      ))}
    </Select>
  )
}

export default PricePicker
