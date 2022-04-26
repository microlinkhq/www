import { slug as slugger } from 'github-slugger'
import React, { createElement } from 'react'
import styled from 'styled-components'
import { colors } from 'theme'

import Svg from '../../components/elements/Svg'

const PermalinkIcon = props => (
  <Svg viewBox='0 0 16 16' width='16px' {...props}>
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

export const withSlug = Component => {
  const SlugWrapper = ({ children, slug, ...props }) => {
    if (typeof children !== 'string' || slug === false) {
      return createElement(Component, props, children)
    }

    const { id = slugger(children), ...rest } = props

    return (
      <Component id={id} {...rest}>
        <AnchorLink href={`#${id}`}>{children}</AnchorLink>
        <Permalink>
          <PermalinkIcon width='14px' ml={2} />
        </Permalink>
      </Component>
    )
  }

  return SlugWrapper
}
