import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { ServerLocation } from '@gatsbyjs/reach-router'
import { ThemeProvider } from 'styled-components'
import themeSpec from '../../src/theme'

export const renderMarkup = (element, { url = '/' } = {}) =>
  renderToStaticMarkup(
    <ServerLocation url={url}>
      <ThemeProvider theme={themeSpec}>{element}</ThemeProvider>
    </ServerLocation>
  )
