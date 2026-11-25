import { describe, expect, test } from 'vitest'

import { dashboardUrl } from '../../../../../src/helpers/dashboard-url'
import {
  ACCOUNT_MENU_LINKS,
  UPGRADE_LINK
} from '../../../../../src/components/patterns/Toolbar/ToolbarAccountLinks'

const DASHBOARD = 'https://dashboard.microlink.io'

const pageOf = dashboardPath => {
  const { origin, pathname } = new URL(dashboardUrl(dashboardPath))
  return `${origin}${pathname}`
}

describe('toolbar account menu links', () => {
  test('lists the dashboard pages in the same order as the nodebox menu', () => {
    expect(
      ACCOUNT_MENU_LINKS.map(link => [link.label, pageOf(link.dashboardPath)])
    ).toEqual([
      ['Dashboard', `${DASHBOARD}/`],
      ['Playground', `${DASHBOARD}/playground`],
      ['Settings', `${DASHBOARD}/settings`],
      ['Changelog', `${DASHBOARD}/changelog`]
    ])
  })

  test('gives every link its own analytics action and an icon', () => {
    const actions = ACCOUNT_MENU_LINKS.map(link => link.ctaAction)
    expect(new Set(actions).size).toBe(actions.length)
    for (const link of ACCOUNT_MENU_LINKS) expect(link.icon).toBeTruthy()
  })

  test('keeps Buy plan out of the regular links', () => {
    expect(ACCOUNT_MENU_LINKS).not.toContain(UPGRADE_LINK)
    expect(pageOf(UPGRADE_LINK.dashboardPath)).toBe(`${DASHBOARD}/plans/create`)
  })
})
