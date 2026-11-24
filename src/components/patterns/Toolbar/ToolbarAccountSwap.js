import React, { forwardRef, useCallback, useState } from 'react'
import styled, { css, keyframes } from 'styled-components'
import { space, speed, theme, timings } from 'theme'

import { isLayerHidden, swapLayerState } from './account-swap'

const SWAP_SHIFT = space[1]
const SWAP_ANIMATION = `${speed.quickly}ms ${timings.long} both`

const fadeIn = keyframes`
  from { opacity: 0 }
  to { opacity: 1 }
`

const fadeOut = keyframes`
  from { opacity: 1 }
  to { opacity: 0 }
`

const slideIn = keyframes`
  from { opacity: 0; transform: translateY(${SWAP_SHIFT}) }
  to { opacity: 1; transform: translateY(0) }
`

const slideOut = keyframes`
  from { opacity: 1; transform: translateY(0) }
  to { opacity: 0; transform: translateY(-${SWAP_SHIFT}) }
`

const swapAnimation = (fade, slide) => css`
  animation: ${fade} ${SWAP_ANIMATION};

  @media (prefers-reduced-motion: no-preference) {
    animation-name: ${slide};
  }
`

const SWAP_ANIMATIONS = {
  in: swapAnimation(fadeIn, slideIn),
  out: swapAnimation(fadeOut, slideOut)
}

export const SwapStack = styled.div`
  ${theme({
    display: 'inline-grid',
    alignItems: 'center',
    justifyItems: 'start'
  })};
`

const Layer = styled.div`
  ${({ $state, $hidden }) =>
    theme({
      gridArea: '1 / 1',
      display: $state === 'hidden' ? 'none' : 'flex',
      alignItems: 'center',
      gap: 2,
      opacity: $hidden ? 0 : 1,
      pointerEvents: $hidden ? 'none' : 'auto'
    })};
  ${({ $state }) => SWAP_ANIMATIONS[$state]};
`

export const useSwap = active => {
  const [swap, setSwap] = useState({ current: active, previous: null })
  if (active !== swap.current) {
    setSwap({ current: active, previous: swap.current })
  }
  const settle = useCallback(
    () =>
      setSwap(latest =>
        latest.previous === null ? latest : { ...latest, previous: null }
      ),
    []
  )
  return { ...swap, settle }
}

const settleOnOwnEnd = settle => event => {
  if (event.target === event.currentTarget) settle()
}

export const SwapLayer = forwardRef(
  ({ layer, swap, children, ...props }, ref) => {
    const state = swapLayerState(layer, swap)
    const hidden = isLayerHidden(state)
    return (
      <Layer
        ref={ref}
        $state={state}
        $hidden={hidden}
        aria-hidden={hidden ? 'true' : undefined}
        inert={hidden ? '' : undefined}
        onAnimationEnd={
          state === 'out' ? settleOnOwnEnd(swap.settle) : undefined
        }
        {...props}
      >
        {children}
      </Layer>
    )
  }
)
