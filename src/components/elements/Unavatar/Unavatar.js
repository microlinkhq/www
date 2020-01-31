import React from 'react'
import { Image } from 'components/elements'

export default ({ from = '', query, ...props }) => (
  <Image
    lazy={false}
    src={`https://unavatar.now.sh/${from ? `${from}/${query}` : query}`}
    {...props}
  />
)
