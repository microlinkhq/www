import { LocationProvider } from '@gatsbyjs/reach-router'
import { ThemeProvider } from 'styled-components'
import Flex from 'components/elements/Flex'
import themeSpec, { theme } from 'theme'
import React from 'react'

global.___loader = {
  enqueue: () => {},
  hovering: () => {}
}

global.__BASE_PATH__ = '/'

window.___navigate = pathname => {
  action('NavigateTo:')(pathname)
}

export const decorators = [
  Story => (
    <ThemeProvider theme={themeSpec}>
      <LocationProvider>
        <Flex
          css={theme({
            p: 3,
            justifyContent: 'center',
            alignItems: 'baseline',
            flexDirection: 'column'
          })}
        >
          <Story />
        </Flex>
      </LocationProvider>
    </ThemeProvider>
  )
]
