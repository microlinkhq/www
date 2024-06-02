import { storiesOf } from '@storybook/react'
import { Story } from 'story'
import React from 'react'

import { Video, Flex } from 'components/elements'

const storyName = 'Video'

const videoUrl = 'https://i.imgur.com/Az4FXS8.mp4'

const code = `
import { Image } from 'components/elements'

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
