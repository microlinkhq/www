import React from 'react'
import { theme, touchTargets } from 'theme'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'

import { ENTRY_FILE } from './shared'
import { IconClose, IconPlay, IconPlus, IconReset } from './icons'
import { PaneBar } from './pane'

const iconButtonCss = theme({
  appearance: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 2,
  bg: 'transparent',
  border: 0,
  color: 'black60',
  fontFamily: 'sans',
  fontSize: 0,
  fontWeight: 'bold',
  px: 2,
  py: 1,
  minHeight: [touchTargets.minHeight, '32px', '32px', '32px'],
  borderRadius: 2,
  cursor: 'pointer',
  '&:hover': { color: 'black', bg: 'gray1' },
  '&:focus-visible': {
    outline: '2px solid',
    outlineColor: 'link'
  },
  '&:disabled': { opacity: 0.5, cursor: 'not-allowed' }
})

export const IconButton = ({ children, ...props }) => (
  <Box as='button' type='button' css={iconButtonCss} {...props}>
    {children}
  </Box>
)

const FileTab = ({ name, selected, closable, onSelect, onClose }) => (
  <Flex
    css={theme({
      alignItems: 'center',
      bg: selected ? 'gray1' : 'transparent',
      borderRadius: 2,
      color: selected ? 'black' : 'black60',
      '&:hover': { color: 'black', bg: 'gray1' }
    })}
  >
    <Box
      as='button'
      type='button'
      role='tab'
      aria-selected={selected}
      onClick={onSelect}
      onMouseDown={event => event.preventDefault()}
      css={theme({
        appearance: 'none',
        bg: 'transparent',
        border: 0,
        color: 'inherit',
        fontFamily: 'mono',
        fontSize: 0,
        fontWeight: selected ? 'bold' : 'normal',
        pl: 3,
        pr: closable ? 1 : 3,
        py: 2,
        minHeight: [touchTargets.minHeight, '32px', '32px', '32px'],
        cursor: 'pointer',
        '&:focus-visible': {
          outline: '2px solid',
          outlineColor: 'link'
        }
      })}
    >
      <Text as='span' css={theme({ fontSize: 'inherit' })}>
        {name}
      </Text>
    </Box>
    {closable && (
      <Box
        as='button'
        type='button'
        aria-label={`Close ${name}`}
        onMouseDown={event => event.preventDefault()}
        onClick={onClose}
        css={theme({
          appearance: 'none',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          bg: 'transparent',
          border: 0,
          width: '24px',
          height: '24px',
          mr: 1,
          borderRadius: 1,
          color: 'black50',
          cursor: 'pointer',
          '&:hover': { color: 'black', bg: 'black05' },
          '&:focus-visible': {
            outline: '2px solid',
            outlineColor: 'link'
          }
        })}
      >
        <IconClose />
      </Box>
    )}
  </Flex>
)

const FileBar = ({
  files,
  activeFile,
  onSelect,
  onAdd,
  onClose,
  onReset,
  onRun,
  isRunning
}) => {
  const names = Object.keys(files)
  return (
    <PaneBar>
      <Flex
        role='tablist'
        aria-label='Files'
        css={theme({
          alignItems: 'center',
          gap: 1,
          flex: 1,
          minWidth: 0,
          overflowX: 'auto'
        })}
      >
        {names.map(name => (
          <FileTab
            key={name}
            name={name}
            selected={name === activeFile}
            closable={name !== ENTRY_FILE && names.length > 1}
            onSelect={() => onSelect(name)}
            onClose={() => onClose(name)}
          />
        ))}
        <IconButton aria-label='Add file' onClick={onAdd}>
          <IconPlus />
        </IconButton>
      </Flex>
      <Flex css={theme({ alignItems: 'center', gap: 1, flexShrink: 0 })}>
        <IconButton aria-label='Reset files' onClick={onReset}>
          <IconReset />
          Reset
        </IconButton>
        <IconButton
          aria-label={isRunning ? 'Running…' : 'Run the code'}
          onClick={onRun}
          disabled={isRunning}
          css={[
            iconButtonCss,
            theme({
              bg: 'black',
              color: 'white',
              px: 3,
              '&:hover': { bg: 'gray8', color: 'white' }
            })
          ]}
        >
          <IconPlay />
          Run
        </IconButton>
      </Flex>
    </PaneBar>
  )
}

export default FileBar
