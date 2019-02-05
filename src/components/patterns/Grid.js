import { Caps, Flex, Text, Box } from 'components/elements'
import chunk from 'lodash.chunk'
import React from 'react'

export default ({ children, itemsPerRow }) => (
  <Flex justifyContent='center' alignItems='center' flexDirection='column'>
    {chunk(children, itemsPerRow).map((row, index) => (
      <Flex justifyContent='space-between' key={index} pb={[2, 3]}>
        {row.map(({ title, description }, index) => (
          <Flex mb={4} key={index} as='li' style={{ listStyle: 'none' }}>
            <Box
              mx={'auto'}
              maxWidth={['14em', '17em']}
              textAlign={['left', 'left', 'inherit', 'inherit']}
            >
              <Caps as='header' color='black80' pb={[1, 2]} fontWeight='bold' children={title} />
              <Text color='black50' children={description} />
            </Box>
          </Flex>
        ))}
      </Flex>
    ))}
  </Flex>
)
