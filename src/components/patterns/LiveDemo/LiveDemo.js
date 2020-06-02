import React, { useState } from 'react'
import { Card, Flex } from 'components/elements'
import Preview from './preview'

export default ({ children, loading }) => {
  const [view, setView] = useState('preview')

  return (
    <Flex flexDirection='column' justifyContent='space-around'>
      <Flex flexDirection='column' mb={[4, 0]}>
        <Card>
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
