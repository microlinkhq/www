import { storiesOf } from '@storybook/react'
import { Story } from 'story'
import React from 'react'

import { Image, Flex } from 'components/elements'

const storyName = 'Image'

const imageUrl =
  'http://www.effigis.com/wp-content/uploads/2015/02/DigitalGlobe_WorldView1_50cm_8bit_BW_DRA_Bangkok_Thailand_2009JAN06_8bits_sub_r_1.jpg'

const code = `
import { Image } from 'components/elements'

export default () => (
  <Image alt='example image' src='${imageUrl}' />
)
`

const ImageStory = () => {
  return (
    <Story name={storyName} code={code}>
      <Flex flexDirection='row' justifyContent='center'>
        <Image width='350px' height='350px' src={imageUrl} />
      </Flex>
    </Story>
  )
}

storiesOf('Elements', module).add(storyName, () => <ImageStory />)
