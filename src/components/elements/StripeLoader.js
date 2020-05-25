import React, { useState } from 'react'
import { useScript } from 'components/hook'

const createStripe = stripeKey => window.Stripe(stripeKey, { locale: 'en' })

export default ({ stripeKey, children }) => {
  const [stripe, setStripe] = useState(null)

  return (
    <>
      {useScript({
        src: 'https://js.stripe.com/v3',
        async: true,
        onload: () => setStripe(createStripe(stripeKey))
      })}
      {stripe && children(stripe)}
    </>
  )
}
