import { ACCOUNT_SETTINGS_PATH, UPGRADE_PATH } from 'helpers/dashboard-account'
import { LOGIN_PATH } from 'helpers/dashboard-url'
import { Layout, LogIn, LogOut, Settings, Zap } from 'react-feather'

export const ACCOUNT_MENU_LABEL = 'Microlink account'

export const SIGN_IN_LINK = {
  label: 'Sign In',
  title: 'Sign in to the Microlink dashboard',
  icon: LogIn,
  dashboardPath: LOGIN_PATH,
  ctaAction: 'sign-in'
}

export const DASHBOARD_LINK = {
  label: 'Dashboard',
  title: 'Open the Microlink dashboard',
  icon: Layout,
  dashboardPath: '/',
  ctaAction: 'dashboard'
}

export const SETTINGS_LINK = {
  label: 'Settings',
  icon: Settings,
  dashboardPath: ACCOUNT_SETTINGS_PATH,
  ctaAction: 'settings'
}

export const UPGRADE_LINK = {
  label: 'Buy plan',
  icon: Zap,
  dashboardPath: UPGRADE_PATH,
  ctaAction: 'buy-plan'
}

export const SIGN_OUT_ACTION = {
  label: 'Sign out',
  icon: LogOut
}
