import React from 'react'
import styled from 'styled-components'
import CodeCopy from 'react-codecopy'
import { get } from 'helpers'

import { fontWeights, space, fontSizes, fonts, colors } from 'theme'
import { Heading, Text, Link, Img as Image } from 'components/elements'

const SPECIAL_COMPONENTS = ['Terminal', 'CodeEditor']

const WIDTH = {
  normal: '560px',
  large: '720px'
}

export const H1 = styled(Heading)([])

H1.defaultProps = {
  maxWidth: WIDTH.normal,
  mx: 'auto',
  is: 'h1',
  fontSize: [`${fontSizes[5] * 0.75}px`, 5],
  lineHeight: [2, 3],
  variant: null,
  mt: 5,
  mb: 4
}

export const H2 = styled(Heading)([])

H2.defaultProps = {
  mx: 'auto',
  maxWidth: WIDTH.normal,
  is: 'h2',
  fontSize: [`${fontSizes[4] * 0.75}px`, 4],
  lineHeight: [2, 3],
  variant: null,
  mt: 5,
  mb: 4
}

export const H3 = styled(Heading)([])

H3.defaultProps = {
  mx: 'auto',
  maxWidth: WIDTH.normal,
  is: 'h3',
  fontSize: 3,
  lineHeight: 2,
  variant: null,
  mt: 5,
  mb: 4
}

export const H4 = styled(Heading)([])

H4.defaultProps = {
  mx: 'auto',
  maxWidth: WIDTH.normal,
  is: 'h4',
  fontSize: 2,
  lineHeight: 2,
  variant: null,
  mt: 5,
  mb: 4
}

export const H5 = styled(Heading)([])

H5.defaultProps = {
  mx: 'auto',
  maxWidth: WIDTH.normal,
  is: 'h5',
  fontSize: 1,
  lineHeight: 2,
  variant: null,
  mt: 4,
  mb: 2
}

export const H6 = styled(Heading)([])

H6.defaultProps = {
  mx: 'auto',
  maxWidth: WIDTH.normal,
  is: 'h6',
  fontSize: 1,
  color: 'gray9',
  lineHeight: 2,
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
  is: 'b',
  display: 'inline',
  fontWeight: 'bold'
}

export const Ul = styled(Text)([])

Ul.defaultProps = {
  mx: 'auto',
  is: 'ul',
  my: 4,
  maxWidth: WIDTH.normal
}

export const Li = styled(Text)([])

Li.defaultProps = {
  mx: 'auto',
  mb: 2,
  is: 'li',
  maxWidth: WIDTH.normal
}

export const CodeInline = styled(Text)(
  [],
  props => `
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

export const Img = styled(Image)([])

Img.defaultProps = {
  maxWidth: ['100%', '900px'],
  display: 'block',
  borderRadius: '3px',
  my: '2.5rem',
  mx: 'auto',
  textAlign: 'center'
}

export const Figcaption = styled.figcaption`
  max-width: 900px;
  margin-top: -1.5rem;
  font-size: ${fontSizes[0]}px;
  color: ${colors.gray};
  text-align: center;
  margin-bottom: 3rem;
`

export const Blockquote = styled.blockquote`
  border-left: 3px solid ${colors.black};
  padding-left: ${space[2]}px;
  font-style: italic;
  color: ${colors.gray8};
  margin-left: -13px;
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
  img: Img
}
