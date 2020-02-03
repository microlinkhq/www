import React from 'react'
import styled, { css } from 'styled-components'
import { createCssState } from 'helpers/style'
import { gradient, colors } from 'theme'

import Box from '../Box'
import Link from './base'

const hoverStyle = createCssState({
  selector: '&:hover:not([disabled])',
  state: 'hover',
  css: css`
    color: ${({ isDark }) => (isDark ? colors.white80 : colors.black80)};
    border-image: ${gradient};
    border-image-slice: 1;
  `
})

const style = css`
  text-decoration: none;
  outline: 0;
  opacity: 0.75;
  display: inline-block;
  border-bottom-width: 2px;
  border-bottom-style: solid;
  border-color: ${({ isDark }) => (isDark ? colors.white10 : colors.black10)};
  color: ${({ isDark }) => (isDark ? colors.white80 : colors.black80)};
`

const LinkSolid = styled(Link)`
  ${style};
  ${hoverStyle};
`

LinkSolid.defaultProps = {
  fontWeight: 'bold'
}

export default ({ fontWeight, href, children, color, theme, ...props }) => {
  return (
    <Box display='inline'>
      <LinkSolid
        {...props}
        color={color}
        href={href}
        children={children}
        fontWeight={fontWeight}
        isDark={theme === 'dark'}
      />
    </Box>
  )
}
