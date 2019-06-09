/* global fetch */

import React, { useState, Fragment, Component } from 'react'
import { useSiteMetadata } from 'components/hook'
import styled from 'styled-components'
import { Choose } from 'react-extras'
import {
  Label,
  Container,
  ButtonSecondary,
  Notification,
  LinkSolid,
  Flex,
  Heading
} from 'components/elements'
import { Layout, Header } from 'components/patterns'
import Head from 'components/Head'

import { marshall, unmarshall } from 'helpers'

import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  StripeProvider,
  injectStripe,
  Elements
} from 'react-stripe-elements'

const PAYMENT_STATE = {
  PROCESSING: 'processing',
  SUCCESS: 'success',
  FAILED: 'failed'
}

const ERROR_MAIL_OPTS = {
  subject: 'Payment update error',
  body:
    'Hello,\n\nSomething bad happens trying to update my payment method at microlink.io/payment.\n\nCan you help me?'
}

const Form = styled.form`
  .StripeElement {
    display: block;
    margin: 10px 0 20px 0;
    max-width: 100%;
    padding: 10px 14px;
    box-shadow: rgba(50, 50, 93, 0.14902) 0px 1px 3px,
      rgba(0, 0, 0, 0.0196078) 0px 1px 0px;
    border-radius: 4px;
    background: white;
  }

  .StripeElement--focus {
    box-shadow: rgba(50, 50, 93, 0.109804) 0px 4px 6px,
      rgba(0, 0, 0, 0.0784314) 0px 1px 3px;
    -webkit-transition: all 150ms ease;
    transition: all 150ms ease;
  }
`

const createOptions = fontSize => {
  return {
    style: {
      base: {
        fontSize,
        color: '#424770',
        letterSpacing: '0.025em',
        fontFamily: 'Source Code Pro, Menlo, monospace',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#9e2146'
      }
    }
  }
}

class _CardForm extends Component {
  state = { paymentState: null }

  handleSubmit = event => {
    event.preventDefault()
    const { apiKey, apiEndpoint, stripe } = this.props

    this.setState({ paymentState: PAYMENT_STATE.PROCESSING })

    stripe
      .createToken()
      .then(({ token }) =>
        fetch(`${apiEndpoint}/batch/series`, {
          headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey },
          method: 'POST',
          body: JSON.stringify([
            {
              command: 'payment.update',
              customerId: unmarshall(window.location.search).id,
              token
            },
            { command: 'notification.email', templateId: 'payment_updated' }
          ])
        })
      )
      .then(res => res.json())
      .then(({ status }) =>
        this.setState({ paymentState: PAYMENT_STATE.SUCCESS })
      )
      .catch(err => {
        console.error(err)
        this.setState({ paymentState: PAYMENT_STATE.FAILED })
      })
  }
  render () {
    const { paymentState } = this.state

    return (
      <Fragment>
        {paymentState && (
          <Choose>
            <Choose.When condition={paymentState === PAYMENT_STATE.PROCESSING}>
              <Notification.Success children='Processing...' />
            </Choose.When>
            <Choose.When condition={paymentState === PAYMENT_STATE.SUCCESS}>
              <Notification.Success children='Payment updated! We sent you an email.' />
            </Choose.When>
            <Choose.When condition={paymentState === PAYMENT_STATE.FAILED}>
              <Notification.Danger>
                Payment not updated.{' '}
                <LinkSolid
                  display='inline'
                  children='Contact us'
                  color='red8'
                  href={`mailto:hello@microlink.io?${marshall(
                    ERROR_MAIL_OPTS
                  )}`}
                />
                {'.'}
              </Notification.Danger>
            </Choose.When>
          </Choose>
        )}

        <Form onSubmit={this.handleSubmit}>
          <Label
            textAlign='left'
            display='block'
            fontSize={0}
            color='gray6'
            mb={4}
          >
            Card number
            <CardNumberElement {...createOptions(this.props.fontSize)} />
          </Label>

          <Label
            textAlign='left'
            display='block'
            fontSize={0}
            color='gray6'
            mb={4}
          >
            Expiration date
            <CardExpiryElement {...createOptions(this.props.fontSize)} />
          </Label>

          <Label
            textAlign='left'
            display='block'
            fontSize={0}
            color='gray6'
            mb={4}
          >
            CVC
            <CardCVCElement {...createOptions(this.props.fontSize)} />
          </Label>

          <ButtonSecondary
            children='Update Card'
            loading={paymentState === PAYMENT_STATE.PROCESSING}
          />
        </Form>
      </Fragment>
    )
  }
}

const CardForm = injectStripe(_CardForm)

function Payment () {
  const [state, setState] = useState({ mountOnLoad: false, stripe: null })
  const {
    stripeKey,
    paymentApiKey: apiKey,
    paymentEndpoint: apiEndpoint
  } = useSiteMetadata()

  const loadStripe = () => {
    if (window.Stripe) {
      setState({ stripe: window.Stripe(stripeKey) })
    } else {
      const el = document.querySelector('#stripe-js')
      el &&
        el.addEventListener('load', () => {
          setState({ stripe: window.Stripe(stripeKey) })
        })
    }
  }

  return (
    <Layout>
      <Container as='section' maxWidth='350px' pt={4} pb={3}>
        <Head
          title='Update Payment'
          script={[
            { id: 'stripe-js', src: 'https://js.stripe.com/v3', async: true }
          ]}
          onChangeClientState={(newState, addedTags, removedTags) => {
            const el = addedTags.scriptTags && addedTags.scriptTags[0]
            if (el && !state.mountOnLoad) {
              el.onload = loadStripe
              setState({ mountOnLoad: true })
            }
          }}
        />
        <StripeProvider stripe={state.stripe}>
          <Flex flexDirection='column'>
            <Header title='Update Payment' pb={[4, 5]} />
            {/* <Heading children='' fontSize={[4, 5]} pb={4} /> */}
            <Elements>
              <CardForm
                apiEndpoint={apiEndpoint}
                apiKey={apiKey}
                fontSize={'18px'}
              />
            </Elements>
          </Flex>
        </StripeProvider>
      </Container>
    </Layout>
  )
}

export default Payment
