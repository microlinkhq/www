import styled, {keyframes} from 'styled-components'
import {HelpCircle, Check} from 'react-feather'
import {Flex, Text, Lead} from 'rebass'
import React, {Component} from 'react'

import Hide from './Hide'
import Tooltip from './Tooltip'
import {LinkSolid} from './Link'
import Checkout from './Checkout'
import PricePicker from './PricePicker'

import {colors} from 'theme'

const BASE_PRICE = 9
const BASE_PLAN = 'pro-1k'
const BASE_PLAN_REQS = 1000

const toLocale = number => Math.round(number).toLocaleString('en-US')

const highlight = keyframes`
  from {
     background-color: yellow;
   }
   to {
     background-color: #fff;
   }
`

const Highlight = styled.span`
  animation-name: ${highlight};
  animation-duration: 1s;
  animation-fill-mode: forwards;
`

const Table = styled.table`
  width: 100%;
  max-width: 100%;
  margin-bottom: 1rem;
  background-color: transparent;
`

const Td = styled.td`
  padding: 0.75rem;
  vertical-align: top;
`

const TdPrice = Td.extend`
  font-weight: bold;

  &::before {
    content: '$';
    font-weight: 100;
    font-size: 0.8em;
    position: relative;
    top: -5px;
    left: 0;
    color: ${colors.black50};
  }

  &::after {
    content: '/month';
    font-weight: 100;
    font-size: 0.8em;
    position: relative;
    top: 0;
    color: ${colors.black50};
  }
`

const SubSpan = styled.span`
  &::after {
    font-weight: 100;
    font-size: 0.8em;
    content: '/month';
    position: relative;
    top: 0;
    color: ${colors.black50};
  }
`

const DailyRequests = SubSpan.extend`
  &::after {
    content: '/day';
  }
`

const RequestsConcurrency = SubSpan.extend`
  &::after {
    content: '/seq';
  }
`

const Th = styled.th`
  padding: 0.75rem;
  vertical-align: top;
`

const Tr = styled.tr`
  border-spacing: 2px;
  border-color: grey;
`

// const Note = styled.span`
//   &::before {
//     content: "*";
//     font-weight: 100;
//     font-size: .8em;
//     position: relative;
//     top: -5px;
//     left: 0;
//     color: ${colors.gray8};
//   }
// `

export default class extends Component {
  constructor (props) {
    super(props)
    this.priceSelected = this.priceSelected.bind(this)
    this.state = {
      plan: BASE_PLAN,
      description: `${toLocale(BASE_PLAN_REQS)} daily requests`,
      price: BASE_PRICE,
      panelLabel: `$${BASE_PRICE}/month`
    }
  }

  priceSelected ({plan, reqs}) {
    const newPrice = BASE_PRICE * reqs / BASE_PLAN_REQS

    this.setState({
      plan,
      description: `${toLocale(reqs)} daily requests`,
      price: toLocale(newPrice),
      panelLabel: `$${newPrice}/month`
    })

    if (this.raf) return
    if (this.state.highlight) {
      // reset the animation
      this.setState({highlight: false}, () => {
        this.raf = requestAnimationFrame(() => {
          this.raf = null
          this.setState({highlight: true})
        })
      })
    } else {
      this.setState({highlight: true})
    }
  }

