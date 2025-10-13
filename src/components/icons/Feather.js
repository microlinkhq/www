import React, { lazy, Suspense } from 'react'
import Flex from 'components/elements/Flex'
import { fontSizes, cx, theme } from 'theme'

const getWidth = size => {
  if (Array.isArray(size)) return size.map(index => fontSizes[index])
  return fontSizes[size]
}

const FeatherIcon = ({ color, icon, size = [1, 1, 2, 2], ...props }) => {
  // Ensure icon name is lowercase and kebab-case for filename
  const iconFileName = icon.toLowerCase()

  // Lazy load only the specific icon we need
  const LazyIcon = lazy(() =>
    import(`react-feather/dist/icons/${iconFileName}.js`).catch(() => {
      // Fallback: if individual icon fails, load from main bundle
      console.warn(`[FeatherIcon] Fallback to main bundle for icon: ${icon}`)
      // Convert to PascalCase for main bundle access
      const pascalCaseIcon =
        icon.charAt(0).toUpperCase() +
        icon.slice(1).replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())
      return import('react-feather').then(module => ({
        default: module[pascalCaseIcon]
      }))
    })
  )

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
      <Suspense fallback={null}>
        <LazyIcon color={color ? cx(color) : undefined} />
      </Suspense>
    </Flex>
  )
}

export default React.memo(FeatherIcon)
