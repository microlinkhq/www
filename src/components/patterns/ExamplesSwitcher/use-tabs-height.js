import { useLayoutEffect, useState } from 'react'

import measureTabsHeight from './measure-tabs-height'
import observeTabsResize from './observe-tabs-resize'

const useTabsHeight = (listRef, panels, visibleTabs) => {
  const [tabsHeight, setTabsHeight] = useState(undefined)

  useLayoutEffect(() => {
    const list = listRef.current
    if (!list || !visibleTabs) {
      setTabsHeight(undefined)
      return undefined
    }

    const update = () => {
      const measured = measureTabsHeight(list, visibleTabs)
      setTabsHeight(measured ? `${measured}px` : undefined)
    }

    update()
    return observeTabsResize(list, update, { includeList: false })
  }, [panels, visibleTabs])

  return tabsHeight
}

export default useTabsHeight
