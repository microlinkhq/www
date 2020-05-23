import React, { useState } from 'react'
import useScript from 'react-script-hook'

const createStripe = stripeKey => window.Stripe(stripeKey, { locale: 'en' })

export default ({ stripeKey, children }) => {
  const [stripe, setStripe] = useState(null)

  const onload = () => {
    if (window.Stripe) return setStripe(createStripe(stripeKey))
  }

  return (
    <>
      {useScript({
        src: 'https://js.stripe.com/v3',
        checkForExisting: true,
        async: true,
        onload: onload
      })}
      {stripe && children(stripe)}
    </>
  )
}
