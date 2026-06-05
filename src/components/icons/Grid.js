import React from 'react'
import Svg from 'components/elements/Svg'

export const Grid = props => (
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
    aria-label='Grid'
    {...props}
  >
    <rect width='18' height='7' x='3' y='3' rx='1' />
    <rect width='7' height='7' x='3' y='14' rx='1' />
    <rect width='7' height='7' x='14' y='14' rx='1' />
  </Svg>
)
