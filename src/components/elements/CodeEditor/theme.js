/* eslint-disable no-unused-vars */

import { fonts } from 'theme'
import * as polished from 'polished'

const FONT_SIZE = '14px'
const LINE_HEIGHT = 1.75
const TAB_SIZE = 2

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

export const light = {
  primary: GRAY10,
  secondary: GRAY7,
  background: '#fff',
  fontSize: FONT_SIZE,
  lineHeight: LINE_HEIGHT,
  tabSize: TAB_SIZE
}

export const dark = {
  primary: GRAY5,
  secondary: GRAY2,
  background: '#000',
  fontSize: FONT_SIZE,
  lineHeight: LINE_HEIGHT,
  tabSize: TAB_SIZE
}

export const themes = { light, dark }

const baseTheme = ({
  primary,
  secondary,
  background,
  fontSize,
  lineHeight,
  tabSize
}) => ({
  'code[class*="language-"]': {
    fontFamily: fonts.mono,
    fontSize: fontSize,
    lineHeight: lineHeight,
    direction: 'ltr',
    textAlign: 'left',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    MozTabSize: TAB_SIZE,
    OTabSize: TAB_SIZE,
    tabSize: TAB_SIZE,
    WebkitHyphens: 'none',
    MozHyphens: 'none',
    msHyphens: 'none',
    hyphens: 'none',
    background: background,
    color: secondary
  },
  'pre[class*="language-"]': {
    fontFamily: fonts.mono,
    fontSize: fontSize,
    lineHeight: lineHeight,
    direction: 'ltr',
    textAlign: 'left',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    MozTabSize: TAB_SIZE,
    OTabSize: TAB_SIZE,
    tabSize: TAB_SIZE,
    WebkitHyphens: 'none',
    MozHyphens: 'none',
    msHyphens: 'none',
    hyphens: 'none',
    background: background,
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
  '.line-numbers .line-numbers-rows': {
    borderRightColor: '#1f2932'
  },
  '.line-numbers-rows > span:before': {
    color: '#2c3847'
  },
  '.line-highlight': {
    background: polished.darken(0.1, background)
  }
})

export const prismThemes = {
  light: baseTheme(light),
  dark: baseTheme(dark)
}
