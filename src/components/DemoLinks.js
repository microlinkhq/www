import React from 'react'
import {Avatar, Flex} from 'rebass'
import styled, {css} from 'styled-components'

const floatAnimation = css`
  display: inline-block;
  vertical-align: middle;
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px transparent;
  transition-duration: 0.3s;
  transition-property: transform;
  transition-timing-function: ease-out;

  &:hover {
    transform: translateY(-8px);
  }
`

const Logo = styled(Avatar)`
  border-radius: 8px;
  box-shadow: 0 16px 24px 0 rgba(127, 120, 118, 0.1);
  cursor: pointer;
  ${floatAnimation};
`

export default ({links, onClick, size, ...props}) => (
  <Flex width='100%' justify='space-between' wrap {...props}>
    {links.map(item => (
      <Logo
        size={size}
        p={[2, 1]}
        key={item.favicon}
        src={item.favicon}
        onClick={event => {
          event.preventDefault()
          onClick(item)
        }}
      />
    ))}
  </Flex>
)
