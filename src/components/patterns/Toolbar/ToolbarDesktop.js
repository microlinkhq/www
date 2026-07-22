import Toolbar from 'components/elements/Toolbar'
import Flex from 'components/elements/Flex'
import Box from 'components/elements/Box'
import { useLocation } from '@gatsbyjs/reach-router'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useBlogIndex } from 'components/hook/use-blog-index'

import { layout, theme } from 'theme'

import {
  SOCIAL_NAV_ITEMS,
  ToolbarNavLink,
  getToolbarSectionFromPathname
} from './ToolbarLinks'
import { NavMicrolinkLogo } from './NavLogo'

import {
  DEBUG_STICKY_SECTION,
  Header,
  PANEL_EXIT_DURATION_MS,
  canUseHover,
  clearTimeoutRef,
  iconLight,
  isStickySection
} from './ToolbarDesktopStyles'

import ToolbarDesktopMegaMenu from './ToolbarDesktopMegaMenu'
import ToolbarDesktopTopLevelNav from './ToolbarDesktopTopLevelNav'

const ToolbarDesktop = () => {
  const location = useLocation()
  const blogPosts = useBlogIndex()
  const headerRef = useRef(null)
  const closeTimeoutRef = useRef(null)
  const [openSection, setOpenSection] = useState(
    isStickySection ? DEBUG_STICKY_SECTION : ''
  )
  const [renderedSection, setRenderedSection] = useState(
    isStickySection ? DEBUG_STICKY_SECTION : ''
  )

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
      clearTimeoutRef(closeTimeoutRef)
    }
  }, [])

  useEffect(() => {
    if (!openSection) {
      const timeout = setTimeout(() => {
        setRenderedSection('')
      }, PANEL_EXIT_DURATION_MS)
      return () => clearTimeout(timeout)
    }

    setRenderedSection(openSection)
  }, [openSection])

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
    clearTimeoutRef(closeTimeoutRef)
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
    }, PANEL_EXIT_DURATION_MS)
  }

  const handleOpenSection = sectionId => {
    clearClosePanelTimeout()
    setRenderedSection(sectionId)
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
      setRenderedSection(sectionId)
      setOpenSection(sectionId)
      return
    }
    const hoverable = canUseHover()
    setRenderedSection(sectionId)
    setOpenSection(currentId => {
      if (!hoverable) {
        return currentId === sectionId ? '' : sectionId
      }
      return sectionId
    })
  }

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
          <ToolbarDesktopTopLevelNav
            openSection={openSection}
            activeSection={activeSection}
            onTriggerClick={handleTriggerClick}
            onOpenSection={handleOpenSection}
            onOpenSectionWithHover={handleOpenSectionWithHover}
            onClosePanel={handleClosePanel}
          />
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
        <ToolbarDesktopMegaMenu
          isPanelVisible={isPanelVisible}
          renderedSection={renderedSection}
          latestPosts={latestPosts}
          onMouseEnter={clearClosePanelTimeout}
          onMouseLeave={handleClosePanelWithDelay}
          onItemClick={handleClosePanel}
        />
      </Box>
    </Header>
  )
}

export default ToolbarDesktop
