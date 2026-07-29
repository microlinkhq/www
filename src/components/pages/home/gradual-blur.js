import { theme } from 'theme'
import React from 'react'
import styled from 'styled-components'

const LAYERS = [
  {
    blur: '0.218rem',
    mask: 'transparent 0%, black 20%, black 40%, transparent 60%'
  },
  {
    blur: '0.379rem',
    mask: 'transparent 20%, black 40%, black 60%, transparent 80%'
  },
  {
    blur: '0.66rem',
    mask: 'transparent 40%, black 60%, black 80%, transparent 100%'
  },
  {
    blur: '1.149rem',
    mask: 'transparent 60%, black 80%, black 100%'
  },
  {
    blur: '2rem',
    mask: 'transparent 80%, black 100%'
  }
]

const Root = styled.div.attrs({
  'aria-hidden': true,
  className: 'hidden-print'
})`
  pointer-events: none;

  ${theme({
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: ['80px', '80px', '140px', '140px'],
    zIndex: 10
  })};
`

const Inner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

const Layer = styled.div`
  position: absolute;
  inset: 0;
  backdrop-filter: blur(${props => props.$blur});
  -webkit-backdrop-filter: blur(${props => props.$blur});
  mask-image: linear-gradient(to bottom, ${props => props.$mask});
  -webkit-mask-image: linear-gradient(to bottom, ${props => props.$mask});
`

const GradualBlur = () => (
  <Root>
    <Inner>
      {LAYERS.map(({ blur, mask }) => (
        <Layer key={blur} $blur={blur} $mask={mask} />
      ))}
    </Inner>
  </Root>
)

export default GradualBlur
