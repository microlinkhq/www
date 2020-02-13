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
      d='M161.101 7.33846e-05L130.877 52.3508L100.652 7.33846e-05H0L130.877 226.688L261.753 7.33846e-05H161.101Z'
      fill={color}
    />
    <path
      d='M161.101 7.44816e-05L130.877 52.3508L100.652 7.44816e-05H52.3507L130.877 136.01L209.403 7.44816e-05H161.101Z'
      fill={secondary}
    />
  </Svg>
)
