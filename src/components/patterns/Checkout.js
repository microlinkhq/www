import React, { useState } from 'react'
import { StripeLoader, Caps, Button } from 'components/elements'

export default ({ canonicalUrl, planId, stripeKey }) => {
  const [isLoading, setIsLoading] = useState(false)

  const createStripeCheckout = stripe => () => {
    setIsLoading(true)
    stripe.redirectToCheckout({
      items: [
        {
          plan: planId,
          quantity: 1
        }
      ],
      successUrl: `${canonicalUrl}/payment?sessionId={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${canonicalUrl}/payment?state=failed`
    })
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
