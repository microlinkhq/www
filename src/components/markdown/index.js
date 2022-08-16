import { withContainer, withTitle, withSlug } from 'helpers/hoc'
import { space, fontSizes, colors } from 'theme'
import styled, { css } from 'styled-components'
import { wordBreak } from 'helpers/style'
import Mdx from 'mdx-scoped-runtime'
import { mqlCode } from 'helpers'
import slug from 'remark-slug'
import React from 'react'

import get from 'dlv'

import {
  Terminal as TerminalBase,
  CodeEditor,
  MultiCodeEditor as MultiCodeEditorBase,
  Box,
  Flex,
  Text,
  Link as LinkBase,
  Label,
  Image as ImageBase,
  Video as VideoBase,
  Iframe as IframeBase,
  Button,
  Tweet as TweetBase,
  Color,
  PriceMonthly as PriceMonthlyBase
} from 'components/elements'

import MicrolinkBase from '../patterns/Microlink/Microlink'
import DemoIntegrations from './DemoIntegrations'
import Heading from '../elements/Heading'
import { layout } from '../../theme'

const { Container, CONTAINER_SPACE } = withContainer

const Link = styled(LinkBase)``

Link.defaultProps = {
  icon: true
}

export { Label, Link }

export const Microlink = withContainer(MicrolinkBase)

export const Terminal = withContainer(props => (
  <TerminalBase mx='auto' {...props} />
))

export const Code = withContainer(props => (
  <CodeEditor interactive mx='auto' {...props} />
))

export const MultiCodeEditor = withContainer(
  props => <MultiCodeEditorBase width='inherit' mx='auto' {...props} />,
  {
    width: CodeEditor.width
  }
)

export const H1 = withTitle(withSlug(styled(Heading)``))

H1.defaultProps = {
  maxWidth: layout.small,
  as: 'h1',
  fontSize: `calc(${fontSizes[5]} * 0.75)`,
  lineHeight: [1, 2],
  textAlign: 'left',
  variant: null,
  ml: 'auto',
  mr: 'auto',
  mt: 5,
  mb: 4
}

const H2Base = styled(Heading)``

H2Base.defaultProps = {
  ml: 'auto',
  mr: 'auto',
  maxWidth: layout.small,
  as: 'h2',
  fontSize: `calc(${fontSizes[4]} * 0.75)`,
  lineHeight: [1, 2],
  textAlign: 'left',
  variant: null,
  mt: 5,
  mb: 4
}

export const H2 = withTitle(withSlug(H2Base))

export const H3 = withTitle(withSlug(styled(Heading)``))

H3.defaultProps = {
  ml: 'auto',
  mr: 'auto',
  maxWidth: layout.small,
  as: 'h3',
  fontSize: `calc(${fontSizes[4]} * 0.75 * 0.75)`,
  lineHeight: 1,
  textAlign: 'left',
  variant: null,
  mt: 5,
  mb: 4
}

export const H4 = withTitle(withSlug(styled(Heading)``))

H4.defaultProps = {
  ml: 'auto',
  mr: 'auto',
  maxWidth: layout.small,
  as: 'h4',
  fontSize: 2,
  lineHeight: 1,
  textAlign: 'left',
  variant: null,
  mt: 4,
  mb: 3
}

export const H5 = withTitle(withSlug(styled(Heading)``))

H5.defaultProps = {
  ml: 'auto',
  mr: 'auto',
  maxWidth: layout.small,
  as: 'h5',
  fontSize: 1,
  lineHeight: 1,
  textAlign: 'left',
  variant: null,
  mt: 4,
  mb: 3
}

export const H6 = withTitle(withSlug(styled(Heading)``))

H6.defaultProps = {
  ml: 'auto',
  mr: 'auto',
  maxWidth: layout.small,
  as: 'h6',
  fontSize: 1,
  color: 'gray9',
  lineHeight: 1,
  textAlign: 'left',
  variant: null,
  mt: 4,
  mb: 3
}

export const Paraph = props => {
  const isMedia =
    get(props, 'children.props.props.src') ||
    get(props, 'children.props.props.href')
  const maxWidth = isMedia ? layout.large : layout.small
  return <Text maxWidth={maxWidth} {...props} />
}

