import React from 'react'
import { debounceComponent } from 'helpers'
import { Image } from 'components/elements'

const Clearbit = debounceComponent(Image)

export default ({ companyName, ...props }) => (
  <Clearbit src={`https://logo.clearbit.com/${companyName}`} {...props} />
)
