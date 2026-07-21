import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import { PRODUCTS, VERTICAL_ORDER } from 'components/pages/home/catalog'
import { transition, theme, colors } from 'theme'
import React from 'react'
import styled, { css } from 'styled-components'

import {
  EASE_SMOOTH,
  MenuBadge,
  VIOLET,
  VertGlyph,
  reduceMotion
} from './primitives'

const VertMenu = styled(Box)`
  will-change: transform, opacity;

  &[data-state='pre'] {
    opacity: 0;
    transform: translateY(-8px);
    pointer-events: none;
  }
  &[data-state='open'] {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 200ms ${EASE_SMOOTH}, transform 220ms ${EASE_SMOOTH};
  }
  &[data-state='closing'] {
    opacity: 0;
    transform: translateY(-6px);
    pointer-events: none;
    transition: opacity 140ms ${EASE_SMOOTH}, transform 160ms ${EASE_SMOOTH};
  }

  ${reduceMotion} {
    transition: none;
    transform: none;
  }
`

const MenuLabel = styled.span`
  ${theme({
    fontSize: 0,
    fontWeight: 'regular',
    color: 'black',
    whiteSpace: 'nowrap',
    minWidth: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  })};
`

const menuItemHighlight = css`
  ${theme({ bg: `color-mix(in oklch, ${colors.secondary} 6%, transparent)` })};
`

const MenuItem = styled(Flex)`
  cursor: pointer;
  font: inherit;
  color: inherit;
  transition: background ${transition.short};
  ${theme({
    alignItems: 'center',
    gap: 2,
    p: 2,
    borderRadius: 4,
    width: '100%',
    minWidth: 0,
    border: 0,
    textAlign: 'left',
    bg: 'transparent'
  })};

  &:focus-visible {
    outline-offset: -2px;
  }
  &[data-active='true'] {
    ${menuItemHighlight}
    ${MenuLabel} {
      ${theme({ fontWeight: 'bold' })};
    }
  }
  @media (hover: hover) and (pointer: fine) {
    &:hover {
      ${menuItemHighlight}
    }
  }
`

export const VerticalMenu = ({
  menuRef,
  menuState,
  onMenuKeyDown,
  pickVertical,
  D
}) => (
  <Box
    ref={menuRef}
    aria-hidden={menuState !== 'open'}
    css={theme({
      position: 'absolute',
      top: 'calc(100% + 8px)',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 30,
      width: 'max-content',
      maxWidth: 'calc(100vw - 32px)'
    })}
  >
    <VertMenu
      data-state={menuState}
      role='group'
      aria-label='Products'
      onKeyDown={onMenuKeyDown}
      css={theme({
        display: 'grid',
        gridTemplateColumns: 'repeat(3, minmax(0, max-content))',
        maxWidth: '100%',
        gap: '2px',
        bg: 'white',
        border: 1,
        borderColor: 'gray2',
        borderRadius: 5,
        boxShadow: '0 24px 48px -20px rgba(40,10,60,.35)',
        p: 2
      })}
    >
      {VERTICAL_ORDER.map(k => {
        const active = k === D.vertical
        return (
          <MenuItem
            key={k}
            as='button'
            type='button'
            data-menuitem
            data-active={active}
            tabIndex={active ? 0 : -1}
            aria-current={active ? 'true' : undefined}
            onClick={e => {
              e.stopPropagation()
              pickVertical(k)
            }}
          >
            <MenuBadge>
              <VertGlyph vertical={k} size={16} />
            </MenuBadge>
            <MenuLabel>{PRODUCTS[k].label}</MenuLabel>
            {active && (
              <svg
                width='15'
                height='15'
                viewBox='0 0 24 24'
                fill='none'
                stroke={VIOLET}
                strokeWidth='3'
                strokeLinecap='round'
                strokeLinejoin='round'
                aria-hidden='true'
                css={theme({ ml: 'auto' })}
              >
                <path d='M20 6 9 17l-5-5' />
              </svg>
            )}
          </MenuItem>
        )
      })}
    </VertMenu>
  </Box>
)
