import React, { useState } from 'react'
import { Script } from 'components/elements'

const createStripe = stripeKey => window.Stripe(stripeKey, { locale: 'en' })

const StripeLoader = ({ stripeKey, children }) => {
  const [stripe, setStripe] = useState(null)
  return (
    <>
      <Script
        async
        src='https://js.stripe.com/v3'
        onload={() => setStripe(createStripe(stripeKey))}
      />
      {stripe && children(stripe)}
    </>
  )
}

export default StripeLoader
