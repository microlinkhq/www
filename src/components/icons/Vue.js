import React from 'react'
import Svg from '../elements/Svg'

export const Vue = ({ color = '#41B883', secondary = '#34495E', ...props }) => (
  <Svg
    xmlns='http://www.w3.org/2000/svg'
    version='1.1'
    viewBox='0 0 262 227'
    {...props}
  >
    <path
      d='M161.101 0L130.877 52.3508L100.652 0H0L130.877 226.688L261.753 0H161.101Z'
      fill={color}
    />
    <path
      d='M161.101 0L130.877 52.3508L100.652 0H52.3507L130.877 136.01L209.403 0H161.101Z'
      fill={secondary}
    />
  </Svg>
)
