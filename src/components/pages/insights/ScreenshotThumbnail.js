import React from 'react'
import { Box, Flex, Image, Text } from 'components/elements'
import get from 'dlv'

const Thumbnail = ({ index, data, ...props }) => (
  <Flex
    flexDirection='column'
    alignItems='center'
    justifyContent='center'
    pl={[0, 0, index === 0 ? 0 : 5, index === 0 ? 0 : 5]}
    pt={[index === 0 ? 0 : 4, index === 0 ? 0 : 4, 0, 0]}
    {...props}
  >
    <Box border={1} borderColor='black20'>
      <Image height='88px' width='120px' src={data.data} />
    </Box>
    <Text
      color='gray7'
      fontSize={1}
      lineHeight={2}
      pt={3}
      children={data.timing_pretty}
    />
  </Flex>
)

export default ({ insights }) => (
  <>
    {get(insights, 'screenshot-thumbnails.details.items')
      .filter((item, index) => index % 2 === 0)
      .map((thumbnail, index) => (
        <Thumbnail index={index} data={thumbnail} key={index} />
      ))}
  </>
)
