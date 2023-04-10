import { useWindowSize, useQueryState } from 'components/hook'
import { Caption, Layout } from 'components/patterns'
import React, { useState, useEffect } from 'react'
import { layout, colors } from 'theme'
import Confetti from 'react-confetti'
import { encode } from 'helpers'

import {
  Container,
  Heading,
  Box,
  LinkSolid,
  DotSpinner
} from 'components/elements'

import {
  PAYMENT_STATE,
  ERROR_MAIL_OPTS
} from 'components/pages/payment/constants'

const getTitle = paymentState => {
  switch (paymentState) {
    case PAYMENT_STATE.processing:
      return 'Just a moment'
    case PAYMENT_STATE.success:
      return 'Thank you'
    case PAYMENT_STATE.failed:
      return 'Whoops'
  }
}

const getCaption = paymentState => {
  switch (paymentState) {
    case PAYMENT_STATE.processing:
      return (
        <>
          We’re confirming your payment
          <DotSpinner />
        </>
      )
    case PAYMENT_STATE.success:
      return 'Payment confirmed, check your inbox.'
    case PAYMENT_STATE.failed:
      return (
        <Box>
          Payment not processed.
          <Box />
          <LinkSolid
            pt={2}
            href={`mailto:hello@microlink.io?${encode(ERROR_MAIL_OPTS)}`}
          >
            Contact us
          </LinkSolid>
        </Box>
      )
  }
}

const PaymentPage = () => {
  const [paymentState, setPaymentState] = useState(PAYMENT_STATE.processing)
  const [query] = useQueryState()
  const size = useWindowSize()

  useEffect(() => setPaymentState(query.state), [query.state])

  return (
    <Layout>
      <Container alignItems='center' pt={5}>
        {paymentState === PAYMENT_STATE.success && (
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

export default PaymentPage
