const measureVisibleTabsHeight = (list, visibleTabs, gap) => {
  if (list.offsetParent === null) return null
  const items = [...list.children].slice(0, visibleTabs)
  return (
    items.reduce((total, item) => total + item.offsetHeight, 0) +
    Math.max(items.length - 1, 0) * gap
  )
}

export default measureVisibleTabsHeight
