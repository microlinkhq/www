import React, { useState } from 'react'
import { Caps, ButtonSecondary } from 'components/elements'
import { StripeLoader } from 'components/patterns'

// TODO: Ensure only pass props we need
export default ({ siteUrl, planId, stripeKey }) => {
  const [isLoading, setIsLoading] = useState(false)

  const createHandleStripe = stripe => () => {
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
    <StripeLoader siteUrl={siteUrl} planId={planId} stripeKey={stripeKey}>
      {stripe => {
        const handleStripe = createHandleStripe(stripe)
        return (
          <ButtonSecondary
            mt={[3, 3, 3, 3]}
            onClick={handleStripe}
            onTouchStart={handleStripe}
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
