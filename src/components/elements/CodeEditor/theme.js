/* eslint-disable no-unused-vars */

import { fonts, radii, cx } from 'theme'

const FONT_SIZE = '14px'
const LINE_HEIGHT = 1.75
const tabSize = 2

export const GRAY0 = '#f8f9fa'
export const GRAY1 = '#f1f3f5'
export const GRAY2 = '#e9ecef'
export const GRAY3 = '#dee2e6'
export const GRAY4 = '#ced4da'
export const GRAY5 = '#adb5bd'
export const GRAY6 = '#868e96'
export const GRAY7 = '#495057'
export const GRAY8 = '#343a40'
export const GRAY9 = '#212529'
export const GRAY10 = '#15141A'

const BASE = {
  tabSize,
  fontSize: FONT_SIZE,
  lineHeight: LINE_HEIGHT,
  accent: cx('secondary')
}

export const light = {
  ...BASE,
  background: cx('white'),
  primary: cx('black'),
  secondary: GRAY7
}

export const dark = {
  ...BASE,
  background: cx('black'),
  primary: GRAY6,
  secondary: GRAY2
}

export const themes = { light, dark }

const baseTheme = theme => {
  const {
    primary,
    secondary,
    background,
    fontSize,
    lineHeight,
    tabSize
  } = themes[theme]

  return {
    'code[class*="language-"]': {
      fontFamily: fonts.mono,
      fontSize,
      lineHeight,
      direction: 'ltr',
      textAlign: 'left',
      whiteSpace: 'pre',
      wordSpacing: 'normal',
      wordBreak: 'normal',
      MozTabSize: tabSize,
      OTabSize: tabSize,
      tabSize,
      WebkitHyphens: 'none',
      MozHyphens: 'none',
      msHyphens: 'none',
      hyphens: 'none',
      background,
      color: secondary
    },
    'pre[class*="language-"]': {
      fontFamily: fonts.mono,
      fontSize,
      lineHeight,
      direction: 'ltr',
      textAlign: 'left',
      whiteSpace: 'pre',
      wordSpacing: 'normal',
      wordBreak: 'normal',
      MozTabSize: tabSize,
      OTabSize: tabSize,
      tabSize,
      WebkitHyphens: 'none',
      MozHyphens: 'none',
      msHyphens: 'none',
      hyphens: 'none',
      background,
      color: secondary,
      padding: '0px 1em 0px 0px',
      margin: '.5em 0',
      overflow: 'auto'
    },
    'pre[class*="language-"]::-moz-selection': {
      textShadow: 'none',
      background: primary
    },
    'pre[class*="language-"] ::-moz-selection': {
      textShadow: 'none',
      background: primary
    },
    'code[class*="language-"]::-moz-selection': {
      textShadow: 'none',
      background: primary
    },
    'code[class*="language-"] ::-moz-selection': {
      textShadow: 'none',
      background: primary
    },
    'pre[class*="language-"]::selection': {
      textShadow: 'none',
      background: primary
    },
    'pre[class*="language-"] ::selection': {
      textShadow: 'none',
      background: primary
    },
    'code[class*="language-"]::selection': {
      textShadow: 'none',
      background: primary
    },
    'code[class*="language-"] ::selection': {
      textShadow: 'none',
      background: primary
    },
    ':not(pre) > code[class*="language-"]': {
      padding: '.1em',
      borderRadius: '.3em'
    },
    comment: {
      color: primary
    },
    prolog: {
      color: primary
    },
    doctype: {
      color: primary
    },
    cdata: {
      color: primary
    },
    punctuation: {
      color: primary
    },
    namespace: {
      Opacity: '.7'
    },
    tag: {
      color: secondary
    },
    operator: {
      color: secondary
    },
    number: {
      color: secondary
    },
    property: {
      color: secondary
    },
    function: {
      color: secondary
    },
    'tag-id': {
      color: secondary
    },
    selector: {
      color: secondary
    },
    'atrule-id': {
      color: secondary
    },
    'code.language-javascript': {
      color: secondary
    },
    'attr-name': {
      color: secondary
    },
    'code.language-css': {
      color: primary
    },
    'code.language-scss': {
      color: primary
    },
    boolean: {
      color: primary
    },
    string: {
      color: primary
    },
    entity: {
      color: primary,
      cursor: 'help'
    },
    url: {
      color: primary
    },
    '.language-css .token.string': {
      color: primary
    },
    '.language-scss .token.string': {
      color: primary
    },
    '.style .token.string': {
      color: primary
    },
    'attr-value': {
      color: primary
    },
    keyword: {
      color: primary
    },
    control: {
      color: primary
    },
    directive: {
      color: primary
    },
    unit: {
      color: primary
    },
    statement: {
      color: primary
    },
    regex: {
      color: primary
    },
    atrule: {
      color: primary
    },
    placeholder: {
      color: primary
    },
    variable: {
      color: primary
    },
    deleted: {
      textDecoration: 'line-through'
    },
    inserted: {
      borderBottom: '1px dotted #ebf4ff',
      textDecoration: 'none'
    },
    italic: {
      fontStyle: 'italic'
    },
    important: {
      fontWeight: 'bold',
      color: secondary
    },
    bold: {
      fontWeight: 'bold'
    },
    'pre > code.highlight': {
      Outline: '.4em solid #34659d',
      OutlineOffset: '.4em'
    },
    '.line-highlight': {
      border: '1px solid red',
      background:
        theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
    },
    '.line-numbers-rows > span:before': {
      color: secondary
    }
  }
}

export const prismThemes = {
  light: baseTheme('light'),
  dark: baseTheme('dark')
}
