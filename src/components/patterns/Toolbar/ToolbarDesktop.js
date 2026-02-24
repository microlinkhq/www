import Toolbar from 'components/elements/Toolbar'
import Flex from 'components/elements/Flex'
import Box from 'components/elements/Box'
import Text from 'components/elements/Text'
import Image from 'components/elements/Image/Image'
import { useLocation } from '@gatsbyjs/reach-router'
import { GitHub } from 'components/icons/GitHub'
import { Twitter } from 'components/icons/Twitter'
import { ChevronDown } from 'react-feather'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import styled, { css } from 'styled-components'
import { rgba } from 'polished'
import { formatDate } from 'helpers/format-date'
import { useBlogIndex } from 'components/hook/use-blog-index'

import { colors, layout, theme, transition, fontSizes } from 'theme'

import {
  DOCUMENTATION_NAV_ITEM,
  NavMicrolinkLogo,
  NAVIGATION_SECTIONS,
  PRICING_NAV_ITEM,
  SOCIAL_NAV_ITEMS,
  ToolbarNavLink,
  getToolbarSectionFromPathname
} from './ToolbarLinks'

const iconLight = css`
  color: ${colors.black50};
  &:hover {
    color: ${colors.black80};
  }
`

const DEBUG_HOVER_BORDERS = false

const debugHoverOutline = css`
  outline: 1px dashed rgba(255, 59, 48, 0.35);
  outline-offset: -1px;

  &:hover {
    outline-color: #ff3b30;
  }
`

const ICON_SIZE = fontSizes[4]
const LIST_RESET_STYLES = {
  listStyle: 'none',
  p: 0,
  m: 0
}

const TOP_LEVEL_LINK_STYLES = {
  listStyle: 'none',
  px: 3,
  py: 2,
  fontSize: 1,
  fontWeight: 'regular'
}

const MEGA_MENU_ITEM_STYLES = {
  py: 3,
  px: 0,
  fontSize: 2,
  fontWeight: 'regular',
  listStyle: 'none',
  display: 'flex',
  alignItems: 'center',
  gap: 3,
  whiteSpace: 'normal',
  pr: [0, 0, 3, 3]
}

const RESOURCES_MENU_ITEM_STYLES = {
  py: 2,
  px: 0,
  fontSize: 1,
  fontWeight: 'regular',
  listStyle: 'none',
  display: 'flex',
  alignItems: 'center',
  gap: 2,
  whiteSpace: 'normal',
  pr: [0, 0, 2, 2]
}

const TopLevelTrigger = styled('button').withConfig({
  shouldForwardProp: prop => !['isActive'].includes(prop)
})`
  appearance: none;
  border: 0;
  background: ${({ isActive }) => (isActive ? colors.black05 : 'transparent')};
  border-radius: 999px;
  color: ${({ isActive }) => {
    if (isActive) return colors.black
    return colors.black60
  }};
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  height: 44px;
  padding: 0 16px;
  transition: color ${transition.medium}, background-color ${transition.medium};
  ${theme({
    fontFamily: 'sans',
    fontSize: 1,
    fontWeight: 'regular'
  })};
  ${DEBUG_HOVER_BORDERS ? debugHoverOutline : ''};
`

const MegaMenuPanel = styled(Box)`
  margin-top: 8px;
  margin-bottom: 12px;
  border: 1px solid ${colors.black10};
  border-radius: 20px;
  backdrop-filter: blur(12px) saturate(140%);
  -webkit-backdrop-filter: blur(12px) saturate(140%);
  background: ${rgba(colors.white95, 0.96)};
  box-shadow: 0 24px 60px ${rgba('black', 0.16)};
  ${DEBUG_HOVER_BORDERS ? debugHoverOutline : ''};
`

const MenuItemIcon = styled(Box)`
  width: ${ICON_SIZE};
  height: ${ICON_SIZE};
  border-radius: 9px;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform ${transition.medium};
  color: ${colors.black70};
  background: #f1f3f5;
`

const ResourceMenuItemIcon = styled(MenuItemIcon)`
  width: 36px;
  height: 36px;
  border-radius: 8px;
`

const MenuItemTitle = styled(Text)`
  display: block;
  color: ${colors.black90};
  ${theme({
    fontSize: 1,
    fontFamily: 'sans',
    fontWeight: 'bold',
    lineHeight: 0
  })};
`

const MenuItemDescription = styled(Text)`
  display: block;
  transition: color ${transition.medium};
  color: ${colors.black50};
  ${theme({
    fontSize: 0,
    lineHeight: 1
  })};
`

