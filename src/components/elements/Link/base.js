import styled, { css } from 'styled-components'
import { createCssState } from 'helpers/style'
import { colors, transition, lineHeights } from 'theme'
import { lighten } from 'polished'

import Text from '../Text'

const style = css`
  cursor: pointer;
  text-decoration: none;
  outline: 0;
  transition: color ${transition.medium};
  line-height: ${lineHeights[2]};
`

const hoverStyle = createCssState({
  selector: '&:hover:not([disabled])',
  state: 'hover',
  css: css`
    color: ${lighten(0.15, colors.link)};
  `
})

const Link = styled(Text)`
  ${style};
  ${hoverStyle};
`

Link.defaultProps = {
  as: 'span',
  fontSize: 'inherit',
  color: 'link'
}

export default Link
