import { XCircle, CheckCircle } from 'react-feather'
import { Flex, Text } from 'components/elements'
import React, { createElement } from 'react'
import { fontSizes, cx } from 'theme'

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
        {createElement(isYes ? CheckCircle : XCircle, {
          color: isYes ? cx('close') : cx('gray')
        })}
      </Flex>
      <Text {...props} />
    </Flex>
  )
}

List.Item = ListItem

export default List
