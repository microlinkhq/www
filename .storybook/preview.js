import { ThemeProvider } from 'styled-components'
import { LocationProvider } from '@gatsbyjs/reach-router'

import Flex from 'components/elements/Flex'
import React from 'react'
import theme from 'theme'

import '@storybook/addon-console'

// Gatsby's Link overrides:
// Gatsby defines a global called ___loader to prevent its method calls from creating console errors you override it here
global.___loader = {
  enqueue: () => {},
  hovering: () => {}
}

// Gatsby internal mocking to prevent unnecessary errors in storybook testing environment
global.__BASE_PATH__ = '/'

// This is to utilized to override the window.___navigate method Gatsby defines and uses to report what path a Link would be taking us to if it wasn't inside a storybook
window.___navigate = pathname => {
  action('NavigateTo:')(pathname)
}

export const decorators = [
  Story => (
    <ThemeProvider theme={theme}>
      <LocationProvider>
        <Flex
          p={3}
          justiContent='center'
          alignItems='baseline'
          flexDirection='column'
        >
          <Story />
        </Flex>
      </LocationProvider>
    </ThemeProvider>
  )
]
