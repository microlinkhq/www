import React, { createElement } from 'react'
import { Svg } from 'components/elements'
import styled from 'styled-components'
import { title } from 'helpers'

import { colors } from 'theme'

const PermalinkIcon = props => (
  <Svg viewBox='0 0 16 16' width={16} {...props}>
    <g strokeWidth='1' fill='#000000' stroke='#000000'>
      <path
        fill='none'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeMiterlimit='10'
        d='M8.995,7.005 L8.995,7.005c1.374,1.374,1.374,3.601,0,4.975l-1.99,1.99c-1.374,1.374-3.601,1.374-4.975,0l0,0c-1.374-1.374-1.374-3.601,0-4.975 l1.748-1.698'
      />
      <path
        fill='none'
        stroke='#000000'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeMiterlimit='10'
        d='M7.005,8.995 L7.005,8.995c-1.374-1.374-1.374-3.601,0-4.975l1.99-1.99c1.374-1.374,3.601-1.374,4.975,0l0,0c1.374,1.374,1.374,3.601,0,4.975 l-1.748,1.698'
      />
    </g>
  </Svg>
)

const PermalinkTarget = styled.span`
  display: block;
  margin-top: -128px;
  padding-top: 128px;
  visibility: hidden;
  position: absolute;
`

const Permalink = styled.span`
  visibility: hidden;
  g {
    fill: ${colors.gray};
    stroke: ${colors.gray};
  }
  path:nth-child(2) {
    stroke: ${colors.gray};
  }
`

const AnchorLink = styled.a`
  text-decoration: none;
  color: inherit;

  &:hover {
    text-decoration: none;
    border-bottom: 1px ${colors.gray} dotted;
  }

  &:hover ~ span {
    visibility: visible;
  }
`

export default ChildComponent => {
  return ({ children, slug, ...props }) => {
    const isString = typeof children === 'string'

    if (isString && slug === false) {
      return createElement(ChildComponent, {
        children: title(children),
        ...props
      })
    }

    if (!isString) {
      return createElement(ChildComponent, { children, ...props })
    }

    const { id, ...rest } = props

    return (
      <ChildComponent {...rest}>
        <PermalinkTarget id={id} />
        <AnchorLink children={title(children)} href={`#${id}`} />
        <Permalink>
          <PermalinkIcon width={14} ml={2} />
        </Permalink>
      </ChildComponent>
    )
  }
}
