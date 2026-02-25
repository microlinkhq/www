import { hideScrollbar } from 'helpers/style'
import styled from 'styled-components'
import { layout, theme } from 'theme'
import React from 'react'

import Flex from './Flex'

export const TOOLBAR_PRIMARY_MOBILE_HEIGHT = '44px'
export const TOOLBAR_PRIMARY_HEIGHT = '64px'
export const DOCS_NAVBAR_HEIGHT = '74px'

export const DOCS_LAYOUT_OFFSET = `calc(${TOOLBAR_PRIMARY_HEIGHT} + ${DOCS_NAVBAR_HEIGHT})`

const ToolbarBase = styled(Flex)`
  ${theme({
    justifyContent: 'center',
    color: 'black60',
    mx: 'auto',
    alignItems: 'center',
    maxWidth: layout.large,
    px: 0,
    'overflow-x': 'auto',
    'overflow-y': 'hidden'
  })}
  ${hideScrollbar};
`

const Toolbar = ({ type = 'primary', ...props }) => {
  return (
    <ToolbarBase
      data-toolbar={type}
      css={theme({
        height: [
          TOOLBAR_PRIMARY_MOBILE_HEIGHT,
          TOOLBAR_PRIMARY_HEIGHT,
          TOOLBAR_PRIMARY_HEIGHT,
          TOOLBAR_PRIMARY_HEIGHT
        ]
      })}
      {...props}
    />
  )
}

export default Toolbar
