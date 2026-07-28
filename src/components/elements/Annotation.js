/* global IntersectionObserver */

import React, { useEffect, useRef } from 'react'
import { annotate } from 'rough-notation'
import { cx } from 'theme'

const COLORS = {
  highlight: cx('yellow'),
  underline: cx('secondary')
}

const Annotation = ({
  variant: type = 'highlight',
  animationDuration = 800,
  multiline = true,
  children,
  ...props
}) => {
  const ref = useRef(null)

  useEffect(() => {
    const { current } = ref
    if (!current) return

    const annotation = annotate(current, {
      type,
      color: COLORS[type],
      animate: !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      animationDuration,
      multiline
    })

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          annotation.show()
          observer.disconnect()
        }
      },
      { threshold: 1 }
    )

    observer.observe(current)

    return () => {
      observer.disconnect()
      annotation.remove()
    }
  }, [type, animationDuration, multiline])

  return (
    <span ref={ref} {...props}>
      {children}
    </span>
  )
}

export default Annotation
