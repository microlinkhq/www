const measureVisibleTabsHeight = (list, visibleTabs, gap) => {
  if (list.offsetParent === null) return null
  const items = [...list.children]
  const count = Math.min(visibleTabs, items.length)
  let height = 0
  for (let index = 0; index < count; index++) {
    height += items[index].offsetHeight
    if (index < count - 1) height += gap
  }
  return height
}

export default measureVisibleTabsHeight
