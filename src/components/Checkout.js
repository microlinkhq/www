/* global fetch, StripeCheckout */

import React, { Component } from 'react'
import { OutlineButton } from './Buttons'
import Notification from './Notification'
import { LinkDotted } from './Link'
import Choose from './Choose'

import { marshall } from '../helpers'

const PAYMENT_STATE = {
  PROCESSING: 'processing',
  SUCCESS: 'success',
  FAILED: 'failed'
}

const ERROR_MAIL_OPTS = {
  subject: 'Payment process error',
  body:
    'Hello,\n\nSomething bad happens trying to pay you at microlink.io.\n\nCan you help me?'
}

export default class extends Component {
  constructor (props) {
    super(props)
    this.openStripe = this.openStripe.bind(this)
    this.state = { paymentState: '' }
  }

  configure () {
    const { plan, description, panelLabel, api, apiKey, stripeKey } = this.props

    this.handler = StripeCheckout.configure({
      key: stripeKey,
      image: 'https://microlink.io/logo-trim.png',
      locale: 'auto',
      allowRememberMe: false,
      name: 'Professional Plan',
      panelLabel,
      description,
      token: token => {
        this.setState({ paymentState: PAYMENT_STATE.PROCESSING })
        fetch(`${api}/payment/create`, {
          headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey },
          method: 'POST',
          body: JSON.stringify({
            plan,
            token,
            email_template: 'payment_success'
          })
        })
          .then(res => res.json())
          .then(({ status }) =>
            this.setState({ paymentState: PAYMENT_STATE.SUCCESS })
          )
          .catch(err => {
            console.error(err)
            this.setState({ paymentState: PAYMENT_STATE.FAILED })
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

  render () {
    const { paymentState } = this.state

    return (
      <div>
        <Choose>
          <Choose.When condition={paymentState === PAYMENT_STATE.PROCESSING}>
            <Notification.Success children='Processing...' />
          </Choose.When>
          <Choose.When condition={paymentState === PAYMENT_STATE.SUCCESS}>
            <Notification.Success children='Payment processed! We sent you an email.' />
          </Choose.When>
          <Choose.When condition={paymentState === PAYMENT_STATE.FAILED}>
            <Notification.Danger>
              Payment not processed.{' '}
              <LinkDotted
                color='red8'
                href={`mailto:hello@microlink.io?${marshall(ERROR_MAIL_OPTS)}`}
              >
                Contact us
              </LinkDotted>.
            </Notification.Danger>
          </Choose.When>
        </Choose>

        <OutlineButton onClick={this.openStripe} onTouchStart={this.openStripe}>
          Buy
        </OutlineButton>
      </div>
    )
  }
}
