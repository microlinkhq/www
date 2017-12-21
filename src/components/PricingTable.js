import { ReactTypeformEmbed } from 'react-typeform-embed'
import styled, {keyframes} from 'styled-components'
import { HelpCircle } from 'react-feather'
import {Flex, Text, Lead} from 'rebass'
import React, {Component} from 'react'

import ButtonGradient from './ButtonGradient'
import PricePicker from './PricePicker'
import Tooltip from './ToolTip'
import {colors} from '../theme'
import CustomLink from './Link'

const BASE_PRICE = 9
const BASE_DAILY_REQS = 1000

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
  padding: .75rem;
  vertical-align: top;
`

const TdPrice = Td.extend`
  font-weight: bold;

  &::before {
    content: "$";
    font-weight: 100;
    font-size: .8em;
    position: relative;
    top: -5px;
    left: 0;
    color: ${colors.black50};
  }

  &::after {
    content: "/month";
    font-weight: 100;
    font-size: .8em;
    position: relative;
    top: 0;
    color: ${colors.black50};
  }
`

const MonthlyRequests = styled.span`
  &::after {
    font-weight: 100;
    font-size: .8em;
    content: "/month";
    position: relative;
    top: 0;
    color: ${colors.black50};
  }
`

const DailyRequests = MonthlyRequests.extend`
  &::after {
    content: "/day";
  }
`

const Th = styled.th`
  padding: .75rem;
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
    this.openForm = this.openForm.bind(this)
    this.priceSelected = this.priceSelected.bind(this)
    this.state = { price: BASE_PRICE }
  }

  priceSelected (dailyReqs) {
    const newPrice = (BASE_PRICE * dailyReqs) / BASE_DAILY_REQS
    this.setState({price: Math.round(newPrice).toLocaleString('en-US')})

    if (this.raf) return
    if (this.state.highlight) {
    // reset the animation
      this.setState({ highlight: false }, () => {
        this.raf = requestAnimationFrame(() => {
          this.raf = null
          this.setState({ highlight: true })
        })
      })
    } else {
      this.setState({ highlight: true })
    }
  }

  openForm () {
    this.typeformEmbed.typeform.open()
  }

  render () {
    const { highlight } = this.state

    return (
      <div>
        <Table>
          <tbody>
            <Tr>
              <Th />
              <Td >
                <Lead bold>Free</Lead>
              </Td>
              <Td>
                <Lead bold>Pro</Lead>
              </Td>
            </Tr>
            <Tr>
              <Th>
                <Tooltip
                  content={
                    <div>
                      <Text>Rate limit is based in a daily quota of requests.</Text>
                      <Text>It will be reset every day</Text>
                    </div>
                  }>
                  <Flex justify='center' align='center'>
                    <Text bold pr={1}>Rate Limit</Text>
                    <HelpCircle color={colors.black50} size={14} />
                  </Flex>
                </Tooltip>
              </Th>
              <Td>
                500 <DailyRequests>reqs</DailyRequests>
              </Td>
              <Td>
                <PricePicker onChange={this.priceSelected} /><DailyRequests>reqs</DailyRequests>
              </Td>
            </Tr>
            <Tr>
              <Th>
                <Tooltip
                  content={
                    <div>
                      <Text>Screenshots need to be saved in a physical space.</Text>
                    </div>
                  }>
                  <Flex justify='center' align='center'>
                    <Text bold pr={1}>Image Hosting</Text>
                    <HelpCircle color={colors.black50} size={14} />
                  </Flex>
                </Tooltip>
              </Th>
              <Td>Imgur</Td>
              <Td>Custom</Td>
            </Tr>
            <Tr>
              <Th>
                <Tooltip
                  content={
                    <div>
                      <Text>We follow a query caching policy for successive API calls.</Text>
                    </div>
                  }>
                  <Flex justify='center' align='center'>
                    <Text bold pr={1}>Request Caching</Text>
                    <HelpCircle color={colors.black50} size={14} />
                  </Flex>
                </Tooltip>
              </Th>
              <Td>5 days</Td>
              <Td>Custom</Td>
            </Tr>
            <Tr>
              <Th />
              <TdPrice>0</TdPrice>
              <TdPrice>
                { highlight
                ? <Highlight>{this.state.price}</Highlight>
                : <span>{this.state.price}</span> }
              </TdPrice>
            </Tr>
            <Tr>
              <Th />
              <Th />
              <Td>
                <ReactTypeformEmbed
                  popup
                  autoOpen={false}
                  url={'https://kikobeats.typeform.com/to/KCZMOv'}
                  hideHeaders
                  hideFooter
                  style={{width: 0, height: 0}}
                  ref={(node => (this.typeformEmbed = node))} />
                <div>
                  <ButtonGradient
                    style={{cursor: 'pointer'}}
                    color='blue'
                    onClick={this.openForm}
                  />
                </div>
              </Td>
            </Tr>
          </tbody>
        </Table>

        <Flex is='section' justify='center' direction='column' align='center'>
          <Text pt={4} px={5} f={3} color='gray8' style={{textAlign: 'center'}}>
            Do you need more?
          </Text>
          <Text pt={3} px={5} f={3} color='gray8' style={{textAlign: 'center'}}>
            <CustomLink style={{cursor: 'pointer'}} onClick={this.openForm}>Contact us</CustomLink>.
          </Text>
        </Flex>
      </div>
    )
  }
}
