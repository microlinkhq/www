import styled, { css } from 'styled-components'
import { createCssState } from 'helpers/style'
import { colors, transition, lineHeights } from 'theme'
import { lighten } from 'polished'

import Text from '../Text'

const style = css`
  cursor: pointer;
  text-decoration: none;
  outline: 0;
  transition: border-color ${transition.short};
  line-height: ${lineHeights[2]};
`

const hoverStyle = createCssState({
  selector: '&:hover:not([disabled])',
  state: 'hover',
  css: css`
    opacity: 0.8;
    color: ${lighten(0.1, colors.link)};
  `
})

const Link = styled(Text)`
  ${style};
  ${hoverStyle};
`

Link.defaultProps = {
  ...Text.defaultProps,
  as: 'span',
  fontSize: 'inherit',
  color: 'link'
}

export default Link
