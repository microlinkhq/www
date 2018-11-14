import { Caps, Flex, Text, Row, Column, Box } from 'components/elements'
import chunk from 'lodash.chunk'
import React from 'react'

export default ({ children, itemsPerRow }) => (
  <Flex
    as='section'
    justifyContent='center'
    alignContent='center'
    flexDirection='column'
  >
    {chunk(children, itemsPerRow).map((row, index) => (
      <Row key={index} pb={[2, 3]}>
        {row.map(({ title, description }, index) => (
          <Column key={index} as='li' style={{ listStyle: 'none' }}>
            <Box
              mx={'auto'}
              maxWidth={['14em', '17em']}
              textAlign={['left', 'left', 'inherit', 'inherit']}
            >
              <Caps
                color='black80'
                pb={[1, 2]}
                fontWeight='bold'
                children={title}
              />
              <Text color='black50' children={description} />
            </Box>
          </Column>
        ))}
      </Row>
    ))}
  </Flex>
)
