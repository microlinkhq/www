/* global fetch */

import React, { Component } from 'react'
import styled from 'styled-components'
import { Flex, Heading } from 'rebass'
import { Helmet } from 'react-helmet'

import {
  Label,
  Container,
  PrimaryButton,
  Choose,
  Notification,
  LinkDotted
} from 'components'

import { marshall, unmarshall } from '../helpers'

import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  StripeProvider,
  Elements,
  injectStripe
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

class _CardForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = { paymentState: '' }
  }

  handleSubmit = event => {
    event.preventDefault()
    const { apiKey, api, stripe } = this.props

    this.setState({ paymentState: PAYMENT_STATE.PROCESSING })

    stripe
      .createToken()
      .then(token =>
        fetch(`${api}/payment/update`, {
          headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey },
          method: 'POST',
          body: JSON.stringify({
            token,
            user_id: unmarshall(window.location.search).id,
            email_template: 'payment_updated'
          })
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
      <div>
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
              <LinkDotted
                color='red8'
                href={`mailto:hello@microlink.io?${marshall(ERROR_MAIL_OPTS)}`}
              >
                Contact us
              </LinkDotted>.
            </Notification.Danger>
          </Choose.When>
        </Choose>

        <Form onSubmit={this.handleSubmit}>
          <Label display='block' fontSize={0} color='gray6'>
            Card number
            <CardNumberElement {...createOptions(this.props.fontSize)} />
          </Label>

          <Label display='block' fontSize={0} color='gray6'>
            Expiration date
            <CardExpiryElement {...createOptions(this.props.fontSize)} />
          </Label>

          <Label display='block' fontSize={0} color='gray6'>
            CVC
            <CardCVCElement {...createOptions(this.props.fontSize)} />
          </Label>

          <PrimaryButton
            mt={4}
            bg='primary'
            children='Add Card'
            display={['block', 'inherit']}
            width={['100%', 'inherit']}
            disabled={paymentState !== ''}
            spinner={paymentState === PAYMENT_STATE.PROCESSING}
          />
        </Form>
      </div>
    )
  }
}

const CardForm = injectStripe(_CardForm)

export default class extends Component {
  constructor () {
    super()
    this.state = {
      stripe: null
    }
    this.loadStripe = this.loadStripe.bind(this)
  }

  loadStripe () {
    const { stripeKey } = this.props

    if (window.Stripe) {
      this.setState({ stripe: window.Stripe(stripeKey) })
    } else {
      const el = document.querySelector('#stripe-js')
      el &&
        el.addEventListener('load', () => {
          this.setState({ stripe: window.Stripe(stripeKey) })
        })
    }
  }

  render () {
    const { paymentApiKey: apiKey, paymentEndpoint: api } = this.props

    return (
      <Container is='main' maxWidth='350px' pt={5}>
        <Helmet
          title='Add Payment'
          script={[
            { id: 'stripe-js', src: 'https://js.stripe.com/v3', async: true }
          ]}
          onChangeClientState={(newState, addedTags, removedTags) => {
            const el = addedTags.scriptTags && addedTags.scriptTags[0]
            if (el) el.onload = this.loadStripe
          }}
        />
        <StripeProvider stripe={this.state.stripe}>
          <Elements>
            <Flex flexDirection='column'>
              <Heading
                children='Add Payment'
                fontSize={3}
                pb={4}
                color='black80'
              />
              <CardForm api={api} apiKey={apiKey} fontSize={'18px'} />
            </Flex>
          </Elements>
        </StripeProvider>
      </Container>
    )
  }
}
