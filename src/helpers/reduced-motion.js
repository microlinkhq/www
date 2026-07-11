export const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

export const REDUCED_MOTION_MEDIA = `@media ${REDUCED_MOTION_QUERY}`

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia(REDUCED_MOTION_QUERY).matches
