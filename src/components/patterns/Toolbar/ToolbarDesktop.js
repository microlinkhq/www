import React, { Component } from 'react'
import { Toolbar, Box, Fixed } from 'components/elements'
import { Microlink } from 'components/logos'
import { navigate } from 'gatsby'

import NavContainer from './NavContainer'
import NavLink from './NavLink'

export default class extends Component {
  render () {
    return (
      <Fixed zIndex={2} top={0} left={0} right={0}>
        <Box px={3} boxShadow={0} mx='auto' bg='white'>
          <Toolbar
            aria-label='Primary Navigation'
            mx='auto'
            justifyContent='space-between'
            {...this.props}
          >
            <NavContainer as='nav'>
              <NavLink
                data-event-category='Toolbar'
                data-event-action='Logo'
                onContextMenu={event => {
                  event.preventDefault()
                  navigate('/design')
                }}
                href='/'
                width={['32px', '48px']}
                display='flex'
                pr={[2, 3]}
              >
                <Microlink size={'100%'} />
              </NavLink>
              <NavLink
                data-event-category='Toolbar'
                data-event-action='Principles'
                pr={[2, 3]}
                children='Principles'
                href='/#principles'
                actively='observer'
              />
              <NavLink
                data-event-category='Toolbar'
                data-event-action='Pricing'
                pr={[2, 3]}
                children='Pricing'
                href='/#pricing'
                actively='observer'
              />
              <NavLink
                data-event-category='Toolbar'
                data-event-action='Embed'
                href='/embed'
                children='Embed'
                actively='partial'
              />
              <NavLink
                data-event-category='Toolbar'
                data-event-action='Docs'
                href='/docs/sdk/getting-started/overview/'
                children='Docs'
                actively='partial'
              />
              <NavLink
                data-event-category='Toolbar'
                data-event-action='Blog'
                href='/blog'
                children='Blog'
                actively='partial'
              />
            </NavContainer>
            <NavContainer as='nav'>
              <NavLink
                data-event-category='Toolbar'
                data-event-action='Chat'
                children='Chat'
                href='/chat'
                actively
              />
            </NavContainer>
          </Toolbar>
        </Box>
      </Fixed>
    )
  }
}
