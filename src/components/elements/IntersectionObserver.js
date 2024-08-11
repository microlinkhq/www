/* global IntersectionObserver */

import React, { useState, useEffect, useRef } from 'react'

const LazyRender = ({ onView, placeholder, options }) => {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const { current } = ref

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        observer.disconnect()
      }
    }, options)

    if (current) observer.observe(current)
    return () => current && observer.unobserve(current)
  }, [options])

  return <div ref={ref}>{isVisible ? onView() : placeholder()}</div>
}

export default LazyRender
