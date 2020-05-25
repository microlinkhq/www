import React, { useState } from 'react'
import { Terminal, MultiCodeEditor, Card, Flex } from 'components/elements'

import languages, { tabs } from './languages'

const TABS = Object.keys(tabs)

export default props => {
  const [view, setView] = useState(TABS[0])

  return (
    <Flex
      mt={3}
      flexDirection='column'
      justifyContent='space-around'
      {...props}
    >
      <Flex flexDirection='column' mb={[4, 0]}>
        <MultiCodeEditor height={Terminal.height} languages={languages(view)} />
        <Flex justifyContent='flex-end'>
          {TABS.map(tab => (
            <Card.Option
              key={tab}
              children={tab}
              value={view}
              onClick={() => setView(tab)}
            />
          ))}
        </Flex>
      </Flex>
    </Flex>
  )
}
