import Unavatar from '../Unavatar/Unavatar'
import LucideIcon from '../../icons/Lucide'
import React from 'react'
import { withDebounce } from 'helpers/hoc/with-debounce'
import { Link } from 'lucide-react'

const createInputIcon = (UnavatarComponent, debounceKeys) =>
  React.memo(
    withDebounce(function InputIconComponent ({
      height = '24px',
      width = height,
      style,
      query,
      url,
      ...props
    }) {
      if (query || url) {
        return (
          <UnavatarComponent
            style={{ ...style, height, width }}
            query={query}
            url={url}
            {...props}
          />
        )
      }

      return <LucideIcon icon={Link} color='black50' size={[0, 0, 1, 1]} />
    },
    debounceKeys)
  )

const InputIcon = createInputIcon(Unavatar, ['query'])

InputIcon.Microlink = createInputIcon(Unavatar.Microlink, ['url', 'src'])

export default InputIcon
