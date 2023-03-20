import React, { useState } from 'react'
import { Script } from 'gatsby'

const NODE_VERSION = '16'

const THEME = {
  light: 'untilted-3iiuludkfm6r',
  dark: 'untilted-0iw2lny2mmwa'
}

const Runkit = ({ onLoad, placeholderComponent, theme, ...opts }) => {
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
          getShareableURL: false,
          element,
          nodeVersion: NODE_VERSION,
          theme: THEME[theme],
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
      <Script async src='https://embed.runkit.com' onload={createNotebook} />
      {placeholderComponent}
    </>
  )
}

Runkit.defaultProps = {
  theme: 'light'
}

Runkit.isSupported = ({ language, text }) =>
  language === 'js' && !text.includes('import') && !text.startsWith('{')

export default Runkit
