import Toolbar from 'components/elements/Toolbar'
import Flex from 'components/elements/Flex'
import Box from 'components/elements/Box'
import Text from 'components/elements/Text'
import Caps from 'components/elements/Caps'
import Image from 'components/elements/Image/Image'
import FeatherIcon from 'components/icons/Feather'
import { useLocation } from '@gatsbyjs/reach-router'
import { ChevronDown, ChevronRight } from 'react-feather'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import styled, { css } from 'styled-components'
import { formatDate } from 'helpers/format-date'
import { backDrop } from 'helpers/style'
import { useBlogIndex } from 'components/hook/use-blog-index'

import {
  colors,
  fontWeights,
  layout,
  shadows,
  speed,
  theme,
  transition
} from 'theme'

import {
  DIRECT_NAV_ITEMS,
  NavMicrolinkLogo,
  NAVIGATION_SECTIONS,
  SOCIAL_NAV_ITEMS,
  ToolbarNavLink,
  getToolbarSectionFromPathname
} from './ToolbarLinks'
import {
  TOOLBAR_CHEVRON_ICON_SIZE,
  TOOLBAR_LIST_RESET_STYLES,
  TOOLBAR_MENU_ITEM_DESCRIPTION_STYLES,
  TOOLBAR_MENU_ITEM_MEDIA_STYLES,
  TOOLBAR_RESOURCE_MENU_ITEM_MEDIA_STYLES,
  TOOLBAR_MENU_ITEM_TITLE_STYLES,
  TOOLBAR_SECTION_DESCRIPTION_STYLES,
  TOOLBAR_TOP_LEVEL_CAPS_STYLES,
  TOOLBAR_TOP_LEVEL_TEXT_STYLES
} from './ToolbarStyles'
import ToolbarMenuItemMedia from './ToolbarMenuItemMedia'

const iconLight = css`
  color: ${colors.black50};
  &:hover {
    color: ${colors.black80};
  }
`

const LABEL_STYLE = {
  ...TOOLBAR_SECTION_DESCRIPTION_STYLES,
  mb: 2,
  maxWidth: 560
}

const TOP_LEVEL_LINK_LAYOUT_STYLES = {
  px: 3,
  py: 2
}

const TOP_LEVEL_ACTIVE_BACKGROUND = colors.black05
const PANEL_CLOSE_DELAY_MS = speed.normal

const MENU_LINK_HOVER_STYLES = css`
  transition: background-color ${transition.medium};

  .menu-item-title {
    font-weight: ${fontWeights.regular};
    transition: color ${transition.medium};
  }

  .menu-item-description {
    transition: color ${transition.medium};
  }

  &:hover,
  &:focus-within,
  &.active {
    background-color: ${TOP_LEVEL_ACTIVE_BACKGROUND};
  }

  &:hover .menu-item-title,
  &:focus-within .menu-item-title,
  &.active .menu-item-title {
    color: ${colors.black};
    font-weight: ${fontWeights.bold};
  }
`

const TopLevelTrigger = styled('button').withConfig({
  shouldForwardProp: prop => !['isActive'].includes(prop)
})`
  background: transparent;
  appearance: none;
  border: 0;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  height: 44px;
  padding: 0 16px;
  border-radius: 999px;
  background-color: ${({ isActive }) =>
    isActive ? TOP_LEVEL_ACTIVE_BACKGROUND : 'transparent'};
  transition: color ${transition.medium}, background-color ${transition.medium};
  ${theme({
    color: 'black80',
    fontFamily: 'sans',
    fontWeight: 'regular'
  })};
`

const TopLevelChevron = styled(FeatherIcon).withConfig({
  shouldForwardProp: prop => !['isOpen'].includes(prop)
})`
  align-items: center;
  transform: rotate(${({ isOpen }) => (isOpen ? '180deg' : '0deg')});
  transition: transform ${transition.medium};
`

const MegaMenuPanel = styled(Box).withConfig({
  shouldForwardProp: prop => !['isVisible'].includes(prop)
})`
  position: absolute;
  left: 0;
  right: 0;
  top: 100%;
  margin-top: 8px;
  margin-bottom: 12px;
  border: 1px solid ${colors.black10};
  border-radius: 20px;
  background: white;
  box-shadow: ${shadows[2]};
  transform-origin: top center;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: translateY(${({ isVisible }) => (isVisible ? '0px' : '-8px')})
    scale(${({ isVisible }) => (isVisible ? 1 : 0.985)});
  pointer-events: ${({ isVisible }) => (isVisible ? 'auto' : 'none')};
  transition: opacity ${transition.medium}, transform ${transition.medium};
`

const MegaMenuSection = styled(Box).withConfig({
  shouldForwardProp: prop => !['isActive'].includes(prop)
})`
  display: ${({ isActive }) => (isActive ? 'block' : 'none')};
`

const MenuItemIcon = styled(Box)`
  border-radius: 9px;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform ${transition.medium}, color ${transition.medium};
  color: ${colors.black70};
`

const RESOURCE_MENU_ITEM_ICON_CLASSNAME = 'resource-menu-item-icon'

