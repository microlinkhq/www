import React, { Component } from 'react'
import { Terminal, MultiCodeEditor, Card, Flex } from 'components/elements'

import languages, { tabs } from './languages'

const TABS = Object.keys(tabs)

export default class extends Component {
  state = { view: TABS[0] }

  render () {
    const { view } = this.state

    return (
      <Flex mt={3} flexDirection='column' justifyContent='space-around'>
        <Flex flexDirection='column' mb={[4, 0]}>
          <MultiCodeEditor
            height={Terminal.height}
            languages={languages(view)}
          />
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
