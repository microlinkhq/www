import styled from 'styled-components'
import { layout } from 'theme'
import React from 'react'

import Flex from './Flex'

export const TOOLBAR_PRIMARY_HEIGHT = '64px'
export const TOOLBAR_SECONDARY_HEIGHT = '48px'

const ToolbarBase = styled(Flex)({
  overflowX: 'auto',
  overflowY: 'hidden'
})

ToolbarBase.defaultProps = {
  justifyContent: 'center',
  as: 'header',
  color: 'black60',
  mx: 'auto',
  alignItems: 'center',
  maxWidth: layout.large,
  px: 0
}

const secondaryProps = {
  justifyContent: 'center'
}

const Toolbar = ({ type = 'primary', ...props }) => {
  const isSecondary = type !== 'primary'

  return (
    <ToolbarBase
      data-toolbar={type}
      height={isSecondary ? TOOLBAR_SECONDARY_HEIGHT : TOOLBAR_PRIMARY_HEIGHT}
      {...(isSecondary ? secondaryProps : {})}
      {...props}
    />
  )
}

export default Toolbar
