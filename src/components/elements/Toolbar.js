import styled from 'styled-components'
import { layout } from 'theme'
import React from 'react'

import Flex from './Flex'

export const TOOLBAR_PRIMARY_HEIGHT = '64px'
export const TOOLBAR_SECONDARY_HEIGHT = '32px'
export const TOOLBAR_HEIGHT = `calc(${TOOLBAR_PRIMARY_HEIGHT} + ${TOOLBAR_SECONDARY_HEIGHT})`

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
  px: 0,
  pt: 3,
  pb: 3
}

const secondaryProps = {
  justifyContent: 'center',
  pt: 0
}

const Toolbar = ({ type = 'primary', ...props }) => {
  const isSecondary = type !== 'primary'

  return (
    <ToolbarBase
      height={isSecondary ? TOOLBAR_SECONDARY_HEIGHT : TOOLBAR_PRIMARY_HEIGHT}
      {...(isSecondary ? secondaryProps : {})}
      {...props}
    />
  )
}

export default Toolbar
