import { LocationProvider } from '@gatsbyjs/reach-router'
import { ThemeProvider } from 'styled-components'
import Flex from 'components/elements/Flex'
import themeSpec from 'theme'
import React from 'react'

global.___loader = {
  enqueue: () => {},
  hovering: () => {}
}

global.__BASE_PATH__ = '/'

window.___navigate = pathname => {
  console.log('NavigateTo:', pathname)
}

export const decorators = [
  Story => (
    <ThemeProvider theme={themeSpec}>
      <LocationProvider>
        <Flex
          p={3}
          justifyContent='center'
          alignItems='baseline'
          flexDirection='column'
        >
          <Story />
        </Flex>
      </LocationProvider>
    </ThemeProvider>
  )
]
