import React from 'react'
import styled from 'styled-components'
import CodeCopy from 'react-codecopy'
import { get, withSlug } from 'helpers'

import { fontWeights, space, fontSizes, fonts, colors } from 'theme'
import { Heading, Text, Link, Image as ImageBase } from 'components/elements'

const SPECIAL_COMPONENTS = ['Terminal', 'CodeEditor']

const WIDTH = {
  normal: '560px',
  large: '720px'
}

export const H1 = withSlug(styled(Heading)([]))

H1.defaultProps = {
  ...Heading.defaultProps,
  maxWidth: WIDTH.normal,
  mx: 'auto',
  as: 'h1',
  fontSize: [`${fontSizes[5] * 0.75}px`, 5],
  lineHeight: [2, 3],
  textAlign: 'left',
  variant: null,
  mt: 5,
  mb: 4
}

const H2Base = styled(Heading)([])

H2Base.defaultProps = {
  ...Heading.defaultProps,
  mx: 'auto',
  maxWidth: WIDTH.normal,
  as: 'h2',
  fontSize: [`${fontSizes[4] * 0.75}px`, 4],
  lineHeight: [2, 3],
  textAlign: 'left',
  variant: null,
  mt: 5,
  mb: 4
}

export const H2Link = withSlug(styled(H2Base)`
  text-decoration: none;
  cursor: pointer;
  color: black;
  transition: all 0.1s ease-out;

  &:hover {
    color: ${colors.link};
  }
`)

H2Link.defaultProps = {
  as: 'a'
}

export const H2 = withSlug(H2Base)

export const H3 = withSlug(styled(Heading)([]))

H3.defaultProps = {
  ...Heading.defaultProps,
  mx: 'auto',
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
  ...Heading.defaultProps,
  mx: 'auto',
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
  ...Heading.defaultProps,
  mx: 'auto',
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
  ...Heading.defaultProps,
  mx: 'auto',
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
  mx: 'auto',
  mt: 3,
  mb: 4
}

export const Strong = styled(Text)([])

Strong.defaultProps = {
  ...Text.defaultProps,
  as: 'b',
  display: 'inline',
  fontWeight: 'bold'
}

export const Ul = styled(Text)([])

Ul.defaultProps = {
  ...Text.defaultProps,
  mx: 'auto',
  as: 'ul',
  my: 4,
  maxWidth: WIDTH.normal
}

export const Li = styled(Text)([])

Li.defaultProps = {
  ...Text.defaultProps,
  mx: 'auto',
  mb: 2,
  as: 'li',
  maxWidth: WIDTH.normal
}

export const CodeInline = styled(Text)(
  [],
  props =>
    `
color: ${colors.secondary};
display: inline;
border: 1px solid #dee2e6;
font-size: 0.75rem;
padding: 3px 10px;
border-radius: 3px;
white-space: nowrap;
font-weight: ${fontWeights.regular};
font-family: ${fonts.mono};
`
)

const Pre = styled.pre`
  padding: 30px;
  border-radius: 2px;
  overflow-x: auto;
  font-family: ${fonts.mono};
  font-size: 13px;
  font-weight: ${fontWeights.regular};
  line-height: 20px;
  background: #fafbfc;
  color: ${colors.secondary};
`
const Code = styled.code`
  font-family: ${fonts.mono};
`

export const PreCode = props => (
  <CodeCopy text={props.children}>
    <Pre>
      <Code {...props} />
    </Pre>
  </CodeCopy>
)

export const Image = styled(ImageBase)([])

Image.defaultProps = {
  ...Image.defaultProps,
  maxWidth: ['100%', WIDTH.large],
  display: 'block',
  borderRadius: '3px',
  my: '2.5rem',
  mx: 'auto',
  textAlign: 'center'
}

export const Figcaption = styled.figcaption`
  max-width: ${WIDTH.large};
  margin-top: -1.5rem;
  font-size: ${fontSizes[0]}px;
  color: ${colors.gray};
  text-align: center;
  margin-bottom: 3rem;
`

export const Blockquote = styled.blockquote`
  margin: auto;
  max-width: ${WIDTH.normal};
  border-left: 3px solid ${colors.black};
  padding-left: ${space[2]}px;
  font-style: italic;
  color: ${colors.gray8};
`

export default {
  p: Paraph,
  strong: Strong,
  ul: Ul,
  li: Li,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  code: CodeInline,
  a: Link,
  blockquote: Blockquote,
  img: Image
}
