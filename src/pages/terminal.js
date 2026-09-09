import React from 'react'
import { ThemeProvider } from 'styled-components'

import Meta from 'components/elements/Meta/Meta'
import Fullscreen from 'components/pages/cli/fullscreen'
import themeSpec from 'theme'

import 'styles/main.scss'

export const Head = () => (
  <Meta
    title='Terminal'
    description='Run the Microlink CLI in your browser. Pass any URL or product subcommand and inspect pretty JSON, cache status, and timing. Share the URL to replay the command.'
  />
)

const TerminalPage = () => (
  <ThemeProvider theme={themeSpec}>
    <Fullscreen />
  </ThemeProvider>
)

export default TerminalPage
