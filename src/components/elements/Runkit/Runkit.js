import React from 'react'
import { useScript } from 'components/hook'
import { waitForGlobal } from 'helpers'

export default ({ nodeVersion = '12', loader, children, ...props }) => {
  const loaderChildren = loader()

  waitForGlobal('RunKit', () => {
    const loaderId = loaderChildren.props.id
    const el = document.getElementById(loaderId)
    if (el && !el.querySelector('iframe')) {
      window.RunKit.createNotebook({
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
    }
  })

  return (
    <>
      {useScript({
        src: 'https://embed.runkit.com',
        async: true
      })}
      {loaderChildren}
    </>
  )
}
