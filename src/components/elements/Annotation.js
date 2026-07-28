/* global IntersectionObserver */

import React, { useEffect, useRef } from 'react'
import { annotate } from 'rough-notation'
import { cx } from 'theme'

const COLORS = {
  highlight: cx('yellow4'),
  underline: cx('secondary')
}

const Annotation = ({
  variant = 'highlight',
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
      type: variant,
      color: COLORS[variant],
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
  }, [variant, animationDuration, multiline])

  return (
    <span ref={ref} {...props}>
      {children}
    </span>
  )
}

export default Annotation
