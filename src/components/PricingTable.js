import React from 'react'
import styled from 'styled-components'
import {Link, ButtonOutline, Flex, Text, Lead} from 'rebass'
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

export default () => (
  <div>
    <Table>
      <tbody>
        <Tr>
          <Th />
          <Td >
            <Lead bold>Community</Lead>
          </Td>
          <Td>
            <Lead bold>Professional</Lead>
          </Td>
        </Tr>
        <Tr>
          <Th>Rate Limit</Th>
          <Td>250 <DailyRequests>reqs</DailyRequests></Td>
          <Td>10,000 <MonthlyRequests>reqs</MonthlyRequests></Td>
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
            <Link
              href='mailto:hello@microlink.io'
              target='_blank'
              children={
                <ButtonOutline
                  style={{cursor: 'pointer'}}
                  color='blue'
                  children='Buy Now'
                />
              }
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
        Do you need more? <CustomLink href='mailto:hello@microlink.io' target='_blank'>Contact us</CustomLink>.
      </Text>
    </Flex>
  </div>
)
