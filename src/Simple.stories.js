import React from 'react'
// Importing from barrel file causes issues
// import { Box } from 'components/elements'
import Box from 'components/elements/Box'

const SimpleComponent = () => {
  return (
    <Box css={{ backgroundColor: 'red' }}>
      <h1>hello world</h1>
    </Box>
  )
}

export default {
  component: SimpleComponent
}

export const someStory = {}
