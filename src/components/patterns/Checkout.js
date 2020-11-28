/* global fetch */

import { Caps, Button } from 'components/elements'
import { StripeLoader } from 'components/patterns'
import { useSiteMetadata } from 'components/hook'
import React, { useState } from 'react'

export default ({ canonicalUrl, planId, stripeKey, ...props }) => {
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
            onClick={handleCheckout}
            onTouchStart={handleCheckout}
            loading={isLoading}
            data-event-category='Checkout'
            data-event-action='Buy'
            {...props}
          >
            <Caps fontSize={2}>Buy </Caps>
          </Button>
        )
      }}
    </StripeLoader>
  )
}
