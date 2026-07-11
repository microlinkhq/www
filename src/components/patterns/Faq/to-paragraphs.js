import React from 'react'

const toParagraphs = answer =>
  React.isValidElement(answer) && answer.type === React.Fragment
    ? React.Children.toArray(answer.props.children)
    : [answer]

export default toParagraphs
