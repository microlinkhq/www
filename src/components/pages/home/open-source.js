import { colors } from 'theme'
import React from 'react'

import OpenSourcePattern from 'components/patterns/OpenSource'

const OpenSource = () => (
  <OpenSourcePattern
    repos={['metascraper', 'browserless', 'unavatar']}
    accent={colors.link}
    caption='Open source is how we give back to the web we build on. These are a few of the projects we maintain in the open.'
    ctaHref='/oss'
    ctaLabel='Explore our open source'
  />
)

export default OpenSource
