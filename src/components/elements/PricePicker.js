import React, { Component } from 'react'
import { Box, Select, Label } from 'components/elements'
import humanNumber from 'human-number'

const calculateMonthlyPrice = reqsPerDay => reqsPerDay / 1000 * BASE_PLAN_PRICE

export const BASE_PLAN_PRICE = 12

export const BASE_PLAN_REQS = 1000

export const DEFAULT_PLAN = {
  planId: 'pro-1k-v2',
  reqsPerDay: BASE_PLAN_REQS,
  humanReqsPerDay: humanNumber(BASE_PLAN_REQS),
  monthlyPrice: calculateMonthlyPrice(BASE_PLAN_REQS)
}

export const PLANS = [DEFAULT_PLAN]
  .concat([
    { planId: 'pro-3k-v2', reqsPerDay: 3000 },
    { planId: 'pro-10k-v2', reqsPerDay: 10000 },
    { planId: 'pro-50k-v2', reqsPerDay: 50000 },
    { planId: 'pro-100k-v2', reqsPerDay: 100000 },
    { planId: 'pro-500k-v2', reqsPerDay: 500000 },
    { planId: 'pro-1m-v2', reqsPerDay: 1000000 }
  ])
  .reduce(
    (acc, { planId, reqsPerDay }) => ({
      ...acc,
      [reqsPerDay]: {
        planId,
        humanReqsPerDay: humanNumber(reqsPerDay),
        monthlyPrice: calculateMonthlyPrice(reqsPerDay)
      }
    }),
    {}
  )

export default class extends Component {
  state = { ...DEFAULT_PLAN }

  handleChange = event => {
    event.preventDefault()
    const { value: reqsPerDay } = event.target
    const newState = { reqsPerDay, ...PLANS[reqsPerDay] }
    this.setState(newState)
    this.props.onChange(newState)
  }

  render () {
    return (
      <Box>
        <Select
          mx='auto'
          p={1}
          width={['3.2rem', '3.8rem']}
          value={this.state.reqs}
          onChange={this.handleChange}
        >
          {Object.keys(PLANS).map(plan => (
            <option
              key={plan}
              value={plan}
              children={PLANS[plan].humanReqsPerDay}
            />
          ))}
        </Select>
        <Label ml={1} display='inline' children=' reqs' suffix='/day' />
      </Box>
    )
  }
}
