const DESKTOP_FROM = 2

const isDesktop = index => index >= DESKTOP_FROM

export const onDesktop = (desktopValue, values) =>
  values.map((value, index) =>
    isDesktop(index) && desktopValue ? desktopValue : value
  )
