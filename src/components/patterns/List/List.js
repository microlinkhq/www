import FeatherIcon from 'components/icons/Feather'
import { Flex, Text } from 'components/elements'
import { fontSizes } from 'theme'
import React from 'react'

const List = props => <Flex as='ul' flexDirection='column' {...props} />

const ListItem = ({ type = 'yes', ...props }) => {
  const isYes = type === 'yes'
  return (
    <Flex as='li' alignItems='center' mb={3}>
      <Flex
        justifyContent='center'
        mr={2}
        width={[fontSizes[1], fontSizes[1], fontSizes[2], fontSizes[2]]}
        height='100%'
        as='span'
      >
        <FeatherIcon
          icon={isYes ? 'CheckCircle' : 'XCircle'}
          color={isYes ? 'close' : 'gray'}
        />
      </Flex>
      <Text {...props} />
    </Flex>
  )
}

List.Item = ListItem

export default List
