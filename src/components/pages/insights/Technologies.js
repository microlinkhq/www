import React from 'react'
import { Link, Text, Flex, Image, Box } from 'components/elements'
import chunk from 'lodash/chunk'
import { proxyImage } from 'helpers'

const Wappalyzer = ({ data, ...props }) => (
  <Flex width='256px' flexDirection='row' alignItems='center' {...props}>
    <Box>
      <Image width='40px' src={proxyImage(data.logo)} />
    </Box>
    <Box pl={3}>
      <Link icon href={data.url} children={data.name} />
      <Text color='gray7' children={data.categories.join(', ')} />
    </Box>
  </Flex>
)

export default ({ technologies }) => (
  <>
    {chunk(technologies, 3).map((row, chunkIndex) => {
      return (
        <Flex
          flexDirection={['column', 'column', 'row', 'row']}
          key={`technologies_chunk_${chunkIndex}`}
        >
          {row.map((data, dataIndex) => {
            const pt = dataIndex === 0 && chunkIndex === 0 ? 0 : 3
            return <Wappalyzer pt={pt} key={data.name} data={data} />
          })}
        </Flex>
      )
    })}
  </>
)
