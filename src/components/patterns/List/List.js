import React from 'react'
import { Flex, Text, Box } from 'components/elements'
import { CheckMark } from 'components/icons'

const List = props => <Box as='ul' {...props} />

const ListItem = props => (
  <Flex as='li' alignItems='flex-start' mb={3}>
    <Text as='span' lineHeight={3} mr={2}>
      <CheckMark />
    </Text>
    <Text {...props} />
  </Flex>
)

List.Item = ListItem

export default List
