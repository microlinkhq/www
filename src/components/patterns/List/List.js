import { CheckCircle, XCircle } from 'react-feather'
import FeatherIcon from 'components/icons/Feather'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import { fontSizes, theme } from 'theme'
import React from 'react'

const List = props => (
  <Flex as='ul' css={theme({ flexDirection: 'column' })} {...props} />
)

const ListItem = ({
  type = 'yes',
  alignItems = 'center',
  isLast,
  ...props
}) => {
  const isYes = type === 'yes'
  const iconSize = [1, 1, 2, 2]

  return (
    <Flex as='li' css={theme({ alignItems, mb: isLast ? 0 : 3 })}>
      <Flex
        css={theme({
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          fontSize: [1, 1, 2, 2],
          mr: 2,
          pt: alignItems === 'flex-start' ? '0.375em' : 0,
          width: [fontSizes[1], fontSizes[1], fontSizes[2], fontSizes[2]]
        })}
        as='span'
      >
        <FeatherIcon
          icon={isYes ? CheckCircle : XCircle}
          color={isYes ? 'close' : 'gray'}
          size={iconSize}
          aria-hidden='true'
        />
      </Flex>
      <Text {...props} />
    </Flex>
  )
}

List.Item = ListItem

export default List
