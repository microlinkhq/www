import React, { useState, useEffect } from 'react'
import { waitForGlobal } from 'helpers'

export default ({ placeholderComponent, title, code }) => {
  const id = placeholderComponent.props.id
  if (!id) throw new Error('Runkit placeholder must to have an id.')

  const [notebook, setNotebook] = useState(null)

  useEffect(() => {
    waitForGlobal('RunKit', () => {
      const el = window.document.getElementById(id)

      if (el && !el.dataset.runkit) {
        el.dataset.runkit = true
        const childs = Array.from(el.children)

        setNotebook(
          window.RunKit.createNotebook({
            element: el,
            title,
            source: code,
            nodeVersion: '14',
            gutterStyle: 'outside',
            onLoad: () => {
              childs.forEach(child => el.removeChild(child))
              el.style['box-shadow'] = 'none'
            }
          })
        )

        return () => notebook.destroy()
      }
    })
  }, [])

  return <>{placeholderComponent}</>
}
