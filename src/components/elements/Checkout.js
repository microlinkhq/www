/* global fetch, StripeCheckout */
import React, { useState } from 'react'

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

export default props => {
  const [paymentState, setPaymentState] = useState(null)

  const configure = () => {
    const {
      planId,
      description,
      panelLabel,
      apiEndpoint,
      apiKey,
      stripeKey
    } = props

    const successPayment = () => {
      sendEvent({
        eventAction: 'Checkout',
        eventCategory: 'Buy',
        eventLabel: 'success'
      })
      setPaymentState(PAYMENT_STATE.SUCCESS)
    }

    const failedPayment = () => {
      sendEvent({
        eventAction: 'Checkout',
        eventCategory: 'Buy',
        eventLabel: 'failed'
      })
      setPaymentState(PAYMENT_STATE.FAILED)
    }

    return StripeCheckout.configure({
      key: stripeKey,
      image: 'https://cdn.microlink.io/logo/trim.png',
      locale: 'auto',
      allowRememberMe: false,
      name: 'Professional Plan',
      panelLabel,
      description,
      token: token => {
        setPaymentState(PAYMENT_STATE.PROCESSING)
        fetch(`${apiEndpoint}/batch/series`, {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey
          },
          method: 'POST',
          body: JSON.stringify([
            { command: 'payment.create', planId, token },
            { command: 'notification.email', templateId: 'welcome' },
            { command: 'notification.email', templateId: 'send_api_key' }
          ])
        })
          .then(res => res.json())
          .then(({ status }) => {
            status === 200 ? successPayment() : failedPayment()
          })
          .catch(err => {
            console.error(err)
            failedPayment()
          })
      }
    })
  }

  const handleStripe = () => {
    const checkout = configure()
    checkout.open()
    window.addEventListener('popstate', checkout.close)
  }

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
                  href={`mailto:hello@microlink.io?${encode(ERROR_MAIL_OPTS)}`}
                />
              </Text>
              <Text as='span'>.</Text>
            </Notification.Error>
          </Choose.When>
        </Choose>
      )}

      <ButtonSecondary
        mt={[3, 3, 3, 3]}
        onClick={handleStripe}
        onTouchStart={handleStripe}
        loading={paymentState === PAYMENT_STATE.PROCESSING}
        data-event-category='Checkout'
        data-event-action='Buy'
      >
        <Caps fontSize={0}>Buy</Caps>
      </ButtonSecondary>
    </>
  )
}
