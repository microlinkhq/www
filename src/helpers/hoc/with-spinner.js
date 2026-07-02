import React, {
  createElement,
  forwardRef,
  useState,
  useEffect,
  useRef
} from 'react'
import SpinnerIcon from '../../components/elements/Spinner'
import Flex from '../../components/elements/Flex'

// fan a single DOM node out to several refs (object and/or callback refs)
const setRefs =
  (...refs) =>
    node =>
      refs.forEach(ref => {
        if (!ref) return
        if (typeof ref === 'function') ref(node)
        else ref.current = node
      })

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

  const SpinnerWrapper = forwardRef(
    ({ loading, children, ...props }, forwardedRef) => {
      const [width, setWidth] = useState(undefined)
      const [height, setHeight] = useState(undefined)
      const innerRef = useRef(null)

      useEffect(() => {
        // re-run when loading flips: a component that starts in the loading
        // state has no innerRef yet (SpinnerButton is rendered instead), so the
        // mount-only measurement would leave width/height undefined forever
        if (innerRef.current) {
          const computed = window.getComputedStyle(innerRef.current)
          setWidth(parseInt(computed.getPropertyValue('width')))
          setHeight(parseInt(computed.getPropertyValue('height')))
        }
      }, [loading])

      if (!loading) {
        return (
          <ChildComponent ref={setRefs(innerRef, forwardedRef)} {...props}>
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
  )

  SpinnerWrapper.displayName = `withSpinner(${
    ChildComponent.displayName || ChildComponent.name || 'Component'
  })`

  return SpinnerWrapper
}
