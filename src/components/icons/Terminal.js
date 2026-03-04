import React from 'react'
import Svg from 'components/elements/Svg'

export const Terminal = props => (
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
    aria-label='Terminal'
    {...props}
  >
    <path d='M12 19h8' />
    <path d='m4 17 6-6-6-6' />
  </Svg>
)
