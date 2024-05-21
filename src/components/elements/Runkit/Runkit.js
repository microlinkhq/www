import React, { useState } from 'react'

import { Script } from 'gatsby'

const NODE_VERSION = '18'

const Runkit = ({ onLoad, placeholderComponent, isDark = false, ...opts }) => {
  if (!placeholderComponent.props.id) {
    throw new Error('Runkit placeholder must to have an id.')
  }

  const selector = `#${placeholderComponent.props.id} > div:nth-child(2)`
  const [notebook, setNotebook] = useState(null)

  const createNotebook = () => {
    const element = window.document.querySelector(selector)
    if (element && !element.dataset.runkit) {
      element.dataset.runkit = true
      setNotebook(
        window.RunKit.createNotebook({
          clearParentContents: true,
          evaluateOnLoad: false,
          element,
          nodeVersion: NODE_VERSION,
          theme: isDark ? 'untilted-0iw2lny2mmwa' : 'untilted-3iiuludkfm6r',
          gutterStyle: 'outside',
          tabSize: 2,
          onLoad: () => onLoad(element),
          ...opts
        })
      )
      return () => notebook.destroy()
    }
  }

  return (
    <>
      <Script async src='https://embed.runkit.com' onLoad={createNotebook} />
      {placeholderComponent}
    </>
  )
}

Runkit.isSupported = ({ language, text }) => {
  const isSupported =
    language === 'js' && !text.includes('import') && !text.startsWith('{')
  return isSupported
}

export default Runkit
