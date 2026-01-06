import { commonHeadingStyles } from 'components/elements/Heading'
import { withContainer } from 'helpers/hoc/with-container'
import { withTitle } from 'helpers/hoc/with-title'
import { withSlug } from 'helpers/hoc/with-slug'
import { space, fontSizes, colors, theme } from 'theme'
import styled, { css } from 'styled-components'
import { wordBreak } from 'helpers/style'
import { MDXProvider } from '@mdx-js/react'
import React, { useContext } from 'react'
import get from 'dlv'

import { MarkdownContext } from './Context'

import Box from 'components/elements/Box'
import { Button } from 'components/elements/Button/Button'
import CodeEditor from 'components/elements/CodeEditor/CodeEditor'
import ImageBase from 'components/elements/Image/Image'
import { Link } from 'components/elements/Link/base'
import Text from 'components/elements/Text'

import Heading from '../elements/Heading'
import { layout } from '../../theme'

import { Figcaption } from './Figcaption'
import { Microlink } from './Microlink'
import { MultiCodeEditor } from './MultiCodeEditor'
import { MultiCodeEditorInteractive } from './MultiCodeEditorInteractive'
import { Iframe } from './Iframe'
import { Video } from './Video'

const { Container, CONTAINER_SPACE } = withContainer

export const Code = withContainer(CodeEditor)

const StyledH1 = styled(Heading)(
  theme({
    ...commonHeadingStyles,
    maxWidth: layout.small,
    fontSize: `calc(${fontSizes[5]} * 0.75)`,
    lineHeight: [1, 2],
    textAlign: 'left',
    mt: 5,
    mb: 4
  })
)

export const H1Base = props => {
  const { isBlogPage } = useContext(MarkdownContext)
  return (
    <StyledH1
      forwardedAs='h1'
      variant={null}
      css={theme({ mx: isBlogPage ? 'auto' : undefined })}
      {...props}
    />
  )
}

export const H1 = withTitle(withSlug(H1Base))

const StyledH2 = styled(Heading)`
  ${theme({
    maxWidth: layout.small,
    fontSize: `calc(${fontSizes[4]} * 0.75)`,
    lineHeight: [1, 2],
    textAlign: 'left',
    mt: 5,
    mb: 4
  })}
`

const H2Base = props => {
  const { isBlogPage } = useContext(MarkdownContext)
  return (
    <StyledH2
      forwardedAs='h2'
      variant={null}
      css={theme({ mx: isBlogPage ? 'auto' : undefined })}
      {...props}
    />
  )
}

export const H2 = withTitle(withSlug(H2Base))

const StyledH3 = styled(Heading)`
  ${theme({
    maxWidth: layout.small,
    fontSize: `calc(${fontSizes[4]} * 0.75 * 0.75)`,
    lineHeight: 1,
    textAlign: 'left',
    mt: 5,
    mb: 4
  })}
`

const H3Base = props => {
  const { isBlogPage } = useContext(MarkdownContext)
  return (
    <StyledH3
      forwardedAs='h3'
      variant={null}
      css={theme({ mx: isBlogPage ? 'auto' : undefined })}
      {...props}
    />
  )
}

export const H3 = withTitle(withSlug(H3Base))

const StyledH4 = styled(Heading)`
  ${theme({
    maxWidth: layout.small,
    fontSize: 2,
    lineHeight: 1,
    textAlign: 'left',
    mt: 4,
    mb: 3
  })}
`

const H4Base = props => {
  const { isBlogPage } = useContext(MarkdownContext)
  return (
    <StyledH4
      forwardedAs='h4'
      variant={null}
      css={theme({ mx: isBlogPage ? 'auto' : undefined })}
      {...props}
    />
  )
}

export const H4 = withTitle(withSlug(H4Base))

const StyledH5 = styled(Heading)`
  ${theme({
    maxWidth: layout.small,
    fontSize: 1,
    lineHeight: 1,
    textAlign: 'left',
    mt: 4,
    mb: 3
  })}
`

