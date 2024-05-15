import styled from 'styled-components'
import { cx, theme } from 'theme'
import is from 'styled-is'
import React from 'react'

import Text from './Text'
import Flex from './Flex'
import Box from './Box'

const getColor = ({ isActive, isDark }) => {
  const id = isDark ? 'white' : 'red'
  return cx(isActive ? id : `${id}50`)
}

const StyledTab = styled(Box)`
  list-style: none;
  width: 100%;
  text-align: center;
  cursor: pointer;
  margin-right: 12px;
  ${theme({ pb: 2 })}
  ${is('$active')`
    color: ${props => getColor(props)};
    border-bottom: 1px solid ${props => props.background};
  `};
`

const Tabs = ({ children, ...props }) => (
  <Flex
    as='ul'
    css={{
      justifyContent: 'space-between',
      margin: 0,
      padding: 0,
      width: '100%',
      position: 'relative'
    }}
    {...props}
  >
    {children.map(lang => {
      const isActive = lang === props.value
      return (
        <StyledTab key={lang} as='li' $active={isActive}>
          <Text
            css={theme({
              lineHeight: 0,
              fontSize: '12px'
            })}
          >
            {lang}
          </Text>
        </StyledTab>
      )
    })}
  </Flex>
)

export default Tabs
