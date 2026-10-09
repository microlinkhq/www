import React from 'react'

import { Link } from 'components/elements/Link'

const LINK_PATTERN = /\[([^\]]+)\]\(([^)\s]+)\)/g

export const plain = text => (text || '').replace(LINK_PATTERN, '$1')

export const inline = text => {
  if (!text) return null
  const nodes = []
  let cursor = 0
  for (const match of text.matchAll(LINK_PATTERN)) {
    const [raw, label, href] = match
    if (match.index > cursor) nodes.push(text.slice(cursor, match.index))
    nodes.push(
      <Link key={`${href}-${match.index}`} href={href}>
        {label}
      </Link>
    )
    cursor = match.index + raw.length
  }
  if (cursor < text.length) nodes.push(text.slice(cursor))
  return nodes
}
