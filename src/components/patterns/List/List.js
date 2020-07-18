import React from 'react'
import { Flex, Text, Box } from 'components/elements'
import { CheckCircle } from 'react-feather'
import { cx } from 'theme'

const List = props => <Box as='ul' {...props} />

const ListItem = props => (
  <Flex as='li' alignItems='center' mb={3}>
    <Flex justifyContent='center' mr={2}>
      <CheckCircle size={18} color={cx('close')} />
    </Flex>
    <Text {...props} />
  </Flex>
)

List.Item = ListItem

export default List
