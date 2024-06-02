/* global fetch */

import { useFingerprint, useSiteMetadata, useQueryState } from 'components/hook'
import {
  colors,
  fonts,
  fontWeights,
  layout,
  radii,
  transition,
  theme
} from 'theme'
import { Caption, Layout } from 'components/patterns'
import { loadStripe } from '@stripe/stripe-js/pure'
import React, { useEffect, useState } from 'react'
import { encode } from 'helpers'
import once from 'helpers/once'

import {
  Box,
  Button,
  Caps,
  Confetti,
  Container,
  DotSpinner,
  Heading,
  Link,
  Meta
} from 'components/elements'

import {
  Elements,
  PaymentElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js'

import {
  PAYMENT_STATE,
  ERROR_MAIL_OPTS
} from 'components/pages/payment/constants'

const fetchOnce = once(fetch)

const redirectUrl = (paymentState, id) => {
  const url = window.location.origin + window.location.pathname
  const query =
    paymentState === 'callback'
      ? { id, status: PAYMENT_STATE.redirected }
      : { status: paymentState }
  return `${url}?${new URLSearchParams(query).toString()}`
}

const getTitle = paymentState => {
  switch (paymentState) {
    case PAYMENT_STATE.success:
      return 'Thank you'
    case PAYMENT_STATE.failed:
      return 'Whoops'
    default:
      return 'Payment details'
  }
}

const getCaption = paymentState => {
  switch (paymentState) {
    case PAYMENT_STATE.redirected:
      return (
        <>
          Don’t close the window
          <DotSpinner />
        </>
      )
    case PAYMENT_STATE.success:
      return 'Payment updated, check your inbox.'
    case PAYMENT_STATE.failed:
      return (
        <>
          Payment not updated.{' '}
          <Link
            css={theme({ pt: 2 })}
            href={`mailto:hello@microlink.io?${encode(ERROR_MAIL_OPTS)}`}
          >
            Contact us
          </Link>
          .
        </>
      )
    default:
      return 'Fill the new credit card and they will be associated with your customer profile.'
  }
}

const CheckoutForm = ({
  fingerprint,
  id,
  paymentState,
  setPaymentState,
  token
}) => {
  const elements = useElements()
  const stripe = useStripe()

  const handleSubmit = async event => {
    event.preventDefault()
    if ((await elements.submit()).error) return
    setPaymentState(PAYMENT_STATE.processing)
    try {
      const { error } = await stripe.confirmSetup({
        clientSecret: token,
        elements,
        confirmParams: {
          return_url: redirectUrl('callback', id),
          payment_method_data: {
            billing_details: {
              address: {
                country: fingerprint.country,
                postal_code: 'never'
              }
            }
          }
        }
      })
      if (error) throw error
    } catch (error) {
      console.error(error)
      setPaymentState(PAYMENT_STATE.failed)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement
        options={{
          fields: {
            billingDetails: {
              address: {
                country: 'never',
                postalCode: 'never'
              }
            }
          }
        }}
      />
      <Button
        loading={!stripe || paymentState === PAYMENT_STATE.processing}
        css={theme({ mt: 3, width: '100%' })}
        type='submit'
      >
        <Caps css={theme({ fontSize: 1 })}>Update Card</Caps>
      </Button>
    </form>
  )
}

export const Head = () => <Meta title='Payment' />

const PaymentUpdatePage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [query] = useQueryState()
  const {
    stripeKey,
    paymentApiKey: apiKey,
    paymentEndpoint: apiEndpoint
  } = useSiteMetadata()
  const stripePromise = loadStripe(stripeKey, { locale: 'en' })
  const fingerprint = useFingerprint()

  const [paymentState, setPaymentState] = useState(
    query.status ?? PAYMENT_STATE.initial
  )

  useEffect(() => {
    if (paymentState === PAYMENT_STATE.redirected && fingerprint) {
      fetchOnce(`${apiEndpoint}/payment/update`, {
        headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey },
        method: 'POST',
        body: JSON.stringify({
          customerId: query.id,
          ipAddress: fingerprint.ipAddress,
          setupIntentId: query.setup_intent
        })
      })
        .then(() => (window.location = redirectUrl(PAYMENT_STATE.success)))
        .catch(() => (window.location = redirectUrl(PAYMENT_STATE.failed)))
    }
  }, [
    apiEndpoint,
    apiKey,
    paymentState,
    fingerprint,
    query.id,
    query.setup_intent
  ])

  useEffect(() => setIsLoading(false), [])

  return (
    <Layout>
      <Container
        css={theme({ alignItems: 'center', justifyContent: 'center', pt: 2 })}
      >
        {paymentState === PAYMENT_STATE.success && <Confetti />}
        <Heading
          css={theme({ px: 5, maxWidth: layout.large })}
          titleize={false}
        >
          {getTitle(isLoading ? PAYMENT_STATE.redirected : paymentState)}
        </Heading>
        <Caption
          css={theme({
            pt: [3, null, 4],
            px: [4, null, 0],
            maxWidth: layout.small
          })}
          titleize={false}
        >
          {getCaption(isLoading ? PAYMENT_STATE.redirected : paymentState)}
        </Caption>
        {!isLoading && !query.status && (
          <Box css={theme({ pt: [3, null, 4], width: 7 })}>
            <Elements
              stripe={stripePromise}
              options={{
                mode: 'setup',
                currency: 'eur',
                appearance: {
                  theme: 'stripe',
                  variables: {
                    borderRadius: radii[2],
                    colorDanger: colors.fullscreen,
                    colorTextPlaceholder: colors.black30,
                    colorTextSecondary: colors.black50,
                    fontFamily: fonts.sans,
                    fontWeightNormal: fontWeights.normal
                  },
                  rules: {
                    '.Input': {
                      transition: `all ${transition.medium}`
                    },
                    '.Label': {
                      margin: '-18px 0 0 0',
                      color: 'transparent'
                    }
                  }
                }
              }}
            >
              <CheckoutForm
                fingerprint={fingerprint}
                id={query.id}
                paymentState={paymentState}
                setPaymentState={setPaymentState}
                token={query.token}
              />
            </Elements>
          </Box>
        )}
      </Container>
    </Layout>
  )
}

export default PaymentUpdatePage
