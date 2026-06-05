import React from 'react'
import Svg from 'components/elements/Svg'

export const Camera = props => (
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
    aria-label='Camera'
    {...props}
  >
    <path d='M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3z' />
    <circle cx='12' cy='13' r='3' />
  </Svg>
)
