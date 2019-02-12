import { createElement } from 'react'
import slugo from 'slugo'

export default ChildComponent => props =>
  createElement(ChildComponent, {
    ...props,
    id: typeof props.children === 'string' ? slugo(props.children) : null
  })
