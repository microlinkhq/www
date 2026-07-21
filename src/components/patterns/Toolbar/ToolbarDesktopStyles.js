import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import FeatherIcon from 'components/icons/Feather'
import styled, { css } from 'styled-components'
import { backDrop } from 'helpers/style'
import { isDevelopment } from 'helpers/is-development'

import { colors, fontWeights, shadows, speed, theme, transition } from 'theme'

import { ToolbarNavLink } from './ToolbarLinks'
import {
  TOOLBAR_LIST_RESET_STYLES,
  TOOLBAR_SECTION_DESCRIPTION_STYLES
} from './ToolbarStyles'

export const iconLight = css`
  color: ${colors.black50};
  &:hover {
    color: ${colors.black80};
  }
`

export const LABEL_STYLE = {
  ...TOOLBAR_SECTION_DESCRIPTION_STYLES,
  mb: 2,
  maxWidth: 560
}

export const getMegaMenuGridStyles = columns => ({
  display: 'grid',
  gridTemplateColumns: `repeat(${columns}, minmax(180px, 1fr))`,
  gap: '4px 32px',
  listStyle: TOOLBAR_LIST_RESET_STYLES.listStyle,
  margin: TOOLBAR_LIST_RESET_STYLES.m,
  padding: TOOLBAR_LIST_RESET_STYLES.p
})

export const TOP_LEVEL_LINK_LAYOUT_STYLES = {
  px: 3,
  py: 2
}

export const TOP_LEVEL_ACTIVE_BACKGROUND = colors.black05
export const PANEL_EXIT_DURATION_MS = speed.quickly

const TOP_LEVEL_INTERACTION_BASE_STYLES = css`
  border-radius: 999px;
  transition: color ${transition.medium}, background-color ${transition.medium};
  color: ${colors.black80};
`

const TOP_LEVEL_INTERACTION_HOVER_STYLES = css`
  &:hover,
  &:focus-within {
    background-color: ${TOP_LEVEL_ACTIVE_BACKGROUND};
    color: ${colors.black};
  }
`

const TOP_LEVEL_INTERACTION_ACTIVE_LINK_STYLES = css`
  &:has(> .active) {
    background-color: ${TOP_LEVEL_ACTIVE_BACKGROUND};
    color: ${colors.black};
  }

  && > .active {
    background-color: transparent;
    color: inherit;
  }
`

export const clearTimeoutRef = timeoutRef => {
  if (!timeoutRef.current) return
  clearTimeout(timeoutRef.current)
  timeoutRef.current = null
}

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
  }
`

export const TopLevelTrigger = styled('button').withConfig({
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
  ${TOP_LEVEL_INTERACTION_BASE_STYLES}
  ${TOP_LEVEL_INTERACTION_HOVER_STYLES}
  background-color: ${({ isActive }) =>
    isActive ? TOP_LEVEL_ACTIVE_BACKGROUND : 'transparent'};
  ${theme({
    fontFamily: 'sans'
  })};
`

export const TopLevelDirectLink = styled(ToolbarNavLink)`
  ${TOP_LEVEL_INTERACTION_BASE_STYLES}
  ${TOP_LEVEL_INTERACTION_HOVER_STYLES}
  ${TOP_LEVEL_INTERACTION_ACTIVE_LINK_STYLES}
`

export const TopLevelChevron = styled(FeatherIcon).withConfig({
  shouldForwardProp: prop => !['isOpen'].includes(prop)
})`
  align-items: center;
  transform: rotate(${({ isOpen }) => (isOpen ? '180deg' : '0deg')});
  transition: transform ${transition.medium};
`

export const MegaMenuPanel = styled(Box).withConfig({
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
  box-shadow: ${shadows[4]};
  transform-origin: top center;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: translateY(${({ isVisible }) => (isVisible ? '0px' : '-8px')})
    scale(${({ isVisible }) => (isVisible ? 1 : 0.985)});
  pointer-events: ${({ isVisible }) => (isVisible ? 'auto' : 'none')};
  transition: opacity
      ${({ isVisible }) => (isVisible ? transition.medium : transition.short)},
    transform
      ${({ isVisible }) => (isVisible ? transition.medium : transition.short)};
`

export const MegaMenuSection = styled(Box).withConfig({
  shouldForwardProp: prop => !['isActive'].includes(prop)
})`
  display: ${({ isActive }) => (isActive ? 'block' : 'none')};
`

export const MenuItemIcon = styled(Box)`
  border-radius: 9px;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform ${transition.medium}, color ${transition.medium};
  color: ${colors.black70};
`

export const RESOURCE_MENU_ITEM_ICON_CLASSNAME = 'resource-menu-item-icon'

export const MegaMenuItemLink = styled(ToolbarNavLink)`
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

export const ResourcesMegaMenuItemLink = styled(MegaMenuItemLink)`
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

export const ResourcesLayout = styled(Flex)(
  theme({
    alignItems: 'stretch',
    flexDirection: ['column', 'column', 'row', 'row'],
    gap: [4, 4, 4, 4]
  })
)

export const ResourcesListColumn = styled(Box)(
  theme({
    width: ['100%', '100%', '58%', '58%'],
    minWidth: 0,
    pr: [0, 0, 4, 4],
    borderRight: [0, 0, '1px solid', '1px solid'],
    borderColor: [null, null, 'black10', 'black10']
  })
)

export const ResourcesListGrid = styled(Flex)(
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

export const ResourcesBlogColumn = styled(Box)(
  theme({
    width: ['100%', '100%', '42%', '42%'],
    minWidth: 0
  })
)

export const ToolsLayout = styled(Flex)(
  theme({
    alignItems: 'stretch',
    flexDirection: ['column', 'column', 'row', 'row'],
    gap: [4, 4, 4, 4]
  })
)

export const ToolsListColumn = styled(Box)(
  theme({
    width: ['100%', '100%', '58%', '58%'],
    minWidth: 0,
    pr: [0, 0, 4, 4],
    borderRight: [0, 0, '1px solid', '1px solid'],
    borderColor: [null, null, 'black10', 'black10']
  })
)

export const ToolsIntegrationsColumn = styled(Box)(
  theme({
    width: ['100%', '100%', '42%', '42%'],
    minWidth: 0
  })
)

export const ResourcesLatestPostLink = styled(ToolbarNavLink)`
  border-radius: 12px;

  > a {
    display: block;
    border-radius: inherit;
    padding: 12px;
    ${MENU_LINK_HOVER_STYLES};
  }
`

export const Header = styled(Box).withConfig({
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

export const DEBUG_STICKY_SECTION = ''
export const isStickySection = isDevelopment && Boolean(DEBUG_STICKY_SECTION)

export const toSectionDomId = label =>
  `toolbar-mega-menu-${String(label).toLowerCase().replace(/\s+/g, '-')}`

export const canUseHover = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: hover) and (pointer: fine)').matches
