import React, { useState } from 'react'
import { StripeLoader, Caps, ButtonSecondary } from 'components/elements'

// TODO: Ensure only pass props we need
export default ({ siteUrl, planId, stripeKey }) => {
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
      successUrl: `${siteUrl}/payment/success`,
      cancelUrl: `${siteUrl}/payment/error`
    })
  }

  return (
    <StripeLoader stripeKey={stripeKey}>
      {stripe => {
        const handleCheckout = createStripeCheckout(stripe)
        return (
          <ButtonSecondary
            mt={[3, 3, 3, 3]}
            onClick={handleCheckout}
            onTouchStart={handleCheckout}
            loading={isLoading}
            data-event-category='Checkout'
            data-event-action='Buy'
          >
            <Caps fontSize={0}>Buy</Caps>
          </ButtonSecondary>
        )
      }}
    </StripeLoader>
  )
}
