/* global fetch */

import { StripeLoader, Caps, Button } from 'components/elements'
import { useSiteMetadata } from 'components/hook'
import React, { useState } from 'react'

export default ({ canonicalUrl, planId, stripeKey }) => {
  const [isLoading, setIsLoading] = useState(false)

  const {
    paymentApiKey: apiKey,
    paymentEndpoint: apiEndpoint
  } = useSiteMetadata()

  const createStripeCheckout = stripe => async () => {
    setIsLoading(true)

    const { data } = await fetch(`${apiEndpoint}/payment/session`, {
      headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey },
      method: 'POST',
      body: JSON.stringify({
        planId,
        successUrl: `${canonicalUrl}/payment?state=success`,
        cancelUrl: `${canonicalUrl}/payment?state=failed`
      })
    }).then(res => res.json())

    stripe.redirectToCheckout(data)
  }

  return (
    <StripeLoader stripeKey={stripeKey}>
      {stripe => {
        const handleCheckout = createStripeCheckout(stripe)
        return (
          <Button
            mt={[3, 3, 3, 3]}
            onClick={handleCheckout}
            onTouchStart={handleCheckout}
            loading={isLoading}
            data-event-category='Checkout'
            data-event-action='Buy'
          >
            <Caps fontSize={0}>Buy</Caps>
          </Button>
        )
      }}
    </StripeLoader>
  )
}
