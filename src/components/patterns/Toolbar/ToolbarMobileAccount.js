import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import {
  endSession,
  useDashboardAccount
} from 'components/hook/use-dashboard-account'
import { accountMenuMode, isFreeAccount } from 'helpers/dashboard-account'
import React from 'react'
import { theme } from 'theme'

import ToolbarAccountAction from './ToolbarAccountAction'
import ToolbarAccountAvatar from './ToolbarAccountAvatar'
import {
  AccountDashboardItem,
  AccountItemButton,
  AccountProfile,
  ItemIcon,
  UpgradeItemLink
} from './ToolbarAccountItems'
import {
  DASHBOARD_LINK,
  SETTINGS_LINK,
  SIGN_IN_LINK,
  SIGN_OUT_ACTION,
  UPGRADE_LINK
} from './ToolbarAccountLinks'
import { TOOLBAR_LIST_RESET_STYLES } from './ToolbarStyles'

const ACTION_STYLES = {
  display: 'flex',
  width: '100%',
  height: '44px'
}

const MOBILE_ITEM_STYLES = { minHeight: '44px', fontSize: 1 }

const SignedInAccount = ({ account, ctaLocation, onNavigate }) => (
  <>
    <Flex css={theme({ alignItems: 'center', gap: 2, px: 2, pb: 2 })}>
      <ToolbarAccountAvatar profile={account.profile} />
      <AccountProfile profile={account.profile} />
    </Flex>
    <Box as='ul' css={theme(TOOLBAR_LIST_RESET_STYLES)}>
      <li>
        <AccountDashboardItem
          link={SETTINGS_LINK}
          ctaLocation={ctaLocation}
          onClick={onNavigate}
          css={theme(MOBILE_ITEM_STYLES)}
        />
      </li>
      <li>
        <AccountItemButton
          type='button'
          data-event-location='Toolbar'
          data-event-name={SIGN_OUT_ACTION.label}
          onClick={() => endSession(document, account)}
          css={theme(MOBILE_ITEM_STYLES)}
        >
          <ItemIcon icon={SIGN_OUT_ACTION.icon} />
          {SIGN_OUT_ACTION.label}
        </AccountItemButton>
      </li>
      {isFreeAccount(account) && (
        <li>
          <AccountDashboardItem
            link={UPGRADE_LINK}
            ctaLocation={ctaLocation}
            component={UpgradeItemLink}
            onClick={onNavigate}
            css={theme({ ...MOBILE_ITEM_STYLES, mt: 2 })}
          />
        </li>
      )}
    </Box>
  </>
)

const ToolbarMobileAccount = ({ ctaLocation, onNavigate }) => {
  const { account, signedIn } = useDashboardAccount()
  const mode = accountMenuMode(account, signedIn)

  if (mode === 'sign-in') {
    return (
      <ToolbarAccountAction
        link={SIGN_IN_LINK}
        ctaLocation={ctaLocation}
        onClick={onNavigate}
        css={theme({ ...ACTION_STYLES, mt: 3 })}
      />
    )
  }

  return (
    <Box css={theme({ mt: 3, pt: 3, borderTop: 1, borderColor: 'black10' })}>
      {account && (
        <SignedInAccount
          account={account}
          ctaLocation={ctaLocation}
          onNavigate={onNavigate}
        />
      )}
      <ToolbarAccountAction
        link={DASHBOARD_LINK}
        ctaLocation={ctaLocation}
        onClick={onNavigate}
        css={theme({ ...ACTION_STYLES, mt: 2 })}
      />
    </Box>
  )
}

export default ToolbarMobileAccount
