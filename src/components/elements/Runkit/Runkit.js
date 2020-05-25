import React, { useEffect } from 'react'
import { waitForGlobal } from 'helpers'

export default ({ nodeVersion = '12', loader, children, ...props }) => {
  const loaderChildren = loader()

  useEffect(() => {
    waitForGlobal('RunKit', () => {
      console.log('[runkit] loaded')
      const loaderId = loaderChildren.props.id
      const el = document.getElementById(loaderId)
      console.log('[runkit]', !!el)
      if (el && !el.querySelector('iframe')) {
        console.log('[runkit]', el.id)
        const result = window.RunKit.createNotebook({
          element: el,
          name: el.id,
          title: el.children[0].textContent,
          source: el.children[1].textContent,
          nodeVersion: '14',
          gutterStyle: 'outside',
          onLoad: () => {
            el.children[0].style.display = 'none'
            el.children[1].style.display = 'none'
            el.style['box-shadow'] = 'none'
          }
        })
        console.log('[runkit] result', result)
      }
    })
  }, [])

  return <>{loaderChildren}</>
}
