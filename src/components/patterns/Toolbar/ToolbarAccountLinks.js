import {
  ACCOUNT_SETTINGS_PATH,
  CHANGELOG_PATH,
  PLAYGROUND_PATH,
  UPGRADE_PATH
} from 'helpers/dashboard-account'
import { LOGIN_PATH } from 'helpers/dashboard-url'
import {
  FlaskConical,
  LayoutDashboard,
  LogIn,
  LogOut,
  Settings,
  Sparkles,
  Zap
} from 'lucide-react'

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
  icon: LayoutDashboard,
  dashboardPath: '/',
  ctaAction: 'dashboard'
}

export const PLAYGROUND_LINK = {
  label: 'Playground',
  icon: FlaskConical,
  dashboardPath: PLAYGROUND_PATH,
  ctaAction: 'playground'
}

export const SETTINGS_LINK = {
  label: 'Settings',
  icon: Settings,
  dashboardPath: ACCOUNT_SETTINGS_PATH,
  ctaAction: 'settings'
}

export const CHANGELOG_LINK = {
  label: 'Changelog',
  icon: Sparkles,
  dashboardPath: CHANGELOG_PATH,
  ctaAction: 'changelog'
}

export const ACCOUNT_MENU_LINKS = [
  DASHBOARD_LINK,
  PLAYGROUND_LINK,
  SETTINGS_LINK,
  CHANGELOG_LINK
]

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
