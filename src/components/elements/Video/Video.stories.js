import { storiesOf } from '@storybook/react'
import { Story } from 'story'
import React from 'react'

import Video from './Video'
import Flex from '../Flex'

const storyName = 'Video'

const videoUrl = '/images/Az4FXS8.mp4'

const code = `
import Image from '../Image/Image'

export default () => (
  <Video src='${videoUrl}' />
)
`

const VideoStory = () => {
  return (
    <Story name={storyName} code={code}>
      <Flex css={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Video css={{ width: '600px' }} src={videoUrl} />
      </Flex>
    </Story>
  )
}

storiesOf('Elements', module).add(storyName, () => <VideoStory />)
