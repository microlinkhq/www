import React from 'react'
import { Link, Text, Flex, Image, Box } from 'components/elements'
import chunk from 'lodash/chunk'
import { proxyImage } from 'helpers'

const Wappalyzer = ({ data, ...props }) => (
  <Flex flexDirection='row' alignItems='center' {...props}>
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
      const pt = chunkIndex === 0 ? 0 : 4
      return (
        <Flex
          flexDirection={['column', 'column', 'row', 'row']}
          key={`technologies_chunk_${chunkIndex}`}
          pt={[0, 0, pt, pt]}
          width='100%'
        >
          <Box mx='auto' width='256px'>
            {row.map((data, dataIndex) => {
              const pt = dataIndex === 0 && chunkIndex === 0 ? 0 : 4
              return (
                <Wappalyzer pt={[pt, pt, 0, 0]} key={data.name} data={data} />
              )
            })}
          </Box>
        </Flex>
      )
    })}
  </>
)
