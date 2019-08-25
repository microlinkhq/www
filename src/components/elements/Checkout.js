/* global fetch, StripeCheckout */

import React, { Component } from 'react'

import {
  Caps,
  Text,
  LinkSolid,
  Notification,
  ButtonSecondary
} from 'components/elements'
import { encode } from 'qss'
import { Choose } from 'react-extras'
import { sendEvent } from 'helpers'

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

// TODO: Refactor to use hooks
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
          .then(({ status }) => {
            sendEvent({
              eventAction: 'Checkout',
              eventCategory: 'Buy',
              eventLabel: 'success'
            })
            this.setState({ paymentState: PAYMENT_STATE.SUCCESS })
          })
          .catch(err => {
            sendEvent({
              eventAction: 'Checkout',
              eventCategory: 'Buy',
              eventLabel: 'failed'
            })
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

  handleStripe = () => {
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
      <>
        {paymentState && (
          <Choose>
            <Choose.When condition={paymentState === PAYMENT_STATE.PROCESSING}>
              <Notification.Success children='Processing...' />
            </Choose.When>
            <Choose.When condition={paymentState === PAYMENT_STATE.SUCCESS}>
              <Notification.Success>
                <Text as='span'>Payment processed</Text>
                <Text role='img' aria-label='hooray' ml={2} mr={1} as='span'>
                  🎉
                </Text>
                <Text as='span'>We sent you an email.</Text>
              </Notification.Success>
            </Choose.When>
            <Choose.When condition={paymentState === PAYMENT_STATE.FAILED}>
              <Notification.Error>
                <Text as='span'>Payment not processed.</Text>
                <Text as='span' ml={1} mr={1}>
                  <LinkSolid
                    display='inline'
                    color='red8'
                    children='Contact us'
                    href={`mailto:hello@microlink.io?${encode(
                      ERROR_MAIL_OPTS
                    )}`}
                  />
                </Text>
                <Text as='span'>.</Text>
              </Notification.Error>
            </Choose.When>
          </Choose>
        )}

        <ButtonSecondary
          mt={[3, 3, 3, 3]}
          onClick={this.handleStripe}
          onTouchStart={this.handleStripe}
          loading={paymentState === PAYMENT_STATE.PROCESSING}
          data-event-category='Checkout'
          data-event-action='Buy'
        >
          <Caps fontSize={0}>Buy</Caps>
        </ButtonSecondary>
      </>
    )
  }
}
