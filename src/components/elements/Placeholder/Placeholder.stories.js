import { storiesOf } from '@storybook/react'
import { theme } from 'theme'
import { Story } from 'story'
import React from 'react'

import { Placeholder, Flex } from 'components/elements'

import { aspectRatio } from 'helpers'

const storyName = 'Placeholder'

const code = `
import { Placeholder } from 'components/elements'

export default () => (
  <Placeholder />
)
`
const PlaceholderStory = () => {
  return (
    <Story name={storyName} code={code}>
      <Flex css={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Placeholder
          css={theme({
            width: aspectRatio.width,
            height: aspectRatio.height
          })}
        />
      </Flex>
    </Story>
  )
}

storiesOf('Elements', module).add(storyName, () => <PlaceholderStory />)
