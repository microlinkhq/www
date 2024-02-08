import { defaultProps, layout, themeCss } from 'theme'
import { hideScrollbar } from 'helpers/style'
import styled from 'styled-components'
import React from 'react'

import Flex from './Flex'

export const TOOLBAR_PRIMARY_HEIGHT = '64px'
export const TOOLBAR_SECONDARY_HEIGHT = '48px'

const ToolbarBase = styled(Flex).attrs(defaultProps({ as: 'nav' }))`
  ${themeCss({
    justifyContent: 'center',
    color: 'black60',
    mx: 'auto',
    alignItems: 'center',
    maxWidth: layout.large,
    px: 0,
    'overflow-x': 'auto',
    'overflow-y': 'hidden'
  })})}
  ${hideScrollbar};
`

const secondaryProps = {
  justifyContent: 'center'
}

const Toolbar = ({ type = 'primary', ...props }) => {
  const isSecondary = type !== 'primary'

  return (
    <ToolbarBase
      data-toolbar={type}
      css={{
        height: isSecondary ? TOOLBAR_SECONDARY_HEIGHT : TOOLBAR_PRIMARY_HEIGHT,
        ...(isSecondary ? secondaryProps : {})
      }}
      {...props}
    />
  )
}

export default Toolbar
