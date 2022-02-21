import tpl from 'lodash/template'
import cdnUrl from './cdn-url'

import dataDemoLinks from '../../data/demo-links.json'

const demolinks = dataDemoLinks.reduce((acc, { id, data }) => {
  const screenshot = { url: cdnUrl(`screenshot/${id}.png`) }
  acc[id] = { ...data, screenshot }
  return acc
}, {})

const TEMPLATE_INTERPOLATE = /{{([\s\S]+?)}}/g

const TEMPLATE_INTERPOLATE_ENCODED = /%7B%7B([\s\S]+?)%7D%7D/g

const isTemplate = str => typeof str === 'string' && str.includes('demolinks.')

const template = (str = '') => {
  if (!isTemplate(str)) return str

  let isEncoded = false

  if (TEMPLATE_INTERPOLATE_ENCODED.test(str)) {
    isEncoded = true
    str = decodeURI(str)
  }

  let compiled

  try {
    compiled = tpl(str, { interpolate: TEMPLATE_INTERPOLATE })({
      demolinks
    })
  } catch (err) {
    console.error(`[helpers/template] '${str}':`, err.message)
    compiled = str
  }

  return isEncoded ? encodeURI(compiled) : compiled
}

export default template
