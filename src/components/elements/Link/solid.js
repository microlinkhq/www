import React from 'react'
import styled, { css } from 'styled-components'
import { createCssState } from 'helpers/style'
import { textGradient, colors } from 'theme'
import { lighten } from 'polished'

import Box from '../Box'
import Link from './base'

const hoverStyle = createCssState({
  selector: '&:hover:not([disabled])',
  state: 'hover',
  css: css`
    ${textGradient};
    opacity: 1;
  `
})

const style = css`
  outline: 0;
  opacity: 0.65;
  display: inline-block;
  color: ${({ isDark }) => (isDark ? colors.white80 : colors.black80)};
  text-decoration: underline;
  text-decoration-color: ${({ isDark }) =>
    lighten(0.8, isDark ? colors.white80 : colors.black80)};
  text-underline-offset: 2px;
`

const LinkSolid = styled(Link)`
  ${style};
  ${hoverStyle};

  .active {
    text-decoration: inherit;
  }
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
