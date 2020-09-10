/* eslint-disable no-unused-vars */

import { fonts } from 'theme'
import * as polished from 'polished'

const FONT_SIZE = '14px'
const LINE_HEIGHT = 1.75
const TAB_SIZE = 2

const GRAY0 = '#f8f9fa'
const GRAY1 = '#f1f3f5'
const GRAY2 = '#e9ecef'
const GRAY3 = '#dee2e6'
const GRAY4 = '#ced4da'
const GRAY5 = '#adb5bd'
const GRAY6 = '#868e96'
const GRAY7 = '#495057'
const GRAY8 = '#343a40'
const GRAY9 = '#212529'
const GRAY10 = '#15141A'

const baseTheme = ({ PRIMARY, SECONDARY, BACKGROUND }) => ({
  'code[class*="language-"]': {
    fontFamily: fonts.mono,
    fontSize: FONT_SIZE,
    lineHeight: LINE_HEIGHT,
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
    background: BACKGROUND,
    color: SECONDARY
  },
  'pre[class*="language-"]': {
    fontFamily: fonts.mono,
    fontSize: FONT_SIZE,
    lineHeight: LINE_HEIGHT,
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
    background: BACKGROUND,
    color: SECONDARY,
    padding: '0px 1em 0px 0px',
    margin: '.5em 0',
    overflow: 'auto'
  },
  'pre[class*="language-"]::-moz-selection': {
    textShadow: 'none',
    background: PRIMARY
  },
  'pre[class*="language-"] ::-moz-selection': {
    textShadow: 'none',
    background: PRIMARY
  },
  'code[class*="language-"]::-moz-selection': {
    textShadow: 'none',
    background: PRIMARY
  },
  'code[class*="language-"] ::-moz-selection': {
    textShadow: 'none',
    background: PRIMARY
  },
  'pre[class*="language-"]::selection': {
    textShadow: 'none',
    background: PRIMARY
  },
  'pre[class*="language-"] ::selection': {
    textShadow: 'none',
    background: PRIMARY
  },
  'code[class*="language-"]::selection': {
    textShadow: 'none',
    background: PRIMARY
  },
  'code[class*="language-"] ::selection': {
    textShadow: 'none',
    background: PRIMARY
  },
  ':not(pre) > code[class*="language-"]': {
    padding: '.1em',
    borderRadius: '.3em'
  },
  comment: {
    color: PRIMARY
  },
  prolog: {
    color: PRIMARY
  },
  doctype: {
    color: PRIMARY
  },
  cdata: {
    color: PRIMARY
  },
  punctuation: {
    color: PRIMARY
  },
  namespace: {
    Opacity: '.7'
  },
  tag: {
    color: SECONDARY
  },
  operator: {
    color: SECONDARY
  },
  number: {
    color: SECONDARY
  },
  property: {
    color: SECONDARY
  },
  function: {
    color: SECONDARY
  },
  'tag-id': {
    color: SECONDARY
  },
  selector: {
    color: SECONDARY
  },
  'atrule-id': {
    color: SECONDARY
  },
  'code.language-javascript': {
    color: SECONDARY
  },
  'attr-name': {
    color: SECONDARY
  },
  'code.language-css': {
    color: PRIMARY
  },
  'code.language-scss': {
    color: PRIMARY
  },
  boolean: {
    color: PRIMARY
  },
  string: {
    color: PRIMARY
  },
  entity: {
    color: PRIMARY,
    cursor: 'help'
  },
  url: {
    color: PRIMARY
  },
  '.language-css .token.string': {
    color: PRIMARY
  },
  '.language-scss .token.string': {
    color: PRIMARY
  },
  '.style .token.string': {
    color: PRIMARY
  },
  'attr-value': {
    color: PRIMARY
  },
  keyword: {
    color: PRIMARY
  },
  control: {
    color: PRIMARY
  },
  directive: {
    color: PRIMARY
  },
  unit: {
    color: PRIMARY
  },
  statement: {
    color: PRIMARY
  },
  regex: {
    color: PRIMARY
  },
  atrule: {
    color: PRIMARY
  },
  placeholder: {
    color: PRIMARY
  },
  variable: {
    color: PRIMARY
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
    color: SECONDARY
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
    background: polished.darken(0.1, BACKGROUND)
  }
})

export default {
  light: baseTheme({
    PRIMARY: GRAY10,
    SECONDARY: GRAY7,
    BACKGROUND: '#fff'
  }),
  dark: baseTheme({
    PRIMARY: GRAY5,
    SECONDARY: GRAY2,
    BACKGROUND: '#000'
  })
}
