import React, { Component } from 'react'
import { space, width } from 'styled-system'
import { Select } from 'components/elements'

const CustomSelect = Select.extend`
  ${space} ${width} cursor: pointer;
`

const PLANS = {
  1000: 'pro-1k-v2',
  3000: 'pro-3k-v2',
  10000: 'pro-10k-v2',
  50000: 'pro-50k-v2',
  100000: 'pro-100k-v2',
  500000: 'pro-500k-v2',
  1000000: 'pro-1m-v2'
}

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = { ...this.props.base }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (event) {
    event.preventDefault()
    const { value } = event.target
    const newState = { reqs: value, plan: PLANS[value] }
    this.setState(newState)
    this.props.onChange(newState)
  }

  render () {
    return (
      <CustomSelect
        mr={1}
        py={1}
        width='4rem'
        value={this.state.reqs}
        onChange={this.handleChange}
      >
        <option value={1000}>1K</option>
        <option value={3000}>3K</option>
        <option value={10000}>10K</option>
        <option value={50000}>50K</option>
        <option value={100000}>100K</option>
        <option value={500000}>500K</option>
        <option value={1000000}>1M</option>
      </CustomSelect>
    )
  }
}
