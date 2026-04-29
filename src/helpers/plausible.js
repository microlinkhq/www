const sent = new Set()

export function trackEvent (name, props = {}) {
  const key = JSON.stringify([name, props])
  if (sent.has(key)) return
  sent.add(key)

  if (typeof window !== 'undefined' && typeof window.plausible === 'function') {
    window.plausible(name, { props })
  } else {
    console.log(`[Plausible] ${name}`, props)
  }
}
