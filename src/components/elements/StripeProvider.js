import React, { useState } from 'react'
import Head from 'components/Head'

const createStripe = stripeKey => window.Stripe(stripeKey, { locale: 'en' })

export default ({ stripeKey, children }) => {
  const [stripe, setStripe] = useState(null)
  const [mountOnLoad, setMountOnLoad] = useState(false)

  const loadStripe = () => {
    if (window.Stripe) return setStripe(createStripe(stripeKey))
    const el = document.querySelector('#stripe-js')
    el && el.addEventListener('load', () => setStripe(createStripe(stripeKey)))
  }

  const onChangeClientState = (newState, addedTags, removedTags) => {
    const el = addedTags.scriptTags && addedTags.scriptTags[0]
    if (el && !mountOnLoad) {
      el.onload = loadStripe
      setMountOnLoad(true)
    }
  }

  return (
    <>
      <Head
        onChangeClientState={onChangeClientState}
        script={[
          { id: 'stripe-js', src: 'https://js.stripe.com/v3', async: true }
        ]}
      />

      {children(stripe)}
    </>
  )
}
