import { Caps, Flex, Text, Box } from 'components/elements'
import chunk from 'lodash/chunk'
import React from 'react'

const Item = ({ title, description, ...props }) => (
  <Box
    as='li'
    mb={4}
    px={[3, 4]}
    style={{ listStyle: 'none' }}
    maxWidth={['100%', '21em']}
    {...props}
  >
    <Caps
      as='header'
      color='black80'
      pb={[1, 2]}
      fontWeight='bold'
      children={title}
    />
    <Text color='black50' children={description} />
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
