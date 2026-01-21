import React, { createElement, useState, useEffect, useRef } from 'react'
import SpinnerIcon from '../../components/elements/Spinner'
import Flex from '../../components/elements/Flex'

export const withSpinner = ChildComponent => {
  const SpinnerButton = ({ children, originalLabel, ...props }) => (
    <ChildComponent state='hover' aria-busy='true' {...props}>
      <Flex
        css={{
          justifyContent: 'center',
          textAlign: 'center',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        {children}
        <span css={{ opacity: originalLabel ? 1 : 0 }}>{originalLabel}</span>
      </Flex>
    </ChildComponent>
  )

  const SpinnerWrapper = ({ loading, children, ...props }) => {
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
      return (
        <ChildComponent ref={ref} {...props}>
          {children}
        </ChildComponent>
      )
    }

    const spinnerElement = createElement(SpinnerIcon, {
      width: '20px',
      height: '20px'
    })

    return createElement(
      SpinnerButton,
      {
        ...props,
        disabled: true,
        originalLabel: children,
        style: { minWidth: width, minHeight: height, cursor: 'wait' }
      },
      spinnerElement
    )
  }

  return SpinnerWrapper
}
