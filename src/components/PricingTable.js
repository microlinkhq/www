import React from 'react'
import styled from 'styled-components'
import {Flex, Text, Lead} from 'rebass'
import {colors} from '../theme'
import Link from './Link'

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
    content: "/mo";
    font-weight: 100;
    font-size: .8em;
    position: relative;
    top: 0;
    color: ${colors.black50};
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
          <Th>Max requests per day</Th>
          <Td>250</Td>
          <Td>10‚000</Td>
        </Tr>
        <Tr>
          <Th>Screenshot image hosting</Th>
          <Td>Imgur</Td>
          <Td>Custom</Td>
        </Tr>
        <Tr>
          <Th>Request caching</Th>
          <Td>24h</Td>
          <Td>Custom</Td>
        </Tr>
        <Tr>
          <Th />
          <TdPrice>0</TdPrice>
          <TdPrice>9</TdPrice>
        </Tr>
      </tbody>
    </Table>

    <Flex is='section' justify='center' direction='column' align='center'>
      <Text pt={4} f={1} color='gray8'>
        Do you need more? <Link href='#'>Contact us</Link>.
      </Text>
    </Flex>
  </div>
)
