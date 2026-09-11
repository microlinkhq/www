import React from 'react'

const Svg = ({ children, ...props }) => (
  <svg
    width='14'
    height='14'
    viewBox='0 0 16 16'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    aria-hidden='true'
    {...props}
  >
    {children}
  </svg>
)

export const IconPlus = () => (
  <Svg>
    <path
      d='M8 3v10M3 8h10'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
    />
  </Svg>
)

export const IconReset = () => (
  <Svg>
    <path
      d='M3.5 8A4.5 4.5 0 1 0 4 5.2'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
    />
    <path
      d='M3 2.5v3h3'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </Svg>
)

export const IconPlay = () => (
  <Svg>
    <path d='M5 3.5v9l8-4.5-8-4.5z' fill='currentColor' />
  </Svg>
)

export const IconCopy = () => (
  <Svg>
    <rect
      x='5.5'
      y='5.5'
      width='7'
      height='8'
      rx='1.2'
      stroke='currentColor'
      strokeWidth='1.5'
    />
    <path
      d='M3.5 10.5V3.8A1.3 1.3 0 0 1 4.8 2.5h5.7'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
    />
  </Svg>
)

export const IconClose = () => (
  <Svg width='10' height='10' viewBox='0 0 12 12'>
    <path
      d='M3 3l6 6M9 3L3 9'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
    />
  </Svg>
)
