const DESKTOP_SLOTS = [false, false, true, true]

export const MOBILE_ONLY = DESKTOP_SLOTS.map(on => (on ? 'none' : 'block'))
export const DESKTOP_ONLY = DESKTOP_SLOTS.map(on => (on ? 'block' : 'none'))

export const onDesktop = (desktopValue, values) =>
  DESKTOP_SLOTS.map((on, index) => (on && desktopValue) || values[index])
