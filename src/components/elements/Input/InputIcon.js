import { Link as LinkIcon } from 'react-feather'
import { Unavatar } from 'components/elements'
import { createElement } from 'react'
import { toPx, colors } from 'theme'

const InputIcon = ({ width = 24, domain }) =>
  domain
    ? createElement(Unavatar, { query: domain, width: toPx(width) })
    : createElement(LinkIcon, { color: colors.black50, size: '16px' })

export default InputIcon
