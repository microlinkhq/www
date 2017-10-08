import React from 'react'
import {BackgroundImage} from 'rebass'

const CustomBackgroundImage = BackgroundImage.extend`
  border-radius: 8px;
  box-shadow: 0 16px 24px 0 rgba(127, 120, 118, 0.1);
  border: solid 8px #ffffff;
`

export default () => (
  <CustomBackgroundImage
    my={3}
    src='https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=2048&q=20'
    ratio={0.5}
   />
)
