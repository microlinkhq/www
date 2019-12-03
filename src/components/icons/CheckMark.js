import React from 'react'
import Svg from '../elements/Svg'

export const CheckMark = props => (
  <Svg
    width='14px'
    height='12px'
    viewBox='0 0 14 12'
    version='1.1'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <g stroke='none' strokeWidth={1} fill='none' fillRule='evenodd'>
      <g>
        <rect
          fill='#067df7'
          x={0}
          y={0}
          width='12.4444444'
          height={12}
          rx={3}
        />{' '}
        <path
          d='M4,6 L6.19988776,8.12132034'
          stroke='#f5f4f9'
          strokeWidth='1.5'
          strokeLinecap='square'
        />{' '}
        <path
          d='M6,1.75 L12.5996633,8.11396103'
          stroke='#f5f4f9'
          strokeWidth='1.5'
          strokeLinecap='square'
          transform='translate(9.299832, 4.931981) scale(-1, 1) translate(-9.299832, -4.931981) '
        />
      </g>
    </g>
  </Svg>
)
