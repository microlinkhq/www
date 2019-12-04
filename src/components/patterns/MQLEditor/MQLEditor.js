import React, { Component } from 'react'
import { CodeEditor, MultiCodeEditor, Card, Flex } from 'components/elements'

import languages, { tabs } from './languages'

const TABS = Object.keys(tabs)

export default class extends Component {
  state = { view: TABS[0] }

  render () {
    const { view } = this.state

    return (
      <Flex
        mt={3}
        flexDirection='column'
        justifyContent='space-around'
        data-tilt
      >
        <Flex flexDirection='column' mb={[4, 0]}>
          <Card
            height={CodeEditor.height}
            width={CodeEditor.width}
            style={{ overflow: 'auto' }}
          >
            <MultiCodeEditor
              width='inherit'
              height='inherit'
              languages={languages(view)}
            />
          </Card>
          <Flex justifyContent='flex-end'>
            {TABS.map(tab => (
              <Card.Option
                key={tab}
                children={tab}
                value={view}
                onClick={() => this.setState({ view: tab })}
              />
            ))}
          </Flex>
        </Flex>
      </Flex>
    )
  }
}
