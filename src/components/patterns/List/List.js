import { XCircle, CheckCircle } from 'react-feather'
import { Flex, Text } from 'components/elements'
import { cx } from 'theme'
import React from 'react'

const List = props => <Flex as='ul' flexDirection='column' {...props} />

const ListItem = ({ type = 'yes', ...props }) => {
  const IconComponent = type === 'yes' ? CheckCircle : XCircle
  const color = type === 'yes' ? cx('close') : cx('gray')

  return (
    <Flex as='li' alignItems='center' mb={3}>
      <Flex justifyContent='center' mr={2}>
        <IconComponent color={color} />
      </Flex>
      <Text {...props} />
    </Flex>
  )
}

List.Item = ListItem

export default List
