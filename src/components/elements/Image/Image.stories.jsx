import { Story } from 'story'
import { theme } from 'theme'
import React from 'react'

import Image from './Image'
import Flex from '../Flex'

const storyName = 'Image'

const imageUrl = 'https://cdn.microlink.io/file-examples/sample-big.jpg'

const code = `
import Image from './Image'

export default () => (
  <Image alt='example image' src='${imageUrl}' />
)
`

const ImageStory = () => {
  return (
    <Story name={storyName} code={code}>
      <Flex css={theme({ flexDirection: 'row', justifyContent: 'center' })}>
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

export default { title: 'Elements/Image' }

export const Default = () => <ImageStory />