  render () {
    const {highlight, plan, description, panelLabel, price} = this.state
    const {api, apiKey, stripeKey} = this.props

    return (
      <div>
        <Table>
          <tbody>
            <Tr>
              <Th />
              <Td>
                <Lead fontWeight='bold'>Free</Lead>
              </Td>
              <Td>
                <Lead fontWeight='bold'>Pro</Lead>
              </Td>
            </Tr>
            <Tr>
              <Th>
                <Tooltip
                  key='rate-limit'
                  content={
                    <div>
                      <Text fontWeight='normal'>
                        Rate limit is based in a daily quota of requests.
                      </Text>
                      <Text fontWeight='normal'>It will be reset every day</Text>
                    </div>
                  }>
                  <Flex justify='center' align='center'>
                    <Text fontWeight='bold' fontSize={[1, 2]} pr={1}>
                      Rate Limit
                    </Text>
                    <HelpCircle color={colors.black50} size={14} />
                  </Flex>
                </Tooltip>
              </Th>
              <Td>
                500 <DailyRequests>reqs</DailyRequests>
              </Td>
              <Td>
                <PricePicker
                  base={{
                    plan: BASE_PLAN,
                    reqs: BASE_PLAN_REQS
                  }}
                  onChange={this.priceSelected}
                />
                <DailyRequests>reqs</DailyRequests>
              </Td>
            </Tr>
            <Tr>
              <Th>
                <Tooltip
                  key='req-concurrency'
                  content={
                    <div>
                      <Text fontWeight='normal'>Maximum simultaneous requests you can make.
                      </Text>
                    </div>
                  }>
                  <Flex justify='center' align='center'>
                    <Text fontWeight='bold' fontSize={[1, 2]} pr={1}>
                      <Hide breakpoints={[0, 1]}>
                        Request Concurrency
                      </Hide>
                      <Hide breakpoints={[2, 3]}>
                        Req. Concurrency
                      </Hide>
                    </Text>
                    <HelpCircle color={colors.black50} size={14} />
                  </Flex>
                </Tooltip>
              </Th>
              <Td>
                1<RequestsConcurrency />
              </Td>
              <Td>
                ∞<RequestsConcurrency />
              </Td>
            </Tr>
            <Tr>
              <Th>
                <Tooltip
                  key='req-caching'
                  content={
                    <div>
                      <Text fontWeight='normal'>
                        We follow a query caching policy for successive API calls.
                      </Text>
                    </div>
                  }>
                  <Flex justify='center' align='center'>
                    <Text fontWeight='bold' fontSize={[1, 2]} pr={1}>
                      <Hide breakpoints={[0, 1]}>
                      Request Caching
                      </Hide>
                      <Hide breakpoints={[2, 3]}>
                      Req. Caching
                      </Hide>
                    </Text>
                    <HelpCircle color={colors.black50} size={14} />
                  </Flex>
                </Tooltip>
              </Th>
              <Td>
                <Check color={colors.black} size={16} />
              </Td>
              <Td>
                <Check color={colors.black} size={16} />
              </Td>
            </Tr>
            <Tr>
              <Th>
                <Tooltip
                  key='support'
                  content={
                    <div>
                      <Text fontWeight='normal'>We provide chat support to help you integrate with your services.</Text>
                    </div>
                  }>
                  <Flex justify='center' align='center'>
                    <Text fontWeight='bold' fontSize={[1, 2]} pr={1}>
                      Live Support
                    </Text>
                    <HelpCircle color={colors.black50} size={14} />
                  </Flex>
                </Tooltip>
              </Th>
              <Td>
                <Check color={colors.black} size={16} />
              </Td>
              <Td>
                <Check color={colors.black} size={16} />
              </Td>
            </Tr>
            <Tr>
              <Th />
              <TdPrice>0</TdPrice>
              <TdPrice>{highlight ? <Highlight>{price}</Highlight> : <span>{price}</span>}</TdPrice>
            </Tr>
            <Tr>
              <Th />
              <Th />
              <Td>
                <Checkout
                  api={api}
                  plan={plan}
                  apiKey={apiKey}
                  stripeKey={stripeKey}
                  panelLabel={panelLabel}
                  description={description}
                />
              </Td>
            </Tr>
          </tbody>
        </Table>

        <Flex
          is='section'
          justifyContent='center'
          flexDirection='column'
          alignContent='center'>
          <Text textAlign='center' pt={4} px={5} f={3} color='gray8'>
            Do you need more?
          </Text>
          <Text textAlign='center' pt={3} px={5} f={3} color='gray8'>
            <LinkSolid fontWeight='bold' onClick={this.openForm}>Contact us</LinkSolid>.
          </Text>
        </Flex>
      </div>
    )
  }
}