const MegaMenuItemLink = styled(ToolbarNavLink)`
  border-radius: 12px;
  transition: background-color ${transition.medium};
  ${DEBUG_HOVER_BORDERS ? debugHoverOutline : ''};

  &:hover,
  &:focus-within {
    background-color: ${rgba(colors.black, 0.06)};
  }

  &:hover ${MenuItemIcon}, &:focus-within ${MenuItemIcon} {
    transform: translateY(-1px);
  }

  &:hover ${MenuItemDescription}, &:focus-within ${MenuItemDescription} {
    color: ${colors.black60};
  }
`

const ResourcesMegaMenuItemLink = styled(MegaMenuItemLink)`
  border-radius: 10px;
`

const SectionDescription = styled(Text)`
  display: block;
  margin-top: 4px;
  margin-bottom: 16px;
  max-width: 560px;
  color: ${colors.black50};
  ${theme({
    fontSize: 0,
    lineHeight: 1
  })};
`

const ResourcesLayout = styled(Flex)(
  theme({
    alignItems: 'stretch',
    flexDirection: ['column', 'column', 'row', 'row'],
    gap: [4, 4, 4, 4]
  })
)

const ResourcesListColumn = styled(Box)(
  theme({
    width: ['100%', '100%', '58%', '58%'],
    minWidth: 0,
    pr: [0, 0, 4, 4],
    borderRight: [0, 0, '1px solid', '1px solid'],
    borderColor: [null, null, 'black10', 'black10']
  })
)

const ResourcesListGrid = styled(Flex)(
  theme({
    display: 'grid',
    gridTemplateColumns: [
      'minmax(180px, 1fr)',
      'repeat(2, minmax(180px, 1fr))',
      'repeat(2, minmax(180px, 1fr))',
      'repeat(2, minmax(180px, 1fr))'
    ],
    gap: '4px 16px',
    listStyle: 'none',
    margin: 0,
    padding: 0
  })
)

const ResourcesBlogColumn = styled(Box)(
  theme({
    width: ['100%', '100%', '42%', '42%'],
    minWidth: 0
  })
)

const ResourcesLatestPostLink = styled(ToolbarNavLink)`
  border-radius: 12px;
  transition: background-color ${transition.medium};

  > a {
    display: block;
  }

  &:hover,
  &:focus-within {
    background-color: ${rgba(colors.black, 0.06)};
  }
`

const DEFAULT_OPEN_SECTION = '' // NAVIGATION_SECTIONS[0]?.label ?? ''

const toSectionDomId = label =>
  `toolbar-mega-menu-${String(label).toLowerCase().replace(/\s+/g, '-')}`

