import React from 'react'
import styled, { css } from 'styled-components'
import { createCssState } from 'helpers/style'
import { textGradient, colors, themeCss } from 'theme'
import { lighten } from 'polished'

import Box from '../Box'
import { LinkBase } from './base'

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

  /**
    * The text-decoration-thickness property does not work unless either
    * text-underline-offset is set to something other than auto or text-decoration-color
    * is set to something other than currentColor.
    * Related:
    *  - https://crbug.com/1154537
    *  - https://caniuse.com/?search=text-decoration-thickness
  */
  text-underline-offset: 2px;
  text-decoration-thickness: 1px;
`

const LinkSolidWrapper = styled(LinkBase)`
  ${style};
  ${hoverStyle};

  &:hover {
    svg {
      stroke: #8c1bab;
    }
  }

  .active {
    text-decoration: inherit;
  }
`

LinkSolidWrapper.defaultProps = {
  fontWeight: 'regular'
}

const LinkSolid = props => {
  return (
    <Box display='inline'>
      <LinkSolidWrapper css={themeCss({ fontWeight: 'regular' })} {...props} />
    </Box>
  )
}

export default LinkSolid
