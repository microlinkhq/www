import React from 'react'
import { Link, Text, Flex, Image, Box } from 'components/elements'
import { proxyImage } from 'helpers'

export default ({ data, ...props }) => (
  <Flex {...props}>
    <Box>
      <Image width='40px' src={proxyImage(data.logo)} />
    </Box>
    <Box pl={3}>
      <Link icon href={data.url} children={data.name} />
      <Text color='gray7' children={data.categories.join(', ')} />
    </Box>
  </Flex>
)
