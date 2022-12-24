import { Toolbar, Footer, CookiesPolicy } from 'components/patterns'
import React, { useEffect, createElement } from 'react'
import { Box, Flex, Hide } from 'components/elements'
import { ThemeProvider } from 'styled-components'
import { Location } from '@gatsbyjs/reach-router'
import Head from 'components/Head'
import { noop } from 'helpers'

import themeSpec from 'theme'
import 'styles/main.scss'

import {
  TOOLBAR_PRIMARY_HEIGHT,
  TOOLBAR_SECONDARY_HEIGHT
} from 'components/elements/Toolbar'

const Layout = ({
  toolbar,
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
              css={`
                overflow-x: hidden;
                min-height: 100vh;
              `}
            >
              <Head location={location} {...props} />
              <Toolbar as='header' theme={theme} style={style} />
              {createElement(
                component,
                {
                  as: 'main',
                  justifyContent,
                  alignItems,
                  display,
                  flexDirection,
                  pt: toolbar.height,
                  style: { flex: 1 }
                },
                children
              )}
              <Hide breakpoints={[0]}>
                <CookiesPolicy className='hidden-print' />
              </Hide>
              {footer && (
                <Box as='footer' className='hidden-print'>
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

const LayoutResponsive = props => (
  <>
    <Hide breakpoints={[1, 2, 3]}>
      <Layout toolbar={{ height: TOOLBAR_PRIMARY_HEIGHT }} {...props} />
    </Hide>
    <Hide breakpoints={[0]}>
      <Layout
        toolbar={{
          height: `calc(${TOOLBAR_PRIMARY_HEIGHT} + ${TOOLBAR_SECONDARY_HEIGHT})`
        }}
        {...props}
      />
    </Hide>
  </>
)

export default LayoutResponsive
