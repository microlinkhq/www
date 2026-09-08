import React from 'react'
import styled from 'styled-components'
import { theme } from 'theme'

import Box from 'components/elements/Box'
import Text from 'components/elements/Text'

const TOKEN =
  /(\/\/.*)|('(?:\\'|[^'])*')|\b(const|await|async|return|require|new|true)\b/g

const Pane = styled(Box)(
  theme({
    flex: 1,
    minHeight: 0,
    px: 3,
    pt: 3,
    overflow: 'hidden'
  })
)

const Line = styled(Text)(
  theme({
    fontFamily: 'mono',
    fontSize: '12px',
    lineHeight: 2,
    color: 'gray9',
    whiteSpace: 'pre',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  })
)

const Kw = styled('span')(theme({ color: 'pink8' }))
const Str = styled('span')(theme({ color: 'indigo8' }))
const Cmt = styled('span')(theme({ color: 'gray7' }))

const highlight = value => {
  const nodes = []
  let last = 0
  let match
  const token = new RegExp(TOKEN.source, TOKEN.flags)
  while ((match = token.exec(value))) {
    if (match.index > last) nodes.push(value.slice(last, match.index))
    const [, comment, string, keyword] = match
    if (comment) nodes.push(<Cmt key={match.index}>{comment}</Cmt>)
    else if (string) nodes.push(<Str key={match.index}>{string}</Str>)
    else nodes.push(<Kw key={match.index}>{keyword}</Kw>)
    last = match.index + match[0].length
  }
  if (last < value.length) nodes.push(value.slice(last))
  return nodes
}

export const CodeTile = ({ code }) => (
  <Pane>
    {code.split('\n').map((line, index) => (
      <Line key={index}>{line ? highlight(line) : ' '}</Line>
    ))}
  </Pane>
)
