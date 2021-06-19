/* global fetch */

import { Caps, Button } from 'components/elements'
import { useSiteMetadata } from 'components/hook'
import { loadStripe } from '@stripe/stripe-js'
import React, { useState } from 'react'

const Checkout = ({ canonicalUrl, planId, stripeKey, ...props }) => {
  const [isLoading, setIsLoading] = useState(false)

  const {
    paymentApiKey: apiKey,
    paymentEndpoint: apiEndpoint
  } = useSiteMetadata()

  const handleCheckout = async () => {
    setIsLoading(true)

    const [{ data }, stripe] = await Promise.all([
      fetch(`${apiEndpoint}/payment/session`, {
        headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey },
        method: 'POST',
        body: JSON.stringify({
          planId,
          successUrl: `${canonicalUrl}/payment?state=success`,
          cancelUrl: `${canonicalUrl}/payment?state=failed`
        })
      }).then(res => res.json()),
      loadStripe(stripeKey, { locale: 'en' })
    ])

    stripe.redirectToCheckout(data)
  }

  return (
    <Button
      onClick={handleCheckout}
      loading={isLoading}
      data-event-category='Checkout'
      data-event-action='Buy'
      {...props}
    >
      <Caps fontSize={2}>Buy</Caps>
    </Button>
  )
}

export default Checkout
