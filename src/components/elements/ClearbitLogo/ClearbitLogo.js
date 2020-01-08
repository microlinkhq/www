import React from 'react'
import { Image } from 'components/elements'

const Clearbit = ({ companyName, ...props }) => (
  <Image
    lazy={false}
    src={`https://logo.clearbit.com/${companyName}`}
    {...props}
  />
)

export default Clearbit
