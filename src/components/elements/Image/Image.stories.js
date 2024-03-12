import { storiesOf } from '@storybook/react'
import { Story } from 'story'
import React from 'react'

import { Image, Flex } from 'components/elements'

const storyName = 'Image'

const imageUrl = 'https://cdn.microlink.io/file-examples/sample-big.jpg'

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
        <Image
          alt='example image'
          css={{
            width: '350px',
            height: '350px'
          }}
          src={imageUrl}
        />
      </Flex>
    </Story>
  )
}

storiesOf('Elements', module).add(storyName, () => <ImageStory />)
