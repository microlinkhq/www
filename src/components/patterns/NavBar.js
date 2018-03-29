import { navigateTo } from 'gatsby-link'
import React, { Component } from 'react'
import { Changelog, Flex, Fixed, Toolbar, NavLink } from 'components/elements'
import { css } from 'styled-components'
import { colors } from 'theme'

const CustomNavLink = NavLink.extend`
  text-transform: uppercase;
  transition: all 0.1s ease-out;
  color: ${colors.gray7};
  box-shadow: none;

  &:hover {
    color: ${colors.gray9};
    box-shadow: ${colors.gray9} 0px -2px 0px inset;
  }

  ${props =>
    props.active &&
    css`
      color: ${colors.gray9};
      box-shadow: ${colors.gray9} 0px -2px 0px inset;
    `};
`

const CustomToolbar = Toolbar.extend`
  justify-content: center;
  box-shadow: rgb(206, 212, 218) 0 -5px 15px 0;
`

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      active: window.location.pathname
    }
  }

  render () {
    return (
      <Fixed zIndex={2} top={0} left={0} right={0}>
        <CustomToolbar
          bg='white'
          color='black50'
          mx='auto'
          style={{ height: '53px' }}
          {...this.props}
        >
          <CustomNavLink
            fontSize='12px'
            px={[2, 3]}
            children='Home'
            onClick={() => navigateTo('/')}
          />

          <CustomNavLink
            fontSize='12px'
            pl={0}
            pr={1}
            href='https://docs.microlink.io'
            target='_blank'
            children={
              <Flex px={[2, 3]}>
                <span>Docs</span>
                <Changelog />
              </Flex>
            }
          />

          <CustomNavLink
            fontSize='12px'
            px={[2, 3]}
            href='#pricing'
            children='Pricing'
          />

          <CustomNavLink
            fontSize='12px'
            px={[2, 3]}
            children='Blog'
            onClick={() => navigateTo('/blog')}
            active={this.state.active === '/blog'}
          />

          <CustomNavLink
            fontSize='12px'
            px={[2, 3]}
            href='https://chat.microlink.io'
            target='_blank'
            children='Chat'
          />
        </CustomToolbar>
      </Fixed>
    )
  }
}
