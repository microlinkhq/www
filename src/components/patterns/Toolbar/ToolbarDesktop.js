import Toolbar from 'components/elements/Toolbar'
import Flex from 'components/elements/Flex'
import Box from 'components/elements/Box'
import Text from 'components/elements/Text'
import Image from 'components/elements/Image/Image'
import FeatherIcon from 'components/icons/Feather'
import { useLocation } from '@gatsbyjs/reach-router'
import { GitHub } from 'components/icons/GitHub'
import { Twitter } from 'components/icons/Twitter'
import { ChevronDown, ChevronRight } from 'react-feather'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import styled, { css } from 'styled-components'
import { rgba } from 'polished'
import { formatDate } from 'helpers/format-date'
import { useBlogIndex } from 'components/hook/use-blog-index'

import { colors, layout, theme, transition } from 'theme'

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

const TOP_LEVEL_STYLE = {
  textTransform: 'uppercase',
  letterSpacing: 2,
  fontSize: 0,
  color: 'black80'
}

const ICON_STYLE = {
  height: '18px',
  width: '18px',
  position: 'relative',
  top: '6px',
  color: 'black60'
}

const LIST_RESET_STYLES = {
  listStyle: 'none',
  p: 0,
  m: 0
}

const TOP_LEVEL_LINK_STYLES = {
  px: 3,
  py: 2,
  fontSize: 1
}

const MENU_ITEM_TITLE_STYLES = {
  display: 'block',
  fontSize: 1,
  color: 'black80'
}

const TopLevelTrigger = styled('button').withConfig({
  shouldForwardProp: prop => !['isActive'].includes(prop)
})`
  background: transparent;
  appearance: none;
  border: 0;
  font-weight: ${({ isActive }) => (isActive ? 'bold' : 'regular')};
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  height: 44px;
  padding: 0 16px;
  transition: color ${transition.medium};
  ${theme({
    color: 'black80',
    fontFamily: 'sans',
    fontSize: 0,
    textTransform: 'uppercase',
    letterSpacing: 2
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
  border-radius: 9px;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform ${transition.medium};
  color: ${colors.black70};
`

const ResourceMenuItemIcon = styled(MenuItemIcon)`
  border-radius: 0;
  background: transparent;
  color: ${colors.black60};
`

const MegaMenuItemLink = styled(ToolbarNavLink)`
  border-radius: 12px;
  transition: background-color ${transition.medium};
  ${DEBUG_HOVER_BORDERS ? debugHoverOutline : ''};

  &:hover
    ${MenuItemIcon},
    &:focus-within
    ${MenuItemIcon},
    > .active
    ${MenuItemIcon},
    &:hover
    .menu-item-title,
  &:focus-within .menu-item-title,
  > .active .menu-item-title,
  &:hover .menu-item-description,
  &:focus-within .menu-item-description,
  > .active .menu-item-description {
    color: ${colors.black};
  }

  &:hover .menu-item-title,
  &:focus-within .menu-item-title,
  > .active .menu-item-title {
    font-weight: 700;
  }
`

