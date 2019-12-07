import React, { useState } from 'react'

import { CodeEditor, Card, Flex } from 'components/elements'
import Preview from './preview'

const { COLORS } = CodeEditor

export default ({ children, loading }) => {
  const [view, setView] = useState('preview')
  const isSDK = view === 'preview'

  return (
    <Flex flexDirection='column' justifyContent='space-around'>
      <Flex flexDirection='column' mb={[4, 0]}>
        <Card
          px={isSDK ? 0 : 3}
          py={isSDK ? 0 : 3}
          style={{
            background: isSDK ? '#fff' : COLORS.BACKGROUND,
            padding: 0,
            overflow: isSDK ? 'hidden' : 'auto'
          }}
        >
          <Preview loading={loading} view={view} children={children} />
        </Card>
        <Flex as='footer' justifyContent='flex-end'>
          <Card.Option
            children='preview'
            value={view}
            onClick={() => setView('preview')}
          />
          <Card.Option
            children='json'
            value={view}
            onClick={() => setView('json')}
          />
          <Card.Option
            children='code'
            value={view}
            onClick={() => setView('code')}
          />
        </Flex>
      </Flex>
    </Flex>
  )
}
