/* global fetch */

import React from 'react'
import 'isomorphic-fetch'

import NavBar from '../components/navbar'
import Layout from '../components/layout'
import Card from '../components/card'

const DEFAULT_LINK = 'https://www.youtube.com/watch?v=uLe-QQEKOwA'

const fetchData = async url => {
  const res = await fetch(`http://api.microlink.io/?url=${url}`)
  const {data} = await res.json()
  return data
}

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {value: false}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  static async getInitialProps () {
    const data = await fetchData(DEFAULT_LINK)
    return {data}
  }
  handleChange (event) {
    this.setState({value: event.target.value})
  }

  async handleSubmit (event) {
    event.preventDefault()
    const data = await fetchData(this.state.value)
    this.setState({data})
  }
  getData () {
    return this.state.data || this.props.data
  }
  render () {
    return (
      <Layout className='vh-100 flex vh-100 flex-column'>
        <NavBar />
        <section
          className='sans-serif flex justify-center flex-column items-center ph3'
          style={{flex: 1}}
          >

          <h1 className='tc f3 f2-m f1-l b white-90 mb0 lh-title'>
              Convert a link into information
            </h1>

          <form onSubmit={this.handleSubmit} className='black-80 w-80 w-50-l pv3'>
            <input
              style={{outlineColor: 'white'}}
              className='input-reset outline-0 bg-black ba b--dark-gray white pa2 mb2 db w-100 br2'
              placeholder={DEFAULT_LINK}
              type='url'
              onChange={this.handleChange}

              required
            />
          </form>

          <div className='relative ba b--dark-gray bg-black mv4'>
            <Card {...this.getData()} />
          </div>
        </section>

        <div className='tc pv3 sans-serif silver'>
          Check our <a className='link white b' href='/api'>API</a>, it's free
        </div>
      </Layout>
    )
  }
}
