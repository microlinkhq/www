import React, { createElement, useState, useEffect } from 'react'
import Flex from 'components/elements/Flex'
import { fontSizes, cx, theme } from 'theme'

// Dynamic import cache to avoid re-importing
const iconCache = new Map()

const getWidth = size => {
  if (Array.isArray(size)) return size.map(index => fontSizes[index])
  return fontSizes[size]
}

const FeatherIcon = ({ color, icon, size = [1, 1, 2, 2], ...props }) => {
  const [IconComponent, setIconComponent] = useState(null)

  useEffect(() => {
    const loadIcon = async () => {
      try {
        // Check cache first
        if (iconCache.has(icon)) {
          setIconComponent(iconCache.get(icon))
          return
        }

        // Dynamic import only the specific icon we need
        const iconModule = await import(
          `react-feather/dist/icons/${icon.toLowerCase()}.js`
        )
        const IconComp = iconModule.default || iconModule[icon]

        // Cache the icon component
        iconCache.set(icon, IconComp)
        setIconComponent(IconComp)
      } catch (error) {
        console.warn(`[FeatherIcon] Failed to load icon: ${icon}`, error)
        // Fallback: try to load from the main bundle
        try {
          const { [icon]: FallbackIcon } = await import('react-feather')
          iconCache.set(icon, FallbackIcon)
          setIconComponent(FallbackIcon)
        } catch (fallbackError) {
          console.error(
            `[FeatherIcon] Fallback failed for icon: ${icon}`,
            fallbackError
          )
        }
      }
    }

    if (icon) {
      loadIcon()
    }
  }, [icon])

  return (
    <Flex
      css={theme({
        justifyContent: 'center',
        width: getWidth(size),
        height: '100%'
      })}
      as='span'
      {...props}
    >
      {IconComponent &&
        createElement(IconComponent, {
          color: color ? cx(color) : undefined
        })}
    </Flex>
  )
}

export default React.memo(FeatherIcon)
