import React from 'react'
import { Image } from 'components/elements'

export default ({ from = '', query, ...props }) => (
  <Image
    src={`https://unavatar.now.sh/${from ? `${from}/${query}` : query}`}
    {...props}
  />
)
