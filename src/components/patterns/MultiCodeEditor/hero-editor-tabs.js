import React from 'react'
import { theme, touchTargets, transition } from 'theme'

import Box from 'components/elements/Box'

const tablistCss = theme({
  display: 'flex',
  alignItems: 'stretch',
  width: '100%',
  minWidth: 0,
  overflowX: 'auto',
  overflowY: 'hidden'
})

const tabCss = isActive =>
  theme({
    appearance: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: '0 0 auto',
    gap: 2,
    height: [touchTargets.minHeight, '36px', '36px', '36px'],
    minHeight: [touchTargets.minHeight, '36px', '36px', '36px'],
    px: 2,
    py: 0,
    border: 0,
    borderRight: 1,
    borderRightColor: 'black10',
    borderRadius: 0,
    bg: isActive ? 'white' : 'transparent',
    color: isActive ? 'black' : 'black50',
    fontFamily: 'sans',
    fontSize: 0,
    fontWeight: isActive ? 'regular' : 'normal',
    lineHeight: 0,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    mb: '-1px',
    borderBottom: 1,
    borderBottomColor: isActive ? 'white' : 'transparent',
    '&:hover': {
      color: isActive ? 'black' : 'black80'
    },
    '&:focus-visible': {
      outline: '2px solid',
      outlineColor: 'link',
      outlineOffset: '-2px',
      zIndex: 1
    }
  })

export const HeroEditorTabs = ({
  examples,
  selectedIndex,
  onSelect,
  ariaLabel = 'Examples',
  idPrefix = 'hero-editor-tab',
  controlsId = 'hero-editor'
}) => {
  const onKeyDown = event => {
    const last = examples.length - 1
    let next = selectedIndex
    if (event.key === 'ArrowRight') {
      next = selectedIndex === last ? 0 : selectedIndex + 1
    } else if (event.key === 'ArrowLeft') {
      next = selectedIndex === 0 ? last : selectedIndex - 1
    } else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = last
    else return
    event.preventDefault()
    onSelect(next)
    const tabs = event.currentTarget.querySelectorAll('[role="tab"]')
    tabs[next]?.focus()
  }

  return (
    <Box
      role='tablist'
      aria-label={ariaLabel}
      onKeyDown={onKeyDown}
      css={tablistCss}
    >
      {examples.map(({ label, icon }, index) => {
        const isActive = index === selectedIndex
        const tabId = `${idPrefix}-${index}`
        return (
          <Box
            key={label}
            as='button'
            type='button'
            id={tabId}
            role='tab'
            aria-selected={isActive}
            aria-controls={controlsId}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onSelect(index)}
            css={[
              tabCss(isActive),
              {
                touchAction: 'manipulation',
                transition: `color ${transition.short}, background-color ${transition.short}, border-color ${transition.short}`
              }
            ]}
          >
            {icon}
            {label}
          </Box>
        )
      })}
    </Box>
  )
}
