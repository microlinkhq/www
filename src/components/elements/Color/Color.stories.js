import { storiesOf } from '@storybook/react'
import { Text, Color } from 'components/elements'
import { Story } from 'story'
import React from 'react'

const code = `
import { Color, Text } from 'components/elements'

export default () => (
  <Text>
      The color <Color>red</Color> is my favorite
  </Text>
  <Text>
    The color <Color>#f0f</Color> is my favorite
  </Text>
  <Text>
    The color <Color>rgba(136, 153, 166, 0.5)</Color> is my favorite
  </Text>
  <Text>
    The color <Color>rgb(21, 20, 26)</Color> is my favorite
  </Text>
)
`

storiesOf('Elements', module).add('Color', () => (
  <Story name='Color' code={code}>
    <Text>
      The color <Color>red</Color> is my favorite
    </Text>
    <Text>
      The color <Color>#f0f</Color> is my favorite
    </Text>
    <Text>
      The color <Color>rgba(136, 153, 166, 0.5)</Color> is my favorite
    </Text>
    <Text>
      The color <Color>rgb(21, 20, 26)</Color> is my favorite
    </Text>
  </Story>
))
