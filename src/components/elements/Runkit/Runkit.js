import React, { useState, useEffect } from 'react'
import { waitForGlobal } from 'helpers'

const NODE_VERSION = '16'

const Runkit = ({ placeholderComponent, title, code: source }) => {
  const id = placeholderComponent.props.id
  if (!id) throw new Error('Runkit placeholder must to have an id.')

  const [notebook, setNotebook] = useState(null)

  useEffect(() => {
    waitForGlobal('RunKit', () => {
      const element = window.document.getElementById(id)

      if (element && !element.dataset.runkit) {
        element.dataset.runkit = true
        const childs = Array.from(element.children)

        setNotebook(
          window.RunKit.createNotebook({
            element,
            title,
            source,
            nodeVersion: NODE_VERSION,
            gutterStyle: 'outside',
            tabSize: 2,
            onLoad: () => {
              childs.forEach(child => element.removeChild(child))
              element.style.border = 'none'
            }
          })
        )

        return () => notebook.destroy()
      }
    })
  }, [id, notebook, source, title])

  return <>{placeholderComponent}</>
}

export default Runkit
