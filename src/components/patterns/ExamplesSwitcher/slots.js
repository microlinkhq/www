const DESKTOP_FROM = 2

export const MOBILE_ONLY = ['block', 'block', 'none', 'none']
export const DESKTOP_ONLY = ['none', 'none', 'block', 'block']

export const onDesktop = (desktopValue, values) =>
  values.map((value, index) =>
    index >= DESKTOP_FROM && desktopValue ? desktopValue : value
  )
