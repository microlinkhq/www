import React from 'react'
import { Link, Text, Flex, Image, Box } from 'components/elements'

export default ({ data, ...props }) => (
  <Flex {...props}>
    <Image width='40px' src={data.logo} />
    <Box pl={3}>
      <Link icon href={data.url} children={data.name} />
      <Text color='gray7' children={data.categories.join(', ')} />
    </Box>
  </Flex>
)
