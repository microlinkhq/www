import React from 'react'
import { colors } from 'theme'
import { CallToAction } from 'components/patterns/CallToAction'

export const PostFooter = () => (
  <CallToAction
    id='free-api-key'
    accent={colors.grape7}
    outcome='turning any link into what you need'
    cta='blog:footer-cta'
  />
)
