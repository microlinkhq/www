import Box from 'components/elements/Box'
import Toolbar, {
  TOOLBAR_PRIMARY_MOBILE_HEIGHT
} from 'components/elements/Toolbar'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import Caps from 'components/elements/Caps'
import FeatherIcon from 'components/icons/Feather'
import { useLocation } from '@gatsbyjs/reach-router'
import { ChevronDown, Menu, X } from 'react-feather'
import styled from 'styled-components'
import { colors, fontWeights, theme, transition } from 'theme'
import React, { useEffect, useState } from 'react'

import {
  DIRECT_NAV_ITEMS,
  NAVIGATION_SECTIONS,
  NavMicrolinkLogo,
  ToolbarNavLink,
  getToolbarSectionFromPathname
} from './ToolbarLinks'
import {
  TOOLBAR_CHEVRON_ICON_SIZE,
  TOOLBAR_LIST_RESET_STYLES,
  TOOLBAR_MENU_ITEM_DESCRIPTION_STYLES,
  TOOLBAR_MENU_ITEM_MEDIA_STYLES,
  TOOLBAR_MENU_ITEM_TITLE_STYLES,
  TOOLBAR_SECTION_DESCRIPTION_STYLES,
  TOOLBAR_TOP_LEVEL_CAPS_STYLES
} from './ToolbarStyles'
import ToolbarMenuItemMedia from './ToolbarMenuItemMedia'

const MOBILE_MENU_ITEM_STYLES = {
  py: 1,
  px: 0,
  fontSize: 2,
  listStyle: 'none',
  display: 'flex',
  alignItems: 'center',
  gap: 2,
  whiteSpace: 'normal'
}

