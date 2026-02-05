import React from 'react'
import Svg from '../elements/Svg'

export const Markdown = props => (
  <Svg
    xmlns='http://www.w3.org/2000/svg'
    width='16px'
    height='16px'
    ariaHidden='true'
    className='SVGInline-svg SVGInline--cleaned-svg SVG-svg Icon-svg Icon--markdown-svg Icon-color-svg Icon-color--gray600-svg'
    viewBox='0 0 208 128'
    {...props}
  >
    <path
      fillRule='evenodd'
      d='M15 10a5 5 0 0 0-5 5v98a5 5 0 0 0 5 5h178a5 5 0 0 0 5-5V15a5 5 0 0 0-5-5zM0 15C0 6.716 6.716 0 15 0h178c8.284 0 15 6.716 15 15v98c0 8.284-6.716 15-15 15H15c-8.284 0-15-6.716-15-15z'
      clipRule='evenodd'
    />
    <path d='M30 98V30h20l20 25 20-25h20v68H90V59L70 84 50 59v39zm125 0-30-33h20V30h20v35h20z' />
  </Svg>
)
