import { space, touchTargets } from 'theme'
import {
  TOOLBAR_PRIMARY_HEIGHT,
  TOOLBAR_PRIMARY_MOBILE_HEIGHT
} from 'components/elements/Toolbar'

const TOOLBAR_HEIGHTS = [
  TOOLBAR_PRIMARY_MOBILE_HEIGHT,
  TOOLBAR_PRIMARY_HEIGHT,
  TOOLBAR_PRIMARY_HEIGHT,
  TOOLBAR_PRIMARY_HEIGHT
]

const NAV_HEIGHT = `calc(${touchTargets.minHeight} + ${space[2]} * 2)`

export const NAV_TOP = TOOLBAR_HEIGHTS

export const SECTION_SCROLL_MARGIN = TOOLBAR_HEIGHTS.map(
  height => `calc(${height} + ${NAV_HEIGHT} + ${space[3]})`
)

export const CATEGORY_TITLE_FONT_SIZE = [2, 2, 3, 3]

export const CATEGORY_ICON_TILE_SIZE = space[5]

export const SKILL_ICON_TILE_SIZE = `calc(${space[4]} + ${space[2]})`
