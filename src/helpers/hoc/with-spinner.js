import React, { createElement, useState, useEffect, useRef } from 'react'
import SpinnerIcon from '../../components/elements/Spinner'
import Flex from '../../components/elements/Flex'

export const withSpinner = ChildComponent => {
  const SpinnerButton = ({ children, ...props }) => (
    <ChildComponent state='hover' {...props}>
      <Flex justifyContent='center' textAlign='center'>
        {children}
      </Flex>
    </ChildComponent>
  )

  const SpinnerWrapper = ({ loading, ...props }) => {
    const [width, setWidth] = useState(undefined)
    const [height, setHeight] = useState(undefined)
    const ref = useRef(null)

    useEffect(() => {
      if (ref.current) {
        const computed = window.getComputedStyle(ref.current)
        setWidth(parseInt(computed.getPropertyValue('width')))
        setHeight(parseInt(computed.getPropertyValue('height')))
      }
    }, [])

    if (!loading) {
      return <ChildComponent ref={ref} {...props} />
    }

    const children = createElement(SpinnerIcon)

    return createElement(
      SpinnerButton,
      {
        ...props,
        disabled: true,
        style: { width, height, cursor: 'wait' }
      },
      children
    )
  }

  return SpinnerWrapper
}
