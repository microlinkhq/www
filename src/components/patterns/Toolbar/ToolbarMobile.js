import Box from 'components/elements/Box'
import Toolbar from 'components/elements/Toolbar'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import Image from 'components/elements/Image/Image'
import { Menu, X } from 'react-feather'
import styled from 'styled-components'
import { colors, theme } from 'theme'
import React, { useEffect, useState } from 'react'

import {
  DOCUMENTATION_NAV_ITEM,
  NAVIGATION_SECTIONS,
  NavMicrolinkLogo,
  PRICING_NAV_ITEM,
  ToolbarNavLink
} from './ToolbarLinks'

const LIST_RESET_STYLES = {
  listStyle: 'none',
  p: 0,
  m: 0
}

const MOBILE_MENU_ITEM_STYLES = {
  py: 2,
  px: 0,
  fontSize: 2,
  listStyle: 'none',
  display: 'flex',
  alignItems: 'center',
  gap: 2,
  whiteSpace: 'normal'
}

const MOBILE_TOP_LEVEL_LINK_STYLES = {
  py: 2,
  px: 0,
  fontSize: 2,
  fontWeight: 'bold',
  listStyle: 'none'
}

const MenuButton = styled('button')`
  border: 0;
  appearance: none;
  background: transparent;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: black;
  width: 44px;
  height: 44px;
  margin-right: -6px;
`

const MenuItemIcon = styled(Box)`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${colors.black70};
  background: #f1f3f5;
`

const MenuItemTitle = styled(Text)`
  display: block;
  color: ${colors.black90};
  ${theme({
    fontSize: 1,
    lineHeight: 0,
    fontFamily: 'sans',
    fontWeight: 'bold'
  })};
`

const MenuItemDescription = styled(Text)`
  display: block;
  margin-top: 2px;
  color: ${colors.black40};
  ${theme({
    fontSize: 0,
    lineHeight: 1
  })};
`

const ToolbarMobile = () => {
  const [isOpen, setOpen] = useState(false)

  const toggleOpen = () => setOpen(value => !value)
  const closeMenu = () => setOpen(false)

  useEffect(() => {
    if (!isOpen) return

    const body = document.body
    const previousOverflow = body.style.overflow

    const handleKeyDown = event => {
      if (event.key === 'Escape') closeMenu()
    }

    body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  return (
    <Box
      as='header'
      css={theme({
        position: 'fixed',
        zIndex: 101,
        top: 0,
        left: 0,
        right: 0,
        background: 'white'
      })}
    >
      <Toolbar
        as='nav'
        aria-label='Mobile Navigation'
        css={theme({
          justifyContent: 'space-between',
          px: 3
        })}
      >
        <NavMicrolinkLogo isMobile />
        <MenuButton
          type='button'
          aria-expanded={isOpen}
          aria-controls='toolbar-mobile-navigation'
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          onClick={toggleOpen}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </MenuButton>
      </Toolbar>
      {isOpen && (
        <Box
          id='toolbar-mobile-navigation'
          role='dialog'
          aria-label='Navigation'
          css={theme({
            'max-height': 'calc(100vh - 64px)',
            'overflow-y': 'auto',
            'border-top': '1px solid',
            'border-color': 'black10',
            background: 'white95',
            px: 3,
            py: 3
          })}
        >
          {NAVIGATION_SECTIONS.map(({ label, description, items }) => (
            <Box key={label} css={theme({ mb: 4 })}>
              <Text
                as='p'
                css={theme({
                  color: 'black40',
                  fontSize: 1,
                  mb: 0
                })}
              >
                {label}
              </Text>
              <Text
                as='p'
                css={theme({
                  color: 'black50',
                  fontSize: 0,
                  lineHeight: 2,
                  mt: 1,
                  mb: 2
                })}
              >
                {description}
              </Text>
              <Flex
                as='ul'
                css={theme({
                  flexDirection: 'column',
                  ...LIST_RESET_STYLES
                })}
              >
                {items.map(
                  ({
                    label,
                    href,
                    actively,
                    title,
                    externalIcon,
                    description,
                    logo,
                    icon: Icon
                  }) => (
                    <ToolbarNavLink
                      key={label}
                      forwardedAs='li'
                      href={href}
                      actively={actively}
                      title={title}
                      externalIcon={externalIcon}
                      data-event-location='Toolbar'
                      data-event-name={label}
                      onClick={closeMenu}
                      css={theme(MOBILE_MENU_ITEM_STYLES)}
                    >
                      <MenuItemIcon as='span'>
                        {logo ? (
                          <Image
                            src={logo}
                            width='15px'
                            height='15px'
                            alt={label}
                          />
                        ) : (
                          <Icon size={15} />
                        )}
                      </MenuItemIcon>
                      <Box as='span'>
                        <MenuItemTitle as='span'>{label}</MenuItemTitle>
                        <MenuItemDescription as='span'>
                          {description}
                        </MenuItemDescription>
                      </Box>
                    </ToolbarNavLink>
                  )
                )}
              </Flex>
            </Box>
          ))}
          <Box css={theme({ pt: 1, pb: 2 })}>
            <Box as='ul' css={theme(LIST_RESET_STYLES)}>
              <ToolbarNavLink
                forwardedAs='li'
                href={DOCUMENTATION_NAV_ITEM.href}
                actively={DOCUMENTATION_NAV_ITEM.actively}
                data-event-location='Toolbar'
                data-event-name={DOCUMENTATION_NAV_ITEM.label}
                onClick={closeMenu}
                css={theme(MOBILE_TOP_LEVEL_LINK_STYLES)}
              >
                {DOCUMENTATION_NAV_ITEM.label}
              </ToolbarNavLink>
              <ToolbarNavLink
                forwardedAs='li'
                href={PRICING_NAV_ITEM.href}
                actively={PRICING_NAV_ITEM.actively}
                data-event-location='Toolbar'
                data-event-name={PRICING_NAV_ITEM.label}
                onClick={closeMenu}
                css={theme(MOBILE_TOP_LEVEL_LINK_STYLES)}
              >
                {PRICING_NAV_ITEM.label}
              </ToolbarNavLink>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default ToolbarMobile
