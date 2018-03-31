import React from 'react'
import { Heading, Text, Link } from 'components/elements'
import styled from 'styled-components'
import { space, fontSizes, fonts, colors } from 'theme'
import CodeCopy from 'react-codecopy'

export const H1 = styled(Heading)([])

H1.defaultProps = {
  mx: 'auto',
  maxWidth: '900px',
  is: 'h1',
  fontSize: [`${fontSizes[6] * 0.75}px`, 6],
  lineHeight: 3,
  mt: 5,
  mb: 4
}

export const H2 = styled(Heading)([])

H2.defaultProps = {
  mx: 'auto',
  maxWidth: '900px',
  is: 'h2',
  fontSize: [`${fontSizes[5] * 0.75}px`, 5],
  lineHeight: 2,
  mt: 5,
  mb: 4
}

export const H3 = styled(Heading)([])

H3.defaultProps = {
  mx: 'auto',
  maxWidth: '900px',
  is: 'h3',
  fontSize: 4,
  lineHeight: 2,
  mt: 5,
  mb: 4
}

export const H4 = styled(Heading)([])

H4.defaultProps = {
  mx: 'auto',
  maxWidth: '900px',
  is: 'h4',
  fontSize: 3,
  lineHeight: 2,
  mt: 5,
  mb: 4
}

export const H5 = styled(Heading)([])

H5.defaultProps = {
  mx: 'auto',
  maxWidth: '900px',
  is: 'h5',
  fontSize: 2,
  lineHeight: 2,
  mt: 4,
  mb: 2
}

export const H6 = styled(Heading)([])

H6.defaultProps = {
  mx: 'auto',
  maxWidth: '900px',
  is: 'h6',
  fontSize: 1,
  lineHeight: 2,
  mt: 4,
  mb: 2
}

export const Paraph = props => {
  const isImageChildren =
    props.children && props.children.props && props.children.props.src
  const maxWidth = isImageChildren ? '1000px' : '900px'
  return <Text maxWidth={maxWidth} {...props} />
}

Paraph.defaultProps = {
  mx: 'auto',
  my: 4,
  mb: 3
}

export const Strong = styled(Text)([])

Strong.defaultProps = {
  is: 'b',
  display: 'inline',
  fontWeight: 'bold'
}

export const Ul = styled.ul``

export const Li = styled.li``

export const CodeInline = styled(Text)(
  [],
  props => `
color: ${colors.secondary};
display: inline;
border: 1px solid ${colors.gray2};
font-size: 0.75rem;
padding: 3px 10px;
border-radius: 3px;
white-space: nowrap;
font-weight: 600;
font-family: ${fonts.mono};
-webkit-font-smoothing: antialiased;
`
)

const Pre = styled.pre`
  padding: 30px;
  border-radius: 2px;
  overflow-x: auto;
  font-family: ${fonts.mono};
  font-size: 13px;
  line-height: 20px;
  background: ${colors.gray0};
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

export const Img = styled.img`
  border-radius: 3px;
  display: block;
  margin: 4rem auto;
  max-width: 100%;
  text-align: center;
`

export const Figcaption = styled.figcaption`
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
