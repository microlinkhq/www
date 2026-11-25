import FeatherIcon from 'components/icons/Feather'
import { DashboardLink } from 'components/patterns/SignupLink'
import { withAnalytics } from 'helpers/hoc/with-analytics'
import React from 'react'
import styled from 'styled-components'
import { theme } from 'theme'

import {
  ACCOUNT_COLORS,
  ACCOUNT_EMAIL_FONT_SIZE,
  ACCOUNT_EMAIL_LINE_HEIGHT,
  ACCOUNT_FONT_SIZE,
  ACCOUNT_ITEM_GAP,
  ACCOUNT_ITEM_PX,
  ACCOUNT_LINE_HEIGHT,
  ACCOUNT_SEMIBOLD,
  ACCOUNT_UPGRADE_PY,
  accountPalette
} from './ToolbarAccountPalette'

const ITEM_ICON_SIZE = '16px'

const ITEM_STYLE_PROPS = {
  display: 'flex',
  alignItems: 'center',
  gap: ACCOUNT_ITEM_GAP,
  width: '100%',
  px: ACCOUNT_ITEM_PX,
  py: 2,
  border: 0,
  borderRadius: 4,
  bg: 'transparent',
  color: ACCOUNT_COLORS.inkSoft,
  fontFamily: 'sans',
  fontSize: ACCOUNT_FONT_SIZE,
  fontWeight: 'normal',
  lineHeight: ACCOUNT_LINE_HEIGHT,
  textAlign: 'left',
  textDecoration: 'none',
  cursor: 'pointer'
}

const ITEM_STYLES = theme({
  ...ITEM_STYLE_PROPS,
  '& svg': { color: ACCOUNT_COLORS.inkFaint }
})

const ITEM_HIGHLIGHT_STYLES = theme({
  bg: ACCOUNT_COLORS.paper,
  color: ACCOUNT_COLORS.ink
})

export const AccountItemLink = withAnalytics(styled.a`
  ${accountPalette};
  ${ITEM_STYLES};
  touch-action: manipulation;

  &:hover,
  &:focus-visible {
    ${ITEM_HIGHLIGHT_STYLES};
  }
`)

export const AccountItemButton = withAnalytics(styled.button`
  ${accountPalette};
  ${ITEM_STYLES};
  touch-action: manipulation;

  &:hover,
  &:focus-visible {
    ${ITEM_HIGHLIGHT_STYLES};
  }
`)

export const UpgradeItemLink = withAnalytics(styled.a`
  ${accountPalette};
  ${theme({
    ...ITEM_STYLE_PROPS,
    gap: 2,
    py: ACCOUNT_UPGRADE_PY,
    bg: ACCOUNT_COLORS.brand,
    color: 'white',
    fontWeight: ACCOUNT_SEMIBOLD
  })};
  touch-action: manipulation;

  &:hover,
  &:focus-visible {
    ${theme({ bg: ACCOUNT_COLORS.brandStrong })};
  }
`)

export const ItemIcon = ({ icon }) => (
  <FeatherIcon icon={icon} size={ITEM_ICON_SIZE} aria-hidden='true' />
)

export const AccountDashboardItem = ({
  link,
  ctaLocation,
  component = AccountItemLink,
  ...props
}) => (
  <DashboardLink
    component={component}
    target='_blank'
    rel='noopener noreferrer'
    cta={`${ctaLocation}:${link.ctaAction}`}
    dashboardPath={link.dashboardPath}
    data-event-location='Toolbar'
    data-event-name={link.label}
    {...props}
  >
    <ItemIcon icon={link.icon} />
    {link.label}
  </DashboardLink>
)

const ProfileBlock = styled.div`
  ${theme({ display: 'flex', flexDirection: 'column', minWidth: 0 })};
`

const ProfileLine = styled.span`
  ${accountPalette};
  ${theme({
    display: 'block',
    fontFamily: 'sans',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  })};
`

const ProfileName = styled(ProfileLine)`
  ${theme({
    color: ACCOUNT_COLORS.ink,
    fontSize: ACCOUNT_FONT_SIZE,
    fontWeight: 'regular',
    lineHeight: ACCOUNT_LINE_HEIGHT
  })};
`

const ProfileEmail = styled(ProfileLine)`
  ${theme({
    color: ACCOUNT_COLORS.inkMuted,
    fontSize: ACCOUNT_EMAIL_FONT_SIZE,
    lineHeight: ACCOUNT_EMAIL_LINE_HEIGHT
  })};
`

export const AccountProfile = ({ profile, ...props }) => (
  <ProfileBlock {...props}>
    {profile.name && <ProfileName>{profile.name}</ProfileName>}
    <ProfileEmail>{profile.email}</ProfileEmail>
  </ProfileBlock>
)
