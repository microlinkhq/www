import { addDecorator } from '@storybook/react'
import { configure } from '@storybook/react'
import { withOptions } from '@storybook/addon-options'
import { ThemeProvider } from 'styled-components'
import React, { useState } from 'react'

import theme from 'theme'
import Flex from 'components/elements/Flex'
import Box from 'components/elements/Box'
import XRay from 'react-x-ray'

import '@storybook/addon-console'

// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /.stories.jsx?$/)

function loadStories () {
  req.keys().forEach(filename => req(filename))
}

// Gatsby's Link overrides:
// Gatsby defines a global called ___loader to prevent its method calls from creating console errors you override it here
global.___loader = {
  enqueue: () => {},
  hovering: () => {}
}

// Gatsby internal mocking to prevent unnecessary errors in storybook testing environment
global.__PATH_PREFIX__ = ''

// This is to utilized to override the window.___navigate method Gatsby defines and uses to report what path a Link would be taking us to if it wasn't inside a storybook
window.___navigate = pathname => {
  action('NavigateTo:')(pathname)
}

addDecorator(
  withOptions({
    name: 'design.microlink.io',
    url: 'https://github.com/microlinkhq/www',
    goFullScreen: false,
    showStoriesPanel: true,
    showAddonPanel: true,
    showSearchBox: false,
    sortStoriesByKind: true,
    enableShortcuts: false // true by default
  })
)

addDecorator(story => <ThemeProvider theme={theme}>{story()}</ThemeProvider>)

const DebugDecorator = props => {
  const [isDebug, setDebug] = useState(false)
  const Wrapper = isDebug ? XRay : Box
  const buttonText = isDebug ? 'Disable Debug' : 'Enable Debug'

  return (
    <Box>
      <Box pb={2}>
        <button onClick={() => setDebug(!isDebug)}>{buttonText}</button>
      </Box>

      <Wrapper>
        <Flex
          p={5}
          justiContent='center'
          alignItems='baseline'
          flexDirection='column'
        >
          {props.story()}
        </Flex>
      </Wrapper>
    </Box>
  )
}

addDecorator(story => <DebugDecorator story={story} />)

configure(loadStories, module)
