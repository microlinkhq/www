import { createElement } from 'react'
import styled from 'styled-components'

import {
  LiveProvider as LiveProviderBase,
  LiveEditor as LiveEditorBase,
  LivePreview as LivePreviewBase
} from 'react-live'

import { lineHeights, fontSizes, fonts, colors } from 'theme'

const theme = {
  plain: {
    height: '100%',
    margin: '0',
    boxSizing: 'border-box',
    fontFamily: fonts.monospace,
    fontSize: `${fontSizes[1]}px`,
    lineHeight: `${lineHeights[3]}`,
    whiteSpace: 'pre-wrap',
    overflow: 'auto',
    outline: 'none',
    tabSize: '2',
    color: '#654ea3',
    backgroundColor: colors.white
  },
  styles: [
    {
      types: ['comment', 'prolog', 'doctype', 'cdata'],
      style: {
        color: colors.gray5
      }
    },
    {
      types: ['punctuation'],
      style: {
        color: colors.black
      }
    },
    {
      types: ['property', 'tag', 'boolean', 'number', 'constant', 'symbol'],
      style: {
        color: colors.secondary
      }
    },
    {
      types: ['selector', 'attr-name', 'string', 'char', 'builtin', 'inserted'],
      style: {
        color: '#654ea3'
      }
    },
    {
      types: ['atrule', 'attr-value', 'keyword'],
      style: {
        color: colors.secondary
      }
    },
    {
      types: ['regex', 'important'],
      style: {
        color: colors.red5
      }
    },
    {
      types: ['important', 'bold'],
      style: {
        fontWeight: 'bold'
      }
    },
    {
      types: ['italic'],
      style: {
        fontStyle: 'italic'
      }
    },
    {
      types: ['entity'],
      style: {
        cursor: 'help'
      }
    },
    {
      types: ['deleted'],
      style: {
        cursor: 'red'
      }
    }
  ]
}

export const LiveProvider = props =>
  createElement(LiveProviderBase, {
    noInline: true,
    theme,
    ...props
  })

export const LiveEditor = styled(LiveEditorBase)`
  pre,
  textarea {
    padding: 0 !important;
  }
`

export const LivePreview = LivePreviewBase
