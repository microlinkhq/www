export function trackEvent (name, props = {}) {
  if (typeof window !== 'undefined' && typeof window.plausible === 'function') {
    window.plausible(name, { props })
  } else {
    console.log(`[Plausible] ${name}`, props)
  }
}
