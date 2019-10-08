import DemoLinks from '@microlink/demo-links'
import { template as tpl } from 'lodash'

const TEMPLATE_INTERPOLATE = /{{([\s\S]+?)}}/g

const TEMPLATE_INTERPOLATE_ENCODED = /%7B%7B([\s\S]+?)%7D%7D/g

const is = str => TEMPLATE_INTERPOLATE.test(str)

const template = str => {
  let isEncoded = false
  let isTemplate = false

  if (TEMPLATE_INTERPOLATE_ENCODED.test(str)) {
    isTemplate = true
    isEncoded = true
    str = decodeURI(str)
  } else if (TEMPLATE_INTERPOLATE.test(str)) {
    isTemplate = true
  }

  if (!isTemplate) return str

  const compiled = tpl(str, { interpolate: TEMPLATE_INTERPOLATE })({
    DemoLinks
  })

  return isEncoded ? encodeURI(compiled) : compiled
}

template.is = is

export default template
