import { withContainer, withTitle, withSlug } from 'helpers/hoc'
import { space, fontSizes, colors, theme } from 'theme'
import styled, { css } from 'styled-components'
import { wordBreak } from 'helpers/style'
import Mdx from 'mdx-scoped-runtime'
import { mqlCode } from 'helpers'
import slug from 'remark-slug'
import React from 'react'
import get from 'dlv'

import {
  Badge,
  Box,
  Button,
  CodeEditor,
  Color,
  Iframe as IframeBase,
  Image as ImageBase,
  Label,
  Link,
  MultiCodeEditor as MultiCodeEditorBase,
  PriceMonthly as PriceMonthlyBase,
  Terminal as TerminalBase,
  Text,
  Tooltip,
  Tweet,
  Video as VideoBase
} from 'components/elements'

import MicrolinkBase from '../patterns/Microlink/Microlink'
import DemoIntegrations from './DemoIntegrations'
import Heading from '../elements/Heading'
import { layout } from '../../theme'

const { Container, CONTAINER_SPACE } = withContainer

const ProBadge = ({ top, ...props }) => (
  <Tooltip
    css={theme({ display: 'inline', top: 0 })}
    content={
      <Tooltip.Content tabIndex='0'>
        You have to buy{' '}
        <Link
          css={{ display: 'inline-block' }}
          href='https://microlink.io#pricing'
        >
          pro
        </Link>{' '}
        plan to use this feature.
      </Tooltip.Content>
    }
    {...props}
  >
    <Badge>PRO</Badge>
  </Tooltip>
)

export { ProBadge, Tweet, Label, Link }

export const Microlink = withContainer(MicrolinkBase)

export const Terminal = withContainer(TerminalBase)

export const Code = withContainer(CodeEditor)

export const MultiCodeEditor = withContainer(MultiCodeEditorBase)

export const H1 = withTitle(
  withSlug(styled(Heading)`
    ${theme({
      maxWidth: layout.small,
      fontSize: `calc(${fontSizes[5]} * 0.75)`,
      lineHeight: [1, 2],
      textAlign: 'left',
      mt: 5,
      mb: 4
      mx: 'auto',
    })}
  `)
)

H1.defaultProps = {
  as: 'h1',
  variant: null
}

const H2Base = styled(Heading)`
  ${theme({
    mx: 'auto',
    maxWidth: layout.small,
    fontSize: `calc(${fontSizes[4]} * 0.75)`,
    lineHeight: [1, 2],
    textAlign: 'left',
    mt: 5,
    mb: 4
  })}
`

H2Base.defaultProps = {
  as: 'h2',
  variant: null
}

export const H2 = withTitle(withSlug(H2Base))

export const H3 = withTitle(
  withSlug(styled(Heading)`
    ${theme({
      mx: 'auto',
      maxWidth: layout.small,
      fontSize: `calc(${fontSizes[4]} * 0.75 * 0.75)`,
      lineHeight: 1,
      textAlign: 'left',
      mt: 5,
      mb: 4
    })}
  `)
)

H3.defaultProps = {
  as: 'h3',
  variant: null
}

export const H4 = withTitle(
  withSlug(styled(Heading)`
    ${theme({
      mx: 'auto',
      maxWidth: layout.small,
      fontSize: 2,
      lineHeight: 1,
      textAlign: 'left',
      mt: 4,
      mb: 3
    })}
  `)
)

H4.defaultProps = {
  as: 'h4',
  variant: null
}

export const H5 = withTitle(
  withSlug(styled(Heading)`
    ${theme({
      mx: 'auto',
      maxWidth: layout.small,
      fontSize: 1,
      lineHeight: 1,
      textAlign: 'left',
      mt: 4,
      mb: 3
    })}
  `)
)

H5.defaultProps = {
  as: 'h5',
  variant: null
}

export const H6 = withTitle(
  withSlug(styled(Heading)`
    ${theme({
      mx: 'auto',
      maxWidth: layout.small,
      fontSize: 1,
      color: 'gray9',
      lineHeight: 1,
      textAlign: 'left',
      mt: 4,
      mb: 3
    })}
  `)
)

H6.defaultProps = {
  as: 'h6',
  variant: null
}

export const Paraph = props => {
  const isMedia = get(props, 'children.props.name') === 'img'
  const maxWidth = isMedia ? layout.large : layout.small
  return (
    <Text
      as='div'
      css={theme({ mx: 'auto', ...CONTAINER_SPACE, maxWidth })}
      {...props}
    />
  )
}

export const Strong = styled(Text)`
  display: inline;
  font-weight: bold;
`

Strong.defaultProps = {
  as: 'b'
}

export const Ul = styled(Text)`
  max-width: ${layout.small};

  ${theme({
    mx: 'auto',
    ...CONTAINER_SPACE
  })}
`

Ul.defaultProps = {
  as: 'ul'
}

export const Ol = styled(Ul)``

Ol.defaultProps = {
  as: 'ol'
}

export const Li = styled(Text)`
  max-width: ${layout.small};

  ${theme({
    mx: 'auto',
    mb: 3
  })}
`

Li.defaultProps = {
  as: 'li'
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
  mx: 'auto',
  textAlign: 'center'
}

const _ImageBase = styled(ImageBase)`
  ${theme(mediaStyle)}
`

export const Image = withContainer(_ImageBase, {
  maxWidth: 'inherit'
})

const _VideoBase = styled(VideoBase)`
  ${theme(mediaStyle)}

  width: 100%,
`

_VideoBase.defaultProps = {
  autoPlay: true
}

export const Video = withContainer(_VideoBase)

const _IframeBase = styled(IframeBase)`
  ${theme({ mx: 'auto' })}

  width: ${CodeEditor.width};
  height: ${CodeEditor.height};
`

export const Iframe = withContainer(_IframeBase)

const FigcaptionBase = styled(Text)`
  ${theme({ fontSize: 0, color: 'black50' })}

  text-align: center;
`

export const Figcaption = withContainer(FigcaptionBase)

export const Blockquote = styled.blockquote`
  margin: auto;
  max-width: ${layout.small};
  border-left: 3px solid ${colors.black};
  padding-left: ${space[3]};
  font-style: italic;
  color: ${colors.gray8};
`

const Type = styled(Text)`
  ${theme({
    bg: 'gray1',
    color: 'gray7',
    fontFamily: 'mono',
    fontSize: 0,
    fontWeight: 'regular'
  })}

  padding: 0.2em 0.4em;
  margin: 0;
  border-radius: 3px;
`

Type.defaultProps = {
  as: 'span'
}

const TypeContainer = styled(Box)`
  ${theme({
    fontFamily: 'mono',
    fontSize: 0,
    color: 'gray7'
  })}

  display: inline;
`

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
  Video,
  ProBadge
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
