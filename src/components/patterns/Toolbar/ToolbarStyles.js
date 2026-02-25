import { fontWeights } from 'theme'

export const TOOLBAR_LIST_RESET_STYLES = {
  listStyle: 'none',
  p: 0,
  m: 0
}

export const TOOLBAR_TOP_LEVEL_TEXT_STYLES = {
  fontSize: 0,
  color: 'black80'
}

export const TOOLBAR_TOP_LEVEL_CAPS_STYLES = {
  fontSize: 0,
  color: 'inherit',
  fontWeight: 'inherit'
}

export const TOOLBAR_CHEVRON_ICON_SIZE = '12px'

export const TOOLBAR_MENU_ITEM_ICON_STYLES = {
  height: '18px',
  width: '18px',
  color: 'black60'
}

export const TOOLBAR_MENU_ITEM_MEDIA_STYLES = {
  ...TOOLBAR_MENU_ITEM_ICON_STYLES,
  position: 'relative',
  top: '6px'
}

export const TOOLBAR_RESOURCE_MENU_ITEM_MEDIA_STYLES = {
  ...TOOLBAR_MENU_ITEM_ICON_STYLES,
  position: 'relative',
  top: '6px'
}

export const TOOLBAR_MENU_ITEM_TITLE_STYLES = {
  display: 'block',
  fontSize: 1,
  lineHeight: 0,
  fontFamily: 'sans',
  fontWeight: fontWeights.regular,
  color: 'black80',
  _hover: {
    color: 'black'
  }
}

export const TOOLBAR_MENU_ITEM_DESCRIPTION_STYLES = {
  display: 'block',
  fontSize: 0,
  lineHeight: 1,
  color: 'black60'
}

export const TOOLBAR_SECTION_DESCRIPTION_STYLES = {
  fontSize: 0,
  lineHeight: 2,
  color: 'black60'
}
