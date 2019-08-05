import { Caps, Flex, Text, Box } from 'components/elements'
import { chunk } from 'lodash'
import React from 'react'

export default ({ children, itemsPerRow }) => (
  <Flex justifyContent='center' alignItems='center' flexDirection='column'>
    {chunk(children, itemsPerRow).map((row, index) => (
      <Flex
        justifyContent={['center', 'center', 'space-between']}
        key={index}
        width='100%'
      >
        {row.map(({ title, description }, index) => (
          <Flex mb={4} key={index} as='li' px={4} style={{ listStyle: 'none' }}>
            <Box mr='auto' ml='auto' px={[3, 0]} maxWidth={['100%', '17em']}>
              <Caps
                as='header'
                color='black80'
                pb={[1, 2]}
                fontWeight='bold'
                children={title}
              />
              <Text color='black50' children={description} />
            </Box>
          </Flex>
        ))}
      </Flex>
    ))}
  </Flex>
)
