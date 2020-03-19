import React from 'react'
import { Link, Text, Flex, Image, Box } from 'components/elements'
import chunk from 'lodash/chunk'
import { proxyImage } from 'helpers'

const Wappalyzer = ({ data, ...props }) => (
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

export default ({ technologies }) => (
  <>
    {chunk(technologies, 3).map((row, chunkIndex) => {
      const pt = chunkIndex === 0 ? 0 : 4
      return (
        <Flex
          flexDirection={['column', 'column', 'row', 'row']}
          key={`technologies_chunk_${chunkIndex}`}
          pt={[0, 0, pt, pt]}
        >
          {row.map((data, dataIndex) => {
            const pt = dataIndex === 0 && chunkIndex === 0 ? 0 : 4
            return (
              <Wappalyzer
                pt={[pt, pt, 0, 0]}
                width={['100%', '100%', '512px', '512px']}
                key={data.name}
                data={data}
              />
            )
          })}
        </Flex>
      )
    })}
  </>
)
