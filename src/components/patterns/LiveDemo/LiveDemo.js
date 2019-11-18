import React, { useState } from 'react'

import { Card, Flex } from 'components/elements'
import Preview from './preview'

import {
  CARD_HEIGHT_DESKTOP,
  CARD_WIDTH_DESKTOP,
  CARD_WIDTH_MOBILE,
  CARD_HEIGHT_MOBILE
} from './theme'

export default ({ children, loading }) => {
  const [view, setView] = useState('preview')
  const isSDK = view === 'preview'

  return (
    <Flex flexDirection='column' justifyContent='space-around'>
      <Flex flexDirection='column' mb={[4, 0]}>
        <Card
          px={isSDK ? 0 : 3}
          py={isSDK ? 0 : 3}
          width={[CARD_WIDTH_MOBILE, CARD_WIDTH_DESKTOP]}
          height={[CARD_HEIGHT_MOBILE, CARD_HEIGHT_DESKTOP]}
          style={{
            background: '#282a36',
            padding: 0,
            overflow: isSDK ? 'hidden' : 'auto'
          }}
        >
          <Preview loading={loading} view={view} children={children} />
        </Card>
        <Flex justifyContent='flex-end'>
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
