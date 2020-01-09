import { Caps, Flex, Text, Box } from 'components/elements'
import Markdown from 'components/markdown'
import chunk from 'lodash/chunk'
import React from 'react'

const Item = ({ title, description, ...props }) => (
  <Box
    as='li'
    mb={4}
    px={[3, 4]}
    style={{ listStyle: 'none' }}
    maxWidth={[6, 6, 7, 7]}
    flex={1}
    {...props}
  >
    <Caps
      as='header'
      color='black80'
      pb={[1, 2]}
      fontWeight='bold'
      children={title}
    />
    <Text
      color='black60'
      css={`
        div {
          margin: 0;
        }
      `}
    >
      <Markdown children={description} />
    </Text>
  </Box>
)

export default ({
  children,
  itemsPerRow,
  childComponent: ChildComponent = Item,
  ...props
}) => (
  <Flex justifyContent='center' alignItems='center' flexDirection='column'>
    {chunk(children, itemsPerRow).map((row, index) => (
      <Flex
        as='ul'
        justifyContent={['center', 'center', 'space-between']}
        key={index}
        width='100%'
        pl={0}
        mt={0}
        mb={0}
        {...props}
      >
        {row.map((rowProps, index) => (
          <ChildComponent key={JSON.stringify(rowProps)} {...rowProps} />
        ))}
      </Flex>
    ))}
  </Flex>
)
