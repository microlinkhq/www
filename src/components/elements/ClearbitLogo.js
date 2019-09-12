import React from 'react'
import { debounceComponent } from 'helpers'
import { Image } from 'components/elements'

const Clearbit = debounceComponent(Image)

export default ({ companyName, ...props }) => (
  <Clearbit href={`https://logo.clearbit.com/${companyName}`} {...props} />
)
