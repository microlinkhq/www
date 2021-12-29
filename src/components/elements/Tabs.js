import styled from 'styled-components'
import { space } from 'theme'
import is from 'styled-is'
import React from 'react'

import Text from './Text'
import Flex from './Flex'
import Box from './Box'

const Tabs = ({ children, ...props }) => (
  <Flex
    as='ul'
    justifyContent='space-between'
    style={{
      margin: 0,
      padding: 0,
      width: '100%',
      position: 'relative'
    }}
    {...props}
  >
    {children.map(lang => (
      <StyledTab
        as='li'
        active={lang === props.value}
        key={lang}
        color={props.color}
        background={props.background}
      >
        <Text lineHeight={0} fontSize='12px'>
          {lang}
        </Text>
      </StyledTab>
    ))}
  </Flex>
)

const StyledTab = styled(Box)`
  list-style: none;
  width: 100%;
  text-align: center;
  cursor: pointer;
  margin: 0 48px;
  padding-bottom: ${space[2]};

  ${is('active')`
    border-bottom: 1px solid ${props => props.background};
  `};
`

export default Tabs
