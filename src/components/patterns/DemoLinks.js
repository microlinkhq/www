import React from 'react'
import styled, { css } from 'styled-components'
import { Avatar, Flex } from 'components/elements'
import { imageProxy } from 'react-microlink'

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
  box-shadow: none;
  cursor: pointer;
  ${floatAnimation};
`

export default ({ children, onClick, size, ...props }) => (
  <Flex
    width='100%'
    justifyContent='center'
    alignItems='center'
    flexWrap='wrap'
    {...props}
  >
    {children.map(data => (
      <Logo
        mr={1}
        mb={1}
        size={size}
        p={1}
        key={data.url}
        src={imageProxy(data.logo.url)}
        onClick={event => {
          event.preventDefault()
          onClick(data)
        }}
      />
    ))}
  </Flex>
)
