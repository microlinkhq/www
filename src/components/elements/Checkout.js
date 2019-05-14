/* global fetch, StripeCheckout */

import React, { Component, Fragment } from 'react'
import {
  Caps,
  LinkSolid,
  Notification,
  ButtonSecondary
} from 'components/elements'
import { marshall } from 'helpers'
import { Choose } from 'react-extras'

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
  state = { paymentState: null }

  configure () {
    const {
      planId,
      description,
      panelLabel,
      apiEndpoint,
      apiKey,
      stripeKey
    } = this.props

    this.handler = StripeCheckout.configure({
      key: stripeKey,
      image: 'https://cdn.microlink.io/logo/trim.png',
      locale: 'auto',
      allowRememberMe: false,
      name: 'Professional Plan',
      panelLabel,
      description,
      token: token => {
        this.setState({ paymentState: PAYMENT_STATE.PROCESSING })
        fetch(`${apiEndpoint}/batch/series`, {
          headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey },
          method: 'POST',
          body: JSON.stringify([
            { command: 'payment.create', planId, token },
            { command: 'notification.email', templateId: 'welcome' },
            { command: 'notification.email', templateId: 'send_api_key' }
          ])
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

  openStripe = e => {
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
      <Fragment>
        {paymentState && (
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
                <LinkSolid
                  display='inline'
                  color='red8'
                  children='Contact us'
                  href={`mailto:hello@microlink.io?${marshall(
                    ERROR_MAIL_OPTS
                  )}`}
                />
                {'.'}
              </Notification.Danger>
            </Choose.When>
          </Choose>
        )}

        <ButtonSecondary
          mt={[3, 3, 3, 3]}
          onClick={this.openStripe}
          onTouchStart={this.openStripe}
          loading={paymentState === PAYMENT_STATE.PROCESSING}
        >
          <Caps fontSize={0}>Buy</Caps>
        </ButtonSecondary>
      </Fragment>
    )
  }
}
