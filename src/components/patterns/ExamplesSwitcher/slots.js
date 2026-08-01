const SLOTS = 4
const DESKTOP_FROM = 2

const isDesktop = index => index >= DESKTOP_FROM

const slots = pick => Array.from({ length: SLOTS }, (_, index) => pick(index))

export const MOBILE_ONLY = slots(index => (isDesktop(index) ? 'none' : 'block'))
export const DESKTOP_ONLY = slots(index =>
  isDesktop(index) ? 'block' : 'none'
)

export const onDesktop = (desktopValue, values) =>
  values.map((value, index) =>
    isDesktop(index) && desktopValue ? desktopValue : value
  )
