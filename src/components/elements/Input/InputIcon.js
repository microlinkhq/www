import { Link as LinkIcon } from 'react-feather'
import { Unavatar } from 'components/elements'
import { createElement } from 'react'
import { colors } from 'theme'

const InputIcon = ({ height = '24px', width = height, domain }) =>
  domain
    ? createElement(Unavatar, { query: `microlink/${domain}`, height, width })
    : createElement(LinkIcon, { color: colors.black50, size: '16px' })

export default InputIcon
