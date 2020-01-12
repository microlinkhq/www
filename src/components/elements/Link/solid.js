import React from 'react'
import styled, { css } from 'styled-components'
import { colors, transition } from 'theme'
import { createCssState } from 'helpers/style'

import Box from '../Box'
import Link from './base'

const hoverStyle = createCssState({
  selector: '&:hover:not([disabled])',
  state: 'hover',
  css: css`
    border-color: currentColor;
    color: ${({ isDark }) => (isDark ? colors.white80 : colors.black80)};
  `
})

const style = css`
  text-decoration: none;
  outline: 0;
  opacity: 0.75;
  display: inline-block;
  border-bottom: 2px solid
    ${({ isDark }) =>
      isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  color: ${({ isDark }) => (isDark ? colors.white80 : colors.black80)};
  transition: border-color ${transition.medium};
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
