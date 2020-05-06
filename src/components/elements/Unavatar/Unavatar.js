import React from 'react'
import { Image } from 'components/elements'

export default ({ from = '', query, ...props }) => (
  <Image
    borderRadius={2}
    src={`https://unavatar.now.sh/${from ? `${from}/${query}` : query}`}
    css={`
      max-width: inherit;
    `}
    {...props}
  />
)
