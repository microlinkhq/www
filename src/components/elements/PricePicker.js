import React, { useState } from 'react'
import { Select, Label } from 'components/elements'
import { formatNumber } from 'helpers'

const BASE_PLAN_PRICE = 24

const MONTH_DAYS = 28

const createReqsLabels = reqsPerDay => ({
  reqsPerMonth: formatNumber(reqsPerDay * MONTH_DAYS),
  monthlyPrice: calculateMonthlyPrice(reqsPerDay)
})

const calculateMonthlyPrice = reqsPerDay =>
  (reqsPerDay / 1000) * BASE_PLAN_PRICE

export const PLANS = [
  { planId: 'pro-1k-v3', ...createReqsLabels(500), width: '4.5rem' },
  { planId: 'pro-500-v3', ...createReqsLabels(1000), width: '4.5rem' },
  { planId: 'pro-3k-v3', ...createReqsLabels(3000), width: '4.5rem' },
  { planId: 'pro-5k-v3', ...createReqsLabels(5000), width: '5rem' },
  { planId: 'pro-10k-v3', ...createReqsLabels(10000), width: '5rem' },
  { planId: 'pro-15k-v3', ...createReqsLabels(15000), width: '5rem' },
  { planId: 'pro-20k-v3', ...createReqsLabels(20000), width: '5rem' },
  { planId: 'pro-50k-v3', ...createReqsLabels(50000), width: '5.7rem' }
]

export const DEFAULT_PLAN = PLANS[1]

export default props => {
  const [currentPlan, setCurrentPlan] = useState(DEFAULT_PLAN)

  const handleChange = event => {
    const reqsPerMonth = event.target.value
    const newPlan = PLANS.find(plan => plan.reqsPerMonth === reqsPerMonth)
    setCurrentPlan(newPlan)
    props.onChange(newPlan)
  }

  return (
    <>
      <Select
        width={currentPlan.width}
        value={currentPlan.reqsPerMonth}
        onChange={handleChange}
        selected={currentPlan.reqsPerMonth}
      >
        {Object.keys(PLANS).map(plan => (
          <option key={plan}>{PLANS[plan].reqsPerMonth}</option>
        ))}
      </Select>
      <Label ml={1} display='inline' children=' reqs' suffix='/month' />
    </>
  )
}
