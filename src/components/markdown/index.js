import { space, fontSizes, colors } from 'theme'
import styled, { css } from 'styled-components'
import { withSlug } from 'helpers/hoc'
import MDX from 'mdx-scoped-runtime'
import slug from 'remark-slug'
import { get } from 'lodash'
import React from 'react'

import {
  Terminal as TerminalBase,
  CodeEditor,
  MultiCodeEditor as MultiCodeEditorBase,
  Box,
  Heading,
  Text,
  Link as LinkBase,
  Label,
  Image as ImageBase
} from 'components/elements'

import { Microlink as MicrolinkBase } from 'components/patterns'
import { textHoverGradient } from '../../theme'

const SPECIAL_COMPONENTS = ['Terminal', 'CodeEditor']

const LAYOUT_WIDTH = 650

const WIDTH = {
  normal: LAYOUT_WIDTH,
  large: LAYOUT_WIDTH * 1.2
}

const CONTAINER_SPACE = {
  mt: 3,
  mb: 4
}

const Link = styled(LinkBase)([])

Link.defaultProps = {
  icon: true
}

const withContainer = (ChildComponent, containerProps = {}) => props => (
  <Box
    maxWidth={['100%', WIDTH.normal]}
    mr='auto'
    ml='auto'
    {...CONTAINER_SPACE}
    {...containerProps}
  >
    <ChildComponent {...props} />
  </Box>
)

export { Label, Link }

export const Microlink = withContainer(MicrolinkBase)

export const Terminal = withContainer(TerminalBase)

export const MultiCodeEditor = withContainer(MultiCodeEditorBase)

export const H1 = withSlug(styled(Heading)([]))

H1.defaultProps = {
  maxWidth: WIDTH.normal,
  as: 'h1',
  fontSize: [`calc(${fontSizes[5]} * 0.75px)`, 5],
  lineHeight: [2, 3],
  textAlign: 'left',
  variant: null,
  mt: 5,
  mb: 4
}

const H2Base = styled(Heading)([])

H2Base.defaultProps = {
  ml: 'auto',
  mr: 'auto',
  maxWidth: WIDTH.normal,
  as: 'h2',
  fontSize: [`calc(${fontSizes[4]} * 0.75px)`, 4],
  lineHeight: [2, 3],
  textAlign: 'left',
  variant: null,
  mt: 5,
  mb: 4
}

export const H2Link = styled(H2Base)`
  text-decoration: none;
  cursor: pointer;
  color: black;
  transition: all 0.1s ease-out;
  ${textHoverGradient}
`

H2Link.defaultProps = {
  as: 'a'
}

export const H2 = withSlug(H2Base)

export const H3 = withSlug(styled(Heading)([]))

H3.defaultProps = {
  ml: 'auto',
  mr: 'auto',
  maxWidth: WIDTH.normal,
  as: 'h3',
  fontSize: 3,
  lineHeight: 2,
  textAlign: 'left',
  variant: null,
  mt: 5,
  mb: 4
}

export const H4 = withSlug(styled(Heading)([]))

H4.defaultProps = {
  ml: 'auto',
  mr: 'auto',
  maxWidth: WIDTH.normal,
  as: 'h4',
  fontSize: 2,
  lineHeight: 2,
  textAlign: 'left',
  variant: null,
  mt: 5,
  mb: 4
}

export const H5 = withSlug(styled(Heading)([]))

H5.defaultProps = {
  ml: 'auto',
  mr: 'auto',
  maxWidth: WIDTH.normal,
  as: 'h5',
  fontSize: 1,
  lineHeight: 2,
  textAlign: 'left',
  variant: null,
  mt: 4,
  mb: 2
}

export const H6 = withSlug(styled(Heading)([]))

H6.defaultProps = {
  ml: 'auto',
  mr: 'auto',
  maxWidth: WIDTH.normal,
  as: 'h6',
  fontSize: 1,
  color: 'gray9',
  lineHeight: 2,
  textAlign: 'left',
  variant: null,
  mt: 4,
  mb: 2
}

export const Paraph = props => {
  const special =
    get(props, 'children.props.src') ||
    get(props, 'children.props.href') ||
    SPECIAL_COMPONENTS.includes(get(props, 'children.type.displayName'))
  const maxWidth = special ? WIDTH.large : WIDTH.normal
  return <Text maxWidth={maxWidth} {...props} />
}

Paraph.defaultProps = {
  as: 'div',
  ml: 'auto',
  mr: 'auto',
  ...CONTAINER_SPACE
}

export const Strong = styled(Text)([])

Strong.defaultProps = {
  as: 'b',
  display: 'inline',
  fontWeight: 'bold'
}

export const Ul = styled(Text)([])

Ul.defaultProps = {
  ml: 'auto',
  mr: 'auto',
  as: 'ul',
  maxWidth: WIDTH.normal,
  ...CONTAINER_SPACE
}

export const Ol = styled(Ul)([])

Ol.defaultProps = {
  as: 'ol'
}

export const Li = styled(Text)([])

Li.defaultProps = {
  ml: 'auto',
  mr: 'auto',
  mb: 2,
  as: 'li',
  maxWidth: WIDTH.normal
}

const codeStyle = css`
  color: ${({ theme }) => theme.colors.pink7};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: 90% !important;
  text-shadow: rgba(0, 0, 0, 0.05) 0px 1px;
`

export const CodeInline = styled(Text)`
  ${codeStyle};
  display: inline;
  padding: 0 4px;
  white-space: nowrap;

  &::before,
  &::after {
    content: '\`';
  }
`

CodeInline.defaultProps = {
  as: 'code'
}

const CodeWrapper = styled(Box)`
  ${codeStyle};
  overflow-x: auto;
`

export const Code = props => (
  <CodeWrapper
    maxWidth={['100%', WIDTH.normal]}
    ml='auto'
    mr='auto'
    {...CONTAINER_SPACE}
  >
    <CodeEditor {...props} />
  </CodeWrapper>
)

const _ImageBase = styled(ImageBase)([])

_ImageBase.defaultProps = {
  borderRadius: '3px',
  ml: 'auto',
  mr: 'auto',
  textAlign: 'center'
}

export const Image = withContainer(_ImageBase)

const FigcaptionBase = styled(Text)([])

FigcaptionBase.defaultProps = {
  fontSize: 0,
  color: 'gray',
  textAlign: 'center'
}

export const Figcaption = withContainer(FigcaptionBase)

export const Blockquote = styled.blockquote`
  margin: auto;
  max-width: ${WIDTH.normal}px;
  border-left: 3px solid ${colors.black};
  padding-left: ${space[3]}px;
  font-style: italic;
  color: ${colors.gray8};
`

const mdComponents = {
  p: Paraph,
  strong: Strong,
  ul: Ul,
  ol: Ol,
  li: Li,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  code: Code,
  inlineCode: CodeInline,
  a: Link,
  blockquote: Blockquote,
  img: Image
}

const ScopedComponents = {
  Blockquote,
  Code,
  CodeInline,
  Figcaption,
  H1,
  H2,
  H2Link,
  H3,
  H4,
  H5,
  H6,
  Image,
  Label,
  Li,
  Link,
  Microlink,
  MultiCodeEditor,
  Ol,
  Paraph,
  Strong,
  Terminal,
  Ul
}

export default props => (
  <MDX
    components={mdComponents}
    scope={ScopedComponents}
    mdPlugins={[slug]}
    {...props}
  />
)
