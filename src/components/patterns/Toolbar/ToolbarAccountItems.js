import FeatherIcon from 'components/icons/Feather'
import { DashboardLink } from 'components/patterns/SignupLink'
import { withAnalytics } from 'helpers/hoc/with-analytics'
import React from 'react'
import styled from 'styled-components'
import { theme } from 'theme'

const ITEM_ICON_SIZE = '16px'

const ITEM_STYLE_PROPS = {
  display: 'flex',
  alignItems: 'center',
  gap: 2,
  width: '100%',
  px: 2,
  py: 2,
  border: 0,
  borderRadius: 3,
  bg: 'transparent',
  color: 'black80',
  fontFamily: 'sans',
  fontSize: 0,
  lineHeight: 0,
  textAlign: 'left',
  textDecoration: 'none',
  cursor: 'pointer'
}

const ITEM_STYLES = theme(ITEM_STYLE_PROPS)

const ITEM_HIGHLIGHT_STYLES = theme({ bg: 'black05', color: 'black' })

export const AccountItemLink = withAnalytics(styled.a`
  ${ITEM_STYLES};
  touch-action: manipulation;

  &:hover,
  &:focus-visible {
    ${ITEM_HIGHLIGHT_STYLES};
  }
`)

export const AccountItemButton = withAnalytics(styled.button`
  ${ITEM_STYLES};
  touch-action: manipulation;

  &:hover,
  &:focus-visible {
    ${ITEM_HIGHLIGHT_STYLES};
  }
`)

export const UpgradeItemLink = withAnalytics(styled.a`
  ${theme({
    ...ITEM_STYLE_PROPS,
    bg: 'secondary',
    color: 'white',
    fontWeight: 'bold'
  })};
  touch-action: manipulation;

  &:hover,
  &:focus-visible {
    filter: brightness(0.92);
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
  ${theme({
    display: 'block',
    fontFamily: 'sans',
    fontSize: 0,
    lineHeight: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  })};
`

export const AccountProfile = ({ profile, ...props }) => (
  <ProfileBlock {...props}>
    {profile.name && (
      <ProfileLine css={theme({ color: 'black', fontWeight: 'bold' })}>
        {profile.name}
      </ProfileLine>
    )}
    <ProfileLine css={theme({ color: 'black60' })}>{profile.email}</ProfileLine>
  </ProfileBlock>
)
