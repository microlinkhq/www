import React, { Component } from 'react'
import { Box, Select, Label } from 'components/elements'

export const DEFAULT_PLAN = {
  reqs: 1000,
  planId: 'pro-1k'
}

export const BASE_PLAN_PRICE = 9

export const PLANS = {
  1000: { planId: 'pro-1k', text: '1K' },
  3000: { planId: 'pro-3k', text: '3K' },
  10000: { planId: 'pro-10k', text: '10K' },
  50000: { planId: 'pro-50k', text: '50K' },
  100000: { planId: 'pro-100k', text: '100K' },
  500000: { planId: 'pro-500k', text: '500K' },
  1000000: { planId: 'pro-1m', text: '1M' }
}

export default class extends Component {
  state = { ...DEFAULT_PLAN }

  handleChange = event => {
    event.preventDefault()
    const { value: reqs } = event.target
    const price = reqs / 1000 * BASE_PLAN_PRICE
    const newState = { reqs, price, ...PLANS[reqs] }
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
            <option key={plan} value={plan} children={PLANS[plan].text} />
          ))}
        </Select>
        <Label ml={1} display='inline' children=' reqs' suffix='/day' />
      </Box>
    )
  }
}
