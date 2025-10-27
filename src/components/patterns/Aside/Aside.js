import React, { createElement, useEffect, useState } from 'react'
import FeatherIcon from 'components/icons/Feather'
import { useBreakpoint } from 'context/breakpoint'
import Flex from 'components/elements/Flex'
import Box from 'components/elements/Box'
import styled from 'styled-components'
import { shadows, theme } from 'theme'
import { Menu, X } from 'react-feather'

import AsideBase from './AsideBase'
import { ASIDE_WIDTH } from './constants'

const MenuButton = styled('button')`
  cursor: pointer;
  z-index: 4;
  appearance: none;
  border: 0;
  margin: 0;
  padding: 0;
  background: transparent;
`

const AsideButton = ({ title, iconComponent, ...props }) => (
  <MenuButton aria-label={title} title={title} {...props}>
    {iconComponent}
  </MenuButton>
)

const css = `
  box-shadow: ${shadows[0]};
  background: white;
  z-index: 3;
  left: 0;
`

const AsideMobile = ({ children, ...props }) => {
  const [isOpen, setOpen] = useState(false)
  const toggleOpen = () => setOpen(!isOpen)
  const handleClose = () => setOpen(false)

  // Handle Escape key to close drawer
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Escape' && isOpen) {
        handleClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  // Handle click outside to close drawer
  useEffect(() => {
    const handleClickOutside = event => {
      const asideElement = document.querySelector('[data-aside]')
      const menuButton = event.target.closest(
        'button[aria-label="open aside menu"]'
      )

      if (
        isOpen &&
        asideElement &&
        !asideElement.contains(event.target) &&
        !menuButton
      ) {
        handleClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }
  }, [isOpen])

  return (
    <Box>
      <AsideBase
        CloseButton={
          <AsideButton
            title='close aside menu'
            iconComponent={
              <FeatherIcon
                icon={X}
                size={[1, 1, 2, 2]}
                onClick={handleClose}
                css={{ cursor: 'pointer' }}
              />
            }
          />
        }
        isOpen={isOpen}
        css={css}
        {...props}
      />
      <AsideButton
        title='open aside menu'
        iconComponent={
          <FeatherIcon
            icon={Menu}
            size={[1, 1, 2, 2]}
            onClick={toggleOpen}
            css={{ cursor: 'pointer' }}
          />
        }
      />
      <Flex css={theme({ flexDirection: 'column' })} as='section'>
        {children}
      </Flex>
    </Box>
  )
}

const AsideDesktop = ({ children, ...props }) => {
  return (
    <>
      <AsideBase isOpen {...props} />
      <Flex
        css={theme({
          pl: `calc(${ASIDE_WIDTH} + 14px)`,
          flexDirection: 'column'
        })}
        as='section'
      >
        {children}
      </Flex>
    </>
  )
}

const AsideResponsive = props =>
  createElement(useBreakpoint() === 0 ? AsideMobile : AsideDesktop, props)

const Aside = props => {
  useEffect(() => {
    const activeEl = document.querySelector('[data-aside-tree] .active')
    if (activeEl.textContent?.trim() !== 'Overview') {
      const asideContainer = document.querySelector('[data-aside]')

      const activeElOffset = activeEl.offsetTop
      const containerScrollTop = asideContainer.scrollTop

      // Use a default offset if the header no longer exists
      const headerHeight = 0

      const targetScroll = activeElOffset - headerHeight

      if (
        targetScroll > containerScrollTop ||
        activeElOffset < containerScrollTop
      ) {
        asideContainer.scrollTo({ top: targetScroll - 10, behavior: 'instant' })
      }
    }
  }, [])

  return <AsideResponsive {...props} />
}

export default Aside
