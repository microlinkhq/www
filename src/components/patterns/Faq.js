import React from 'react'

import { Heading, Text } from 'components/elements'

export const Asked = props => (
  <Text as='div' fontSize={[2, 3]} mt={4} ml={3} {...props} />
)

export const Question = props => (
  <Heading
    as='summary'
    textAlign='left'
    css='cursor:pointer;outline:0'
    variant={null}
    fontSize={[2, 3]}
    {...props}
  />
)

const Faq = props => <Text as='details' py={3} {...props} />

Faq.Question = Question
Faq.Asked = Asked

export default Faq
