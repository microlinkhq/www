import { formatNumber } from 'helpers/format-number'
import Box from './Box'
import Select from './Select/Select'
import React, { useState } from 'react'
import { theme } from 'theme'

const BASE_PLAN_PRICE = 24

const MONTH_DAYS = 28

const createReqsLabels = reqsPerDay => {
  const total = reqsPerDay * MONTH_DAYS
  const reqsPerMonth = formatNumber(total)
  const pretty = Math.round(total / 1000)
  const reqsPerMonthPretty = `${formatNumber(pretty)}K`

  return {
    reqsPerMonth,
    reqsPerMonthPretty,
    monthlyPrice: calculateMonthlyPrice(reqsPerDay)
  }
}

const calculateMonthlyPrice = reqsPerDay =>
  (reqsPerDay / 1000) * BASE_PLAN_PRICE

export const PLANS = [
  { id: 'pro-1625-v3', ...createReqsLabels(1625) },
  { id: 'pro-3k-v3', ...createReqsLabels(3000) },
  { id: 'pro-5k-v3', ...createReqsLabels(5000) },
  { id: 'pro-10k-v3', ...createReqsLabels(10000) },
  { id: 'pro-15k-v3', ...createReqsLabels(15000) },
  { id: 'pro-20k-v3', ...createReqsLabels(20000) }
]

export const DEFAULT_PLAN = PLANS[0]

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
    <Box
      css={theme({
        display: 'inline-block',
        width: ['65px', '65px', '75px', '75px'],
        mb: 1
      })}
    >
      <Select
        aria-label={`${plan.reqsPerMonth} requests per month`}
        value={plan.reqsPerMonthPretty}
        onChange={handleChange}
        selected={plan.reqsPerMonthPretty}
        style={{ fontVariantNumeric: 'tabular-nums' }}
      >
        {Object.keys(PLANS).map(plan => (
          <option key={plan}>{PLANS[plan].reqsPerMonthPretty}</option>
        ))}
      </Select>
    </Box>
  )
}

export default PricePicker
