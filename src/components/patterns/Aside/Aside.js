import React, { createElement, useEffect, useState } from 'react'
import { Menu as MenuIcon, X as CloseIcon } from 'react-feather'
import { useBreakpoint } from 'context/breakpoint'
import { Box, Flex } from 'components/elements'
import styled from 'styled-components'
import { shadows } from 'theme'

import AsideBase from './AsideBase'

import { ASIDE_WIDTH } from './constants'

const ICON_SIZE = 20

const MenuButton = styled('button')`
  cursor: pointer;
  z-index: 4;
  appearance: none;
  border: 0;
  margin: 0;
  padding: 0;
  outline: 0;
  background: transparent;
`

const AsideButton = ({ title, iconComponent, ...props }) => (
  <MenuButton aria-label={title} title={title} {...props}>
    {iconComponent}
  </MenuButton>
)

const AsideMobile = ({ children, ...props }) => {
  const [isOpen, setOpen] = useState(false)
  const toggleOpen = () => setOpen(!isOpen)

  const css = `
  box-shadow: ${shadows[0]};
    background: white;
    z-index: 3;
    left: 0;
  `

  return (
    <Box>
      <AsideBase
        CloseButton={
          <AsideButton
            title='close aside menu'
            iconComponent={<CloseIcon size={ICON_SIZE} onClick={toggleOpen} />}
          />
        }
        isOpen={isOpen}
        css={css}
        {...props}
      />
      <AsideButton
        title='open aside menu'
        iconComponent={<MenuIcon size={ICON_SIZE} onClick={toggleOpen} />}
      />
      <Flex flexDirection='column' as='section'>
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
        pl={`calc(${ASIDE_WIDTH} + 14px)`}
        flexDirection='column'
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
    if (activeEl) {
      const elOffset = activeEl.offsetTop

      const offset = document
        .querySelector('[data-aside-header]')
        .getBoundingClientRect().y

      const minOffset = offset * 2

      if (elOffset > minOffset) {
        const top = elOffset - offset

        document
          .querySelector('[data-aside]')
          .scrollTo({ top, behavior: 'instant' })
      }
    }
  }, [])

  return <AsideResponsive {...props} />
}

export default Aside
