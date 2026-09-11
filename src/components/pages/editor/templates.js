import React, { useEffect, useRef } from 'react'
import { theme, touchTargets } from 'theme'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import { Link } from 'components/elements/Link'

import { DOCS_HREF } from './shared'
import { EXAMPLES } from './examples'

const Templates = ({ open, selectedId, onToggle, onSelect }) => {
  const panelRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const onPointer = event => {
      if (!panelRef.current?.contains(event.target)) onToggle(false)
    }
    const onKey = event => {
      if (event.key === 'Escape') onToggle(false)
    }
    document.addEventListener('mousedown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open, onToggle])

  return (
    <Box ref={panelRef} css={theme({ position: 'relative' })}>
      <Text as='span' css={theme({ fontSize: 0, color: 'black60' })}>
        Need examples?{' '}
        <Box
          as='button'
          type='button'
          aria-expanded={open}
          aria-haspopup='listbox'
          onClick={() => onToggle(!open)}
          css={theme({
            appearance: 'none',
            bg: 'transparent',
            border: 0,
            p: 0,
            color: 'link',
            fontFamily: 'sans',
            fontSize: 0,
            cursor: 'pointer',
            minHeight: touchTargets.minHeight,
            '&:focus-visible': {
              outline: '2px solid',
              outlineColor: 'link'
            }
          })}
        >
          View templates →
        </Box>
      </Text>
      {open && (
        <Flex
          as='ul'
          role='listbox'
          aria-label='Templates'
          css={theme({
            position: 'absolute',
            bottom: '36px',
            left: 0,
            flexDirection: 'column',
            minWidth: '220px',
            m: 0,
            p: 2,
            listStyle: 'none',
            bg: 'white',
            border: 1,
            borderColor: 'black10',
            borderRadius: 3,
            boxShadow: 3,
            zIndex: 3
          })}
        >
          {EXAMPLES.map(example => (
            <Box
              as='li'
              key={example.id}
              role='option'
              aria-selected={example.id === selectedId}
              onMouseDown={event => event.preventDefault()}
              onClick={() => {
                onSelect(example.id)
                onToggle(false)
              }}
              css={theme({
                fontFamily: 'sans',
                fontSize: 0,
                px: 3,
                py: 2,
                borderRadius: 2,
                cursor: 'pointer',
                '&:hover': { bg: 'gray1' }
              })}
            >
              {example.label}
            </Box>
          ))}
          <Box
            as='li'
            css={theme({
              borderTop: 1,
              borderTopColor: 'black05',
              mt: 1,
              pt: 2,
              px: 3
            })}
          >
            <Link href={DOCS_HREF} css={theme({ fontSize: 0 })}>
              Function docs
            </Link>
          </Box>
        </Flex>
      )}
    </Box>
  )
}

export default Templates
