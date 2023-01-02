/* global fetch */

import { Caption, Layout } from 'components/patterns'
import { loadStripe } from '@stripe/stripe-js/pure'
import { useSiteMetadata } from 'components/hook'
import { layout, letterSpacings } from 'theme'
import { encode, decode } from 'helpers'
import React, { useState } from 'react'
import styled from 'styled-components'

import {
  Choose,
  Box,
  Button,
  Caps,
  Container,
  Heading,
  LinkSolid,
  Notification
} from 'components/elements'

import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js'

import {
  PAYMENT_STATE,
  ERROR_MAIL_OPTS
} from 'components/pages/payment/constants'

const Form = styled.form`
  .StripeElement {
    display: block;
    max-width: 100%;
    padding: 10px 14px;
    box-shadow: rgba(50, 50, 93, 0.14902) 0px 1px 3px,
      rgba(0, 0, 0, 0.0196078) 0px 1px 0px;
    border-radius: 4px;
    background: white;
  }

  .StripeElement--focus {
    box-shadow: rgba(50, 50, 93, 0.109804) 0px 4px 6px,
      rgba(0, 0, 0, 0.0784314) 0px 1px 3px;
    -webkit-transition: all 150ms ease;
    transition: all 150ms ease;
  }
`

const CheckoutForm = ({ apiEndpoint, apiKey }) => {
  const [paymentState, setPaymentState] = useState(null)

  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async event => {
    // Block native form submission.
    event.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement)

    setPaymentState(PAYMENT_STATE.PROCESSING)

    stripe
      .createToken(cardElement)
      .then(({ token }) =>
        fetch(`${apiEndpoint}/payment/update`, {
          headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey },
          method: 'POST',
          body: JSON.stringify({
            customerId: decode(window.location.search).id,
            token
          })
        })
      )
      .then(() => setPaymentState(PAYMENT_STATE.SUCCESS))
      .catch(err => {
        console.error(err)
        setPaymentState(PAYMENT_STATE.FAILED)
      })
  }

  return (
    <>
      {paymentState && (
        <Choose>
          <Choose.When condition={paymentState === PAYMENT_STATE.PROCESSING}>
            <Notification.Success>Processing...</Notification.Success>
          </Choose.When>
          <Choose.When condition={paymentState === PAYMENT_STATE.SUCCESS}>
            <Notification.Success>
              Payment updated! We sent you an email.
            </Notification.Success>
          </Choose.When>
          <Choose.When condition={paymentState === PAYMENT_STATE.FAILED}>
            <Notification.Error>
              Payment not updated.{' '}
              <LinkSolid
                display='inline'
                color='red8'
                href={`mailto:hello@microlink.io?${encode(ERROR_MAIL_OPTS)}`}
              >
                Contact us
              </LinkSolid>
              .
            </Notification.Error>
          </Choose.When>
        </Choose>
      )}
      <Form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '18px',
                color: '#424770',
                letterSpacing: letterSpacings[2],
                fontFamily: 'Source Code Pro, Menlo, monospace',
                '::placeholder': {
                  color: '#aab7c4'
                }
              },
              invalid: {
                color: '#9e2146'
              }
            }
          }}
        />
        <Button
          mt={3}
          loading={paymentState === PAYMENT_STATE.PROCESSING}
          type='submit'
          disabled={!stripe}
          width='100%'
        >
          <Caps fontSize={1}>Update Card</Caps>
        </Button>
      </Form>
    </>
  )
}

const PaymentUpdatePage = () => {
  const {
    stripeKey,
    paymentApiKey: apiKey,
    paymentEndpoint: apiEndpoint
  } = useSiteMetadata()

  const stripePromise = loadStripe(stripeKey, { locale: 'en' })

  return (
    <Layout>
      <Container
        justifyContent='center'
        alignItems='center'
        pt={5}
        pb={Container.defaultProps.pt}
      >
        <Heading px={5} titleize={false} maxWidth={layout.large}>
          Payment details
        </Heading>
        <Caption
          pt={[3, 3, 4, 4]}
          px={[4, 4, 0, 0]}
          titleize={false}
          maxWidth={layout.small}
        >
          Fill the new credit card and they will be associated with your
          customer profile.
        </Caption>
        <Box pt={[3, 3, 4, 4]} width={7}>
          <Elements stripe={stripePromise}>
            <CheckoutForm apiKey={apiKey} apiEndpoint={apiEndpoint} />
          </Elements>
        </Box>
      </Container>
    </Layout>
  )
}

export default PaymentUpdatePage
