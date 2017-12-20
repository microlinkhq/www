import React, {Component} from 'react'
import {Select} from 'rebass'

const CustomSelect = Select.extend`
cursor: pointer;
`

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = { value: 1000 }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (event) {
    event.preventDefault()
    const {value} = event.target
    this.setState({ value })
    this.props.onChange(value)
  }

  render () {
    return (
      <CustomSelect
        pr={1}
        width='4rem'
        value={this.state.value}
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
