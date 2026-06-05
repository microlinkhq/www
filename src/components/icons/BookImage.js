import React from 'react'
import Svg from 'components/elements/Svg'

export const BookImage = props => (
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
    aria-label='Book Image'
    {...props}
  >
    <path d='m20 13.7-2.1-2.1a2 2 0 0 0-2.8 0L9.7 17' />
    <path d='M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20' />
    <circle cx='10' cy='8' r='2' />
  </Svg>
)
