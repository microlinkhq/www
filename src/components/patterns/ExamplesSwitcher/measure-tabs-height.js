const measureTabsHeight = (list, visibleTabs) => {
  if (list.offsetParent === null) return null
  const count = Math.min(visibleTabs, list.children.length)
  if (!count) return null
  const first = list.children[0]
  const last = list.children[count - 1]
  return last.offsetTop + last.offsetHeight - first.offsetTop
}

export default measureTabsHeight