const MegaMenuItemLink = styled(ToolbarNavLink)`
  border-radius: 12px;

  > a {
    border-radius: inherit;
    align-items: baseline;
    ${MENU_LINK_HOVER_STYLES};
  }

  &:hover
    ${MenuItemIcon},
    &:focus-within
    ${MenuItemIcon},
    > .active
    ${MenuItemIcon},
    &:hover
    .menu-item-description,
  &:focus-within .menu-item-description,
  > .active .menu-item-description {
    color: ${colors.black};
  }
`

const ResourcesMegaMenuItemLink = styled(MegaMenuItemLink)`
  border-radius: 10px;

  > a {
    align-items: flex-start;
  }

  .${RESOURCE_MENU_ITEM_ICON_CLASSNAME} {
    transition: color ${transition.medium};
  }

  &:hover
    .${RESOURCE_MENU_ITEM_ICON_CLASSNAME},
    &:focus-within
    .${RESOURCE_MENU_ITEM_ICON_CLASSNAME},
    > .active
    .${RESOURCE_MENU_ITEM_ICON_CLASSNAME} {
    color: ${colors.black};
  }
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

  > a {
    display: block;
    border-radius: inherit;
    padding: 12px;
    ${MENU_LINK_HOVER_STYLES};
  }
`

const Header = styled(Box).withConfig({
  shouldForwardProp: prop => !['isDocsRoute'].includes(prop)
})`
  ${theme({
    position: 'fixed',
    zIndex: 101,
    top: 0,
    left: 0,
    right: 0
  })}

  ${({ isDocsRoute }) => !isDocsRoute && backDrop}
`

const DEBUG_STICKY_SECTION = ''
const isStickySection = Boolean(DEBUG_STICKY_SECTION)

const toSectionDomId = label =>
  `toolbar-mega-menu-${String(label).toLowerCase().replace(/\s+/g, '-')}`

