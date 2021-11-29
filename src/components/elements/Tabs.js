import React from 'react'
import styled from 'styled-components'

const Tabs = props => (
  <StyledTabs {...props}>
    {props.tabs.map(lang => (
      <StyledTab
        active={lang === props.value}
        key={lang}
        color={props.color}
        background={props.background}
      >
        {lang}
      </StyledTab>
    ))}
  </StyledTabs>
)

const StyledTabs = styled('div')`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

const StyledTab = styled('div')`
  width: 100%;
  text-align: center;
  cursor: pointer;
  transition: .4s;
  padding: 3px;
  /* color: ${props => props.color}; */
  /* background-color: ${props => props.background}; */
  color: white;
  background: ${props =>
    props.active
      ? 'radial-gradient(136.36% 136.36% at 50.24% -36.36%, #3d434c 0%, #2d333b 100%);'
      : 'rgba(27,31,35,.6)'};
  &:hover {
    background-color: #24292e;
  }
`

export default Tabs