const H5Base = props => {
  const { isBlogPage } = useContext(MarkdownContext)
  return (
    <StyledH5
      forwardedAs='h5'
      variant={null}
      css={theme({ mx: isBlogPage ? 'auto' : undefined })}
      {...props}
    />
  )
}

export const H5 = withTitle(withSlug(H5Base))

const StyledH6 = styled(Heading)`
  ${theme({
    maxWidth: layout.small,
    fontSize: 1,
    color: 'gray9',
    lineHeight: 1,
    textAlign: 'left',
    mt: 4,
    mb: 3
  })}
`

const H6Base = props => {
  const { isBlogPage } = useContext(MarkdownContext)
  return (
    <StyledH6
      forwardedAs='h6'
      variant={null}
      css={theme({ mx: isBlogPage ? 'auto' : undefined })}
      {...props}
    />
  )
}

export const H6 = withTitle(withSlug(H6Base))

export const Paraph = props => {
  const { isBlogPage } = useContext(MarkdownContext)
  const isMedia = get(props, 'children.props.name') === 'img'
  const maxWidth = isMedia ? layout.large : layout.small
  return (
    <Text
      as='div'
      css={theme({
        ...CONTAINER_SPACE,
        maxWidth,
        mx: isBlogPage ? 'auto' : undefined
      })}
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
    ...CONTAINER_SPACE
  })}
`

export const Ul = props => {
  const { isBlogPage } = useContext(MarkdownContext)
  return (
    <StyledUl
      as='ul'
      css={theme({ mx: isBlogPage ? 'auto' : undefined })}
      {...props}
    />
  )
}

export const Ol = props => {
  const { isBlogPage } = useContext(MarkdownContext)
  return (
    <StyledUl
      as='ol'
      css={theme({ mx: isBlogPage ? 'auto' : undefined })}
      {...props}
    />
  )
}

const StyledLi = styled(Text)`
  max-width: ${layout.small};

  ${theme({
    mb: 3
  })}
`

export const Li = props => {
  const { isBlogPage } = useContext(MarkdownContext)
  return (
    <StyledLi
      as='li'
      css={theme({ mx: isBlogPage ? 'auto' : undefined })}
      {...props}
    />
  )
}

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
  textAlign: 'center'
}

const _ImageBase = styled(ImageBase)`
  ${theme(mediaStyle)}
`

export const Image = withContainer(_ImageBase, {
  style: { maxWidth: 'inherit' }
})

const StyledBlockquote = styled.blockquote`
  max-width: ${layout.small};
  border-left: 3px solid ${colors.black};
  padding-left: ${space[3]};
  font-style: italic;
  color: ${colors.gray8};
`

export const Blockquote = props => {
  const { isBlogPage } = useContext(MarkdownContext)
  return (
    <StyledBlockquote
      css={theme({ margin: isBlogPage ? 'auto' : undefined })}
      {...props}
    />
  )
}

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

const mdComponents = {
  a: Link,
  blockquote: Blockquote,
  button: Button,
  code: props => {
    const isInline = !props.className
    return isInline ? <CodeInline {...props} /> : <Code {...props} />
  },
  pre: ({ children }) => children,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  img: Image,
  li: Li,
  ol: Ol,
  p: Paraph,
  strong: Strong,
  ul: Ul,
  iframe: Iframe,
  video: Video
}

const ScopedComponents = {
  Blockquote,
  Button,
  Code,
  CodeInline,
  Container,
  Figcaption,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  Image,
  Li,
  Microlink,
  MultiCodeEditor,
  MultiCodeEditorInteractive,
  Ol,
  Paraph,
  Strong,
  Type,
  TypeContainer,
  Ul
}

const Markdown = ({ children, isBlogPage, ...props }) => {
  const components = {
    ...mdComponents,
    ...ScopedComponents
  }

  return (
    <MarkdownContext.Provider value={{ isBlogPage }}>
      <Box {...props}>
        <MDXProvider components={components}>{children}</MDXProvider>
      </Box>
    </MarkdownContext.Provider>
  )
}

export default Markdown
