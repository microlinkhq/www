/* global fetch */

import { Caps, Button } from 'components/elements'
import { useSiteMetadata } from 'components/hook'
import { loadStripe } from '@stripe/stripe-js'
import React, { useState } from 'react'

export default ({ canonicalUrl, planId, stripeKey, ...props }) => {
  const [isLoading, setIsLoading] = useState(false)

  const {
    paymentApiKey: apiKey,
    paymentEndpoint: apiEndpoint
  } = useSiteMetadata()

  const stripePromise = loadStripe(stripeKey, { locale: 'en' })

  const handleCheckout = async () => {
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

    await (await stripePromise).redirectToCheckout(data)
  }

  return (
    <Button
      onClick={handleCheckout}
      onTouchStart={handleCheckout}
      loading={isLoading}
      data-event-category='Checkout'
      data-event-action='Buy'
      {...props}
    >
      <Caps fontSize={2}>Buy</Caps>
    </Button>
  )
}
