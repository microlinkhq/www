let open = false
const listeners = new Set()

export const isMobileMenuOpen = () => open

export const setMobileMenuOpen = next => {
  if (open === next) return
  open = next
  listeners.forEach(listener => listener(open))
}

export const subscribeMobileMenuOpen = listener => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}
