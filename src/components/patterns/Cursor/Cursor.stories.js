import { Subhead } from 'components/elements'
import { Cursor } from 'components/patterns'
import { storiesOf } from '@storybook/react'
import { Story } from 'story'
import React from 'react'

const storyName = 'Cursor'

const code = `
import { Subhead } from 'components/elements'
import { Cursor } from 'components/patterns'

export default () => (
  <Fragment>
    <Cursor color='white' bg='#3e55ff' text='/screenshots'>
      <Subhead>Hover on me</Subhead>
    </Cursor>
  </Fragment>
)`

const CursorStory = () => {
  return (
    <Story name={storyName} code={code}>
      <Cursor color='white' bg='#3e55ff' text='/screenshots'>
        <Subhead px={5} border='1px solid black'>
          Hover on me
        </Subhead>
      </Cursor>
    </Story>
  )
}

storiesOf('Patterns', module).add(storyName, () => <CursorStory />)