const MOBILE_DIRECT_NAV_LABEL_STYLES = {
  ...TOOLBAR_TOP_LEVEL_CAPS_STYLES,
  color: 'black80'
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
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${colors.black70};
  transition: color ${transition.medium};
`

const MenuItemTitle = styled(Text)`
  transition: color ${transition.medium}, font-weight ${transition.medium};
  ${theme(TOOLBAR_MENU_ITEM_TITLE_STYLES)};
`

const MenuItemDescription = styled(Text)`
  margin-top: 2px;
  transition: color ${transition.medium};
  ${theme(TOOLBAR_MENU_ITEM_DESCRIPTION_STYLES)};
`

const SectionContainer = styled(Box)`
  ${theme({
    borderRadius: 2
  })};
`

const MobileMenuItemLink = styled(ToolbarNavLink)`
  border-radius: 12px;

  > a {
    border-radius: inherit;
    align-items: baseline;
    padding: 8px 12px;
    transition: background-color ${transition.medium};
  }

  &:hover > a,
  &:focus-within > a,
  > .active {
    background: ${colors.black05};
  }

  &:hover .menu-item-title,
  &:focus-within .menu-item-title,
  > .active .menu-item-title {
    color: ${colors.black};
    font-weight: ${fontWeights.bold};
  }

  &:hover .menu-item-description,
  &:focus-within .menu-item-description,
  > .active .menu-item-description,
  &:hover
    ${MenuItemIcon},
    &:focus-within
    ${MenuItemIcon},
    > .active
    ${MenuItemIcon} {
    color: ${colors.black};
  }
`

const MobileDirectNavLink = styled(ToolbarNavLink)`
  border-radius: 12px;

  > a {
    border-radius: inherit;
    padding: 8px 12px;
    transition: background-color ${transition.medium},
      color ${transition.medium};
  }

  &:hover > a,
  &:focus-within > a,
  > .active {
    background: ${colors.black05};
    color: ${colors.black};
  }
`

const SectionToggle = styled('button').withConfig({
  shouldForwardProp: prop => !['isExpanded'].includes(prop)
})`
  appearance: none;
  border: 0;
  background: transparent;
  color: ${colors.black80};
  cursor: pointer;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${theme({
    borderRadius: 2,
    pt: 2,
    pb: 0,
    mt: 2
  })};
  transition: color ${transition.medium};
`

const SectionChevron = styled(FeatherIcon).withConfig({
  shouldForwardProp: prop => !['isExpanded'].includes(prop)
})`
  color: ${colors.black60};
  transform: rotate(${({ isExpanded }) => (isExpanded ? '0deg' : '-90deg')});
  transition: transform ${transition.medium}, color ${transition.medium};
`

const SectionContent = styled(Box).withConfig({
  shouldForwardProp: prop => !['isExpanded'].includes(prop)
})`
  overflow: hidden;
  max-height: ${({ isExpanded }) => (isExpanded ? '1200px' : '0px')};
  opacity: ${({ isExpanded }) => (isExpanded ? 1 : 0)};
  transform: translateY(${({ isExpanded }) => (isExpanded ? '0px' : '-4px')});
  transition: max-height ${transition.long}, opacity ${transition.short},
    transform ${transition.medium};
  pointer-events: ${({ isExpanded }) => (isExpanded ? 'auto' : 'none')};
`

const MobileMenuPanel = styled(Box).withConfig({
  shouldForwardProp: prop => !['isOpen'].includes(prop)
})`
  transform-origin: top center;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  transform: translateY(${({ isOpen }) => (isOpen ? '0px' : '-8px')});
  pointer-events: ${({ isOpen }) => (isOpen ? 'auto' : 'none')};
  transition: opacity ${transition.medium}, transform ${transition.medium};
`

const toMobileSectionDomId = label =>
  `mobile-toolbar-section-${String(label).toLowerCase().replace(/\s+/g, '-')}`

const ToolbarMobile = () => {
  const location = useLocation()
  const [isOpen, setOpen] = useState(false)
  const [openSection, setOpenSection] = useState('')

  const closeMenu = () => {
    setOpen(false)
    setOpenSection('')
  }

  const toggleOpen = () => setOpen(value => !value)

  const toggleSection = label => {
    setOpenSection(currentLabel => (currentLabel === label ? '' : label))
  }

  useEffect(() => {
    if (!isOpen) return
    const activeSection = getToolbarSectionFromPathname(location.pathname)
    setOpenSection(activeSection || '')
  }, [isOpen, location.pathname])

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
          px: 3
        })}
      >
        <Flex
          css={theme({
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-between'
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
        </Flex>
      </Toolbar>
      <MobileMenuPanel
        isOpen={isOpen}
        id='toolbar-mobile-navigation'
        role='dialog'
        aria-label='Navigation'
        aria-hidden={!isOpen}
        inert={!isOpen ? '' : undefined}
        css={theme({
          height: `calc(100dvh - ${TOOLBAR_PRIMARY_MOBILE_HEIGHT})`,
          'min-height': `calc(100vh - ${TOOLBAR_PRIMARY_MOBILE_HEIGHT})`,
          'max-height': `calc(100vh - ${TOOLBAR_PRIMARY_MOBILE_HEIGHT})`,
          'overflow-y': 'auto',
          borderTop: 1,
          borderColor: 'black10',
          background: 'white95',
          p: '12px'
        })}
      >
        <Box as='ul' css={theme(TOOLBAR_LIST_RESET_STYLES)}>
          {NAVIGATION_SECTIONS.map(({ label, description, items }) => {
            const isExpanded = openSection === label

            return (
              <Box as='li' key={label}>
                <SectionContainer>
                  <SectionToggle
                    type='button'
                    isExpanded={isExpanded}
                    aria-expanded={isExpanded}
                    aria-controls={toMobileSectionDomId(label)}
                    onClick={() => toggleSection(label)}
                  >
                    <Caps as='span' css={theme(TOOLBAR_TOP_LEVEL_CAPS_STYLES)}>
                      {label}
                    </Caps>
                    <SectionChevron
                      icon={ChevronDown}
                      isExpanded={isExpanded}
                      size={TOOLBAR_CHEVRON_ICON_SIZE}
                    />
                  </SectionToggle>
                  <SectionContent
                    isExpanded={isExpanded}
                    aria-hidden={!isExpanded}
                  >
                    <Text
                      as='p'
                      css={theme({
                        ...TOOLBAR_SECTION_DESCRIPTION_STYLES,
                        mt: 0,
                        mb: 0,
                        px: 2,
                        pb: 2
                      })}
                    >
                      {description}
                    </Text>
                  </SectionContent>
                </SectionContainer>
                <SectionContent
                  isExpanded={isExpanded}
                  aria-hidden={!isExpanded}
                >
                  <Flex
                    id={toMobileSectionDomId(label)}
                    as='ul'
                    css={theme({
                      flexDirection: 'column',
                      ...TOOLBAR_LIST_RESET_STYLES,
                      mt: 1,
                      mb: 2
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
                        <MobileMenuItemLink
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
                            <ToolbarMenuItemMedia
                              label={label}
                              logo={logo}
                              icon={Icon}
                              iconCss={theme(
                                label === 'Markdown'
                                  ? {
                                    ...TOOLBAR_MENU_ITEM_MEDIA_STYLES,
                                    top: 0
                                  }
                                  : TOOLBAR_MENU_ITEM_MEDIA_STYLES
                              )}
                              imageCss={theme(TOOLBAR_MENU_ITEM_MEDIA_STYLES)}
                            />
                          </MenuItemIcon>
                          <Box as='span'>
                            <MenuItemTitle
                              as='span'
                              className='menu-item-title'
                            >
                              {label}
                            </MenuItemTitle>
                            <MenuItemDescription
                              as='span'
                              className='menu-item-description'
                            >
                              {description}
                            </MenuItemDescription>
                          </Box>
                        </MobileMenuItemLink>
                      )
                    )}
                  </Flex>
                </SectionContent>
              </Box>
            )
          })}
        </Box>
        <Box css={theme({ pt: 0, pb: 2 })}>
          <Box as='ul' css={theme(TOOLBAR_LIST_RESET_STYLES)}>
            {DIRECT_NAV_ITEMS.map(({ label, href, actively }) => (
              <MobileDirectNavLink
                key={label}
                forwardedAs='li'
                href={href}
                actively={actively}
                data-event-location='Toolbar'
                data-event-name={label}
                onClick={closeMenu}
              >
                <Caps as='span' css={theme(MOBILE_DIRECT_NAV_LABEL_STYLES)}>
                  {label}
                </Caps>
              </MobileDirectNavLink>
            ))}
          </Box>
        </Box>
      </MobileMenuPanel>
    </Box>
  )
}

export default ToolbarMobile
