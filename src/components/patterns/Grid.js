import { Flex, Text, Caps, Row, Column, Box } from 'components/elements'
import chunk from 'lodash.chunk'
import React from 'react'

export default ({ children, itemsPerRow }) => (
  <Flex
    is='section'
    justifyContent='center'
    alignContent='center'
    flexDirection='column'
  >
    {chunk(children, itemsPerRow).map((row, index) => (
      <Row key={index} pb={[4, 5]}>
        {row.map(({ title, description }, index) => (
          <Column key={index} is='li' style={{ listStyle: 'none' }}>
            <Box
              mx={'auto'}
              maxWidth={['14em', '17em']}
              textAlign={['center', 'center', 'inherit', 'inherit']}
            >
              <Caps color='black80' pb={3} fontWeight='bold' children={title} />
              <Text lineHeight={3} color='black80' children={description} />
            </Box>
          </Column>
        ))}
      </Row>
    ))}
  </Flex>
)
