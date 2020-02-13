import React from 'react'
import Svg from '../elements/Svg'

export const Angular = ({
  color = '#DD0031',
  secondary = '#C3002F',
  ...props
}) => (
  <Svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 187 200'
    fill='none'
    {...props}
  >
    <path
      d='M93.1 22.1V0l93.1 33.2L172 156.3 93.1 200v-76.6h24.6l11.7 29.2h21.7l-58-130.5z'
      fill={secondary}
    />
    <path d='M93.1 105.4V64.5l17 40.9h-17z' fill={secondary} />
    <path
      d='M93.1 0L0 33.2l14.2 123.1L93.1 200v-76.6H68.3l-11.7 29.2H34.9L93.1 22.1V0z'
      fill={color}
    />
    <path d='M93.1 64.5l-17 40.9h17V64.5z' fill={color} />
  </Svg>
)
