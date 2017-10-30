import { ReactTypeformEmbed } from 'react-typeform-embed'
import styled from 'styled-components'
import React, {Component} from 'react'
import Hide from 'hidden-styled'

import {ButtonOutline, Flex, Text, Lead} from 'rebass'
import {colors} from '../theme'
import CustomLink from './Link'

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

const Note = styled.span`
  &::before {
    content: "*";
    font-weight: 100;
    font-size: .8em;
    position: relative;
    top: -5px;
    left: 0;
    color: ${colors.gray8};
  }
`

export default class extends Component {
  constructor (props) {
    super(props)
    this.openForm = this.openForm.bind(this)
  }

  openForm () {
    this.typeformEmbed.typeform.open()
  }

  render () {
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
              <Th>Rate Limit</Th>
              <Td>
                <Hide xs sm>1,000 <DailyRequests>reqs</DailyRequests></Hide>
                <Hide md lg>1K <DailyRequests>reqs</DailyRequests></Hide>
              </Td>
              <Td>
                <Hide xs sm>10,000 <DailyRequests>reqs</DailyRequests></Hide>
                <Hide md lg>10K <DailyRequests>reqs</DailyRequests></Hide>
              </Td>
            </Tr>
            <Tr>
              <Th>Screenshot image hosting</Th>
              <Td>Imgur</Td>
              <Td>Custom</Td>
            </Tr>
            <Tr>
              <Th>Request caching</Th>
              <Td>5 days</Td>
              <Td>Custom</Td>
            </Tr>
            <Tr>
              <Th />
              <TdPrice>0</TdPrice>
              <TdPrice>6<Note /></TdPrice>
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
                <ButtonOutline
                  style={{cursor: 'pointer'}}
                  color='blue'
                  onClick={this.openForm}
                  children='Buy Now'
                />
              </Td>
            </Tr>
          </tbody>
        </Table>

        <Flex is='section' justify='center' direction='column' align='center'>
          <Text pt={4} px={5} f={3} color='gray8' style={{textAlign: 'center'}}>
            * Special price for early adopters.
          </Text>
          <Text pt={4} f={1} color='gray8'>
            Do you need more? <CustomLink style={{cursor: 'pointer'}} onClick={this.openForm}>Contact us</CustomLink>.
          </Text>
        </Flex>
      </div>
    )
  }
}
