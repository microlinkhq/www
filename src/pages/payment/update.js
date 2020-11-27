/* global fetch */

import { useSiteMetadata } from 'components/hook'
import { layout, letterSpacings } from 'theme'
import { Layout } from 'components/patterns'
import React, { Component } from 'react'
import styled from 'styled-components'
import { Choose } from 'react-extras'
import { encode, decode } from 'qss'

import {
  Button,
  Container,
  Flex,
  Heading,
  Label,
  LinkSolid,
  Notification,
  StripeLoader
} from 'components/elements'

import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  StripeProvider,
  injectStripe,
  Elements
} from 'react-stripe-elements'

import { ERROR_MAIL_OPTS, PAYMENT_STATE } from './'

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
        letterSpacing: letterSpacings[2],
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
        fetch(`${apiEndpoint}/payment/update`, {
          headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey },
          method: 'POST',
          body: JSON.stringify({
            customerId: decode(window.location.search.substring(1)).id,
            token
          })
        })
      )
      .then(() => this.setState({ paymentState: PAYMENT_STATE.SUCCESS }))
      .catch(err => {
        console.error(err)
        this.setState({ paymentState: PAYMENT_STATE.FAILED })
      })
  }

  render () {
    const { paymentState } = this.state

    return (
      <>
        {paymentState && (
          <Choose>
            <Choose.When condition={paymentState === PAYMENT_STATE.PROCESSING}>
              <Notification.Success>Processing...</Notification.Success>
            </Choose.When>
            <Choose.When condition={paymentState === PAYMENT_STATE.SUCCESS}>
              <Notification.Success>
                Payment updated! We sent you an email.
              </Notification.Success>
            </Choose.When>
            <Choose.When condition={paymentState === PAYMENT_STATE.FAILED}>
              <Notification.Error>
                Payment not updated.{' '}
                <LinkSolid
                  display='inline'
                  color='red8'
                  href={`mailto:hello@microlink.io?${encode(ERROR_MAIL_OPTS)}`}
                >
                  Contact us
                </LinkSolid>
                .
              </Notification.Error>
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
            <CardCvcElement {...createOptions(this.props.fontSize)} />
          </Label>

          <Button loading={paymentState === PAYMENT_STATE.PROCESSING}>
            Update Card
          </Button>
        </Form>
      </>
    )
  }
}

const CardForm = injectStripe(_CardForm)

export default () => {
  const {
    stripeKey,
    paymentApiKey: apiKey,
    paymentEndpoint: apiEndpoint
  } = useSiteMetadata()

  return (
    <StripeLoader stripeKey={stripeKey}>
      {stripe => {
        return (
          <Layout>
            <Container
              alignItems='center'
              pt={5}
              pb={Container.defaultProps.pt}
            >
              <StripeProvider stripe={stripe}>
                <Flex flexDirection='column'>
                  <Heading px={5} titleize={false} maxWidth={layout.large}>
                    Payment details
                  </Heading>
                  <Flex
                    pt={[3, 3, 4, 4]}
                    mx='auto'
                    flexDirection='column'
                    width={6}
                  >
                    <Elements>
                      <CardForm
                        apiEndpoint={apiEndpoint}
                        apiKey={apiKey}
                        fontSize='18px'
                      />
                    </Elements>
                  </Flex>
                </Flex>
              </StripeProvider>
            </Container>
          </Layout>
        )
      }}
    </StripeLoader>
  )
}
