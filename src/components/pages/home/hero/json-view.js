import Box from 'components/elements/Box'
import { theme } from 'theme'
import React from 'react'

import { Code, SYNTAX } from './primitives'

const JSON_TOKEN =
  /("(?:\\.|[^"\\])*")(\s*:)?|\b(?:true|false|null)\b|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g

const tokenizeJson = src => {
  const text = JSON.stringify(src, null, 2)
  const nodes = []
  let last = 0
  let key = 0
  let match

  JSON_TOKEN.lastIndex = 0
  while ((match = JSON_TOKEN.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index))
    const token = match[0]

    if (match[1] && match[2] !== undefined) {
      nodes.push(
        <Box as='span' key={key++} css={theme({ color: SYNTAX.key })}>
          {match[1]}
        </Box>
      )
      nodes.push(match[2])
    } else if (match[1]) {
      nodes.push(
        <Box as='span' key={key++} css={theme({ color: SYNTAX.string })}>
          {token}
        </Box>
      )
    } else {
      const color =
        token === 'true' || token === 'false'
          ? SYNTAX.boolean
          : token === 'null'
            ? SYNTAX.literal
            : SYNTAX.number
      nodes.push(
        <Box as='span' key={key++} css={theme({ color })}>
          {token}
        </Box>
      )
    }

    last = JSON_TOKEN.lastIndex
  }
  if (last < text.length) nodes.push(text.slice(last))
  return nodes
}

const jsonNodesCache = new WeakMap()

export const JsonView = ({ src }) => {
  let nodes = jsonNodesCache.get(src)
  if (!nodes) {
    nodes = tokenizeJson(src)
    jsonNodesCache.set(src, nodes)
  }

  return (
    <Code css={theme({ fontSize: 0, lineHeight: 1.85, color: SYNTAX.body })}>
      {nodes}
    </Code>
  )
}
