import React, { Component } from 'react'
import { Box, Select, Label } from 'components/elements'
import humanNumber from 'human-number'

const createReqsLabels = reqsPerDay => ({
  reqsPerDay,
  humanReqsPerDay: humanNumber(reqsPerDay),
  monthlyPrice: calculateMonthlyPrice(reqsPerDay)
})

const calculateMonthlyPrice = reqsPerDay =>
  (reqsPerDay / 1000) * BASE_PLAN_PRICE

export const BASE_PLAN_PRICE = 12

export const PLANS = [
  { planId: 'pro-1k-v2', ...createReqsLabels(1000) },
  { planId: 'pro-2k-v2', ...createReqsLabels(2000) },
  { planId: 'pro-3k-v2', ...createReqsLabels(3000) },
  { planId: 'pro-10k-v2', ...createReqsLabels(10000) },
  { planId: 'pro-50k-v2', ...createReqsLabels(50000) }
]

export const DEFAULT_PLAN = PLANS[1]

export default class extends Component {
  state = { ...DEFAULT_PLAN }

  handleChange = event => {
    event.preventDefault()
    const { value: humanReqsPerDay } = event.target
    const newState = PLANS.find(
      plan => plan.humanReqsPerDay === humanReqsPerDay
    )
    this.setState(newState)
    this.props.onChange(newState)
  }

  render () {
    return (
      <Box>
        <Select
          py='2px'
          width={['3.2rem', '3.8rem']}
          value={this.state.humanReqsPerDay}
          onChange={this.handleChange}
        >
          {Object.keys(PLANS).map(plan => (
            <option key={plan}>{PLANS[plan].humanReqsPerDay}</option>
          ))}
        </Select>
        <Label ml={1} display='inline' children=' reqs' suffix='/day' />
      </Box>
    )
  }
}
