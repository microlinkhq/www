import { Caption, Layout } from 'components/patterns'
import React, { useState, useEffect } from 'react'
import { useQueryState } from 'components/hook'
import { encode } from 'helpers'
import { layout } from 'theme'

import {
  Confetti,
  Container,
  DotSpinner,
  Heading,
  Link,
  Meta
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
        <>
          Payment not processed.{' '}
          <Link
            pt={2}
            href={`mailto:hello@microlink.io?${encode(ERROR_MAIL_OPTS)}`}
          >
            Contact us
          </Link>
        </>
      )
  }
}

export const Head = () => <Meta />

const PaymentPage = () => {
  const [paymentState, setPaymentState] = useState(PAYMENT_STATE.processing)
  const [query] = useQueryState()

  useEffect(() => setPaymentState(query.status), [query.status])

  return (
    <Layout>
      <Container alignItems='center' pt={2}>
        {paymentState === PAYMENT_STATE.success && <Confetti />}
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
