import { textGradient, colors, theme } from 'theme'
import styled, { css } from 'styled-components'
import { lighten } from 'polished'
import React from 'react'
import { withAnalytics } from 'helpers/hoc/with-analytics'
import { withLink } from 'helpers/hoc/with-link'

import Box from '../Box'
import { LinkBase } from './base'

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

const LinkSolidWrapper = styled(LinkBase).withConfig({
  shouldForwardProp: prop => !['isDark'].includes(prop)
})`
  ${style};

  ${theme({
    _hover: {
      ...textGradient,
      opacity: 1
    }
  })}

  &:hover {
    svg {
      stroke: #8c1bab;
    }
  }

  .active {
    text-decoration: inherit;
  }
`

const LinkSolidComponent = props => {
  return (
    <Box css={{ display: 'inline' }}>
      <LinkSolidWrapper css={theme({ fontWeight: 'regular' })} {...props} />
    </Box>
  )
}

export const LinkSolid = withAnalytics(withLink(LinkSolidComponent))
export default LinkSolidComponent
