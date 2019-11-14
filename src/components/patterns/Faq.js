import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Heading, Text } from 'components/elements'
import { space, transition } from 'theme'

const sweep = keyframes`
0% {
  opacity: 0;
}

100% {
  opacity: 1;
}
`

export const Asked = props => (
  <Text color='gray7' fontSize={[1, 2]} mt={3} ml='20px' {...props} />
)

export const Question = props => (
  <Heading
    as='summary'
    textAlign='left'
    variant={null}
    fontSize={[2, 3]}
    {...props}
  />
)

const Details = styled(Text)`
  summary::before {
    content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='16' height='16' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='3'%3E%3Cpath d='M9 18l6-6-6-6'/%3E%3C/svg%3E");
    margin-right: ${space[1]};
  }

  &[open] summary::before {
    content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' class='feather feather-chevron-down'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E%0A");
  }

  &[open] summary ~ * {
    animation: ${sweep} ${transition.medium};
  }
`

const Faq = props => <Details as='details' py={3} {...props} />

Faq.Question = Question
Faq.Asked = Asked

export default Faq
