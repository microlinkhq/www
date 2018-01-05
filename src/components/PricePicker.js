import React, {Component} from 'react'
import {Select} from 'rebass'

const CustomSelect = Select.extend`
cursor: pointer;
`

const PLANS = {
  1000: 'pro-1k',
  3000: 'pro-3k',
  10000: 'pro-10k',
  50000: 'pro-50k',
  100000: 'pro-100k',
  500000: 'pro-500k',
  1000000: 'pro-1m'
}

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = { plan: 'pro-1k', reqs: 1000 }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (event) {
    event.preventDefault()
    const {value} = event.target
    const newState = {reqs: value, plan: PLANS[value]}
    this.setState(newState)
    this.props.onChange(newState)
  }

  render () {
    return (
      <CustomSelect
        pr={1}
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
