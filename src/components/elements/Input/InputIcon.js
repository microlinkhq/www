import Unavatar from '../Unavatar/Unavatar'
import FeatherIcon from '../../icons/Feather'
import React from 'react'
import { withDebounce } from 'helpers/hoc/with-debounce'
import { Link } from 'react-feather'

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

      return <FeatherIcon icon={Link} color='black50' size={[0, 0, 1, 1]} />
    },
    debounceKeys)
  )

const InputIcon = createInputIcon(Unavatar, ['query'])

InputIcon.Microlink = createInputIcon(Unavatar.Microlink, ['url'])

export default InputIcon
