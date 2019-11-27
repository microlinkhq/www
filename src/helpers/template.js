import tpl from 'lodash/template'

import DataDemoLinks from '../../data/demo-links.json'

const DemoLinks = DataDemoLinks.reduce(
  (acc, { brand, data }) => ({ ...acc, [brand]: data }),
  {}
)

const TEMPLATE_INTERPOLATE = /{{([\s\S]+?)}}/g

const TEMPLATE_INTERPOLATE_ENCODED = /%7B%7B([\s\S]+?)%7D%7D/g

const isTemplate = str => str.includes('DemoLinks.')

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
      DemoLinks
    })
  } catch (err) {
    console.error(`${str}:`, err.message)
    compiled = str
  }

  return isEncoded ? encodeURI(compiled) : compiled
}

export default template
