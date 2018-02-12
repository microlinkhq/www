/* global fetch, StripeCheckout */

import React, {Component} from 'react'
import {Fixed} from 'rebass'
import ButtonOutline from './ButtonOutline'

import {LinkDotted} from './Link'

const serialize = obj => (
  Object.keys(obj).reduce((acc, key) => {
    acc.push(`${key}=${encodeURIComponent(obj[key])}`)
    return acc
  }, []).join('&')
)

const ERROR_MAIL_OPTS = {
  subject: 'Payment process error',
  body: 'Hello,\n\nSomething bad happens trying to pay you at microlink.io.\n\nCan you help me?'
}

export default class extends Component {
  constructor (props) {
    super(props)
    this.openStripe = this.openStripe.bind(this)
    this.state = {paymentState: null}
  }

  configure () {
    const {plan, description, panelLabel, api, apiKey, stripeKey} = this.props

    this.handler = StripeCheckout.configure({
      key: stripeKey,
      image: 'https://microlink.io/logo-trim.png',
      locale: 'auto',
      allowRememberMe: false,
      name: 'Professional Plan',
      panelLabel,
      description,
      token: token => {
        fetch(`${api}/payment`, {
          headers: {'Content-Type': 'application/json', 'x-api-key': apiKey},
          method: 'POST',
          body: JSON.stringify({plan, token, email_template: 'payment_success'})
        })
        .then(res => res.json())
        .then(({status}) => this.setState({paymentState: status}))
        .catch((err) => {
          console.error(err)
          this.setState({paymentState: 'fail'})
        })
      }
    })
  }

  componentDidMount () {
    if (document.getElementById('SCLJS')) this.configure()
    var s = document.createElement('script')
    s.id = 'SCLJS'
    s.src = 'https://checkout.stripe.com/checkout.js'
    s.onload = this.configure.bind(this)
    s.onerror = this.props.onerror
    document.body.appendChild(s)
  }

  openStripe (e) {
    if (!this.handler) return
    this.configure()
    this.handler.open()
    window.addEventListener('popstate', () => {
      this.handler.close()
    })
  }

  successPayment () {
    return (
      <Fixed m={2} p={3} bg='green3' color='green9' z={1} right bottom>
        Payment processed! We sent you an email.
      </Fixed>
    )
  }

  errorPayment () {
    return (
      <Fixed m={2} p={3} bg='red3' color='red9' z={1} right bottom>
        Payment not processed. <LinkDotted
          color='red9'
          href={`mailto:hello@microlink.io?${serialize(ERROR_MAIL_OPTS)}`}
        >Contact us</LinkDotted>.
      </Fixed>
    )
  }

  render () {
    const {paymentState} = this.state

    return (
      <div>
        {paymentState && paymentState === 'success' && this.successPayment()}
        {paymentState && paymentState !== 'success' && this.errorPayment()}
        <ButtonOutline
          hover={{ color: 'white', backgroundColor: 'primary' }}
          color='primary'
          onClick={this.openStripe}
          onTouchStart={this.openStripe}
          style={{cursor: 'pointer'}}>
          Buy
        </ButtonOutline>
      </div>
    )
  }
}
