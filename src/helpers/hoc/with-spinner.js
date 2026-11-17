import React, { forwardRef } from 'react'
import styled from 'styled-components'
import SpinnerIcon from '../../components/elements/Spinner'

const SPINNER_SIZE = '1em'
const SPINNER_STYLE = { padding: 0 }

const Stack = styled.span`
  display: inline-grid;
  place-items: center;
`

const Layer = styled.span`
  grid-area: 1 / 1;
  display: inline-flex;
  align-items: center;
`

const HiddenLabel = styled(Layer)`
  opacity: 0;
`

export const withSpinner = ChildComponent => {
  const SpinnerWrapper = forwardRef(({ loading, children, ...props }, ref) => {
    if (!loading) {
      return (
        <ChildComponent ref={ref} {...props}>
          {children}
        </ChildComponent>
      )
    }

    return (
      <ChildComponent ref={ref} {...props} disabled aria-busy='true'>
        <Stack>
          <HiddenLabel>{children}</HiddenLabel>
          <Layer>
            <SpinnerIcon
              width={SPINNER_SIZE}
              height={SPINNER_SIZE}
              style={SPINNER_STYLE}
            />
          </Layer>
        </Stack>
      </ChildComponent>
    )
  })

  SpinnerWrapper.displayName = `withSpinner(${
    ChildComponent.displayName || ChildComponent.name || 'Component'
  })`

  return SpinnerWrapper
}