Paraph.defaultProps = {
  as: 'div',
  ml: 'auto',
  mr: 'auto',
  ...CONTAINER_SPACE
}

export const Strong = styled(Text)``

Strong.defaultProps = {
  as: 'b',
  display: 'inline',
  fontWeight: 'bold'
}

export const Ul = styled(Text)``

Ul.defaultProps = {
  ml: 'auto',
  mr: 'auto',
  as: 'ul',
  maxWidth: layout.small,
  ...CONTAINER_SPACE
}

export const Ol = styled(Ul)``

Ol.defaultProps = {
  as: 'ol'
}

export const Li = styled(Text)``

Li.defaultProps = {
  ml: 'auto',
  mr: 'auto',
  mb: 3,
  as: 'li',
  maxWidth: layout.small
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
  ${wordBreak};
  display: inline;
  padding: 0 4px;

  &::before,
  &::after {
    content: '\`';
  }
`

CodeInline.defaultProps = {
  as: 'code'
}

const mediaStyle = {
  borderRadius: '3px',
  ml: 'auto',
  mr: 'auto',
  textAlign: 'center'
}

const _ImageBase = styled(ImageBase.Component)``

_ImageBase.defaultProps = {
  decoding: 'async',
  loading: 'lazy',
  ...mediaStyle
}

export const Image = withContainer(_ImageBase, {
  maxWidth: 'inherit'
})

const _VideoBase = styled(VideoBase)``

_VideoBase.defaultProps = {
  ...mediaStyle,
  width: '100%',
  autoPlay: true
}

export const Video = withContainer(_VideoBase)

const _IframeBase = styled(IframeBase)``

_IframeBase.defaultProps = {
  mx: 'auto',
  width: CodeEditor.width,
  height: CodeEditor.height
}

export const Iframe = withContainer(_IframeBase)

const FigcaptionBase = styled(Text)``

FigcaptionBase.defaultProps = {
  fontSize: 0,
  color: 'gray',
  textAlign: 'center'
}

export const Figcaption = withContainer(FigcaptionBase)

export const Tweet = props => (
  <Flex justifyContent='center'>
    <TweetBase {...props} />
  </Flex>
)

export const Blockquote = styled.blockquote`
  margin: auto;
  max-width: ${layout.small};
  border-left: 3px solid ${colors.black};
  padding-left: ${space[3]};
  font-style: italic;
  color: ${colors.gray8};
`

const Type = styled(Text)`
  padding: 0.2em 0.4em;
  margin: 0;
  border-radius: 3px;
`

Type.defaultProps = {
  as: 'span',
  bg: 'gray1',
  color: 'gray7',
  fontFamily: 'mono',
  fontSize: 0,
  fontWeight: 'regular'
}

const TypeContainer = styled(Box)`
  display: inline;
`

TypeContainer.defaultProps = {
  fontFamily: 'mono',
  fontSize: 0,
  color: 'gray7'
}

const PriceMonthly = props => (
  <Text
    as='span'
    css={`
      label {
        font-family: inherit;
        font-size: inherit;
      }
    `}
  >
    <PriceMonthlyBase {...props} />
  </Text>
)

const mdComponents = {
  a: Link,
  blockquote: Blockquote,
  button: Button,
  code: Code,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  iframe: Iframe,
  img: Image,
  inlineCode: CodeInline,
  li: Li,
  ol: Ol,
  p: Paraph,
  strong: Strong,
  ul: Ul,
  video: Video
}

const ScopedComponents = {
  mqlCode,
  Blockquote,
  Button,
  Code,
  CodeInline,
  Color,
  Container,
  DemoIntegrations,
  Figcaption,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  Iframe,
  Image,
  Label,
  Li,
  Link,
  Microlink,
  MultiCodeEditor,
  Ol,
  Paraph,
  PriceMonthly,
  Strong,
  Terminal,
  Tweet,
  Type,
  TypeContainer,
  Ul,
  Video
}

const Markdown = props => (
  <Mdx
    components={mdComponents}
    scope={ScopedComponents}
    mdPlugins={[slug]}
    {...props}
  />
)

export default Markdown
