import React from 'react'
import Svg from 'components/elements/Svg'

export const GitCompare = props => (
  <Svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    width='24'
    height='24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    aria-label='Git Compare'
    {...props}
  >
    <circle cx='18' cy='18' r='3' />
    <circle cx='6' cy='6' r='3' />
    <path d='M13 6h3a2 2 0 0 1 2 2v7' />
    <path d='M11 18H8a2 2 0 0 1-2-2V9' />
  </Svg>
)
