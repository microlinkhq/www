import React, { useEffect, useState } from 'react'

import Box from 'components/elements/Box'
import { colors, theme } from 'theme'

// Shared JSON visualizer used on /integrations/cli and embedded in blog posts.
// Wraps @microlink/react-json-view with the terminal theme + collapse defaults,
// loaded lazily so the bundle stays out of the initial payload.

const TERMINAL_JSON_THEME = {
  base00: 'rgba(0, 0, 0, 0)',
  base01: colors.white,
  base02: colors.black10,
  base03: colors.black50,
  base04: colors.black50,
  base05: colors.black80,
  base06: colors.black,
  base07: colors.black,
  base08: colors.red6,
  base09: colors.green6,
  base0A: colors.black50,
  base0B: colors.blue6,
  base0C: colors.violet4,
  base0D: colors.black80,
  base0E: colors.green5,
  base0F: colors.blue6
}

const JSON_DEFAULT_EXPAND_LEVEL = 2

// react-json-view only applies shouldCollapse when collapsed > depth; +1 unlocks
// per-field control at the deepest default level (e.g. response.body).
export const JSON_COLLAPSED_DEPTH = JSON_DEFAULT_EXPAND_LEVEL + 1

// Default rule: expand the first couple of levels, then collapse nested objects
// and non-empty arrays. Callers can pass a custom shouldCollapse to override.
const defaultShouldCollapse = field => {
  const namespaceDepth = field.namespace?.length ?? 0

  if (namespaceDepth <= JSON_DEFAULT_EXPAND_LEVEL) return false

  if (field.name === 'body') return false

  return (
    field.type === 'object' ||
    (field.type === 'array' && Array.isArray(field.src) && field.src.length > 0)
  )
}

const jsonViewCss = theme({
  fontFamily: 'mono',
  fontSize: '13px',
  lineHeight: '20px',
  '& .react-json-view': {
    backgroundColor: 'transparent !important',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    lineHeight: 'inherit',
    padding: 0,
    margin: 0
  },
  '& .react-json-view div > span': {
    padding: 0
  },
  '& .pretty-json-container > .object-content > .object-key-val': {
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: '0 !important',
    marginLeft: 0,
    borderLeft: '0 !important'
  },
  '& .icon-container': {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    verticalAlign: 'baseline',
    position: 'relative',
    top: '1px',
    width: '14px',
    height: '1em',
    lineHeight: 1,
    marginLeft: 0,
    paddingLeft: 0,
    flexShrink: 0
  },
  '& .expanded-icon, & .collapsed-icon': {
    display: 'inline-flex',
    alignItems: 'center',
    lineHeight: 1
  },
  '& .expanded-icon svg, & .collapsed-icon svg': {
    display: 'block',
    verticalAlign: 'middle',
    paddingLeft: '0 !important'
  },
  '& .object-key-val .object-key-val': {
    paddingTop: 0,
    paddingBottom: 0,
    borderLeft: `1px solid ${colors.black10}`
  },
  '& .brace-row, & .icon-container': {
    cursor: 'pointer'
  }
})

const JsonView = ({
  src,
  collapsed = JSON_COLLAPSED_DEPTH,
  shouldCollapse = defaultShouldCollapse,
  collapseStringsAfterLength = 72,
  ...props
}) => {
  const [ReactJson, setReactJson] = useState(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let cancelled = false

    import('@microlink/react-json-view')
      .then(module => {
        if (!cancelled) setReactJson(() => module.default)
      })
      .catch(() => {
        if (!cancelled) setFailed(true)
      })

    return () => {
      cancelled = true
    }
  }, [])

  // If the viewer chunk fails to load, degrade to plaintext JSON instead of
  // rendering nothing.
  if (failed) {
    return (
      <Box as='pre' css={jsonViewCss} {...props}>
        {JSON.stringify(src, null, 2)}
      </Box>
    )
  }

  if (!ReactJson) return null

  return (
    <Box css={jsonViewCss} {...props}>
      <ReactJson
        src={src}
        name={false}
        theme={TERMINAL_JSON_THEME}
        collapsed={collapsed}
        shouldCollapse={shouldCollapse}
        collapseStringsAfterLength={collapseStringsAfterLength}
        quotesOnKeys={false}
        displayDataTypes={false}
        displayObjectSize={false}
        displayArrayKey={false}
        enableClipboard={false}
        onEdit={false}
        onAdd={false}
        onDelete={false}
        onSelect={false}
        sortKeys={false}
        indentWidth={2}
        iconStyle='triangle'
        style={{
          backgroundColor: 'transparent',
          fontFamily: 'inherit',
          fontSize: 'inherit',
          lineHeight: 'inherit'
        }}
      />
    </Box>
  )
}

export default JsonView
