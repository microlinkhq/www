import Caption from 'components/patterns/Caption/Caption'
import Layout from 'components/patterns/Layout'
import React, { useState, useEffect } from 'react'
import { useQueryState } from 'components/hook/use-query-state'
import { emailUrl } from 'helpers/email-url'
import { layout, theme } from 'theme'

import Confetti from 'components/elements/Confetti'
import Container from 'components/elements/Container'
import DotSpinner from 'components/elements/DotSpinner'
import Heading from 'components/elements/Heading'
import { Link } from 'components/elements/Link'
import Meta from 'components/elements/Meta/Meta'

import { PAYMENT_STATE } from 'components/pages/payment/constants'

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
            css={theme({ pt: 2 })}
            href={emailUrl.paymentError({ subject: 'Error during checkout' })}
          >
            Click to request assistance.
          </Link>
        </>
      )
  }
}

export const Head = () => (
  <Meta
    title='Payment Details'
    description='Add payment method to get started with Microlink.'
    robots='noindex, nofollow'
  />
)

const PaymentPage = () => {
  const [paymentState, setPaymentState] = useState(PAYMENT_STATE.processing)
  const [query] = useQueryState()

  useEffect(() => setPaymentState(query.status), [query.status])

  return (
    <Layout>
      <Container css={theme({ alignItems: 'center', pt: 2 })}>
        {paymentState === PAYMENT_STATE.success && <Confetti />}
        <Heading css={theme({ px: 5, maxWidth: layout.large })}>
          {getTitle(paymentState)}
        </Heading>
        <Caption
          css={theme({
            pt: [3, null, 4],
            px: [4, null, 0],
            maxWidth: layout.small
          })}
        >
          {getCaption(paymentState)}
        </Caption>
      </Container>
    </Layout>
  )
}

export default PaymentPage
