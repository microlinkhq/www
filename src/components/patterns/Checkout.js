/* global fetch */

import { loadStripe } from '@stripe/stripe-js/pure'
import Caps from 'components/elements/Caps'
import { Button } from 'components/elements/Button/Button'
import { useSiteMetadata } from 'components/hook/use-site-meta'
import React, { useState } from 'react'
import { theme } from 'theme'

const Checkout = ({ canonicalUrl, planId, stripeKey, ...props }) => {
  const [isLoading, setIsLoading] = useState(false)

  const { paymentApiKey: apiKey, paymentEndpoint: apiEndpoint } =
    useSiteMetadata()

  const handleCheckout = async () => {
    setIsLoading(true)

    const [{ data }, stripe] = await Promise.all([
      fetch(`${apiEndpoint}/payment/session`, {
        headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey },
        method: 'POST',
        body: JSON.stringify({
          planId,
          successUrl: `${canonicalUrl}/payment?status=success`,
          cancelUrl: `${canonicalUrl}/payment?status=failed`
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
      data-event-location='Checkout'
      data-event-name='Buy'
      {...props}
    >
      <Caps css={theme({ fontSize: [0, 0, 2, 2] })}>Buy</Caps>
    </Button>
  )
}

export default Checkout
