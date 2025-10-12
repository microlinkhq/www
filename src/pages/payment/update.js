/* global fetch */

import { useFingerprint } from 'components/hook/use-fingerprint'
import { useSiteMetadata } from 'components/hook/use-site-meta'
import { useQueryState } from 'components/hook/use-query-state'
import { PAYMENT_STATE } from 'components/pages/payment/constants'
import { withTitle } from 'helpers/hoc/with-title'
import CaptionBase from 'components/patterns/Caption/Caption'
import Layout from 'components/patterns/Layout'
import { loadStripe } from '@stripe/stripe-js/pure'
import React, { useEffect, useState } from 'react'
import { emailUrl } from 'helpers/email-url'
import { once } from 'helpers/once'

import {
  colors,
  fonts,
  fontWeights,
  layout,
  radii,
  transition,
  theme
} from 'theme'

import Box from 'components/elements/Box'
import { Button } from 'components/elements/Button/Button'
import Caps from 'components/elements/Caps'
import Confetti from 'components/elements/Confetti'
import Container from 'components/elements/Container'
import DotSpinner from 'components/elements/DotSpinner'
import HeadingBase from 'components/elements/Heading'
import { Link } from 'components/elements/Link/base'
import Meta from 'components/elements/Meta/Meta'

import {
  Elements,
  PaymentElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js'

const Heading = withTitle(HeadingBase)

const Caption = withTitle(CaptionBase)

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

const getCaption = (paymentState, error) => {
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
            href={emailUrl.paymentError({
              subject: 'Error updating my payment details',
              error
            })}
          >
            Click to request assistance.
          </Link>
          .
        </>
      )
    default:
      return 'Fill the new credit card and they will be associated with your customer profile.'
  }
}

const CheckoutForm = ({
  id,
  paymentState,
  setPaymentState,
  setError,
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
          return_url: redirectUrl('callback', id)
        }
      })
      if (error) throw error
    } catch (error) {
      console.error(error)
      setError(error)
      setPaymentState(PAYMENT_STATE.failed)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
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
  const [error, setError] = useState(null)
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
          {getCaption(
            isLoading ? PAYMENT_STATE.redirected : paymentState,
            error
          )}
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
                id={query.id}
                paymentState={paymentState}
                setPaymentState={setPaymentState}
                setError={setError}
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
