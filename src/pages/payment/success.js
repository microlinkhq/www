/* global fetch */

import { useSiteMetadata, useQueryState } from 'components/hook'
import styled, { keyframes } from 'styled-components'
import { Header, Layout } from 'components/patterns'
import React, { useState, useEffect } from 'react'
import Confetti from 'react-confetti'
import { colors } from 'theme'
import { isSSR } from 'helpers'

const centerStyle = `
justify-content: center;
align-items: center;
display: flex;
`

const spinner = keyframes`
to { transform: translateY( -6.0em); }
`

const DotSpinner = styled('span')`
  display: inline-block;
  overflow: hidden;
  height: 1.3em;
  margin-top: -0.3em;
  line-height: 1.5em;
  vertical-align: text-bottom;

  &::after {
    display: inline-table;
    white-space: pre;
    text-align: left;
    content: '\\A.\\A..\\A...';
    animation: ${spinner} 2s steps(4) infinite;
  }
`

const PAYMENT_STATE = {
  PROCESSING: 'processing',
  SUCCESS: 'success',
  FAILED: 'failed'
}

export default () => {
  const { paymentApiKey, paymentEndpoint } = useSiteMetadata()
  const [paymentState, setPaymentState] = useState(PAYMENT_STATE.PROCESSING)
  const [query] = useQueryState()

  const sendConfirmation = async sessionId => {
    setPaymentState(PAYMENT_STATE.PROCESSING)
    fetch(`${paymentEndpoint}/batch/series`, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': paymentApiKey
      },
      method: 'POST',
      body: JSON.stringify([
        { command: 'payment.session', sessionId },
        { command: 'notification.email', templateId: 'welcome' },
        { command: 'notification.email', templateId: 'send_api_key' }
      ])
    })
      .then(res => res.json())
      .then(({ status }) => {
        setPaymentState(
          status === 200 ? PAYMENT_STATE.SUCCESS : PAYMENT_STATE.FAILED
        )
      })
      .catch(err => {
        console.error(err)
        setPaymentState(PAYMENT_STATE.FAILED)
      })
  }

  useEffect(() => {
    const { sessionId } = query
    if (sessionId) sendConfirmation(query.sessionId)
  }, [query.sessionId])

  return (
    <Layout title='Payment success' css={centerStyle}>
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
      <Header
        title={
          paymentState === PAYMENT_STATE.SUCCESS ? 'Thank you' : 'Just a moment'
        }
        caption={
          paymentState === PAYMENT_STATE.SUCCESS ? (
            'Payment confirmed, check your inbox.'
          ) : (
            <>
              We're confirming your payment
              <DotSpinner />
            </>
          )
        }
      />
    </Layout>
  )
}
