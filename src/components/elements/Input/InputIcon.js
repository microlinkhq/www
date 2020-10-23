import { Unavatar } from 'components/elements'
import { Link as LinkIcon } from 'react-feather'
import { toPx, colors } from 'theme'
import { createElement } from 'react'

export default ({ width = 24, domain }) =>
  domain
    ? createElement(Unavatar, { query: domain, width: toPx(width) })
    : createElement(LinkIcon, { color: colors.black50, size: '16px' })
