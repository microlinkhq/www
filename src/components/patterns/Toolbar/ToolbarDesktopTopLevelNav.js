import Flex from 'components/elements/Flex'
import Box from 'components/elements/Box'
import Caps from 'components/elements/Caps'
import { ChevronDown, LogIn } from 'react-feather'
import FeatherIcon from 'components/icons/Feather'
import React from 'react'
import { theme } from 'theme'

import {
  DIRECT_NAV_ITEMS,
  NAVIGATION_SECTIONS,
  SIGN_IN_NAV_ITEM,
  ToolbarActionLink
} from './ToolbarLinks'
import {
  TOOLBAR_CHEVRON_ICON_SIZE,
  TOOLBAR_LIST_RESET_STYLES,
  TOOLBAR_TOP_LEVEL_CAPS_STYLES,
  TOOLBAR_TOP_LEVEL_TEXT_STYLES
} from './ToolbarStyles'

import {
  TOP_LEVEL_ACTIVE_BACKGROUND,
  TOP_LEVEL_LINK_LAYOUT_STYLES,
  TopLevelChevron,
  TopLevelDirectLink,
  TopLevelTrigger,
  canUseHover,
  toSectionDomId
} from './ToolbarDesktopStyles'

const SIGN_IN_ACTION_STYLES = theme({
  display: ['none', 'none', 'inline-flex', 'inline-flex'],
  alignSelf: 'center',
  height: '36px',
  ml: 2
})

const SignInActionLink = ({ onClosePanel }) => (
  <ToolbarActionLink
    forwardedAs='li'
    href={SIGN_IN_NAV_ITEM.href}
    title={SIGN_IN_NAV_ITEM.title}
    externalIcon={SIGN_IN_NAV_ITEM.externalIcon}
    data-event-location='Toolbar'
    data-event-name={SIGN_IN_NAV_ITEM.label}
    onClick={onClosePanel}
    onMouseEnter={onClosePanel}
    css={SIGN_IN_ACTION_STYLES}
  >
    <FeatherIcon icon={LogIn} size='14px' />
    <Caps as='span' css={theme(TOOLBAR_TOP_LEVEL_CAPS_STYLES)}>
      {SIGN_IN_NAV_ITEM.label}
    </Caps>
  </ToolbarActionLink>
)

const ToolbarDesktopTopLevelNav = ({
  openSection,
  activeSection,
  onTriggerClick,
  onOpenSection,
  onOpenSectionWithHover,
  onClosePanel
}) => (
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
      const isToolsSection = label === 'Tools'

      return (
        <Box
          as='li'
          key={label}
          css={theme({
            listStyle: TOOLBAR_LIST_RESET_STYLES.listStyle
          })}
        >
          {isToolsSection
            ? (
              <TopLevelDirectLink
                forwardedAs='div'
                href='/tools'
                actively='partial'
                data-event-location='Toolbar'
                data-event-name={label}
                onClick={onClosePanel}
                onMouseEnter={() => onOpenSectionWithHover(label)}
                onFocus={() => (canUseHover() ? onOpenSection(label) : undefined)}
                css={theme({
                  ...TOP_LEVEL_LINK_LAYOUT_STYLES,
                  ...TOOLBAR_TOP_LEVEL_TEXT_STYLES,
                  '> a': {
                    alignItems: 'center',
                    gap: '6px'
                  },
                  ...(isActive
                    ? {
                        backgroundColor: TOP_LEVEL_ACTIVE_BACKGROUND,
                        color: 'black'
                      }
                    : {})
                })}
              >
                <Caps as='span' css={theme(TOOLBAR_TOP_LEVEL_CAPS_STYLES)}>
                  {label}
                </Caps>
                <TopLevelChevron
                  icon={ChevronDown}
                  isOpen={openSection === label}
                  size={TOOLBAR_CHEVRON_ICON_SIZE}
                />
              </TopLevelDirectLink>
              )
            : (
              <TopLevelTrigger
                type='button'
                isActive={isActive}
                aria-haspopup='true'
                aria-expanded={openSection === label}
                aria-controls={toSectionDomId(label)}
                onClick={onTriggerClick(label)}
                onMouseEnter={() => onOpenSectionWithHover(label)}
                onFocus={() => (canUseHover() ? onOpenSection(label) : undefined)}
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
              )}
        </Box>
      )
    })}
    {DIRECT_NAV_ITEMS.map(({ label, href, actively, title, externalIcon }) => (
      <TopLevelDirectLink
        key={label}
        forwardedAs='li'
        href={href}
        actively={actively}
        title={title}
        externalIcon={externalIcon}
        data-event-location='Toolbar'
        data-event-name={label}
        onClick={onClosePanel}
        onMouseEnter={onClosePanel}
        css={theme({
          ...TOP_LEVEL_LINK_LAYOUT_STYLES,
          ...TOOLBAR_TOP_LEVEL_TEXT_STYLES
        })}
      >
        <Caps as='span' css={theme(TOOLBAR_TOP_LEVEL_CAPS_STYLES)}>
          {label}
        </Caps>
      </TopLevelDirectLink>
    ))}
    <SignInActionLink onClosePanel={onClosePanel} />
  </Flex>
)

export default ToolbarDesktopTopLevelNav
