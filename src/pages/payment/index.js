/* global fetch */

import { Text, LinkSolid, DotSpinner } from 'components/elements'
import { useSiteMetadata, useQueryState } from 'components/hook'
import { Headline, Layout } from 'components/patterns'
import React, { useState, useEffect } from 'react'

import Confetti from 'react-confetti'
import { isSSR } from 'helpers'
import { colors } from 'theme'
import { encode } from 'qss'

const centerStyle = `
justify-content: center;
align-items: center;
display: flex;
`

const PAYMENT_STATE = {
  PROCESSING: 'processing',
  SUCCESS: 'success',
  FAILED: 'failed'
}

const ERROR_MAIL_OPTS = {
  subject: 'Payment process error',
  body:
    'Hello,\n\nSomething bad happens trying to pay at microlink.io.\n\nCan you help me?'
}

const getTitle = paymentState => {
  switch (paymentState) {
    case PAYMENT_STATE.PROCESSING:
      return 'Just a moment'
    case PAYMENT_STATE.SUCCESS:
      return 'Thank you'
    case PAYMENT_STATE.FAILED:
      return 'Whoops'
  }
}

const getCaption = paymentState => {
  switch (paymentState) {
    case PAYMENT_STATE.PROCESSING:
      return (
        <>
          We're confirming your payment
          <DotSpinner />
        </>
      )
    case PAYMENT_STATE.SUCCESS:
      return 'Payment confirmed, check your inbox.'
    case PAYMENT_STATE.FAILED:
      return (
        <>
          <Text as='span'>Payment not processed.</Text>
          <Text as='span' ml={1} mr={1}>
            <LinkSolid
              display='inline'
              children='Contact us'
              href={`mailto:hello@microlink.io?${encode(ERROR_MAIL_OPTS)}`}
            />
          </Text>
          <Text as='span'>.</Text>
        </>
      )
  }
}

export default () => {
  const [paymentState, setPaymentState] = useState(PAYMENT_STATE.PROCESSING)
  const [query] = useQueryState()

  const {
    paymentApiKey: apiKey,
    paymentEndpoint: apiEndpoint
  } = useSiteMetadata()

  useEffect(() => {
    const { sessionId } = query
    if (sessionId) {
      setPaymentState(PAYMENT_STATE.SUCCESS)
      fetch(`${apiEndpoint}/payment/session`, {
        headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey },
        method: 'POST',
        body: JSON.stringify({ sessionId })
      })
    } else {
      setPaymentState(PAYMENT_STATE.FAILED)
    }
  }, [query.sessionId])

  return (
    <Layout title='Payment' css={centerStyle}>
      {paymentState === PAYMENT_STATE.SUCCESS && (
        <Confetti
          width={!isSSR && window.innerWidth}
          height={!isSSR && window.innerHeight}
          colors={[
            colors.red5,
            colors.pink5,
            colors.grape5,
            colors.violet5,
            colors.indigo5,
            colors.blue5,
            colors.cyan5,
            colors.teal5,
            colors.green5,
            colors.lime5,
            colors.yellow5,
            colors.orange5
          ]}
        />
      )}
      <Headline
        title={getTitle(paymentState)}
        caption={getCaption(paymentState)}
      />
    </Layout>
  )
}
