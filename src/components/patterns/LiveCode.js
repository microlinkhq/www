import styled, { css } from 'styled-components'
import {
  LiveProvider as LiveProviderBase,
  LiveEditor as LiveEditorBase,
  LivePreview as LivePreviewBase
} from 'react-live'

import { lineHeights, fontSizes, fonts, colors } from 'theme'
import {
  width,
  space,
  fontSize,
  color,
  flex,
  order,
  alignSelf,
  alignContent,
  justifyContent,
  flexDirection,
  alignItems,
  flexWrap,
  maxWidth,
  lineHeight
} from 'styled-system'

const prismStyle = css`
  .token.comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: ${colors.gray5};
  }
  .token.punctuation {
    color: ${colors.black};
  }
  .token.property,
  .token.tag,
  .token.boolean,
  .token.number,
  .token.constant,
  .token.symbol {
    color: ${colors.secondary};
  }
  .token.selector,
  .token.attr-name,
  .token.string,
  .token.char,
  .token.builtin,
  .token.inserted {
    color: ${colors.purple5};
  }
  .token.atrule,
  .token.attr-value,
  .token.keyword {
    color: ${colors.secondary};
  }
  .token.regex,
  .token.important {
    color: ${colors.red5};
  }
  .token.important,
  .token.bold {
    font-weight: bold;
  }
  .token.italic {
    font-style: italic;
  }
  .token.entity {
    cursor: help;
  }
  .token.deleted {
    color: red;
  }
`

export const LiveProvider = styled(LiveProviderBase)(
  {
    boxSizing: 'border-box',
    display: 'flex'
  },
  width,
  space,
  fontSize,
  color,
  flex,
  order,
  alignSelf,
  alignContent,
  justifyContent,
  flexDirection,
  alignItems,
  flexWrap,
  maxWidth,
  lineHeight
)

LiveProvider.propTypes = {
  ...LiveProviderBase.propTypes,
  ...width.propTypes,
  ...space.propTypes,
  ...fontSize.propTypes,
  ...color.propTypes,
  ...flex.propTypes,
  ...order.propTypes,
  ...alignSelf.propTypes,
  ...alignContent.propTypes,
  ...justifyContent.propTypes,
  ...flexDirection.propTypes,
  ...alignItems.propTypes,
  ...flexWrap.propTypes,
  ...maxWidth.propTypes,
  ...lineHeight.propTypes
}

LiveProvider.defaultProps = {
  ...LiveProviderBase.defaultProps,
  mountStylesheet: false
}

export const LiveEditor = styled(LiveEditorBase)`
  height: 100%;
  margin: 0;
  box-sizing: border-box;
  font-family: ${fonts.monospace};
  font-size: ${fontSizes[1]}px;
  line-height: ${lineHeights[3]};
  overflow: auto;
  outline: none;
  tab-size: 2;
  color: #654ea3;
  background-color: ${colors.white};
  ${prismStyle};
`

export const LivePreview = LivePreviewBase
