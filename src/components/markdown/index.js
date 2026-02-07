import { commonHeadingStyles } from 'components/elements/Heading'
import { withContainer } from 'helpers/hoc/with-container'
import { withTitle } from 'helpers/hoc/with-title'
import { withSlug } from 'helpers/hoc/with-slug'
import { toPx, toRaw, fontSizes, theme } from 'theme'
import styled from 'styled-components'
import { MDXProvider } from '@mdx-js/react'
import React, { useContext } from 'react'
import get from 'dlv'

import { MarkdownContext } from './Context'

import Box from 'components/elements/Box'
import { Button } from 'components/elements/Button/Button'
import { Link } from 'components/elements/Link'
import Text from 'components/elements/Text'

import Heading from '../elements/Heading'
import { layout } from '../../theme'

import { Blockquote } from './Blockquote'
import { Code } from './Code'
import { CodeInline } from './CodeInline'
import { MultiCodeEditor } from './MultiCodeEditor'
import { Iframe } from './Iframe'
import { Video } from './Video'
import { Image } from './Image'
import { Table, Thead, Tbody, Tr, Th, Td } from './Table'

const { Container, CONTAINER_SPACE } = withContainer

// Utility to calculate responsive heading style based on level
const getHeadingStyle = (level = 1) => {
  const scale = 0.75
  const baseDesktop = toRaw(fontSizes[4]) * scale
  const baseMobile = toRaw(fontSizes[4]) * scale * scale

  const headingSizes = []
  let mobile = baseMobile
  let desktop = baseDesktop
  for (let i = 0; i < 5; i++) {
    headingSizes.push([toPx(mobile), toPx(desktop)])
    desktop = mobile
    mobile = mobile * scale
  }

  let fontSizeArr
  if (level === 6) {
    fontSizeArr = headingSizes[4] // h5
  } else {
    fontSizeArr = headingSizes[level - 1]
  }

  // Ensure font size is not less than fontSizes[1]
  const minPx = toRaw(fontSizes[1])
  fontSizeArr = fontSizeArr.map(size => {
    let px = toRaw(size)
    px = px < minPx ? minPx : px
    return toPx(Math.round(px))
  })

  const marginMap = Array(3)
    .fill({ mt: [4, 5], mb: [3, 4] })
    .concat(Array(2).fill({ mt: [3, 4], mb: [2, 3] }))

  let margin = marginMap[level - 1] || { mt: [0, 0], mb: [0, 0] }
  if (level === 6) {
    margin = { ...marginMap[4], color: 'gray7' }
  }

  // Debug print
  if (typeof window !== 'undefined') {
    console.log(`Heading level ${level}:`, {
      fontSize: fontSizeArr
    })
  }
  return {
    fontSize: fontSizeArr,
    ...margin
  }
}

const StyledH1 = styled(Heading)(
  theme({
    ...commonHeadingStyles,
    maxWidth: layout.small,
    ...getHeadingStyle(1),
    textAlign: 'left'
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
    ...getHeadingStyle(2),
    lineHeight: 0,
    textAlign: 'left'
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
    ...getHeadingStyle(3),
    lineHeight: 0,
    textAlign: 'left'
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
    ...getHeadingStyle(4),
    lineHeight: 0,
    textAlign: 'left'
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
    ...getHeadingStyle(5),
    lineHeight: 0,
    textAlign: 'left'
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
    ...getHeadingStyle(6),
    lineHeight: 0,
    textAlign: 'left'
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
  video: Video,
  table: Table,
  thead: Thead,
  tbody: Tbody,
  tr: Tr,
  th: Th,
  td: Td
}

const ScopedComponents = {
  Blockquote,
  Button,
  Code,
  CodeInline,
  Container,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  Image,
  Li,
  MultiCodeEditor,
  Ol,
  Paraph,
  Strong,
  Ul
}

const components = { ...mdComponents, ...ScopedComponents }

const Markdown = ({ children, isBlogPage, ...props }) => {
  return (
    <MarkdownContext.Provider value={{ isBlogPage }}>
      <Box {...props}>
        <MDXProvider components={components}>{children}</MDXProvider>
      </Box>
    </MarkdownContext.Provider>
  )
}

export default Markdown
