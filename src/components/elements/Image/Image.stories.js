import { storiesOf } from '@storybook/react'
import { Story } from 'story'
import React, { useState } from 'react'

import { Flex, Box, ButtonOutline } from 'components/elements'

import LazyImage from './LazyImage'

const storyName = 'Image'

const imageUrl =
  'http://www.effigis.com/wp-content/uploads/2015/02/DigitalGlobe_WorldView1_50cm_8bit_BW_DRA_Bangkok_Thailand_2009JAN06_8bits_sub_r_1.jpg'

const code = `
import { Image } from 'components/elements'

export default () => (
  <Image src='${imageUrl}' />
)
`

const WIDTH = 800
const HEIGHT = 600

const ImageStory = () => {
  const [loading, setLoading] = useState(undefined)

  return (
    <Story name={storyName} code={code}>
      <Flex flexDirection='column' justifyContent='center'>
        <Box mb={3}>
          <ButtonOutline onClick={() => setLoading(undefined)}>
            auto
          </ButtonOutline>
          <ButtonOutline ml={3} onClick={() => setLoading(true)}>
            loading
          </ButtonOutline>
          <ButtonOutline ml={3} onClick={() => setLoading(false)}>
            loaded
          </ButtonOutline>
        </Box>
        <LazyImage
          width={WIDTH}
          height={HEIGHT}
          src={imageUrl}
          loading={loading}
        />
      </Flex>
    </Story>
  )
}

storiesOf('Elements', module).add(storyName, () => <ImageStory />)
