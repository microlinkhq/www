/* global fetch */

import Caps from 'components/elements/Caps'
import { Button } from 'components/elements/Button/Button'
import Spinner from 'components/elements/Spinner'
import Flex from 'components/elements/Flex'
import { useSiteMetadata } from 'components/hook/use-site-meta'
import React, { useState, useRef, useEffect } from 'react'
import { gradient, theme } from 'theme'
import { trackEvent } from 'helpers/plausible'

const Checkout = ({ canonicalUrl, planId, stripeKey, ...props }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [btnSize, setBtnSize] = useState({})
  const ref = useRef(null)

  const { paymentApiKey: apiKey, paymentEndpoint: apiEndpoint } =
    useSiteMetadata()

  useEffect(() => {
    if (ref.current) {
      const computed = window.getComputedStyle(ref.current)
      setBtnSize({
        minWidth: parseInt(computed.getPropertyValue('width')),
        minHeight: parseInt(computed.getPropertyValue('height'))
      })
    }
  }, [])

  const handleCheckout = async () => {
    setIsLoading(true)
    const location =
      window.location.pathname === '/pricing' ? 'pricing' : 'home'
    trackEvent('buy', { location })

    try {
      const { data } = await fetch(`${apiEndpoint}/payment/session`, {
        headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey },
        method: 'POST',
        body: JSON.stringify({
          planId,
          successUrl: `${canonicalUrl}/payment?status=success`,
          cancelUrl: `${canonicalUrl}/payment?status=failed`
        })
      }).then(res => res.json())

      window.location.href = data.url
    } catch (_) {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <Button
        disabled
        aria-busy='true'
        data-event-location='Checkout'
        data-event-name='Buy'
        style={{ ...btnSize, cursor: 'wait' }}
        css={`
          &&&:disabled {
            background: ${gradient};
            box-shadow: none;
            opacity: 0.7;
            .path {
              stroke: white;
            }
          }
        `}
        {...props}
      >
        <Flex css={{ justifyContent: 'center', alignItems: 'center' }}>
          <Spinner
            color='white'
            width='26px'
            height='26px'
            style={{ padding: 0 }}
          />
        </Flex>
      </Button>
    )
  }

  return (
    <Button
      ref={ref}
      onClick={handleCheckout}
      data-event-location='Checkout'
      data-event-name='Buy'
      {...props}
    >
      <Caps css={theme({ fontSize: [0, 0, 2, 2] })}>Buy</Caps>
    </Button>
  )
}

export default Checkout
