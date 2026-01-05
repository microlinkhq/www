import { commonHeadingStyles } from 'components/elements/Heading'
import { withContainer } from 'helpers/hoc/with-container'
import { withTitle } from 'helpers/hoc/with-title'
import { withSlug } from 'helpers/hoc/with-slug'
import { space, fontSizes, colors, theme } from 'theme'
import styled, { css } from 'styled-components'
import { mqlCode } from 'helpers/mql-code'
import { wordBreak } from 'helpers/style'
import { MDXProvider } from '@mdx-js/react'
import React from 'react'
import get from 'dlv'

import Box from 'components/elements/Box'
import { Button } from 'components/elements/Button/Button'
import CodeEditor from 'components/elements/CodeEditor/CodeEditor'
import Color from 'components/elements/Color/Color'
import IframeBase from 'components/elements/Iframe/Iframe'
import ImageBase from 'components/elements/Image/Image'
import Label from 'components/elements/Label'
import { Link } from 'components/elements/Link/base'
import PriceMonthlyBase from 'components/elements/PriceMonthly'
import TerminalBase from 'components/elements/Terminal/Terminal'
import Text from 'components/elements/Text'
import Tweet from 'components/elements/Tweet/Tweet'
import VideoBase from 'components/elements/Video/Video'

import MultiCodeEditorBase from '../patterns/MultiCodeEditor/MultiCodeEditor'
import MultiCodeEditorInteractiveBase from '../patterns/MultiCodeEditor/MultiCodeEditorInteractive'

import MicrolinkBase from '../patterns/Microlink/Microlink'
import ProBadge from '../patterns/ProBadge/ProBadge'
import DemoIntegrations from './DemoIntegrations'
import Heading from '../elements/Heading'
import { layout } from '../../theme'

const { Container, CONTAINER_SPACE } = withContainer

export { ProBadge, Tweet, Label, Link }

export const Microlink = withContainer(MicrolinkBase)

export const Terminal = withContainer(TerminalBase)

export const Code = withContainer(CodeEditor)

export const MultiCodeEditor = withContainer(MultiCodeEditorBase)

export const MultiCodeEditorInteractive = withContainer(
  MultiCodeEditorInteractiveBase
)

const StyledH1 = styled(Heading)(
  theme({
    ...commonHeadingStyles,
    maxWidth: layout.small,
    fontSize: `calc(${fontSizes[5]} * 0.75)`,
    lineHeight: [1, 2],
    textAlign: 'left',
    mt: 5,
    mb: 4,
    mx: 'auto'
  })
)

export const H1Base = props => (
  <StyledH1 forwardedAs='h1' variant={null} {...props} />
)

export const H1 = withTitle(withSlug(H1Base))

const StyledH2 = styled(Heading)`
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

const H2Base = props => <StyledH2 forwardedAs='h2' variant={null} {...props} />

export const H2 = withTitle(withSlug(H2Base))

const StyledH3 = styled(Heading)`
  ${theme({
    mx: 'auto',
    maxWidth: layout.small,
    fontSize: `calc(${fontSizes[4]} * 0.75 * 0.75)`,
    lineHeight: 1,
    textAlign: 'left',
    mt: 5,
    mb: 4
  })}
`

const H3Base = props => <StyledH3 forwardedAs='h3' variant={null} {...props} />

export const H3 = withTitle(withSlug(H3Base))

const StyledH4 = styled(Heading)`
  ${theme({
    mx: 'auto',
    maxWidth: layout.small,
    fontSize: 2,
    lineHeight: 1,
    textAlign: 'left',
    mt: 4,
    mb: 3
  })}
`

const H4Base = props => <StyledH4 forwardedAs='h4' variant={null} {...props} />

export const H4 = withTitle(withSlug(H4Base))

const StyledH5 = styled(Heading)`
  ${theme({
    mx: 'auto',
    maxWidth: layout.small,
    fontSize: 1,
    lineHeight: 1,
    textAlign: 'left',
    mt: 4,
    mb: 3
  })}
`

const H5Base = props => <StyledH5 forwardedAs='h5' variant={null} {...props} />

export const H5 = withTitle(withSlug(H5Base))

const StyledH6 = styled(Heading)`
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
`

const H6Base = props => <StyledH6 forwardedAs='h6' variant={null} {...props} />

export const H6 = withTitle(withSlug(H6Base))

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

const StyledStrong = styled(Text)`
  display: inline;
  font-weight: bold;
`

export const Strong = props => <StyledStrong as='b' {...props} />

const StyledUl = styled(Text)`
  max-width: ${layout.small};

  ${theme({
    mx: 'auto',
    ...CONTAINER_SPACE
  })}
`

export const Ul = props => <StyledUl as='ul' {...props} />

export const Ol = props => <StyledUl as='ol' {...props} />

const StyledLi = styled(Text)`
  max-width: ${layout.small};

  ${theme({
    mx: 'auto',
    mb: 3
  })}
`

export const Li = props => <StyledLi as='li' {...props} />

const codeStyle = css`
  color: ${({ theme }) => theme.colors.secondary};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-weight: ${({ theme }) => theme.fontWeights.normal};
  font-size: 0.9rem;
  text-shadow: rgba(0, 0, 0, 0.05) 0px 1px;
`

export const StyledCodeInline = styled(Text)`
  ${codeStyle};
  ${wordBreak};
  display: inline;
  padding: 0 4px;

  &::before,
  &::after {
    content: '\`';
  }
`

export const CodeInline = props => <StyledCodeInline as='code' {...props} />

const mediaStyle = {
  borderRadius: '3px',
  mx: 'auto',
  textAlign: 'center'
}

const _ImageBase = styled(ImageBase)`
  ${theme(mediaStyle)}
`

export const Image = withContainer(_ImageBase, {
  style: { maxWidth: 'inherit' }
})

const StyledVideoBase = styled(VideoBase)`
  ${theme(mediaStyle)}

  width: 100%;
`

const _VideoBase = props => <StyledVideoBase autoPlay {...props} />

export const Video = withContainer(_VideoBase)

const _IframeBase = styled(IframeBase)`
  ${theme({ mx: 'auto' })}
  width: ${CodeEditor.width};
  height: ${CodeEditor.height};
  max-width: ${layout.small};
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

const StyledType = styled(Text)`
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

const Type = props => <StyledType as='span' {...props} />

const TypeContainer = styled(Box)`
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
  MultiCodeEditorInteractive,
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

const components = {
  ...mdComponents,
  ...ScopedComponents
}

const Markdown = ({ children }) => (
  <MDXProvider components={components}>{children}</MDXProvider>
)

export default Markdown
