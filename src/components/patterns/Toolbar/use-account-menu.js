import { useCallback, useEffect, useRef, useState } from 'react'

const MENU_ITEM_SELECTOR = '[role="menuitem"]'

export const nextMenuIndex = (key, index, count) => {
  if (count === 0) return -1
  if (key === 'ArrowDown') return (index + 1) % count
  if (key === 'ArrowUp') return index <= 0 ? count - 1 : index - 1
  if (key === 'Home') return 0
  if (key === 'End') return count - 1
  return null
}

const OPEN_KEYS = {
  ArrowDown: 'first',
  Enter: 'first',
  ' ': 'first',
  ArrowUp: 'last'
}

const CLOSE_KEYS = ['Escape', 'Tab']

const menuItems = menu =>
  menu ? Array.from(menu.querySelectorAll(MENU_ITEM_SELECTOR)) : []

export const popupPosition = (triggerRect, viewportWidth, offset) => ({
  top: triggerRect.bottom + offset,
  right: viewportWidth - triggerRect.right
})

export const useAccountMenu = ({ offset }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [focusTarget, setFocusTarget] = useState('first')
  const [position, setPosition] = useState(null)
  const triggerRef = useRef(null)
  const popupRef = useRef(null)
  const menuRef = useRef(null)

  const measure = useCallback(
    () =>
      popupPosition(
        triggerRef.current.getBoundingClientRect(),
        document.documentElement.clientWidth,
        offset
      ),
    [offset]
  )

  const open = useCallback(
    target => {
      setPosition(measure())
      setFocusTarget(target)
      setIsOpen(true)
    },
    [measure]
  )

  const close = useCallback(({ restoreFocus = false } = {}) => {
    setIsOpen(false)
    if (restoreFocus) triggerRef.current?.focus()
  }, [])

  useEffect(() => {
    if (!isOpen) return
    const onResize = () => close()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [isOpen, close])

  useEffect(() => {
    if (!isOpen) return
    const items = menuItems(menuRef.current)
    const item = focusTarget === 'last' ? items[items.length - 1] : items[0]
    item?.focus()
  }, [isOpen, focusTarget])

  useEffect(() => {
    if (!isOpen) return
    const isInside = target =>
      triggerRef.current?.contains(target) || popupRef.current?.contains(target)
    const onPointerDown = event => {
      if (!isInside(event.target)) close()
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [isOpen, close])

  const onTriggerClick = () => (isOpen ? close() : open('first'))

  const onTriggerKeyDown = event => {
    const target = OPEN_KEYS[event.key]
    if (!target) return
    event.preventDefault()
    open(target)
  }

  const onMenuKeyDown = event => {
    if (CLOSE_KEYS.includes(event.key)) {
      event.preventDefault()
      close({ restoreFocus: true })
      return
    }
    const items = menuItems(menuRef.current)
    const index = nextMenuIndex(
      event.key,
      items.indexOf(document.activeElement),
      items.length
    )
    if (index === null) return
    event.preventDefault()
    items[index]?.focus()
  }

  return {
    isOpen,
    position,
    close,
    triggerRef,
    popupRef,
    menuRef,
    onTriggerClick,
    onTriggerKeyDown,
    onMenuKeyDown
  }
}
