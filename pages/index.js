/* global fetch */

import React from 'react'
import 'isomorphic-fetch'

import NavBar from '../components/navbar'
import Layout from '../components/layout'
import Card from '../components/card'
import isUrl from '../util/is-url'

const DEFAULT_LINK = 'https://www.youtube.com/watch?v=w2_5-bJUEMY'

const fetchData = async url => {
  const res = await fetch(`http://api.microlink.io/?url=${url}`)
  const json = await res.json()
  return json
}

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {value: false}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  static async getInitialProps () {
    const {data} = await fetchData(DEFAULT_LINK)
    return {data}
  }
  handleChange (event) {
    const value = event.target.value
    if (value === '') this.handleSubmit(DEFAULT_LINK)
    if (isUrl(value)) this.handleSubmit(value)
  }
  async handleSubmit (url) {
    const {status, data} = await fetchData(url)
    if (status === 'success') this.setState({data})
  }
  getData () {
    return this.state.data || this.props.data
  }
  render () {
    return (
      <Layout className='vh-100 flex vh-100 flex-column'>
        <NavBar />
        <section
          className='sans-serif flex justify-start flex-column items-center ph3 pt6'
          style={{flex: 1}}
        >

          <h2 className='fade-in tc f3 f1-ns b white-90 mb0 lh-title ma0'>
            Extract information from a link
          </h2>

          <form
            className='fade-in black-80 w-80 w-80-m w-30-l pv3'
            style={{animationDelay: '1.5s'}}
            >
            <input
              style={{outlineColor: 'white'}}
              className='input-reset outline-0 bg-black ba b--dark-gray white pa2 mb2 db w-100 br2'
              placeholder={DEFAULT_LINK}
              type='url'
              onChange={this.handleChange}
              required
            />
          </form>

          <div
            className='fade-in relative ba b--dark-gray bg-black mv5 grow'
            style={{animationDelay: '1.5s'}}>
            <Card {...this.getData()} />
          </div>
        </section>

        <div
          className='fade-in tc pv3 sans-serif silver'
          style={{animationDelay: '3s'}}>
          Check our{' '}
          <a className='link white b' href='/api'>
            API
          </a>, it's free
        </div>
      </Layout>
    )
  }
}
