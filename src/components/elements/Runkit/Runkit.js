import React, { useEffect, useState } from 'react'
import useScript from 'react-script-hook'

export default ({ nodeVersion = '12', loader, children, ...props }) => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false)

  const loaderChildren = loader()

  const onload = () => setIsScriptLoaded(true)

  useEffect(() => {
    if (window.RunKit) {
      document.querySelectorAll('[data-runkit="true"]').forEach(el => {
        window.RunKit.createNotebook({
          element: el,
          source: el.textContent,
          onLoad: () => {
            el.removeChild(el.children[0])
            el.removeChild(el.children[0])
            el.style['box-shadow'] = 'none'
          }
        })
      })
    }
  }, [isScriptLoaded])

  return (
    <>
      {useScript({
        src: 'https://embed.runkit.com',
        async: true,
        checkForExisting: true,
        onload
      })}
      {loaderChildren}
    </>
  )
}