const ResourcesMegaMenuItemLink = styled(MegaMenuItemLink)`
  border-radius: 10px;
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

const DEBUG_STICKY_SECTION = ''

const toSectionDomId = label =>
  `toolbar-mega-menu-${String(label).toLowerCase().replace(/\s+/g, '-')}`

const ToolbarDesktop = () => {
  const location = useLocation()
  const blogPosts = useBlogIndex()
  const headerRef = useRef(null)
  const closeTimeoutRef = useRef(null)
  const [openSection, setOpenSection] = useState(DEBUG_STICKY_SECTION)

  const activeSection = useMemo(
    () => getToolbarSectionFromPathname(location.pathname),
    [location.pathname]
  )

  const section = NAVIGATION_SECTIONS.find(({ label }) => label === openSection)
  const latestPosts = useMemo(() => blogPosts.slice(0, 3), [blogPosts])

  useEffect(() => {
    if (DEBUG_STICKY_SECTION) return
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
    if (!openSection || DEBUG_STICKY_SECTION) return

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

  const handleClosePanel = () => {
    if (DEBUG_STICKY_SECTION) return
    setOpenSection('')
  }

  const handleClosePanelWithDelay = () => {
    if (DEBUG_STICKY_SECTION) return
    clearClosePanelTimeout()
    closeTimeoutRef.current = setTimeout(() => {
      setOpenSection('')
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
    if (DEBUG_STICKY_SECTION) {
      setOpenSection(sectionId)
      return
    }
    setOpenSection(currentId => (currentId === sectionId ? '' : sectionId))
  }

  const renderLatestPostItem = post => (
    <ResourcesLatestPostLink
      key={post.slug}
      forwardedAs='li'
      href={post.slug}
      data-event-location='Toolbar'
      data-event-name={`Blog Post: ${post.title}`}
      onClick={handleClosePanel}
      css={theme({
        px: 3,
        py: 2
      })}
    >
      <Text
        as='span'
        css={theme({
          display: 'block',
          color: 'black90',
          fontSize: 0,
          lineHeight: 1,
          fontFamily: 'sans',
          fontWeight: 'bold',
          mb: 1
        })}
      >
        {post.title}
      </Text>
      <Flex
        as='span'
        css={theme({
          display: 'flex',
          alignItems: 'center',
          gap: 1
        })}
      >
        {post.authorAvatars?.[0] && (
          <Image
            src={post.authorAvatars[0]}
            alt={
              post.authorNames?.[0]
                ? `Avatar of ${post.authorNames[0]}`
                : 'Author avatar'
            }
            width='18px'
            height='18px'
            css={theme({
              borderRadius: 999,
              border: '1px solid',
              borderColor: 'black10'
            })}
          />
        )}
        <Text
          as='span'
          css={theme({
            color: 'black60',
            fontSize: 0,
            lineHeight: 1
          })}
        >
          {post.authorNames?.join(', ') || 'Microlink'} ·{' '}
          {formatDate(post.date)}
        </Text>
      </Flex>
    </ResourcesLatestPostLink>
  )

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
                    <FeatherIcon
                      icon={ChevronDown}
                      size='12px'
                      css={{ alignItems: 'center' }}
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
              css={theme({ ...TOP_LEVEL_LINK_STYLES, ...TOP_LEVEL_STYLE })}
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
              css={theme({ ...TOP_LEVEL_LINK_STYLES, ...TOP_LEVEL_STYLE })}
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
              {section.label !== 'Resources' && (
                <>
                  <Text as='p' css={theme(TOP_LEVEL_STYLE)}>
                    {section.label}
                  </Text>

                  <Text
                    css={theme({
                      fontSize: 0,
                      mb: 2,
                      maxWidth: 560,
                      color: 'black60'
                    })}
                  >
                    {section.description}
                  </Text>
                </>
              )}
              {section.label === 'Resources' && (
                <ResourcesLayout>
                  <ResourcesListColumn>
                    <Text as='p' css={theme(TOP_LEVEL_STYLE)}>
                      {section.label}
                    </Text>
                    <Text
                      css={theme({
                        fontSize: 0,
                        mt: 1,
                        mb: 2,
                        maxWidth: 560,
                        color: 'black60'
                      })}
                    >
                      {section.description}
                    </Text>
                    <ResourcesListGrid as='ul'>
                      {section.items
                        .filter(({ label }) => label !== 'Blog')
                        .map(
                          ({
                            label,
                            href,
                            actively,
                            title,
                            externalIcon,
                            logo,
                            icon: Icon
                          }) => (
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
                              css={theme({
                                py: 2,
                                px: 0,
                                display: 'flex',
                                gap: 2,
                                whiteSpace: 'normal',
                                pr: [0, 0, 2, 2]
                              })}
                            >
                              <ResourceMenuItemIcon as='span'>
                                {logo ? (
                                  <Image
                                    src={logo}
                                    width='18px'
                                    height='18px'
                                    alt={label}
                                    style={{
                                      position: 'relative',
                                      top: '6px'
                                    }}
                                  />
                                ) : (
                                  <FeatherIcon
                                    icon={Icon}
                                    size='18px'
                                    css={{
                                      position: 'relative',
                                      top: '6px'
                                    }}
                                  />
                                )}
                              </ResourceMenuItemIcon>
                              <Text
                                as='span'
                                className='menu-item-title'
                                css={theme(MENU_ITEM_TITLE_STYLES)}
                              >
                                {label}
                              </Text>
                            </ResourcesMegaMenuItemLink>
                          )
                        )}
                    </ResourcesListGrid>
                  </ResourcesListColumn>
                  {latestPosts.length > 0 && (
                    <ResourcesBlogColumn>
                      <ToolbarNavLink
                        forwardedAs='div'
                        href='/blog'
                        data-event-location='Toolbar'
                        data-event-name='Blog'
                        onClick={handleClosePanel}
                        css={theme({ mb: 3, ...TOP_LEVEL_STYLE })}
                      >
                        <Flex
                          as='span'
                          css={theme({ alignItems: 'center', gap: 1 })}
                        >
                          Blog
                          <FeatherIcon icon={ChevronRight} size='12px' />
                        </Flex>
                      </ToolbarNavLink>
                      <Flex
                        as='ul'
                        css={theme({
                          flexDirection: 'column',
                          listStyle: 'none',
                          m: 0,
                          p: 0,
                          gap: 2
                        })}
                      >
                        {latestPosts.map(renderLatestPostItem)}
                      </Flex>
                    </ResourcesBlogColumn>
                  )}
                </ResourcesLayout>
              )}
              {section.label !== 'Resources' && (
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
                      logo,
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
                        css={theme({
                          py: 3,
                          px: 0,
                          gap: 3,
                          whiteSpace: 'normal',
                          pr: [0, 0, 3, 3]
                        })}
                      >
                        <MenuItemIcon as='span'>
                          {logo ? (
                            <Image
                              src={logo}
                              alt={label}
                              css={theme(ICON_STYLE)}
                            />
                          ) : (
                            <FeatherIcon icon={Icon} css={theme(ICON_STYLE)} />
                          )}
                        </MenuItemIcon>
                        <Box as='span'>
                          <Text
                            as='span'
                            className='menu-item-title'
                            css={theme(MENU_ITEM_TITLE_STYLES)}
                          >
                            {label}
                          </Text>
                          <Text
                            as='span'
                            className='menu-item-description'
                            css={theme({
                              display: 'block',
                              fontSize: 0,
                              color: 'black60'
                            })}
                          >
                            {description}
                          </Text>
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
