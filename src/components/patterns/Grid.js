import { Caps, Flex, Text, Box } from 'components/elements'
import Markdown from 'components/markdown'
import chunk from 'lodash/chunk'
import React from 'react'

const Item = ({ title, description, ...props }) => (
  <Box
    as='li'
    maxWidth='16rem'
    style={{ listStyle: 'none' }}
    flex={1}
    pt={4}
    pr={[0, 3, 3, 3]}
    {...props}
  >
    <Caps as='h4' pb={[1, 2]} fontWeight='bold'>
      {title}
    </Caps>
    <Text
      css={`
        div {
          margin: 0;
          font-size: inherit;
        }
      `}
      fontSize={1}
    >
      <Markdown>{description}</Markdown>
    </Text>
  </Box>
)

const Grid = ({
  children,
  itemsPerRow,
  childComponent: Component = Item,
  ...props
}) => (
  <Box width='100%'>
    {chunk(children, itemsPerRow).map((row, index) => (
      <Flex
        as='ul'
        justifyContent={[
          'space-around',
          'flex-start',
          'space-between',
          'space-between'
        ]}
        key={index}
        pl={0}
        {...props}
      >
        {row.map(rowProps => (
          <Component key={JSON.stringify(rowProps)} {...rowProps} />
        ))}
      </Flex>
    ))}
  </Box>
)

export default Grid
