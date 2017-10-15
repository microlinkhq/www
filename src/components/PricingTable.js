import React from 'react'
import styled from 'styled-components'
import {Lead} from 'rebass'

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

const Th = styled.th`
  padding: .75rem;
  vertical-align: top;
`

const Tr = styled.tr`
  border-spacing: 2px;
  border-color: grey;
`
export default () => (
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
        <Td>100</Td>
        <Td>∞</Td>
      </Tr>
      <Tr>
        <Th>Response timing</Th>
        <Td>Best Effort</Td>
        <Td>Yes</Td>
      </Tr>
      <Tr>
        <Th>Screenshot image hosting</Th>
        <Td>Free Imgur API</Td>
        <Td>Custom</Td>
      </Tr>
      <Tr>
        <Th>Request caching</Th>
        <Td>24h</Td>
        <Td>Custom</Td>
      </Tr>
      <Tr>
        <Th />
        <Td>$<b>0</b>/mo</Td>
        <Td>$<b>6</b>/mo</Td>
      </Tr>
    </tbody>
  </Table>
)