const ToolbarDesktop = () => {
  const location = useLocation()
  const blogPosts = useBlogIndex()
  const headerRef = useRef(null)
  const closeTimeoutRef = useRef(null)
  const [openSection, setOpenSection] = useState(DEFAULT_OPEN_SECTION)

  const activeSection = useMemo(
    () => getToolbarSectionFromPathname(location.pathname),
    [location.pathname]
  )

  const section = NAVIGATION_SECTIONS.find(({ label }) => label === openSection)
  const latestPost = blogPosts[0]

  useEffect(() => {
    setOpenSection('')
  }, [location.pathname])

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!openSection) return

    const handleKeyDown = event => {
      if (event.key === 'Escape') setOpenSection('')
    }

    const handleClickOutside = event => {
      if (!headerRef.current?.contains(event.target)) setOpenSection('')
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [openSection])

  const clearClosePanelTimeout = () => {
    if (!closeTimeoutRef.current) return
    clearTimeout(closeTimeoutRef.current)
    closeTimeoutRef.current = null
  }

  const handleClosePanel = () => setOpenSection(DEFAULT_OPEN_SECTION)

  const handleClosePanelWithDelay = () => {
    clearClosePanelTimeout()
    closeTimeoutRef.current = setTimeout(() => {
      setOpenSection(DEFAULT_OPEN_SECTION)
      closeTimeoutRef.current = null
    }, 150)
  }

  const handleOpenSection = sectionId => {
    clearClosePanelTimeout()
    setOpenSection(sectionId)
  }

  const handleTriggerClick = sectionId => event => {
    event.preventDefault()
    clearClosePanelTimeout()
    setOpenSection(currentId => (currentId === sectionId ? '' : sectionId))
  }

  return (
    <Box
      as='header'
      className='hidden-print'
      ref={headerRef}
      onMouseEnter={clearClosePanelTimeout}
      onMouseLeave={handleClosePanelWithDelay}
      css={theme({
        position: 'fixed',
        zIndex: 101,
        top: 0,
        left: 0,
        right: 0,
        'backdrop-filter': 'blur(12px) saturate(140%)',
        '-webkit-backdrop-filter': 'blur(12px) saturate(140%)',
        'background-color': rgba('white', 0.5)
      })}
    >
      <Box css={theme({ px: 3, mx: 'auto', maxWidth: layout.large })}>
        <Toolbar
          forwardedAs='nav'
          aria-label='Primary Navigation'
          css={theme({
            justifyContent: 'space-between',
            px: 0
          })}
        >
          <Flex as='div' onMouseEnter={handleClosePanel}>
            <NavMicrolinkLogo css={theme({ p: 2 })} />
          </Flex>
          <Flex
            as='ul'
            css={theme({
              alignItems: 'center',
              justifyContent: 'center',
              ...LIST_RESET_STYLES,
              flex: 1
            })}
          >
            {NAVIGATION_SECTIONS.map(({ label }) => {
              const isActive = openSection === label || activeSection === label

              return (
                <Box
                  as='li'
                  key={label}
                  css={theme({ listStyle: LIST_RESET_STYLES.listStyle })}
                >
                  <TopLevelTrigger
                    type='button'
                    isActive={isActive}
                    aria-haspopup='true'
                    aria-expanded={openSection === label}
                    aria-controls={toSectionDomId(label)}
                    onClick={handleTriggerClick(label)}
                    onMouseEnter={() => handleOpenSection(label)}
                    onFocus={() => handleOpenSection(label)}
                  >
                    {label}
                    <ChevronDown
                      size={12}
                      style={{
                        transform:
                          openSection === label
                            ? 'rotate(180deg)'
                            : 'rotate(0deg)',
                        transition: 'transform 150ms ease'
                      }}
                    />
                  </TopLevelTrigger>
                </Box>
              )
            })}
            <ToolbarNavLink
              forwardedAs='li'
              href={DOCUMENTATION_NAV_ITEM.href}
              actively={DOCUMENTATION_NAV_ITEM.actively}
              data-event-location='Toolbar'
              data-event-name={DOCUMENTATION_NAV_ITEM.label}
              onClick={handleClosePanel}
              onMouseEnter={handleClosePanel}
              css={theme(TOP_LEVEL_LINK_STYLES)}
            >
              {DOCUMENTATION_NAV_ITEM.label}
            </ToolbarNavLink>
            <ToolbarNavLink
              forwardedAs='li'
              href={PRICING_NAV_ITEM.href}
              actively={PRICING_NAV_ITEM.actively}
              data-event-location='Toolbar'
              data-event-name={PRICING_NAV_ITEM.label}
              onClick={handleClosePanel}
              onMouseEnter={handleClosePanel}
              css={theme(TOP_LEVEL_LINK_STYLES)}
            >
              {PRICING_NAV_ITEM.label}
            </ToolbarNavLink>
          </Flex>
          <Flex as='div' css={theme({ alignItems: 'center' })}>
            {SOCIAL_NAV_ITEMS.map(({ href, label, title, externalIcon }) => {
              const icon = label === 'Twitter' ? <Twitter /> : <GitHub />

              return (
                <ToolbarNavLink
                  key={label}
                  forwardedAs='div'
                  href={href}
                  title={title}
                  externalIcon={externalIcon}
                  data-event-location='Toolbar'
                  data-event-name={label}
                  onMouseEnter={handleClosePanel}
                  css={`
                    ${theme({ pl: label === 'Twitter' ? 0 : 3 })};
                    ${iconLight};
                  `}
                >
                  {icon}
                </ToolbarNavLink>
              )
            })}
          </Flex>
        </Toolbar>
        {section && (
          <MegaMenuPanel
            id={toSectionDomId(section.label)}
            role='dialog'
            aria-label={`${section.label} navigation`}
            onMouseEnter={() => handleOpenSection(section.label)}
            onMouseLeave={handleClosePanelWithDelay}
          >
            <Box
              css={theme({
                px: [3, 3, 4, 4],
                py: [3, 3, 4, 4]
              })}
            >
              <Text
                as='p'
                css={theme({
                  color: 'black40',
                  fontSize: 1,
                  mb: 0
                })}
              >
                {section.label}
              </Text>
              <SectionDescription as='p'>
                {section.description}
              </SectionDescription>
              {section.label === 'Resources'
                ? (
                  <ResourcesLayout>
                    <ResourcesListColumn>
                      <ResourcesListGrid as='ul'>
                        {section.items.map(
                          ({ label, href, actively, title, externalIcon, icon: Icon }) => (
                            <ResourcesMegaMenuItemLink
                              key={label}
                              forwardedAs='li'
                              href={href}
                              title={title}
                              actively={actively}
                              externalIcon={externalIcon}
                              data-event-location='Toolbar'
                              data-event-name={label}
                              onClick={handleClosePanel}
                              css={theme(RESOURCES_MENU_ITEM_STYLES)}
                            >
                              <ResourceMenuItemIcon as='span'>
                                <Icon size={16} />
                              </ResourceMenuItemIcon>
                              <MenuItemTitle as='span'>{label}</MenuItemTitle>
                            </ResourcesMegaMenuItemLink>
                          )
                        )}
                      </ResourcesListGrid>
                    </ResourcesListColumn>
                    {latestPost && (
                      <ResourcesBlogColumn>
                        <Text
                          as='p'
                          css={theme({
                            mt: 1,
                            mb: 2,
                            color: 'black50',
                            fontSize: 0,
                            textTransform: 'uppercase',
                            letterSpacing: '0.06em'
                          })}
                        >
                          Latest from Blog
                        </Text>
                        <ResourcesLatestPostLink
                          forwardedAs='div'
                          href={latestPost.slug}
                          data-event-location='Toolbar'
                          data-event-name='Latest Blog Post'
                          onClick={handleClosePanel}
                          css={theme({
                            p: 3
                          })}
                        >
                          <Text
                            as='span'
                            css={theme({
                              display: 'block',
                              color: 'black90',
                              fontSize: [2, 2, 3, 3],
                              lineHeight: 0,
                              fontFamily: 'sans',
                              fontWeight: 'bold',
                              mb: 2
                            })}
                          >
                            {latestPost.title}
                          </Text>
                          <Text
                            as='span'
                            css={theme({
                              display: 'block',
                              color: 'black60',
                              fontSize: 1,
                              lineHeight: 2,
                              mb: 3
                            })}
                          >
                            {latestPost.excerpt}
                          </Text>
                          <Flex
                            as='span'
                            css={theme({ display: 'flex', alignItems: 'center', gap: 2 })}
                          >
                            {latestPost.authorAvatars?.length > 0 && (
                              <Flex
                                as='span'
                                css={theme({ display: 'flex', alignItems: 'center' })}
                              >
                                {latestPost.authorAvatars.slice(0, 2).map((avatar, index) => (
                                  <Image
                                    key={`${avatar}-${index}`}
                                    src={avatar}
                                    alt={
                                      latestPost.authorNames?.[index]
                                        ? `Avatar of ${latestPost.authorNames[index]}`
                                        : 'Author avatar'
                                    }
                                    width='22px'
                                    height='22px'
                                    css={theme({
                                      borderRadius: 999,
                                      border: '1px solid',
                                      borderColor: 'black10',
                                      ml: index === 0 ? 0 : '-8px',
                                      position: 'relative',
                                      zIndex: 3 - index
                                    })}
                                  />
                                ))}
                              </Flex>
                            )}
                            <Text
                              as='span'
                              css={theme({ color: 'black60', fontSize: 1, lineHeight: 1 })}
                            >
                              {latestPost.authorNames?.join(', ') || 'Microlink'} ·{' '}
                              {formatDate(latestPost.date)}
                            </Text>
                          </Flex>
                        </ResourcesLatestPostLink>
                      </ResourcesBlogColumn>
                    )}
                  </ResourcesLayout>
                  )
                : (
                  <Flex
                    as='ul'
                    css={{
                      display: 'grid',
                      gridTemplateColumns: `repeat(${section.columns}, minmax(180px, 1fr))`,
                      gap: '4px 32px',
                      listStyle: LIST_RESET_STYLES.listStyle,
                      margin: LIST_RESET_STYLES.m,
                      padding: LIST_RESET_STYLES.p
                    }}
                  >
                    {section.items.map(
                      ({
                        label,
                        href,
                        actively,
                        title,
                        externalIcon,
                        description,
                        icon: Icon
                      }) => (
                        <MegaMenuItemLink
                          key={label}
                          forwardedAs='li'
                          href={href}
                          title={title}
                          actively={actively}
                          externalIcon={externalIcon}
                          data-event-location='Toolbar'
                          data-event-name={label}
                          onClick={handleClosePanel}
                          css={theme(MEGA_MENU_ITEM_STYLES)}
                        >
                          <MenuItemIcon as='span'>
                            <Icon size={18} />
                          </MenuItemIcon>
                          <Box as='span'>
                            <MenuItemTitle as='span'>{label}</MenuItemTitle>
                            <MenuItemDescription as='span'>
                              {description}
                            </MenuItemDescription>
                          </Box>
                        </MegaMenuItemLink>
                      )
                    )}
                  </Flex>
                  )}
            </Box>
          </MegaMenuPanel>
        )}
      </Box>
    </Box>
  )
}

export default ToolbarDesktop