const canUseHover = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: hover) and (pointer: fine)').matches

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

  const isPanelVisible = Boolean(openSection)
  const latestPosts = useMemo(() => blogPosts.slice(0, 3), [blogPosts])
  const isDocsRoute = location.pathname.startsWith('/docs')

  useEffect(() => {
    if (isStickySection) return
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
    if (!openSection || isStickySection) return

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
    if (isStickySection) return
    setOpenSection('')
  }

  const handleClosePanelWithDelay = () => {
    if (isStickySection || !canUseHover()) return
    clearClosePanelTimeout()
    closeTimeoutRef.current = setTimeout(() => {
      setOpenSection('')
      closeTimeoutRef.current = null
    }, PANEL_CLOSE_DELAY_MS)
  }

  const handleOpenSection = sectionId => {
    clearClosePanelTimeout()
    setOpenSection(sectionId)
  }

  const handleOpenSectionWithHover = sectionId => {
    if (!canUseHover()) return
    handleOpenSection(sectionId)
  }

  const handleTriggerClick = sectionId => event => {
    event.preventDefault()
    clearClosePanelTimeout()
    if (isStickySection) {
      setOpenSection(sectionId)
      return
    }
    setOpenSection(currentId =>
      canUseHover() ? sectionId : currentId === sectionId ? '' : sectionId
    )
  }

  const renderLatestPostItem = post => (
    <ResourcesLatestPostLink
      key={post.slug}
      forwardedAs='li'
      href={post.slug}
      data-event-location='Toolbar'
      data-event-name={`Blog Post: ${post.title}`}
      onClick={handleClosePanel}
    >
      <Text
        as='span'
        className='menu-item-title'
        css={theme({
          display: 'block',
          color: 'black80',
          fontSize: 0,
          lineHeight: 1,
          fontFamily: 'sans',
          fontWeight: fontWeights.regular,
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
    <Header
      as='header'
      className='hidden-print'
      ref={headerRef}
      onMouseEnter={clearClosePanelTimeout}
      onMouseLeave={handleClosePanelWithDelay}
      isDocsRoute={isDocsRoute}
    >
      <Box
        css={theme({
          px: 3,
          mx: 'auto',
          maxWidth: layout.large,
          position: 'relative'
        })}
      >
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
              ...TOOLBAR_LIST_RESET_STYLES,
              flex: 1
            })}
          >
            {NAVIGATION_SECTIONS.map(({ label }) => {
              const isActive = openSection
                ? openSection === label
                : activeSection === label

              return (
                <Box
                  as='li'
                  key={label}
                  css={theme({
                    listStyle: TOOLBAR_LIST_RESET_STYLES.listStyle
                  })}
                >
                  <TopLevelTrigger
                    type='button'
                    isActive={isActive}
                    aria-haspopup='true'
                    aria-expanded={openSection === label}
                    aria-controls={toSectionDomId(label)}
                    onClick={handleTriggerClick(label)}
                    onMouseEnter={() => handleOpenSectionWithHover(label)}
                    onFocus={() =>
                      canUseHover() ? handleOpenSection(label) : undefined
                    }
                  >
                    <Caps as='span' css={theme(TOOLBAR_TOP_LEVEL_CAPS_STYLES)}>
                      {label}
                    </Caps>
                    <TopLevelChevron
                      icon={ChevronDown}
                      isOpen={openSection === label}
                      size={TOOLBAR_CHEVRON_ICON_SIZE}
                    />
                  </TopLevelTrigger>
                </Box>
              )
            })}
            {DIRECT_NAV_ITEMS.map(({ label, href, actively }) => (
              <ToolbarNavLink
                key={label}
                forwardedAs='li'
                href={href}
                actively={actively}
                data-event-location='Toolbar'
                data-event-name={label}
                onClick={handleClosePanel}
                onMouseEnter={handleClosePanel}
                css={theme({
                  ...TOP_LEVEL_LINK_LAYOUT_STYLES,
                  ...TOOLBAR_TOP_LEVEL_TEXT_STYLES
                })}
              >
                <Caps as='span' css={theme(TOOLBAR_TOP_LEVEL_CAPS_STYLES)}>
                  {label}
                </Caps>
              </ToolbarNavLink>
            ))}
          </Flex>
          <Flex as='div' css={theme({ alignItems: 'center' })}>
            {SOCIAL_NAV_ITEMS.map(
              ({ href, label, title, externalIcon, icon: Icon }) => {
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
                    css={iconLight}
                  >
                    <Icon />
                  </ToolbarNavLink>
                )
              }
            )}
          </Flex>
        </Toolbar>
        <MegaMenuPanel
          isVisible={isPanelVisible}
          id='toolbar-mega-menu'
          role='dialog'
          aria-label='Primary navigation submenu'
          aria-hidden={!isPanelVisible}
          inert={!isPanelVisible ? '' : undefined}
          onMouseEnter={clearClosePanelTimeout}
          onMouseLeave={handleClosePanelWithDelay}
        >
          {NAVIGATION_SECTIONS.map(section => {
            const isSectionActive = openSection === section.label
            const isResourcesSection = section.label === 'Resources'

            return (
              <MegaMenuSection
                key={section.label}
                id={toSectionDomId(section.label)}
                isActive={isSectionActive}
                aria-hidden={!isSectionActive}
              >
                <Box
                  css={theme({
                    px: [3, 3, 4, 4],
                    py: [3, 3, 4, 4]
                  })}
                >
                  {!isResourcesSection && (
                    <Text css={theme(LABEL_STYLE)}>{section.description}</Text>
                  )}
                  {isResourcesSection && (
                    <ResourcesLayout>
                      <ResourcesListColumn>
                        <Text css={theme(LABEL_STYLE)}>
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
                                    '> a': { padding: '6px 12px' },
                                    whiteSpace: 'normal'
                                  })}
                                >
                                  <ToolbarMenuItemMedia
                                    label={label}
                                    logo={logo}
                                    icon={Icon}
                                    iconClassName={
                                      RESOURCE_MENU_ITEM_ICON_CLASSNAME
                                    }
                                    iconCss={theme({
                                      ...TOOLBAR_RESOURCE_MENU_ITEM_MEDIA_STYLES,
                                      color: 'black60'
                                    })}
                                  />
                                  <Text
                                    as='span'
                                    className='menu-item-title'
                                    css={theme(TOOLBAR_MENU_ITEM_TITLE_STYLES)}
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
                            css={theme({
                              mb: 3,
                              ...TOOLBAR_TOP_LEVEL_TEXT_STYLES
                            })}
                          >
                            <Caps
                              as='span'
                              css={theme({
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 1,
                                ...TOOLBAR_TOP_LEVEL_CAPS_STYLES
                              })}
                            >
                              Blog
                              <FeatherIcon
                                icon={ChevronRight}
                                size={TOOLBAR_CHEVRON_ICON_SIZE}
                              />
                            </Caps>
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
                  {!isResourcesSection && (
                    <Flex
                      as='ul'
                      css={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(${section.columns}, minmax(180px, 1fr))`,
                        gap: '4px 32px',
                        listStyle: TOOLBAR_LIST_RESET_STYLES.listStyle,
                        margin: TOOLBAR_LIST_RESET_STYLES.m,
                        padding: TOOLBAR_LIST_RESET_STYLES.p
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
                              '> a': { padding: '12px' },
                              whiteSpace: 'normal'
                            })}
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
                                imageCss={TOOLBAR_MENU_ITEM_MEDIA_STYLES}
                              />
                            </MenuItemIcon>
                            <Box as='span'>
                              <Text
                                as='span'
                                className='menu-item-title'
                                css={theme(TOOLBAR_MENU_ITEM_TITLE_STYLES)}
                              >
                                {label}
                              </Text>
                              <Text
                                as='span'
                                className='menu-item-description'
                                css={theme(
                                  TOOLBAR_MENU_ITEM_DESCRIPTION_STYLES
                                )}
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
              </MegaMenuSection>
            )
          })}
        </MegaMenuPanel>
      </Box>
    </Header>
  )
}

export default ToolbarDesktop
