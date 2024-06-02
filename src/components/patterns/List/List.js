import FeatherIcon from 'components/icons/Feather'
import { Flex, Text } from 'components/elements'
import { fontSizes, theme } from 'theme'
import React from 'react'

const List = props => (
  <Flex as='ul' css={theme({ flexDirection: 'column' })} {...props} />
)

const ListItem = ({ type = 'yes', ...props }) => {
  const isYes = type === 'yes'
  return (
    <Flex as='li' css={theme({ alignItems: 'center', mb: 3 })}>
      <Flex
        css={theme({
          justifyContent: 'center',
          mr: 2,
          width: [fontSizes[1], fontSizes[1], fontSizes[2], fontSizes[2]],
          height: '100%'
        })}
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
