import React, { useEffect, useState } from 'react'
import FeatherIcon from 'components/icons/Feather'
import Flex from 'components/elements/Flex'
import Box from 'components/elements/Box'
import { Menu, X } from 'react-feather'
import styled from 'styled-components'
import { shadows, theme } from 'theme'
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

const Aside = ({ children, ...props }) => {
  const [isOpen, setOpen] = useState(false)
  const toggleOpen = () => setOpen(!isOpen)
  const handleClose = () => setOpen(false)

  // Handle Escape key to close drawer
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        handleClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  // Handle click outside to close drawer
  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = event => {
      const asideElement = Array.from(
        document.querySelectorAll('[data-aside]')
      ).find(element => element.offsetParent !== null)
      const menuButton = event.target.closest(
        'button[aria-label="open aside menu"]'
      )

      if (asideElement && !asideElement.contains(event.target) && !menuButton) {
        handleClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  useEffect(() => {
    const activeEl = document.querySelector('[data-aside-tree] .active')
    if (!activeEl) return

    if (activeEl.textContent?.trim() !== 'Overview') {
      const asideContainer = Array.from(
        document.querySelectorAll('[data-aside]')
      ).find(element => element.offsetParent !== null)
      if (!asideContainer) return

      const activeElOffset = activeEl.offsetTop
      const containerScrollTop = asideContainer.scrollTop
      const headerHeight = 0
      const targetScroll = activeElOffset - headerHeight

      if (
        targetScroll > containerScrollTop ||
        activeElOffset < containerScrollTop
      ) {
        asideContainer.scrollTo({ top: targetScroll - 60, behavior: 'instant' })
      }
    }
  }, [])

  return (
    <>
      <Box css={theme({ display: ['block', 'none', 'none', 'none'] })}>
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
      </Box>
      <AsideBase
        isOpen
        css={theme({
          display: ['none', 'block', 'block', 'block']
        })}
        {...props}
      />
      <Flex
        css={theme({
          pl: [
            0,
            `calc(${ASIDE_WIDTH} + 14px)`,
            `calc(${ASIDE_WIDTH} + 14px)`,
            `calc(${ASIDE_WIDTH} + 14px)`
          ],
          flexDirection: 'column'
        })}
        as='section'
      >
        {children}
      </Flex>
    </>
  )
}

export default Aside
