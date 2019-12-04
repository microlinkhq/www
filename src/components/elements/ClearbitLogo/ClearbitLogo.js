import React from 'react'
import { Image } from 'components/elements'

const Clearbit = ({ companyName, ...props }) => (
  <Image
    lazyWidth={props.size}
    lazyHeight={props.size}
    src={`https://logo.clearbit.com/${companyName}`}
    {...props}
  />
)

export default Clearbit
