const measureVisibleTabsHeight = (list, visibleTabs) => {
  if (list.offsetParent === null) return null
  const items = [...list.children].slice(0, visibleTabs)
  if (!items.length) return 0
  const last = items[items.length - 1]
  return last.offsetTop + last.offsetHeight - items[0].offsetTop
}

export default measureVisibleTabsHeight
