import React from 'react'
import { Flex, Text, Box } from 'components/elements'

const CheckMark = props => (
  <svg
    width='14px'
    height='12px'
    viewBox='0 0 14 12'
    version='1.1'
    xmlns='http://www.w3.org/2000/svg'
  >
    <g id='Page-1' stroke='none' strokeWidth={1} fill='none' fillRule='evenodd'>
      <g id='Group-14'>
        <rect
          id='Rectangle-3'
          fill='#654ea3'
          x={0}
          y={0}
          width='12.4444444'
          height={12}
          rx={3}
        />{' '}
        <path
          d='M4,6 L6.19988776,8.12132034'
          id='Line'
          stroke='#f5f4f9'
          strokeWidth='1.5'
          strokeLinecap='square'
        />{' '}
        <path
          d='M6,1.75 L12.5996633,8.11396103'
          id='Line'
          stroke='#f5f4f9'
          strokeWidth='1.5'
          strokeLinecap='square'
          transform='translate(9.299832, 4.931981) scale(-1, 1) translate(-9.299832, -4.931981) '
        />
      </g>
    </g>
  </svg>
)

export const List = props => <Box as='ul' {...props} />

export const ListItem = props => (
  <Flex as='li' alignItems='flex-start' mb={3}>
    <Text as='span' lineHeight={3} mr={2}>
      <CheckMark />
    </Text>
    <Text {...props} />
  </Flex>
)

export default {
  ListItem,
  List
}
