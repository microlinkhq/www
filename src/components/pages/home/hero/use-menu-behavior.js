import { useEffect } from 'react'

export const useMenuBehavior = ({ menuState, chipRef, menuRef, closeMenu }) => {
  useEffect(() => {
    if (menuState !== 'open') return undefined
    const onDown = e => {
      const inChip = chipRef.current && chipRef.current.contains(e.target)
      const inMenu = menuRef.current && menuRef.current.contains(e.target)
      if (!inChip && !inMenu) closeMenu()
    }
    const onKey = e => {
      if (e.key === 'Escape') {
        closeMenu()
        if (chipRef.current) chipRef.current.focus()
      }
    }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [menuState, chipRef, menuRef, closeMenu])

  useEffect(() => {
    if (menuState !== 'open') return
    const el =
      menuRef.current && menuRef.current.querySelector('[data-active="true"]')
    if (el) el.focus()
  }, [menuState, menuRef])
}
