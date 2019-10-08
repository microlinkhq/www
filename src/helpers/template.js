import DemoLinks from '@microlink/demo-links'
import { template as tpl } from 'lodash'

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

  const compiled = tpl(str, { interpolate: TEMPLATE_INTERPOLATE })({
    DemoLinks
  })

  return isEncoded ? encodeURI(compiled) : compiled
}

export default template
