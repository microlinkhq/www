import { Toolbar, Footer, CookiesPolicy } from 'components/patterns'
import { TOOLBAR_HEIGHT } from 'components/elements/Toolbar'
import { Box, Flex, Hide } from 'components/elements'
import { ThemeProvider } from 'styled-components'
import React, { useEffect, createElement } from 'react'
import { Location } from '@reach/router'
import Head from 'components/Head'
import noop from 'lodash/noop'

import themeSpec from 'theme'
import 'styles/main.scss'

const Layout = ({
  footer,
  children,
  onClick,
  style,
  theme,
  display,
  justifyContent,
  alignItems,
  flexDirection,
  component = Box,
  ...props
}) => {
  useEffect(() => {
    const slug = window.location.hash
    if (slug) {
      const el = document.querySelector(slug)
      if (el) el.scrollIntoView()
    }
  }, [])

  return (
    <ThemeProvider theme={themeSpec}>
      <Location>
        {({ location }) => {
          return (
            <Flex
              flexDirection='column'
              onClick={onClick}
              style={style}
              className={theme}
              css={`
                min-height: 100vh;
              `}
            >
              <Head location={location} {...props} />
              <Toolbar theme={theme} style={style} />
              {createElement(component, {
                justifyContent,
                alignItems,
                display,
                flexDirection,
                pt: TOOLBAR_HEIGHT,
                children,
                style: { flex: 1 }
              })}
              <Hide breakpoints={[0]}>
                <CookiesPolicy />
              </Hide>
              {footer && (
                <Box>
                  <Footer theme={theme} {...footer} />
                </Box>
              )}
            </Flex>
          )
        }}
      </Location>
    </ThemeProvider>
  )
}

Layout.defaultProps = {
  theme: 'light',
  footer: true,
  onClick: noop
}

export default Layout
