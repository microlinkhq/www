import { useWindowSize, useQueryState } from 'components/hook'
import { Caption, Layout } from 'components/patterns'
import React, { useState, useEffect } from 'react'
import { layout, colors } from 'theme'
import Confetti from 'react-confetti'
import { encode } from 'qss'

import {
  Container,
  Heading,
  Box,
  LinkSolid,
  DotSpinner
} from 'components/elements'

export const PAYMENT_STATE = {
  PROCESSING: 'processing',
  SUCCESS: 'success',
  FAILED: 'failed'
}

export const ERROR_MAIL_OPTS = {
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
        <Box>
          Payment not processed.
          <Box />
          <LinkSolid
            pt={2}
            children='Contact us'
            href={`mailto:hello@microlink.io?${encode(ERROR_MAIL_OPTS)}`}
          />
        </Box>
      )
  }
}

export default () => {
  const [paymentState, setPaymentState] = useState(PAYMENT_STATE.PROCESSING)
  const [query] = useQueryState()
  const size = useWindowSize()

  useEffect(() => setPaymentState(query.state), [query.state])

  return (
    <Layout>
      <Container alignItems='center' pt={5}>
        {paymentState === PAYMENT_STATE.SUCCESS && (
          <Confetti
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
            {...size}
          />
        )}
        <Heading px={5} titleize={false} maxWidth={layout.large}>
          {getTitle(paymentState)}
        </Heading>
        <Caption
          pt={[3, 3, 4, 4]}
          px={[4, 4, 0, 0]}
          titleize={false}
          maxWidth={[layout.small, layout.small, layout.small, layout.small]}
        >
          {getCaption(paymentState)}
        </Caption>
      </Container>
    </Layout>
  )
}
